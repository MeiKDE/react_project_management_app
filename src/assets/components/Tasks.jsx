import NewTask from "./NewTask";
import { useContext } from "react";
import { ProjectManagementContext } from "../../store/project-management-context";

export default function Tasks({}) {
  const {
    projectsState: { tasks, selectedProjectId },
    handleDeleteTask,
  } = useContext(ProjectManagementContext);
  return (
    <section>
      <h2 className="text-2xl font-bold my-4 text-stone-700">Tasks</h2>
      <NewTask />
      {tasks && tasks.length === 0 && (
        <p className="text-stone-800 my-4">
          This project doesn't have any task yet.
        </p>
      )}
      {tasks && tasks.length > 0 && (
        <ul className="p-4 mt8 rounded-md bg-stone-100">
          {tasks
            .filter((task) => task.projectId === selectedProjectId)
            .map((task) => (
              <li key={task.id} className="flex justify-between my-4">
                <span>{task.text}</span>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="text-stone-700 hover:text-red-500"
                >
                  Clear
                </button>
              </li>
            ))}
        </ul>
      )}
    </section>
  );
}
