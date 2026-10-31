const menuButton = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => navLinks.classList.toggle("open"));
}
document.querySelectorAll(".nav-links a").forEach(link => {
  if (link.pathname === window.location.pathname) link.classList.add("active");
});
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const contactForm = document.querySelector("#contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", async event => {
    event.preventDefault();
    const status = document.querySelector("#formStatus");
    const submit = contactForm.querySelector("button[type='submit']");
    status.textContent = "Message send ho raha hai...";
    submit.disabled = true;
    try {
      const formData = Object.fromEntries(new FormData(contactForm).entries());
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      status.textContent = result.message;
      if (response.ok) contactForm.reset();
    } catch (error) {
      status.textContent = "Server se rabta nahi ho saka. Server start karke dobara try karein.";
    } finally {
      submit.disabled = false;
    }
  });
}
