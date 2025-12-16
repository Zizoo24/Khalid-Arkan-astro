/**
 * Custom JavaScript for Arkan Interpretation
 */

(function() {
    'use strict';

    // Mobile scroll animation for service cards
    function initMobileScrollAnimation() {
        // Only run on mobile
        if (window.innerWidth > 767) return;

        const serviceCards = document.querySelectorAll('#services .thumb-info');

        if (!serviceCards.length) return;

        // Intersection Observer for scroll animations
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    // Add staggered delay based on index
                    const card = entry.target;
                    const index = Array.from(serviceCards).indexOf(card);
                    const delay = index * 100; // 100ms stagger

                    setTimeout(function() {
                        card.classList.add('animate-in');
                    }, delay);

                    // Stop observing once animated
                    observer.unobserve(card);
                }
            });
        }, observerOptions);

        // Observe all service cards
        serviceCards.forEach(function(card) {
            observer.observe(card);
        });
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileScrollAnimation);
    } else {
        initMobileScrollAnimation();
    }

    // Re-initialize on window resize (in case of orientation change)
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Reset and reinitialize if crossing mobile breakpoint
            const serviceCards = document.querySelectorAll('#services .thumb-info');
            if (window.innerWidth <= 767) {
                serviceCards.forEach(function(card) {
                    if (!card.classList.contains('animate-in')) {
                        initMobileScrollAnimation();
                    }
                });
            } else {
                // On desktop, ensure cards are visible
                serviceCards.forEach(function(card) {
                    card.classList.add('animate-in');
                });
            }
        }, 250);
    });

})();
