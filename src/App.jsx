import { useContext } from "react";
import ProjectSidebar from "./assets/components/ProjectSideBar";
import NewProject from "./assets/components/NewProject";
import NoProjectSelected from "./assets/components/NoProjectSelected";
import SelectedProject from "./assets/components/SelectedProject";
import { ProjectManagementContext } from "./store/project-management-context";

function App() {
  const {
    projectsState: { selectedProjectId },
  } = useContext(ProjectManagementContext);

  console.log("selectedProjectId", selectedProjectId);

  let content = <SelectedProject />;

  if (selectedProjectId === null) {
    // console.log("selectedProjectId", selectedProjectId);
    content = (
      <NewProject
        label="Add Project" // label for the input field
        textarea="Description"
        date="Due Date"
      />
    );
  } else if (selectedProjectId === undefined) {
    content = <NoProjectSelected />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar />
      {content}
    </main>
  );
}

export default App;
