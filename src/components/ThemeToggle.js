import { listener, requireRef, template } from "../../vendor/naf/naf.ts";

function getStoredTheme() {
  return window.localStorage.getItem("sellsword-theme") || "dark";
}

function applyTheme(nextTheme) {
  document.documentElement.setAttribute("data-theme", nextTheme);
  window.localStorage.setItem("sellsword-theme", nextTheme);
}

function labelForTheme(theme) {
  return theme === "dark" ? "Theme: dark" : "Theme: light";
}

export function ThemeToggle() {
  return template({
    root: ".theme-toggle",
    onMount(_el, _parent, ctx) {
      const button = requireRef(ctx.refs, "button");
      applyTheme(getStoredTheme());
      button.textContent = labelForTheme(getStoredTheme());

      ctx.cleanup.add(
        listener(button, "click", () => {
          const nextTheme = getStoredTheme() === "dark" ? "light" : "dark";
          applyTheme(nextTheme);
          button.textContent = labelForTheme(nextTheme);
        }),
      );
    },
  })`
    <div class="theme-toggle">
      <button class="theme-toggle__button" type="button" data-ref="button">Theme</button>
    </div>
  `;
}
