import { ViewTransition } from "react";

// Type-keyed so untyped navigations (browser back/forward, refresh) stay still
// instead of sliding in an arbitrary direction.
const directional = {
  "nav-forward": "nav-forward",
  "nav-back": "nav-back",
  default: "none",
};

export function DirectionalTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransition enter={directional} exit={directional} default="none">
      {children}
    </ViewTransition>
  );
}
