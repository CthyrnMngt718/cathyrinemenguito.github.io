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
// 5. VISITOR COUNTER
// ============================================
async function getVisitorCount() {
    const countElement = document.getElementById('visitor-count');
    if (!countElement) return;
    
    try {
        const response = await fetch('https://api.countapi.xyz/hit/cthyrnmngt718/visits');
        const data = await response.json();
        countElement.textContent = data.value || 0;
    } catch (error) {
        let count = parseInt(localStorage.getItem('visitorCount') || '0');
        count++;
        localStorage.setItem('visitorCount', count);
        countElement.textContent = count;
    }
}
getVisitorCount();

// ============================================
// 6. QUOTE OF THE DAY (Motivational + Bible Verses)
// ============================================
const quotes = [
    // ===== MOTIVATIONAL QUOTES =====
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", type: "motivational" },
    { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs", type: "motivational" },
    { text: "The best way to predict the future is to create it.", author: "Peter Drucker", type: "motivational" },
    { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci", type: "motivational" },
    { text: "Learning never exhausts the mind.", author: "Leonardo da Vinci", type: "motivational" },
    { text: "Design is not just what it looks like, it's how it works.", author: "Steve Jobs", type: "motivational" },
    { text: "The art of being wise is the art of knowing what to overlook.", author: "William James", type: "motivational" },
    { text: "Technology is best when it brings people together.", author: "Matt Mullenweg", type: "motivational" },
    { text: "The only constant in technology is change.", author: "Unknown", type: "motivational" },
    { text: "Code is like poetry. It should be clean, elegant, and tell a story.", author: "Unknown", type: "motivational" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill", type: "motivational" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt", type: "motivational" },
    { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius", type: "motivational" },
    { text: "The secret of getting ahead is getting started.", author: "Mark Twain", type: "motivational" },
    { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs", type: "motivational" },
    { text: "The only person you are destined to become is the person you decide to be.", author: "Ralph Waldo Emerson", type: "motivational" },
    { text: "What you get by achieving your goals is not as important as what you become by achieving your goals.", author: "Zig Ziglar", type: "motivational" },
    { text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis", type: "motivational" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt", type: "motivational" },
    { text: "Dream big and dare to fail.", author: "Norman Vaughan", type: "motivational" },

    // ===== BIBLE VERSES =====
    { text: "I can do all things through Christ who strengthens me.", author: "Philippians 4:13", type: "bible" },
    { text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.", author: "Jeremiah 29:11", type: "bible" },
    { text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.", author: "Joshua 1:9", type: "bible" },
    { text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.", author: "Proverbs 3:5-6", type: "bible" },
    { text: "The Lord is my shepherd; I shall not want.", author: "Psalm 23:1", type: "bible" },
    { text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.", author: "Philippians 4:6", type: "bible" },
    { text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.", author: "John 3:16", type: "bible" },
    { text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles.", author: "Isaiah 40:31", type: "bible" },
    { text: "The Lord is my light and my salvation—whom shall I fear?", author: "Psalm 27:1", type: "bible" },
    { text: "Be still, and know that I am God.", author: "Psalm 46:10", type: "bible" },
    { text: "For I am convinced that neither death nor life... will be able to separate us from the love of God that is in Christ Jesus our Lord.", author: "Romans 8:38-39", type: "bible" },
    { text: "Let your light shine before others, that they may see your good deeds and glorify your Father in heaven.", author: "Matthew 5:16", type: "bible" },
    { text: "The fear of the Lord is the beginning of wisdom, and knowledge of the Holy One is understanding.", author: "Proverbs 9:10", type: "bible" },
    { text: "Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit.", author: "Matthew 28:19", type: "bible" },
    { text: "Love the Lord your God with all your heart and with all your soul and with all your mind and with all your strength.", author: "Mark 12:30", type: "bible" },
    { text: "The peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.", author: "Philippians 4:7", type: "bible" },
    { text: "For we walk by faith, not by sight.", author: "2 Corinthians 5:7", type: "bible" },
    { text: "The Lord will fight for you; you need only to be still.", author: "Exodus 14:14", type: "bible" },
    { text: "Do not conform to the pattern of this world, but be transformed by the renewing of your mind.", author: "Romans 12:2", type: "bible" },
    { text: "Above all else, guard your heart, for everything you do flows from it.", author: "Proverbs 4:23", type: "bible" },
];

function displayQuote() {
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    const quoteType = document.getElementById('quote-type');
    
    if (!quoteText) return;
    
    // Get today's date and use it as seed
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
    
    // Cycle through quotes based on day of year
    const quoteIndex = dayOfYear % quotes.length;
    
    const selectedQuote = quotes[quoteIndex];
    quoteText.textContent = selectedQuote.text;
    quoteAuthor.textContent = `— ${selectedQuote.author}`;
    
    // Update type badge
    if (quoteType) {
        if (selectedQuote.type === 'bible') {
            quoteType.innerHTML = '<i class="fas fa-bible"></i> Verse of the Day';
            quoteType.style.color = '#ffdd44';
            quoteType.style.borderColor = 'rgba(255, 221, 68, 0.3)';
            quoteType.style.background = 'rgba(255, 221, 68, 0.1)';
        } else {
            quoteType.innerHTML = '<i class="fas fa-quote-right"></i> Quote of the Day';
            quoteType.style.color = 'var(--mint-primary)';
            quoteType.style.borderColor = 'var(--border-mint)';
            quoteType.style.background = 'rgba(0, 255, 171, 0.08)';
        }
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
// 13. DARK/LIGHT MODE TOGGLE
// ============================================
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'dark';

if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    if (themeToggle) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        themeToggle.innerHTML = theme === 'light' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
}

// ============================================
// 14. ANIMATED STATS COUNTERS
// ============================================
const stats = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stat = entry.target;
            const text = stat.textContent;
            const isPlus = text.includes('+');
            const target = parseInt(text.replace('+', ''));
            let current = 0;
            const increment = Math.ceil(target / 60);
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = isPlus ? current + '+' : current;
            }, 20);
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
// 16. CONFETTI EFFECT
// ============================================
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
        
        setTimeout(() => {
            confetti.remove();
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
// 18. FILTER BUTTONS (Projects Page)
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
// 22. RADAR CHART
// ============================================
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
    const ctx = canvas.getContext('2d');
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const textColor = isLight ? '#0b1a14' : '#e8f5ed';
    const gridColor = isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)';

    new Chart(ctx, {
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

document.addEventListener('DOMContentLoaded', loadRadarChart);

const themeToggle2 = document.getElementById('theme-toggle');
if (themeToggle2) {
    themeToggle2.addEventListener('click', () => {
        setTimeout(loadRadarChart, 300);
    });
}

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
