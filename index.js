document.addEventListener('DOMContentLoaded', () => {
    // Handle navigation active state
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            link.classList.add('active');
        });
    });

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchSuggestions = document.getElementById('searchSuggestions');
    const filterButtons = document.querySelectorAll('.filter-button');
    let currentFilter = 'all';
    let searchTimeout;

    // Sample data for search suggestions
    const searchData = {
        courses: [
            { title: 'Web Development Basics', category: 'courses', icon: 'fa-code', link: 'courses.html' },
            { title: 'Digital Marketing Fundamentals', category: 'courses', icon: 'fa-bullhorn', link: 'courses.html' },
            { title: 'Leadership Skills', category: 'courses', icon: 'fa-users', link: 'courses.html' }
        ],
        resources: [
            { title: 'Career Development Guide', category: 'resources', icon: 'fa-book' },
            { title: 'Networking Tips', category: 'resources', icon: 'fa-network-wired' },
            { title: 'Resume Writing Workshop', category: 'resources', icon: 'fa-file-alt' }
        ],
        events: [
            { title: 'Women in Tech Conference', category: 'events', icon: 'fa-calendar' },
            { title: 'Mentorship Program', category: 'events', icon: 'fa-handshake' },
            { title: 'Career Fair', category: 'events', icon: 'fa-briefcase' }
        ]
    };

    // Function to show loading state
    function showLoading() {
        const loading = document.createElement('div');
        loading.className = 'search-loading active';
        searchButton.parentNode.insertBefore(loading, searchButton);
        searchButton.style.display = 'none';
    }

    // Function to hide loading state
    function hideLoading() {
        const loading = document.querySelector('.search-loading');
        if (loading) {
            loading.remove();
        }
        searchButton.style.display = 'block';
    }

    // Function to update search suggestions
    function updateSuggestions(query) {
        searchSuggestions.innerHTML = '';
        
        if (!query) {
            searchSuggestions.classList.remove('active');
            return;
        }

        const results = [];
        if (currentFilter === 'all' || currentFilter === 'courses') {
            results.push(...searchData.courses);
        }
        if (currentFilter === 'all' || currentFilter === 'resources') {
            results.push(...searchData.resources);
        }
        if (currentFilter === 'all' || currentFilter === 'events') {
            results.push(...searchData.events);
        }

        const filteredResults = results.filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase())
        );

        if (filteredResults.length > 0) {
            filteredResults.forEach(item => {
                const suggestion = document.createElement('div');
                suggestion.className = 'suggestion-item';
                suggestion.innerHTML = `
                    <i class="fas ${item.icon}"></i>
                    <span class="suggestion-text">${item.title}</span>
                    <span class="suggestion-category">${item.category}</span>
                `;
                suggestion.addEventListener('click', () => {
                    if (item.link) {
                        window.location.href = item.link;
                    } else {
                        searchInput.value = item.title;
                        searchSuggestions.classList.remove('active');
                    }
                });
                searchSuggestions.appendChild(suggestion);
            });
            searchSuggestions.classList.add('active');
        } else {
            searchSuggestions.classList.remove('active');
        }
    }

    // Event listeners for search input
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const query = e.target.value;
        
        showLoading();
        
        searchTimeout = setTimeout(() => {
            updateSuggestions(query);
            hideLoading();
        }, 500);
    });

    // Event listener for search button
    searchButton.addEventListener('click', () => {
        const query = searchInput.value;
        window.location.href = `courses.html?search=${encodeURIComponent(query)}`;
    });

    // Event listeners for filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentFilter = button.dataset.filter;
            
            if (searchInput.value) {
                updateSuggestions(searchInput.value);
            }
        });
    });

    // Close suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
            searchSuggestions.classList.remove('active');
        }
    });

    // Handle keyboard navigation
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value;
            window.location.href = `courses.html?search=${encodeURIComponent(query)}`;
        }
    });

    // Check for search query in URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    if (searchQuery) {
        searchInput.value = searchQuery;
        window.location.href = `courses.html?search=${encodeURIComponent(searchQuery)}`;
    }
});
