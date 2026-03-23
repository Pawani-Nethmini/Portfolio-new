const reveals = document.querySelectorAll(".reveal");

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      io.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12
});

reveals.forEach((element) => io.observe(element));

document.querySelectorAll("#home .reveal").forEach((element) => {
  element.classList.add("visible");
  io.unobserve(element);
});
