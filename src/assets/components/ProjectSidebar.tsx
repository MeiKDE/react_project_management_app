import Button from "./Button";

interface ProjectSidebarProps {
  addProject: () => void;
}

export default function ProjectSidebar({ addProject }: ProjectSidebarProps) {
  return (
    <div>
      <h2 className="text-white text-center font-sans font-bold text-lg">
        YOUR PROJECTS
      </h2>

      <div className="flex justify-center my-5">
        <Button onClick={addProject}>+ Add Project </Button>
      </div>
    </div>
  );
}
