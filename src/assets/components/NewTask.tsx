import Tasks from "./Tasks";

export default function NewTask() {
  return (
    <div className="border-red-300">
      <h1> Tasks</h1>
      <div>
        <input
          placeholder="enter task"
          type="text"
          className="border p-2 rounded w-80"
        />
        <button> Add Task</button>
      </div>
      <Tasks />
    </div>
  );
}
