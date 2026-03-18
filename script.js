document.addEventListener('DOMContentLoaded', () => {
  // ─── Custom Cursor Glow ──────────────────────────────────────────────
  const cursorGlow = document.querySelector('.cursor-glow');
  
  document.addEventListener('mousemove', (e) => {
    // Update cursor glow position
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
    
    // Show glow on mouse move
    if (cursorGlow.style.opacity === '0' || !cursorGlow.style.opacity) {
      cursorGlow.style.opacity = '1';
    }
  });
  
  // Hide glow when mouse leaves window
  document.addEventListener('mouseleave', () => {
    cursorGlow.style.opacity = '0';
  });

  // ─── Scroll Reveal Animations ────────────────────────────────────────
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optional: Stop observing once animated
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('[data-animate], [data-stagger]').forEach(el => {
    observer.observe(el);
  });

  // ─── Navigation Scroll Effect & Active State ─────────────────────────
  const nav = document.querySelector('nav');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    // Nav styling on scroll
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    // Active link highlighting
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - sectionHeight / 3)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });

  // ─── Magnetic Buttons ────────────────────────────────────────────────
  const magneticBtns = document.querySelectorAll('.magnetic-btn');
  
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Calculate pull strength (adjust the divisor for stronger/weaker pull)
      const pullX = x / 4;
      const pullY = y / 4;
      
      btn.style.setProperty('--mag-x', `${pullX}px`);
      btn.style.setProperty('--mag-y', `${pullY}px`);
    });
    
    btn.addEventListener('mouseleave', () => {
      // Reset position with a slight spring effect handled by CSS transition
      btn.style.setProperty('--mag-x', '0px');
      btn.style.setProperty('--mag-y', '0px');
    });
  });
});
