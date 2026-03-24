import { env } from "@src/shared/server/env";
import { NextRequest, NextResponse } from "next/server";

async function proxyRequest(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const url = `${env.API_URL}/${path.join("/")}${req.nextUrl.search}`;

  const hasBody = !["GET", "HEAD"].includes(req.method);
  const cookie = req.headers.get("cookie") || "";
  const contentType = req.headers.get("content-type");

  const res = await fetch(url, {
    method: req.method,
    headers: {
      ...(cookie && { Cookie: cookie }),
      ...(contentType && { "Content-Type": contentType }),
    },
    body: hasBody ? await req.text() : undefined,
  });

  const data = await res.text();
  const response = new NextResponse(data, {
    status: res.status,
    headers: {
      "Content-Type": res.headers.get("content-type") || "application/json",
    },
  });

  res.headers.getSetCookie().forEach((c) => {
    response.headers.append("Set-Cookie", c);
  });

  return response;
}

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PUT = proxyRequest;
export const DELETE = proxyRequest;
export const PATCH = proxyRequest;
