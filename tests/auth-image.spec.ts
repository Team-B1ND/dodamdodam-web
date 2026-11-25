import { expect, test } from "@playwright/test";

const backgroundPattern =
  /\/(?:LoginBackground\.png|login-background[^/]*\.webp)(?:\?|$)/;
const caption = "어린아이가 탈 없이 잘 놀며 자라는 모양.";

for (const path of ["/login", "/register"]) {
  for (const width of [412, 1023]) {
    test(`${path} skips the desktop background at ${width}px`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      const requests: string[] = [];
      page.on("request", (request) => {
        if (backgroundPattern.test(request.url())) requests.push(request.url());
      });
      await page.goto(path);
      await page.waitForLoadState("networkidle");
      await expect(page.getByText(caption, { exact: true })).toBeHidden();
      expect(requests).toHaveLength(0);
    });
  }

  test(`${path} keeps the desktop panel layout while its background loads`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1024, height: 900 });
    let release!: () => void;
    const pending = new Promise<void>((resolve) => {
      release = resolve;
    });
    const requests: string[] = [];
    page.on("request", (request) => {
      if (backgroundPattern.test(request.url())) requests.push(request.url());
    });
    await page.route(backgroundPattern, async (route) => {
      await pending;
      await route.continue();
    });
    await page.addInitScript(() => {
      const state = { value: 0, since: Infinity };
      Object.defineProperty(window, "__authImageCLS", { value: state });
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const shift = entry as PerformanceEntry & {
            value: number;
            hadRecentInput: boolean;
          };
          if (!shift.hadRecentInput && shift.startTime >= state.since)
            state.value += shift.value;
        }
      }).observe({ type: "layout-shift", buffered: true });
    });
    await page.goto(path, { waitUntil: "domcontentloaded" });
    const text = page.getByText(caption, { exact: true });
    await expect(text).toBeVisible();
    const panel = text.locator("../..");
    const image = panel.locator('img[alt=""]');
    const logo = panel.locator('img[src="/dodamLogoWhite.svg"]');
    await page.evaluate(() => document.fonts.ready);
    const before = await panel.boundingBox();
    expect(before).toMatchObject({ width: 400, height: 500 });
    const logoBox = await logo.boundingBox();
    expect(logoBox).toMatchObject({ width: 200, height: 50 });
    expect(logoBox!.x - before!.x).toBe(100);
    expect(logoBox!.y - before!.y).toBe(72);
    await page.evaluate(() => {
      const state = (
        window as Window & { __authImageCLS: { value: number; since: number } }
      ).__authImageCLS;
      state.since = performance.now();
      state.value = 0;
    });
    release();
    await expect
      .poll(() =>
        image.evaluate((element) => {
          const img = element as HTMLImageElement;
          return img.complete && img.naturalWidth > 0;
        }),
      )
      .toBe(true);
    await page.evaluate(
      () =>
        new Promise<void>((resolve) => {
          requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
        }),
    );
    expect(
      await page.evaluate(
        () =>
          (window as Window & { __authImageCLS: { value: number } })
            .__authImageCLS.value,
      ),
    ).toBe(0);
    expect(await panel.boundingBox()).toEqual(before);
    expect(await logo.boundingBox()).toEqual(logoBox);
    await expect(text).toHaveText(caption);
    const rendered = await image.evaluate((element) => {
      const img = element as HTMLImageElement;
      const bounds = img.getBoundingClientRect();
      return {
        width: bounds.width,
        height: bounds.height,
        aspect: img.naturalWidth / img.naturalHeight,
        fit: getComputedStyle(img).objectFit,
        position: getComputedStyle(img).objectPosition,
      };
    });
    expect(rendered).toEqual({
      width: 400,
      height: 500,
      aspect: 0.8,
      fit: "cover",
      position: "50% 50%",
    });
    expect(requests).toHaveLength(1);
  });

  test(`${path} loads its background when resized across the desktop boundary`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1023, height: 900 });
    const requests: string[] = [];
    page.on("request", (request) => {
      if (backgroundPattern.test(request.url())) requests.push(request.url());
    });
    await page.goto(path);
    await page.waitForLoadState("networkidle");
    expect(requests).toHaveLength(0);
    await page.setViewportSize({ width: 1350, height: 900 });
    const text = page.getByText(caption, { exact: true });
    await expect(text).toBeVisible();
    const image = text.locator("../..").locator('img[alt=""]');
    await expect
      .poll(() =>
        image.evaluate((element) => {
          const img = element as HTMLImageElement;
          return (
            img.complete &&
            img.naturalWidth > 0 &&
            !img.currentSrc.startsWith("data:")
          );
        }),
      )
      .toBe(true);
    expect(requests).toHaveLength(1);
    await page.setViewportSize({ width: 1023, height: 900 });
    await expect(text).toBeHidden();
    await page.waitForLoadState("networkidle");
    expect(requests).toHaveLength(1);
  });
}

for (const scale of [1, 2]) {
  test.describe(`desktop at ${scale}x`, () => {
    test.use({
      deviceScaleFactor: scale,
      viewport: { width: 1350, height: 900 },
    });
    test("chooses an image sharp enough for the display", async ({ page }) => {
      await page.goto("/login");
      const image = page
        .getByText(caption, { exact: true })
        .locator("../..")
        .locator('img[alt=""]');
      await expect(image).toBeVisible();
      await expect
        .poll(() =>
          image.evaluate(
            (element) => (element as HTMLImageElement).naturalWidth,
          ),
        )
        .toBe(400);
      const currentSrc = await image.evaluate(
        (element) => (element as HTMLImageElement).currentSrc,
      );
      expect(currentSrc).toContain(`login-background-${scale}x`);
    });
  });
}
