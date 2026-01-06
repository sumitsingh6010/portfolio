// ========================================
// Modern Portfolio - Interactive Features
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  
  // ============ HIDE NAV ON COVER PAGE ============
  const sideNav = document.querySelector('.side-nav');
  const mobileNav = document.querySelector('.mobile-nav');
  const coverPage = document.getElementById('cover');
  
  const checkCoverVisibility = () => {
    if (!coverPage) return;
    
    const coverBottom = coverPage.offsetTop + coverPage.clientHeight;
    const scrollPosition = window.pageYOffset;
    
    if (scrollPosition < coverBottom - 100) {
      // On cover page - hide navigation
      if (sideNav) sideNav.style.opacity = '0';
      if (mobileNav) mobileNav.style.opacity = '0';
    } else {
      // Past cover page - show navigation
      if (sideNav) sideNav.style.opacity = '1';
      if (mobileNav) mobileNav.style.opacity = '1';
    }
  };
  
  window.addEventListener('scroll', checkCoverVisibility);
  checkCoverVisibility();
  
  // ============ NAVIGATION ACTIVE STATE ============
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  // Update active navigation on scroll
  const updateActiveNav = () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === current) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();

  // ============ SMOOTH SCROLL ============
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ============ MOBILE MENU TOGGLE ============
  const mobileToggle = document.getElementById('mobileToggle');
  const sideNav = document.querySelector('.side-nav');
  
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      
      // Show/hide side nav on mobile
      if (window.innerWidth <= 768) {
        if (sideNav.style.display === 'flex') {
          sideNav.style.display = 'none';
        } else {
          sideNav.style.display = 'flex';
          sideNav.style.position = 'fixed';
          sideNav.style.zIndex = '999';
        }
      }
    });
  }

  // ============ SKILLS PROGRESS ANIMATION ============
  const skillsSection = document.getElementById('skills');
  const progressBars = document.querySelectorAll('.progress-bar');
  let skillsAnimated = false;

  const animateSkills = () => {
    if (skillsAnimated) return;
    
    const skillsSectionTop = skillsSection.offsetTop;
    const skillsSectionHeight = skillsSection.clientHeight;
    const scrollPosition = window.pageYOffset + window.innerHeight;

    if (scrollPosition > skillsSectionTop + 100) {
      progressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = progress + '%';
      });
      skillsAnimated = true;
    }
  };

  if (skillsSection) {
    window.addEventListener('scroll', animateSkills);
    animateSkills(); // Check on page load
  }

  // ============ INTERSECTION OBSERVER FOR ANIMATIONS ============
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe cards for animation
  const cards = document.querySelectorAll('.skill-card, .cert-card, .project-card-large, .timeline-item, .info-item');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
  });

  // ============ TYPING EFFECT FOR HERO TITLE ============
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.opacity = '1';
    
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };
    
    setTimeout(typeWriter, 500);
  }

  // ============ PARALLAX EFFECT FOR HERO IMAGE ============
  const heroImage = document.querySelector('.hero-image');
  if (heroImage) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.3;
      heroImage.style.transform = `translateY(${rate}px)`;
    });
  }

  // ============ CURSOR EFFECT (Optional) ============
  const createCursorEffect = () => {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
      width: 20px;
      height: 20px;
      border: 2px solid #667eea;
      border-radius: 50%;
      position: fixed;
      pointer-events: none;
      z-index: 9999;
      transition: all 0.1s ease;
      display: none;
    `;
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.display = 'block';
    });

    const animateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Expand cursor on hover over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .nav-link');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.width = '40px';
        cursor.style.height = '40px';
        cursor.style.backgroundColor = 'rgba(102, 126, 234, 0.2)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.backgroundColor = 'transparent';
      });
    });
  };

  // Uncomment to enable custom cursor (works best on desktop)
  // if (window.innerWidth > 768) {
  //   createCursorEffect();
  // }

  // ============ SCROLL TO TOP BUTTON ============
  const createScrollToTop = () => {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
      border-radius: 50%;
      color: white;
      font-size: 1.2rem;
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      z-index: 999;
      box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
    `;
    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 500) {
        scrollBtn.style.opacity = '1';
        scrollBtn.style.visibility = 'visible';
      } else {
        scrollBtn.style.opacity = '0';
        scrollBtn.style.visibility = 'hidden';
      }
    });

    scrollBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    scrollBtn.addEventListener('mouseenter', () => {
      scrollBtn.style.transform = 'translateY(-5px) scale(1.1)';
    });

    scrollBtn.addEventListener('mouseleave', () => {
      scrollBtn.style.transform = 'translateY(0) scale(1)';
    });
  };

  createScrollToTop();

  // ============ STATS COUNTER ANIMATION ============
  const stats = document.querySelectorAll('.stat-number');
  let statsAnimated = false;

  const animateStats = () => {
    if (statsAnimated) return;

    const heroSection = document.getElementById('hero');
    if (!heroSection) return;

    const heroBottom = heroSection.offsetTop + heroSection.clientHeight;
    const scrollPosition = window.pageYOffset + window.innerHeight;

    if (scrollPosition > heroBottom - 200) {
      stats.forEach(stat => {
        const target = parseFloat(stat.textContent);
        const increment = target / 50;
        let current = 0;

        const updateCounter = () => {
          current += increment;
          if (current < target) {
            stat.textContent = Math.floor(current * 10) / 10;
            setTimeout(updateCounter, 30);
          } else {
            stat.textContent = target;
          }
        };

        updateCounter();
      });
      statsAnimated = true;
    }
  };

  window.addEventListener('scroll', animateStats);
  animateStats();

  // ============ DYNAMIC YEAR IN FOOTER ============
  const footerYear = document.querySelector('.footer-content p');
  if (footerYear) {
    const currentYear = new Date().getFullYear();
    footerYear.textContent = footerYear.textContent.replace('2025', currentYear);
  }

  // ============ CONSOLE MESSAGE ============
  console.log('%c Portfolio Loaded Successfully! ', 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 10px 20px; border-radius: 5px; font-size: 16px; font-weight: bold;');
  console.log('%c Designed & Developed by Sumit Kumar ', 'color: #667eea; font-size: 12px; font-weight: bold;');
  
});

// ============ PERFORMANCE OPTIMIZATION ============
// Throttle function for scroll events
function throttle(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply throttle to scroll events if needed
window.addEventListener('scroll', throttle(() => {
  // Additional scroll-based animations can go here
}, 100));
