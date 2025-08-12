// assets/js/main.js

document.addEventListener('DOMContentLoaded', function () {

  // --- Navbar Scroll Effect ---
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // --- Load Components ---
  function loadComponent(id, url) {
    fetch(url)
      .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} for ${url}`);
        }
        return response.text();
      })
      .then(data => {
        document.getElementById(id).innerHTML = data;
        // Re-run scripts if needed for dynamically loaded content
        if (url.includes('navbar.html')) {
          // Initialize mobile menu toggle after navbar loads
          const menuToggle = document.querySelector('.menu-toggle');
          const navLinks = document.querySelector('.nav-links');
          if (menuToggle && navLinks) {
            menuToggle.addEventListener('click', () => {
              navLinks.classList.toggle('active');
            });
          }
          // *** Initialize Theme Toggle after navbar loads ***
          if (typeof window.initThemeToggle === 'function') {
              window.initThemeToggle();
          } else {
              console.warn('initThemeToggle function not found. Make sure theme.js is loaded.');
          }
          // ****************************************************
        }
      })
      .catch(error => {
        console.error(`Error loading ${url}:`, error);
        // Optionally, display an error message in the placeholder
        // document.getElementById(id).innerHTML = `<p>Error loading component.</p>`;
      });
  }

  loadComponent('navbar', 'components/navbar.html');
  loadComponent('footer', 'components/footer.html');

  // --- Smooth Scrolling for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70, // Adjust for fixed navbar height
          behavior: 'smooth'
        });
        // Close mobile menu if open
        const navLinks = document.querySelector('.nav-links');
        if (navLinks && navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
        }
      }
    });
  });

  // --- Fade-in Animations on Scroll ---
  const animateElements = document.querySelectorAll('.animate');
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animateElements.forEach(el => {
    el.style.animationPlayState = 'paused'; // Start paused
    observer.observe(el);
  });

  // --- Lazy Loading for Images ---
  const lazyImages = document.querySelectorAll('img.lazy');
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          // Use data-src for the actual source
          const src = img.dataset.src;
          if (src) {
            img.src = src;
          }
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for older browsers
    lazyImages.forEach(img => {
      const src = img.dataset.src;
      if (src) {
        img.src = src;
      }
      img.classList.remove('lazy');
    });
  }
});