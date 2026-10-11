import { expect, test } from "@playwright/test";
import { readFileSync, readdirSync } from "node:fs";
import config from "../vercel.json" with { type: "json" };

const cachedAsset = new RegExp(`^${config.headers[0].source}$`);
const spa = new RegExp(`^${config.rewrites[0].source}$`);

test("all generated assets receive immutable caching", () => {
  const assets = readdirSync("dist/assets");
  expect(assets.length).toBeGreaterThan(0);
  for (const asset of assets)
    expect(cachedAsset.test(`/assets/${asset}`), asset).toBe(true);
  expect(config.headers[0].headers).toEqual([
    { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
  ]);
});

test("HTML, public files, API and hashless assets stay outside immutable caching", () => {
  for (const path of [
    "/",
    "/index.html",
    "/login",
    "/schedule",
    "/favicon.svg",
    "/api/user/me",
    "/assets/plain.css",
    "/assets/index-1234567.js",
    "/assets/index-123456789.js",
    "/assets/page-12345678.html",
  ])
    expect(cachedAsset.test(path), path).toBe(false);
});

test("missing asset paths never fall back to the SPA HTML", () => {
  for (const path of [
    "/assets/missing-12345678.js",
    "/assets/plain.css",
    "/assets/sub/missing.woff2",
  ])
    expect(spa.test(path), path).toBe(false);
  for (const path of [
    "/",
    "/login",
    "/register",
    "/schedule",
    "/teacher/outsleeping",
  ])
    expect(spa.test(path), path).toBe(true);
  expect(config.rewrites[0].destination).toBe("/");
  expect(readFileSync("dist/index.html", "utf8")).toContain("/assets/");
});
