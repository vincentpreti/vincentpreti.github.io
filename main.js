// Discreet reveal on scroll
(function () {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  const elements = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || !elements.length) {
    elements.forEach(el => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
  );

  elements.forEach(el => observer.observe(el));
})();
