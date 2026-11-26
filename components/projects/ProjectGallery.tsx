
"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import type {
  TouchEvent,
  CSSProperties,
} from "react";

import Image from "next/image";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

import {
  Plus,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Maximize2,
  X,
  Images,
  Scan,
  Layers,
  Monitor,
  FileImage,
} from "lucide-react";

import type { Project } from "@/data/projects";

// ==========================================
// TYPES
// ==========================================

type ProjectGalleryProps = {
  project: Project;
  sectionNumber: string;
};

type TouchPosition = {
  x: number;
  y: number;
};

type GalleryImage = NonNullable<
  NonNullable<Project["images"]>["gallery"]
>[number];

// ==========================================
// CONSTANTS
// ==========================================

const BANGAU_VISUAL_TITLES: Record<
  string,
  string
> = {
  "01-hero-laptop.webp":
    "Desktop Experience",

  "02-product-scene.webp":
    "Product Showcase",

  "03-floating-ui.webp":
    "Interface Design",

  "04-contact-tablet.webp":
    "Ordering Experience",
};

// ==========================================
// UTILITIES
// ==========================================

function formatNumber(value: number) {
  return String(value).padStart(2, "0");
}

function getFileName(src: string) {
  return (
    src
      .split("?")[0]
      .split("#")[0]
      .split("/")
      .pop() ?? ""
  );
}

function getImageTitle(
  image: GalleryImage,
  index: number,
  projectSlug: string
) {
  const fileName = getFileName(image.src);

  if (
    projectSlug === "bangau-matahari" &&
    BANGAU_VISUAL_TITLES[fileName]
  ) {
    return BANGAU_VISUAL_TITLES[fileName];
  }

  const name = fileName
    .replace(/\.[^.]+$/, "")
    .replace(/^\d+[-_]?/, "")
    .replace(/[-_]+/g, " ")
    .trim();

  if (!name) {
    return `Project Visual ${formatNumber(
      index + 1
    )}`;
  }

  return name.replace(
    /\b\w/g,
    (character) => character.toUpperCase()
  );
}

function getImageFormat(src: string) {
  const extension = getFileName(src)
    .split(".")
    .pop()
    ?.toLowerCase();

  if (extension === "webp") return "WebP";
  if (extension === "png") return "PNG";

  if (
    extension === "jpg" ||
    extension === "jpeg"
  ) {
    return "JPEG";
  }

  if (extension === "svg") return "SVG";
  if (extension === "avif") return "AVIF";
  if (extension === "gif") return "GIF";

  return "Image";
}

function getImageOrientation(
  image: GalleryImage
) {
  if (!image.width || !image.height) {
    return "Not specified";
  }

  if (image.width > image.height) {
    return "Landscape";
  }

  if (image.height > image.width) {
    return "Portrait";
  }

  return "Square";
}

// ==========================================
// PROJECT GALLERY
// ==========================================

export default function ProjectGallery({
  project,
  sectionNumber,
}: ProjectGalleryProps) {
  const componentId = useId();

  const prefersReducedMotion =
    useReducedMotion();

  const gallery = project.images?.gallery ?? [];

  const totalImages = gallery.length;

  const [activeIndex, setActiveIndex] =
    useState(0);

  const [isLightboxOpen, setIsLightboxOpen] =
    useState(false);

  const dialogRef =
    useRef<HTMLDialogElement>(null);

  const expandButtonRef =
    useRef<HTMLButtonElement>(null);

  const closeButtonRef =
    useRef<HTMLButtonElement>(null);

  const touchStartRef =
    useRef<TouchPosition | null>(null);

  const lightboxTouchRef =
    useRef<TouchPosition | null>(null);

  const currentIndex =
    totalImages > 0
      ? Math.min(activeIndex, totalImages - 1)
      : 0;

  const activeImage = gallery[currentIndex];

  const hasMultipleImages = totalImages > 1;

  // ==========================================
  // NAVIGATION
  // ==========================================

  const goToPrevious = useCallback(() => {
    if (totalImages <= 1) return;

    setActiveIndex(
      (previous) =>
        (previous - 1 + totalImages) %
        totalImages
    );
  }, [totalImages]);

  const goToNext = useCallback(() => {
    if (totalImages <= 1) return;

    setActiveIndex(
      (previous) =>
        (previous + 1) % totalImages
    );
  }, [totalImages]);

  function goToImage(index: number) {
    if (index < 0 || index >= totalImages) {
      return;
    }

    setActiveIndex(index);
  }

  // ==========================================
  // LIGHTBOX
  // ==========================================

  function openLightbox() {
    const dialog = dialogRef.current;

    if (!dialog || dialog.open) return;

    dialog.showModal();

    setIsLightboxOpen(true);

    closeButtonRef.current?.focus({
      preventScroll: true,
    });
  }

  function closeLightbox() {
    if (dialogRef.current?.open) {
      dialogRef.current.close();
    }
  }

  function handleLightboxClose() {
    setIsLightboxOpen(false);

    expandButtonRef.current?.focus({
      preventScroll: true,
    });
  }

  // ==========================================
  // SCROLL LOCK
  // ==========================================

  useEffect(() => {
    if (!isLightboxOpen) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [isLightboxOpen]);

  // ==========================================
  // LIGHTBOX KEYBOARD NAVIGATION
  // ==========================================

  useEffect(() => {
    if (!isLightboxOpen) return;

    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToPrevious();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        goToNext();
      }

      if (event.key === "Home") {
        event.preventDefault();
        setActiveIndex(0);
      }

      if (
        event.key === "End" &&
        totalImages > 0
      ) {
        event.preventDefault();
        setActiveIndex(totalImages - 1);
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    isLightboxOpen,
    goToPrevious,
    goToNext,
    totalImages,
  ]);

  // ==========================================
  // TOUCH GESTURES
  // ==========================================

  function handleTouchStart(
    event: TouchEvent<HTMLElement>,
    isLightbox = false
  ) {
    const reference = isLightbox
      ? lightboxTouchRef
      : touchStartRef;

    if (event.touches.length !== 1) {
      reference.current = null;
      return;
    }

    const touch = event.touches[0];

    reference.current = {
      x: touch.clientX,
      y: touch.clientY,
    };
  }

  function handleTouchEnd(
    event: TouchEvent<HTMLElement>,
    isLightbox = false
  ) {
    const reference = isLightbox
      ? lightboxTouchRef
      : touchStartRef;

    const start = reference.current;

    reference.current = null;

    if (!start) return;

    const touch = event.changedTouches[0];

    if (!touch) return;

    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;

    if (
      Math.abs(deltaX) < 50 ||
      Math.abs(deltaX) <=
        Math.abs(deltaY) * 1.25
    ) {
      return;
    }

    if (deltaX < 0) {
      goToNext();
    } else {
      goToPrevious();
    }
  }

  // ==========================================
  // CONDITIONAL RENDERING
  // ==========================================

  if (!activeImage || totalImages === 0) {
    return null;
  }

  const activeTitle = getImageTitle(
    activeImage,
    currentIndex,
    project.slug
  );

  const imageFormat = getImageFormat(
    activeImage.src
  );

  const imageOrientation =
    getImageOrientation(activeImage);

  const imageResolution =
    activeImage.width && activeImage.height
      ? `${activeImage.width} × ${activeImage.height}`
      : "Not specified";

  const accentStyle = {
    "--gallery-accent": project.accent,
  } as CSSProperties;

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <section
      id="project-gallery"
      aria-labelledby={`${componentId}-title`}
      style={accentStyle}
      className="relative isolate overflow-hidden bg-[#0B0D10] py-24 text-white md:py-32 lg:py-36"
    >
      {/* ==================================
          BACKGROUND SYSTEM
      ================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background:
            "linear-gradient(145deg, #0B0D10 0%, #121419 55%, #191920 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/4 -z-10 h-100 w-100 rounded-full opacity-[0.07] blur-[140px]"
        style={{
          backgroundColor: project.accent,
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-64 top-20 -z-10 hidden h-175 w-175 rounded-full border border-white/5 lg:block"
      >
        <div className="absolute inset-20 rounded-full border border-white/5" />

        <div className="absolute inset-40 rounded-full border border-white/5" />

        <div className="absolute inset-60 rounded-full border border-white/5" />
      </div>

      <div className="aether-container relative">

        {/* ==================================
            SECTION HEADER
        ================================== */}

        <div className="flex items-center justify-between gap-4 border-b border-white/15 pb-6">
          <div className="flex items-center gap-3">
            <span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{
                backgroundColor: project.accent,
              }}
            />

            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/60">
              {sectionNumber} / Visual Exploration
            </span>
          </div>

          <Plus
            aria-hidden="true"
            size={17}
            strokeWidth={1}
            className="text-white/40"
          />
        </div>

        {/* ==================================
            EDITORIAL HEADING
        ================================== */}

        <div className="grid gap-10 pb-12 pt-14 lg:grid-cols-12 lg:items-end lg:pb-16 lg:pt-20">
          <div className="lg:col-span-7">
            <h2
              id={`${componentId}-title`}
              className="font-display text-[clamp(3rem,6.8vw,7.5rem)] font-medium leading-[0.92] tracking-[-0.065em]"
            >
              A closer
              <br />

              <span
                style={{
                  color: project.accent,
                }}
              >
                look.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <span
                className="h-px w-8"
                style={{
                  backgroundColor: project.accent,
                }}
              />

              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/55">
                Visual Archive
              </span>
            </div>

            <p className="mt-5 max-w-md text-sm leading-8 text-white/65 md:text-base">
              Explore the interfaces, visual
              experiences, and documented
              presentations behind the project.
              A closer look at the details
              beyond the code.
            </p>
          </div>
        </div>

        {/* ==================================
            EXPLORER STATUS BAR
        ================================== */}

        <div className="mb-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/3 px-5 py-4 md:px-6">
          <div className="flex items-center gap-3">
            <Scan
              aria-hidden="true"
              size={17}
              strokeWidth={1.5}
              style={{
                color: project.accent,
              }}
            />

            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/65">
              Aether Visual Explorer
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">
              {formatNumber(totalImages)}
              {" "}Visual Assets
            </span>

            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full"
              style={{
                backgroundColor: project.accent,
              }}
            />
          </div>
        </div>

        {/* ==================================
            EXPLORER MAIN LAYOUT
        ================================== */}

        <div
          role="region"
          aria-label="Project visual explorer"
          className="grid items-start gap-5 lg:grid-cols-12"
        >

          {/* ==================================
              LEFT: MAIN VISUAL VIEWER
          ================================== */}

          <div className="min-w-0 overflow-hidden rounded-3xl border border-white/10 bg-white/3 lg:col-span-7">

            {/* VIEWER HEADER */}

            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 md:px-6">
              <div className="flex min-w-0 items-center gap-3">
                <Images
                  aria-hidden="true"
                  size={17}
                  strokeWidth={1.5}
                  className="shrink-0 text-white/45"
                />

                <span className="truncate font-mono text-[10px] uppercase tracking-[0.14em] text-white/55">
                  Asset_
                  {formatNumber(currentIndex + 1)}
                </span>
              </div>

              <button
                ref={expandButtonRef}
                type="button"
                onClick={openLightbox}
                aria-label="Open image in fullscreen viewer"
                className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-colors hover:border-white/40 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-white"
              >
                <Maximize2
                  aria-hidden="true"
                  size={16}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 motion-safe:group-hover:scale-110"
                />
              </button>
            </div>

            {/* MAIN IMAGE STAGE */}

            <div
              className="relative isolate flex h-[clamp(280px,48vw,500px)] items-center justify-center overflow-hidden bg-[#090B0E] p-4 sm:p-6 md:p-8"
              style={{
                touchAction: "pan-y",
              }}
              onTouchStart={(event) =>
                handleTouchStart(event)
              }
              onTouchEnd={(event) =>
                handleTouchEnd(event)
              }
              onTouchCancel={() => {
                touchStartRef.current = null;
              }}
            >

              {/* VIEWER GRID */}

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 opacity-60"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px)",

                  backgroundSize: "40px 40px",
                }}
              />

              {/* SUBTLE AMBIENT GLOW */}

              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 blur-[100px]"
                style={{
                  backgroundColor: project.accent,
                }}
              />

              {/* CORNER DETAILS */}

              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-4 h-4 w-4 border-l border-t border-white/20"
              />

              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-4 top-4 h-4 w-4 border-r border-t border-white/20"
              />

              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-4 left-4 h-4 w-4 border-b border-l border-white/20"
              />

              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-4 right-4 h-4 w-4 border-b border-r border-white/20"
              />

              {/* IMAGE TRANSITION */}

              <AnimatePresence
                mode="wait"
                initial={false}
              >
                <motion.div
                  key={activeImage.src}
                  initial={
                    prefersReducedMotion
                      ? false
                      : {
                          opacity: 0,
                          scale: 0.98,
                          y: 6,
                        }
                  }
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  exit={
                    prefersReducedMotion
                      ? { opacity: 1 }
                      : {
                          opacity: 0,
                          scale: 0.985,
                        }
                  }
                  transition={{
                    duration:
                      prefersReducedMotion
                        ? 0
                        : 0.22,
                  }}
                  className="relative h-full w-full"
                >
                  <Image
                    src={activeImage.src}
                    alt={activeImage.alt}
                    fill
                    sizes="(max-width: 768px) 85vw, (max-width: 1024px) 80vw, 700px"
                    quality={75}
                    loading="lazy"
                    draggable={false}
                    className="select-none object-contain"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* VIEWER NAVIGATION */}

            <div className="flex items-center justify-between gap-4 border-t border-white/10 px-5 py-5 md:px-6">
              <div
                aria-live="polite"
                aria-atomic="true"
              >
                <span className="font-display text-2xl font-medium tabular-nums tracking-[-0.045em]">
                  {formatNumber(currentIndex + 1)}
                </span>

                <span className="ml-2 font-mono text-xs text-white/40">
                  / {formatNumber(totalImages)}
                </span>
              </div>

              {hasMultipleImages && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={goToPrevious}
                    aria-label="Previous visual"
                    className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/3 text-white/70 transition-colors hover:border-white/40 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-white"
                  >
                    <ArrowLeft
                      aria-hidden="true"
                      size={18}
                      strokeWidth={1.5}
                      className="transition-transform duration-300 motion-safe:group-hover:-translate-x-0.5"
                    />
                  </button>

                  <button
                    type="button"
                    onClick={goToNext}
                    aria-label="Next visual"
                    className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/3 text-white/70 transition-colors hover:border-white/40 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-white"
                  >
                    <ArrowRight
                      aria-hidden="true"
                      size={18}
                      strokeWidth={1.5}
                      className="transition-transform duration-300 motion-safe:group-hover:translate-x-0.5"
                    />
                  </button>
                </div>
              )}
            </div>

            {/* SEGMENTED PROGRESS */}

            {hasMultipleImages && (
              <div className="flex gap-1.5 px-5 pb-5 md:px-6">
                {gallery.map((image, index) => (
                  <span
                    key={`${image.src}-progress-${index}`}
                    className="h-0.5 flex-1 rounded-full transition-colors duration-300"
                    style={{
                      backgroundColor:
                        currentIndex === index
                          ? project.accent
                          : "rgba(255,255,255,0.12)",
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* ==================================
              RIGHT: VISUAL INDEX & INSPECTOR
          ================================== */}

          <div className="min-w-0 space-y-5 lg:col-span-5">

            {/* VISUAL INDEX */}

            <div className="rounded-3xl border border-white/10 bg-white/3 p-4 md:p-5">
              <div className="flex items-center justify-between gap-3 px-1 pb-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/55">
                  Visual Index
                </span>

                <Layers
                  aria-hidden="true"
                  size={16}
                  strokeWidth={1.5}
                  className="text-white/40"
                />
              </div>

              <div
                role="group"
                aria-label="Select project visual"
                className="space-y-2.5"
              >
                {gallery.map((image, index) => {
                  const isActive =
                    currentIndex === index;

                  const imageTitle = getImageTitle(
                    image,
                    index,
                    project.slug
                  );

                  return (
                    <button
                      key={`${image.src}-${index}`}
                      type="button"
                      aria-pressed={isActive}
                      aria-label={`View ${imageTitle}`}
                      onClick={() => goToImage(index)}
                      className={[
                        "group flex w-full min-w-0",
                        "items-center gap-3 rounded-xl",
                        "border p-2.5 text-left",
                        "transition-colors duration-300",
                        "focus-visible:outline-2",
                        "focus-visible:outline-offset-2",
                        "focus-visible:outline-white",
                        isActive
                          ? "bg-white/5"
                          : "border-white/10 bg-white/2 hover:border-white/25 hover:bg-white/5",
                      ].join(" ")}
                      style={
                        isActive
                          ? {
                              borderColor:
                                `${project.accent}75`,

                              backgroundColor:
                                `${project.accent}08`,
                            }
                          : undefined
                      }
                    >

                      {/* THUMBNAIL */}

                      <div className="relative h-15 w-13 shrink-0 overflow-hidden rounded-md border border-white/10 bg-[#090B0E]">
                        <Image
                          src={image.src}
                          alt=""
                          fill
                          sizes="64px"
                          quality={75}
                          loading="lazy"
                          draggable={false}
                          className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
                        />
                      </div>

                      {/* ASSET LABEL */}

                      <div className="min-w-0 flex-1">
                        <span
                          className="font-mono text-[9px] uppercase tracking-[0.12em]"
                          style={{
                            color: isActive
                              ? project.accent
                              : "rgba(255,255,255,0.4)",
                          }}
                        >
                          Asset_
                          {formatNumber(index + 1)}
                        </span>

                        <span className="mt-1.5 block wrap-break-word font-display text-sm font-medium leading-5 text-white/85">
                          {imageTitle}
                        </span>
                      </div>

                      {/* ACTIVE INDICATOR */}

                      {isActive ? (
                        <span
                          aria-hidden="true"
                          className="mr-1 h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{
                            backgroundColor:
                              project.accent,

                            boxShadow:
                              `0 0 12px ${project.accent}60`,
                          }}
                        />
                      ) : (
                        <ArrowUpRight
                          aria-hidden="true"
                          size={15}
                          strokeWidth={1.5}
                          className="mr-1 shrink-0 text-white/25 transition-colors group-hover:text-white/70"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ==================================
                ASSET INSPECTOR
            ================================== */}

            <div className="rounded-3xl border border-white/10 bg-white/3 p-5 md:p-6">
              <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/55">
                  Asset Inspector
                </span>

                <FileImage
                  aria-hidden="true"
                  size={16}
                  strokeWidth={1.5}
                  className="text-white/40"
                />
              </div>

              <motion.div
                key={`details-${currentIndex}`}
                initial={
                  prefersReducedMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 5,
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration:
                    prefersReducedMotion
                      ? 0
                      : 0.2,
                }}
              >
                <div
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <span
                    className="mt-5 block font-mono text-[9px] uppercase tracking-[0.14em]"
                    style={{
                      color: project.accent,
                    }}
                  >
                    Active Visual /
                    {" "}
                    {formatNumber(currentIndex + 1)}
                  </span>

                  <h3 className="mt-3 font-display text-2xl font-medium leading-tight tracking-[-0.045em]">
                    {activeTitle}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-white/60">
                    {activeImage.caption ||
                      activeImage.alt}
                  </p>
                </div>

                {/* ASSET METADATA */}

                <div className="mt-5 divide-y divide-white/8 border-t border-white/10">
                  <div className="flex items-center justify-between gap-4 py-3">
                    <span className="text-xs text-white/45">
                      Format
                    </span>

                    <span className="font-mono text-xs text-white/75">
                      {imageFormat}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4 py-3">
                    <span className="text-xs text-white/45">
                      Resolution
                    </span>

                    <span className="font-mono text-xs text-white/75">
                      {imageResolution}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4 py-3">
                    <span className="text-xs text-white/45">
                      Orientation
                    </span>

                    <span className="font-mono text-xs text-white/75">
                      {imageOrientation}
                    </span>
                  </div>
                </div>

                {/* EXPAND ACTION */}

                <button
                  type="button"
                  onClick={openLightbox}
                  className="group mt-4 flex w-full items-center justify-between gap-3 rounded-xl border border-white/15 bg-white/3 px-4 py-3.5 text-xs text-white/65 transition-colors hover:border-white/40 hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-white"
                >
                  <span className="flex items-center gap-2.5">
                    <Monitor
                      aria-hidden="true"
                      size={15}
                      strokeWidth={1.5}
                    />

                    Expand Visual
                  </span>

                  <ArrowUpRight
                    aria-hidden="true"
                    size={16}
                    strokeWidth={1.5}
                    className="transition-transform duration-300 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
                  />
                </button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ==================================
            SECTION FOOTER
        ================================== */}

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 md:mt-16">
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/40">
            Aether Lab / Visual Archive
          </span>

          <div className="flex items-center gap-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/40">
              Explore the Details
            </span>

            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full"
              style={{
                backgroundColor: project.accent,
              }}
            />
          </div>
        </div>
      </div>

      {/* ======================================
          FULLSCREEN LIGHTBOX
      ====================================== */}

      <dialog
        ref={dialogRef}
        onClose={handleLightboxClose}
        aria-labelledby={`${componentId}-lightbox-title`}
        data-lenis-prevent
        className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto overscroll-contain border-0 bg-[#08090B] p-0 text-white backdrop:bg-black/90"
      >
        {isLightboxOpen && (
          <div className="flex min-h-full flex-col px-4 py-5 md:px-8 md:py-6">

            {/* LIGHTBOX HEADER */}

            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div className="min-w-0">
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/45">
                  Aether Lab / Visual Archive
                </span>

                <h3
                  id={`${componentId}-lightbox-title`}
                  className="mt-2 truncate font-display text-xl font-medium md:text-2xl"
                >
                  {project.title}
                </h3>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeLightbox}
                aria-label="Close fullscreen viewer"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/3 text-white transition-colors hover:border-white hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-white"
              >
                <X
                  aria-hidden="true"
                  size={22}
                  strokeWidth={1.5}
                />
              </button>
            </div>

            {/* FULLSCREEN IMAGE */}

            <div
              className="relative flex min-h-60 flex-1 items-center justify-center py-6"
              style={{
                touchAction: "pan-y pinch-zoom",
              }}
              onTouchStart={(event) =>
                handleTouchStart(event, true)
              }
              onTouchEnd={(event) =>
                handleTouchEnd(event, true)
              }
              onTouchCancel={() => {
                lightboxTouchRef.current = null;
              }}
            >
              <AnimatePresence
                mode="wait"
                initial={false}
              >
                <motion.div
                  key={`lightbox-${activeImage.src}`}
                  initial={
                    prefersReducedMotion
                      ? false
                      : { opacity: 0 }
                  }
                  animate={{
                    opacity: 1,
                  }}
                  exit={
                    prefersReducedMotion
                      ? { opacity: 1 }
                      : { opacity: 0 }
                  }
                  transition={{
                    duration:
                      prefersReducedMotion
                        ? 0
                        : 0.18,
                  }}
                  className="relative h-[min(70dvh,1000px)] w-full"
                >
                  <Image
                    src={activeImage.src}
                    alt={activeImage.alt}
                    fill
                    sizes="95vw"
                    quality={75}
                    loading="eager"
                    draggable={false}
                    className="select-none object-contain"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* LIGHTBOX FOOTER */}

            <div className="flex flex-col gap-5 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <div
                aria-live="polite"
                aria-atomic="true"
                className="min-w-0 flex-1"
              >
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.14em]"
                  style={{
                    color: project.accent,
                  }}
                >
                  Visual_
                  {formatNumber(currentIndex + 1)}
                  {" / "}
                  {formatNumber(totalImages)}
                </span>

                <h4 className="mt-2 font-display text-lg font-medium">
                  {activeTitle}
                </h4>

                <p className="mt-2 max-w-3xl text-sm leading-7 text-white/55">
                  {activeImage.caption ||
                    activeImage.alt}
                </p>
              </div>

              {hasMultipleImages && (
                <div className="flex shrink-0 items-center gap-3">
                  <button
                    type="button"
                    onClick={goToPrevious}
                    aria-label="Previous fullscreen visual"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-white hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-white"
                  >
                    <ArrowLeft
                      aria-hidden="true"
                      size={20}
                      strokeWidth={1.5}
                    />
                  </button>

                  <button
                    type="button"
                    onClick={goToNext}
                    aria-label="Next fullscreen visual"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white bg-white text-black transition-colors hover:bg-white/80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  >
                    <ArrowRight
                      aria-hidden="true"
                      size={20}
                      strokeWidth={1.5}
                    />
                  </button>
                </div>
              )}
            </div>

            <div className="mt-6 hidden justify-center gap-6 font-mono text-[9px] uppercase tracking-[0.14em] text-white/35 md:flex">
              <span>
                Left / Right to Navigate
              </span>

              <span>
                Home / End to Jump
              </span>

              <span>
                Esc to Close
              </span>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
