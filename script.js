// Navbar: add subtle shadow on scroll
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    nav.style.boxShadow = '0 2px 24px rgba(0,0,0,0.6)';
  } else {
    nav.style.boxShadow = 'none';
  }
});
