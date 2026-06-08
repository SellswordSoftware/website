import { template } from "../../vendor/naf/naf.ts";
import { Footer } from "./Footer.js";
import { Nav } from "./Nav.js";

export function SiteLayout(pageFactory) {
  return template`
    <div class="site-shell">
      ${Nav()}
      <main class="site-main">
        ${pageFactory()}
      </main>
      ${Footer()}
    </div>
  `;
}
