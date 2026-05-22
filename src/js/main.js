// Typing Animation
document.addEventListener('DOMContentLoaded', function () {
    const typingTextPrimary = document.getElementById('typing-text');
    const typingTextSecondary = document.getElementById('typing-text-secondary');
    const primaryCursor = document.querySelector('.cursor-primary');
    const secondaryCursor = document.querySelector('.cursor-secondary');
    const primaryText = "I'm Joshua";
    const secondaryText = "Valentine Manik.";
    const typingSpeed = 50;
    const restartDelay = 3000;
    const initialDelay = 250;
    let index = 0;

    function syncScrolledState() {
        document.body.classList.toggle('is-scrolled', window.scrollY > 16);
    }

    function syncActiveNav() {
        const navLinks = Array.from(document.querySelectorAll('.navbar a.nav-link[href^="#"]'));
        const sections = navLinks
            .map((link) => {
                const target = document.querySelector(link.getAttribute('href'));
                return target ? { link, target } : null;
            })
            .filter(Boolean);

        let current = sections[0];

        sections.forEach((section) => {
            if (section.target.getBoundingClientRect().top <= 140) {
                current = section;
            }
        });

        navLinks.forEach((link) => link.classList.remove('active'));
        if (current) {
            current.link.classList.add('active');
        }
    }

    function renderTypingFrame() {
        const primaryCount = Math.min(index, primaryText.length);
        const secondaryCount = Math.max(0, index - primaryText.length);

        if (typingTextPrimary) {
            typingTextPrimary.textContent = primaryText.slice(0, primaryCount);
        }

        if (typingTextSecondary) {
            typingTextSecondary.textContent = secondaryText.slice(0, secondaryCount);
        }

        if (primaryCursor && secondaryCursor) {
            primaryCursor.style.opacity = primaryCount < primaryText.length ? '1' : '0';
            secondaryCursor.style.opacity = primaryCount >= primaryText.length ? '1' : '0';
        }
    }

    function typeWriter() {
        if (index < primaryText.length + secondaryText.length) {
            index += 1;
            renderTypingFrame();
            setTimeout(typeWriter, typingSpeed);
        } else {
            setTimeout(() => {
                index = 0;
                renderTypingFrame();
                setTimeout(typeWriter, initialDelay);
            }, restartDelay);
        }
    }

    if (typingTextPrimary && typingTextSecondary) {
        renderTypingFrame();
        setTimeout(typeWriter, initialDelay);
    }

    syncScrolledState();
    syncActiveNav();

    window.addEventListener('scroll', () => {
        syncScrolledState();
        syncActiveNav();
    }, { passive: true });
});

// Smooth scrolling with offset for fixed navbar
const nav = document.querySelector('.navbar');
const navOffset = (nav ? nav.offsetHeight : 0) + 16;

document.querySelectorAll('.navbar a.nav-link[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const id = link.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        if (!target) return;
        const y = target.getBoundingClientRect().top + window.scrollY - navOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    });
});

window.addEventListener('load', () => {
    if (window.location.hash) {
        const id = window.location.hash.slice(1);
        const target = document.getElementById(id);
        if (target) {
            const y = target.getBoundingClientRect().top + window.scrollY - navOffset;
            window.scrollTo({ top: y });
        }
    }
});
