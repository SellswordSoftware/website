import "../vendor/nass/src/entries/index.css";
import "./styles.css";

import { createRouter } from "../vendor/naf/naf.ts";
import { SiteLayout } from "./components/SiteLayout.js";
import { projectList } from "./data/catalog.js";
import { AboutPage } from "./pages/AboutPage.js";
import { HomePage } from "./pages/HomePage.js";
import { NotFoundPage } from "./pages/NotFoundPage.js";
import { ProductPage } from "./pages/ProductPage.js";
import { ProductsPage } from "./pages/ProductsPage.js";
import { ProjectsPage } from "./pages/ProjectsPage.js";

const root = document.querySelector("#app");

if (!root) {
  throw new Error("Could not find #app");
}

if (!window.location.hash) {
  window.location.hash = "#/";
}

const withLayout = (pageFactory) => () => SiteLayout(pageFactory);

const routes = {
  "#/": withLayout(HomePage),
  "#/projects": withLayout(ProjectsPage),
  "#/products": withLayout(ProductsPage),
  "#/about": withLayout(AboutPage),
};

for (const project of projectList) {
  routes[`#/projects/${project.id}`] = withLayout(() => ProductPage(project.id));
}

routes["#/404"] = withLayout(NotFoundPage);

createRouter({
  root,
  routes,
  notFound: withLayout(NotFoundPage),
});
