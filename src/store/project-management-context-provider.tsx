import React, { useState, useEffect, ReactNode, createContext } from "react";
import { ProjectData } from "../types";

export type ProjectManagementContextType = {
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
  setProjectsState: React.Dispatch<
    React.SetStateAction<{
      projectIndicator: undefined | null | string;
      projects: Array<ProjectData & { id: number }>;
      tasks: Array<{ id: string; text: string; projectId: string }>;
    }>
  >;
};

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
    setProjectsState: () => {},
  });

export const ProjectManagementContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [projectsState, setProjectsState] = useState(() => {
    // Initialize state from localStorage if available
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("projectsState");
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (error) {
          console.error("Error parsing stored projects:", error);
        }
      }
    }
    // Return default state if no stored data
    return { projects: [] };
  });

  function handleAddProject() {
    console.log("entering handleAddProject()");
    setProjectsState(
      (prevState: ProjectManagementContextType["projectsState"]) => ({
        ...prevState,
        projectIndicator: null,
      })
    );
  }

  function handleSaveProject(projectData: Omit<ProjectData, "id">) {
    setProjectsState(
      (prevState: ProjectManagementContextType["projectsState"]) => {
        const newProject = {
          ...projectData,
          id: Math.random(),
        };
        return {
          ...prevState,
          projectIndicator: undefined,
          projects: [...prevState.projects, newProject],
        };
      }
    );
  }

  function handleCancelProject() {
    setProjectsState(
      (prevState: ProjectManagementContextType["projectsState"]) => ({
        ...prevState,
        projectIndicator: undefined,
      })
    );
  }

  function handleSelectProject(projectId: number) {
    setProjectsState(
      (prevState: ProjectManagementContextType["projectsState"]) => ({
        ...prevState,
        projectIndicator: projectId.toString(),
      })
    );
  }

  function handleDeleteProject(projectId: number) {
    setProjectsState(
      (prevState: ProjectManagementContextType["projectsState"]) => ({
        ...prevState,
        projects: prevState.projects.filter(
          (project: ProjectData & { id: number }) => project.id !== projectId
        ),
        projectIndicator: undefined,
      })
    );
  }

  function handleAddTask(text: string) {
    setProjectsState(
      (prevState: ProjectManagementContextType["projectsState"]) => {
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
      }
    );
  }

  function handleDeleteTask(taskId: string) {
    setProjectsState(
      (prevState: ProjectManagementContextType["projectsState"]) => ({
        ...prevState,
        tasks: prevState.tasks.filter(
          (task: { id: string; text: string; projectId: string }) =>
            task.id !== taskId
        ),
      })
    );
  }

  const selectedProjectData =
    projectsState.projects.find(
      (project: ProjectData & { id: number }) =>
        project.id.toString() === projectsState.projectIndicator
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
    setProjectsState,
  };

  return (
    <ProjectManagementContext.Provider value={ctxValue}>
      {children}
    </ProjectManagementContext.Provider>
  );
};

// export { ProjectManagementContext, ProjectManagementContextProvider };
