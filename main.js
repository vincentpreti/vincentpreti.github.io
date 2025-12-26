(function () {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  const root = document.documentElement;
  const hero = document.querySelector(".hero-layer");
  const man = document.querySelector(".manifesto-layer");
  if (!hero || !man) return;

  function clamp01(x){ return Math.max(0, Math.min(1, x)); }

  function update(){
    // amount of scroll that drives the fade, in px
    const fadeRange = Math.max(200, window.innerHeight * 0.55);
    const t = clamp01(window.scrollY / fadeRange); // 0 -> 1

    // Crossfade
    const heroOpacity = 1 - t;
    const manOpacity = t;

    root.style.setProperty("--hero-opacity", heroOpacity.toFixed(4));
    root.style.setProperty("--man-opacity", manOpacity.toFixed(4));

    // Enable interactions only when manifesto is mostly visible
    if (t > 0.6) man.classList.add("is-active");
    else man.classList.remove("is-active");

    // Hide scroll hint once fade starts
    const hint = hero.querySelector(".scrollHint");
    if (hint) hint.style.opacity = (t < 0.05) ? "0.7" : "0";
  }

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
})();
