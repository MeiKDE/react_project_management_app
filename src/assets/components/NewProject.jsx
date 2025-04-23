//Shows when you click "Add Project"
//Has fields for title, description, and due date
//Has buttons to save or cancel

import { useRef } from "react";
import Input from "./Input";
import Modal from "./Modal";

export default function NewProject({
  onCancel,
  onSave,
  label,
  textarea,
  date,
  ...props
}) {
  const modalRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const dueDateRef = useRef();

  //Checks for errors in the input fields
  function handleInputEntries() {
    const formData = {
      title: titleRef.current.value.trim(),
      description: descriptionRef.current.value.trim(),
      dueDate: dueDateRef.current.value.trim(),
    };

    //validate the data
    if (Object.values(formData).some((value) => !value)) {
      modalRef.current.open();
      return;
    }

    onSave(formData);
  }

  return (
    <>
      <Modal ref={modalRef} buttonLabel="Close">
        <h2 className="text-xl font-bold my-4 text-stone-500 ">
          Invalid input
        </h2>
        <p className="text-stone-700 mb-4">
          Oops! Looks like you forgot a value.
        </p>
        <p className="text-stone-700 mb-4">
          Please enter a valid value for every input field.
        </p>
      </Modal>
      <div className="w-[35rem] mt-16 ">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button
              onClick={onCancel}
              className="text-stone-800 hover:text-stone-950"
            >
              Cancel
            </button>
          </li>
          <li>
            <button
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
              onClick={handleInputEntries}
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input label={label} ref={titleRef} type="text">
            Title
          </Input>
          <Input label={textarea} ref={descriptionRef} textarea>
            Description
          </Input>
          <Input label={date} ref={dueDateRef} type="date">
            Due Date
          </Input>
        </div>
      </div>
    </>
  );
}
