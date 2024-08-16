document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const backToTopBtn = document.getElementById('backToTopBtn');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const projectsSection = document.getElementById('projects');

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
        const scrollTop = window.pageYOffset;
        
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
            backToTopBtn.style.display = 'block';
        } else {
            navbar.classList.remove('scrolled');
            backToTopBtn.style.display = 'none';
        }
        
        // Change navbar background color dynamically based on scroll position
        if (scrollTop > 300) {
            navbar.style.backgroundColor = 'rgba(21, 21, 21, 0.95)';
        } else {
            navbar.style.backgroundColor = '';
        }
    };

    // Back to top button functionality
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Dark mode toggle functionality
    darkModeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        updateLocalStorageForDarkMode();
    });

    // Set dark mode based on local storage
    function setDarkModeFromLocalStorage() {
        const isDarkMode = localStorage.getItem('dark-mode') === 'true';
        if (isDarkMode) {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
    }

    function updateLocalStorageForDarkMode() {
        const isDarkMode = body.classList.contains('dark-mode');
        localStorage.setItem('dark-mode', isDarkMode);
    }

    // Initialize dark mode setting
    setDarkModeFromLocalStorage();

    // Fetch and display GitHub projects
    fetch('https://api.github.com/users/hasnocool/repos')
        .then(response => response.json())
        .then(data => {
            displayProjects(data);
        })
        .catch(error => {
            console.error('Error fetching GitHub projects:', error);
        });

    function displayProjects(repos) {
        repos.forEach(repo => {
            const repoItem = document.createElement('div');
            repoItem.classList.add('masonry-item');
            repoItem.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description || 'No description available.'}</p>
                <a href="${repo.html_url}" target="_blank">View Repository</a>
            `;
            projectsSection.appendChild(repoItem);
        });
    }

    // Masonry layout update on window resize
    const masonry = document.getElementById('projects');
    function updateMasonryLayout() {
        masonry.style.columnCount = Math.floor(window.innerWidth / 300);
    }

    window.addEventListener('resize', updateMasonryLayout);
    updateMasonryLayout(); // Initial call
});
