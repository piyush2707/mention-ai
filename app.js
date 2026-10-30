
// MENTION — Authentication + Website Navigation

(() => {
  const menuToggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");

  const modal = document.getElementById("authModal");
  const closeButton = document.getElementById("modalClose");
  const form = document.getElementById("authForm");
  const emailInput = document.getElementById("authEmail");
  const passwordInput = document.getElementById("authPassword");
  const title = document.getElementById("authTitle");
  const description = document.getElementById("authDescription");
  const submitButton = document.getElementById("authSubmit");
  const switchButton = document.getElementById("authSwitch");
  const switchText = document.getElementById("switchText");
  const togglePassword = document.getElementById("togglePassword");
  const toast = document.getElementById("toast");

  let client = null;
  let session = null;
  let mode = "login";

  function showToast(message) {
    if (!toast) {
      alert(message);
      return;
    }

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => toast.classList.remove("show"), 4000);
  }

  function closeMenu() {
    if (!menuToggle || !mobileNav) return;

    mobileNav.classList.remove("open");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  }

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
      const open = mobileNav.classList.toggle("open");
      menuToggle.classList.toggle("active", open);
      menuToggle.setAttribute("aria-expanded", String(open));
    });
  }

  document.querySelectorAll("#mobileNav a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const existing = document.querySelector(
        `script[src="${src}"]`
      );

      if (existing) {
        existing.addEventListener("load", resolve, { once: true });
        existing.addEventListener("error", reject, { once: true });

        if (src.includes("supabase-js") && window.supabase) {
          resolve();
        } else if (
          src.includes("supabase-config") &&
          window.MENTION_SUPABASE_URL
        ) {
          resolve();
        }

        return;
      }

      const script = document.createElement("script");
      script.src = src;
      script.onload = resolve;
      script.onerror = () => reject(
        new Error("Could not load the authentication service.")
      );

      document.head.appendChild(script);
    });
  }

  async function initializeSupabase() {
    if (!window.MENTION_SUPABASE_URL ||
        !window.MENTION_SUPABASE_KEY) {
      await loadScript("./supabase-config.js");
    }

    if (!window.supabase?.createClient) {
      await loadScript(
        "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"
      );
    }

    if (!window.MENTION_SUPABASE_URL ||
        !window.MENTION_SUPABASE_KEY ||
        !window.supabase?.createClient) {
      throw new Error("Supabase configuration is missing.");
    }

    if (client) return client;

    client = window.supabase.createClient(
      window.MENTION_SUPABASE_URL,
      window.MENTION_SUPABASE_KEY
    );

    const result = await client.auth.getSession();
    session = result.data.session;

    client.auth.onAuthStateChange((event, newSession) => {
      session = newSession;
      updateButtons();
    });

    updateButtons();
    return client;
  }

  function updateButtons() {
    document.querySelectorAll('[data-auth="login"]').forEach(button => {
      button.textContent = session ? "Log out" : "Log in";
    });

    document.querySelectorAll('[data-auth="signup"]').forEach(button => {
      button.textContent = session
        ? "Open scanner ↗"
        : "Get started ↗";
    });
  }

  function openModal(selectedMode) {
    mode = selectedMode;

    if (!modal) return;

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");

    if (mode === "signup") {
      title.textContent = "Create your account.";
      description.textContent =
        "Start your MENTION journey.";
      submitButton.textContent = "Create account ↗";
      switchText.textContent = "Already have an account?";
      switchButton.textContent = "Log in";
    } else {
      title.textContent = "Welcome back.";
      description.textContent =
        "Your brand's next chapter starts here.";
      submitButton.textContent = "Log in ↗";
      switchText.textContent = "New to MENTION?";
      switchButton.textContent = "Create an account";
    }

    passwordInput.value = "";
  }

  function closeModal() {
    if (!modal) return;

    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
  }

  document.querySelectorAll("[data-auth]").forEach(button => {
    button.addEventListener("click", async () => {
      closeMenu();

      try {
        await initializeSupabase();

        if (button.dataset.auth === "login" && session) {
          const { error } = await client.auth.signOut();

          if (error) throw error;

          session = null;
          updateButtons();
          showToast("You have logged out.");
          return;
        }

        if (session) {
          window.location.href = "./scanner.html";
          return;
        }

        openModal(button.dataset.auth === "signup"
          ? "signup"
          : "login");

      } catch (error) {
        showToast(error.message);
      }
    });
  });

  if (closeButton) {
    closeButton.addEventListener("click", closeModal);
  }

  if (modal) {
    modal.addEventListener("click", event => {
      if (event.target === modal) closeModal();
    });
  }

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeModal();
      closeMenu();
    }
  });

  if (switchButton) {
    switchButton.addEventListener("click", () => {
      openModal(mode === "login" ? "signup" : "login");
    });
  }

  if (togglePassword) {
    togglePassword.addEventListener("click", () => {
      const visible = passwordInput.type === "password";
      passwordInput.type = visible ? "text" : "password";
      togglePassword.textContent = visible ? "Hide" : "Show";
    });
  }

  if (form) {
    form.addEventListener("submit", async event => {
      event.preventDefault();

      const email = emailInput.value.trim();
      const password = passwordInput.value;

      submitButton.disabled = true;
      submitButton.textContent = "Please wait...";

      try {
        await initializeSupabase();

        if (mode === "signup") {
          const { data, error } = await client.auth.signUp({
            email,
            password,
            options: {
              emailRedirectTo:
                window.location.origin + "/mention-ai/"
            }
          });

          if (error) throw error;

          session = data.session;
          updateButtons();

          if (session) {
            closeModal();
            showToast("Your account was created!");
          } else {
            description.textContent =
              "Account created. Please check your email to verify it.";
            showToast("Check your email for the verification link.");
          }

        } else {
          const { data, error } =
            await client.auth.signInWithPassword({
              email,
              password
            });

          if (error) throw error;

          session = data.session;
          updateButtons();
          closeModal();
          showToast("Login successful!");

          setTimeout(() => {
            window.location.href = "./scanner.html";
          }, 1000);
        }

      } catch (error) {
        showToast(error.message || "Authentication failed.");
      } finally {
        submitButton.disabled = false;
        submitButton.textContent =
          mode === "signup" ? "Create account ↗" : "Log in ↗";
      }
    });
  }

  initializeSupabase().catch(error => {
    console.error("MENTION authentication:", error);
  });

  // Reveal animations
  const elements = document.querySelectorAll(
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
    }, { threshold: 0.12 });

    elements.forEach(element => {
      element.classList.add("reveal");
      observer.observe(element);
    });
  }
})();
