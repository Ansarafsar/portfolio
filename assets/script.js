/* =================================================================
   Ansar A — Portfolio JS
   Theme · reveal · counter · live clock
   ================================================================= */

(function () {
  'use strict';

  /* ---------- Theme ---------- */
  const THEME_KEY = 'ansar-theme';
  const html = document.documentElement;
  const stored = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = stored || (prefersDark ? 'dark' : 'light');
  html.setAttribute('data-theme', initial);

  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const cur = html.getAttribute('data-theme');
      const next = cur === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem(THEME_KEY, next);
    });
  }

  /* ---------- Reveal on scroll ---------- */
  const revealTargets = document.querySelectorAll(
    '.section__head, .about__body, .about__facts, .matrix, .timeline, .logos, .projects, .contact, .panel, .hero__panel, .marquee'
  );
  revealTargets.forEach((el) => el.classList.add('reveal'));

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
  );
  revealTargets.forEach((el) => io.observe(el));

  /* ---------- Counter ---------- */
  const counters = document.querySelectorAll('.counter');
  const counterIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const to = parseInt(el.getAttribute('data-to'), 10) || 0;
        const dur = 1400;
        const start = performance.now();
        const ease = (t) => 1 - Math.pow(1 - t, 3);
        function tick(now) {
          const t = Math.min(1, (now - start) / dur);
          el.textContent = Math.round(ease(t) * to).toString();
          if (t < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        counterIO.unobserve(el);
      });
    },
    { threshold: 0.4 }
  );
  counters.forEach((c) => counterIO.observe(c));

  /* ---------- Live clock (IST) ---------- */
  const clock = document.getElementById('liveYear');
  if (clock) {
    function tickClock() {
      const now = new Date();
      // Render in IST regardless of viewer's timezone
      const fmt = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      const parts = fmt.format(now);
      clock.textContent = `${parts}  IST · LIVE`;
    }
    tickClock();
    setInterval(tickClock, 1000 * 30);
  }

  /* ---------- Smooth-scroll already handled by CSS;
                stop layout jumps on hashes that don't exist ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (ev) => {
      const id = a.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (target) {
        ev.preventDefault();
        const top = target.getBoundingClientRect().top + window.pageYOffset - 24;
        window.scrollTo({ top, behavior: 'smooth' });
        history.replaceState(null, '', '#' + id);
      }
    });
  });

})();
