import Button from "./Button";

interface ProjectData {
  title: string;
  description: string;
  dueDate: string;
}

interface ProjectSidebarProps {
  addProject: () => void;
  projectsState: {
    projectIndicator: undefined | null | string;
    projects: Array<ProjectData & { id: number }>;
    tasks: [];
  };
  selectedProject: (projectId: number) => void;
}

export default function ProjectSidebar({
  addProject,
  projectsState,
  selectedProject,
}: ProjectSidebarProps) {
  console.log("check projects array", projectsState.projects);

  return (
    <div>
      <h2 className="text-white text-center font-sans font-bold text-lg">
        YOUR PROJECTS
      </h2>

      <div className="flex justify-center my-5">
        <Button onClick={addProject}>+ Add Project </Button>
      </div>

      <ul className="border-green-300">
        {projectsState.projects && projectsState.projects.length > 0 ? (
          projectsState.projects.map((project) => (
            <li
              onClick={() => selectedProject(project.id)}
              key={project.id}
              className="text-white text-center font-sans"
            >
              {project.title}
            </li>
          ))
        ) : (
          <li> No projects available </li>
        )}
      </ul>
    </div>
  );
}
