import { useEffect, useState } from "react";
import {
  PRIVATE_ACCESS_HINT_COOKIE,
  PRIVATE_ACCESS_HINT_VALUE,
  PRIVATE_ACCESS_STORAGE_KEY,
  PRIVATE_ACCESS_STORAGE_VALUE,
} from "lib/private-access";
import type { ProjectProps } from "types";

function hasHintCookie() {
  return document.cookie
    .split("; ")
    .includes(`${PRIVATE_ACCESS_HINT_COOKIE}=${PRIVATE_ACCESS_HINT_VALUE}`);
}

// A fresh `?view=all` leaves a session cookie behind. Read it once, then delete
// it, so localStorage is left as the only client-side switch.
function consumeHintCookie() {
  if (!hasHintCookie()) return false;

  document.cookie = `${PRIVATE_ACCESS_HINT_COOKIE}=; Path=/; Max-Age=0`;
  return true;
}

// Reports whether this browser should see private projects.
function hasStoredAccess() {
  const granted = consumeHintCookie();

  try {
    if (granted) {
      window.localStorage.setItem(
        PRIVATE_ACCESS_STORAGE_KEY,
        PRIVATE_ACCESS_STORAGE_VALUE
      );
    }

    return (
      window.localStorage.getItem(PRIVATE_ACCESS_STORAGE_KEY) ===
      PRIVATE_ACCESS_STORAGE_VALUE
    );
  } catch {
    // Private browsing modes can refuse storage access.
    return granted;
  }
}

// Starts from the public list so the first render matches the static HTML, then
// swaps in the full list once the switch is on and the server still agrees.
export function useVisibleProjects(publicProjects: ProjectProps[]) {
  const [projects, setProjects] = useState(publicProjects);

  useEffect(() => {
    if (!hasStoredAccess()) return;

    const controller = new AbortController();

    fetch("/api/projects", { signal: controller.signal })
      .then(async (response) => {
        if (response.status === 401) {
          // Access was revoked or the cookie expired; stop showing the rows.
          try {
            window.localStorage.removeItem(PRIVATE_ACCESS_STORAGE_KEY);
          } catch {}
          return null;
        }
        return response.ok ? ((await response.json()) as ProjectProps[]) : null;
      })
      .then((all) => {
        if (all) setProjects(all);
      })
      .catch(() => {
        // Aborted or offline: the public list stays on screen.
      });

    return () => controller.abort();
  }, []);

  return projects;
}
