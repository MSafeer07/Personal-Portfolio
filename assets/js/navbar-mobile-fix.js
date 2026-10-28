// Mobile Navbar Fix - Simplified approach to prevent issues
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    // Only apply fixes on mobile devices
    function isMobile() {
        return window.innerWidth <= 767;
    }
    
    // Force consistent styling immediately
    function applyMobileStyles() {
        if (isMobile()) {
            // Force dark background
            navbar.style.setProperty('background-color', '#000', 'important');
            navbar.style.setProperty('background', '#000', 'important');
            
            if (navbarCollapse) {
                navbarCollapse.style.setProperty('background-color', '#000', 'important');
                navbarCollapse.style.setProperty('background', '#000', 'important');
                navbarCollapse.style.setProperty('text-align', 'center', 'important');
            }
        }
    }
    
    // Apply styles immediately
    applyMobileStyles();
    
    // Override Bootstrap's navbar toggle on mobile but keep hamburger animation
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function(e) {
            if (isMobile()) {
                e.preventDefault();
                e.stopPropagation();
                
                // Toggle the dropdown without Bootstrap animations
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                    navbarCollapse.style.display = 'none';
                    // Update hamburger animation state
                    navbarToggler.setAttribute('aria-expanded', 'false');
                } else {
                    navbarCollapse.classList.add('show');
                    navbarCollapse.style.display = 'block';
                    applyMobileStyles();
                    // Update hamburger animation state
                    navbarToggler.setAttribute('aria-expanded', 'true');
                }
            }
        });
    }
    
    // Handle nav link clicks - navigate but don't close dropdown
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            if (isMobile()) {
                // Navigate to the section
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
                // Don't close the dropdown - let user close it manually
            }
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        applyMobileStyles();
    });
    
    // Add comprehensive CSS override
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 767px) {
            /* Force navbar styling */
            .navbar,
            .navbar.bg-faded,
            .navbar-light.bg-faded {
                background-color: #000 !important;
                background: #000 !important;
                transition: none !important;
            }
            
            /* Force collapse styling - no animations */
            .navbar-collapse {
                background-color: #000 !important;
                background: #000 !important;
                text-align: center !important;
                transition: none !important;
                transform: none !important;
            }
            
            .navbar-collapse.collapsing {
                background-color: #000 !important;
                background: #000 !important;
                text-align: center !important;
                transition: none !important;
                transform: none !important;
                height: auto !important;
                overflow: visible !important;
            }
            
            .navbar-collapse.show {
                background-color: #000 !important;
                background: #000 !important;
                text-align: center !important;
            }
            
            /* Force nav items center alignment */
            .navbar-nav {
                text-align: center !important;
                width: 100% !important;
                background-color: #000 !important;
                background: #000 !important;
            }
            
            .navbar-nav .nav-item {
                width: 100% !important;
                text-align: center !important;
            }
            
            .navbar-nav .nav-link {
                text-align: center !important;
                width: 100% !important;
                color: #fff !important;
                padding: 12px 0 !important;
            }
            
            .navbar-nav .nav-link:hover,
            .navbar-nav .nav-link:focus {
                color: #ffff00 !important;
            }
            
            /* Disable all Bootstrap collapse animations */
            .navbar-collapse.collapsing {
                transition: none !important;
                -webkit-transition: none !important;
                -moz-transition: none !important;
                -o-transition: none !important;
            }
        }
    `;
    document.head.appendChild(style);
});
