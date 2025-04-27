import ProjectSidebar from "./assets/components/ProjectSidebar";
import NoProjectPage from "./assets/components/NoProjectPage";
import SelectedProjectPage from "./assets/components/SelectedProjectPage";
import NewProjectPage from "./assets/components/NewProjectPage";
import { useState } from "react";

// Define an interface for project data
interface ProjectData {
  title: string;
  description: string;
  dueDate: string;
}

export default function App() {
  const [projectsState, setProjectState] = useState({
    projectIndicator: undefined as undefined | null | string,
    projects: [] as Array<ProjectData & { id: number }>,
    tasks: [] as [],
  });

  // for New Project page
  function handleAddProject() {
    setProjectState((prevProjectState) => ({
      ...prevProjectState,
      projectIndicator: null,
    }));
  }

  // for New Project & Project Sidebar page
  function handleSaveProject(projectData: ProjectData) {
    setProjectState((prevProjectState) => {
      const newProject = {
        ...projectData,
        id: Math.random(),
      };
      return {
        ...prevProjectState,
        projectIndicator: undefined, //reset
        projects: [...prevProjectState.projects, newProject],
      };
    });
  }

  // for New Project page
  function handleCancelProject() {
    setProjectState((prevProjectState) => ({
      ...prevProjectState,
      projectIndicator: undefined,
    }));
  }

  // for Project Sidebar page

  function handleSelectProject(projectId: number) {
    setProjectState((prevProjectState) => ({
      ...prevProjectState,
      id: projectId,
    }));
  }

  return (
    <div className="flex flex-row h-screen">
      <aside className="border-red-500 border my-4 basis-1/5 h-full bg-black pt-4 ">
        <ProjectSidebar
          addProject={handleAddProject}
          projectsState={projectsState}
          selectedProject={handleSelectProject}
        />
      </aside>

      <main className="border-blue-500 border my-4 basis-4/5 h-full">
        {projectsState.projectIndicator === undefined ? (
          <NoProjectPage addProject={handleAddProject} />
        ) : projectsState.projectIndicator === null ? (
          <NewProjectPage
            saveProject={handleSaveProject}
            cancelProject={handleCancelProject}
          />
        ) : (
          <SelectedProjectPage projectsState={projectsState} />
        )}
      </main>
    </div>
  );
}
