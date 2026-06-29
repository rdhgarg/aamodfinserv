import { useEffect } from "react";

/**
 * Adds .is-visible to any element with .reveal once it scrolls into view.
 * One global observer per mount; safe to call from any page.
 */
export function useReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const els = document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)");
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}