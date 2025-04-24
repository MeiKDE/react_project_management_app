//Shows when you click on a project in the sidebar
//Displays the project's details
//Has a DELETE button
//Has a TASKS button

import { useContext } from "react";
import { ProjectManagementContext } from "../../store/project-management-context";

import Tasks from "./Tasks";

export default function SelectedProject() {
  const {
    handleAddTask,
    handleDeleteTask,
    handleDeleteProject,
    projectsState: { selectedProjectId, projects, tasks },
    getSelectedProject,
  } = useContext(ProjectManagementContext);

  return (
    <div className="w-[35rem] mt-16">
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-stone-600 mb-2">
            {getSelectedProject().title}
          </h1>
          <button
            className="text-stone-600 hover:text-stone-950"
            onClick={handleDeleteProject}
          >
            Delete
          </button>
        </div>
        <p className="text-stone-400 mb-4">
          {getSelectedProject().formattedDate}
        </p>
        <p className="text-stone-600 whitespace-pre-wrap">
          {getSelectedProject().description}
        </p>
      </header>
      <Tasks
        tasks={tasks}
        onAdd={handleAddTask}
        onDelete={handleDeleteTask}
        projectId={selectedProjectId}
      />
    </div>
  );
}
