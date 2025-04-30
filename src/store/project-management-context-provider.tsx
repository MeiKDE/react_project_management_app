import React, { useState, ReactNode, createContext } from "react";
import { ProjectData } from "../types";

export interface ProjectManagementContextType {
  handleAddProject: () => void;
  handleSaveProject: (projectData: Omit<ProjectData, "id">) => void;
  handleCancelProject: () => void;
  handleSelectProject: (projectId: number) => void;
  handleDeleteProject: (projectId: number) => void;
  handleAddTask: (text: string) => void;
  handleDeleteTask: (taskId: string) => void;
  projectsState: {
    projectIndicator: undefined | null | string;
    projects: Array<ProjectData & { id: number }>;
    tasks: Array<{ id: string; text: string; projectId: string }>;
  };
  selectedProjectData: (ProjectData & { id: number }) | null;
}

export const ProjectManagementContext =
  createContext<ProjectManagementContextType>({
    handleAddProject: () => {},
    handleSaveProject: () => {},
    handleCancelProject: () => {},
    handleSelectProject: () => {},
    handleDeleteProject: () => {},
    handleAddTask: () => {},
    handleDeleteTask: () => {},
    projectsState: {
      projectIndicator: undefined,
      projects: [],
      tasks: [],
    },
    selectedProjectData: null,
  });

export const ProjectManagementContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [projectsState, setProjectsState] = useState({
    projectIndicator: undefined as undefined | null | string,
    projects: [] as Array<ProjectData & { id: number }>,
    tasks: [] as Array<{ id: string; text: string; projectId: string }>,
  });

  function handleAddProject() {
    console.log("entering handleAddProject()");
    setProjectsState((prevState) => ({
      ...prevState,
      projectIndicator: null,
    }));
  }

  function handleSaveProject(projectData: Omit<ProjectData, "id">) {
    setProjectsState((prevState) => {
      const newProject = {
        ...projectData,
        id: Math.random(),
      };
      return {
        ...prevState,
        projectIndicator: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  function handleCancelProject() {
    setProjectsState((prevState) => ({
      ...prevState,
      projectIndicator: undefined,
    }));
  }

  function handleSelectProject(projectId: number) {
    setProjectsState((prevState) => ({
      ...prevState,
      projectIndicator: projectId.toString(),
    }));
  }

  function handleDeleteProject(projectId: number) {
    setProjectsState((prevState) => ({
      ...prevState,
      projects: prevState.projects.filter(
        (project) => project.id !== projectId
      ),
      projectIndicator: undefined,
    }));
  }

  function handleAddTask(text: string) {
    setProjectsState((prevState) => {
      if (!prevState.projectIndicator) {
        return prevState;
      }
      const newTask = {
        id: crypto.randomUUID(),
        text: text,
        projectId: prevState.projectIndicator,
      };
      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask],
      };
    });
  }

  function handleDeleteTask(taskId: string) {
    setProjectsState((prevState) => ({
      ...prevState,
      tasks: prevState.tasks.filter((task) => task.id !== taskId),
    }));
  }

  const selectedProjectData =
    projectsState.projects.find(
      (project) => project.id.toString() === projectsState.projectIndicator
    ) || null;

  const ctxValue = {
    handleAddProject,
    handleSaveProject,
    handleCancelProject,
    handleSelectProject,
    handleDeleteProject,
    handleAddTask,
    handleDeleteTask,
    projectsState,
    selectedProjectData,
  };

  return (
    <ProjectManagementContext.Provider value={ctxValue}>
      {children}
    </ProjectManagementContext.Provider>
  );
};

// export { ProjectManagementContext, ProjectManagementContextProvider };
