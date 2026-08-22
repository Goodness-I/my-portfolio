// Select the mobile menu, nav links, and scroll-to-top button
const navToggle = document.querySelector(".nav-toggle");
const navClose = document.querySelector(".nav-close");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const scrollTopButton = document.getElementById("scroll-top");

const contactForm = document.querySelector(".contact-form");
const contactName = document.getElementById("name");
const contactEmail = document.getElementById("email");
const contactMessage = document.getElementById("message");
const formMessage = document.getElementById("form-message");

// Switch the nav button between the hamburger icon and the close icon
function setNavToggleState(isOpen) {
  if (!navToggle) return;
  navToggle.classList.toggle("active", isOpen);
  navToggle.textContent = isOpen ? "✕" : "=";
  navToggle.setAttribute("aria-expanded", String(isOpen));
}

function openMobileNav() {
  if (!navLinks) return;
  navLinks.classList.add("active");
  setNavToggleState(true);
}

function closeMobileNav() {
  if (!navLinks) return;
  navLinks.classList.remove("active");
  setNavToggleState(false);
}

function toggleMobileNav() {
  if (!navLinks) return;
  const isOpen = navLinks.classList.toggle("active");
  setNavToggleState(isOpen);
}

// Highlight the active nav link while the page scrolls through sections
function highlightCurrentSection() {
  const scrollPosition = window.scrollY + 130;

  navItems.forEach((link) => {
    const targetSection = document.querySelector(link.hash);
    if (!targetSection) return;

    const sectionTop = targetSection.offsetTop;
    const sectionBottom = sectionTop + targetSection.offsetHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// Validate the contact form before it is submitted
function validateContactForm(event) {
  event.preventDefault();

  let isValid = true;

  contactName.setCustomValidity("");
  contactEmail.setCustomValidity("");
  contactMessage.setCustomValidity("");

  if (!contactName.value.trim()) {
    contactName.setCustomValidity("Please enter your name.");
    isValid = false;
  }

  if (!contactEmail.checkValidity()) {
    contactEmail.setCustomValidity("Please enter a valid email address.");
    isValid = false;
  }

  if (!contactMessage.value.trim()) {
    contactMessage.setCustomValidity("Please enter your message.");
    isValid = false;
  }

  if (!isValid) {
    contactForm.reportValidity();
    if (formMessage) {
      formMessage.textContent = "";
      formMessage.className = "form-message";
    }
    return;
  }

  if (formMessage) {
    formMessage.textContent = "Thanks! Your message has been sent.";
    formMessage.className = "form-message success";
  }

  contactForm.reset();
}

// Show or hide the scroll-to-top button based on how far the page is scrolled
function updateScrollTopVisibility() {
  if (!scrollTopButton) return;
  scrollTopButton.classList.toggle("visible", window.scrollY > 300);
}

// Smoothly scroll back to the top of the page
function scrollPageToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Attach event listeners for the mobile menu and page scroll behavior
if (navToggle) {
  navToggle.addEventListener("click", toggleMobileNav);
}

if (navClose) {
  navClose.addEventListener("click", closeMobileNav);
}

navItems.forEach((link) => {
  link.addEventListener("click", () => {
    closeMobileNav();
  });
});

window.addEventListener("scroll", () => {
  highlightCurrentSection();
  updateScrollTopVisibility();
});

window.addEventListener("load", () => {
  highlightCurrentSection();
  updateScrollTopVisibility();
  setNavToggleState(false);
});

if (contactForm) {
  contactForm.addEventListener("submit", validateContactForm);
}

if (scrollTopButton) {
  scrollTopButton.addEventListener("click", scrollPageToTop);
}
