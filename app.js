/* ═══════════════════════════════════════════════════════
   MANAS NIGAM PORTFOLIO — JavaScript
   Scroll-reveal animations & smooth interactions
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── Intersection Observer for scroll reveals ───────
  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Stagger children
        const children = entry.target.querySelectorAll('.reveal-child');
        children.forEach((child, i) => {
          child.style.transitionDelay = `${i * 100}ms`;
          // Use a small timeout to ensure the delay applies
          requestAnimationFrame(() => {
            child.classList.add('visible');
          });
        });

        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all .reveal elements
  document.querySelectorAll('.reveal').forEach((el) => {
    revealObserver.observe(el);
  });

  // ─── Active nav highlight on scroll ─────────────────
  const sections = document.querySelectorAll('section, .footer');
  const navLinks = document.querySelectorAll('.nav-links a');

  function highlightNav() {
    const scrollY = window.scrollY + 200;

    sections.forEach((section) => {
      const id = section.getAttribute('id');
      if (!id) return;

      const top = section.offsetTop;
      const height = section.offsetHeight;

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav();

  // ─── Smooth scroll for nav links ────────────────────
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // ─── Skill pill subtle pop on hover ─────────────────
  document.querySelectorAll('.skill-pill').forEach((pill) => {
    pill.addEventListener('mouseenter', () => {
      pill.style.transform = 'scale(1.08) translateY(-2px)';
    });
    pill.addEventListener('mouseleave', () => {
      pill.style.transform = '';
    });
  });
})();
