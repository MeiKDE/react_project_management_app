import Input from "./Input";
export default function NewProjectPage() {
  return (
    <>
      <div>
        <button>Cancel</button>
        <button>Save</button>
      </div>

      <Input label="Title" placeholder="project title" />
      <Input label="Description" placeholder="project description" textarea />
      <Input label="Due Date" placeholder="project due date" />
    </>
  );
}
