import { history } from "@/shared/libs/history";
import { queryClient } from "@/shared/libs/query-client";

export const isPublicAuthPath = (pathname: string) =>
  pathname.startsWith("/login") || pathname.startsWith("/register");

const TRUSTED_EXTERNAL_HOST = /(^|\.)b1nd\.com$/;

type LoginRedirect =
  { type: "internal"; path: string } | { type: "external"; href: string };

// Reject script URLs and foreign hosts so redirectUrl cannot be used for XSS or phishing.
export const resolveLoginRedirect = (
  redirectUrl: string,
): LoginRedirect | null => {
  let destination: URL;
  try {
    destination = new URL(redirectUrl, window.location.origin);
  } catch {
    return null;
  }

  if (destination.origin === window.location.origin) {
    return {
      type: "internal",
      path: `${destination.pathname}${destination.search}${destination.hash}`,
    };
  }

  if (
    destination.protocol === "https:" &&
    TRUSTED_EXTERNAL_HOST.test(destination.hostname)
  ) {
    return { type: "external", href: destination.href };
  }

  return null;
};

export const redirectToLogin = () => {
  const { pathname, search, hash } = window.location;

  if (isPublicAuthPath(pathname)) {
    queryClient.clear();
    return;
  }

  const redirectUrl = `${pathname}${search}${hash}`;
  const loginSearch = new URLSearchParams();

  if (redirectUrl !== "/") {
    loginSearch.set("redirectUrl", redirectUrl);
  }

  const loginUrl = loginSearch.toString().length
    ? `/login?${loginSearch.toString()}`
    : "/login";

  history.replace(loginUrl);
  history.flush();
  queryClient.clear();
};
