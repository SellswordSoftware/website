import { template } from "../../vendor/naf/naf.ts";

export function Footer() {
  return template`
    <footer class="site-footer">
      <div class="site-footer__inner">
        <p class="muted">Sellsword Software builds tools you own.</p>
        <div class="footer-links">
          <a href="#/projects">Projects</a>
          <a href="#/products">Products</a>
          <a href="#/about">About</a>
          <a href="https://github.com/SellswordSoftware" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </div>
    </footer>
  `;
}
