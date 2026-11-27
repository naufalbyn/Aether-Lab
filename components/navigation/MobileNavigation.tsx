
"use client";

import {
  useEffect,
  useRef,
} from "react";

import {
  ArrowUpRight,
  X,
} from "lucide-react";

import NavigationBrand from "@/components/navigation/NavigationBrand";

import {
  mobileNavigation,
  type NavigationId,
} from "@/data/navigation";

interface MobileNavigationProps {
  open: boolean;
  onClose: () => void;
  activeSection: NavigationId | null;
  closeOnDesktop?: boolean;
}

export default function MobileNavigation({
  open,
  onClose,
  activeSection,
  closeOnDesktop = true,
}: MobileNavigationProps) {
  const dialogRef =
    useRef<HTMLDialogElement>(null);

  const closeRef =
    useRef<HTMLButtonElement>(null);

  // ==========================================
  // DIALOG LIFECYCLE
  // ==========================================

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();

      closeRef.current?.focus();
    }

    if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  // ==========================================
  // BODY SCROLL LOCK
  // ==========================================

  useEffect(() => {
    if (!open) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [open]);

  // ==========================================
  // RESPONSIVE AUTO CLOSE
  // ==========================================

  useEffect(() => {
    if (!open || !closeOnDesktop) return;

    const desktop = window.matchMedia(
      "(min-width: 1024px)"
    );

    function handleResize() {
      if (desktop.matches) {
        onClose();
      }
    }

    desktop.addEventListener(
      "change",
      handleResize
    );

    handleResize();

    return () => {
      desktop.removeEventListener(
        "change",
        handleResize
      );
    };
  }, [open, onClose, closeOnDesktop]);

  // Close synchronously before hash navigation,
  // so the existing smooth-scroll handler can run.

  function handleNavigation() {
    const dialog = dialogRef.current;

    if (dialog?.open) {
      dialog.close();
    }

    onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      data-mobile-navigation
      data-lenis-prevent
      aria-labelledby="mobile-navigation-title"
      onCancel={(event) => {
        event.preventDefault();
        handleNavigation();
      }}
      onClose={onClose}
      className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none overflow-y-auto border-0 bg-[#F5F5F2] p-0 text-[#0B0D10] backdrop:bg-[#0B0D10]/70"
    >
      <div className="flex min-h-full flex-col px-6 pb-8 pt-6 sm:px-10 sm:pt-8">

        {/* Dialog Header */}

        <div className="flex items-center justify-between gap-4 border-b border-black/10 pb-6">

          <NavigationBrand
            theme="light"
            onClick={handleNavigation}
          />

          <button
            ref={closeRef}
            type="button"
            aria-label="Close navigation"
            onClick={handleNavigation}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-black/10 transition-colors hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4F46FF]"
          >
            <X
              size={22}
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Navigation Label */}

        <div className="mt-8 flex items-center justify-between gap-4">

          <h2
            id="mobile-navigation-title"
            className="font-mono text-[10px] uppercase tracking-[0.16em] text-black/45"
          >
            Aether / Navigation
          </h2>

          <span className="font-mono text-[9px] text-black/40">
            01 / 05
          </span>
        </div>

        {/* Navigation Links */}

        <nav
          aria-label="Mobile navigation"
          className="flex flex-1 flex-col justify-center py-8"
        >
          {mobileNavigation.map((item, index) => {
            const active =
              activeSection === item.id;

            const contact =
              item.id === "contact";

            return (
              <a
                key={item.id}
                href={item.href}
                onClick={handleNavigation}
                aria-current={
                  active
                    ? "location"
                    : undefined
                }
                className={`group flex min-w-0 items-center justify-between gap-4 border-b border-black/10 py-5 transition-colors hover:text-[#4F46FF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46FF] sm:py-7 ${
                  active || contact
                    ? "text-[#4F46FF]"
                    : "text-[#0B0D10]"
                }`}
              >
                <div className="flex min-w-0 items-baseline gap-4">

                  <span className="shrink-0 font-mono text-[9px] text-black/40">
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <span className="wrap-break-word font-display text-[clamp(1.8rem,7vw,4rem)] font-medium leading-tight tracking-tighter">
                    {item.label}
                  </span>
                </div>

                <ArrowUpRight
                  size={23}
                  strokeWidth={1.3}
                  aria-hidden="true"
                  className="shrink-0 transition-transform motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:translate-x-1"
                />
              </a>
            );
          })}
        </nav>

        {/* Dialog Footer */}

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-black/10 pt-6">

          <div className="flex items-center gap-2">

            <span className="h-1.5 w-1.5 rounded-full bg-[#4F46FF]" />

            <span className="font-mono text-[9px] uppercase tracking-wider text-black/50">
              Open for projects
            </span>
          </div>

          <span className="font-mono text-[9px] uppercase tracking-wider text-black/40">
            Aether Lab / Indonesia
          </span>
        </div>
      </div>
    </dialog>
  );
}
