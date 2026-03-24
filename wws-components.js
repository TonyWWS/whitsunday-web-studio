/* ============================================================
   WWS COMPONENT LOADER
   Loads nav and footer into every page
   ============================================================ */

async function loadComponent(id, file) {
  try {
    const res = await fetch(file);
    const html = await res.text();
    document.getElementById(id).innerHTML = html;
  } catch(e) {
    console.warn('Could not load component:', file);
  }
}

async function initPage() {
  await Promise.all([
    loadComponent('nav-placeholder', '/nav.html'),
    loadComponent('footer-placeholder', '/footer.html')
  ]);

  // Sticky nav scroll effect
  const nav = document.querySelector('.nav');
  if(nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  // Mobile hamburger
  const hamburger = document.getElementById('navHamburger');
  const mobileMenu = document.getElementById('navMobile');
  if(hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
  }

  // Active nav link
  const currentPage = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if(href === currentPage || (currentPage === '/' && href === '/') || currentPage.includes(href.replace('.html',''))) {
      link.classList.add('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', initPage);
