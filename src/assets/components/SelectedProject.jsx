//Shows when you click on a project in the sidebar
//Displays the project's details
//Has a DELETE button
//Has a TASKS button

import Tasks from "./Tasks";

export default function SelectedProject({
  project,
  onDelete,
  tasks,
  onAddTask,
  onDeleteTask,
}) {
  const formattedDate = new Date(project.dueDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  console.log(formattedDate);

  return (
    <div className="w-[35rem] mt-16">
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-stone-600 mb-2">
            {project.title}
          </h1>
          <button
            className="text-stone-600 hover:text-stone-950"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
        <p className="text-stone-400 mb-4">{formattedDate}</p>
        <p className="text-stone-600 whitespace-pre-wrap">
          {project.description}
        </p>
      </header>
      <Tasks tasks={tasks} onAdd={onAddTask} onDelete={onDeleteTask} />
    </div>
  );
}
