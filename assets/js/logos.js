class LogoMarquee {
  constructor() {
    this.marquee = document.querySelector('.logo-marquee');
    this.logos = document.querySelectorAll('.logo-marquee img');
    this.logos.forEach(logo => logo.addEventListener('load', this.duplicateLogos));
  }

  duplicateLogos() {
    const marquee = document.querySelector('.logo-marquee');
    const logos = marquee.innerHTML;
    marquee.innerHTML += logos; // Double the logos for seamless loop
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.logo-marquee')) {
    new LogoMarquee();
  }
});