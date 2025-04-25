import ProjectSidebar from "./assets/components/ProjectSidebar";
import NoProjectPage from "./assets/components/NoProjectPage";
import SelectedProjectPage from "./assets/components/SelectedProjectPage";
import NewProjectPage from "./assets/components/NewProjectPage";
import React, { useState } from "react";

export default function App() {
  const [projectsState, setProjectState] = useState({
    projectIndicator: undefined as undefined | null | string,
    projects: [] as any[],
    tasks: [] as any[],
  });

  function handleAddProject() {
    setProjectState((prevProjectState) => ({
      ...prevProjectState,
      projectIndicator: null,
    }));
  }

  return (
    <div className="flex flex-row h-screen">
      <aside className="border-red-500 border my-4 basis-1/5 h-full bg-black pt-4 ">
        <ProjectSidebar AddProject={handleAddProject} />
      </aside>

      <main className="border-blue-500 border my-4 basis-4/5 h-full">
        {projectsState.projectIndicator === undefined ? (
          <NoProjectPage AddProject={handleAddProject} />
        ) : projectsState.projectIndicator === null ? (
          <NewProjectPage />
        ) : (
          <SelectedProjectPage />
        )}
      </main>
    </div>
  );
}
