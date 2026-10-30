const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");

const authModal = document.getElementById("authModal");
const modalClose = document.getElementById("modalClose");

const authTitle = document.getElementById("authTitle");
const authDescription = document.getElementById("authDescription");
const authSubmit = document.getElementById("authSubmit");
const authSwitch = document.getElementById("authSwitch");
const switchText = document.getElementById("switchText");

const authForm = document.getElementById("authForm");
const authPassword = document.getElementById("authPassword");
const togglePassword = document.getElementById("togglePassword");
const toast = document.getElementById("toast");

let authMode = "login";
let toastTimer;

// MOBILE MENU

menuToggle.addEventListener("click", () => {
  const isOpen = mobileNav.classList.toggle("open");

  menuToggle.classList.toggle("active", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

function closeMobileMenu() {
  mobileNav.classList.remove("open");
  menuToggle.classList.remove("active");
  menuToggle.setAttribute("aria-expanded", "false");
}

document.querySelectorAll("#mobileNav a").forEach(link => {
  link.addEventListener("click", closeMobileMenu);
});

// TOAST NOTIFICATIONS

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// AUTH MODAL

function openAuth(mode) {
  authMode = mode;
  updateAuthModal();

  closeMobileMenu();

  authModal.classList.add("active");
  authModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  setTimeout(() => {
    document.getElementById("authEmail").focus();
  }, 200);
}

function closeAuth() {
  authModal.classList.remove("active");
  authModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function updateAuthModal() {
  if (authMode === "signup") {
    authTitle.textContent = "Create your account.";
    authDescription.textContent =
      "Start understanding how AI sees your brand.";
    authSubmit.textContent = "Create account ↗";
    switchText.textContent = "Already have an account?";
    authSwitch.textContent = "Log in";
  } else {
    authTitle.textContent = "Welcome back.";
    authDescription.textContent =
      "Your brand's next chapter starts here.";
    authSubmit.textContent = "Log in ↗";
    switchText.textContent = "New to MENTION?";
    authSwitch.textContent = "Create an account";
  }

  authPassword.value = "";
}

document.querySelectorAll("[data-auth]").forEach(button => {
  button.addEventListener("click", () => {
    openAuth(button.dataset.auth);
  });
});

modalClose.addEventListener("click", closeAuth);

authModal.addEventListener("click", event => {
  if (event.target === authModal) {
    closeAuth();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeAuth();
    closeMobileMenu();
  }
});

// SWITCH LOGIN AND SIGNUP

authSwitch.addEventListener("click", () => {
  authMode = authMode === "login" ? "signup" : "login";
  updateAuthModal();
});

// PASSWORD VISIBILITY

togglePassword.addEventListener("click", () => {
  const isPassword = authPassword.type === "password";

  authPassword.type = isPassword ? "text" : "password";
  togglePassword.textContent = isPassword ? "Hide" : "Show";
});

// FRONTEND DEMO AUTHENTICATION

authForm.addEventListener("submit", event => {
  event.preventDefault();

  const email = document.getElementById("authEmail").value.trim();
  const password = authPassword.value;

  if (!email || password.length < 8) {
    showToast("Please enter valid account details.");
    return;
  }

  showToast(
    authMode === "signup"
      ? "Signup interface ready. Real authentication is coming next."
      : "Login interface ready. Connect Supabase in the next phase."
  );

  closeAuth();
  authForm.reset();
  togglePassword.textContent = "Show";
});

// SIMPLE REVEAL ANIMATIONS

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
