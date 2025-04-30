import ProjectSidebar from "./assets/components/ProjectSidebar";
import NoProjectSelected from "./assets/components/NoProjectSelected";
import SelectedProject from "./assets/components/SelectedProject";
import NewProject from "./assets/components/NewProject";
import { useContext } from "react";
import { ProjectManagementContext } from "./store/project-management-context-provider";

export default function App() {
  const { projectsState } = useContext(ProjectManagementContext);

  return (
    <div className="flex flex-row h-screen">
      <aside className="border-red-500 border my-4 basis-1/5 h-full bg-black pt-4 ">
        <ProjectSidebar />
      </aside>

      <main className="border-blue-500 border my-4 basis-4/5 h-full">
        {projectsState.projectIndicator === undefined ? (
          <NoProjectSelected />
        ) : projectsState.projectIndicator === null ? (
          <NewProject />
        ) : (
          <SelectedProject />
        )}
      </main>
    </div>
  );
}
