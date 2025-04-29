interface ProjectData {
  title: string;
  description: string;
  dueDate: string;
}

interface TasksProps {
  projectState: {
    projectIndicator: undefined | null | string;
    projects: Array<ProjectData & { id: number }>;
    tasks: Array<{ id: string; text: string; projectId: string }>;
  };
  onDeleteTask: (taskId: string) => void;
}

export default function Tasks({ projectState, onDeleteTask }: TasksProps) {
  return (
    <ul className="p-4 rounded-lg bg-white shadow-md">
      {projectState.tasks
        .filter(
          (task) => task.projectId === projectState.projectIndicator?.toString()
        )
        .map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between p-3 mb-2 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <span className="text-gray-700">{task.text}</span>
            <button
              className="px-3 py-1 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
              onClick={() => onDeleteTask(task.id)}
            >
              Delete
            </button>
          </li>
        ))}
    </ul>
  );
}
