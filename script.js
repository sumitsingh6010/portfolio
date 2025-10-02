// Bubble Animation (kept same)
const bubbleContainer = document.querySelector('.bubble-text');
const text = "Hi, I'm Sumit Kumar";
bubbleContainer.innerHTML = '';
text.split('').forEach((char, index) => {
  const span = document.createElement('span');
  span.textContent = char;
  span.style.animationDelay = `${index * 0.1}s`;
  bubbleContainer.appendChild(span);
});

// Theme Toggle
const toggleBtn = document.createElement("button");
toggleBtn.classList.add("theme-toggle");
toggleBtn.innerHTML = "☀️";
document.body.appendChild(toggleBtn);

let darkMode = true;
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  darkMode = !darkMode;
  toggleBtn.innerHTML = darkMode ? "☀️" : "🌙";
});

// Scroll Reveal
const revealElements = document.querySelectorAll("section, .exp-card, .project-card, .contact-btn");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
      entry.target.style.transition = "all 1s ease";
    }
  });
});
revealElements.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = "translateY(40px)";
  observer.observe(el);
});

// Magnetic Hover for Buttons
document.querySelectorAll(".contact-btn").forEach(btn => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
  });
  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0,0) scale(1)";
  });
});
