import { template } from "../../vendor/naf/naf.ts";

export function ProjectCard(project) {
  return template`
    <article class="panel project-card">
      <div class="project-card__header">
        <span class="badge">${project.license}</span>
        <span class="badge badge--muted">${project.status}</span>
      </div>
      <div>
        <h3 class="project-card__title">${project.name}</h3>
        <p class="muted">${project.oneLiner}</p>
      </div>
      <div class="project-card__actions">
        <a class="button-link button-link--secondary" href="${project.detailRoute}">Open page</a>
        ${
          project.repo
            ? `<a class="button-link button-link--secondary" href="${project.repo}" target="_blank" rel="noreferrer">Repository</a>`
            : ""
        }
      </div>
    </article>
  `;
}
