import { template } from "../../vendor/naf/naf.ts";
import { ThemeToggle } from "./ThemeToggle.js";

export function Nav() {
  return template`
    <header class="site-header">
      <div class="site-header__inner">
        <a class="brand" href="#/">
          <span class="brand__name">Sellsword Software</span>
          <span class="brand__tag">Software you own. Period.</span>
        </a>
        <nav class="main-nav" aria-label="Primary">
          <a class="nav-link" href="#/">Home</a>
          <a class="nav-link" href="#/projects">Projects</a>
          <a class="nav-link" href="#/products">Products</a>
          <a class="nav-link" href="#/about">About</a>
          ${ThemeToggle()}
        </nav>
      </div>
    </header>
  `;
}
