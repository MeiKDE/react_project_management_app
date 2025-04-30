import Button from "./Button";
import { useContext, useEffect } from "react";
import { ProjectManagementContext } from "../../store/project-management-context-provider";

const ProjectSidebar = () => {
  const {
    handleAddProject,
    handleSelectProject,
    projectsState,
    selectedProjectData,
    setProjectsState,
  } = useContext(ProjectManagementContext);

  //When the page loads, check if there’s a saved to-do list in the browser. If yes, load it and use it to show the to-dos.
  useEffect(() => {
    const storedProjectsState = localStorage.getItem("projectsState");
    if (storedProjectsState) {
      try {
        const parsedState = JSON.parse(storedProjectsState);
        if (parsedState && parsedState.projects) {
          setProjectsState(parsedState);
        }
      } catch (error) {
        console.error("Error parsing stored projects:", error);
      }
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // Save to localStorage whenever projectsState changes
  useEffect(() => {
    if (projectsState && projectsState.projects) {
      localStorage.setItem("projectsState", JSON.stringify(projectsState));
    }
  }, [projectsState]);

  return (
    <div className="bg-gray-800 p-4 h-full">
      <h2 className="text-white text-center font-sans font-bold text-lg mb-4">
        YOUR PROJECTS
      </h2>

      <div className="flex justify-center my-5">
        <Button onClick={handleAddProject}>+ Add Project </Button>
      </div>

      <ul className="mt-4">
        {projectsState.projects && projectsState.projects.length > 0 ? (
          projectsState.projects.map((project) => (
            <li
              onClick={() => handleSelectProject(project.id)}
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
};

export default ProjectSidebar;
