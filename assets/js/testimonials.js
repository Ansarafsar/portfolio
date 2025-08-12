// // document.addEventListener('DOMContentLoaded', () => {
// //   const carousel = document.getElementById('testimonial-carousel');
// //   const slides = document.querySelectorAll('.testimonial-slide');
// //   const slideCount = slides.length;

// //   // Duplicate slides for seamless looping
// //   carousel.innerHTML += carousel.innerHTML;

// //   // Adjust animation duration based on number of slides
// //   const animationDuration = slideCount * 5; // 5 seconds per slide
// //   carousel.style.animationDuration = `${animationDuration}s`;
// // });

// class TestimonialCarousel {
//   constructor() {
//     this.carousel = document.querySelector('.testimonial-carousel');
//     this.slides = document.querySelectorAll('.testimonial-slide');
//     this.currentIndex = 0;
//     this.interval = 5000; // 5 seconds
//     this.isPaused = false;
    
//     this.init();
//   }

//   init() {
//     // Clone first slide and append to end for infinite effect
//     const firstSlide = this.slides[0].cloneNode(true);
//     this.carousel.appendChild(firstSlide);
    
//     this.startAutoScroll();
    
//     // Pause on hover
//     this.carousel.addEventListener('mouseenter', () => this.pause());
//     this.carousel.addEventListener('mouseleave', () => this.resume());
//   }

//   startAutoScroll() {
//     setInterval(() => {
//       if (!this.isPaused) this.nextSlide();
//     }, this.interval);
//   }

//   nextSlide() {
//     this.currentIndex = (this.currentIndex + 1) % (this.slides.length + 1);
//     const translateX = -this.currentIndex * 100;
//     this.carousel.style.transition = 'transform 0.5s ease';
//     this.carousel.style.transform = `translateX(${translateX}%)`;
    
//     // Reset to first slide seamlessly
//     if (this.currentIndex === this.slides.length) {
//       setTimeout(() => {
//         this.carousel.style.transition = 'none';
//         this.currentIndex = 0;
//         this.carousel.style.transform = 'translateX(0)';
//       }, 500);
//     }
//   }

//   pause() {
//     this.isPaused = true;
//   }

//   resume() {
//     this.isPaused = false;
//   }
// }

// // Initialize on DOM load
// document.addEventListener('DOMContentLoaded', () => {
//   if (document.querySelector('.testimonial-carousel')) {
//     new TestimonialCarousel();
//   }
// });

// assets/js/testimonials.js

document.addEventListener('DOMContentLoaded', function () {
  // Toggle Testimonials Widget
  const toggleTestimonialsBtn = document.getElementById('toggle-testimonials');
  const testimonialsWidget = document.getElementById('testimonials-widget');

  if (toggleTestimonialsBtn && testimonialsWidget) {
    toggleTestimonialsBtn.addEventListener('click', function () {
      testimonialsWidget.style.display = testimonialsWidget.style.display === 'none' ? 'block' : 'none';
    });
  }

  // Toggle Logos Widget
  const toggleLogosBtn = document.getElementById('toggle-logos');
  const logosWidget = document.getElementById('logos-widget');

  if (toggleLogosBtn && logosWidget) {
    toggleLogosBtn.addEventListener('click', function () {
      logosWidget.style.display = logosWidget.style.display === 'none' ? 'block' : 'none';
    });
  }

  // Optional: Auto-hide widgets on mobile for better UX
  // You can add this if needed
  
  function checkScreenSize() {
    if (window.innerWidth <= 768) {
      if(testimonialsWidget) testimonialsWidget.style.display = 'none';
      if(logosWidget) logosWidget.style.display = 'none';
    } else {
      if(testimonialsWidget) testimonialsWidget.style.display = 'block';
      if(logosWidget) logosWidget.style.display = 'block';
    }
  }

  // Check on load and resize
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
  // assets/js/testimonials.js
// Placeholder or minimal script
// If toggles were the only content, this file can be removed
// or its reference removed from index.html
console.log("Floating widgets loaded.");
  
});