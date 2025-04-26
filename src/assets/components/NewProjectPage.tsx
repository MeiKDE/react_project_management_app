import Input from "./Input";
import { useRef, forwardRef, ForwardedRef } from "react";

interface NewProjectPageProps {
  saveProject: (projectData: {
    title: string;
    description: string;
    dueDate: Date;
  }) => void;
  cancelProject: () => void;
}

const NewProject = forwardRef(function NewProjectPage(
  { saveProject, cancelProject }: NewProjectPageProps,
  ref: ForwardedRef<HTMLDivElement>
) {
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
      dueDate: new Date(enteredDueDate),
    };

    saveProject(newProjectData);
  };

  return (
    <div ref={ref}>
      <div>
        <button type="button" onClick={cancelProject}>
          Cancel
        </button>
        <button type="button" onClick={handleSave}>
          Save
        </button>
      </div>

      <Input
        label="Title"
        placeholder="project title"
        ref={titleRef}
        textarea={false}
      />
      <Input
        label="Description"
        placeholder="project description"
        textarea={true}
        ref={descriptionRef}
      />
      <Input
        label="Due Date"
        placeholder="project due date"
        ref={dueDateRef}
        textarea={false}
      />
    </div>
  );
});

export default NewProject;
