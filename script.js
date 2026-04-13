/* ════════════════════════════════════════
   PROJECT DATA — edit this section to
   add / remove your projects
════════════════════════════════════════ */
const projects = [
  {
    name: "Project Alpha",
    desc: "A full-stack web application for task management with real-time collaboration and a clean, minimal interface.",
    stack: "React / Node.js / PostgreSQL",
    year: "2024",
    link: "https://github.com/meloer101"
  },
  {
    name: "CLI Toolbox",
    desc: "A command-line utility that automates repetitive dev workflows — scaffolding, linting, and deployment in one command.",
    stack: "Python / Click / Shell",
    year: "2024",
    link: "https://github.com/meloer101"
  },
  {
    name: "Visual Data Board",
    desc: "An interactive dashboard for visualising complex datasets with animated, accessible charts built from scratch.",
    stack: "TypeScript / D3.js / CSS",
    year: "2023",
    link: "https://github.com/meloer101"
  },
  {
    name: "API Gateway",
    desc: "A lightweight REST API gateway with rate limiting, auth middleware, and auto-generated documentation.",
    stack: "Go / Docker / Nginx",
    year: "2023",
    link: "https://github.com/meloer101"
  }
];

/* ════════════════════════════════════════
   HERO NAME — character reveal
════════════════════════════════════════ */
function splitHeroName() {
  const el = document.getElementById('hero-name');
  if (!el) return;

  // Preserve the ® span at the end
  const raw = 'JACOY YU';
  let html = '';
  let delay = 0.05;

  for (let i = 0; i < raw.length; i++) {
    const ch = raw[i];
    if (ch === ' ') {
      html += '<span class="char-space"> </span>';
    } else {
      html += `<span class="char-wrap"><span class="char" style="animation-delay:${delay.toFixed(2)}s">${ch}</span></span>`;
      delay += 0.055;
    }
  }

  // Append ® with accent colour
  html += `<span class="char-wrap"><span class="char accent" style="animation-delay:${delay.toFixed(2)}s">®</span></span>`;

  el.innerHTML = html;
}

/* ════════════════════════════════════════
   WORK LIST — render projects
════════════════════════════════════════ */
function renderProjects() {
  const list = document.getElementById('work-list');
  if (!list) return;

  list.innerHTML = projects.map(p => `
    <div class="work-item">
      <div class="work-item-main">
        <a href="${p.link}" target="_blank" rel="noopener" class="work-item-name">
          <span class="work-arrow">→</span>${p.name}
        </a>
        <p class="work-item-desc">${p.desc}</p>
        <a href="${p.link}" target="_blank" rel="noopener" class="work-item-link">View on GitHub ↗</a>
      </div>
      <div class="work-item-stack">${p.stack}</div>
      <div class="work-item-year">${p.year}</div>
    </div>
  `).join('');
}

/* ════════════════════════════════════════
   CUSTOM CURSOR
════════════════════════════════════════ */
function initCursor() {
  const dot  = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mx = -100, my = -100;
  let rx = -100, ry = -100;
  let raf;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
  });

  // Smooth ring follow
  function animateRing() {
    rx += (mx - rx) * 0.15;
    ry += (my - ry) * 0.15;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    raf = requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover state on interactive elements
  const interactives = 'a, button, .work-item-name, .contact-btn, .btn, .nav-link, .nav-logo';

  document.querySelectorAll(interactives).forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.classList.add('is-link');
      ring.classList.add('is-link');
    });
    el.addEventListener('mouseleave', () => {
      dot.classList.remove('is-link');
      ring.classList.remove('is-link');
    });
  });

  // Hide cursor when leaving viewport
  document.addEventListener('mouseleave', () => {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity  = '1';
    ring.style.opacity = '1';
  });
}

/* ════════════════════════════════════════
   SCROLL PROGRESS + NAV BORDER
════════════════════════════════════════ */
function initScroll() {
  const bar = document.getElementById('scroll-bar');
  const nav = document.getElementById('nav');

  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    if (bar) bar.style.width = Math.min(pct, 100) + '%';
    if (nav) nav.classList.toggle('is-scrolled', window.scrollY > 20);
  }, { passive: true });
}

/* ════════════════════════════════════════
   INTERSECTION OBSERVER — fade-up + work items
════════════════════════════════════════ */
function initObservers() {
  const fadeEls = document.querySelectorAll('.fade-up');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  fadeEls.forEach(el => observer.observe(el));

  // Work items staggered
  const workObserver = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        const delay = parseInt(e.target.dataset.index || '0') * 80;
        setTimeout(() => e.target.classList.add('visible'), delay);
        workObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.work-item').forEach((el, i) => {
    el.dataset.index = i;
    workObserver.observe(el);
  });
}

/* ════════════════════════════════════════
   SMOOTH SCROLL for nav links
════════════════════════════════════════ */
function initSmoothLinks() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    });
  });
}

/* ════════════════════════════════════════
   INIT
════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  splitHeroName();
  renderProjects();
  initCursor();
  initScroll();
  initSmoothLinks();
  // Wait a tick so DOM is ready for observers after renderProjects
  requestAnimationFrame(initObservers);
});
