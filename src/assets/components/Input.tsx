import { forwardRef, ForwardedRef } from "react";

interface InputProps {
  label: string;
  placeholder?: string;
  textarea?: boolean;
  type?: string;
  className?: string;
  ref?: ForwardedRef<HTMLInputElement | HTMLTextAreaElement>;
}

const Input = forwardRef(function Input(
  { label, placeholder, textarea, type = "text", className = "" }: InputProps,
  ref: ForwardedRef<HTMLInputElement | HTMLTextAreaElement>
) {
  const textareaClassName = "w-2/3 h-48 p-2 border rounded";
  const inputClassName = "w-2/3 p-2 border rounded";

  return (
    <div className={`mb-4 ${className}`}>
      <label className="block mb-2">{label}</label>
      {textarea ? (
        <textarea
          ref={ref as ForwardedRef<HTMLTextAreaElement>}
          placeholder={placeholder}
          className={textareaClassName}
        ></textarea>
      ) : (
        <input
          ref={ref as ForwardedRef<HTMLInputElement>}
          placeholder={placeholder}
          className={inputClassName}
          type={type}
        ></input>
      )}
    </div>
  );
});

export default Input;
