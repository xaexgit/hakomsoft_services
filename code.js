/* =============================================
   PARTICLES
   ============================================= */
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    let particleCount;
    if (window.innerWidth < 480) {
        particleCount = 15;
    } else if (window.innerWidth < 768) {
        particleCount = 25;
    } else {
        particleCount = 40;
    }

    if ('ontouchstart' in window) {
        particleCount = Math.floor(particleCount / 2);
    }

    particlesContainer.innerHTML = '';

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

/* =============================================
   SCROLL ANIMATIONS — FIX
   Only adds 'visible', never removes it.
   Handles coming-soon opacity separately.
   ============================================= */
function handleScrollAnimations() {
    const sections = document.querySelectorAll('.policy-section');
    if (!sections.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Once visible, stop observing — prevents flicker on scroll up
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '0px 0px -20px 0px'
    });

    sections.forEach(section => {
        observer.observe(section);
    });
}

/* =============================================
   SMOOTH SCROLLING
   ============================================= */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

/* =============================================
   PARALLAX — FIX
   Removed transform on cards to prevent
   conflict with visibility transform.
   Only applies subtle background parallax.
   ============================================= */
function initParallaxEffect() {
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        const bg = document.querySelector('body::before');

        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 10;
            const y = (e.clientY / window.innerHeight - 0.5) * 10;
            document.body.style.setProperty('--parallax-x', `${x}px`);
            document.body.style.setProperty('--parallax-y', `${y}px`);
        });
    }
}

/* =============================================
   RESIZE
   ============================================= */
function handleResize() {
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(() => {
        createParticles();
    }, 250);
}

/* =============================================
   REDUCED MOTION CHECK
   ============================================= */
function respectsReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/* =============================================
   INIT
   ============================================= */
document.addEventListener('DOMContentLoaded', function () {

    if (respectsReducedMotion()) {
        // If user prefers reduced motion, just show everything immediately
        document.querySelectorAll('.policy-section').forEach(el => {
            el.classList.add('visible');
        });
    } else {
        createParticles();
        handleScrollAnimations();
        initParallaxEffect();
    }

    initSmoothScrolling();
    window.addEventListener('resize', handleResize);
});
