document.addEventListener("DOMContentLoaded", function() {
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for fixed header height
                    behavior: "smooth"
                });
            }
            // Close mobile menu if open
            if (document.querySelector(".nav-links").classList.contains("active")) {
                document.querySelector(".nav-links").classList.remove("active");
            }
        });
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav-links");

    if (menuToggle && nav) {
        menuToggle.addEventListener("click", () => {
            nav.classList.toggle("active");
        });
    }

    // Basic form validation (optional - can be expanded)
    const contactForm = document.querySelector(".contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            const name = document.getElementById("nome").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("mensagem").value.trim();

            if (!name || !email || !message) {
                e.preventDefault(); // Prevent submission
                alert("Por favor, preencha todos os campos obrigatórios (Nome, E-mail, Mensagem).");
            } else if (!isValidEmail(email)) {
                e.preventDefault(); // Prevent submission
                alert("Por favor, insira um endereço de e-mail válido.");
            }
            // If validation passes, the form will submit as usual (or an AJAX request could be made here)
        });
    }

    function isValidEmail(email) {
        // Basic email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
