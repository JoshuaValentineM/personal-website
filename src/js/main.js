// Typing Animation
document.addEventListener('DOMContentLoaded', function() {
    const typingText = document.getElementById('typing-text');
    const text = "I'm Joshua Valentine Manik.";
    const cursor = document.querySelector('.cursor');
    const typingSpeed = 50;      // ms per karakter
    const restartDelay = 3000;   // 3 detik setelah selesai
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            typingText.innerHTML += text.charAt(index);
            index++;
            setTimeout(typeWriter, typingSpeed);
        } else {
            setTimeout(() => {
                typingText.textContent = '';
                index = 0;
                if (cursor) {
                    cursor.classList.remove('normal-cursor');
                    cursor.classList.add('cursor');
                }
                typeWriter();
            }, restartDelay);
        }
    }

    // Start typing animation
    typeWriter();
});

// Smooth scrolling for navigation links (if you add navigation later)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Smooth scrolling with offset for fixed navbar
const nav = document.querySelector('.navbar');
const navOffset = (nav ? nav.offsetHeight : 0) + 16; // extra 16px gap

document.querySelectorAll('.navbar a.nav-link[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const id = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    const y = target.getBoundingClientRect().top + window.scrollY - navOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  });
});

// If page loads with a hash, adjust position
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