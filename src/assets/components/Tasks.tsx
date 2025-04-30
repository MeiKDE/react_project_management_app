import { useContext } from "react";
import { ProjectManagementContext } from "../../store/project-management-context-provider";

export default function Tasks() {
  const { projectsState, handleDeleteTask } = useContext(
    ProjectManagementContext
  );

  return (
    <ul className="p-4 rounded-lg bg-white shadow-md">
      {projectsState.tasks
        .filter(
          (task) =>
            task.projectId === projectsState.projectIndicator?.toString()
        )
        .map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between p-3 mb-2 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <span className="text-gray-700">{task.text}</span>
            <button
              className="px-3 py-1 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
              onClick={() => handleDeleteTask(task.id)}
            >
              Delete
            </button>
          </li>
        ))}
    </ul>
  );
}
