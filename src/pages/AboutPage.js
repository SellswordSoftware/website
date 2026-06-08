import { template } from "../../vendor/naf/naf.ts";

export function AboutPage() {
  return template`
    <section class="copy-section">
      <div class="section-head">
        <p class="hero__eyebrow">About</p>
        <h1 class="section-title">A publisher for software that stays yours.</h1>
        <p class="section-copy">
          Sellsword Software exists to publish tools that behave like products, not rented dependencies on someone else's roadmap.
        </p>
      </div>
      <div class="detail-columns">
        <article class="panel">
          <h2>What we reject</h2>
          <p class="muted">Subscription lock-in, cloud mandates, and product decisions that treat user data as platform leverage.</p>
        </article>
        <article class="panel">
          <h2>What we build</h2>
          <p class="muted">Small, durable tools with clear ownership boundaries, static deployment where possible, and plain technology where practical.</p>
        </article>
        <article class="panel">
          <h2>Why this stack</h2>
          <p class="muted">This site is intentionally built with NAF and NASS so the publisher website also serves as proof that the underlying tools hold up in a real repo.</p>
        </article>
      </div>
    </section>
  `;
}
