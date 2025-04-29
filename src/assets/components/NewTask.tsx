import { useRef, forwardRef, ForwardedRef } from "react";
export interface NewTaskProp {
  onAddTask: (text: string) => void;
}

const NewTask = forwardRef(function NewTask(
  { onAddTask }: NewTaskProp,
  ref: ForwardedRef<HTMLDivElement>
) {
  const taskRef = useRef<HTMLInputElement>(null);

  const handleAddTask = () => {
    const enteredTask = taskRef.current?.value.trim();
    if (!enteredTask || enteredTask.length === 0) {
      alert("Please enter a task");
      return;
    }
    onAddTask(enteredTask);
    if (taskRef.current) {
      taskRef.current.value = "";
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Tasks</h1>
      <div ref={ref} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="task" className="text-sm font-medium text-gray-700">
            Task
          </label>
          <div className="flex gap-3">
            <input
              ref={taskRef}
              placeholder="Enter your task here..."
              type="text"
              id="task"
              className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
            <button
              onClick={handleAddTask}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Add Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default NewTask;
