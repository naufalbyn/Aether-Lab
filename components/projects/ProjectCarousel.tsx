
"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import type {
  MouseEvent,
  PointerEvent,
  KeyboardEvent,
} from "react";

import { useReducedMotion } from "motion/react";

import {
  ArrowLeft,
  ArrowRight,
  MoveHorizontal,
} from "lucide-react";

import ProjectCard from "@/components/projects/ProjectCard";

import type { Project } from "@/data/projects";

// ==========================================
// TYPES
// ==========================================

type ProjectCarouselProps = {
  projects: Project[];
  featuredSlug?: string;
  className?: string;
};

type DragState = {
  pointerId: number;
  startX: number;
  startScroll: number;
  moved: boolean;
};

type CarouselSnapshot = {
  version: 1;
  projectSlug: string;
  scrollLeft: number;
  viewportWidth: number;
  maxScroll: number;
  projectOrder: string;
};

// ==========================================
// CONSTANTS
// ==========================================

const DRAG_THRESHOLD = 8;
const SCROLL_TOLERANCE = 3;

const STORAGE_KEY =
  "aether-lab:selected-builds:carousel:v1";

// ==========================================
// STORAGE UTILITIES
// ==========================================

function readCarouselSnapshot():
  CarouselSnapshot | null {
  try {
    const stored =
      window.sessionStorage.getItem(
        STORAGE_KEY
      );

    if (!stored) {
      return null;
    }

    const parsed = JSON.parse(stored);

    if (
      !parsed ||
      parsed.version !== 1 ||
      typeof parsed.projectSlug !== "string" ||
      typeof parsed.projectOrder !== "string" ||
      typeof parsed.scrollLeft !== "number" ||
      !Number.isFinite(parsed.scrollLeft) ||
      typeof parsed.viewportWidth !== "number" ||
      !Number.isFinite(parsed.viewportWidth) ||
      typeof parsed.maxScroll !== "number" ||
      !Number.isFinite(parsed.maxScroll) ||
      parsed.scrollLeft < 0 ||
      parsed.viewportWidth <= 0 ||
      parsed.maxScroll < 0
    ) {
      return null;
    }

    return parsed as CarouselSnapshot;
  } catch {
    return null;
  }
}

function writeCarouselSnapshot(
  snapshot: CarouselSnapshot
) {
  try {
    window.sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(snapshot)
    );
  } catch {
    // Storage is optional.
    // Carousel navigation remains available.
  }
}

function clampScroll(
  value: number,
  maxScroll: number
) {
  return Math.max(
    0,
    Math.min(value, maxScroll)
  );
}

// ==========================================
// PROJECT CAROUSEL
// ==========================================

export default function ProjectCarousel({
  projects,
  featuredSlug,
  className = "",
}: ProjectCarouselProps) {
  const viewportRef =
    useRef<HTMLDivElement>(null);

  const trackRef =
    useRef<HTMLDivElement>(null);

  const dragRef =
    useRef<DragState | null>(null);

  const suppressClickRef =
    useRef(false);

  const clickResetTimerRef =
    useRef<number | null>(null);

  const frameRef =
    useRef<number | null>(null);

  const restorationFrameRef =
    useRef<number | null>(null);

  const snapshotRef =
    useRef<CarouselSnapshot | null>(null);

  const restorationCompleteRef =
    useRef(false);

  const prefersReducedMotion =
    useReducedMotion();

  const [activeIndex, setActiveIndex] =
    useState(0);

  const [progress, setProgress] =
    useState(0);

  const [canScrollPrev, setCanScrollPrev] =
    useState(false);

  const [canScrollNext, setCanScrollNext] =
    useState(false);

  const [isDragging, setIsDragging] =
    useState(false);

  const projectOrder = projects
    .map((project) => project.slug)
    .join("|");

  // ========================================
  // ITEM POSITIONS
  // ========================================

  const getItemPositions = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!viewport || !track) {
      return [];
    }

    const viewportRect =
      viewport.getBoundingClientRect();

    return Array.from(
      track.querySelectorAll<HTMLElement>(
        "[data-carousel-item]"
      )
    ).map((item) => {
      const itemRect =
        item.getBoundingClientRect();

      return (
        itemRect.left -
        viewportRect.left -
        viewport.clientLeft +
        viewport.scrollLeft
      );
    });
  }, []);

  // ========================================
  // ACTIVE PROJECT RESOLUTION
  // ========================================

  const getNearestIndex = useCallback(
    (
      scrollLeft: number,
      maxScroll: number
    ) => {
      const positions =
        getItemPositions();

      if (positions.length === 0) {
        return 0;
      }

      if (
        maxScroll > SCROLL_TOLERANCE &&
        scrollLeft >=
          maxScroll - SCROLL_TOLERANCE
      ) {
        return positions.length - 1;
      }

      let nearestIndex = 0;

      let nearestDistance =
        Number.POSITIVE_INFINITY;

      positions.forEach(
        (position, index) => {
          const target = clampScroll(
            position,
            maxScroll
          );

          const distance = Math.abs(
            target - scrollLeft
          );

          if (
            distance < nearestDistance
          ) {
            nearestDistance = distance;
            nearestIndex = index;
          }
        }
      );

      return nearestIndex;
    },
    [getItemPositions]
  );

  // ========================================
  // CAPTURE CAROUSEL SNAPSHOT
  // ========================================

  const captureSnapshot = useCallback(() => {
    const viewport = viewportRef.current;

    if (
      !viewport ||
      viewport.clientWidth <= 0 ||
      projects.length === 0
    ) {
      return null;
    }

    const maxScroll = Math.max(
      0,
      viewport.scrollWidth -
        viewport.clientWidth
    );

    const scrollLeft = clampScroll(
      viewport.scrollLeft,
      maxScroll
    );

    const index = getNearestIndex(
      scrollLeft,
      maxScroll
    );

    const project = projects[index];

    if (!project) {
      return null;
    }

    const snapshot: CarouselSnapshot = {
      version: 1,
      projectSlug: project.slug,
      scrollLeft,
      viewportWidth: viewport.clientWidth,
      maxScroll,
      projectOrder,
    };

    return snapshot;
  }, [
    projects,
    projectOrder,
    getNearestIndex,
  ]);

  // ========================================
  // SAVE POSITION
  // ========================================

  const savePosition = useCallback(() => {
    if (!restorationCompleteRef.current) {
      return;
    }

    const snapshot = captureSnapshot();

    if (!snapshot) {
      return;
    }

    const previous = snapshotRef.current;

    if (
      previous &&
      previous.projectSlug ===
        snapshot.projectSlug &&
      previous.projectOrder ===
        snapshot.projectOrder &&
      Math.abs(
        previous.scrollLeft -
          snapshot.scrollLeft
      ) < 1 &&
      previous.viewportWidth ===
        snapshot.viewportWidth &&
      previous.maxScroll ===
        snapshot.maxScroll
    ) {
      return;
    }

    snapshotRef.current = snapshot;

    writeCarouselSnapshot(snapshot);
  }, [captureSnapshot]);

  // ========================================
  // RESTORE POSITION
  // ========================================

  const restorePosition = useCallback(
    (
      snapshot: CarouselSnapshot | null
    ) => {
      const viewport =
        viewportRef.current;

      if (
        !viewport ||
        viewport.clientWidth <= 0
      ) {
        return;
      }

      const maxScroll = Math.max(
        0,
        viewport.scrollWidth -
          viewport.clientWidth
      );

      if (!snapshot) {
        return;
      }

      const sameLayout =
        snapshot.projectOrder ===
          projectOrder &&
        Math.abs(
          snapshot.viewportWidth -
            viewport.clientWidth
        ) <= SCROLL_TOLERANCE &&
        Math.abs(
          snapshot.maxScroll -
            maxScroll
        ) <= SCROLL_TOLERANCE;

      let target = 0;

      if (sameLayout) {
        // Exact restoration when layout
        // has not changed.

        target = snapshot.scrollLeft;
      } else {
        // Restore the corresponding project
        // when viewport or project order changes.

        const projectIndex =
          projects.findIndex(
            (project) =>
              project.slug ===
              snapshot.projectSlug
          );

        const positions =
          getItemPositions();

        if (
          projectIndex >= 0 &&
          positions[projectIndex] !==
            undefined
        ) {
          target =
            positions[projectIndex];
        } else {
          // Fallback to relative progress
          // if the original project no longer exists.

          const previousProgress =
            snapshot.maxScroll >
            SCROLL_TOLERANCE
              ? snapshot.scrollLeft /
                snapshot.maxScroll
              : 0;

          target =
            previousProgress * maxScroll;
        }
      }

      viewport.scrollTo({
        left: clampScroll(
          target,
          maxScroll
        ),
        behavior: "instant",
      });
    },
    [
      projects,
      projectOrder,
      getItemPositions,
    ]
  );

  // ========================================
  // SCROLL STATE
  // ========================================

  const updateScrollState =
    useCallback(() => {
      const viewport = viewportRef.current;

      if (!viewport) {
        return;
      }

      const maxScroll = Math.max(
        0,
        viewport.scrollWidth -
          viewport.clientWidth
      );

      const scrollLeft = clampScroll(
        viewport.scrollLeft,
        maxScroll
      );

      const scrollProgress =
        maxScroll > SCROLL_TOLERANCE
          ? scrollLeft / maxScroll
          : 0;

      setProgress(scrollProgress);

      setCanScrollPrev(
        scrollLeft > SCROLL_TOLERANCE
      );

      setCanScrollNext(
        scrollLeft <
          maxScroll - SCROLL_TOLERANCE
      );

      setActiveIndex(
        getNearestIndex(
          scrollLeft,
          maxScroll
        )
      );
    }, [getNearestIndex]);

  const scheduleScrollUpdate =
    useCallback(() => {
      if (frameRef.current !== null) {
        return;
      }

      frameRef.current =
        window.requestAnimationFrame(
          () => {
            frameRef.current = null;

            updateScrollState();

            savePosition();
          }
        );
    }, [
      updateScrollState,
      savePosition,
    ]);

  // ========================================
  // SCROLL TO POSITION
  // ========================================

  const scrollToPosition = useCallback(
    (
      position: number,
      instant = false
    ) => {
      const viewport =
        viewportRef.current;

      if (!viewport) {
        return;
      }

      const maxScroll = Math.max(
        0,
        viewport.scrollWidth -
          viewport.clientWidth
      );

      const target = clampScroll(
        position,
        maxScroll
      );

      viewport.scrollTo({
        left: target,

        behavior:
          instant ||
          prefersReducedMotion
            ? "instant"
            : "smooth",
      });
    },
    [prefersReducedMotion]
  );

  // ========================================
  // PROJECT NAVIGATION
  // ========================================

  const scrollToIndex = useCallback(
    (index: number) => {
      const positions =
        getItemPositions();

      if (positions.length === 0) {
        return;
      }

      const targetIndex = Math.max(
        0,
        Math.min(
          index,
          positions.length - 1
        )
      );

      scrollToPosition(
        positions[targetIndex]
      );
    },
    [
      getItemPositions,
      scrollToPosition,
    ]
  );

  const navigate = useCallback(
    (direction: -1 | 1) => {
      const viewport =
        viewportRef.current;

      if (!viewport) {
        return;
      }

      const maxScroll = Math.max(
        0,
        viewport.scrollWidth -
          viewport.clientWidth
      );

      const current =
        viewport.scrollLeft;

      const positions =
        getItemPositions().map(
          (position) =>
            clampScroll(
              position,
              maxScroll
            )
        );

      if (direction === 1) {
        const nextPosition =
          positions.find(
            (position) =>
              position >
              current + SCROLL_TOLERANCE
          );

        scrollToPosition(
          nextPosition ?? maxScroll
        );
      } else {
        const previousPosition = [
          ...positions,
        ]
          .reverse()
          .find(
            (position) =>
              position <
              current - SCROLL_TOLERANCE
          );

        scrollToPosition(
          previousPosition ?? 0
        );
      }
    },
    [
      getItemPositions,
      scrollToPosition,
    ]
  );

  // ========================================
  // SNAP TO NEAREST ITEM
  // ========================================

  const snapToNearest =
    useCallback(() => {
      const viewport =
        viewportRef.current;

      if (!viewport) {
        return;
      }

      const maxScroll = Math.max(
        0,
        viewport.scrollWidth -
          viewport.clientWidth
      );

      const positions =
        getItemPositions().map(
          (position) =>
            clampScroll(
              position,
              maxScroll
            )
        );

      if (positions.length === 0) {
        return;
      }

      const current =
        viewport.scrollLeft;

      let nearest = positions[0];

      positions.forEach((position) => {
        if (
          Math.abs(position - current) <
          Math.abs(nearest - current)
        ) {
          nearest = position;
        }
      });

      scrollToPosition(nearest);
    }, [
      getItemPositions,
      scrollToPosition,
    ]);

  // ========================================
  // MOUSE DRAG
  // ========================================

  const handlePointerDown = (
    event: PointerEvent<HTMLDivElement>
  ) => {
    const viewport =
      viewportRef.current;

    if (
      !viewport ||
      event.pointerType !== "mouse" ||
      event.button !== 0
    ) {
      return;
    }

    if (
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    if (
      viewport.scrollWidth <=
      viewport.clientWidth +
        SCROLL_TOLERANCE
    ) {
      return;
    }

    if (
      clickResetTimerRef.current !== null
    ) {
      window.clearTimeout(
        clickResetTimerRef.current
      );

      clickResetTimerRef.current = null;
    }

    suppressClickRef.current = false;

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScroll: viewport.scrollLeft,
      moved: false,
    };
  };

  const handlePointerMove = (
    event: PointerEvent<HTMLDivElement>
  ) => {
    const viewport =
      viewportRef.current;

    const drag = dragRef.current;

    if (
      !viewport ||
      !drag ||
      drag.pointerId !== event.pointerId
    ) {
      return;
    }

    const distance =
      event.clientX - drag.startX;

    if (
      !drag.moved &&
      Math.abs(distance) < DRAG_THRESHOLD
    ) {
      return;
    }

    if (!drag.moved) {
      drag.moved = true;

      suppressClickRef.current = true;

      setIsDragging(true);

      viewport.style.scrollSnapType =
        "none";

      viewport.style.scrollBehavior =
        "auto";

      if (
        !viewport.hasPointerCapture(
          event.pointerId
        )
      ) {
        viewport.setPointerCapture(
          event.pointerId
        );
      }
    }

    event.preventDefault();

    viewport.scrollLeft =
      drag.startScroll - distance;

    scheduleScrollUpdate();
  };

  // ========================================
  // FINISH DRAG
  // ========================================

  const finishDrag = (
    event: PointerEvent<HTMLDivElement>
  ) => {
    const viewport =
      viewportRef.current;

    const drag = dragRef.current;

    if (
      !viewport ||
      !drag ||
      drag.pointerId !== event.pointerId
    ) {
      return;
    }

    dragRef.current = null;

    viewport.style.removeProperty(
      "scroll-snap-type"
    );

    viewport.style.removeProperty(
      "scroll-behavior"
    );

    setIsDragging(false);

    if (
      viewport.hasPointerCapture(
        event.pointerId
      )
    ) {
      viewport.releasePointerCapture(
        event.pointerId
      );
    }

    if (drag.moved) {
      snapToNearest();

      clickResetTimerRef.current =
        window.setTimeout(() => {
          suppressClickRef.current =
            false;

          clickResetTimerRef.current =
            null;
        }, 0);
    }

    scheduleScrollUpdate();
  };

  // ========================================
  // CLICK HANDLING & PRE-NAVIGATION SAVE
  // ========================================

  const handleClickCapture = (
    event: MouseEvent<HTMLDivElement>
  ) => {
    if (suppressClickRef.current) {
      event.preventDefault();

      event.stopPropagation();

      suppressClickRef.current = false;

      return;
    }

    const target = event.target;

    if (!(target instanceof Element)) {
      return;
    }

    const projectLink =
      target.closest<HTMLAnchorElement>(
        'a[href^="/projects/"]'
      );

    if (projectLink) {
      // Save the actual visible position
      // before Next.js changes the route.

      savePosition();
    }
  };

  // ========================================
  // KEYBOARD NAVIGATION
  // ========================================

  const handleKeyDown = (
    event: KeyboardEvent<HTMLDivElement>
  ) => {
    if (
      event.target !== event.currentTarget
    ) {
      return;
    }

    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault();
        navigate(-1);
        break;

      case "ArrowRight":
        event.preventDefault();
        navigate(1);
        break;

      case "Home":
        event.preventDefault();
        scrollToIndex(0);
        break;

      case "End":
        event.preventDefault();
        scrollToIndex(
          projects.length - 1
        );
        break;
    }
  };

  // ========================================
  // RESTORATION & OBSERVERS
  // ========================================

  useEffect(() => {
    const viewport =
      viewportRef.current;

    const track =
      trackRef.current;

    if (!viewport || !track) {
      return;
    }

    restorationCompleteRef.current =
      false;

    snapshotRef.current =
      readCarouselSnapshot();

    // Restore before enabling persistence,
    // preventing the initial zero position
    // from overwriting the saved position.

    const initializeCarousel = () => {
      restorationFrameRef.current =
        null;

      if (viewport.clientWidth <= 0) {
        restorationFrameRef.current =
          window.requestAnimationFrame(
            initializeCarousel
          );

        return;
      }

      restorePosition(
        snapshotRef.current
      );

      restorationCompleteRef.current =
        true;

      const current = captureSnapshot();

      // Preserve the original identity
      // if the wider viewport currently
      // displays every project.

      if (
        current &&
        current.maxScroll >
          SCROLL_TOLERANCE
      ) {
        snapshotRef.current = current;

        writeCarouselSnapshot(current);
      }

      updateScrollState();
    };

    restorationFrameRef.current =
      window.requestAnimationFrame(
        initializeCarousel
      );

    // ======================================
    // RESPONSIVE RESTORATION
    // ======================================

    const handleResize = () => {
      if (
        !restorationCompleteRef.current
      ) {
        return;
      }

      if (dragRef.current?.moved) {
        scheduleScrollUpdate();
        return;
      }

      const previous =
        snapshotRef.current;

      const currentMaxScroll =
        Math.max(
          0,
          viewport.scrollWidth -
            viewport.clientWidth
        );

      const layoutChanged =
        previous !== null &&
        (
          Math.abs(
            previous.viewportWidth -
              viewport.clientWidth
          ) > SCROLL_TOLERANCE ||
          Math.abs(
            previous.maxScroll -
              currentMaxScroll
          ) > SCROLL_TOLERANCE
        );

      if (
        layoutChanged &&
        previous
      ) {
        restorePosition(previous);
      }

      scheduleScrollUpdate();
    };

    const resizeObserver =
      new ResizeObserver(handleResize);

    resizeObserver.observe(viewport);

    resizeObserver.observe(track);

    // ======================================
    // SCROLL LISTENER
    // ======================================

    const handleScroll = () => {
      if (
        !restorationCompleteRef.current
      ) {
        return;
      }

      scheduleScrollUpdate();
    };

    // ======================================
    // RESET DRAG ON WINDOW BLUR
    // ======================================

    const resetDrag = () => {
      dragRef.current = null;

      suppressClickRef.current = false;

      viewport.style.removeProperty(
        "scroll-snap-type"
      );

      viewport.style.removeProperty(
        "scroll-behavior"
      );

      setIsDragging(false);

      scheduleScrollUpdate();
    };

    // ======================================
    // SAVE BEFORE PAGE EXIT
    // ======================================

    const handlePageHide = () => {
      savePosition();
    };

    const handleVisibilityChange = () => {
      if (
        document.visibilityState ===
        "hidden"
      ) {
        savePosition();
      }
    };

    viewport.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    window.addEventListener(
      "blur",
      resetDrag
    );

    window.addEventListener(
      "pagehide",
      handlePageHide
    );

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    // ======================================
    // CLEANUP
    // ======================================

    return () => {
      restorationCompleteRef.current =
        false;

      resizeObserver.disconnect();

      viewport.removeEventListener(
        "scroll",
        handleScroll
      );

      window.removeEventListener(
        "blur",
        resetDrag
      );

      window.removeEventListener(
        "pagehide",
        handlePageHide
      );

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );

      if (
        restorationFrameRef.current !==
        null
      ) {
        window.cancelAnimationFrame(
          restorationFrameRef.current
        );

        restorationFrameRef.current =
          null;
      }

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(
          frameRef.current
        );

        frameRef.current = null;
      }

      if (
        clickResetTimerRef.current !==
        null
      ) {
        window.clearTimeout(
          clickResetTimerRef.current
        );

        clickResetTimerRef.current =
          null;
      }

      viewport.style.removeProperty(
        "scroll-snap-type"
      );

      viewport.style.removeProperty(
        "scroll-behavior"
      );

      dragRef.current = null;

      suppressClickRef.current =
        false;
    };
  }, [
    captureSnapshot,
    restorePosition,
    savePosition,
    updateScrollState,
    scheduleScrollUpdate,
  ]);

  // ========================================
  // EMPTY STATE
  // ========================================

  if (projects.length === 0) {
    return null;
  }

  const totalProjects = String(
    projects.length
  ).padStart(2, "0");

  const currentProject = String(
    activeIndex + 1
  ).padStart(2, "0");

  // ========================================
  // RENDER
  // ========================================

  return (
    <div
      role="region"
      aria-label="Selected project gallery"
      className={[
        "relative min-w-0",
        className,
      ].join(" ")}
    >
      {/* ==================================
          CAROUSEL HEADER
      ================================== */}

      <div className="mb-8 flex flex-wrap items-center justify-between gap-5 md:mb-10">
        <div className="flex items-center gap-4">
          <span className="h-1.5 w-1.5 rounded-full bg-[#C7FF3D]" />

          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/60">
            Project Archive
          </span>

          <span className="h-3 w-px bg-white/15" />

          <span className="font-mono text-[10px] tracking-[0.12em] text-white/40">
            {totalProjects} Builds
          </span>
        </div>

        {/* Navigation Controls */}

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Previous project"
            disabled={!canScrollPrev}
            onClick={() => navigate(-1)}
            className={[
              "flex h-12 w-12 items-center",
              "justify-center rounded-full",
              "border border-white/15",
              "text-white",
              "transition-colors duration-300",
              "hover:border-[#C7FF3D]",
              "hover:bg-[#C7FF3D]",
              "hover:text-[#0B0D10]",
              "focus-visible:outline-2",
              "focus-visible:outline-offset-4",
              "focus-visible:outline-[#C7FF3D]",
              "disabled:cursor-not-allowed",
              "disabled:opacity-25",
              "disabled:hover:border-white/15",
              "disabled:hover:bg-transparent",
              "disabled:hover:text-white",
              "md:h-14 md:w-14",
            ].join(" ")}
          >
            <ArrowLeft
              size={21}
              strokeWidth={1.5}
            />
          </button>

          <button
            type="button"
            aria-label="Next project"
            disabled={!canScrollNext}
            onClick={() => navigate(1)}
            className={[
              "flex h-12 w-12 items-center",
              "justify-center rounded-full",
              "border border-white/15",
              "text-white",
              "transition-colors duration-300",
              "hover:border-[#C7FF3D]",
              "hover:bg-[#C7FF3D]",
              "hover:text-[#0B0D10]",
              "focus-visible:outline-2",
              "focus-visible:outline-offset-4",
              "focus-visible:outline-[#C7FF3D]",
              "disabled:cursor-not-allowed",
              "disabled:opacity-25",
              "disabled:hover:border-white/15",
              "disabled:hover:bg-transparent",
              "disabled:hover:text-white",
              "md:h-14 md:w-14",
            ].join(" ")}
          >
            <ArrowRight
              size={21}
              strokeWidth={1.5}
            />
          </button>
        </div>
      </div>

      {/* ==================================
          SCROLL VIEWPORT
      ================================== */}

      <div
        ref={viewportRef}
        tabIndex={0}
        aria-label="Scrollable projects. Use arrow keys to navigate."
        data-lenis-prevent-horizontal
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onLostPointerCapture={finishDrag}
        onPointerLeave={(event) => {
          if (
            dragRef.current &&
            !dragRef.current.moved
          ) {
            finishDrag(event);
          }
        }}
        onClickCapture={handleClickCapture}
        onKeyDown={handleKeyDown}
        onDragStart={(event) =>
          event.preventDefault()
        }
        className={[
          "relative min-w-0",
          "overflow-x-auto overflow-y-hidden",
          "overscroll-x-contain",
          "snap-x snap-mandatory",
          "touch-auto",
          "outline-none",
          "pb-4 pt-2",
          "scrollbar-none",
          "[&::-webkit-scrollbar]:hidden",
          "focus-visible:ring-1",
          "focus-visible:ring-[#C7FF3D]/60",
          isDragging
            ? "cursor-grabbing select-none **:cursor-grabbing"
            : "select-none",
        ].join(" ")}
      >
        <div
          ref={trackRef}
          className="flex w-max items-stretch gap-5 md:gap-8"
        >
          {projects.map(
            (project, index) => (
              <div
                key={project.slug}
                data-carousel-item
                className={[
                  "min-w-0 shrink-0",
                  "snap-start",
                  "w-[78vw]",
                  "max-w-135",
                  "sm:w-[62vw]",
                  "md:w-[48vw]",
                  "lg:w-[38vw]",
                  "xl:w-[34vw]",
                  "2xl:w-125",
                ].join(" ")}
              >
                <ProjectCard
                  project={project}
                  featured={
                    project.slug ===
                    featuredSlug
                  }
                  priority={index === 0}
                />
              </div>
            )
          )}
        </div>
      </div>

      {/* ==================================
          CAROUSEL PROGRESS
      ================================== */}

      <div className="mt-8 border-t border-white/10 pt-6 md:mt-10">
        <div className="flex items-center gap-5 md:gap-8">
          {/* Current Project */}

          <span className="shrink-0 font-mono text-[10px] tracking-[0.14em] text-white/60">
            {currentProject}

            <span className="px-2 text-white/25">
              /
            </span>

            {totalProjects}
          </span>

          {/* Scroll Progress */}

          <div
            role="progressbar"
            aria-label="Project gallery scroll progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={
              Math.round(progress * 100)
            }
            className="relative h-0.75 flex-1 overflow-hidden rounded-full bg-white/10"
          >
            <div
              className="absolute inset-y-0 rounded-full bg-[#C7FF3D]"
              style={{
                width:
                  `${100 / projects.length}%`,

                left:
                  `${progress *
                  (100 -
                    100 / projects.length)}%`,
              }}
            />
          </div>

          {/* Drag Hint */}

          <div className="hidden shrink-0 items-center gap-2 sm:flex">
            <MoveHorizontal
              size={16}
              strokeWidth={1.3}
              className="text-white/35"
            />

            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/40">
              Drag to Explore
            </span>
          </div>
        </div>

        {/* Project Position Controls */}

        <div
          aria-label="Jump to project"
          className="mt-6 flex flex-wrap items-center gap-2"
        >
          {projects.map(
            (project, index) => (
              <button
                key={project.slug}
                type="button"
                aria-label={`Scroll to ${project.title}`}
                aria-current={
                  activeIndex === index
                    ? "true"
                    : undefined
                }
                onClick={() =>
                  scrollToIndex(index)
                }
                className={[
                  "rounded-full border",
                  "px-3 py-2",
                  "font-mono text-[9px]",
                  "tracking-[0.08em]",
                  "transition-colors duration-300",
                  "focus-visible:outline-2",
                  "focus-visible:outline-offset-2",
                  "focus-visible:outline-[#C7FF3D]",
                  activeIndex === index
                    ? "border-[#C7FF3D]/40 bg-[#C7FF3D]/10 text-[#C7FF3D]"
                    : "border-white/10 text-white/45 hover:border-white/25 hover:text-white",
                ].join(" ")}
              >
                {String(index + 1).padStart(
                  2,
                  "0"
                )}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
