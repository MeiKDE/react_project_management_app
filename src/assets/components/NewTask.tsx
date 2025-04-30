import { useContext, useRef } from "react";
import { ProjectManagementContext } from "../../store/project-management-context-provider";

export default function NewTask() {
  const { handleAddTask } = useContext(ProjectManagementContext);
  const taskRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskRef.current && taskRef.current.value.trim()) {
      handleAddTask(taskRef.current.value);
      taskRef.current.value = "";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-4">
      <input
        ref={taskRef}
        type="text"
        className="w-full p-2 border rounded-md"
        placeholder="Add a new task..."
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Add
      </button>
    </form>
  );
}
