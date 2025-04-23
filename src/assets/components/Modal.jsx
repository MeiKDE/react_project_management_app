import { useRef, useImperativeHandle } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

export default function Modal({ children, buttonLabel, ref }) {
  const dialogRef = useRef();
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialogRef.current.showModal();
      },
      close() {
        dialogRef.current.close();
      },
    };
  });

  return createPortal(
    <dialog
      ref={dialogRef}
      className="w-[35rem] shadow-md rounded-md p-4 backdrop:bg-stone-900/90"
    >
      {children}
      <form method="dialog" className="mt-4 text-right">
        <Button>{buttonLabel}</Button>
      </form>
    </dialog>,
    document.getElementById("modal-root")
  );
}
