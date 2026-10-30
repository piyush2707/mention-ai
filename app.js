// MENTION — Functional website navigation

const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");

function closeMobileMenu() {
  if (!mobileNav || !menuToggle) return;

  mobileNav.classList.remove("open");
  menuToggle.classList.remove("active");
  menuToggle.setAttribute("aria-expanded", "false");
}

// Mobile menu
if (menuToggle && mobileNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("open");

    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

// Close menu after choosing a section
document.querySelectorAll("#mobileNav a").forEach(link => {
  link.addEventListener("click", closeMobileMenu);
});

// Replace unfinished login with direct scanner access
document.querySelectorAll('[data-auth="login"]').forEach(button => {
  button.textContent = "Try scanner";
});

// All Get Started, login and visibility buttons
// now open the actual website scanner
document.querySelectorAll("[data-auth]").forEach(button => {
  button.addEventListener("click", () => {
    closeMobileMenu();
    window.location.href = "./scanner.html";
  });
});

// Close mobile menu with Escape
document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeMobileMenu();
  }
});

// Reveal animations
const revealElements = document.querySelectorAll(
  ".feature-card, .step, .pricing-card, .platform-card"
);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  revealElements.forEach(element => {
    element.classList.add("reveal");
    observer.observe(element);
  });
}
