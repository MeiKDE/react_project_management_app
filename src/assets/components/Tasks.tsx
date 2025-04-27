interface ProjectData {
  title: string;
  description: string;
  dueDate: string;
}

interface TasksProps {
  projectState: {
    projectIndicator: undefined | null | string;
    projects: Array<ProjectData & { id: number }>;
    tasks: [];
  };
}

export default function Tasks({ projectState }: TasksProps) {
  return (
    <ul className="border-green-300">
      {projectState.projects.map((project) => (
        <li key={project.id}>{project.title}</li>
      ))}
    </ul>
  );
}
