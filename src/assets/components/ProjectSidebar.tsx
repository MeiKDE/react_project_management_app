import Button from "./Button";
import Tasks from "./Tasks";

interface ProjectData {
  title: string;
  description: string;
  dueDate: Date;
}

interface ProjectSidebarProps {
  addProject: () => void;
  currentProjectState: {
    projectIndicator: undefined | null | string;
    projects: Array<ProjectData & { id: number }>;
    tasks: [];
  };
}

export default function ProjectSidebar({
  addProject,
  currentProjectState,
}: ProjectSidebarProps) {
  return (
    <div>
      <h2 className="text-white text-center font-sans font-bold text-lg">
        YOUR PROJECTS
      </h2>

      <div className="flex justify-center my-5">
        <Button onClick={addProject}>+ Add Project </Button>
      </div>

      <Tasks currentProjectState={currentProjectState} />
    </div>
  );
}
