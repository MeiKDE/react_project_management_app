import Button from "./Button";
import { useContext } from "react";
import { ProjectManagementContext } from "../../store/project-management-context";

export default function ProjectSidebar({}) {
  const { projectsState, handleSelectedProject, handleAddProject } = useContext(
    ProjectManagementContext
  );
  return (
    <aside className="w-1/2 px-8 py-16 bg-stone-900 text-stone-50 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
        Your Projects
      </h2>
      <div>
        <Button
          onClick={() => {
            console.log("Add Project clicked");
            console.log("projectState", projectsState);
            handleAddProject();
          }}
        >
          + Add Project
        </Button>
      </div>
      <ul className="mt-8">
        {projectsState.projects.map((project) => {
          let cssClasses =
            "w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800";

          if (project.id === projectsState.selectedProjectId) {
            cssClasses += " bg-stone-800 text-stone-200";
          } else {
            cssClasses +=
              " text-stone-400 hover:text-stone-200 hover:bg-stone-800";
          }

          return (
            <li key={project.id}>
              <button
                onClick={() => {
                  console.log("Clicking project with ID:", project.id);
                  console.log(
                    "Current selectedProjectId:",
                    projectsState.selectedProjectId
                  );
                  handleSelectedProject(project.id);
                }}
                className={cssClasses}
              >
                {project.title}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
