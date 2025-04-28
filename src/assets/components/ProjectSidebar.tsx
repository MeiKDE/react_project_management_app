import Button from "./Button";

interface ProjectData {
  title: string;
  description: string;
  dueDate: string;
}

interface ProjectSidebarProps {
  onAddProject: () => void;
  projectsState: {
    projectIndicator: undefined | null | string;
    projects: Array<ProjectData & { id: number }>;
    tasks: [];
  };
  onSelectProject: (projectId: number) => void;
  selectedProjectData: {
    id: number;
    title: string;
    description: string;
    dueDate: string;
  } | null;
}

export default function ProjectSidebar({
  onAddProject,
  projectsState,
  onSelectProject,
  selectedProjectData,
}: ProjectSidebarProps) {
  console.log("check selectedProject function", onSelectProject);
  console.log("check selectedProjectData", selectedProjectData);
  console.log("projectsState.projectIndicator", projectsState.projectIndicator);
  console.log("check projects array", projectsState.projects);

  return (
    <div className="bg-gray-800 p-4 h-full">
      <h2 className="text-white text-center font-sans font-bold text-lg mb-4">
        YOUR PROJECTS
      </h2>

      <div className="flex justify-center my-5">
        <Button onClick={onAddProject}>+ Add Project </Button>
      </div>

      <ul className="mt-4">
        {projectsState.projects && projectsState.projects.length > 0 ? (
          projectsState.projects.map((project) => (
            <li
              onClick={() => onSelectProject(project.id)}
              key={project.id}
              className={`text-white font-sans p-3 my-2 rounded cursor-pointer transition-colors ${
                selectedProjectData && selectedProjectData.id === project.id
                  ? "bg-gray-600 font-semibold border-l-4 border-green-400"
                  : "hover:bg-gray-700"
              }`}
            >
              <div className="flex flex-col">
                <span className="text-md">{project.title}</span>
                {selectedProjectData &&
                  selectedProjectData.id === project.id && (
                    <span className="text-xs text-gray-300 mt-1">
                      Due: {new Date(project.dueDate).toLocaleDateString()}
                    </span>
                  )}
              </div>
            </li>
          ))
        ) : (
          <li className="text-white text-center p-2">No projects available</li>
        )}
      </ul>
    </div>
  );
}
