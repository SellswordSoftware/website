import justbookmarks from "./projects/justbookmarks.json";
import justpeek from "./projects/justpeek.json";
import naf from "./projects/naf.json";
import nass from "./projects/nass.json";
import projects from "./projects.json";

const detailsById = {
  naf,
  nass,
  justbookmarks,
  justpeek,
};

export const projectList = projects.map((project) => ({
  ...project,
  detailRoute: `#/projects/${project.id}`,
}));

export function getProject(id) {
  const project = detailsById[id];
  if (!project) {
    throw new Error(`Unknown project: ${id}`);
  }
  return project;
}
