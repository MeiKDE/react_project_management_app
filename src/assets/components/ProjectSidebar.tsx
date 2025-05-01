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

  //This code uses two useEffect hooks to load and save data (a list of projects) from/to the browser's localStorage
  //This code runs only once when the component first mounts (because of the empty array [] at the end).
  //It checks if the browser has saved data under the key "projectsState".
  //If it finds data, it tries to convert it from a string into a real object using JSON.parse.
  //If successful, it sets the app’s state to that saved data using setProjectsState.
  //In case the saved data is broken or invalid (like a corrupted string), the code won’t crash — it logs an error instead.
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

  // This code runs every time projectsState changes.
  // It takes the updated state and saves it to localStorage (as a string), so it can be restored next time the user visits.
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
