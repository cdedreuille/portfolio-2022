import { DirectionalTransition } from "components/directional-transition";
import Portfolio from "components/home-page";
import { getProjects } from "lib/projects";

export default function HomePage() {
  return (
    <DirectionalTransition>
      <Portfolio projects={getProjects()} />
    </DirectionalTransition>
  );
}
