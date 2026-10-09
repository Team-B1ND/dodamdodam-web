import { expect, test, type Page } from "@playwright/test";
import type { User } from "../src/entities/user/types";

const user: User = {
  publicId: "fixture-user",
  username: "fixture-user",
  name: "인증 테스트 사용자",
  phone: "01000000000",
  status: "ACTIVE",
  roles: ["STUDENT"],
  student: { grade: 2, room: 1, number: 1, isGraduated: false },
  createdAt: "2026-01-01T00:00:00",
};

interface ApiOptions {
  authenticated?: boolean;
  me?: (count: number) => number | Promise<number>;
  refresh?: () => number | Promise<number>;
  schedule?: (count: number) => number;
  service?: (path: string, count: number) => number;
  login?: number;
}

async function mockApi(page: Page, options: ApiOptions = {}) {
  const counts = { documents: 0, me: 0, refresh: 0, schedule: 0, protected: 0 };
  let authenticated = options.authenticated ?? false;
  page.on("request", (request) => {
    if (request.isNavigationRequest() && request.frame() === page.mainFrame()) {
      counts.documents += 1;
    }
  });
  await page.route("**/api/**", async (route) => {
    const path = new URL(route.request().url()).pathname.replace(/^\/api/, "");
    let status = 200;
    let data: unknown = [];
    if (path === "/user/me") {
      counts.me += 1;
      status = options.me
        ? await options.me(counts.me)
        : authenticated
          ? 200
          : 403;
      data = user;
    } else if (path === "/auth/refresh") {
      counts.refresh += 1;
      status = options.refresh ? await options.refresh() : 401;
    } else if (path === "/auth/login") {
      status = options.login ?? 200;
      if (status === 200) authenticated = true;
    } else if (path === "/auth/logout") {
      authenticated = false;
    } else {
      counts.protected += 1;
      status = options.service?.(path, counts.protected) ?? 200;
      if (path === "/neis/schedule") {
        counts.schedule += 1;
        status = options.schedule?.(counts.schedule) ?? 200;
      }
    }
    if (route.request().failure()) return;
    await route.fulfill({
      status,
      json:
        status === 200
          ? { status, message: "fixture success", data }
          : { status, message: "fixture failure", code: "FIXTURE_ERROR" },
    });
  });
  return counts;
}

async function recordCounts(counts: Awaited<ReturnType<typeof mockApi>>) {
  await test.info().attach("request-counts", {
    body: JSON.stringify(counts),
    contentType: "application/json",
  });
}

async function login(page: Page) {
  await page.locator('input[type="text"]').fill("fixture-user");
  await page.locator('input[type="password"]').fill("fixture-password");
  await page.getByRole("button", { name: "로그인", exact: true }).click();
}

async function logout(page: Page) {
  await page.locator("button.bg-status-error").click();
  await page.getByRole("button", { name: "로그아웃", exact: true }).click();
  await expect(page.locator('input[type="password"]')).toBeVisible();
}

for (const path of ["/login", "/register"]) {
  test(`${path} does not query anonymous user information`, async ({
    page,
  }) => {
    const counts = await mockApi(page);
    await page.goto(path);
    if (path === "/register") {
      await expect(
        page.getByRole("button", { name: "학생 계정 생성" }),
      ).toBeVisible();
    } else {
      await expect(page.locator('input[type="password"]')).toBeVisible();
    }
    expect(counts.me).toBe(0);
    await recordCounts(counts);
  });
}

test("anonymous root reaches login with one document and one user request", async ({
  page,
}) => {
  const counts = await mockApi(page);
  await page.goto("/");
  await expect(page.locator('input[type="password"]')).toBeVisible();
  await page.waitForTimeout(8500);
  expect(counts.documents).toBe(1);
  expect(counts.me).toBe(1);
  expect(counts.protected).toBe(0);
  await recordCounts(counts);
});

test("protected destination, search and hash survive the login round trip", async ({
  page,
}) => {
  const counts = await mockApi(page);
  await page.goto("/schedule?filter=fixture#target");
  await expect(page.locator('input[type="password"]')).toBeVisible();
  expect(new URL(page.url()).searchParams.get("redirectUrl")).toBe(
    "/schedule?filter=fixture#target",
  );
  await login(page);
  await expect(page).toHaveURL(/\/schedule\?filter=fixture#target$/);
  await expect(
    page.getByRole("link", { name: "홈", exact: true }),
  ).toBeVisible();
  expect(counts.documents).toBe(1);
  await recordCounts(counts);
});

test("home service queries wait for the user response", async ({ page }) => {
  let release!: (status: number) => void;
  const response = new Promise<number>((resolve) => {
    release = resolve;
  });
  const counts = await mockApi(page, { me: () => response });
  await page.goto("/");
  await expect.poll(() => counts.me).toBe(1);
  await page.waitForTimeout(300);
  expect(counts.protected).toBe(0);
  release(200);
  await expect(
    page.getByRole("link", { name: "홈", exact: true }),
  ).toBeVisible();
  await expect.poll(() => counts.protected).toBeGreaterThan(0);
  expect(counts.me).toBe(1);
  await recordCounts(counts);
});

test("expired access can refresh without returning to login", async ({
  page,
}) => {
  const counts = await mockApi(page, {
    me: (count) => (count === 1 ? 401 : 200),
    refresh: () => 200,
  });
  await page.goto("/schedule");
  await expect.poll(() => counts.me).toBe(2);
  await expect(
    page.getByRole("link", { name: "홈", exact: true }),
  ).toBeVisible();
  expect(new URL(page.url()).pathname).toBe("/schedule");
  expect(counts.refresh).toBe(1);
  expect(counts.me).toBe(2);
  expect(counts.documents).toBe(1);
  await recordCounts(counts);
});

test("failed refresh reaches login without query retries or a reload", async ({
  page,
}) => {
  const counts = await mockApi(page, { me: () => 401 });
  await page.goto("/schedule");
  await expect(page.locator('input[type="password"]')).toBeVisible();
  await page.waitForTimeout(8500);
  expect(counts.refresh).toBe(1);
  expect(counts.me).toBe(1);
  expect(counts.documents).toBe(1);
  await recordCounts(counts);
});

test("a terminal user rejection after successful refresh does not retry", async ({
  page,
}) => {
  const counts = await mockApi(page, { me: () => 401, refresh: () => 200 });
  await page.goto("/schedule");
  await expect(page.locator('input[type="password"]')).toBeVisible();
  await page.waitForTimeout(8500);
  expect(counts.me).toBe(2);
  expect(counts.refresh).toBe(1);
  expect(counts.documents).toBe(1);
  await recordCounts(counts);
});

test("concurrent expired service requests share one refresh", async ({
  page,
}) => {
  let release!: (status: number) => void;
  let refreshed = false;
  const refresh = new Promise<number>((resolve) => {
    release = resolve;
  });
  const counts = await mockApi(page, {
    authenticated: true,
    service: () => (refreshed ? 200 : 401),
    refresh: () => refresh,
  });
  await page.goto("/");
  await expect.poll(() => counts.refresh).toBe(1);
  await expect.poll(() => counts.protected).toBeGreaterThan(1);
  await page.waitForTimeout(300);
  expect(counts.refresh).toBe(1);
  refreshed = true;
  release(200);
  await expect(
    page.getByRole("link", { name: "홈", exact: true }),
  ).toBeVisible();
  await page.waitForTimeout(300);
  expect(counts.refresh).toBe(1);
  await expect(
    page.getByRole("button", { name: "다시 시도", exact: true }),
  ).toHaveCount(0);
  expect(counts.documents).toBe(1);
  await recordCounts(counts);
});

test("a later session rejection clears cached protected content", async ({
  page,
}) => {
  let expired = false;
  const counts = await mockApi(page, { me: () => (expired ? 403 : 200) });
  await page.goto("/");
  await expect(
    page.getByRole("link", { name: "홈", exact: true }),
  ).toBeVisible();
  await page.getByRole("link", { name: "일정", exact: true }).click();
  await expect(page).toHaveURL(/\/schedule$/);
  await page.clock.install();
  await page.clock.setSystemTime(new Date(Date.now() + 6 * 60 * 1000));
  expired = true;
  await page.evaluate(() =>
    window.dispatchEvent(new Event("visibilitychange")),
  );
  await expect(page.locator('input[type="password"]')).toBeVisible();
  await expect(page.getByRole("link", { name: "홈", exact: true })).toHaveCount(
    0,
  );
  await page.goBack();
  await expect(page.locator('input[type="password"]')).toBeVisible();
  expect(counts.documents).toBe(1);
  await recordCounts(counts);
});

test("an unmatched public path keeps the existing not-found screen", async ({
  page,
}) => {
  const counts = await mockApi(page);
  await page.goto("/login-missing");
  await expect(
    page.getByText("Page Not Found!", { exact: true }),
  ).toBeVisible();
  expect(counts.me).toBe(0);
  expect(counts.documents).toBe(1);
  await recordCounts(counts);
});

test("transient user errors keep their retry behavior", async ({ page }) => {
  const counts = await mockApi(page, {
    me: (count) => (count === 1 ? 503 : 200),
  });
  await page.goto("/schedule");
  await expect.poll(() => counts.me).toBe(2);
  await expect(
    page.getByRole("link", { name: "홈", exact: true }),
  ).toBeVisible();
  expect(counts.me).toBe(2);
  expect(new URL(page.url()).pathname).toBe("/schedule");
});

test("initial user failure can recover through the retry button", async ({
  page,
}) => {
  let unavailable = true;
  const counts = await mockApi(page, { me: () => (unavailable ? 503 : 200) });
  await page.goto("/schedule");
  await expect(
    page.getByRole("button", { name: "다시 시도", exact: true }),
  ).toBeVisible({ timeout: 15000 });
  expect(counts.me).toBe(4);
  expect(counts.protected).toBe(0);
  unavailable = false;
  await page.getByRole("button", { name: "다시 시도", exact: true }).click();
  await expect(
    page.getByRole("link", { name: "홈", exact: true }),
  ).toBeVisible();
  expect(counts.me).toBe(5);
  expect(counts.documents).toBe(1);
});

test("cached user data survives a background outage and recovers", async ({
  page,
}) => {
  let unavailable = false;
  const counts = await mockApi(page, { me: () => (unavailable ? 503 : 200) });
  await page.goto("/schedule");
  await expect(
    page.getByRole("link", { name: "홈", exact: true }),
  ).toBeVisible();
  await page.clock.install();
  await page.clock.setSystemTime(new Date(Date.now() + 6 * 60 * 1000));
  unavailable = true;
  await page.evaluate(() =>
    window.dispatchEvent(new Event("visibilitychange")),
  );
  await expect.poll(() => counts.me, { timeout: 15000 }).toBe(5);
  await page.waitForTimeout(200);
  await expect(
    page.getByRole("link", { name: "홈", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "다시 시도", exact: true }),
  ).toHaveCount(0);
  unavailable = false;
  await page.evaluate(() =>
    window.dispatchEvent(new Event("visibilitychange")),
  );
  await expect.poll(() => counts.me).toBe(6);
  await expect(
    page.getByRole("link", { name: "홈", exact: true }),
  ).toBeVisible();
  expect(counts.documents).toBe(1);
});

test("a rejected login stays public without requesting user information", async ({
  page,
}) => {
  const counts = await mockApi(page, { login: 403 });
  await page.goto("/login");
  await login(page);
  await expect(
    page.getByText("fixture failure", { exact: true }),
  ).toBeVisible();
  expect(new URL(page.url()).pathname).toBe("/login");
  expect(counts.me).toBe(0);
  expect(counts.documents).toBe(1);
});

test("a service permission error does not log out a valid user", async ({
  page,
}) => {
  await mockApi(page, { authenticated: true, schedule: () => 403 });
  await page.goto("/schedule");
  await expect(
    page.getByRole("button", { name: "다시 시도", exact: true }),
  ).toBeVisible({ timeout: 15000 });
  expect(new URL(page.url()).pathname).toBe("/schedule");
  await expect(page.locator('input[type="password"]')).toHaveCount(0);
});

test("a late refresh failure from the old session cannot discard a new login", async ({
  page,
}) => {
  let release!: (status: number) => void;
  const refresh = new Promise<number>((resolve) => {
    release = resolve;
  });
  const counts = await mockApi(page, {
    authenticated: true,
    schedule: (count) => (count === 1 ? 401 : 200),
    refresh: () => refresh,
  });
  await page.goto("/schedule");
  await expect.poll(() => counts.refresh).toBe(1);
  await logout(page);
  await login(page);
  await expect(page).toHaveURL(/\/$/);
  await expect(
    page.getByRole("link", { name: "홈", exact: true }),
  ).toBeVisible();
  release(401);
  await page.waitForTimeout(500);
  expect(new URL(page.url()).pathname).toBe("/");
  await expect(page.locator('input[type="password"]')).toHaveCount(0);
  expect(counts.documents).toBe(1);
});

test("an old user response cannot redirect a freshly logged-in session", async ({
  page,
}) => {
  let release!: (status: number) => void;
  const oldResponse = new Promise<number>((resolve) => {
    release = resolve;
  });
  const counts = await mockApi(page, {
    me: (count) => (count === 2 ? oldResponse : 200),
  });
  await page.goto("/schedule");
  await expect(
    page.getByRole("link", { name: "홈", exact: true }),
  ).toBeVisible();
  await logout(page);
  await page.goBack();
  await expect.poll(() => counts.me).toBe(2);
  await page.goForward();
  await expect(page.locator('input[type="password"]')).toBeVisible();
  await login(page);
  await expect(page).toHaveURL(/\/$/);
  await expect.poll(() => counts.me).toBe(3);
  release(403);
  await page.waitForTimeout(500);
  expect(new URL(page.url()).pathname).toBe("/");
  await expect(page.locator('input[type="password"]')).toHaveCount(0);
});

test("external login destinations retain document navigation", async ({
  page,
}) => {
  const counts = await mockApi(page);
  await page.route("https://example.invalid/**", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: "<h1>External fixture</h1>",
    }),
  );
  await page.goto(
    "/login?redirectUrl=" +
      encodeURIComponent("https://example.invalid/return"),
  );
  await login(page);
  await expect(page).toHaveURL("https://example.invalid/return");
  await expect(
    page.getByRole("heading", { name: "External fixture" }),
  ).toBeVisible();
  expect(counts.documents).toBe(2);
});
