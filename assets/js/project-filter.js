// Enhanced Project Filtering with Screen Jump Prevention
$(document).ready(function() {
    
    const $container = $('#projects-container');
    const $filters = $('.category-btn');
    const $projects = $('#projects-container [data-category]');
    
    // Store the initial container height to prevent jumping
    let containerHeight = $container.height();
    
    // Function to stabilize container height
    function stabilizeContainer() {
        const currentHeight = $container.height();
        if (currentHeight > 0) {
            containerHeight = Math.max(containerHeight, currentHeight);
            $container.css('min-height', containerHeight + 'px');
        }
    }
    
    // Initialize container height
    setTimeout(stabilizeContainer, 100);
    
    // Filter functionality with improved transitions
    $filters.click(function(e) {
        e.preventDefault();
        
        // Store scroll position to prevent jumping
        const scrollTop = $(window).scrollTop();
        
        // Remove active class from all filters
        $filters.removeClass('active');
        
        // Add active class to clicked filter
        $(this).addClass('active');
        
        const category = $(this).attr('aria-label');
        
        // Stabilize height before filtering
        stabilizeContainer();
        
        // Enhanced show/hide with better transitions
        if (category === 'all') {
            $projects.each(function(index) {
                const $project = $(this);
                setTimeout(function() {
                    $project.fadeIn(200);
                }, index * 50); // Stagger the animations
            });
        } else {
            // Hide non-matching projects first
            $projects.not(`[data-category="${category}"]`).fadeOut(150);
            
            // Show matching projects with staggered animation
            setTimeout(function() {
                $(`[data-category="${category}"]`).each(function(index) {
                    const $project = $(this);
                    setTimeout(function() {
                        $project.fadeIn(200);
                    }, index * 75);
                });
            }, 200);
        }
        
        // Restore scroll position to prevent jumping
        setTimeout(function() {
            $(window).scrollTop(scrollTop);
        }, 10);
        
        // Recalculate container height after animations
        setTimeout(function() {
            const newHeight = $container.height();
            if (newHeight > containerHeight) {
                containerHeight = newHeight;
                $container.css('min-height', containerHeight + 'px');
            }
        }, 500);
    });
    
    // Initialize with 'all' showing
    $projects.show();
    
    // Ensure uniform card heights for better layout
    function makeCardsUniform() {
        const $cards = $('#projects-container .glassmorphism-card');
        let maxHeight = 0;
        
        // Reset heights first
        $cards.css('height', 'auto');
        
        // Find maximum height
        $cards.each(function() {
            const cardHeight = $(this).outerHeight();
            if (cardHeight > maxHeight) {
                maxHeight = cardHeight;
            }
        });
        
        // Set all visible cards to maximum height
        $cards.filter(':visible').css('min-height', maxHeight + 'px');
        
        // Update container height
        stabilizeContainer();
    }
    
    // Apply uniform heights after page load
    setTimeout(makeCardsUniform, 300);
    
    // Reapply on window resize with debouncing
    let resizeTimeout;
    $(window).resize(function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            makeCardsUniform();
        }, 250);
    });
    
    // Keep normal page scrolling enabled while filtering
    // The page should continue to respond to wheel and trackpad input.
    
});
