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
// 2. 3D TILT EFFECT ON CARDS
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
// 3. LIVE STATUS
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
// 4. VISITOR COUNTER (with session check)
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
// 5. QUOTE OF THE DAY (Bible Verses)
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
// 6. MOBILE MENU TOGGLE
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
// 7. SCROLL PROGRESS BAR
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
// 8. VERSATILE SCROLL BUTTON
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
// 9. SCROLL REVEAL
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
// 10. ACTIVE NAV LINK (updated for sections)
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinks2 = document.querySelectorAll('.nav-links a');

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
// 11. FORM SUBMISSION HANDLER (AJAX)
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
// 12. DARK/LIGHT MODE TOGGLE (Dark Mode Default)
// ============================================
const themeToggle = document.getElementById('theme-toggle');

const getPreferredTheme = () => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
    }
    return 'dark';
};

const currentTheme = getPreferredTheme();

if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    if (themeToggle) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
} else {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeToggle) {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
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
// 13. ANIMATED STATS COUNTERS
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
// 14. PARTICLE BACKGROUND
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
// 15. CONFETTI EFFECT (with cleanup)
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
// 16. SKILLS BAR ANIMATION
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
// 17. FILTER BUTTONS (Projects Page)
// ============================================
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
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
// 18. PAGE LOADER (Robust)
// ============================================
function hideLoader() {
    const loader = document.getElementById('page-loader');
    if (loader) {
        loader.classList.add('hidden');
        console.log('✅ Loader hidden');
    }
}

// Try on DOMContentLoaded (faster)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(hideLoader, 300);
    });
} else {
    // If DOM already loaded
    setTimeout(hideLoader, 300);
}

// Fallback: hide after 2 seconds even if nothing else works
setTimeout(hideLoader, 2000);

// Also keep the original load event for safety
window.addEventListener('load', () => {
    setTimeout(hideLoader, 100);
});

// ============================================
// 19. KEYBOARD NAVIGATION
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
// 20. CAROUSEL
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
// 21. RADAR CHART (Lazy Load + Theme Update)
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
// 22. DYNAMIC STYLES
// ============================================
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    @keyframes confettiFall {
        0% { transform: translateY(0) rotate(0deg) scale(1); opacity: 1; }
        100% { transform: translateY(100vh) rotate(720deg) scale(0.2); opacity: 0; }
    }
    @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
    }
`;
document.head.appendChild(dynamicStyles);

// ============================================
// 23. TYPEWRITER EFFECT
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
// 24. CLICK RIPPLE EFFECT
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
// 25. DYNAMIC COPYRIGHT YEAR
// ============================================
const yearElement = document.getElementById('year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// ============================================
// 26. HIDE-ON-SCROLL NAVIGATION
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
// 27. RESUME PDF PREVIEW MODAL
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
                style="width:100%;height:100%;min-height:400px;border:none;display:block;"
                loading="lazy"
                onerror="this.style.display='none'; this.parentElement.querySelector('.pdf-error').style.display='flex';">
        </iframe>
        <div class="pdf-error" style="display:none;flex-direction:column;align-items:center;justify-content:center;height:400px;color:var(--text-secondary);text-align:center;padding:24px;gap:12px;">
            <i class="fas fa-file-pdf" style="font-size:3.5rem;color:var(--text-secondary);opacity:0.3;"></i>
            <p style="font-size:0.95rem;margin:0;">Resume preview unavailable.</p>
            <p style="font-size:0.85rem;opacity:0.6;margin:0;">Use the Download button below to view the full PDF.</p>
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
// 28. SERVICE WORKER REGISTRATION
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
// I18N TRANSLATIONS DICTIONARY
// ============================================
const translations = {
    en: {
        // Loader
        loader_text: "Loading...",
        skip_link: "Skip to main content",
        // Navigation
        nav_home: "Home",
        nav_projects: "Projects",
        nav_about: "About",
        nav_contact: "Contact",
        // Hero
        hero_title: "Hi, I'm <span class='gradient-text'>Cathyrine Menguito</span>",
        hero_description: "I'm a recent Computer Science graduate with a growing interest in web development, UI/UX, and technology. My academic projects gave me opportunities to build web-based systems and explore how thoughtful design can make technology easier and more useful. I'm excited to keep learning, gain real-world experience, and begin my journey in the IT industry.",
        hero_btn_projects: "Projects",
        hero_btn_contact: "Contact Me",
        scroll_text: "Scroll",
        stat_projects: "Projects",
        stat_experience: "Year Experience",
        stat_certifications: "Certifications",
        live_status: "Currently exploring: React.js & Tailwind CSS",
        floating_cta: "Let's Talk",
        // Quote
        quote_label: "Verse of the Day",
        // Services
        services_tag: "What I Can Help With",
        services_title_prefix: "Areas I Can",
        services_title_gradient: "Contribute",
        service_1_title: "Web Development",
        service_1_desc: "Developing responsive and functional websites and web-based applications using technologies such as HTML, CSS, JavaScript, PHP, and MySQL.",
        service_2_title: "UI/UX & Interface Design",
        service_2_desc: "Designing clean and intuitive user interfaces with attention to usability, organization, and the overall user experience.",
        service_3_title: "Academic System Development",
        service_3_desc: "Providing technical assistance for academic and capstone projects, including web-based systems, system interfaces, and related development tasks.",
        service_4_title: "Technical Documentation",
        service_4_desc: "Assisting with system documentation, technical diagrams, project presentations, and other documentation related to software projects.",
        service_5_title: "Branding & Visual Identity",
        service_5_desc: "Creating cohesive visual identities including logo design, color palettes, typography systems, and brand guidelines that help businesses and projects stand out with a consistent and memorable presence.",
        // Experience
        exp_tag: "Experience",
        exp_title_prefix: "My",
        exp_title_gradient: "Career Journey",
        exp_company_1: "Real IT OPC",
        exp_role_1: "Operations & Client Success Officer | System Developer",
        exp_date_1: "2026 – Present",
        exp_desc_1: "Contributing to the development of web-based systems and digital solutions, including system functionality, user interface implementation, and project-related technical work. This role allows me to apply my Computer Science knowledge to practical projects while continuing to strengthen my technical and professional skills.",
        exp_hl_1_1: "System Development",
        exp_hl_1_2: "UI/UX Implementation",
        exp_hl_1_3: "Front-End Development",
        exp_hl_1_4: "Project Coordination",
        exp_hl_1_5: "Client Collaboration",
        exp_company_2: "Skyline CATV Industries",
        exp_role_2: "Executive Agent",
        exp_date_2: "2018 – 2020",
        exp_desc_2: "Delivered professional customer support by handling inquiries, resolving service-related concerns, and coordinating requests to ensure customer satisfaction and efficient operations.",
        exp_hl_2_1: "Customer Support",
        exp_hl_2_2: "Service Resolution",
        exp_hl_2_3: "Client Coordination",
        // About
        about_tag: "About Me",
        about_title_prefix: "Passionate About Building",
        about_title_gradient: "Meaningful Solutions",
        about_p1: "I'm Cathyrine Menguito, a Bachelor of Science in Computer Science graduate from Renaissance School of Science and Technology, Inc. I have a growing interest in web development, user interface design, and creating practical technology solutions that address real-world needs.",
        about_p2: "Throughout my academic journey, I gained hands-on experience through software development projects, particularly in building web-based systems. I worked on projects involving healthcare management, career assessment, and other practical applications, where I developed my foundation in front-end development, interface design, and user experience.",
        about_p3: "I also hold a TESDA National Certificate II in Computer Systems Servicing and have developed experience in leadership, collaboration, and project-based work. As I begin my professional journey, I am continuously learning and strengthening my technical skills while looking for opportunities to contribute, gain real-world experience, and grow as an IT professional.",
        about_badge_1: "TESDA NC II – Computer Systems Servicing",
        about_badge_2: "Outstanding System Design",
        about_badge_3: "Class President 2024–2025",
        about_btn_preview: "Preview Resume",
        about_btn_download: "Download PDF",
        skills_tech_title: "Technical Skills",
        skills_tools_title: "Tools & Technologies",
        skills_prof_title: "Skill Proficiency",
        skills_radar_title: "Skill Distribution",
        // Education
        edu_tag: "Education",
        edu_title_prefix: "My",
        edu_title_gradient: "Academic Journey",
        edu_tertiary_tag: "Tertiary",
        edu_tertiary_year: "2022 – 2026",
        edu_tertiary_title: "Bachelor of Science in Computer Science",
        edu_tertiary_school: "Renaissance School of Science and Technology, Inc.",
        edu_tertiary_loc: "Morong, Rizal",
        edu_ach_1: "Outstanding System Design",
        edu_ach_2: "Outstanding Thesis Writing",
        edu_ach_3: "Best in CS Practicum",
        edu_ach_4: "Best in OJT Narrative",
        edu_ach_5: "Loyalty Award",
        edu_shs_tag: "Senior High",
        edu_shs_year: "2021 – 2022",
        edu_shs_title: "HUMSS Strand",
        edu_shs_school: "Renaissance School of Science and Technology, Inc.",
        edu_shs_loc: "Morong, Rizal",
        edu_shs_ach: "With Honors (Grade 11 – 12)",
        edu_jhs_school: "Morong National High School",
        edu_jhs_loc: "Morong, Rizal",
        edu_jhs_year: "2019 – 2020",
        edu_jhs_tag: "Junior High",
        edu_jhs_year2: "2015 – 2019",
        edu_jhs_title: "Junior High School",
        edu_jhs_school2: "Morong National High School",
        edu_jhs_loc2: "Morong, Rizal",
        edu_elem_tag: "Elementary",
        edu_elem_year: "2009 – 2015",
        edu_elem_title: "Elementary School",
        edu_elem_school: "Tomas Claudio Memorial Elementary School",
        edu_elem_loc: "Morong, Rizal",
        edu_cert_tag: "Certification",
        edu_cert_date: "May 8, 2024",
        edu_cert_title: "National Certificate II (NC II)",
        edu_cert_sub: "Computer Systems Servicing (CSS)",
        edu_cert_org: "TESDA",
        edu_cert_badge: "Certified",
        // Timeline
        timeline_tag: "Journey",
        timeline_title_prefix: "Project",
        timeline_title_gradient: "Timeline",
        tl_1_title: "RHU Morong Health System",
        tl_1_desc: "Academic thesis project - a healthcare management system for the Rural Health Unit of Morong, Rizal. Co-developed with Ariel B. Eubanas, Jr. Received Outstanding System Design and Outstanding Thesis Writing awards.",
        tl_2_title: "Angono NHS Career Assessment",
        tl_2_desc: "An independently developed academic project - a web-based career assessment tool designed to help incoming Senior High School students explore suitable SHS strands based on their interests and skills.",
        tl_3_title: "HowCan‑i‑Help",
        tl_3_desc: "Professional project developed at Real IT OPC in collaboration with Kenji Akira Bergaño and Ariel B. Eubanas, Jr. A healthcare and assistance platform actively used in clinic workflows.",
        tl_4_title: "RITREMIS",
        tl_4_desc: "Professional project developed at Real IT OPC in collaboration with Kenji Akira Bergaño and Ariel B. Eubanas, Jr. A real estate management and property information platform.",
        // Team
        team_tag: "Collaboration",
        team_title_prefix: "People I've",
        team_title_gradient: "Worked With",
        team_sub: "I thrive on teamwork. Here are some of the talented developers I've collaborated with.",
        team_role_1: "Full Stack Web Developer",
        team_company_1: "Real IT OPC",
        team_role_2: "Project Lead / Full Stack Web Developer",
        team_company_2: "Real IT OPC",
        // Clients
        client_title_prefix: "Have a",
        client_title_gradient: "Web System",
        client_title_suffix: "or Digital Project in Mind?",
        client_desc: "I work with a development team to build practical web-based systems and applications for businesses, organizations, and project teams. We focus on functional solutions, user-friendly interfaces, and systems designed around specific requirements.",
        client_svc_1: "Custom Web Applications",
        client_svc_2: "Web-Based Systems",
        client_svc_3: "Application-Based Systems",
        client_svc_4: "UI/UX Design",
        client_svc_5: "System Maintenance",
        client_btn: "Discuss a Project",
        // Projects Section
        projects_tag: "Portfolio",
        projects_title: "Projects",
        projects_sub: "A collection of academic and professional work showcasing my growth in web development, system design, and collaborative problem-solving.",
        filter_all: "All",
        filter_healthcare: "Healthcare",
        filter_education: "Education",
        filter_realestate: "Real Estate",
        visit_project: "Visit Project",
        projects_cta: "Let's Work Together",
        // Project details
        proj_1_title: "RHU Morong Health System",
        proj_1_full: "A comprehensive healthcare management platform built as our thesis project. This system digitized patient intake, appointment scheduling, and record management for the Rural Health Unit of Morong, Rizal.<br /><br /><strong>My Contribution:</strong> Spearheaded the front-end architecture and user interface design, ensuring a seamless experience for healthcare personnel. Collaborated closely with my co-developer on back-end integration and system optimization.<br /><br /><strong>Recognition:</strong> Received the <strong>Outstanding System Design</strong> and <strong>Outstanding Thesis Writing</strong> awards for our work.",
        proj_1_contrib_label: "My Contribution",
        proj_1_contrib: "Spearheaded the front-end architecture and user interface design, ensuring a seamless experience for healthcare personnel. Collaborated closely with my co-developer on back-end integration and system optimization.",
        proj_1_recog_label: "Recognition",
        proj_1_recog: "Received the <strong>Outstanding System Design</strong> and <strong>Outstanding Thesis Writing</strong> awards for our work.",
        proj_2_title: "Angono NHS Career Assessment",
        proj_2_full: "A web-based career guidance tool developed to help incoming Senior High School students identify their SHS strand. The system evaluates students' interests, skills, and academic inclinations to provide data-driven recommendations.<br /><br /><strong>My Role:</strong> Developed the system independently, working on the database, front-end, system features, and deployment. This project gave me hands-on experience in building a complete web application and helped me better understand how its different parts work together. It also improved my development and problem-solving skills.<br /><br /><strong>Impact:</strong> Successfully assessed over 50 students, helping them make informed decisions about their academic pathways.",
        proj_2_role_label: "My Role",
        proj_2_role: "Developed the system independently, working on the database, front-end, system features, and deployment. This project gave me hands-on experience in building a complete web application and helped me better understand how its different parts work together. It also improved my development and problem-solving skills.",
        proj_2_impact_label: "Impact",
        proj_2_impact: "Successfully assessed over 50 students, helping them make informed decisions about their academic pathways.",
        proj_3_title: "HowCan‑i‑Help",
        proj_3_full: "A multi-tenant healthcare ecosystem that bridges the gap between patients, clinics, and community support networks. The platform streamlines clinical operations, donor coordination, and patient outreach through a centralized digital infrastructure.<br /><br /><strong>Project Context:</strong> Developed as part of my professional work at <strong>Real IT OPC</strong>, where I collaborated with senior developers to bring this solution from concept to production. Currently deployed and actively supporting clinic workflows.<br /><br /><strong>Key Achievement:</strong> The system has been fully integrated into the daily operations of partner clinics, replacing manual processes with efficient digital records management.",
        proj_3_context_label: "Project Context",
        proj_3_context: "Developed as part of my professional work at <strong>Real IT OPC</strong>, where I collaborated with senior developers to bring this solution from concept to production. Currently deployed and actively supporting clinic workflows.",
        proj_3_ach_label: "Key Achievement",
        proj_3_ach: "The system has been fully integrated into the daily operations of partner clinics, replacing manual processes with efficient digital records management.",
        proj_4_title: "RITREMIS",
        proj_4_full: "A comprehensive real estate management information system designed to centralize property records, streamline transactions, and provide stakeholders with real-time visibility into property portfolios.<br /><br /><strong>Project Context:</strong> Currently in active development at <strong>Real IT OPC</strong>, built in collaboration with our development team.<br /><br /><strong>My Focus:</strong> Front-end implementation, UI/UX design, and ensuring a responsive, intuitive interface for property managers and clients.",
        proj_4_context_label: "Project Context",
        proj_4_context: "Currently in active development at <strong>Real IT OPC</strong>, built in collaboration with our development team.",
        proj_4_focus_label: "My Focus",
        proj_4_focus: "Front-end implementation, UI/UX design, and ensuring a responsive, intuitive interface for property managers and clients.",
        // Contact
        contact_tag: "Contact",
        contact_title_prefix: "Get In",
        contact_title_gradient: "Touch",
        contact_sub: "I'm always open to new opportunities, collaborations, or just a friendly chat. Feel free to reach out!",
        contact_location: "Morong, Rizal, Philippines",
        form_name: "Your Name",
        form_email: "Your Email",
        form_message: "Your Message",
        form_submit: "Send Message",
        success_title: "Thank You!",
        success_msg: "Your message has been sent. I'll get back to you soon!",
        // Resume Modal
        resume_doc_label: "Document",
        resume_title: "My Resume",
        resume_sub: "Cathyrine Menguito — Computer Science Graduate",
        resume_personal_title: "Personal Details",
        resume_personal_sub: "Contact and location information",
        resume_field_name: "Full Name",
        resume_field_email: "Email",
        resume_field_phone: "Phone",
        resume_field_location: "Location",
        resume_loc_val: "Morong, Rizal, Philippines",
        resume_pdf_title: "Resume PDF",
        resume_pdf_sub: "Full document preview",
        resume_loading: "Loading resume preview...",
        resume_download_btn: "Download PDF",
        resume_close_btn: "Close",
        // Footer
        footer_name: "Cathyrine Menguito",
        footer_title: "Computer Science Graduate · Web Developer · UI/UX Designer",
        footer_copy: "Cathyrine Menguito. All rights reserved.",
        footer_badge: "Available for opportunities",
        visitor_label: "visitors",
        scroll_tooltip: "Scroll Down"
    },
    fil: {
        loader_text: "Naglo-load...",
        skip_link: "Laktawan sa pangunahing nilalaman",
        nav_home: "Tahanan",
        nav_projects: "Mga Proyekto",
        nav_about: "Tungkol",
        nav_contact: "Kontak",
        hero_title: "Hi, Ako si <span class='gradient-text'>Cathyrine Menguito</span>",
        hero_description: "Ako ay isang bagong graduate ng Computer Science na may lumalaking interes sa web development, UI/UX, at teknolohiya. Ang aking mga akademikong proyekto ay nagbigay sa akin ng pagkakataong bumuo ng mga web-based system at tuklasin kung paano ang maingat na disenyo ay makapagpapadali at makapagpapahusay sa teknolohiya. Sabik akong patuloy na matuto, makakuha ng totoong karanasan sa industriya, at simulan ang aking paglalakbay sa IT.",
        hero_btn_projects: "Mga Proyekto",
        hero_btn_contact: "Kontakin Ako",
        scroll_text: "Mag-scroll",
        stat_projects: "Proyekto",
        stat_experience: "Taon ng Karanasan",
        stat_certifications: "Sertipikasyon",
        live_status: "Kasalukuyang nag-e-explore: React.js at Tailwind CSS",
        floating_cta: "Mag-usap Tayo",
        quote_label: "Talata ng Araw",
        services_tag: "Ano ang Maaari Kong Makatulong",
        services_title_prefix: "Mga Lugar na Maari Kong",
        services_title_gradient: "Maambag",
        service_1_title: "Web Development",
        service_1_desc: "Pagbuo ng mga responsive at functional na website at web-based na aplikasyon gamit ang HTML, CSS, JavaScript, PHP, at MySQL.",
        service_2_title: "UI/UX at Disenyo ng Interface",
        service_2_desc: "Pagdisenyo ng malinis at intuitive na user interface na may pansin sa usability, organisasyon, at pangkalahatang karanasan ng user.",
        service_3_title: "Pagbuo ng Akademikong Sistema",
        service_3_desc: "Pagtulong sa mga proyektong akademiko at capstone, kabilang ang mga web-based system, system interface, at kaugnay na gawain sa pagbuo.",
        service_4_title: "Teknikal na Dokumentasyon",
        service_4_desc: "Tulong sa dokumentasyon ng system, teknikal na diagram, presentasyon ng proyekto, at iba pang dokumentasyong may kaugnayan sa software.",
        service_5_title: "Pagba-brand at Visual Identity",
        service_5_desc: "Paggawa ng magkakaugnay na visual identity kabilang ang logo design, color palette, typography system, at brand guidelines na tumutulong sa mga negosyo at proyekto na maging kakaiba at di-malilimutan.",
        exp_tag: "Karanasan",
        exp_title_prefix: "Ang Aking",
        exp_title_gradient: "Karera",
        exp_company_1: "Real IT OPC",
        exp_role_1: "Operations & Client Success Officer | System Developer",
        exp_date_1: "2026 – Kasalukuyan",
        exp_desc_1: "Nag-aambag sa pagbuo ng web-based system at digital solutions, kabilang ang functionality ng system, pagpapatupad ng user interface, at teknikal na gawain sa proyekto. Ang tungkuling ito ay nagbibigay-daan sa akin na ilapat ang aking kaalaman sa Computer Science sa mga praktikal na proyekto habang patuloy na pinapaunlad ang aking teknikal at propesyonal na kasanayan.",
        exp_hl_1_1: "Pagbuo ng System",
        exp_hl_1_2: "Pagpapatupad ng UI/UX",
        exp_hl_1_3: "Front-End Development",
        exp_hl_1_4: "Koordinasyon ng Proyekto",
        exp_hl_1_5: "Pakikipagtulungan sa Kliyente",
        exp_company_2: "Skyline CATV Industries",
        exp_role_2: "Executive Agent",
        exp_date_2: "2018 – 2020",
        exp_desc_2: "Nagbigay ng propesyonal na suporta sa customer sa pamamagitan ng paghawak ng mga tanong, pagresolba ng mga alalahanin sa serbisyo, at pagkoordina ng mga kahilingan upang matiyak ang kasiyahan ng customer at mahusay na operasyon.",
        exp_hl_2_1: "Suporta sa Customer",
        exp_hl_2_2: "Resolba sa Serbisyo",
        exp_hl_2_3: "Koordinasyon sa Kliyente",
        about_tag: "Tungkol sa Akin",
        about_title_prefix: "Masigasig sa Pagbuo ng",
        about_title_gradient: "Makabuluhang Solusyon",
        about_p1: "Ako si Cathyrine Menguito, graduate ng Bachelor of Science in Computer Science mula sa Renaissance School of Science and Technology, Inc. May lumalaking interes ako sa web development, disenyo ng user interface, at paglikha ng praktikal na solusyon sa teknolohiya na tumutugon sa pangangailangan ng tunay na mundo.",
        about_p2: "Sa buong akademikong paglalakbay ko, nakakuha ako ng hands-on na karanasan sa pamamagitan ng mga proyekto sa pagbuo ng software, lalo na sa paggawa ng web-based system. Nagtrabaho ako sa mga proyektong may kinalaman sa pamamahala ng pangangalagang pangkalusugan, career assessment, at iba pang praktikal na aplikasyon, kung saan binuo ko ang aking pundasyon sa front-end development, disenyo ng interface, at karanasan ng user.",
        about_p3: "Mayroon din akong TESDA National Certificate II sa Computer Systems Servicing at nakabuo ng karanasan sa pamumuno, pakikipagtulungan, at gawaing nakabatay sa proyekto. Habang sinisimulan ko ang aking propesyonal na paglalakbay, patuloy akong natututo at nagpapalakas ng aking teknikal na kasanayan habang naghahanap ng mga oportunidad upang makapag-ambag, makakuha ng totoong karanasan, at lumago bilang isang propesyonal sa IT.",
        about_badge_1: "TESDA NC II – Computer Systems Servicing",
        about_badge_2: "Natatanging Disenyo ng System",
        about_badge_3: "Pangulo ng Klase 2024–2025",
        about_btn_preview: "Silipin ang Resume",
        about_btn_download: "I-download ang PDF",
        skills_tech_title: "Teknikal na Kasanayan",
        skills_tools_title: "Mga Tool at Teknolohiya",
        skills_prof_title: "Antas ng Kasanayan",
        skills_radar_title: "Distribusyon ng Kasanayan",
        edu_tag: "Edukasyon",
        edu_title_prefix: "Ang Aking",
        edu_title_gradient: "Akademikong Paglalakbay",
        edu_tertiary_tag: "Tersyarya",
        edu_tertiary_year: "2022 – 2026",
        edu_tertiary_title: "Bachelor of Science in Computer Science",
        edu_tertiary_school: "Renaissance School of Science and Technology, Inc.",
        edu_tertiary_loc: "Morong, Rizal",
        edu_ach_1: "Natatanging Disenyo ng System",
        edu_ach_2: "Natatanging Pagsulat ng Tesis",
        edu_ach_3: "Pinakamahusay sa CS Practicum",
        edu_ach_4: "Pinakamahusay sa OJT Narrative",
        edu_ach_5: "Gantimpala sa Katapatan",
        edu_shs_tag: "Senior High",
        edu_shs_year: "2021 – 2022",
        edu_shs_title: "HUMSS Strand",
        edu_shs_school: "Renaissance School of Science and Technology, Inc.",
        edu_shs_loc: "Morong, Rizal",
        edu_shs_ach: "May Karangalan (Baitang 11 – 12)",
        edu_jhs_school: "Morong National High School",
        edu_jhs_loc: "Morong, Rizal",
        edu_jhs_year: "2019 – 2020",
        edu_jhs_tag: "Junior High",
        edu_jhs_year2: "2015 – 2019",
        edu_jhs_title: "Junior High School",
        edu_jhs_school2: "Morong National High School",
        edu_jhs_loc2: "Morong, Rizal",
        edu_elem_tag: "Elementarya",
        edu_elem_year: "2009 – 2015",
        edu_elem_title: "Elementary School",
        edu_elem_school: "Tomas Claudio Memorial Elementary School",
        edu_elem_loc: "Morong, Rizal",
        edu_cert_tag: "Sertipikasyon",
        edu_cert_date: "Mayo 8, 2024",
        edu_cert_title: "National Certificate II (NC II)",
        edu_cert_sub: "Computer Systems Servicing (CSS)",
        edu_cert_org: "TESDA",
        edu_cert_badge: "Sertipikado",
        timeline_tag: "Paglalakbay",
        timeline_title_prefix: "Proyekto",
        timeline_title_gradient: "Timeline",
        tl_1_title: "RHU Morong Health System",
        tl_1_desc: "Akademikong proyekto ng tesis - isang healthcare management system para sa Rural Health Unit ng Morong, Rizal. Ko-develop kasama si Ariel B. Eubanas, Jr. Nakatanggap ng Outstanding System Design at Outstanding Thesis Writing awards.",
        tl_2_title: "Angono NHS Career Assessment",
        tl_2_desc: "Isang independiyenteng binuong akademikong proyekto - isang web-based na career assessment tool na idinisenyo upang tulungan ang mga papasok na Senior High School students na tuklasin ang angkop na SHS strand batay sa kanilang interes at kasanayan.",
        tl_3_title: "HowCan‑i‑Help",
        tl_3_desc: "Propesyonal na proyekto na binuo sa Real IT OPC sa pakikipagtulungan nina Kenji Akira Bergaño at Ariel B. Eubanas, Jr. Isang healthcare at assistance platform na aktibong ginagamit sa mga clinic workflow.",
        tl_4_title: "RITREMIS",
        tl_4_desc: "Propesyonal na proyekto na binuo sa Real IT OPC sa pakikipagtulungan nina Kenji Akira Bergaño at Ariel B. Eubanas, Jr. Isang real estate management at property information platform.",
        team_tag: "Pakikipagtulungan",
        team_title_prefix: "Mga Taong Nakasama",
        team_title_gradient: "Ko",
        team_sub: "Umaarangkada ako sa pagtutulungan. Narito ang ilan sa mga mahuhusay na developer na nakasama ko.",
        team_role_1: "Full Stack Web Developer",
        team_company_1: "Real IT OPC",
        team_role_2: "Project Lead / Full Stack Web Developer",
        team_company_2: "Real IT OPC",
        client_title_prefix: "May",
        client_title_gradient: "Web System",
        client_title_suffix: "o Digital na Proyekto sa Isip?",
        client_desc: "Nakikipagtulungan ako sa isang development team upang bumuo ng praktikal na web-based system at aplikasyon para sa mga negosyo, organisasyon, at project team. Nakatuon kami sa functional na solusyon, user-friendly na interface, at system na dinisenyo ayon sa tiyak na pangangailangan.",
        client_svc_1: "Custom Web Applications",
        client_svc_2: "Web-Based Systems",
        client_svc_3: "Application-Based Systems",
        client_svc_4: "UI/UX Design",
        client_svc_5: "System Maintenance",
        client_btn: "Pag-usapan ang Proyekto",
        projects_tag: "Portfolio",
        projects_title: "Mga Proyekto",
        projects_sub: "Isang koleksyon ng akademiko at propesyonal na gawa na nagpapakita ng aking paglago sa web development, disenyo ng system, at collaborative na paglutas ng problema.",
        filter_all: "Lahat",
        filter_healthcare: "Pangangalagang Pangkalusugan",
        filter_education: "Edukasyon",
        filter_realestate: "Real Estate",
        visit_project: "Tingnan ang Proyekto",
        projects_cta: "Magtrabaho Tayo",
        proj_1_title: "RHU Morong Health System",
        proj_1_full: "Isang komprehensibong healthcare management platform na binuo bilang aming thesis project. Dinigitalisa ng system na ito ang pagtanggap ng pasyente, pag-iskedyul ng appointment, at pamamahala ng rekord para sa Rural Health Unit ng Morong, Rizal.<br /><br /><strong>Kontribusyon Ko:</strong> Namuno sa front-end architecture at disenyo ng user interface, tinitiyak ang maayos na karanasan para sa mga healthcare personnel. Nakipagtulungan nang malapit sa aking co-developer sa back-end integration at system optimization.<br /><br /><strong>Pagkilala:</strong> Nakatanggap ng <strong>Outstanding System Design</strong> at <strong>Outstanding Thesis Writing</strong> na mga parangal para sa aming gawa.",
        proj_1_contrib_label: "Kontribusyon Ko",
        proj_1_contrib: "Namuno sa front-end architecture at disenyo ng user interface, tinitiyak ang maayos na karanasan para sa mga healthcare personnel. Nakipagtulungan nang malapit sa aking co-developer sa back-end integration at system optimization.",
        proj_1_recog_label: "Pagkilala",
        proj_1_recog: "Nakatanggap ng <strong>Outstanding System Design</strong> at <strong>Outstanding Thesis Writing</strong> na mga parangal para sa aming gawa.",
        proj_2_title: "Angono NHS Career Assessment",
        proj_2_full: "Isang web-based career guidance tool na binuo upang tulungan ang mga papasok na Senior High School students na matukoy ang kanilang SHS strand. Sinusuri ng system ang mga interes, kasanayan, at akademikong hilig ng mga estudyante upang makapagbigay ng rekomendasyong batay sa datos.<br /><br /><strong>Tungkulin Ko:</strong> Binuo ang system nang independiyente, nagtrabaho sa database, front-end, mga feature ng system, at deployment. Ang proyektong ito ay nagbigay sa akin ng hands-on na karanasan sa pagbuo ng isang kumpletong web application at nakatulong sa akin na mas maunawaan kung paano nagtutulungan ang iba't ibang bahagi nito. Napabuti rin nito ang aking mga kasanayan sa pagbuo at paglutas ng problema.<br /><br /><strong>Epekto:</strong> Matagumpay na na-assess ang mahigit 50 estudyante, na tumulong sa kanila na makagawa ng may kaalamang desisyon tungkol sa kanilang akademikong landas.",
        proj_2_role_label: "Tungkulin Ko",
        proj_2_role: "Binuo ang system nang independiyente, nagtrabaho sa database, front-end, mga feature ng system, at deployment. Ang proyektong ito ay nagbigay sa akin ng hands-on na karanasan sa pagbuo ng isang kumpletong web application at nakatulong sa akin na mas maunawaan kung paano nagtutulungan ang iba't ibang bahagi nito. Napabuti rin nito ang aking mga kasanayan sa pagbuo at paglutas ng problema.",
        proj_2_impact_label: "Epekto",
        proj_2_impact: "Matagumpay na na-assess ang mahigit 50 estudyante, na tumulong sa kanila na makagawa ng may kaalamang desisyon tungkol sa kanilang akademikong landas.",
        proj_3_title: "HowCan‑i‑Help",
        proj_3_full: "Isang multi-tenant healthcare ecosystem na nag-uugnay sa mga pasyente, klinika, at community support network. Pinapadali ng platform ang clinical operations, donor coordination, at patient outreach sa pamamagitan ng sentralisadong digital infrastructure.<br /><br /><strong>Konteksto ng Proyekto:</strong> Binuo bilang bahagi ng aking propesyonal na trabaho sa <strong>Real IT OPC</strong>, kung saan nakipagtulungan ako sa mga senior developer upang dalhin ang solusyong ito mula sa konsepto tungo sa produksyon. Kasalukuyang naka-deploy at aktibong sumusuporta sa mga clinic workflow.<br /><br /><strong>Mahalagang Nakamit:</strong> Ang system ay ganap nang isinama sa pang-araw-araw na operasyon ng mga partner clinic, pinapalitan ang manwal na proseso ng mahusay na digital records management.",
        proj_3_context_label: "Konteksto ng Proyekto",
        proj_3_context: "Binuo bilang bahagi ng aking propesyonal na trabaho sa <strong>Real IT OPC</strong>, kung saan nakipagtulungan ako sa mga senior developer upang dalhin ang solusyong ito mula sa konsepto tungo sa produksyon. Kasalukuyang naka-deploy at aktibong sumusuporta sa mga clinic workflow.",
        proj_3_ach_label: "Mahalagang Nakamit",
        proj_3_ach: "Ang system ay ganap nang isinama sa pang-araw-araw na operasyon ng mga partner clinic, pinapalitan ang manwal na proseso ng mahusay na digital records management.",
        proj_4_title: "RITREMIS",
        proj_4_full: "Isang komprehensibong real estate management information system na idinisenyo upang sentralisahin ang mga rekord ng ari-arian, pasimplehin ang mga transaksyon, at magbigay sa mga stakeholder ng real-time na visibility sa mga portfolio ng ari-arian.<br /><br /><strong>Konteksto ng Proyekto:</strong> Kasalukuyang aktibong binuo sa <strong>Real IT OPC</strong>, sa pakikipagtulungan ng aming development team.<br /><br /><strong>Pokus Ko:</strong> Front-end implementation, UI/UX design, at pagtiyak ng responsive at intuitive na interface para sa mga property manager at kliyente.",
        proj_4_context_label: "Konteksto ng Proyekto",
        proj_4_context: "Kasalukuyang aktibong binuo sa <strong>Real IT OPC</strong>, sa pakikipagtulungan ng aming development team.",
        proj_4_focus_label: "Pokus Ko",
        proj_4_focus: "Front-end implementation, UI/UX design, at pagtiyak ng responsive at intuitive na interface para sa mga property manager at kliyente.",
        contact_tag: "Kontak",
        contact_title_prefix: "Makipag-",
        contact_title_gradient: "Ugnayan",
        contact_sub: "Palagi akong bukas sa mga bagong oportunidad, pakikipagtulungan, o simpleng magiliw na usapan. Huwag mag-atubiling makipag-ugnayan!",
        contact_location: "Morong, Rizal, Pilipinas",
        form_name: "Iyong Pangalan",
        form_email: "Iyong Email",
        form_message: "Iyong Mensahe",
        form_submit: "Magpadala ng Mensahe",
        success_title: "Salamat!",
        success_msg: "Naipadala na ang iyong mensahe. Babalikan kita sa lalong madaling panahon!",
        resume_doc_label: "Dokumento",
        resume_title: "Aking Resume",
        resume_sub: "Cathyrine Menguito — Graduate ng Computer Science",
        resume_personal_title: "Personal na Detalye",
        resume_personal_sub: "Impormasyon sa pakikipag-ugnayan at lokasyon",
        resume_field_name: "Buong Pangalan",
        resume_field_email: "Email",
        resume_field_phone: "Telepono",
        resume_field_location: "Lokasyon",
        resume_loc_val: "Morong, Rizal, Pilipinas",
        resume_pdf_title: "Resume PDF",
        resume_pdf_sub: "Buong preview ng dokumento",
        resume_loading: "Naglo-load ng resume preview...",
        resume_download_btn: "I-download ang PDF",
        resume_close_btn: "Isara",
        footer_name: "Cathyrine Menguito",
        footer_title: "Graduate ng Computer Science · Web Developer · UI/UX Designer",
        footer_copy: "Cathyrine Menguito. Nakalaan ang lahat ng karapatan.",
        footer_badge: "Bukas sa mga oportunidad",
        visitor_label: "mga bisita",
        scroll_tooltip: "Mag-scroll Pababa"
    },
    ko: {
        loader_text: "로딩 중...",
        skip_link: "본문으로 건너뛰기",
        nav_home: "홈",
        nav_projects: "프로젝트",
        nav_about: "소개",
        nav_contact: "연락처",
        hero_title: "안녕하세요, 저는 <span class='gradient-text'>Cathyrine Menguito</span>입니다",
        hero_description: "저는 웹 개발, UI/UX, 기술에 대한 관심이 커지고 있는 최근 컴퓨터 과학 졸업생입니다. 학업 프로젝트를 통해 웹 기반 시스템을 구축하고, 세심한 디자인이 기술을 더 쉽고 유용하게 만드는 방법을 탐구할 기회를 얻었습니다. 계속해서 배우고, 실제 경험을 쌓고, IT 업계에서의 여정을 시작하게 되어 기쁩니다.",
        hero_btn_projects: "프로젝트",
        hero_btn_contact: "연락하기",
        scroll_text: "스크롤",
        stat_projects: "프로젝트",
        stat_experience: "년 경력",
        stat_certifications: "자격증",
        live_status: "현재 탐색 중: React.js 및 Tailwind CSS",
        floating_cta: "대화하기",
        quote_label: "오늘의 말씀",
        services_tag: "도움을 드릴 수 있는 분야",
        services_title_prefix: "제가 기여할 수 있는",
        services_title_gradient: "영역",
        service_1_title: "웹 개발",
        service_1_desc: "HTML, CSS, JavaScript, PHP, MySQL과 같은 기술을 사용하여 반응형 및 기능적인 웹사이트와 웹 기반 애플리케이션을 개발합니다.",
        service_2_title: "UI/UX 및 인터페이스 디자인",
        service_2_desc: "사용성, 구성, 전반적인 사용자 경험에 주의를 기울여 깔끔하고 직관적인 사용자 인터페이스를 디자인합니다.",
        service_3_title: "학술 시스템 개발",
        service_3_desc: "웹 기반 시스템, 시스템 인터페이스 및 관련 개발 작업을 포함한 학술 및 캡스톤 프로젝트에 대한 기술 지원을 제공합니다.",
        service_4_title: "기술 문서화",
        service_4_desc: "시스템 문서화, 기술 다이어그램, 프로젝트 프레젠테이션 및 소프트웨어 프로젝트 관련 기타 문서를 지원합니다.",
        service_5_title: "브랜딩 및 시각적 아이덴티티",
        service_5_desc: "로고 디자인, 색상 팔레트, 타이포그래피 시스템 및 브랜드 가이드라인을 포함한 일관된 시각적 아이덴티티를 만들어 비즈니스와 프로젝트가 차별화되고 기억에 남을 수 있도록 돕습니다.",
        exp_tag: "경력",
        exp_title_prefix: "나의",
        exp_title_gradient: "경력 경로",
        exp_company_1: "Real IT OPC",
        exp_role_1: "운영 및 고객 성공 책임자 | 시스템 개발자",
        exp_date_1: "2026 – 현재",
        exp_desc_1: "웹 기반 시스템 및 디지털 솔루션 개발에 기여하고 있으며, 시스템 기능, 사용자 인터페이스 구현 및 프로젝트 관련 기술 작업을 포함합니다. 이 역할을 통해 컴퓨터 과학 지식을 실제 프로젝트에 적용하고 기술 및 전문 역량을 지속적으로 강화할 수 있습니다.",
        exp_hl_1_1: "시스템 개발",
        exp_hl_1_2: "UI/UX 구현",
        exp_hl_1_3: "프런트엔드 개발",
        exp_hl_1_4: "프로젝트 조정",
        exp_hl_1_5: "고객 협업",
        exp_company_2: "Skyline CATV Industries",
        exp_role_2: "임원 에이전트",
        exp_date_2: "2018 – 2020",
        exp_desc_2: "문의 처리, 서비스 관련 문제 해결, 요청 조정을 통해 전문적인 고객 지원을 제공하여 고객 만족과 효율적인 운영을 보장했습니다.",
        exp_hl_2_1: "고객 지원",
        exp_hl_2_2: "서비스 해결",
        exp_hl_2_3: "고객 조정",
        about_tag: "소개",
        about_title_prefix: "의미 있는 솔루션 구축에",
        about_title_gradient: "열정적인",
        about_p1: "저는 Renaissance School of Science and Technology, Inc.에서 컴퓨터 과학 학사 학위를 취득한 Cathyrine Menguito입니다. 웹 개발, 사용자 인터페이스 디자인, 실제 문제를 해결하는 실용적인 기술 솔루션 창출에 점점 더 관심을 가지게 되었습니다.",
        about_p2: "학업 과정 동안 소프트웨어 개발 프로젝트, 특히 웹 기반 시스템 구축을 통해 실무 경험을 쌓았습니다. 의료 관리, 진로 평가 및 기타 실용적인 애플리케이션과 관련된 프로젝트에 참여하여 프런트엔드 개발, 인터페이스 디자인 및 사용자 경험에 대한 기초를 다졌습니다.",
        about_p3: "또한 TESDA 국가기술자격증 2급(컴퓨터 시스템 서비스)을 보유하고 있으며, 리더십, 협업 및 프로젝트 기반 업무에 대한 경험을 쌓았습니다. 전문적인 여정을 시작하면서 기술 역량을 지속적으로 학습하고 강화하며, 기여하고 실제 경험을 쌓고 IT 전문가로 성장할 기회를 찾고 있습니다.",
        about_badge_1: "TESDA NC II – 컴퓨터 시스템 서비스",
        about_badge_2: "우수 시스템 설계",
        about_badge_3: "2024–2025 학급 회장",
        about_btn_preview: "이력서 미리보기",
        about_btn_download: "PDF 다운로드",
        skills_tech_title: "기술 역량",
        skills_tools_title: "도구 및 기술",
        skills_prof_title: "숙련도",
        skills_radar_title: "기술 분포",
        edu_tag: "교육",
        edu_title_prefix: "나의",
        edu_title_gradient: "학업 여정",
        edu_tertiary_tag: "대학",
        edu_tertiary_year: "2022 – 2026",
        edu_tertiary_title: "컴퓨터 과학 학사",
        edu_tertiary_school: "Renaissance School of Science and Technology, Inc.",
        edu_tertiary_loc: "모롱, 리살",
        edu_ach_1: "우수 시스템 설계",
        edu_ach_2: "우수 논문 작성",
        edu_ach_3: "최우수 CS 실습",
        edu_ach_4: "최우수 OJT 보고서",
        edu_ach_5: "충성도 상",
        edu_shs_tag: "고등학교",
        edu_shs_year: "2021 – 2022",
        edu_shs_title: "HUMSS 트랙",
        edu_shs_school: "Renaissance School of Science and Technology, Inc.",
        edu_shs_loc: "모롱, 리살",
        edu_shs_ach: "우등 (11~12학년)",
        edu_jhs_school: "Morong National High School",
        edu_jhs_loc: "모롱, 리살",
        edu_jhs_year: "2019 – 2020",
        edu_jhs_tag: "중학교",
        edu_jhs_year2: "2015 – 2019",
        edu_jhs_title: "중학교",
        edu_jhs_school2: "Morong National High School",
        edu_jhs_loc2: "모롱, 리살",
        edu_elem_tag: "초등학교",
        edu_elem_year: "2009 – 2015",
        edu_elem_title: "초등학교",
        edu_elem_school: "Tomas Claudio Memorial Elementary School",
        edu_elem_loc: "모롱, 리살",
        edu_cert_tag: "자격증",
        edu_cert_date: "2024년 5월 8일",
        edu_cert_title: "국가기술자격증 2급 (NC II)",
        edu_cert_sub: "컴퓨터 시스템 서비스 (CSS)",
        edu_cert_org: "TESDA",
        edu_cert_badge: "인증됨",
        timeline_tag: "여정",
        timeline_title_prefix: "프로젝트",
        timeline_title_gradient: "타임라인",
        tl_1_title: "RHU Morong 건강 시스템",
        tl_1_desc: "학술 논문 프로젝트 - Morong, Rizal의 Rural Health Unit을 위한 의료 관리 시스템. Ariel B. Eubanas, Jr.와 공동 개발. 우수 시스템 설계 및 우수 논문 작성 상 수상.",
        tl_2_title: "Angono NHS 진로 평가",
        tl_2_desc: "독립적으로 개발된 학술 프로젝트 - 입학 예정인 고등학생들이 자신의 관심사와 기술에 따라 적합한 SHS 트랙을 탐색할 수 있도록 설계된 웹 기반 진로 평가 도구.",
        tl_3_title: "HowCan‑i‑Help",
        tl_3_desc: "Real IT OPC에서 Kenji Akira Bergaño 및 Ariel B. Eubanas, Jr.와 협력하여 개발한 전문 프로젝트. 클리닉 워크플로우에서 활발히 사용되는 의료 및 지원 플랫폼.",
        tl_4_title: "RITREMIS",
        tl_4_desc: "Real IT OPC에서 Kenji Akira Bergaño 및 Ariel B. Eubanas, Jr.와 협력하여 개발한 전문 프로젝트. 부동산 관리 및 자산 정보 플랫폼.",
        team_tag: "협업",
        team_title_prefix: "함께 작업한",
        team_title_gradient: "사람들",
        team_sub: "저는 팀워크에서 활력을 얻습니다. 제가 협력한 재능 있는 개발자들입니다.",
        team_role_1: "풀스택 웹 개발자",
        team_company_1: "Real IT OPC",
        team_role_2: "프로젝트 리드 / 풀스택 웹 개발자",
        team_company_2: "Real IT OPC",
        client_title_prefix: "웹 시스템이나",
        client_title_gradient: "디지털 프로젝트",
        client_title_suffix: "아이디어가 있으신가요?",
        client_desc: "저는 개발 팀과 협력하여 비즈니스, 조직, 프로젝트 팀을 위한 실용적인 웹 기반 시스템과 애플리케이션을 구축합니다. 우리는 기능적 솔루션, 사용자 친화적인 인터페이스, 특정 요구 사항에 맞춰 설계된 시스템에 중점을 둡니다.",
        client_svc_1: "맞춤형 웹 애플리케이션",
        client_svc_2: "웹 기반 시스템",
        client_svc_3: "애플리케이션 기반 시스템",
        client_svc_4: "UI/UX 디자인",
        client_svc_5: "시스템 유지보수",
        client_btn: "프로젝트 논의하기",
        projects_tag: "포트폴리오",
        projects_title: "프로젝트",
        projects_sub: "웹 개발, 시스템 설계 및 협력적 문제 해결에서의 성장을 보여주는 학술 및 전문 작업 모음입니다.",
        filter_all: "전체",
        filter_healthcare: "의료",
        filter_education: "교육",
        filter_realestate: "부동산",
        visit_project: "프로젝트 방문",
        projects_cta: "함께 작업합시다",
        proj_1_title: "RHU Morong 건강 시스템",
        proj_1_full: "학위 논문 프로젝트로 구축된 포괄적인 의료 관리 플랫폼입니다. 이 시스템은 Morong, Rizal의 Rural Health Unit을 위해 환자 접수, 예약 일정, 기록 관리를 디지털화했습니다.<br /><br /><strong>제 기여:</strong> 의료진에게 원활한 경험을 보장하기 위해 프런트엔드 아키텍처와 사용자 인터페이스 디자인을 주도했습니다. 백엔드 통합 및 시스템 최적화를 위해 공동 개발자와 긴밀히 협력했습니다.<br /><br /><strong>수상:</strong> <strong>우수 시스템 설계</strong> 및 <strong>우수 논문 작성</strong> 상을 수상했습니다.",
        proj_1_contrib_label: "제 기여",
        proj_1_contrib: "의료진에게 원활한 경험을 보장하기 위해 프런트엔드 아키텍처와 사용자 인터페이스 디자인을 주도했습니다. 백엔드 통합 및 시스템 최적화를 위해 공동 개발자와 긴밀히 협력했습니다.",
        proj_1_recog_label: "수상",
        proj_1_recog: "<strong>우수 시스템 설계</strong> 및 <strong>우수 논문 작성</strong> 상을 수상했습니다.",
        proj_2_title: "Angono NHS 진로 평가",
        proj_2_full: "입학 예정인 고등학생들이 자신의 SHS 트랙을 파악할 수 있도록 설계된 웹 기반 진로 안내 도구입니다. 이 시스템은 학생들의 관심사, 기술 및 학업 성향을 평가하여 데이터 기반 권장 사항을 제공합니다.<br /><br /><strong>제 역할:</strong> 데이터베이스, 프런트엔드, 시스템 기능 및 배포 작업을 포함하여 시스템을 독립적으로 개발했습니다. 이 프로젝트를 통해 완전한 웹 애플리케이션을 구축하는 실무 경험을 얻었고, 다양한 부분이 어떻게 협력하는지 더 잘 이해할 수 있었습니다. 또한 개발 및 문제 해결 능력이 향상되었습니다.<br /><br /><strong>영향:</strong> 50명 이상의 학생을 성공적으로 평가하여 그들이 학업 경로에 대해 정보에 기반한 결정을 내리도록 도왔습니다.",
        proj_2_role_label: "제 역할",
        proj_2_role: "데이터베이스, 프런트엔드, 시스템 기능 및 배포 작업을 포함하여 시스템을 독립적으로 개발했습니다. 이 프로젝트를 통해 완전한 웹 애플리케이션을 구축하는 실무 경험을 얻었고, 다양한 부분이 어떻게 협력하는지 더 잘 이해할 수 있었습니다. 또한 개발 및 문제 해결 능력이 향상되었습니다.",
        proj_2_impact_label: "영향",
        proj_2_impact: "50명 이상의 학생을 성공적으로 평가하여 그들이 학업 경로에 대해 정보에 기반한 결정을 내리도록 도왔습니다.",
        proj_3_title: "HowCan‑i‑Help",
        proj_3_full: "환자, 클리닉 및 지역 사회 지원 네트워크를 연결하는 멀티 테넌트 헬스케어 생태계입니다. 이 플랫폼은 중앙 집중식 디지털 인프라를 통해 임상 운영, 기증자 조정 및 환자 지원을 간소화합니다.<br /><br /><strong>프로젝트 배경:</strong> <strong>Real IT OPC</strong>에서의 전문 업무의 일환으로 개발되었으며, 시니어 개발자와 협력하여 이 솔루션을 개념에서 생산까지 이끌었습니다. 현재 배포되어 클리닉 워크플로우를 적극적으로 지원하고 있습니다.<br /><br /><strong>주요 성과:</strong> 이 시스템은 파트너 클리닉의 일상 운영에 완전히 통합되어 수동 프로세스를 효율적인 디지털 기록 관리로 대체했습니다.",
        proj_3_context_label: "프로젝트 배경",
        proj_3_context: "<strong>Real IT OPC</strong>에서의 전문 업무의 일환으로 개발되었으며, 시니어 개발자와 협력하여 이 솔루션을 개념에서 생산까지 이끌었습니다. 현재 배포되어 클리닉 워크플로우를 적극적으로 지원하고 있습니다.",
        proj_3_ach_label: "주요 성과",
        proj_3_ach: "이 시스템은 파트너 클리닉의 일상 운영에 완전히 통합되어 수동 프로세스를 효율적인 디지털 기록 관리로 대체했습니다.",
        proj_4_title: "RITREMIS",
        proj_4_full: "부동산 기록을 중앙화하고 거래를 간소화하며 이해관계자에게 자산 포트폴리오에 대한 실시간 가시성을 제공하도록 설계된 포괄적인 부동산 관리 정보 시스템입니다.<br /><br /><strong>프로젝트 배경:</strong> 현재 <strong>Real IT OPC</strong>에서 개발 팀과 협력하여 활발히 개발 중입니다.<br /><br /><strong>제 초점:</strong> 프런트엔드 구현, UI/UX 디자인, 자산 관리자와 고객을 위한 반응형이고 직관적인 인터페이스 보장.",
        proj_4_context_label: "프로젝트 배경",
        proj_4_context: "현재 <strong>Real IT OPC</strong>에서 개발 팀과 협력하여 활발히 개발 중입니다.",
        proj_4_focus_label: "제 초점",
        proj_4_focus: "프런트엔드 구현, UI/UX 디자인, 자산 관리자와 고객을 위한 반응형이고 직관적인 인터페이스 보장.",
        contact_tag: "연락처",
        contact_title_prefix: "연락",
        contact_title_gradient: "주세요",
        contact_sub: "저는 새로운 기회, 협업, 또는 단순한 대화에 항상 열려 있습니다. 언제든지 연락해 주세요!",
        contact_location: "모롱, 리살, 필리핀",
        form_name: "이름",
        form_email: "이메일",
        form_message: "메시지",
        form_submit: "메시지 보내기",
        success_title: "감사합니다!",
        success_msg: "메시지가 전송되었습니다. 곧 연락드리겠습니다!",
        resume_doc_label: "문서",
        resume_title: "이력서",
        resume_sub: "Cathyrine Menguito — 컴퓨터 과학 졸업생",
        resume_personal_title: "개인 정보",
        resume_personal_sub: "연락처 및 위치 정보",
        resume_field_name: "성명",
        resume_field_email: "이메일",
        resume_field_phone: "전화번호",
        resume_field_location: "위치",
        resume_loc_val: "모롱, 리살, 필리핀",
        resume_pdf_title: "이력서 PDF",
        resume_pdf_sub: "전체 문서 미리보기",
        resume_loading: "이력서 미리보기 로딩 중...",
        resume_download_btn: "PDF 다운로드",
        resume_close_btn: "닫기",
        footer_name: "Cathyrine Menguito",
        footer_title: "컴퓨터 과학 졸업생 · 웹 개발자 · UI/UX 디자이너",
        footer_copy: "Cathyrine Menguito. 모든 권리 보유.",
        footer_badge: "기회에 열려 있음",
        visitor_label: "방문자",
        scroll_tooltip: "아래로 스크롤"
    },
    ja: {
        loader_text: "読み込み中...",
        skip_link: "メインコンテンツへスキップ",
        nav_home: "ホーム",
        nav_projects: "プロジェクト",
        nav_about: "概要",
        nav_contact: "お問い合わせ",
        hero_title: "こんにちは、<span class='gradient-text'>Cathyrine Menguito</span>です",
        hero_description: "私は最近のコンピュータサイエンス卒業生で、ウェブ開発、UI/UX、テクノロジーにますます関心を持っています。学術プロジェクトを通じて、ウェブベースのシステムを構築し、思慮深いデザインがテクノロジーをより使いやすく、より有用にする方法を探求する機会を得ました。これからも学び続け、実務経験を積み、IT業界でのキャリアを始めることを楽しみにしています。",
        hero_btn_projects: "プロジェクト",
        hero_btn_contact: "お問い合わせ",
        scroll_text: "スクロール",
        stat_projects: "プロジェクト",
        stat_experience: "年の経験",
        stat_certifications: "認定資格",
        live_status: "現在探索中: React.js & Tailwind CSS",
        floating_cta: "話しましょう",
        quote_label: "今日の聖句",
        services_tag: "お手伝いできる分野",
        services_title_prefix: "私が貢献できる",
        services_title_gradient: "領域",
        service_1_title: "ウェブ開発",
        service_1_desc: "HTML、CSS、JavaScript、PHP、MySQLなどの技術を使用して、レスポンシブで機能的なウェブサイトやウェブベースのアプリケーションを開発します。",
        service_2_title: "UI/UXおよびインターフェースデザイン",
        service_2_desc: "ユーザビリティ、構成、全体的なユーザーエクスペリエンスに配慮した、クリーンで直感的なユーザーインターフェースをデザインします。",
        service_3_title: "学術システム開発",
        service_3_desc: "ウェブベースのシステム、システムインターフェース、関連する開発タスクを含む、学術およびキャップストーンプロジェクトの技術支援を提供します。",
        service_4_title: "技術文書作成",
        service_4_desc: "システム文書、技術図、プロジェクトプレゼンテーション、その他ソフトウェアプロジェクトに関連する文書作成を支援します。",
        service_5_title: "ブランディングとビジュアルアイデンティティ",
        service_5_desc: "ロゴデザイン、カラーパレット、タイポグラフィシステム、ブランドガイドラインを含む一貫したビジュアルアイデンティティを作成し、ビジネスやプロジェクトが際立ち、記憶に残る存在となるよう支援します。",
        exp_tag: "経歴",
        exp_title_prefix: "私の",
        exp_title_gradient: "キャリアの歩み",
        exp_company_1: "Real IT OPC",
        exp_role_1: "オペレーションズ＆クライアントサクセスオフィサー | システム開発者",
        exp_date_1: "2026 – 現在",
        exp_desc_1: "ウェブベースのシステムやデジタルソリューションの開発に貢献しており、システム機能、ユーザーインターフェースの実装、プロジェクト関連の技術作業を含みます。この役割により、コンピュータサイエンスの知識を実践的なプロジェクトに適用しながら、技術的および専門的スキルを継続的に強化することができます。",
        exp_hl_1_1: "システム開発",
        exp_hl_1_2: "UI/UX実装",
        exp_hl_1_3: "フロントエンド開発",
        exp_hl_1_4: "プロジェクト調整",
        exp_hl_1_5: "クライアント連携",
        exp_company_2: "Skyline CATV Industries",
        exp_role_2: "エグゼクティブエージェント",
        exp_date_2: "2018 – 2020",
        exp_desc_2: "問い合わせ対応、サービス関連の問題解決、リクエストの調整を通じて専門的なカスタマーサポートを提供し、顧客満足度と効率的な運用を確保しました。",
        exp_hl_2_1: "カスタマーサポート",
        exp_hl_2_2: "サービス解決",
        exp_hl_2_3: "クライアント調整",
        about_tag: "私について",
        about_title_prefix: "意味のあるソリューション構築に",
        about_title_gradient: "情熱を注ぐ",
        about_p1: "私はRenaissance School of Science and Technology, Inc.でコンピュータサイエンスの学士号を取得したCathyrine Menguitoです。ウェブ開発、ユーザーインターフェースデザイン、現実世界のニーズに対応する実用的なテクノロジーソリューションの創造にますます関心を持っています。",
        about_p2: "学業を通じて、ソフトウェア開発プロジェクト、特にウェブベースのシステム構築において実践的な経験を積みました。医療管理、キャリア評価、その他の実用的なアプリケーションに関連するプロジェクトに取り組み、フロントエンド開発、インターフェースデザイン、ユーザーエクスペリエンスの基礎を築きました。",
        about_p3: "また、TESDA National Certificate II（コンピュータシステムサービス）を保有しており、リーダーシップ、コラボレーション、プロジェクトベースの業務経験も積んでいます。専門的なキャリアを始めるにあたり、技術スキルを継続的に学習・強化しながら、貢献し、実務経験を積み、ITプロフェッショナルとして成長する機会を模索しています。",
        about_badge_1: "TESDA NC II – コンピュータシステムサービス",
        about_badge_2: "優れたシステムデザイン",
        about_badge_3: "2024–2025 クラス会長",
        about_btn_preview: "履歴書をプレビュー",
        about_btn_download: "PDFをダウンロード",
        skills_tech_title: "技術スキル",
        skills_tools_title: "ツールとテクノロジー",
        skills_prof_title: "スキル習熟度",
        skills_radar_title: "スキル分布",
        edu_tag: "教育",
        edu_title_prefix: "私の",
        edu_title_gradient: "学業の歩み",
        edu_tertiary_tag: "大学",
        edu_tertiary_year: "2022 – 2026",
        edu_tertiary_title: "コンピュータサイエンス学士",
        edu_tertiary_school: "Renaissance School of Science and Technology, Inc.",
        edu_tertiary_loc: "モロン、リサール",
        edu_ach_1: "優れたシステムデザイン",
        edu_ach_2: "優れた論文執筆",
        edu_ach_3: "CS実習最優秀賞",
        edu_ach_4: "OJTレポート最優秀賞",
        edu_ach_5: "ロイヤルティ賞",
        edu_shs_tag: "高校",
        edu_shs_year: "2021 – 2022",
        edu_shs_title: "HUMSSコース",
        edu_shs_school: "Renaissance School of Science and Technology, Inc.",
        edu_shs_loc: "モロン、リサール",
        edu_shs_ach: "優等（11～12年生）",
        edu_jhs_school: "Morong National High School",
        edu_jhs_loc: "モロン、リサール",
        edu_jhs_year: "2019 – 2020",
        edu_jhs_tag: "中学校",
        edu_jhs_year2: "2015 – 2019",
        edu_jhs_title: "中学校",
        edu_jhs_school2: "Morong National High School",
        edu_jhs_loc2: "モロン、リサール",
        edu_elem_tag: "小学校",
        edu_elem_year: "2009 – 2015",
        edu_elem_title: "小学校",
        edu_elem_school: "Tomas Claudio Memorial Elementary School",
        edu_elem_loc: "モロン、リサール",
        edu_cert_tag: "認定資格",
        edu_cert_date: "2024年5月8日",
        edu_cert_title: "国家資格2級 (NC II)",
        edu_cert_sub: "コンピュータシステムサービス (CSS)",
        edu_cert_org: "TESDA",
        edu_cert_badge: "認定済み",
        timeline_tag: "歩み",
        timeline_title_prefix: "プロジェクト",
        timeline_title_gradient: "タイムライン",
        tl_1_title: "RHU Morong 医療システム",
        tl_1_desc: "学術論文プロジェクト - モロン、リサールの地方医療ユニット向けの医療管理システム。Ariel B. Eubanas, Jr.と共同開発。優れたシステムデザインおよび優れた論文執筆賞を受賞。",
        tl_2_title: "Angono NHS キャリア評価",
        tl_2_desc: "独立して開発した学術プロジェクト - 新入生の高校生が自分の興味やスキルに基づいて適切なSHSコースを探求できるように設計されたウェブベースのキャリア評価ツール。",
        tl_3_title: "HowCan‑i‑Help",
        tl_3_desc: "Real IT OPCでKenji Akira BergañoおよびAriel B. Eubanas, Jr.と協力して開発した専門プロジェクト。クリニックのワークフローで積極的に使用されている医療および支援プラットフォーム。",
        tl_4_title: "RITREMIS",
        tl_4_desc: "Real IT OPCでKenji Akira BergañoおよびAriel B. Eubanas, Jr.と協力して開発した専門プロジェクト。不動産管理および物件情報プラットフォーム。",
        team_tag: "コラボレーション",
        team_title_prefix: "一緒に働いた",
        team_title_gradient: "人々",
        team_sub: "私はチームワークで力を発揮します。ここに私が協力した才能ある開発者たちをご紹介します。",
        team_role_1: "フルスタックウェブ開発者",
        team_company_1: "Real IT OPC",
        team_role_2: "プロジェクトリード / フルスタックウェブ開発者",
        team_company_2: "Real IT OPC",
        client_title_prefix: "ウェブシステムや",
        client_title_gradient: "デジタルプロジェクトの",
        client_title_suffix: "アイデアはありますか？",
        client_desc: "私は開発チームと協力して、ビジネス、組織、プロジェクトチーム向けの実用的なウェブベースのシステムやアプリケーションを構築します。機能的なソリューション、ユーザーフレンドリーなインターフェース、特定の要件に基づいて設計されたシステムに焦点を当てています。",
        client_svc_1: "カスタムウェブアプリケーション",
        client_svc_2: "ウェブベースのシステム",
        client_svc_3: "アプリケーションベースのシステム",
        client_svc_4: "UI/UXデザイン",
        client_svc_5: "システムメンテナンス",
        client_btn: "プロジェクトについて話し合う",
        projects_tag: "ポートフォリオ",
        projects_title: "プロジェクト",
        projects_sub: "ウェブ開発、システムデザイン、協調的問題解決における成長を示す学術および専門的な作品集です。",
        filter_all: "すべて",
        filter_healthcare: "医療",
        filter_education: "教育",
        filter_realestate: "不動産",
        visit_project: "プロジェクトを見る",
        projects_cta: "一緒に働きましょう",
        proj_1_title: "RHU Morong 医療システム",
        proj_1_full: "私たちの論文プロジェクトとして構築された包括的な医療管理プラットフォームです。このシステムは、モロン、リサールの地方医療ユニットの患者受付、予約スケジュール、記録管理をデジタル化しました。<br /><br /><strong>私の貢献:</strong> 医療従事者にシームレスな体験を提供するために、フロントエンドアーキテクチャとユーザーインターフェースデザインを主導しました。バックエンド統合とシステム最適化について共同開発者と緊密に連携しました。<br /><br /><strong>受賞:</strong> <strong>優れたシステムデザイン</strong>および<strong>優れた論文執筆</strong>賞を受賞しました。",
        proj_1_contrib_label: "私の貢献",
        proj_1_contrib: "医療従事者にシームレスな体験を提供するために、フロントエンドアーキテクチャとユーザーインターフェースデザインを主導しました。バックエンド統合とシステム最適化について共同開発者と緊密に連携しました。",
        proj_1_recog_label: "受賞",
        proj_1_recog: "<strong>優れたシステムデザイン</strong>および<strong>優れた論文執筆</strong>賞を受賞しました。",
        proj_2_title: "Angono NHS キャリア評価",
        proj_2_full: "新入生の高校生が自分のSHSコースを特定できるように設計されたウェブベースのキャリアガイダンスツールです。このシステムは、学生の興味、スキル、学業の適性を評価し、データに基づいた推奨事項を提供します。<br /><br /><strong>私の役割:</strong> データベース、フロントエンド、システム機能、デプロイメントを含め、システムを独立して開発しました。このプロジェクトにより、完全なウェブアプリケーションを構築する実践的な経験を得て、各部分がどのように連携するかをより深く理解できました。また、開発および問題解決スキルも向上しました。<br /><br /><strong>インパクト:</strong> 50人以上の学生を正常に評価し、彼らが学業の道について情報に基づいた決定を下すのを支援しました。",
        proj_2_role_label: "私の役割",
        proj_2_role: "データベース、フロントエンド、システム機能、デプロイメントを含め、システムを独立して開発しました。このプロジェクトにより、完全なウェブアプリケーションを構築する実践的な経験を得て、各部分がどのように連携するかをより深く理解できました。また、開発および問題解決スキルも向上しました。",
        proj_2_impact_label: "インパクト",
        proj_2_impact: "50人以上の学生を正常に評価し、彼らが学業の道について情報に基づいた決定を下すのを支援しました。",
        proj_3_title: "HowCan‑i‑Help",
        proj_3_full: "患者、クリニック、コミュニティサポートネットワークを結ぶマルチテナントの医療エコシステムです。このプラットフォームは、集中型デジタルインフラを通じて臨床運用、ドナー調整、患者アウトリーチを効率化します。<br /><br /><strong>プロジェクトの背景:</strong> <strong>Real IT OPC</strong>での専門業務の一環として開発され、シニア開発者と協力してこのソリューションをコンセプトから本番まで導きました。現在、展開され、クリニックのワークフローを積極的にサポートしています。<br /><br /><strong>主な成果:</strong> このシステムはパートナークリニックの日常業務に完全に統合され、手動プロセスを効率的なデジタル記録管理に置き換えました。",
        proj_3_context_label: "プロジェクトの背景",
        proj_3_context: "<strong>Real IT OPC</strong>での専門業務の一環として開発され、シニア開発者と協力してこのソリューションをコンセプトから本番まで導きました。現在、展開され、クリニックのワークフローを積極的にサポートしています。",
        proj_3_ach_label: "主な成果",
        proj_3_ach: "このシステムはパートナークリニックの日常業務に完全に統合され、手動プロセスを効率的なデジタル記録管理に置き換えました。",
        proj_4_title: "RITREMIS",
        proj_4_full: "不動産記録を一元化し、取引を合理化し、ステークホルダーに不動産ポートフォリオのリアルタイムな可視性を提供するように設計された包括的な不動産管理情報システムです。<br /><br /><strong>プロジェクトの背景:</strong> 現在、<strong>Real IT OPC</strong>で開発チームと協力して積極的に開発中です。<br /><br /><strong>私の焦点:</strong> フロントエンド実装、UI/UXデザイン、物件管理者とクライアント向けのレスポンシブで直感的なインターフェースの確保。",
        proj_4_context_label: "プロジェクトの背景",
        proj_4_context: "現在、<strong>Real IT OPC</strong>で開発チームと協力して積極的に開発中です。",
        proj_4_focus_label: "私の焦点",
        proj_4_focus: "フロントエンド実装、UI/UXデザイン、物件管理者とクライアント向けのレスポンシブで直感的なインターフェースの確保。",
        contact_tag: "お問い合わせ",
        contact_title_prefix: "お",
        contact_title_gradient: "問い合わせ",
        contact_sub: "新しい機会、コラボレーション、または気軽な会話にも常にオープンです。お気軽にご連絡ください！",
        contact_location: "モロン、リサール、フィリピン",
        form_name: "お名前",
        form_email: "メールアドレス",
        form_message: "メッセージ",
        form_submit: "メッセージを送信",
        success_title: "ありがとうございます！",
        success_msg: "メッセージが送信されました。すぐにご連絡いたします！",
        resume_doc_label: "書類",
        resume_title: "履歴書",
        resume_sub: "Cathyrine Menguito — コンピュータサイエンス卒業生",
        resume_personal_title: "個人情報",
        resume_personal_sub: "連絡先および所在地情報",
        resume_field_name: "氏名",
        resume_field_email: "メール",
        resume_field_phone: "電話番号",
        resume_field_location: "所在地",
        resume_loc_val: "モロン、リサール、フィリピン",
        resume_pdf_title: "履歴書PDF",
        resume_pdf_sub: "完全な書類プレビュー",
        resume_loading: "履歴書プレビューを読み込み中...",
        resume_download_btn: "PDFをダウンロード",
        resume_close_btn: "閉じる",
        footer_name: "Cathyrine Menguito",
        footer_title: "コンピュータサイエンス卒業生 · Web開発者 · UI/UXデザイナー",
        footer_copy: "Cathyrine Menguito. All rights reserved.",
        footer_badge: "機会を募集中",
        visitor_label: "訪問者",
        scroll_tooltip: "下へスクロール"
    },
    th: {
        loader_text: "กำลังโหลด...",
        skip_link: "ข้ามไปยังเนื้อหาหลัก",
        nav_home: "หน้าแรก",
        nav_projects: "โปรเจกต์",
        nav_about: "เกี่ยวกับ",
        nav_contact: "ติดต่อ",
        hero_title: "สวัสดี ฉันคือ <span class='gradient-text'>Cathyrine Menguito</span>",
        hero_description: "ฉันเป็นผู้สำเร็จการศึกษาสาขาวิทยาการคอมพิวเตอร์รุ่นใหม่ที่มีความสนใจในการพัฒนาเว็บ, UI/UX และเทคโนโลยี โปรเจกต์ในรั้วมหาวิทยาลัยเปิดโอกาสให้ฉันได้สร้างระบบเว็บและสำรวจว่าการออกแบบที่รอบคอบจะทำให้เทคโนโลยีใช้งานง่ายและมีประโยชน์มากขึ้นได้อย่างไร ฉันตื่นเต้นที่จะเรียนรู้ต่อไป, รับประสบการณ์จริง, และเริ่มต้นเส้นทางในวงการ IT",
        hero_btn_projects: "โปรเจกต์",
        hero_btn_contact: "ติดต่อฉัน",
        scroll_text: "เลื่อน",
        stat_projects: "โปรเจกต์",
        stat_experience: "ปีประสบการณ์",
        stat_certifications: "ประกาศนียบัตร",
        live_status: "กำลังสำรวจ: React.js และ Tailwind CSS",
        floating_cta: "มาคุยกัน",
        quote_label: "ข้อพระคัมภีร์ประจำวัน",
        services_tag: "สิ่งที่ฉันช่วยได้",
        services_title_prefix: "ด้านที่ฉันสามารถ",
        services_title_gradient: "มีส่วนร่วม",
        service_1_title: "การพัฒนาเว็บ",
        service_1_desc: "พัฒนาเว็บไซต์และแอปพลิเคชันเว็บที่ตอบสนองและใช้งานได้จริงด้วยเทคโนโลยีเช่น HTML, CSS, JavaScript, PHP และ MySQL",
        service_2_title: "UI/UX และการออกแบบส่วนติดต่อ",
        service_2_desc: "ออกแบบส่วนติดต่อผู้ใช้ที่สะอาดและใช้งานง่าย โดยให้ความสำคัญกับความเป็นมิตรต่อผู้ใช้, การจัดระเบียบ, และประสบการณ์ผู้ใช้โดยรวม",
        service_3_title: "การพัฒนาระบบวิชาการ",
        service_3_desc: "ให้ความช่วยเหลือทางเทคนิคสำหรับโปรเจกต์ทางวิชาการและโปรเจกต์จบการศึกษา รวมถึงระบบเว็บ, ส่วนติดต่อระบบ, และงานพัฒนาที่เกี่ยวข้อง",
        service_4_title: "เอกสารทางเทคนิค",
        service_4_desc: "ช่วยเหลือด้านเอกสารระบบ, แผนภาพทางเทคนิค, การนำเสนอโปรเจกต์, และเอกสารอื่นๆ ที่เกี่ยวข้องกับโปรเจกต์ซอฟต์แวร์",
        service_5_title: "การสร้างแบรนด์และเอกลักษณ์ทางภาพ",
        service_5_desc: "สร้างเอกลักษณ์ทางภาพที่สอดคล้องกัน รวมถึงการออกแบบโลโก้, ชุดสี, ระบบตัวอักษร, และแนวทางแบรนด์ เพื่อช่วยให้ธุรกิจและโปรเจกต์โดดเด่นและน่าจดจำ",
        exp_tag: "ประสบการณ์",
        exp_title_prefix: "เส้นทาง",
        exp_title_gradient: "อาชีพของฉัน",
        exp_company_1: "Real IT OPC",
        exp_role_1: "เจ้าหน้าที่ปฏิบัติการและความสำเร็จของลูกค้า | ผู้พัฒนาระบบ",
        exp_date_1: "2026 – ปัจจุบัน",
        exp_desc_1: "มีส่วนร่วมในการพัฒนาระบบเว็บและโซลูชันดิจิทัล รวมถึงฟังก์ชันการทำงานของระบบ, การใช้งานส่วนติดต่อผู้ใช้, และงานทางเทคนิคที่เกี่ยวข้องกับโปรเจกต์ บทบาทนี้ช่วยให้ฉันสามารถนำความรู้ด้านวิทยาการคอมพิวเตอร์ไปใช้ในโครงการจริง พร้อมทั้งพัฒนาทักษะทางเทคนิคและวิชาชีพอย่างต่อเนื่อง",
        exp_hl_1_1: "การพัฒนาระบบ",
        exp_hl_1_2: "การใช้งาน UI/UX",
        exp_hl_1_3: "การพัฒนา Front-End",
        exp_hl_1_4: "การประสานงานโปรเจกต์",
        exp_hl_1_5: "การร่วมงานกับลูกค้า",
        exp_company_2: "Skyline CATV Industries",
        exp_role_2: "ผู้บริหารตัวแทน",
        exp_date_2: "2018 – 2020",
        exp_desc_2: "ให้การสนับสนุนลูกค้าแบบมืออาชีพ โดยจัดการสอบถาม, แก้ไขปัญหาที่เกี่ยวข้องกับบริการ, และประสานงานคำขอเพื่อให้มั่นใจถึงความพึงพอใจของลูกค้าและการดำเนินงานที่มีประสิทธิภาพ",
        exp_hl_2_1: "การสนับสนุนลูกค้า",
        exp_hl_2_2: "การแก้ไขปัญหา",
        exp_hl_2_3: "การประสานงานกับลูกค้า",
        about_tag: "เกี่ยวกับฉัน",
        about_title_prefix: "หลงใหลในการสร้าง",
        about_title_gradient: "โซลูชันที่มีความหมาย",
        about_p1: "ฉันคือ Cathyrine Menguito, ผู้สำเร็จการศึกษาวิทยาศาสตรบัณฑิต สาขาวิทยาการคอมพิวเตอร์ จาก Renaissance School of Science and Technology, Inc. ฉันมีความสนใจในการพัฒนาเว็บ, การออกแบบส่วนติดต่อผู้ใช้ และการสร้างโซลูชันทางเทคโนโลยีที่ตอบสนองความต้องการในโลกจริง",
        about_p2: "ตลอดเส้นทางการศึกษาของฉัน ฉันได้รับประสบการณ์จริงจากโปรเจกต์พัฒนาซอฟต์แวร์ โดยเฉพาะการสร้างระบบเว็บ ฉันทำงานในโปรเจกต์ที่เกี่ยวข้องกับการจัดการสุขภาพ, การประเมินอาชีพ และแอปพลิเคชันเชิงปฏิบัติอื่นๆ ซึ่งช่วยสร้างพื้นฐานของฉันในการพัฒนา front-end, การออกแบบส่วนติดต่อ และประสบการณ์ผู้ใช้",
        about_p3: "ฉันยังมีประกาศนียบัตร TESDA ระดับชาติ II (การบริการระบบคอมพิวเตอร์) และมีประสบการณ์ในด้านภาวะผู้นำ, การทำงานร่วมกัน และการทำงานตามโปรเจกต์ ขณะเริ่มต้นเส้นทางอาชีพ ฉันยังคงเรียนรู้และเสริมสร้างทักษะทางเทคนิคของฉันอย่างต่อเนื่อง ขณะเดียวกันก็มองหาโอกาสในการมีส่วนร่วม, รับประสบการณ์จริง และเติบโตในฐานะมืออาชีพด้าน IT",
        about_badge_1: "TESDA NC II – การบริการระบบคอมพิวเตอร์",
        about_badge_2: "การออกแบบระบบยอดเยี่ยม",
        about_badge_3: "ประธานชั้นเรียน 2024–2025",
        about_btn_preview: "ดูตัวอย่างเรซูเม่",
        about_btn_download: "ดาวน์โหลด PDF",
        skills_tech_title: "ทักษะทางเทคนิค",
        skills_tools_title: "เครื่องมือและเทคโนโลยี",
        skills_prof_title: "ความเชี่ยวชาญ",
        skills_radar_title: "การกระจายทักษะ",
        edu_tag: "การศึกษา",
        edu_title_prefix: "เส้นทาง",
        edu_title_gradient: "การศึกษาของฉัน",
        edu_tertiary_tag: "อุดมศึกษา",
        edu_tertiary_year: "2022 – 2026",
        edu_tertiary_title: "วิทยาศาสตรบัณฑิต สาขาวิทยาการคอมพิวเตอร์",
        edu_tertiary_school: "Renaissance School of Science and Technology, Inc.",
        edu_tertiary_loc: "โมรอง, ริซาล",
        edu_ach_1: "การออกแบบระบบยอดเยี่ยม",
        edu_ach_2: "การเขียนวิทยานิพนธ์ยอดเยี่ยม",
        edu_ach_3: "ดีเด่นด้านการฝึกปฏิบัติ CS",
        edu_ach_4: "ดีเด่นด้านรายงาน OJT",
        edu_ach_5: "รางวัลความภักดี",
        edu_shs_tag: "มัธยมปลาย",
        edu_shs_year: "2021 – 2022",
        edu_shs_title: "สาย HUMSS",
        edu_shs_school: "Renaissance School of Science and Technology, Inc.",
        edu_shs_loc: "โมรอง, ริซาล",
        edu_shs_ach: "เกียรตินิยม (ชั้นปี 11 – 12)",
        edu_jhs_school: "Morong National High School",
        edu_jhs_loc: "โมรอง, ริซาล",
        edu_jhs_year: "2019 – 2020",
        edu_jhs_tag: "มัธยมต้น",
        edu_jhs_year2: "2015 – 2019",
        edu_jhs_title: "มัธยมต้น",
        edu_jhs_school2: "Morong National High School",
        edu_jhs_loc2: "โมรอง, ริซาล",
        edu_elem_tag: "ประถมศึกษา",
        edu_elem_year: "2009 – 2015",
        edu_elem_title: "ประถมศึกษา",
        edu_elem_school: "Tomas Claudio Memorial Elementary School",
        edu_elem_loc: "โมรอง, ริซาล",
        edu_cert_tag: "ประกาศนียบัตร",
        edu_cert_date: "8 พฤษภาคม 2024",
        edu_cert_title: "ประกาศนียบัตรวิชาชีพชั้นสูง (NC II)",
        edu_cert_sub: "การบริการระบบคอมพิวเตอร์ (CSS)",
        edu_cert_org: "TESDA",
        edu_cert_badge: "ได้รับการรับรอง",
        timeline_tag: "เส้นทาง",
        timeline_title_prefix: "โปรเจกต์",
        timeline_title_gradient: "ไทม์ไลน์",
        tl_1_title: "ระบบสุขภาพ RHU Morong",
        tl_1_desc: "โปรเจกต์วิทยานิพนธ์ทางวิชาการ - ระบบการจัดการสุขภาพสำหรับหน่วยสุขภาพชนบทของโมรอง, ริซาล ร่วมพัฒนากับ Ariel B. Eubanas, Jr. ได้รับรางวัลการออกแบบระบบยอดเยี่ยมและการเขียนวิทยานิพนธ์ยอดเยี่ยม",
        tl_2_title: "การประเมินอาชีพ Angono NHS",
        tl_2_desc: "โปรเจกต์วิชาการที่พัฒนาขึ้นเอง - เครื่องมือประเมินอาชีพบนเว็บที่ออกแบบมาเพื่อช่วยนักเรียนชั้นมัธยมปลายที่กำลังจะเข้าเรียนในการค้นหาสาย SHS ที่เหมาะสมตามความสนใจและทักษะของพวกเขา",
        tl_3_title: "HowCan‑i‑Help",
        tl_3_desc: "โปรเจกต์วิชาชีพที่พัฒนาขึ้นที่ Real IT OPC โดยร่วมมือกับ Kenji Akira Bergaño และ Ariel B. Eubanas, Jr. แพลตฟอร์มด้านสุขภาพและการช่วยเหลือที่ใช้งานจริงในเวิร์กโฟลว์คลินิก",
        tl_4_title: "RITREMIS",
        tl_4_desc: "โปรเจกต์วิชาชีพที่พัฒนาขึ้นที่ Real IT OPC โดยร่วมมือกับ Kenji Akira Bergaño และ Ariel B. Eubanas, Jr. แพลตฟอร์มการจัดการอสังหาริมทรัพย์และข้อมูลทรัพย์สิน",
        team_tag: "การทำงานร่วมกัน",
        team_title_prefix: "คนที่ฉัน",
        team_title_gradient: "เคยร่วมงานด้วย",
        team_sub: "ฉันมีพลังในการทำงานเป็นทีม นี่คือนักพัฒนาที่มีพรสวรรค์บางคนที่ฉันได้ร่วมงานด้วย",
        team_role_1: "นักพัฒนาเว็บ Full Stack",
        team_company_1: "Real IT OPC",
        team_role_2: "ผู้นำโปรเจกต์ / นักพัฒนาเว็บ Full Stack",
        team_company_2: "Real IT OPC",
        client_title_prefix: "มีโปรเจกต์",
        client_title_gradient: "ระบบเว็บ",
        client_title_suffix: "หรือดิจิทัลในใจหรือไม่?",
        client_desc: "ฉันทำงานร่วมกับทีมพัฒนาเพื่อสร้างระบบเว็บและแอปพลิเคชันที่ใช้งานได้จริงสำหรับธุรกิจ, องค์กร, และทีมโปรเจกต์ เราให้ความสำคัญกับโซลูชันที่ใช้งานได้จริง, ส่วนติดต่อที่เป็นมิตรกับผู้ใช้, และระบบที่ออกแบบตามข้อกำหนดเฉพาะ",
        client_svc_1: "แอปพลิเคชันเว็บเฉพาะ",
        client_svc_2: "ระบบเว็บ",
        client_svc_3: "ระบบตามแอปพลิเคชัน",
        client_svc_4: "การออกแบบ UI/UX",
        client_svc_5: "การบำรุงรักษาระบบ",
        client_btn: "พูดคุยเกี่ยวกับโปรเจกต์",
        projects_tag: "ผลงาน",
        projects_title: "โปรเจกต์",
        projects_sub: "ชุดผลงานทางวิชาการและวิชาชีพที่แสดงให้เห็นถึงการเติบโตของฉันในการพัฒนาเว็บ, การออกแบบระบบ, และการแก้ปัญหาร่วมกัน",
        filter_all: "ทั้งหมด",
        filter_healthcare: "การดูแลสุขภาพ",
        filter_education: "การศึกษา",
        filter_realestate: "อสังหาริมทรัพย์",
        visit_project: "เยี่ยมชมโปรเจกต์",
        projects_cta: "มาทำงานด้วยกัน",
        proj_1_title: "ระบบสุขภาพ RHU Morong",
        proj_1_full: "แพลตฟอร์มการจัดการสุขภาพที่ครอบคลุม สร้างขึ้นเป็นโปรเจกต์วิทยานิพนธ์ของเรา ระบบนี้ได้แปลงระบบรับผู้ป่วย, การนัดหมาย, และการจัดการบันทึกให้เป็นดิจิทัลสำหรับหน่วยสุขภาพชนบทของโมรอง, ริซาล<br /><br /><strong>ผลงานของฉัน:</strong> เป็นผู้นำด้านสถาปัตยกรรม front-end และการออกแบบส่วนติดต่อผู้ใช้ เพื่อให้บุคลากรทางการแพทย์ได้รับประสบการณ์ที่ราบรื่น ร่วมมืออย่างใกล้ชิดกับผู้ร่วมพัฒนาในการรวมระบบ back-end และการปรับปรุงระบบ<br /><br /><strong>การยอมรับ:</strong> ได้รับรางวัล <strong>การออกแบบระบบยอดเยี่ยม</strong> และ <strong>การเขียนวิทยานิพนธ์ยอดเยี่ยม</strong> สำหรับงานของเรา",
        proj_1_contrib_label: "ผลงานของฉัน",
        proj_1_contrib: "เป็นผู้นำด้านสถาปัตยกรรม front-end และการออกแบบส่วนติดต่อผู้ใช้ เพื่อให้บุคลากรทางการแพทย์ได้รับประสบการณ์ที่ราบรื่น ร่วมมืออย่างใกล้ชิดกับผู้ร่วมพัฒนาในการรวมระบบ back-end และการปรับปรุงระบบ",
        proj_1_recog_label: "การยอมรับ",
        proj_1_recog: "ได้รับรางวัล <strong>การออกแบบระบบยอดเยี่ยม</strong> และ <strong>การเขียนวิทยานิพนธ์ยอดเยี่ยม</strong> สำหรับงานของเรา",
        proj_2_title: "การประเมินอาชีพ Angono NHS",
        proj_2_full: "เครื่องมือแนะแนวอาชีพบนเว็บที่พัฒนาขึ้นเพื่อช่วยนักเรียนชั้นมัธยมปลายที่กำลังจะเข้าเรียนในการระบุสาย SHS ของตน ระบบจะประเมินความสนใจ, ทักษะ, และความชอบทางวิชาการของนักเรียนเพื่อให้คำแนะนำตามข้อมูล<br /><br /><strong>บทบาทของฉัน:</strong> พัฒนาระบบด้วยตนเอง ทำงานในฐานข้อมูล, front-end, ฟีเจอร์ของระบบ, และการนำไปใช้งาน โปรเจกต์นี้ทำให้ฉันได้รับประสบการณ์จริงในการสร้างแอปพลิเคชันเว็บที่สมบูรณ์ และช่วยให้ฉันเข้าใจว่าส่วนต่างๆ ทำงานร่วมกันได้อย่างไร นอกจากนี้ยังพัฒนาทักษะการพัฒนาและการแก้ปัญหาของฉัน<br /><br /><strong>ผลกระทบ:</strong> ประเมินนักเรียนมากกว่า 50 คนสำเร็จ ช่วยให้พวกเขาตัดสินใจเกี่ยวกับเส้นทางการศึกษาได้อย่างมีข้อมูล",
        proj_2_role_label: "บทบาทของฉัน",
        proj_2_role: "พัฒนาระบบด้วยตนเอง ทำงานในฐานข้อมูล, front-end, ฟีเจอร์ของระบบ, และการนำไปใช้งาน โปรเจกต์นี้ทำให้ฉันได้รับประสบการณ์จริงในการสร้างแอปพลิเคชันเว็บที่สมบูรณ์ และช่วยให้ฉันเข้าใจว่าส่วนต่างๆ ทำงานร่วมกันได้อย่างไร นอกจากนี้ยังพัฒนาทักษะการพัฒนาและการแก้ปัญหาของฉัน",
        proj_2_impact_label: "ผลกระทบ",
        proj_2_impact: "ประเมินนักเรียนมากกว่า 50 คนสำเร็จ ช่วยให้พวกเขาตัดสินใจเกี่ยวกับเส้นทางการศึกษาได้อย่างมีข้อมูล",
        proj_3_title: "HowCan‑i‑Help",
        proj_3_full: "ระบบนิเวศด้านสุขภาพแบบหลายผู้เช่าที่เชื่อมต่อผู้ป่วย, คลินิก, และเครือข่ายสนับสนุนชุมชน แพลตฟอร์มนี้ช่วยปรับปรุงการดำเนินงานทางคลินิก, การประสานงานผู้บริจาค, และการเข้าถึงผู้ป่วยผ่านโครงสร้างพื้นฐานดิจิทัลแบบรวมศูนย์<br /><br /><strong>บริบทของโปรเจกต์:</strong> พัฒนาขึ้นเป็นส่วนหนึ่งของงานวิชาชีพของฉันที่ <strong>Real IT OPC</strong> ซึ่งฉันได้ร่วมมือกับนักพัฒนาอาวุโสเพื่อนำโซลูชันนี้จากแนวคิดสู่การผลิต ปัจจุบันใช้งานจริงและสนับสนุนเวิร์กโฟลว์คลินิกอย่างแข็งขัน<br /><br /><strong>ความสำเร็จที่สำคัญ:</strong> ระบบได้ถูกรวมเข้ากับการดำเนินงานประจำวันของคลินิกพันธมิตรอย่างสมบูรณ์ แทนที่กระบวนการด้วยตนเองด้วยการจัดการบันทึกดิจิทัลที่มีประสิทธิภาพ",
        proj_3_context_label: "บริบทของโปรเจกต์",
        proj_3_context: "พัฒนาขึ้นเป็นส่วนหนึ่งของงานวิชาชีพของฉันที่ <strong>Real IT OPC</strong> ซึ่งฉันได้ร่วมมือกับนักพัฒนาอาวุโสเพื่อนำโซลูชันนี้จากแนวคิดสู่การผลิต ปัจจุบันใช้งานจริงและสนับสนุนเวิร์กโฟลว์คลินิกอย่างแข็งขัน",
        proj_3_ach_label: "ความสำเร็จที่สำคัญ",
        proj_3_ach: "ระบบได้ถูกรวมเข้ากับการดำเนินงานประจำวันของคลินิกพันธมิตรอย่างสมบูรณ์ แทนที่กระบวนการด้วยตนเองด้วยการจัดการบันทึกดิจิทัลที่มีประสิทธิภาพ",
        proj_4_title: "RITREMIS",
        proj_4_full: "ระบบสารสนเทศการจัดการอสังหาริมทรัพย์ที่ครอบคลุม ออกแบบมาเพื่อรวมศูนย์บันทึกทรัพย์สิน, ปรับปรุงธุรกรรม, และให้ผู้มีส่วนได้ส่วนเสียสามารถมองเห็นพอร์ตโฟลิโอทรัพย์สินแบบเรียลไทม์<br /><br /><strong>บริบทของโปรเจกต์:</strong> กำลังอยู่ในระหว่างการพัฒนาอย่างแข็งขันที่ <strong>Real IT OPC</strong> โดยร่วมมือกับทีมพัฒนาของเรา<br /><br /><strong>จุดเน้นของฉัน:</strong> การใช้งาน front-end, การออกแบบ UI/UX, และการรับประกันอินเทอร์เฟซที่ตอบสนองและใช้งานง่ายสำหรับผู้จัดการทรัพย์สินและลูกค้า",
        proj_4_context_label: "บริบทของโปรเจกต์",
        proj_4_context: "กำลังอยู่ในระหว่างการพัฒนาอย่างแข็งขันที่ <strong>Real IT OPC</strong> โดยร่วมมือกับทีมพัฒนาของเรา",
        proj_4_focus_label: "จุดเน้นของฉัน",
        proj_4_focus: "การใช้งาน front-end, การออกแบบ UI/UX, และการรับประกันอินเทอร์เฟซที่ตอบสนองและใช้งานง่ายสำหรับผู้จัดการทรัพย์สินและลูกค้า",
        contact_tag: "ติดต่อ",
        contact_title_prefix: "ติดต่อ",
        contact_title_gradient: "ฉัน",
        contact_sub: "ฉันเปิดรับโอกาสใหม่ๆ, การทำงานร่วมกัน, หรือเพียงแค่การพูดคุยที่เป็นกันเองเสมอ อย่าลังเลที่จะติดต่อ!",
        contact_location: "โมรอง, ริซาล, ฟิลิปปินส์",
        form_name: "ชื่อของคุณ",
        form_email: "อีเมลของคุณ",
        form_message: "ข้อความของคุณ",
        form_submit: "ส่งข้อความ",
        success_title: "ขอบคุณ!",
        success_msg: "ข้อความของคุณถูกส่งแล้ว ฉันจะติดต่อกลับโดยเร็ว!",
        resume_doc_label: "เอกสาร",
        resume_title: "เรซูเม่ของฉัน",
        resume_sub: "Cathyrine Menguito — ผู้สำเร็จการศึกษาวิทยาการคอมพิวเตอร์",
        resume_personal_title: "รายละเอียดส่วนตัว",
        resume_personal_sub: "ข้อมูลการติดต่อและที่ตั้ง",
        resume_field_name: "ชื่อเต็ม",
        resume_field_email: "อีเมล",
        resume_field_phone: "โทรศัพท์",
        resume_field_location: "ที่ตั้ง",
        resume_loc_val: "โมรอง, ริซาล, ฟิลิปปินส์",
        resume_pdf_title: "เรซูเม่ PDF",
        resume_pdf_sub: "ตัวอย่างเอกสารฉบับเต็ม",
        resume_loading: "กำลังโหลดตัวอย่างเรซูเม่...",
        resume_download_btn: "ดาวน์โหลด PDF",
        resume_close_btn: "ปิด",
        footer_name: "Cathyrine Menguito",
        footer_title: "ผู้สำเร็จการศึกษาวิทยาการคอมพิวเตอร์ · นักพัฒนาเว็บ · นักออกแบบ UI/UX",
        footer_copy: "Cathyrine Menguito. สงวนลิขสิทธิ์",
        footer_badge: "พร้อมรับโอกาส",
        visitor_label: "ผู้เยี่ยมชม",
        scroll_tooltip: "เลื่อนลง"
    }
};
// ============================================
// I18N ENGINE – INIT (runs immediately)
// ============================================
const defaultLang = 'en';
let currentLang = localStorage.getItem('preferredLang') ||
                  (navigator.language.startsWith('fil') ? 'fil' :
                   navigator.language.startsWith('ko') ? 'ko' :
                   navigator.language.startsWith('ja') ? 'ja' :
                   navigator.language.startsWith('th') ? 'th' : 'en');

function applyTranslations(lang) {
    const t = translations[lang] || translations[defaultLang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key] !== undefined) {
            el.innerHTML = t[key];
        }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (t[key] !== undefined) {
            el.placeholder = t[key];
        }
    });
    const switcher = document.getElementById('language-switcher');
    if (switcher) switcher.value = lang;
    localStorage.setItem('preferredLang', lang);
    currentLang = lang;
    updateDynamicContent(lang);
}

function updateDynamicContent(lang) {
    const t = translations[lang] || translations[defaultLang];
    const statusEl = document.querySelector('.status-text');
    if (statusEl && t.live_status) statusEl.textContent = t.live_status;
    const floatingCta = document.querySelector('.floating-cta span');
    if (floatingCta && t.floating_cta) floatingCta.textContent = t.floating_cta;
    const tooltip = document.getElementById('scroll-tooltip');
    if (tooltip && t.scroll_tooltip) tooltip.textContent = t.scroll_tooltip;
}

// --- Attach event listener to switcher ---
const switcher = document.getElementById('language-switcher');
if (switcher) {
    switcher.value = currentLang;
    switcher.addEventListener('change', (e) => {
        applyTranslations(e.target.value);
    });
}
// Apply current language immediately
applyTranslations(currentLang);

// ============================================
// REAL-TIME CLOCK (Local Time)
// ============================================
function updateClock() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    const display = document.getElementById('clock-display');
    if (display) display.textContent = timeStr;
}
updateClock();
setInterval(updateClock, 1000);

// ============================================
// PAGE TRANSITIONS (View Transitions API) - disabled for now
// ============================================
// (We keep it simple – no external page loads)
