import NewTask from "./NewTask";

interface ProjectData {
  id: number;
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

export default function SelectedProjectPage({ projectsState }: NewTaskProp) {
  return (
    <>
      <div>
        <h1>Project Title</h1>
        <button>Delete</button>
      </div>
      <h2>Project Description</h2>

      <NewTask projectsState={projectsState} />
    </>
  );
}
