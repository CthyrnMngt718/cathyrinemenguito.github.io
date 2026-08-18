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

    // Update button state based on scroll position
    updateScrollButton();
});

// ============================================
// 3. VERSATILE SCROLL BUTTON (Up/Down in one)
// ============================================
const scrollBtn = document.getElementById('scroll-btn');
const scrollIcon = document.getElementById('scroll-icon');
const tooltip = document.getElementById('scroll-tooltip');

let isAtTop = true;

function updateScrollButton() {
    const scrollY = window.scrollY;
    const contactSection = document.getElementById('contact');
    let contactPosition = document.body.scrollHeight;

    if (contactSection) {
        contactPosition = contactSection.offsetTop - 80;
    }

    if (scrollY < 100) {
        // Near top → Show DOWN arrow
        scrollIcon.className = 'fas fa-chevron-down';
        tooltip.textContent = 'Scroll Down';
        isAtTop = true;
        scrollBtn.classList.remove('pulse');
    } else if (scrollY > 300) {
        // Scrolled past 300px → Show UP arrow
        scrollIcon.className = 'fas fa-chevron-up';
        tooltip.textContent = 'Back to Top';
        isAtTop = false;
        scrollBtn.classList.add('pulse');
    } else {
        // In between → Keep current state
        scrollBtn.classList.add('pulse');
    }
}

// Click handler
scrollBtn.addEventListener('click', () => {
    if (isAtTop) {
        // Scroll down to contact section
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
        // Briefly change tooltip
        tooltip.textContent = 'Scrolling Down...';
        setTimeout(() => {
            tooltip.textContent = 'Scroll Down';
        }, 800);
    } else {
        // Scroll back to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        tooltip.textContent = 'Scrolling Up...';
        setTimeout(() => {
            tooltip.textContent = 'Back to Top';
        }, 800);
    }
});

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

document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll(
        'section, .project-card, .edu-card, .about-text, .about-skills'
    );
    elements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Initialize button state
    setTimeout(updateScrollButton, 100);
});
