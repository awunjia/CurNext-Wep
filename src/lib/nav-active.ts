/** Path match for locale-stripped next-intl pathnames. */
export function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function isGroupActive(
  pathname: string,
  items: { href: string }[],
) {
  return items.some((item) => isActivePath(pathname, item.href));
}
