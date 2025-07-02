function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    let particleCount;
    if (window.innerWidth < 480) {
        particleCount = 15; // Mobile
    } else if (window.innerWidth < 768) {
        particleCount = 25; // Tablet
    } else {
        particleCount = 40; // Desktop
    }
    
    // Reduce particles on touch devices for performance
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

function handleScrollAnimations() {
    const sections = document.querySelectorAll('.policy-section');
    if (!sections.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: window.innerWidth < 768 ? 0.05 : 0.1,
        rootMargin: '0px 0px -30px 0px'
    });

    sections.forEach(section => {
        observer.observe(section);
    });
}

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initParallaxEffect() {
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        const cards = document.querySelectorAll('.policy-section');
        if(!cards.length) return;

        const onMouseMove = (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;

            cards.forEach((card) => {
                // Individualize the effect slightly
                const speed = card.classList.contains('app-card') ? 2 : 1;
                const rotateX = (y - 0.5) * speed * 2;
                const rotateY = (x - 0.5) * speed * 2;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
        };

        const onMouseLeave = () => {
            cards.forEach(card => {
                card.style.transform = ''; // Reset on leave
            });
        };
        
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseleave', onMouseLeave);
    }
}

function handleResize() {
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(() => {
        createParticles();
    }, 250);
}

function respectsReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

document.addEventListener('DOMContentLoaded', function () {
    if (!respectsReducedMotion()) {
        createParticles();
        initParallaxEffect();
    }

    handleScrollAnimations();
    initSmoothScrolling();

    window.addEventListener('resize', handleResize);
});