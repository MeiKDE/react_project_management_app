//Shows when you first open the app or after deleting a project
//Displays a message and a button to add a new project
import noProjectSelected from "/Users/mei/projects/React_The_Complete_Guide_2025/project_management_app/src/assets/no-projects.png";
import Button from "/Users/mei/projects/React_The_Complete_Guide_2025/project_management_app/src/assets/components/Button.jsx";
import { useContext } from "react";
import { ProjectManagementContext } from "../../store/project-management-context";

export default function NoProjectSelected({}) {
  const { handleAddProject } = useContext(ProjectManagementContext);
  return (
    <div className="mt-24 text-center w-2/3">
      <img
        src={noProjectSelected}
        alt="Empty List"
        className="w-16 h-16 mx-auto object-contain"
      />
      <h2 className="text-xl font-bold my-4 text-stone-500 ">
        No Project Selected
      </h2>
      <p className="text-stone-400 mb-4">
        Pick or create a project to get started.
      </p>
      <div className="mt-4">
        <Button onClick={handleAddProject}>Create New Project</Button>
      </div>
    </div>
  );
}
