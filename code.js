/* =============================================
   MOBILE MENU TOGGLE
   ============================================= */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const icon = menuBtn.querySelector('i');

    if (!menuBtn || !navLinks || !icon) return;

    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');

        if (navLinks.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    });

    document.querySelectorAll('.nav-links .nav-item').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            icon.classList.replace('fa-times', 'fa-bars');
        });
    });
}

/* =============================================
   PARTICLES ENGINE
   ============================================= */
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    let particleCount = window.innerWidth < 768 ? 15 : 30;
    if ('ontouchstart' in window) particleCount = Math.floor(particleCount / 2);

    particlesContainer.innerHTML = '';

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 2 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;

        particle.animate([
            { transform: 'translateY(0) scale(1)', opacity: Math.random() * 0.3 },
            { transform: `translateY(-${Math.random() * 100 + 50}px) scale(${Math.random() + 0.5})`, opacity: 0 }
        ], {
            duration: Math.random() * 10000 + 10000,
            iterations: Infinity,
            delay: Math.random() * 5000
        });

        particlesContainer.appendChild(particle);
    }
}

/* =============================================
   SCROLL REVEAL ANIMATIONS
   ============================================= */
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.section-fade');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('app-card')) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100);
                } else {
                    entry.target.classList.add('visible');
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
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
                const offsetTop = target.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* =============================================
   INITIALIZATION
   ============================================= */
document.addEventListener('DOMContentLoaded', function () {
    initMobileMenu();
    initSmoothScrolling();

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.querySelectorAll('.section-fade').forEach(el => el.classList.add('visible'));
    } else {
        createParticles();
        handleScrollAnimations();
    }

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                createParticles();
            }
        }, 250);
    });
});
