// ============================================
// 1. CURSOR GLOW (Enhanced)
// ============================================
const cursorGlow = document.getElementById('cursor-glow');

if (cursorGlow) {
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });
}

// ============================================
// 2. CUSTOM CURSOR
// ============================================
const customCursor = document.getElementById('custom-cursor');

if (customCursor) {
    document.addEventListener('mousemove', (e) => {
        customCursor.style.left = e.clientX + 'px';
        customCursor.style.top = e.clientY + 'px';
    });

    document.querySelectorAll('a, button, .btn, .project-card, .service-card, .edu-card').forEach(el => {
        el.addEventListener('mouseenter', () => customCursor.classList.add('active'));
        el.addEventListener('mouseleave', () => customCursor.classList.remove('active'));
    });
}

// ============================================
// 3. 3D TILT EFFECT ON CARDS
// ============================================
const tiltElements = document.querySelectorAll('[data-tilt]');

tiltElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });
    
    el.addEventListener('mouseleave', () => {
        el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ============================================
// 4. LIVE STATUS
// ============================================
const statusTexts = [
    'Currently exploring: React.js & Tailwind CSS',
    'Building: New portfolio projects',
    'Learning: Advanced JavaScript',
    'Available for freelance work'
];
let statusIndex = 0;
const statusElement = document.querySelector('.status-text');

if (statusElement) {
    setInterval(() => {
        statusIndex = (statusIndex + 1) % statusTexts.length;
        statusElement.textContent = statusTexts[statusIndex];
    }, 5000);
}

// ============================================
// 5. VISITOR COUNTER (with session check)
// ============================================
async function getVisitorCount() {
    const countElement = document.getElementById('visitor-count');
    if (!countElement) return;
    
    try {
        const response = await fetch('https://api.countapi.xyz/hit/cthyrnmngt718/visits');
        const data = await response.json();
        countElement.textContent = data.value || 0;
    } catch (error) {
        if (!sessionStorage.getItem('visitorCounted')) {
            let count = parseInt(localStorage.getItem('visitorCount') || '0');
            count++;
            localStorage.setItem('visitorCount', count);
            sessionStorage.setItem('visitorCounted', 'true');
            countElement.textContent = count;
        } else {
            countElement.textContent = localStorage.getItem('visitorCount') || '0';
        }
    }
}
getVisitorCount();

// ============================================
// 6. QUOTE OF THE DAY (Bible Verses)
// ============================================
const bibleVerses = [
    { text: "I can do all things through Christ who strengthens me.", author: "Philippians 4:13" },
    { text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.", author: "Jeremiah 29:11" },
    { text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.", author: "Joshua 1:9" },
    { text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.", author: "Proverbs 3:5-6" },
    { text: "The Lord is my shepherd; I shall not want.", author: "Psalm 23:1" },
    { text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.", author: "Philippians 4:6" },
    { text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.", author: "John 3:16" },
    { text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles.", author: "Isaiah 40:31" },
    { text: "The Lord is my light and my salvation—whom shall I fear?", author: "Psalm 27:1" },
    { text: "Be still, and know that I am God.", author: "Psalm 46:10" },
    { text: "Let your light shine before others, that they may see your good deeds and glorify your Father in heaven.", author: "Matthew 5:16" },
    { text: "The fear of the Lord is the beginning of wisdom, and knowledge of the Holy One is understanding.", author: "Proverbs 9:10" },
    { text: "Love the Lord your God with all your heart and with all your soul and with all your mind and with all your strength.", author: "Mark 12:30" },
    { text: "The peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.", author: "Philippians 4:7" },
    { text: "For we walk by faith, not by sight.", author: "2 Corinthians 5:7" },
    { text: "The Lord will fight for you; you need only to be still.", author: "Exodus 14:14" },
    { text: "Do not conform to the pattern of this world, but be transformed by the renewing of your mind.", author: "Romans 12:2" },
    { text: "Above all else, guard your heart, for everything you do flows from it.", author: "Proverbs 4:23" },
    { text: "Commit to the Lord whatever you do, and he will establish your plans.", author: "Proverbs 16:3" },
    { text: "The Lord is gracious and compassionate, slow to anger and rich in love.", author: "Psalm 145:8" },
    { text: "Your word is a lamp for my feet, a light on my path.", author: "Psalm 119:105" },
    { text: "For the Lord gives wisdom; from his mouth come knowledge and understanding.", author: "Proverbs 2:6" },
    { text: "The name of the Lord is a fortified tower; the righteous run to it and are safe.", author: "Proverbs 18:10" },
    { text: "The Lord is my strength and my shield; my heart trusts in him, and he helps me.", author: "Psalm 28:7" },
    { text: "Cast all your anxiety on him because he cares for you.", author: "1 Peter 5:7" },
    { text: "For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline.", author: "2 Timothy 1:7" },
    { text: "The Lord is good to those whose hope is in him, to the one who seeks him.", author: "Lamentations 3:25" },
    { text: "I have hidden your word in my heart that I might not sin against you.", author: "Psalm 119:11" },
    { text: "The Lord is near to all who call on him, to all who call on him in truth.", author: "Psalm 145:18" },
    { text: "But those who trust in the Lord will find new strength. They will soar high on wings like eagles.", author: "Isaiah 40:31" },
    { text: "The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you.", author: "Numbers 6:24-25" },
    { text: "He has shown you, O mortal, what is good. And what does the Lord require of you? To act justly and to love mercy and to walk humbly with your God.", author: "Micah 6:8" },
    { text: "For we are God's handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do.", author: "Ephesians 2:10" },
    { text: "The Lord is my rock, my fortress and my deliverer; my God is my rock, in whom I take refuge.", author: "Psalm 18:2" },
    { text: "He gives strength to the weary and increases the power of the weak.", author: "Isaiah 40:29" },
    { text: "The Lord is compassionate and gracious, slow to anger, abounding in love.", author: "Psalm 103:8" },
    { text: "The path of the righteous is like the morning sun, shining ever brighter till the full light of day.", author: "Proverbs 4:18" },
    { text: "The Lord is my helper; I will not be afraid. What can mere mortals do to me?", author: "Hebrews 13:6" },
    { text: "Seek the Lord while he may be found; call on him while he is near.", author: "Isaiah 55:6" },
    { text: "The Lord is faithful to all his promises and loving toward all he has made.", author: "Psalm 145:13" },
    { text: "A heart at peace gives life to the body, but envy rots the bones.", author: "Proverbs 14:30" },
];

function displayQuote() {
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    const quoteType = document.getElementById('quote-type');
    
    if (!quoteText) return;
    
    const now = new Date();
    const philippineTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Manila' }));
    const startOfYear = new Date(philippineTime.getFullYear(), 0, 0);
    const diff = philippineTime - startOfYear;
    const dayOfYear = Math.floor(diff / 86400000);
    const verseIndex = dayOfYear % bibleVerses.length;
    const selectedVerse = bibleVerses[verseIndex];
    quoteText.textContent = selectedVerse.text;
    quoteAuthor.textContent = `— ${selectedVerse.author}`;
    
    if (quoteType) {
        quoteType.innerHTML = '<i class="fas fa-bible"></i> Verse of the Day';
        quoteType.style.color = '#ffdd44';
        quoteType.style.borderColor = 'rgba(255, 221, 68, 0.3)';
        quoteType.style.background = 'rgba(255, 221, 68, 0.1)';
    }
}

document.addEventListener('DOMContentLoaded', displayQuote);

// ============================================
// 7. MOBILE MENU TOGGLE
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
// 8. SCROLL PROGRESS BAR
// ============================================
const progressBar = document.getElementById('progress-bar');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;

    if (progressBar) {
        progressBar.style.width = Math.min(progress, 100) + '%';
    }

    updateScrollButton();
});

// ============================================
// 9. VERSATILE SCROLL BUTTON
// ============================================
const scrollBtn = document.getElementById('scroll-btn');
const scrollIcon = document.getElementById('scroll-icon');
const tooltip = document.getElementById('scroll-tooltip');

let isAtTop = true;

function updateScrollButton() {
    const scrollY = window.scrollY;

    if (scrollY < 100) {
        scrollIcon.className = 'fas fa-chevron-down';
        tooltip.textContent = 'Scroll Down';
        isAtTop = true;
        scrollBtn.classList.remove('pulse');
    } else if (scrollY > 300) {
        scrollIcon.className = 'fas fa-chevron-up';
        tooltip.textContent = 'Back to Top';
        isAtTop = false;
        scrollBtn.classList.add('pulse');
    } else {
        scrollBtn.classList.add('pulse');
    }
}

scrollBtn.addEventListener('click', () => {
    if (isAtTop) {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
        tooltip.textContent = 'Scrolling Down...';
        setTimeout(() => {
            tooltip.textContent = 'Scroll Down';
        }, 800);
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        tooltip.textContent = 'Scrolling Up...';
        setTimeout(() => {
            tooltip.textContent = 'Back to Top';
        }, 800);
    }
});

// ============================================
// 10. SCROLL REVEAL
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
        'section, .project-card, .edu-card, .about-text, .about-skills, .service-card'
    );
    elements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    setTimeout(updateScrollButton, 100);
});

// ============================================
// 11. ACTIVE NAV LINK
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinks2 = document.querySelectorAll('.nav-links a:not([href*="projects"])');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks2.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ============================================
// 12. FORM SUBMISSION HANDLER (AJAX)
// ============================================
const contactForm = document.querySelector('.contact-form');
const successMsg = document.getElementById('form-success');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const btn = this.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        btn.disabled = true;
        
        try {
            const formData = new FormData(this);
            const response = await fetch('https://formspree.io/f/mzepkbgw', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                contactForm.style.display = 'none';
                if (successMsg) {
                    successMsg.style.display = 'block';
                    successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    launchConfetti();
                }
                contactForm.reset();
            } else {
                alert('Oops! Something went wrong. Please try again.');
                btn.innerHTML = originalText;
                btn.disabled = false;
            }
        } catch (error) {
            alert('Network error. Please check your connection and try again.');
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    });
}

// ============================================
// 13. DARK/LIGHT MODE TOGGLE (UNIFIED)
// ============================================
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'dark';

if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    if (themeToggle) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

function updateRadarChartTheme() {
    if (!radarChartInstance) return;
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const textColor = isLight ? '#0b1a14' : '#e8f5ed';
    const gridColor = isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)';
    
    radarChartInstance.options.plugins.legend.labels.color = textColor;
    radarChartInstance.options.scales.r.angleLines.color = gridColor;
    radarChartInstance.options.scales.r.grid.color = gridColor;
    radarChartInstance.options.scales.r.pointLabels.color = textColor;
    radarChartInstance.options.scales.r.ticks.color = textColor;
    radarChartInstance.update();
}

function handleThemeToggle() {
    const theme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (themeToggle) {
        themeToggle.innerHTML = theme === 'light' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }
    updateRadarChartTheme();
}

if (themeToggle) {
    themeToggle.addEventListener('click', handleThemeToggle);
}

// ============================================
// 14. ANIMATED STATS COUNTERS
// ============================================
const stats = document.querySelectorAll('.stat-number');
const STAT_INCREMENT_DIVISOR = 60;
const STAT_ANIMATION_INTERVAL = 20;

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stat = entry.target;
            const text = stat.textContent;
            const isPlus = text.includes('+');
            const target = parseInt(text.replace('+', ''));
            let current = 0;
            const increment = Math.ceil(target / STAT_INCREMENT_DIVISOR);
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = isPlus ? current + '+' : current;
            }, STAT_ANIMATION_INTERVAL);
            counterObserver.unobserve(stat);
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => counterObserver.observe(stat));

// ============================================
// 15. PARTICLE BACKGROUND
// ============================================
const canvas = document.getElementById('particles-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles = [];
    let mouse = { x: null, y: null };

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 6 + 4;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.5 + 0.15;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (mouse.x && mouse.y) {
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 200) {
                    const force = 0.015;
                    this.speedX += (dx / dist) * force;
                    this.speedY += (dy / dist) * force;
                }
            }

            this.speedX *= 0.99;
            this.speedY *= 0.99;

            if (this.x < 0 || this.x > width) this.speedX *= -1;
            if (this.y < 0 || this.y > height) this.speedY *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 255, 171, ${this.opacity})`;
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        const count = Math.min(50, Math.floor((width * height) / 20000));
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }
    initParticles();

    function animateParticles() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0, 255, 171, ${0.06 * (1 - dist / 120)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    document.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    window.addEventListener('resize', () => {
        resize();
        initParticles();
    });
}

// ============================================
// 16. CONFETTI EFFECT (with cleanup)
// ============================================
let confettiPieces = [];

function launchConfetti() {
    const colors = ['#00ffab', '#00cc88', '#e8f5ed', '#88ffc8', '#00dd99', '#ff6b8a', '#ffdd44'];
    const count = 120;
    const container = document.body;

    for (let i = 0; i < count; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti-piece');
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.width = Math.random() * 10 + 4 + 'px';
        confetti.style.height = Math.random() * 10 + 4 + 'px';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        confetti.style.position = 'fixed';
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        confetti.style.animation = `confettiFall ${Math.random() * 2 + 2}s linear forwards`;
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        container.appendChild(confetti);
        confettiPieces.push(confetti);
        
        setTimeout(() => {
            confetti.remove();
            confettiPieces = confettiPieces.filter(p => p !== confetti);
        }, 3000);
    }
}

// ============================================
// 17. SKILLS BAR ANIMATION
// ============================================
const skillBars = document.querySelectorAll('.skill-bar-fill');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
            skillObserver.unobserve(bar);
        }
    });
}, { threshold: 0.3 });

skillBars.forEach(bar => skillObserver.observe(bar));

// ============================================
// 18. FILTER BUTTONS (Projects Page) with aria-pressed
// ============================================
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => {
            b.setAttribute('aria-pressed', 'false');
            b.classList.remove('active');
        });
        btn.setAttribute('aria-pressed', 'true');
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;

        projectCards.forEach(card => {
            const categories = card.dataset.category ? card.dataset.category.split(' ') : [];
            if (filter === 'all' || categories.includes(filter)) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ============================================
// 19. PAGE LOADER
// ============================================
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('page-loader');
        if (loader) {
            loader.classList.add('hidden');
        }
    }, 600);
});

// ============================================
// 20. KEYBOARD NAVIGATION
// ============================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
        window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
        e.preventDefault();
    }
    if (e.key === 'ArrowUp') {
        window.scrollBy({ top: -window.innerHeight * 0.8, behavior: 'smooth' });
        e.preventDefault();
    }
});

// ============================================
// 21. CAROUSEL
// ============================================
const track = document.getElementById('carousel-track');
const slides = track ? track.querySelectorAll('.carousel-slide') : [];
const dotsContainer = document.getElementById('carousel-dots');
let currentSlide = 0;
let autoSlideInterval;

function createDots() {
    if (!dotsContainer || slides.length === 0) return;
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
}

function goToSlide(index) {
    if (!track || slides.length === 0) return;
    currentSlide = index;
    track.style.transform = `translateX(-${index * 100}%)`;
    
    const dots = dotsContainer ? dotsContainer.querySelectorAll('.carousel-dot') : [];
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    if (slides.length === 0) return;
    goToSlide((currentSlide + 1) % slides.length);
}

function prevSlide() {
    if (slides.length === 0) return;
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
}

function startAutoSlide() {
    if (slides.length <= 1) return;
    stopAutoSlide();
    autoSlideInterval = setInterval(nextSlide, 4000);
}

function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
    }
}

if (slides.length > 0) {
    createDots();
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); startAutoSlide(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); startAutoSlide(); });
    
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);
    }
    
    startAutoSlide();
}

// ============================================
// 22. RADAR CHART (Lazy Load + Theme Update)
// ============================================
let radarChartInstance = null;

function loadRadarChart() {
    const canvas = document.getElementById('radarChart');
    if (!canvas) return;
    
    if (typeof Chart === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = () => createRadarChart(canvas);
        document.head.appendChild(script);
    } else {
        createRadarChart(canvas);
    }
}

function createRadarChart(canvas) {
    if (radarChartInstance) {
        radarChartInstance.destroy();
        radarChartInstance = null;
    }
    const ctx = canvas.getContext('2d');
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const textColor = isLight ? '#0b1a14' : '#e8f5ed';
    const gridColor = isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)';

    radarChartInstance = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL', 'UI/UX'],
            datasets: [{
                label: 'Skill Level',
                data: [90, 85, 65, 75, 70, 80],
                backgroundColor: 'rgba(0, 255, 171, 0.2)',
                borderColor: '#00ffab',
                pointBackgroundColor: '#00ffab',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#00ffab'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                        font: {
                            family: 'Inter',
                            size: 12
                        }
                    }
                }
            },
            scales: {
                r: {
                    angleLines: {
                        color: gridColor
                    },
                    grid: {
                        color: gridColor
                    },
                    pointLabels: {
                        color: textColor,
                        font: {
                            family: 'Inter',
                            size: 11
                        }
                    },
                    ticks: {
                        color: textColor,
                        backdropColor: 'transparent',
                        font: {
                            size: 9
                        }
                    },
                    max: 100,
                    min: 0
                }
            }
        }
    });
}

const radarObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            loadRadarChart();
            radarObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

const radarContainer = document.querySelector('.radar-chart-container');
if (radarContainer) {
    radarObserver.observe(radarContainer);
}

document.addEventListener('DOMContentLoaded', () => {
    if (radarContainer && radarContainer.getBoundingClientRect().top < window.innerHeight) {
        loadRadarChart();
    }
});

// ============================================
// 23. DYNAMIC STYLES
// ============================================
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    @keyframes confettiFall {
        0% {
            transform: translateY(0) rotate(0deg) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg) scale(0.2);
            opacity: 0;
        }
    }
    @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
    }
`;
document.head.appendChild(dynamicStyles);

// ============================================
// 24. TYPEWRITER EFFECT
// ============================================
const taglineElement = document.getElementById('tagline');
const taglines = [
    'Computer Science Graduate',
    'Aspiring IT Professional',
    'Web Developer',
    'UI/UX Enthusiast'
];
let typeIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    if (!taglineElement) return;
    const current = taglines[typeIndex];
    if (isDeleting) {
        taglineElement.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        taglineElement.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === current.length) {
        speed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        typeIndex = (typeIndex + 1) % taglines.length;
        speed = 500;
    }
    setTimeout(typeEffect, speed);
}

if (taglineElement) {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(typeEffect, 800);
    });
}

// ============================================
// 25. CLICK RIPPLE EFFECT
// ============================================
document.querySelectorAll('.btn, .floating-cta, .carousel-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 700);
    });
});

// ============================================
// 26. DYNAMIC COPYRIGHT YEAR
// ============================================
const yearElement = document.getElementById('year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// ============================================
// 27. HIDE-ON-SCROLL NAVIGATION
// ============================================
const header = document.querySelector('header');
let lastScrollY = window.scrollY;
let ticking = false;
let headerHidden = false;

function handleHeaderScroll() {
    const currentScrollY = window.scrollY;
    
    if (window.innerWidth <= 768) {
        header.classList.remove('hidden');
        header.classList.add('show');
        lastScrollY = currentScrollY;
        return;
    }
    
    if (currentScrollY > lastScrollY && currentScrollY > 150) {
        if (!headerHidden) {
            header.classList.add('hidden');
            header.classList.remove('show');
            headerHidden = true;
        }
    } else if (currentScrollY < lastScrollY) {
        if (headerHidden) {
            header.classList.remove('hidden');
            header.classList.add('show');
            headerHidden = false;
        }
    }
    
    if (currentScrollY < 50) {
        header.classList.remove('hidden');
        header.classList.add('show');
        headerHidden = false;
    }
    
    if (currentScrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScrollY = currentScrollY;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            handleHeaderScroll();
        });
        ticking = true;
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        header.classList.remove('hidden');
        header.classList.add('show');
        headerHidden = false;
    }
});

document.addEventListener('mousemove', (e) => {
    if (e.clientY < 80 && headerHidden) {
        header.classList.remove('hidden');
        header.classList.add('show');
        clearTimeout(window.headerShowTimeout);
        window.headerShowTimeout = setTimeout(() => {
            if (window.scrollY > 150) {
                header.classList.add('hidden');
                header.classList.remove('show');
                headerHidden = true;
            }
        }, 2000);
    }
});

setTimeout(() => {
    handleHeaderScroll();
}, 100);

// ============================================
// 28. LIVE GITHUB ACTIVITY FEED
// ============================================
async function fetchGitHubActivity() {
    const feedContainer = document.getElementById('github-feed');
    if (!feedContainer) return;
    
    const username = 'CthyrnMngt718';
    
    try {
        const response = await fetch(`https://api.github.com/users/${username}/events/public?per_page=6`);
        
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const events = await response.json();
        
        if (!events || events.length === 0) {
            feedContainer.innerHTML = `
                <div class="github-error">
                    <i class="fas fa-inbox"></i>
                    <p>No recent activity found.</p>
                </div>
            `;
            return;
        }
        
        const relevantEvents = events.filter(event => 
            ['PushEvent', 'CreateEvent', 'PublicEvent', 'WatchEvent', 'ForkEvent', 'PullRequestEvent', 'IssuesEvent'].includes(event.type)
        ).slice(0, 5);
        
        if (relevantEvents.length === 0) {
            feedContainer.innerHTML = `
                <div class="github-error">
                    <i class="fas fa-inbox"></i>
                    <p>No recent public activity.</p>
                </div>
            `;
            return;
        }
        
        let html = '';
        
        relevantEvents.forEach(event => {
            const repoName = event.repo.name;
            const repoUrl = `https://github.com/${repoName}`;
            const icon = getEventIcon(event.type);
            const emoji = getEventEmoji(event.type);
            const message = formatEventMessage(event);
            const timeAgo = getTimeAgo(new Date(event.created_at));
            
            html += `
                <div class="github-item">
                    <div class="github-icon">
                        <i class="${icon}"></i>
                    </div>
                    <div class="github-info">
                        <div class="repo-name">
                            <a href="${repoUrl}" target="_blank" rel="noopener noreferrer">${repoName}</a>
                        </div>
                        <div class="commit-message">${message}</div>
                        <div class="commit-meta">
                            <span><i class="far fa-clock"></i> ${timeAgo}</span>
                            <span><i class="fas fa-code-branch"></i> ${event.type.replace('Event', '')}</span>
                        </div>
                    </div>
                    <div class="github-emoji">${emoji}</div>
                </div>
            `;
        });
        
        feedContainer.innerHTML = html;
        
    } catch (error) {
        console.error('GitHub feed error:', error);
        feedContainer.innerHTML = `
            <div class="github-error">
                <i class="fas fa-exclamation-circle"></i>
                <p>Unable to load GitHub activity. Please try again later.</p>
            </div>
        `;
    }
}

function getEventIcon(type) {
    const icons = {
        'PushEvent': 'fas fa-code-commit',
        'CreateEvent': 'fas fa-plus-circle',
        'PublicEvent': 'fas fa-globe',
        'WatchEvent': 'fas fa-star',
        'ForkEvent': 'fas fa-code-branch',
        'PullRequestEvent': 'fas fa-code-pull-request',
        'IssuesEvent': 'fas fa-exclamation-circle'
    };
    return icons[type] || 'fab fa-github';
}

function getEventEmoji(type) {
    const emojis = {
        'PushEvent': '📦',
        'CreateEvent': '✨',
        'PublicEvent': '🌍',
        'WatchEvent': '⭐',
        'ForkEvent': '🍴',
        'PullRequestEvent': '🔀',
        'IssuesEvent': '🐛'
    };
    return emojis[type] || '💻';
}

function formatEventMessage(event) {
    const repo = event.repo.name;
    
    switch (event.type) {
        case 'PushEvent':
            const commits = event.payload.commits || [];
            if (commits.length > 0) {
                const firstCommit = commits[0].message || 'No commit message';
                const restCount = commits.length - 1;
                return `${firstCommit}${restCount > 0 ? ` (+ ${restCount} more commits)` : ''}`;
            }
            return `Pushed to ${repo}`;
        
        case 'CreateEvent':
            const ref = event.payload.ref || '';
            const refType = event.payload.ref_type || 'branch';
            return `Created ${refType} "${ref}" in ${repo}`;
        
        case 'PublicEvent':
            return `Made ${repo} public 🎉`;
        
        case 'WatchEvent':
            return `Starred ${repo} ⭐`;
        
        case 'ForkEvent':
            return `Forked ${repo} 🍴`;
        
        case 'PullRequestEvent':
            const action = event.payload.action || 'opened';
            return `${action} a pull request in ${repo}`;
        
        case 'IssuesEvent':
            const issueAction = event.payload.action || 'opened';
            return `${issueAction} an issue in ${repo}`;
        
        default:
            return `Activity on ${repo}`;
    }
}

function getTimeAgo(date) {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

const githubSection = document.getElementById('github-activity');
if (githubSection) {
    const githubObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                fetchGitHubActivity();
                githubObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    githubObserver.observe(githubSection);
}

document.addEventListener('DOMContentLoaded', () => {
    if (githubSection && githubSection.getBoundingClientRect().top < window.innerHeight) {
        fetchGitHubActivity();
    }
});

// ============================================
// 29. SERVICE WORKER REGISTRATION
// ============================================
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
            console.log('Service Worker registered successfully');
        })
        .catch((error) => {
            console.log('Service Worker registration failed:', error);
        });
}
// ============================================
// 30. MAGNETIC BUTTON EFFECT
// ============================================
const magneticBtns = document.querySelectorAll('.magnetic-btn');

magneticBtns.forEach(btn => {
    if (!btn.querySelector('.btn-content')) {
        const content = btn.innerHTML;
        btn.innerHTML = `<span class="btn-content">${content}</span>`;
        btn.classList.add('has-content');
    }

    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const offsetX = (x - centerX) / centerX;
        const offsetY = (y - centerY) / centerY;
        
        const maxPull = 20;
        const pullX = offsetX * maxPull * 0.6;
        const pullY = offsetY * maxPull * 0.6;
        
        btn.style.transform = `translate(${pullX}px, ${pullY}px) scale(1.04)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0) scale(1)';
        btn.style.transition = 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)';
        
        setTimeout(() => {
            btn.style.transition = '';
        }, 400);
    });

    btn.addEventListener('mouseenter', () => {
        btn.style.boxShadow = '0 8px 40px var(--mint-glow)';
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.boxShadow = '';
    });
});

// ============================================
// 31. RESUME PDF PREVIEW MODAL
// ============================================
const resumeModal = document.getElementById('resume-modal');
const resumeModalClose = document.getElementById('resume-modal-close');
const resumeModalCloseBtn = document.getElementById('resume-modal-close-btn');
const resumePreviewBtn = document.getElementById('resume-preview-btn');
const pdfViewer = document.getElementById('resume-pdf-viewer');

const PDFJS_SCRIPT = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';

function loadPDFViewer() {
    if (!pdfViewer) return;
    
    if (typeof pdfjsLib !== 'undefined') {
        renderPDFWithPDFJS();
        return;
    }
    
    const script = document.createElement('script');
    script.src = PDFJS_SCRIPT;
    script.onload = () => {
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        renderPDFWithPDFJS();
    };
    script.onerror = () => {
        renderPDFWithIframe();
    };
    document.head.appendChild(script);
}

function renderPDFWithPDFJS() {
    const viewer = pdfViewer;
    const pdfUrl = 'Cathyrine%20Menguito%20Resume.pdf';
    
    viewer.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:center;height:500px;flex-direction:column;gap:16px;color:var(--text-secondary);">
            <i class="fas fa-spinner fa-spin" style="font-size:2rem;color:var(--mint-primary);"></i>
            <span>Loading resume...</span>
        </div>
    `;
    
    pdfjsLib.getDocument(pdfUrl).promise
        .then((pdf) => {
            return pdf.getPage(1).then((page) => {
                const scale = 1.5;
                const viewport = page.getViewport({ scale: scale });
                
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                canvas.style.width = '100%';
                canvas.style.height = 'auto';
                canvas.style.display = 'block';
                canvas.style.margin = '0 auto';
                
                viewer.innerHTML = '';
                viewer.appendChild(canvas);
                
                const renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                
                page.render(renderContext).promise.then(() => {
                    const pageInfo = document.createElement('div');
                    pageInfo.style.cssText = `
                        text-align: center;
                        padding: 8px 0;
                        font-size: 0.75rem;
                        color: var(--text-secondary);
                        font-family: var(--font-mono);
                        opacity: 0.6;
                    `;
                    pageInfo.textContent = `Page 1 of ${pdf.numPages}`;
                    viewer.appendChild(pageInfo);
                });
            });
        })
        .catch((error) => {
            console.error('PDF.js error:', error);
            renderPDFWithIframe();
        });
}

function renderPDFWithIframe() {
    const viewer = pdfViewer;
    const pdfUrl = 'Cathyrine%20Menguito%20Resume.pdf';
    
    viewer.innerHTML = `
        <iframe src="${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0" 
                style="width:100%;height:600px;border:none;display:block;"
                loading="lazy"
                onerror="this.style.display='none'; this.parentElement.querySelector('.pdf-error').style.display='flex';">
        </iframe>
        <div class="pdf-error" style="display:none;flex-direction:column;align-items:center;justify-content:center;height:500px;color:var(--text-secondary);text-align:center;padding:24px;">
            <i class="fas fa-file-pdf" style="font-size:3rem;color:var(--mint-primary);opacity:0.3;margin-bottom:16px;"></i>
            <p>Unable to preview the resume directly.</p>
            <p style="font-size:0.85rem;opacity:0.6;margin-top:4px;">Please download the PDF to view it.</p>
            <a href="${pdfUrl}" download class="btn btn-primary" style="margin-top:16px;color:#0b0e0c;">
                <i class="fas fa-download"></i> Download Resume
            </a>
        </div>
    `;
    
    const iframe = viewer.querySelector('iframe');
    if (iframe) {
        iframe.addEventListener('error', () => {
            iframe.style.display = 'none';
            const errorDiv = viewer.querySelector('.pdf-error');
            if (errorDiv) errorDiv.style.display = 'flex';
        });
    }
}

if (resumePreviewBtn) {
    resumePreviewBtn.addEventListener('click', (e) => {
        e.preventDefault();
        resumeModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        loadPDFViewer();
    });
}

function closeResumeModal() {
    resumeModal.classList.remove('active');
    document.body.style.overflow = '';
}

if (resumeModalClose) {
    resumeModalClose.addEventListener('click', closeResumeModal);
}

if (resumeModalCloseBtn) {
    resumeModalCloseBtn.addEventListener('click', closeResumeModal);
}

resumeModal.addEventListener('click', (e) => {
    if (e.target === resumeModal) {
        closeResumeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
        closeResumeModal();
    }
});
// ============================================
// 31. RESUME PDF PREVIEW MODAL
// ============================================
const resumeModal = document.getElementById('resume-modal');
const resumeModalClose = document.getElementById('resume-modal-close');
const resumeModalCloseBtn = document.getElementById('resume-modal-close-btn');
const resumePreviewBtn = document.getElementById('resume-preview-btn');
const pdfViewer = document.getElementById('resume-pdf-viewer');

// PDF.js CDN for better rendering (optional, but recommended)
const PDFJS_SCRIPT = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';

function loadPDFViewer() {
    if (!pdfViewer) return;
    
    // Check if PDF.js is already loaded
    if (typeof pdfjsLib !== 'undefined') {
        renderPDFWithPDFJS();
        return;
    }
    
    // Load PDF.js dynamically
    const script = document.createElement('script');
    script.src = PDFJS_SCRIPT;
    script.onload = () => {
        // Set worker source
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        renderPDFWithPDFJS();
    };
    script.onerror = () => {
        // Fallback: use iframe
        renderPDFWithIframe();
    };
    document.head.appendChild(script);
}

function renderPDFWithPDFJS() {
    const viewer = pdfViewer;
    const pdfUrl = 'Cathyrine%20Menguito%20Resume.pdf';
    
    // Show loading
    viewer.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:center;height:500px;flex-direction:column;gap:16px;color:var(--text-secondary);">
            <i class="fas fa-spinner fa-spin" style="font-size:2rem;color:var(--mint-primary);"></i>
            <span>Loading resume...</span>
        </div>
    `;
    
    // Use PDF.js to render
    pdfjsLib.getDocument(pdfUrl).promise
        .then((pdf) => {
            // Get first page
            return pdf.getPage(1).then((page) => {
                const scale = 1.5;
                const viewport = page.getViewport({ scale: scale });
                
                // Create canvas
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                canvas.style.width = '100%';
                canvas.style.height = 'auto';
                canvas.style.display = 'block';
                canvas.style.margin = '0 auto';
                
                viewer.innerHTML = '';
                viewer.appendChild(canvas);
                
                // Render page
                const renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                
                page.render(renderContext).promise.then(() => {
                    // Add a subtle "page X of Y" indicator
                    const pageInfo = document.createElement('div');
                    pageInfo.style.cssText = `
                        text-align: center;
                        padding: 8px 0;
                        font-size: 0.75rem;
                        color: var(--text-secondary);
                        font-family: var(--font-mono);
                        opacity: 0.6;
                    `;
                    pageInfo.textContent = `Page 1 of ${pdf.numPages}`;
                    viewer.appendChild(pageInfo);
                });
            });
        })
        .catch((error) => {
            console.error('PDF.js error:', error);
            // Fallback to iframe
            renderPDFWithIframe();
        });
}

function renderPDFWithIframe() {
    const viewer = pdfViewer;
    const pdfUrl = 'Cathyrine%20Menguito%20Resume.pdf';
    
    viewer.innerHTML = `
        <iframe src="${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0" 
                style="width:100%;height:600px;border:none;display:block;"
                loading="lazy"
                onerror="this.style.display='none'; this.parentElement.querySelector('.pdf-error').style.display='flex';">
        </iframe>
        <div class="pdf-error" style="display:none;flex-direction:column;align-items:center;justify-content:center;height:500px;color:var(--text-secondary);text-align:center;padding:24px;">
            <i class="fas fa-file-pdf" style="font-size:3rem;color:var(--mint-primary);opacity:0.3;margin-bottom:16px;"></i>
            <p>Unable to preview the resume directly.</p>
            <p style="font-size:0.85rem;opacity:0.6;margin-top:4px;">Please download the PDF to view it.</p>
            <a href="${pdfUrl}" download class="btn btn-primary" style="margin-top:16px;color:#0b0e0c;">
                <i class="fas fa-download"></i> Download Resume
            </a>
        </div>
    `;
    
    // Handle iframe load error
    const iframe = viewer.querySelector('iframe');
    if (iframe) {
        iframe.addEventListener('error', () => {
            iframe.style.display = 'none';
            const errorDiv = viewer.querySelector('.pdf-error');
            if (errorDiv) errorDiv.style.display = 'flex';
        });
    }
}

// Open resume modal
if (resumePreviewBtn) {
    resumePreviewBtn.addEventListener('click', (e) => {
        e.preventDefault();
        resumeModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        loadPDFViewer();
    });
}

// Close resume modal
function closeResumeModal() {
    resumeModal.classList.remove('active');
    document.body.style.overflow = '';
}

if (resumeModalClose) {
    resumeModalClose.addEventListener('click', closeResumeModal);
}

if (resumeModalCloseBtn) {
    resumeModalCloseBtn.addEventListener('click', closeResumeModal);
}

resumeModal.addEventListener('click', (e) => {
    if (e.target === resumeModal) {
        closeResumeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
        closeResumeModal();
    }
});
