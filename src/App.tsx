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
  const [projectsState, setProjectsState] = useState({
    projectIndicator: undefined as undefined | null | string,
    projects: [] as Array<ProjectData & { id: number }>,
    tasks: [] as [],
  });

  // for New Project page
  function handleAddProject() {
    setProjectsState((prevProjectsState) => ({
      ...prevProjectsState,
      projectIndicator: null,
    }));
  }

  // for New Project & Project Sidebar page
  function handleSaveProject(projectData: ProjectData) {
    setProjectsState((prevProjectsState) => {
      const newProject = {
        ...projectData,
        id: Math.random(),
      };
      return {
        ...prevProjectsState,
        projectIndicator: undefined, //reset
        projects: [...prevProjectsState.projects, newProject],
      };
    });
  }

  // for New Project page
  function handleCancelProject() {
    setProjectsState((prevProjectsState) => ({
      ...prevProjectsState,
      projectIndicator: undefined,
    }));
  }

  // for Project Sidebar page
  function handleSelectProject(projectId: number) {
    setProjectsState((prevProjectsState) => ({
      ...prevProjectsState,
      projectIndicator: projectId.toString(),
    }));
  }

  // for Project Sidebar page
  // find the selected project based on projectIndicator
  // Grab data from projects array
  const selectedProjectData =
    projectsState.projects.find(
      (project) => project.id.toString() === projectsState.projectIndicator
    ) || null;

  return (
    <div className="flex flex-row h-screen">
      <aside className="border-red-500 border my-4 basis-1/5 h-full bg-black pt-4 ">
        <ProjectSidebar
          onAddProject={handleAddProject}
          projectsState={projectsState}
          onSelectProject={handleSelectProject}
          selectedProjectData={selectedProjectData}
        />
      </aside>

      <main className="border-blue-500 border my-4 basis-4/5 h-full">
        {projectsState.projectIndicator === undefined ? (
          <NoProjectPage onAddProject={handleAddProject} />
        ) : projectsState.projectIndicator === null ? (
          <NewProjectPage
            onSaveProject={handleSaveProject}
            onCancelProject={handleCancelProject}
          />
        ) : (
          <SelectedProjectPage projectsState={projectsState} />
        )}
      </main>
    </div>
  );
}
