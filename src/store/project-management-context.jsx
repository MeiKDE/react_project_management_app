import { createContext, useState } from "react";

export const ProjectManagementContext = createContext({
  handleAddTask: () => {},
  handleDeleteTask: () => {},
  handleSaveProject: () => {},
  handleCancelProject: () => {},
  handleDeleteProject: () => {},
  handleAddProject: () => {},
  handleSelectedProject: () => {},
  getSelectedProject: () => {},
  projectsState: () => {},
  setProjectsState: () => {},
});

export function ProjectManagementContextProvider({ children }) {
  // STATE: uses a special technique with selectedProjectId to control what's shown:
  // undefined: No project selected (show welcome screen)
  // null: Adding a new project (show form)
  // id: A project is selected (show details)
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  function handleAddTask(text) {
    console.log("check text value ", text);
    setProjectsState((prevProjectsState) => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevProjectsState.selectedProjectId,
        id: taskId,
      };
      return {
        ...prevProjectsState,
        tasks: [newTask, ...prevProjectsState.tasks],
      };
    });
  }

  function handleDeleteTask(taskId) {
    setProjectsState((prevProjectsState) => ({
      ...prevProjectsState,
      tasks: prevProjectsState.tasks.filter((task) => task.id !== taskId),
    }));
  }

  //SIDEBAR: Called when you select a project
  function handleSelectedProject(id) {
    setProjectsState((prevProjectsState) => ({
      ...prevProjectsState,
      selectedProjectId: id,
    }));
  }

  //Called when you click the "Add Project" button
  function handleAddProject() {
    console.log("handleAddProject called");
    setProjectsState((prevProjectsState) => ({
      ...prevProjectsState,
      selectedProjectId: null, // act as a signal to show we're adding a new project
    }));
  }

  //SIDEBAR or NEW PROJECT: This is called when SAVE button is clicked
  function handleSaveProject(projectData) {
    setProjectsState((prevState) => {
      const newProject = {
        ...projectData,
        id: Math.random(),
      };
      return {
        ...prevState,
        selectedProjectId: undefined, // reset the selected project id to undefined
        projects: [...prevState.projects, newProject],
      };
    });
  }

  //Called when you CANCEL adding a project
  function handleCancelProject() {
    setProjectsState((prevState) => ({
      ...prevState,
      selectedProjectId: undefined,
    }));
  }

  //Called when you DELETE a project
  function handleDeleteProject() {
    setProjectsState((prevState) => ({
      ...prevState,
      selectedProjectId: undefined, // reset the selected project id to undefined
      projects: prevState.projects.filter(
        (project) => project.id !== prevState.selectedProjectId
      ),
    }));
  }

  // query for the selected project
  // selectedProject is a project object
  function getSelectedProject() {
    const selectedProject = projectsState.projects.find(
      (project) => project.id === projectsState.selectedProjectId
    );
    return selectedProject;
  }

  const ctxValue = {
    handleAddTask: handleAddTask,
    handleDeleteTask: handleDeleteTask,
    handleSelectedProject: handleSelectedProject,
    handleAddProject: handleAddProject,
    handleSaveProject: handleSaveProject,
    handleCancelProject: handleCancelProject,
    handleDeleteProject: handleDeleteProject,
    getSelectedProject: getSelectedProject,
    projectsState: projectsState,
    setProjectsState: setProjectsState,
  };

  return (
    <ProjectManagementContext.Provider value={ctxValue}>
      {children}
    </ProjectManagementContext.Provider>
  );
}
