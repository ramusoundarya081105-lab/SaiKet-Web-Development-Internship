document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    document.getElementById("formMessage").textContent =
      "Message sent successfully!";

    this.reset();
  });
