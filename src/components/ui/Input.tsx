import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = "", id, ...props }: InputProps) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="mb-2 block text-sm font-medium text-on-surface-variant">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full rounded-lg border-[1.5px] border-outline-variant bg-surface-container-lowest px-4 py-3 text-on-background outline-none transition-all placeholder:text-outline-variant focus:border-secondary-container focus:ring-2 focus:ring-secondary-container/20 ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-error">{error}</p>}
    </div>
  );
}
