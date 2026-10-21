import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = "", id, ...props }: InputProps) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="mb-2 block text-sm font-medium text-ink">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink outline-none transition-all placeholder:text-muted/60 focus:border-brand focus:ring-4 focus:ring-brand/10 ${className}`}
        {...props}
      />
      {error && <p className="mt-1.5 text-sm text-danger">{error}</p>}
    </div>
  );
}
