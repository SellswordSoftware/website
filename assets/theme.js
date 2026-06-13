function getStoredTheme() {
  return window.localStorage.getItem("sellsword-theme") || "dark";
}

function themeToggleState(theme) {
  if (theme === "dark") {
    return {
      icon: "☾",
      label: "",
      ariaLabel: "Current theme: dark. Switch to light theme.",
    };
  }

  return {
    icon: "☀",
    label: "",
    ariaLabel: "Current theme: light. Switch to dark theme.",
  };
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  window.localStorage.setItem("sellsword-theme", theme);
}

function bindThemeToggle() {
  const button = document.querySelector("[data-theme-toggle]");
  if (!(button instanceof HTMLButtonElement)) {
    return;
  }

  const applyAndLabel = (nextTheme) => {
    applyTheme(nextTheme);
    const state = themeToggleState(nextTheme);
    button.setAttribute("aria-label", state.ariaLabel);
    button.innerHTML = `<span class="theme-toggle__icon" aria-hidden="true">${state.icon}</span>`;
  };

  applyAndLabel(getStoredTheme());

  button.addEventListener("click", () => {
    const nextTheme = getStoredTheme() === "dark" ? "light" : "dark";
    applyAndLabel(nextTheme);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bindThemeToggle, { once: true });
} else {
  bindThemeToggle();
}
