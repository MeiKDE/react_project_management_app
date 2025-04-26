interface ProjectData {
  title: string;
  description: string;
  dueDate: Date;
}

interface TasksProps {
  currentProjectState: {
    projectIndicator: undefined | null | string;
    projects: Array<ProjectData & { id: number }>;
    tasks: [];
  };
}

export default function Tasks({ currentProjectState }: TasksProps) {
  return (
    <ul className="border-green-300">
      {currentProjectState.projects.map((project) => (
        <li key={project.id}>{project.title}</li>
      ))}
    </ul>
  );
}
