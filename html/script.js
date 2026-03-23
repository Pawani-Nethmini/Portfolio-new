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

const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");

if (contactForm && formStatus) {
  const submitButton = contactForm.querySelector(".submit-btn");
  const submittedAtField = document.querySelector("#submittedAt");

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const endpoint = contactForm.dataset.sheetUrl;

    if (!endpoint || endpoint === "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE") {
      formStatus.textContent = "Paste your Google Apps Script web app URL into the form to collect responses.";
      formStatus.className = "form-status error";
      return;
    }

    submittedAtField.value = new Date().toISOString();

    const formData = new FormData(contactForm);
    const payload = Object.fromEntries(formData.entries());
    payload.consent = contactForm.querySelector("#consent").checked ? "Yes" : "No";

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    formStatus.textContent = "Submitting your details...";
    formStatus.className = "form-status";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      contactForm.reset();
      formStatus.textContent = "Thanks! Your details were sent successfully.";
      formStatus.className = "form-status success";
    } catch (error) {
      formStatus.textContent = "Sorry, something went wrong. Please try again.";
      formStatus.className = "form-status error";
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Send Message";
    }
  });
}
