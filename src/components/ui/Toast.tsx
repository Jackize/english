"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type ToastVariant = "success" | "error" | "info";

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastOptions {
  title: string;
  description?: string;
  variant?: ToastVariant;
  action?: ToastAction;
  /** Thời gian tự đóng, tính bằng ms. Mặc định 5000ms. */
  duration?: number;
}

interface ToastItem extends ToastOptions {
  id: number;
}

interface ToastContextValue {
  showToast: (options: ToastOptions) => number;
  dismissToast: (id: number) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const VARIANT_STYLE: Record<ToastVariant, { icon: string; className: string }> = {
  success: {
    icon: "check_circle",
    className: "border-brand/25 bg-brand-soft text-brand",
  },
  error: {
    icon: "error",
    className: "border-danger/25 bg-[#fdf2f1] text-danger",
  },
  info: {
    icon: "info",
    className: "border-line bg-surface text-ink",
  },
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(1);

  const dismissToast = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback((options: ToastOptions) => {
    const id = nextId.current++;
    setToasts((current) => [...current.slice(-2), { ...options, id }]);
    return id;
  }, []);

  const value = useMemo(
    () => ({ showToast, dismissToast }),
    [dismissToast, showToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="false"
        className="pointer-events-none fixed inset-x-4 bottom-4 z-[100] flex flex-col items-center gap-2 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:items-end"
      >
        {toasts.map((toast) => (
          <ToastCard key={toast.id} toast={toast} onDismiss={dismissToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastCard({
  toast,
  onDismiss,
}: {
  toast: ToastItem;
  onDismiss: (id: number) => void;
}) {
  const variant = toast.variant ?? "info";
  const style = VARIANT_STYLE[variant];

  useEffect(() => {
    const timer = window.setTimeout(
      () => onDismiss(toast.id),
      toast.duration ?? 5000,
    );
    return () => window.clearTimeout(timer);
  }, [onDismiss, toast.duration, toast.id]);

  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      className={`pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl border px-4 py-3 shadow-[0_24px_60px_-32px_rgba(21,37,27,0.55)] backdrop-blur ${style.className}`}
    >
      <span className="material-symbols-outlined mt-0.5 text-[20px]">
        {style.icon}
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-semibold">{toast.title}</div>
        {toast.description ? (
          <p className="mt-0.5 text-xs leading-relaxed opacity-80">
            {toast.description}
          </p>
        ) : null}
        {toast.action ? (
          <button
            type="button"
            onClick={() => {
              toast.action?.onClick();
              onDismiss(toast.id);
            }}
            className="mt-2 text-xs font-bold underline underline-offset-2 hover:opacity-80"
          >
            {toast.action.label}
          </button>
        ) : null}
      </div>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        aria-label="Đóng thông báo"
        className="-mr-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full opacity-60 transition-opacity hover:opacity-100"
      >
        <span className="material-symbols-outlined text-[16px]">close</span>
      </button>
    </div>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast phải được dùng bên trong ToastProvider");
  }
  return context;
}
