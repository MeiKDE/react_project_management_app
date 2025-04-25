import NewTask from "./NewTask";

export default function SelectedProjectPage() {
  return (
    <>
      <div>
        <h1>Project Title</h1>
        <button>Delete</button>
      </div>
      <h2>Project Description</h2>
      <NewTask />
    </>
  );
}
