import { each, template } from "../../vendor/naf/naf.ts";
import { ProjectCard } from "../components/ProjectCard.js";
import { projectList } from "../data/catalog.js";

export function ProjectsPage() {
  return template`
    <section>
      <div class="section-head">
        <p class="hero__eyebrow">Projects</p>
        <h1 class="section-title">MIT-licensed tools today, more products later.</h1>
        <p class="section-copy">Each page is driven by project JSON so expanding the catalog does not require building a new page system every time.</p>
      </div>
      <div class="project-grid">
        ${each(() => projectList, (project) => ProjectCard(project))}
      </div>
    </section>
  `;
}
