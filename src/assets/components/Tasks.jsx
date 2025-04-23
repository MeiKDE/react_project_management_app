import NewTask from "./NewTask";

export default function Tasks({ tasks, onAdd, onDelete, projectId }) {
  console.log("Check tasks projectId and project projectId");
  console.log(tasks.projectId);
  console.log(projectId);
  return (
    <section>
      <h2 className="text-2xl font-bold my-4 text-stone-700">Tasks</h2>
      <NewTask onAdd={onAdd} />
      {tasks && tasks.length === 0 && (
        <p className="text-stone-800 my-4">
          This project doesn't have any task yet.
        </p>
      )}
      {tasks && tasks.length > 0 && (
        <ul className="p-4 mt8 rounded-md bg-stone-100">
          {tasks
            .filter((task) => task.projectId === projectId)
            .map((task) => (
              <li key={task.id} className="flex justify-between my-4">
                <span>{task.text}</span>
                <button
                  onClick={() => onDelete(task.id)}
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
