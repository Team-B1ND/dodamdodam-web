import { history } from "@/shared/libs/history";
import { queryClient } from "@/shared/libs/query-client";

export const isPublicAuthPath = (pathname: string) =>
  pathname.startsWith("/login") || pathname.startsWith("/register");

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
