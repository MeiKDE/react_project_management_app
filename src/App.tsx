import ProjectSidebar from "./assets/components/ProjectSidebar";
import NoProject from "./assets/components/NoProject";
import SelectedProject from "./assets/components/SelectedProject";
import NewProject from "./assets/components/NewProject";
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
    tasks: [] as Array<{ id: string; text: string; projectId: string }>,
  });

  // for New Project
  function handleAddProject() {
    setProjectsState((prevProjectsState) => ({
      ...prevProjectsState,
      projectIndicator: null,
    }));
  }

  // for New Project & Project Sidebar
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

  // for New Project
  function handleCancelProject() {
    setProjectsState((prevProjectsState) => ({
      ...prevProjectsState,
      projectIndicator: undefined,
    }));
  }

  // for Project Sidebar
  function handleSelectProject(projectId: number) {
    setProjectsState((prevProjectsState) => ({
      ...prevProjectsState,
      projectIndicator: projectId.toString(),
    }));
  }

  // for Selected Project
  function handleDeleteProject(projectId: number) {
    setProjectsState((prevProjectState) => ({
      ...prevProjectState,
      projects: prevProjectState.projects.filter(
        (project) => project.id !== projectId
      ),
      projectIndicator: undefined, //reset
    }));
  }

  // for Selected Project
  function handleAddTask(text: string) {
    setProjectsState((prevProjectsState) => {
      // Make sure projectIndicator exists
      if (!prevProjectsState.projectIndicator) {
        return prevProjectsState;
      }

      const newTask = {
        id: crypto.randomUUID(),
        text: text,
        projectId: prevProjectsState.projectIndicator,
      };

      return {
        ...prevProjectsState,
        tasks: [...prevProjectsState.tasks, newTask],
      };
    });
  }

  // Add the missing handleDeleteTask function
  function handleDeleteTask(taskId: string) {
    setProjectsState((prevProjectsState) => ({
      ...prevProjectsState,
      tasks: prevProjectsState.tasks.filter((task) => task.id !== taskId),
    }));
  }

  // for Project Sidebar
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
          <NoProject onAddProject={handleAddProject} />
        ) : projectsState.projectIndicator === null ? (
          <NewProject
            onSaveProject={handleSaveProject}
            onCancelProject={handleCancelProject}
          />
        ) : (
          <SelectedProject
            projectsState={projectsState}
            onDeleteProject={handleDeleteProject}
            selectedProjectData={selectedProjectData}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
          />
        )}
      </main>
    </div>
  );
}
