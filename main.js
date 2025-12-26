(function () {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  const root = document.documentElement;
  const hero = document.querySelector(".hero-layer");
  const man = document.querySelector(".manifesto-layer");
  if (!hero || !man) return;

  function clamp01(x){ return Math.max(0, Math.min(1, x)); }
  function lerp(a, b, t){ return a + (b - a) * t; }

  function update(){
    // scroll distance used to complete the crossfade
    const fadeRange = Math.max(220, window.innerHeight * 0.55);
    const t = clamp01(window.scrollY / fadeRange); // 0 -> 1

    // Crossfade
    const heroOpacity = 1 - t;
    const manOpacity = t;

    root.style.setProperty("--hero-opacity", heroOpacity.toFixed(4));
    root.style.setProperty("--man-opacity", manOpacity.toFixed(4));

    // Subtle dissolution blur: 0 -> 2.5px
    const heroBlur = lerp(0, 2.5, t);
    root.style.setProperty("--hero-blur", `${heroBlur.toFixed(2)}px`);

    // Interactions only when manifesto is mostly visible
    if (t > 0.60) man.classList.add("is-active");
    else man.classList.remove("is-active");

    // Fade the scroll hint quickly once you start scrolling
    const hint = hero.querySelector(".scrollHint");
    if (hint) hint.style.opacity = (t < 0.05) ? "0.7" : "0";
  }

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
})();
