import { useContext, useRef } from "react";
import Input from "./Input";
import { ProjectManagementContext } from "../../store/project-management-context-provider";

const NewProject = () => {
  const { handleSaveProject, handleCancelProject } = useContext(
    ProjectManagementContext
  );

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const dueDateRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    const enteredTitle = titleRef.current?.value;
    const enteredDescription = descriptionRef.current?.value;
    const enteredDueDate = dueDateRef.current?.value;

    // Basic validation
    if (
      !enteredTitle?.trim() ||
      !enteredDescription?.trim() ||
      !enteredDueDate?.trim()
    ) {
      alert("Please fill in all fields");
      return;
    }

    const newProjectData = {
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
    };

    handleSaveProject(newProjectData);
    handleCancelProject();
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-end gap-4 mb-6">
        <button
          type="button"
          onClick={handleCancelProject}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
        >
          Save
        </button>
      </div>

      <div className="space-y-6">
        <Input
          label="Title"
          placeholder="Enter project title"
          ref={titleRef}
          textarea={false}
          type="text"
          className="w-full"
        />
        <Input
          label="Description"
          placeholder="Enter project description"
          textarea={true}
          ref={descriptionRef}
          className="w-full"
        />
        <Input
          label="Due Date"
          placeholder="Select due date"
          ref={dueDateRef}
          textarea={false}
          type="date"
          className="w-full"
        />
      </div>
    </div>
  );
};

export default NewProject;
