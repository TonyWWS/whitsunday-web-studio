/* ============================================================
   WWS COMPONENTS
   Nav behaviour, hamburger, active links
   Nav and footer are now inlined — no fetch calls needed
   ============================================================ */

function initPage() {

  // Sticky nav scroll effect
  // On homepage (.hero-page), nav starts transparent and turns solid on scroll
  // On all other pages, nav is always solid (set in CSS)
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  // Mobile hamburger
  const hamburger = document.getElementById('navHamburger');
  const mobileMenu = document.getElementById('navMobile');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      mobileMenu.setAttribute('aria-hidden', !isOpen);
    });
    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // Active nav link
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const cleanHref = href.replace('.html', '');
    const cleanPath = currentPath.replace('.html', '');
    if (
      cleanHref === cleanPath ||
      (cleanPath === '/' && cleanHref === '/') ||
      (cleanHref !== '/' && cleanPath.startsWith(cleanHref))
    ) {
      link.classList.add('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', initPage);
