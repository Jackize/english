import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "mint" | "outline" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const variants: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-dark elevation-1 active:scale-[0.985]",
  mint: "bg-mint text-brand-dark hover:brightness-95 active:scale-[0.985]",
  outline:
    "bg-surface border border-line text-ink hover:border-brand/30 hover:text-brand active:scale-[0.985]",
  ghost: "bg-transparent text-muted hover:bg-surface-muted hover:text-ink",
  danger: "bg-[#fde8e6] text-danger hover:brightness-95",
};

export function Button({ variant = "primary", className = "", children, ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
