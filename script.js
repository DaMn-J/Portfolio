
const themeToggle = document.getElementById("themeToggle");

function applyTheme(isDark) {
  document.body.classList.toggle("dark", isDark);
  themeToggle.textContent = isDark ? "☀️" : "🌙";
}

applyTheme(localStorage.getItem("theme") === "dark");

themeToggle.addEventListener("click", function () {
  const isDark = !document.body.classList.contains("dark");
  applyTheme(isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.classList.remove("open");
  });
});

const sections = document.querySelectorAll("section");
const links = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", function () {
  let current = "home";
  sections.forEach(function (section) {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.id;
    }
  });
  links.forEach(function (link) {
    link.classList.toggle("active", link.getAttribute("href") === "#" + current);
  });
});

const skillsSection = document.getElementById("skills");
let barsFilled = false;

function fillBars() {
  if (barsFilled) return;
  const top = skillsSection.getBoundingClientRect().top;
  if (top < window.innerHeight - 100) {
    document.querySelectorAll(".fill").forEach(function (bar) {
      bar.style.width = bar.dataset.level + "%";
    });
    barsFilled = true;
  }
}

window.addEventListener("scroll", fillBars);
fillBars();

const form = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const successMsg = document.getElementById("formSuccess");

function showError(input, errorId, text) {
  document.getElementById(errorId).textContent = text;
  input.classList.toggle("invalid", text !== "");
}

form.addEventListener("submit", function (event) {
  event.preventDefault(); 
  successMsg.textContent = "";

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let valid = true;

  if (name.length < 2) {
    showError(nameInput, "nameError", "Please enter your name (at least 2 letters).");
    valid = false;
  } else {
    showError(nameInput, "nameError", "");
  }

  if (!emailPattern.test(email)) {
    showError(emailInput, "emailError", "Please enter a valid email address.");
    valid = false;
  } else {
    showError(emailInput, "emailError", "");
  }

  if (message.length < 10) {
    showError(messageInput, "messageError", "Message must be at least 10 characters.");
    valid = false;
  } else {
    showError(messageInput, "messageError", "");
  }

  if (valid) {
    successMsg.textContent = "Thank you, " + name + "! Your message has been sent.";
    form.reset();
  }
});
