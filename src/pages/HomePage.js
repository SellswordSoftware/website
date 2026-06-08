import { each, template } from "../../vendor/naf/naf.ts";
import { projectList } from "../data/catalog.js";
import { ProjectCard } from "../components/ProjectCard.js";

export function HomePage() {
  return template`
    <section class="hero">
      <p class="hero__eyebrow">Anti-SaaS software publisher</p>
      <h1 class="hero__title">Software you own. Period.</h1>
      <p class="hero__copy">
        Sellsword Software ships tools for developers who want durable software, local control, and fewer moving parts. This site is a vanilla JS SPA powered by NAF and styled with NASS.
      </p>
      <div class="hero__actions">
        <a class="button-link button-link--primary" href="#/projects">Browse projects</a>
        <a class="button-link button-link--secondary" href="#/about">Read the philosophy</a>
      </div>
    </section>
    <section>
      <div class="section-head">
        <p class="hero__eyebrow">Principles</p>
        <h2 class="section-title">Build for ownership, not dependence.</h2>
      </div>
      <div class="pillars">
        <article class="panel">
          <h3>Own your data</h3>
          <p class="muted">Products should keep working without a service deciding whether your workflow is still allowed.</p>
        </article>
        <article class="panel">
          <h3>Own your software</h3>
          <p class="muted">Licenses should be straightforward and deployment targets should stay portable.</p>
        </article>
        <article class="panel">
          <h3>Own the stack</h3>
          <p class="muted">The website itself uses Sellsword libraries directly instead of treating them as marketing props.</p>
        </article>
      </div>
    </section>
    <section>
      <div class="section-head">
        <p class="hero__eyebrow">Projects</p>
        <h2 class="section-title">Current lineup</h2>
        <p class="section-copy">The content is data-driven now so future project pages are content work, not architecture churn.</p>
      </div>
      <div class="project-grid">
        ${each(() => projectList, (project) => ProjectCard(project))}
      </div>
    </section>
    <section class="panel">
      <div class="section-head">
        <p class="hero__eyebrow">Commercial products</p>
        <h2 class="section-title">Coming soon</h2>
      </div>
      <p class="section-copy">Paid products will follow the same ownership model: buy it, run it, keep it.</p>
    </section>
  `;
}
