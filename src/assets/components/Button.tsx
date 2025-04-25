import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <>
      <button
        className="bg-slate-800 text-white py-3 px-3 rounded text-base width-full hover:bg-slate-600 hover:scale-105 transform transition-colors duration-200"
        {...props}
      >
        {children}
      </button>
    </>
  );
}
