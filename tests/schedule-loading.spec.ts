import { expect, test, type Page } from "@playwright/test";

const user = {
  publicId: "fixture-user",
  username: "fixture-user",
  name: "인증 테스트 사용자",
  phone: "01000000000",
  status: "ACTIVE",
  roles: ["STUDENT"],
  student: { grade: 2, room: 1, number: 1, isGraduated: false },
  createdAt: "2026-01-01T00:00:00",
};

async function api(
  page: Page,
  schedule: (date: string) => Promise<unknown[]> = async () => [],
) {
  await page.route("**/api/**", async (route) => {
    const url = new URL(route.request().url());
    const data =
      url.pathname === "/api/user/me"
        ? user
        : url.pathname === "/api/neis/schedule"
          ? await schedule(url.searchParams.get("date")!)
          : [];
    if (!route.request().failure())
      await route.fulfill({
        json: { status: 200, message: "fixture success", data },
      });
  });
}

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}

function event(date: string, title: string) {
  return {
    publicId: title,
    title,
    startAt: date,
    endAt: date,
    targets: ["ALL"],
  };
}

test("ready schedule commits without an extra Suspense cooldown", async ({
  page,
}) => {
  const response = deferred<unknown[]>();
  await api(page, () => response.promise);
  const cdp = await page.context().newCDPSession(page);
  await cdp.send("Network.enable");
  await cdp.send("Performance.enable");
  let responseTimestamp = 0;
  cdp.on("Network.responseReceived", (e) => {
    if (new URL(e.response.url).pathname === "/api/neis/schedule")
      responseTimestamp = e.timestamp;
  });
  await page.addInitScript(() => {
    (window as Window & { scheduleVisible?: number }).scheduleVisible =
      undefined;
    function frame() {
      const heading = [...document.querySelectorAll("h1")].find(
        (e) => e.textContent === "학사 일정",
      );
      if (
        heading?.getBoundingClientRect().width &&
        (window as Window & { scheduleVisible?: number }).scheduleVisible ===
          undefined
      ) {
        (window as Window & { scheduleVisible?: number }).scheduleVisible =
          performance.now();
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  });
  await page.goto("/schedule");
  await expect(page.locator(".skeleton").first()).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "학사 일정", exact: true }),
  ).toHaveCount(0);
  // Release while the old Suspense fallback's 300ms cooldown is still active.
  await page.waitForTimeout(100);
  response.resolve([]);
  await expect(
    page.getByRole("heading", { name: "학사 일정", exact: true }),
  ).toBeVisible();
  await page.waitForFunction(
    () =>
      (window as Window & { scheduleVisible?: number }).scheduleVisible !==
      undefined,
  );
  const metrics = (await cdp.send("Performance.getMetrics")).metrics;
  const navigationStart = metrics.find(
    (m) => m.name === "NavigationStart",
  )!.value;
  const visible = await page.evaluate(
    () => (window as Window & { scheduleVisible?: number }).scheduleVisible!,
  );
  const responseToVisibleMs =
    (navigationStart - responseTimestamp) * 1000 + visible;
  await test.info().attach("response-to-calendar", {
    body: JSON.stringify({ responseToVisibleMs }),
    contentType: "application/json",
  });
  expect(responseTimestamp).toBeGreaterThan(0);
  expect(responseToVisibleMs).toBeGreaterThanOrEqual(0);
  expect(responseToVisibleMs).toBeLessThan(150);
});

test("home pending schedule does not claim there are no events", async ({
  page,
}) => {
  const response = deferred<unknown[]>();
  await api(page, () => response.promise);
  await page.goto("/");
  await expect(
    page.getByRole("paragraph").filter({ hasText: /^일정$/ }),
  ).toBeVisible();
  await expect(page.getByText("일정이 없어요.", { exact: true })).toHaveCount(
    0,
  );
  const now = new Date();
  const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  response.resolve([event(date, "오늘의 일정")]);
  await expect(page.getByText("오늘의 일정", { exact: true })).toBeVisible();
});

test("month changes retain the displayed month and events until replacement data arrives", async ({
  page,
}) => {
  const next = deferred<unknown[]>();
  let initialDate = "";
  await api(page, async (date) => {
    if (!initialDate) {
      initialDate = date;
      return [event(date, "기존 월 일정")];
    }
    return next.promise;
  });
  await page.goto("/schedule");
  await expect(
    page.getByRole("heading", { name: "학사 일정", exact: true }),
  ).toBeVisible();
  const label = page
    .getByRole("heading", { name: "학사 일정", exact: true })
    .locator("..")
    .getByText(/^\d{4}년 \d{1,2}월$/);
  const oldLabel = await label.innerText();
  await page
    .getByRole("heading", { name: "학사 일정", exact: true })
    .locator("..")
    .getByRole("button")
    .last()
    .click();
  await expect(label).toHaveText(oldLabel);
  await expect(
    page.getByText("기존 월 일정", { exact: true }).first(),
  ).toBeVisible();
  const date = new Date(`${initialDate}T00:00:00`);
  date.setMonth(date.getMonth() + 1);
  const nextDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-01`;
  next.resolve([event(nextDate, "새로운 월 일정")]);
  await expect(label).toHaveText(
    `${date.getFullYear()}년 ${date.getMonth() + 1}월`,
  );
  await expect(
    page.getByText("새로운 월 일정", { exact: true }).first(),
  ).toBeVisible();
  await expect(page.getByText("기존 월 일정", { exact: true })).toHaveCount(0);
});

test("initial schedule failures keep retry and error recovery", async ({
  page,
}) => {
  let failed = true;
  let scheduleRequests = 0;
  await page.route("**/api/**", async (route) => {
    const path = new URL(route.request().url()).pathname;
    if (path === "/api/neis/schedule") scheduleRequests++;
    const status = path === "/api/neis/schedule" && failed ? 500 : 200;
    await route.fulfill({
      status,
      json: {
        status,
        message: "fixture",
        data: path === "/api/user/me" ? user : [],
      },
    });
  });
  await page.goto("/schedule");
  await expect(
    page.getByRole("button", { name: "다시 시도", exact: true }),
  ).toBeVisible({ timeout: 15000 });
  expect(scheduleRequests).toBe(4);
  failed = false;
  await page.getByRole("button", { name: "다시 시도", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "학사 일정", exact: true }),
  ).toBeVisible();
});
