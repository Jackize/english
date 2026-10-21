import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "outline" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-accent-green text-accent-green-dark hover:opacity-90 elevation-1 active:scale-95",
  secondary:
    "bg-primary-container text-on-secondary hover:bg-primary transition-colors shadow-sm active:scale-95",
  outline:
    "bg-transparent border-[1.5px] border-outline-variant text-on-surface-variant hover:bg-surface-container-low active:scale-95",
  danger:
    "bg-error-container text-on-error-container hover:opacity-90 active:scale-95",
};

export function Button({ variant = "primary", className = "", children, ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-all disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
