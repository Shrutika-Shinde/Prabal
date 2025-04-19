// index.js

// Example: basic animation on load
document.addEventListener("DOMContentLoaded", () => {
    const formContainer = document.querySelector(".form-container");

    // Smooth fade-in effect
    formContainer.style.opacity = 0;
    formContainer.style.transition = "opacity 1s ease-in-out";
    setTimeout(() => {
        formContainer.style.opacity = 1;
    }, 100);
});

// Optional: Scroll to top on page refresh
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};
