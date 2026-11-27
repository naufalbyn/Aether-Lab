
"use client";

import { useEffect, useState } from "react";

import {
  mobileNavigation,
  type NavigationId,
} from "@/data/navigation";

export type NavigationTheme = "light" | "dark";

interface NavigationState {
  scrolled: boolean;
  activeSection: NavigationId | null;
  theme: NavigationTheme;
  progress: number;
}

// ==========================================
// BACKGROUND DETECTION
// ==========================================

function getBackgroundBrightness(
  element: Element | null
): number | null {
  let current = element;

  while (current) {
    const style = window.getComputedStyle(current);

    const background = style.backgroundColor;

    const values = background.match(
      /[\d.]+/g
    );

    if (values && values.length >= 3) {
      const [red, green, blue, alpha = 1] =
        values.map(Number);

      if (alpha >= 0.85) {
        return (
          red * 0.2126 +
          green * 0.7152 +
          blue * 0.0722
        );
      }
    }

    current = current.parentElement;
  }

  return null;
}

function detectTheme(
  fallback: NavigationTheme
): NavigationTheme {
  const x = Math.floor(window.innerWidth / 2);
  const y = 48;

  const elements = document.elementsFromPoint(
    x,
    y
  );

  const content = elements.find((element) => {
    return (
      element.closest("main") &&
      !element.closest("[data-site-navigation]") &&
      !element.closest("[data-mobile-navigation]") &&
      !element.closest("[data-navigation-brand]") &&
      !element.closest("header")
    );
  });

  if (!content) return fallback;

  const brightness =
    getBackgroundBrightness(content);

  if (brightness === null) {
    return fallback;
  }

  return brightness < 128
    ? "dark"
    : "light";
}

// ==========================================
// ACTIVE SECTION DETECTION
// ==========================================

function detectActiveSection():
  NavigationId | null {
  const readingLine = Math.min(
    window.innerHeight * 0.3,
    240
  );

  for (const item of mobileNavigation) {
    const element = document.getElementById(
      item.href.slice(1)
    );

    if (!element) continue;

    const rect =
      element.getBoundingClientRect();

    if (
      rect.top <= readingLine &&
      rect.bottom > readingLine
    ) {
      return item.id;
    }
  }

  return null;
}

// ==========================================
// NAVIGATION STATE HOOK
// ==========================================

export default function useNavigationState() {
  const [state, setState] =
    useState<NavigationState>({
      scrolled: false,
      activeSection: null,
      theme: "light",
      progress: 0,
    });

  useEffect(() => {
    let frame = 0;

    let previousTheme: NavigationTheme =
      "light";

    function update() {
      frame = 0;

      const scrollY = window.scrollY;

      const maxScroll = Math.max(
        0,
        document.documentElement.scrollHeight -
          window.innerHeight
      );

      const progress =
        maxScroll > 0
          ? Math.min(
              100,
              Math.max(
                0,
                (scrollY / maxScroll) * 100
              )
            )
          : 0;

      const activeSection =
        detectActiveSection();

      const theme =
        detectTheme(previousTheme);

      previousTheme = theme;

      const next: NavigationState = {
        scrolled: scrollY > 40,
        activeSection,
        theme,
        progress: Math.round(progress),
      };

      setState((previous) => {
        if (
          previous.scrolled === next.scrolled &&
          previous.activeSection ===
            next.activeSection &&
          previous.theme === next.theme &&
          previous.progress === next.progress
        ) {
          return previous;
        }

        return next;
      });
    }

    function scheduleUpdate() {
      if (frame) return;

      frame =
        window.requestAnimationFrame(update);
    }

    const observer =
      new ResizeObserver(scheduleUpdate);

    observer.observe(document.body);

    window.addEventListener(
      "scroll",
      scheduleUpdate,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      scheduleUpdate
    );

    window.addEventListener(
      "hashchange",
      scheduleUpdate
    );

    scheduleUpdate();

    return () => {
      observer.disconnect();

      window.removeEventListener(
        "scroll",
        scheduleUpdate
      );

      window.removeEventListener(
        "resize",
        scheduleUpdate
      );

      window.removeEventListener(
        "hashchange",
        scheduleUpdate
      );

      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return state;
}
