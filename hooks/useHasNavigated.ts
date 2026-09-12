import { useEffect, useState } from "react";

// Flipped after the first page of a session mounts. Module scope survives client
// navigations but is never written on the server, so a cold load always renders
// false and hydration matches.
let navigated = false;

// Layouts reveal their content from behind a full-screen cover, which only makes
// sense as the tail end of a navigation. This reports false on the page a visitor
// lands on and true for every page reached from within the site.
export function useHasNavigated() {
  const [hasNavigated] = useState(navigated);

  useEffect(() => {
    navigated = true;
  }, []);

  return hasNavigated;
}
