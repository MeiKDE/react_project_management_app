import Tasks from "./Tasks";

interface ProjectData {
  title: string;
  description: string;
  dueDate: string;
}

interface NewTaskProp {
  projectsState: {
    projectIndicator: undefined | null | string;
    projects: Array<ProjectData & { id: number }>;
    tasks: [];
  };
}

export default function NewTask({ projectsState }: NewTaskProp) {
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
      <Tasks projectState={projectsState} />
    </div>
  );
}
