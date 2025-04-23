import Input from "./Input";
import Button from "./Button";
import { useState } from "react";

export default function NewTask({ tasks, onAdd, onDelete }) {
  const [enteredTask, setEnteredTask] = useState("");

  function handleChange(event) {
    setEnteredTask(event.target.value);
  }

  function handleAddTask() {
    if (enteredTask.trim() === "") {
      alert("Please enter a task");
      return;
    }
    onAdd(enteredTask);
    console.log(enteredTask);
  }

  return (
    <div className="flex gap-4 items-center">
      <Input
        label="Task"
        type="text"
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        onChange={handleChange}
        value={enteredTask}
      />
      <Button
        onClick={handleAddTask}
        className="text-stone-700 hover:text-stone-950 px-4 "
      >
        Add Task
      </Button>
    </div>
  );
}
