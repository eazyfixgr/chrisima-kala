(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Progressive reveal for cards and media blocks (visible by default if JS is off).
  const revealTargets = document.querySelectorAll(
    '.hero-media, .gallery, .product-card, .step-card, .use-card, .contents-image, .side-card'
  );
  const revealAll = () => revealTargets.forEach((el) => el.classList.add('is-in'));

  if (!reduceMotion && 'IntersectionObserver' in window && revealTargets.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    revealTargets.forEach((el) => {
      el.classList.add('reveal');
      io.observe(el);
    });

    // Immediately reveal anything already on screen, and guarantee a final
    // reveal so content can never stay hidden if the observer never fires.
    requestAnimationFrame(() => {
      revealTargets.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) el.classList.add('is-in');
      });
    });
    window.addEventListener('load', () => setTimeout(revealAll, 900));
    setTimeout(revealAll, 2500);
  }

  // Harden external links.
  document.querySelectorAll('a[href^="http"]').forEach((a) => {
    if (a.host && a.host !== window.location.host) {
      a.setAttribute('rel', 'noopener noreferrer');
    }
  });
})();
