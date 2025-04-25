import Button from "./Button";

interface ProjectSidebarProps {
  AddProject: () => void;
}

export default function ProjectSidebar({ AddProject }: ProjectSidebarProps) {
  return (
    <div>
      <h2 className="text-white text-center font-sans font-bold text-lg">
        YOUR PROJECTS
      </h2>

      <div className="flex justify-center my-5">
        <Button onClick={AddProject}>+ Add Project </Button>
      </div>
    </div>
  );
}
