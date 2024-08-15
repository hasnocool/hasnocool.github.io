document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const backToTopBtn = document.getElementById('backToTopBtn');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Sticky navbar effect
    window.onscroll = function() {
        if (window.pageYOffset > 100) {
            navbar.classList.add('scrolled');
            backToTopBtn.style.display = 'block';
        } else {
            navbar.classList.remove('scrolled');
            backToTopBtn.style.display = 'none';
        }
    };

    // Back to top button functionality
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Dark mode toggle functionality
    darkModeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
    });

    // Scroll animations for content sections
    const contentSections = document.querySelectorAll('.content-section');

    const observerOptions = {
        threshold: 0.1,
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    contentSections.forEach(section => {
        observer.observe(section);
    });
});
