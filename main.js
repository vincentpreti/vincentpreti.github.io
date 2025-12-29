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
    const fadeRange = Math.max(220, window.innerHeight * 0.55);
    const t = clamp01(window.scrollY / fadeRange);

    root.style.setProperty("--hero-opacity", (1 - t).toFixed(4));
    root.style.setProperty("--man-opacity", t.toFixed(4));

    // very subtle blur
    const heroBlur = lerp(0, 1.8, t);
    root.style.setProperty("--hero-blur", `${heroBlur.toFixed(2)}px`);

    if (t > 0.60) man.classList.add("is-active");
    else man.classList.remove("is-active");

    const hint = hero.querySelector(".scrollHint");
    if (hint) hint.style.opacity = (t < 0.05) ? "0.7" : "0";
  }

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
})();
