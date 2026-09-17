// Projects flagged `private` are hidden from everyone by default. Adding
// `?view=all` to any route turns them on for that browser, and `?view=public`
// turns them back off. Proxy handles the query on every request, then strips it.
//
// Two cookies are set: an httpOnly one the server trusts as the access gate,
// and a short-lived readable one that hands the grant to the client. The client
// consumes that hint once, writes the localStorage flag, and deletes the hint,
// so from then on localStorage is the only client-side switch: clearing it
// hides the projects again until `?view=all` is used.

export const PRIVATE_ACCESS_QUERY_PARAM = "view";
export const PRIVATE_ACCESS_QUERY_VALUE = "all";
export const PUBLIC_ONLY_QUERY_VALUE = "public";

export const PRIVATE_ACCESS_COOKIE = "portfolio_private_access";
export const PRIVATE_ACCESS_COOKIE_VALUE = "granted";

export const PRIVATE_ACCESS_HINT_COOKIE = "portfolio_view_all";
export const PRIVATE_ACCESS_HINT_VALUE = "1";

export const PRIVATE_ACCESS_STORAGE_KEY = "portfolio:private-access";
export const PRIVATE_ACCESS_STORAGE_VALUE = "granted";

export const PRIVATE_ACCESS_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
