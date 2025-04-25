interface InputProps {
  label: string;
  placeholder?: string;
  textarea?: boolean;
}

export default function Input({ label, placeholder, textarea }: InputProps) {
  const textareaClassName = "w-1/3 h-48 p-2 border rounded";
  const inputClassName = "w-full p-2 border rounded";

  return (
    <div className="mb-4">
      <label className="block mb-2">{label}</label>
      {textarea ? (
        <textarea
          placeholder={placeholder}
          className={textareaClassName}
        ></textarea>
      ) : (
        <input placeholder={placeholder} className={inputClassName}></input>
      )}
    </div>
  );
}
