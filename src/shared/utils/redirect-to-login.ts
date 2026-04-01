export const redirectToLogin = () => {
  const { pathname, search } = window.location;

  if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
    return;
  }

  const redirectUrl = `${pathname}${search}`;
  const loginSearch = new URLSearchParams();

  if (redirectUrl !== "/") {
    loginSearch.set("redirectUrl", redirectUrl);
  }

  const loginUrl = loginSearch.toString().length
    ? `/login?${loginSearch.toString()}`
    : "/login";

  window.location.href = loginUrl;
};

