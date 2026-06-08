import { template } from "../../vendor/naf/naf.ts";

export function NotFoundPage() {
  return template`
    <section class="panel copy-section">
      <p class="hero__eyebrow">404</p>
      <h1 class="section-title">That route does not exist.</h1>
      <p class="section-copy">The router is hash-based so the site stays static-host friendly. Head back to the main pages from here.</p>
      <div class="hero__actions">
        <a class="button-link button-link--primary" href="#/">Go home</a>
        <a class="button-link button-link--secondary" href="#/projects">View projects</a>
      </div>
    </section>
  `;
}
