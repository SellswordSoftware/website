import { template } from "../../vendor/naf/naf.ts";
import { getProject } from "../data/catalog.js";

export function ProductPage(projectId) {
  const project = getProject(projectId);

  return template`
    <section class="detail-hero">
      <div>
        <p class="detail-hero__eyebrow">Project detail</p>
        <h1 class="detail-hero__title">${project.name}</h1>
        <p class="detail-hero__copy">${project.oneLiner}</p>
      </div>
      <div class="meta-list">
        <span class="badge">${project.license}</span>
        <span class="badge badge--muted">${project.status}</span>
      </div>
      <div class="detail-hero__actions">
        ${
          project.repo
            ? `<a class="button-link button-link--primary" href="${project.repo}" target="_blank" rel="noreferrer">Repository</a>`
            : ""
        }
        ${
          project.docs
            ? `<a class="button-link button-link--secondary" href="${project.docs}" target="_blank" rel="noreferrer">Docs</a>`
            : ""
        }
        ${
          project.releases
            ? `<a class="button-link button-link--secondary" href="${project.releases}" target="_blank" rel="noreferrer">Releases</a>`
            : ""
        }
      </div>
    </section>
    <section class="detail-meta">
      <article class="panel">
        <h2>Status</h2>
        <p class="muted">${project.status}</p>
      </article>
      <article class="panel">
        <h2>License</h2>
        <p class="muted">${project.license}</p>
      </article>
      <article class="panel">
        <h2>Architecture</h2>
        <p class="muted">JSON-driven route entry with one reusable page template.</p>
      </article>
    </section>
    <section class="detail-columns">
      <article class="panel copy-section">
        <h2>Description</h2>
        ${project.description.map((paragraph) => `<p class="muted">${paragraph}</p>`).join("")}
      </article>
      <article class="panel copy-section">
        <h2>Features</h2>
        <ul>
          ${project.features.map((feature) => `<li>${feature}</li>`).join("")}
        </ul>
      </article>
      <article class="panel copy-section">
        <h2>Install / Use</h2>
        <ul>
          ${project.install.map((step) => `<li>${step}</li>`).join("")}
        </ul>
      </article>
    </section>
  `;
}
