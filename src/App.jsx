import { useState } from "react";
import ProjectSidebar from "./assets/components/ProjectSideBar";
import NewProject from "./assets/components/NewProject";
import NoProjectSelected from "./assets/components/NoProjectSelected";
import SelectedProject from "./assets/components/SelectedProject";

function App() {
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
  function handleCancelAddProject() {
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

  console.log(projectsState);

  // query for the selected project
  // selectedProject is a project object
  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );
  console.log("check selectedProject", selectedProject);

  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      tasks={projectsState.tasks}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
    />
  );

  if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject
        onAdd={handleAddProject}
        onCancel={handleCancelAddProject}
        onSave={handleSaveProject}
        label="Add Project" // label for the input field
        textarea="Description"
        date="Due Date"
      />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onAddProject={handleAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar
        onAdd={handleAddProject}
        projects={projectsState.projects}
        onSelect={handleSelectedProject}
        selectedProjectId={projectsState.selectedProjectId} // Add this line
      />
      {content}
    </main>
  );
}

export default App;
