import { forwardRef, ForwardedRef } from "react";

interface InputProps {
  label: string;
  placeholder: string;
  textarea: boolean;
  type?: "text" | "date" | "email" | "password" | "number"; // Define specific allowed types
  ref?: ForwardedRef<HTMLInputElement | HTMLTextAreaElement>;
}

const Input = forwardRef(function Input(
  //label is a children, textarea a boolean, and then props
  { label, textarea, ...props }: InputProps,
  ref: ForwardedRef<HTMLInputElement | HTMLTextAreaElement>
) {
  const textareaClassName = "w-1/3 h-48 p-2 border rounded";
  const inputClassName = "w-1/3 p-2 border rounded";

  return (
    <div className="mb-4">
      <label className="block mb-2">{label}</label>
      {textarea ? (
        <textarea
          ref={ref as ForwardedRef<HTMLTextAreaElement>}
          placeholder={props.placeholder}
          className={textareaClassName}
        ></textarea>
      ) : (
        <input
          ref={ref as ForwardedRef<HTMLInputElement>}
          placeholder={props.placeholder}
          className={inputClassName}
          type={props.type}
        ></input>
      )}
    </div>
  );
});

export default Input;
