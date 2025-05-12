document.addEventListener('DOMContentLoaded', function() {
  // --- Project Details Expansion ---
  const projectItems = document.querySelectorAll('.project-item');
  projectItems.forEach(projectItem => {
      const expandButton = projectItem.querySelector('.expand-button');
      const details = projectItem.querySelector('.project-details');

      if (expandButton && details) {
          expandButton.addEventListener('click', () => {
              const isExpanded = details.classList.contains('expanded'); // Use classList
              details.classList.toggle('expanded'); // Use classList.toggle
              expandButton.textContent = isExpanded ? 'Thu gọn' : 'Xem chi tiết';
          });
      }
  });

  // --- Smooth Scrolling and Active Navigation ---
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(navLink => {
      navLink.addEventListener('click', function(event) {
          event.preventDefault();

          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);

          if (targetElement) {
              targetElement.scrollIntoView({ behavior: 'smooth' });

              navLinks.forEach(link => link.classList.remove('active'));
              this.classList.add('active');
          }
      });
  });

  // --- AOS Initialization ---
  if (typeof AOS !== 'undefined') {
      AOS.init({
          duration: 800,
          easing: 'ease-in-out',
          once: true,
      });
  } else {
      console.warn('AOS is not defined. Ensure it is properly included.');
  }

  // --- Particle Creation ---
  const homeSection = document.getElementById('home');
  if (homeSection) {
      const numParticles = 30;
      for (let i = 0; i < numParticles; i++) {
          const particle = document.createElement('div');
          particle.classList.add('particle');
          const x = (Math.random() - 0.5) * 100;
          const y = (Math.random() - 0.5) * 100;
          particle.style.setProperty('--x', `${x}px`);
          particle.style.setProperty('--y', `${y}px`);
          particle.style.top = `${Math.random() * 100}vh`;
          particle.style.left = `${Math.random() * 100}vw`;
          particle.style.animationDelay = `${Math.random() * 3}s`;
          particle.style.scale = `${Math.random() * 0.5 + 0.5}`;
          homeSection.appendChild(particle);
      }
  } else {
      console.warn('Home section not found, particles not generated.');
  }

  // --- Add scroll animations ---
  const sections = document.querySelectorAll('.section');
  sections.forEach((section, index) => {
      section.style.opacity = 0;
      section.style.transform = 'translateY(50px)';
      section.style.transition = 'all 0.8s ease-in-out';

      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  section.style.opacity = 1;
                  section.style.transform = 'translateY(0)';
                  observer.disconnect();
              }
          });
      }, {
          threshold: 0.1,
      });

      observer.observe(section);
  });
});