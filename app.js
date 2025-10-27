// ============ JAVASCRIPT CODE ============

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Get navigation elements
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navMenu = document.querySelector(".nav-menu");

  // Scroll effect for navbar
  function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  // Smooth scrolling for navigation links
  function smoothScroll(e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }

    // Close mobile menu if open
    if (navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
      mobileMenuBtn.classList.remove("active");
    }
  }

  // Mobile menu toggle
  function toggleMobileMenu() {
    navMenu.classList.toggle("active");
    mobileMenuBtn.classList.toggle("active");
  }

  // Add hover effects to navigation items
  function addHoverEffect() {
    this.style.transform = "translateY(-2px)";
    this.style.color = "#667eea";
  }

  function removeHoverEffect() {
    this.style.transform = "translateY(0)";
    this.style.color = "";
  }

  // Intersection Observer for active link highlighting
  function highlightActiveSection() {
    const sections = document.querySelectorAll("section[id]");
    const options = {
      threshold: 0.3,
      rootMargin: "-80px 0px -50% 0px",
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        const navLink = document.querySelector(`a[href="#${entry.target.id}"]`);

        if (entry.isIntersecting) {
          // Remove active class from all nav links
          navLinks.forEach((link) => link.classList.remove("active"));
          // Add active class to current section's nav link
          if (navLink) {
            navLink.classList.add("active");
          }
        }
      });
    }, options);

    sections.forEach((section) => {
      observer.observe(section);
    });
  }

  // Parallax effect for hero section
  function parallaxEffect() {
    const hero = document.querySelector(".hero");
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    if (hero) {
      hero.style.transform = `translateY(${rate}px)`;
    }
  }

  // Throttle function to improve performance
  function throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  // Animation on scroll for elements
  function animateOnScroll() {
    const animatedElements = document.querySelectorAll(".animate-on-scroll");

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    animatedElements.forEach((element) => {
      observer.observe(element);
    });
  }

  // Color change animation for navbar background
  function colorTransition() {
    const colors = [
      "rgba(15, 23, 42, 0.95)",
      "rgba(30, 41, 59, 0.95)",
      "rgba(51, 65, 85, 0.95)",
      "rgba(71, 85, 105, 0.95)",
    ];

    let colorIndex = 0;
    const scrollTop = window.pageYOffset;

    if (scrollTop > 100) {
      colorIndex = Math.min(Math.floor(scrollTop / 200), colors.length - 1);
      navbar.style.background = colors[colorIndex];
    }
  }

  // Add ripple effect to navigation links
  function createRipple(e) {
    const button = e.currentTarget;
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  // Event listeners
  window.addEventListener(
    "scroll",
    throttle(function () {
      handleScroll();
      parallaxEffect();
      colorTransition();
    }, 16)
  );

  // Add click event listeners to navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", smoothScroll);
    link.addEventListener("mouseenter", addHoverEffect);
    link.addEventListener("mouseleave", removeHoverEffect);
    link.addEventListener("click", createRipple);
  });

  // Mobile menu event listener
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", toggleMobileMenu);
  }

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (e) {
    if (!navbar.contains(e.target) && navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
      mobileMenuBtn.classList.remove("active");
    }
  });

  // Initialize functions
  highlightActiveSection();
  animateOnScroll();

  // Resize event listener for responsive behavior
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768 && navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
      mobileMenuBtn.classList.remove("active");
    }
  });

  // Add loading animation
  window.addEventListener("load", function () {
    document.body.classList.add("loaded");

    // Animate navigation items on load
    navLinks.forEach((link, index) => {
      setTimeout(() => {
        link.style.opacity = "1";
        link.style.transform = "translateY(0)";
      }, index * 100);
    });
  });

  // Keyboard navigation support
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
      mobileMenuBtn.classList.remove("active");
    }
  });

  // Advanced scroll effects
  let lastScrollTop = 0;
  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Hide/show navbar on scroll direction
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      navbar.style.transform = "translateY(-100%)";
    } else {
      // Scrolling up
      navbar.style.transform = "translateY(0)";
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });

  // Add smooth hover animations to logo
  const logo = document.querySelector(".logo");
  if (logo) {
    logo.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.1) rotate(5deg)";
    });

    logo.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1) rotate(0deg)";
    });
  }
});

// CSS-in-JS for ripple effect styles
const rippleStyles = `
.nav-link {
    position: relative;
    overflow: hidden;
}

.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

// Inject ripple styles
const styleSheet = document.createElement("style");
styleSheet.textContent = rippleStyles;
document.head.appendChild(styleSheet);
