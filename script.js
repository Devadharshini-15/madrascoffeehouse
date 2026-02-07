/**
 * MADRAS COFFEE HOUSE - PREMIUM INTERACTIONS
 * Custom GSAP-like reveals and interaction logic.
 */

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initScrollReveal();
    initMagneticButtons();
    initHeroSlider();
    initStoryScroll();
    initTestimonials();
    initNavbar();
});

/**
 * Hero Background Multi-Image Slider (Cinematic Crossfade)
 */
function initHeroSlider() {
    const slides = document.querySelectorAll('.slider-item');
    if (!slides.length) return;

    let currentSlide = 0;
    const slideInterval = 5500; // Total display time (ms)

    const nextSlide = () => {
        // Remove active class from current slide
        slides[currentSlide].classList.remove('active');

        // Move to next slide (loop back to 0)
        currentSlide = (currentSlide + 1) % slides.length;

        // Add active class to new slide
        slides[currentSlide].classList.add('active');
    };

    // Auto rotate every 5.5 seconds
    setInterval(nextSlide, slideInterval);
}

/**
 * Header Scroll Transitions
 */
function initHeader() {
    const header = document.querySelector('#main-header');

    const handleScroll = () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
}

/**
 * Scroll Reveal Engine
 */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });
}

/**
 * Subtle Button Interaction
 */
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            // Placeholder for custom hover logic if needed
        });

        btn.addEventListener('mousedown', () => {
            btn.style.transform = 'translateY(-2px) scale(0.98)';
        });

        btn.addEventListener('mouseup', () => {
            btn.style.transform = '';
        });
    });
}

/**
 * Cinematic Storytelling Scroll Effect
 */
/**
 * Reveal Animations for Story Section
 */
function initStoryScroll() {
    const reveals = document.querySelectorAll('.reveal-left, .reveal-right');

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });
}

/**
 * Premium Interactive Testimonials
 */
function initTestimonials() {
    const grid = document.querySelector('.testi-grid');
    const cards = document.querySelectorAll('.testi-card');
    if (!grid || !cards.length) return;

    let autoScrollInterval;
    let isMobile = window.innerWidth <= 768;

    const startAutoScroll = () => {
        if (!isMobile) return;

        let currentIndex = 0;
        autoScrollInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % cards.length;

            // On mobile, cards are snap-aligned. We can calculate position:
            // card width + gap (var(--s4) = 32px)
            const gap = 32;
            const scrollPos = currentIndex * (cards[0].offsetWidth + gap);

            grid.scrollTo({
                left: scrollPos,
                behavior: 'smooth'
            });
        }, 4500); // 4.5 second interval
    };

    const stopAutoScroll = () => {
        clearInterval(autoScrollInterval);
    };

    // Initial check
    if (isMobile) startAutoScroll();

    // Handle Resize
    window.addEventListener('resize', () => {
        const wasMobile = isMobile;
        isMobile = window.innerWidth <= 768;

        if (isMobile && !wasMobile) {
            startAutoScroll();
        } else if (!isMobile && wasMobile) {
            stopAutoScroll();
        }
    });

    // Mobile interactions (Existing logic)
    cards.forEach(card => {
        card.addEventListener('click', () => {
            if (!window.matchMedia('(hover: hover)').matches) {
                cards.forEach(c => c.classList.remove('active-card'));
                card.classList.add('active-card');
                stopAutoScroll(); // Stop auto-scroll on manual interaction
            }
        });

        card.addEventListener('mouseleave', () => {
            if (window.matchMedia('(hover: hover)').matches) {
                card.classList.remove('active-card');
            }
        });
    });

    // Pause auto-scroll on touch start
    grid.addEventListener('touchstart', stopAutoScroll, { passive: true });
}

/**
 * Premium Navbar Logic (Mobile Menu)
 */
function initNavbar() {
    const menuToggle = document.querySelector('.menu-toggle');
    const body = document.body;

    // Mobile Menu Toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            body.classList.toggle('menu-open');
        });
    }

    // Close mobile menu when clicking a link
    const mobileLinks = document.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            body.classList.remove('menu-open');
        });
    });
}
