import { template } from "../../vendor/naf/naf.ts";

export function ProductsPage() {
  return template`
    <section class="panel copy-section">
      <p class="hero__eyebrow">Products</p>
      <h1 class="section-title">Commercial products are coming, not subscriptions.</h1>
      <p class="section-copy">
        This route is already in place so future paid offerings can slot into the site without reworking navigation or layout. The model stays simple: pay once, own the software.
      </p>
    </section>
  `;
}
