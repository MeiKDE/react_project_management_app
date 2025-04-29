import Button from "./Button";

interface NoProjectPageProps {
  onAddProject: () => void;
}

export default function NoProjectPage({ onAddProject }: NoProjectPageProps) {
  return (
    <div className="flex flex-col items-center text-center gap-2 py-6">
      <img src="./no-projects.png" alt="no project image" className="w-20" />

      <h2 className="font-bold font-sans text-[35px]">No Project Selected</h2>
      <p className=" font-sans text-[20px]">
        Pick or create a project to get started.
      </p>

      <div>
        <Button onClick={onAddProject}>Create New Project</Button>
      </div>
    </div>
  );
}
