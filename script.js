// ============================================
// 1. MOBILE MENU TOGGLE (Hamburger)
// ============================================
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// ============================================
// 2. SCROLL PROGRESS BAR
// ============================================
const progressBar = document.getElementById('progress-bar');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;

    if (progressBar) {
        progressBar.style.width = Math.min(progress, 100) + '%';
    }
});

// ============================================
// 3. FLOATING BUTTONS (UP / DOWN)
// ============================================
const upBtn = document.getElementById('scroll-up-btn');
const downBtn = document.getElementById('scroll-down-btn');

// Show/Hide "Up" button based on scroll position
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        upBtn.style.display = 'flex';
    } else {
        upBtn.style.display = 'none';
    }
});

// Scroll to Top
if (upBtn) {
    upBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Scroll to Contact Section (Bottom)
if (downBtn) {
    downBtn.addEventListener('click', () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
    });
}

// ============================================
// 4. SCROLL REVEAL (Fade-in Animations)
// ============================================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Apply fade-in to all sections, project cards, and education cards
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll(
        'section, .project-card, .edu-card, .about-text, .about-skills'
    );
    elements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});
