// ============================================================
//  GLOBAL CONFIGURATION & STATE
// ============================================================
let currentLang = localStorage.getItem('lang') || 'en';
let isAppInitialized = false;
let typewriterTimeout = null;
let particlesInitialized = false;
let radarChartInstance = null;
let carouselInterval = null;

// ============================================================
//  TRANSLATIONS (i18n)
// ============================================================
const translations = {
    en: {
        // Navigation
        nav_home: "Home",
        nav_projects: "Projects",
        nav_about: "About",
        nav_contact: "Contact",
        // Hero
        hero_badge: "Available for opportunities & freelance projects",
        hero_title: "Hi, I'm <span class=\"gradient-text\">Cathyrine Menguito</span>",
        hero_description: "I'm a recent Computer Science graduate with a growing interest in web development, UI/UX, and technology. My academic projects gave me opportunities to build web-based systems and explore how thoughtful design can make technology easier and more useful. I'm excited to keep learning, gain real-world experience, and begin my journey in the IT industry.",
        hero_projects_btn: "Projects",
        hero_contact_btn: "Contact Me",
        scroll_indicator: "Scroll",
        stat_projects: "Projects",
        stat_experience: "Year Experience",
        stat_certifications: "Certifications",
        live_status: "Currently exploring: React.js & Tailwind CSS",
        floating_cta: "Let's Talk",
        scroll_down: "Scroll Down",
        // Quote
        quote_label: "Verse of the Day",
        // Services
        services_tag: "What I Can Help With",
        services_title: "Areas I Can <span class=\"gradient-text\">Contribute</span>",
        service_web_title: "Web Development",
        service_web_desc: "Developing responsive and functional websites and web-based applications using technologies such as HTML, CSS, JavaScript, PHP, and MySQL.",
        service_ui_title: "UI/UX & Interface Design",
        service_ui_desc: "Designing clean and intuitive user interfaces with attention to usability, organization, and the overall user experience.",
        service_academic_title: "Academic System Development",
        service_academic_desc: "Providing technical assistance for academic and capstone projects, including web-based systems, system interfaces, and related development tasks.",
        service_doc_title: "Technical Documentation",
        service_doc_desc: "Assisting with system documentation, technical diagrams, project presentations, and other documentation related to software projects.",
        service_brand_title: "Branding & Visual Identity",
        service_brand_desc: "Creating cohesive visual identities including logo design, color palettes, typography systems, and brand guidelines that help businesses and projects stand out with a consistent and memorable presence.",
        // Experience
        exp_tag: "Experience",
        exp_title: "My <span class=\"gradient-text\">Career Journey</span>",
        exp_role1: "Operations & Client Success Officer | System Developer",
        exp_desc1: "Contributing to the development of web-based systems and digital solutions, including system functionality, user interface implementation, and project-related technical work. This role allows me to apply my Computer Science knowledge to practical projects while continuing to strengthen my technical and professional skills.",
        exp_role2: "Executive Agent",
        exp_desc2: "Delivered professional customer support by handling inquiries, resolving service-related concerns, and coordinating requests to ensure customer satisfaction and efficient operations.",
        // About
        about_tag: "About Me",
        about_title: "Passionate About Building <span class=\"gradient-text\">Meaningful Solutions</span>",
        about_p1: "I'm Cathyrine Menguito, a Bachelor of Science in Computer Science graduate from Renaissance School of Science and Technology, Inc. I have a growing interest in web development, user interface design, and creating practical technology solutions that address real-world needs.",
        about_p2: "Throughout my academic journey, I gained hands-on experience through software development projects, particularly in building web-based systems. I worked on projects involving healthcare management, career assessment, and other practical applications, where I developed my foundation in front-end development, interface design, and user experience.",
        about_p3: "I also hold a TESDA National Certificate II in Computer Systems Servicing and have developed experience in leadership, collaboration, and project-based work. As I begin my professional journey, I am continuously learning and strengthening my technical skills while looking for opportunities to contribute, gain real-world experience, and grow as an IT professional.",
        about_resume_preview: "Preview Resume",
        about_resume_download: "Download PDF",
        // Skills
        skills_tech_title: "Technical Skills",
        skills_tools_title: "Tools & Technologies",
        skills_prof_title: "Professional Skills",
        skills_proficiency: "Skill Proficiency",
        skills_distribution: "Skill Distribution",
        // Education
        edu_tag: "Education",
        edu_title: "My <span class=\"gradient-text\">Academic Journey</span>",
        // Timeline
        timeline_tag: "Journey",
        timeline_title: "Project <span class=\"gradient-text\">Timeline</span>",
        timeline_desc1: "Academic thesis project - a healthcare management system for the Rural Health Unit of Morong, Rizal. Co-developed with Ariel B. Eubanas, Jr. Received Outstanding System Design and Outstanding Thesis Writing awards.",
        timeline_desc2: "An independently developed academic project - a web-based career assessment tool designed to help incoming Senior High School students explore suitable SHS strands based on their interests and skills.",
        timeline_desc3: "Professional project developed at Real IT OPC in collaboration with Kenji Akira Bergaño and Ariel B. Eubanas, Jr. A healthcare and assistance platform actively used in clinic workflows.",
        timeline_desc4: "Professional project developed at Real IT OPC in collaboration with Kenji Akira Bergaño and Ariel B. Eubanas, Jr. A real estate management and property information platform.",
        // Team
        team_tag: "Collaboration",
        team_title: "People I've <span class=\"gradient-text\">Worked With</span>",
        team_sub: "I thrive on teamwork. Here are some of the talented developers I've collaborated with.",
        // Clients
        clients_title: "Have a <span class=\"gradient-text\">Web System</span> or Digital Project in Mind?",
        clients_desc: "I work with a development team to build practical web-based systems and applications for businesses, organizations, and project teams. We focus on functional solutions, user-friendly interfaces, and systems designed around specific requirements.",
        clients_cta: "Discuss a Project",
        // Projects
        projects_tag: "Portfolio",
        projects_title: "Featured <span class=\"gradient-text\">Projects</span>",
        project_rhu_desc: "Web‑based management information system for the Rural Health Unit of Morong, Rizal.",
        project_angono_desc: "Web‑based career assessment tool for incoming Senior High School students.",
        project_hci_desc: "Integrated clinic record and healthcare management system connecting patients, clinics, and donors.",
        projects_see_all: "See All Projects",
        // Projects Page
        projects_page_title: "Projects",
        projects_page_sub: "A collection of academic and professional work showcasing my growth in web development, system design, and collaborative problem-solving.",
        filter_all: "All",
        filter_healthcare: "Healthcare",
        filter_education: "Education",
        filter_realestate: "Real Estate",
        project_rhu_long: "A comprehensive healthcare management platform built as our thesis project. This system digitized patient intake, appointment scheduling, and record management for the Rural Health Unit of Morong, Rizal.<br /><br /><strong>My Contribution:</strong> Spearheaded the front-end architecture and user interface design, ensuring a seamless experience for healthcare personnel. Collaborated closely with my co-developer on back-end integration and system optimization.<br /><br /><strong>Recognition:</strong> Received the <strong>Outstanding System Design</strong> and <strong>Outstanding Thesis Writing</strong> awards for our work.",
        project_angono_long: "A web-based career guidance tool developed to help incoming Senior High School students identify their SHS strand. The system evaluates students' interests, skills, and academic inclinations to provide data-driven recommendations.<br /><br /><strong>My Role:</strong> Developed the system independently, working on the database, front-end, system features, and deployment. This project gave me hands-on experience in building a complete web application and helped me better understand how its different parts work together. It also improved my development and problem-solving skills.<br /><br /><strong>Impact:</strong> Successfully assessed over 50 students, helping them make informed decisions about their academic pathways.",
        project_hci_long: "A multi-tenant healthcare ecosystem that bridges the gap between patients, clinics, and community support networks. The platform streamlines clinical operations, donor coordination, and patient outreach through a centralized digital infrastructure.<br /><br /><strong>Project Context:</strong> Developed as part of my professional work at <strong>Real IT OPC</strong>, where I collaborated with senior developers to bring this solution from concept to production. Currently deployed and actively supporting clinic workflows.<br /><br /><strong>Key Achievement:</strong> The system has been fully integrated into the daily operations of partner clinics, replacing manual processes with efficient digital records management.",
        project_ritremis_long: "A comprehensive real estate management information system designed to centralize property records, streamline transactions, and provide stakeholders with real-time visibility into property portfolios.<br /><br /><strong>Project Context:</strong> Currently in active development at <strong>Real IT OPC</strong>, built in collaboration with our development team.<br /><br /><strong>My Focus:</strong> Front-end implementation, UI/UX design, and ensuring a responsive, intuitive interface for property managers and clients.",
        back_home: "Back to Home",
        lets_build: "Let's Build Something Together",
        // Carousel
        carousel_tag: "Recent Work",
        carousel_title: "Project <span class=\"gradient-text\">Showcase</span>",
        // Contact
        contact_tag: "Contact",
        contact_title: "Get In <span class=\"gradient-text\">Touch</span>",
        contact_sub: "I'm always open to new opportunities, collaborations, or just a friendly chat. Feel free to reach out!",
        form_name: "Your Name",
        form_email: "Your Email",
        form_message: "Your Message",
        form_submit: "Send Message",
        form_success_title: "Thank You!",
        form_success_desc: "Your message has been sent. I'll get back to you soon!",
        // Footer
        footer_sub: "Computer Science Graduate · Web Developer · UI/UX Designer",
        footer_badge: "Available for opportunities",
        visitor_label: "visitors",
        // Resume Modal
        resume_title: "My Resume",
        resume_sub: "Cathyrine Menguito — Computer Science Graduate",
        resume_personal: "Personal Details",
        resume_personal_sub: "Contact and location information",
        resume_fullname: "Full Name",
        resume_email: "Email",
        resume_phone: "Phone",
        resume_location: "Location",
        resume_pdf_title: "Resume PDF",
        resume_pdf_sub: "Full document preview",
        resume_loading: "Loading resume preview...",
        resume_download: "Download PDF",
        resume_close: "Close"
    },
    fil: {
        nav_home: "Bahay",
        nav_projects: "Proyekto",
        nav_about: "Tungkol",
        nav_contact: "Kontak",
        hero_badge: "Bukas para sa mga oportunidad at freelance projects",
        hero_title: "Hi, Ako si <span class=\"gradient-text\">Cathyrine Menguito</span>",
        hero_description: "Ako ay isang bagong graduate ng Computer Science na may lumalaking interes sa web development, UI/UX, at teknolohiya. Ang aking mga akademikong proyekto ay nagbigay sa akin ng mga pagkakataon na bumuo ng mga web-based na sistema at tuklasin kung paano ang maalalahaning disenyo ay makapagpapadali at makapagpapaganda ng teknolohiya. Sabik akong patuloy na matuto, makakuha ng tunay na karanasan sa mundo, at simulan ang aking paglalakbay sa industriya ng IT.",
        hero_projects_btn: "Proyekto",
        hero_contact_btn: "Kontakin Ako",
        scroll_indicator: "Mag-scroll",
        stat_projects: "Proyekto",
        stat_experience: "Taon ng Karanasan",
        stat_certifications: "Sertipikasyon",
        live_status: "Kasalukuyang nag-e-explore: React.js at Tailwind CSS",
        floating_cta: "Magsalita Tayo",
        scroll_down: "Mag-scroll Pababa",
        quote_label: "Talata ng Araw",
        services_tag: "Ano ang Aking Matutulungan",
        services_title: "Mga Lugar na Aking <span class=\"gradient-text\">Maitutulong</span>",
        service_web_title: "Web Development",
        service_web_desc: "Pagbuo ng mga responsive at functional na website at web-based na aplikasyon gamit ang mga teknolohiya tulad ng HTML, CSS, JavaScript, PHP, at MySQL.",
        service_ui_title: "UI/UX at Disenyo ng Interface",
        service_ui_desc: "Pagdidisenyo ng malinis at intuitive na user interface na may pansin sa kakayahang magamit, organisasyon, at pangkalahatang karanasan ng gumagamit.",
        service_academic_title: "Pagbuo ng Akademikong Sistema",
        service_academic_desc: "Pagbibigay ng teknikal na tulong para sa mga akademikong proyekto at capstone, kabilang ang mga web-based na sistema, interface ng sistema, at mga kaugnay na gawain sa pag-unlad.",
        service_doc_title: "Teknikal na Dokumentasyon",
        service_doc_desc: "Pag-assist sa dokumentasyon ng sistema, mga teknikal na diagram, presentasyon ng proyekto, at iba pang dokumentasyon na may kaugnayan sa mga proyekto ng software.",
        service_brand_title: "Branding at Visual Identity",
        service_brand_desc: "Paglikha ng magkakaugnay na visual identity kabilang ang disenyo ng logo, paleta ng kulay, sistema ng typography, at mga alituntunin ng brand na tumutulong sa mga negosyo at proyekto na maging kakaiba at hindi malilimutan.",
        exp_tag: "Karanasan",
        exp_title: "Ang Aking <span class=\"gradient-text\">Karera</span>",
        exp_role1: "Operations at Client Success Officer | System Developer",
        exp_desc1: "Nag-aambag sa pagbuo ng mga web-based na sistema at digital na solusyon, kabilang ang functionality ng sistema, pagpapatupad ng user interface, at teknikal na gawain na may kaugnayan sa proyekto. Ang tungkuling ito ay nagbibigay-daan sa akin upang mailapat ang aking kaalaman sa Computer Science sa mga praktikal na proyekto habang patuloy na pinalalakas ang aking teknikal at propesyonal na kasanayan.",
        exp_role2: "Executive Agent",
        exp_desc2: "Nagbigay ng propesyonal na suporta sa customer sa pamamagitan ng paghawak ng mga katanungan, pagresolba ng mga alalahanin na may kaugnayan sa serbisyo, at pagko-koordina ng mga kahilingan upang matiyak ang kasiyahan ng customer at mahusay na operasyon.",
        about_tag: "Tungkol sa Akin",
        about_title: "Masigasig sa Paggawa ng <span class=\"gradient-text\">Makabuluhang Solusyon</span>",
        about_p1: "Ako si Cathyrine Menguito, isang nagtapos ng Bachelor of Science in Computer Science mula sa Renaissance School of Science and Technology, Inc. May lumalaking interes ako sa web development, disenyo ng user interface, at paglikha ng mga praktikal na solusyon sa teknolohiya na tumutugon sa mga pangangailangan sa totoong mundo.",
        about_p2: "Sa buong aking akademikong paglalakbay, nakakuha ako ng hands-on na karanasan sa pamamagitan ng mga proyekto sa pagbuo ng software, partikular sa paggawa ng mga web-based na sistema. Nagtrabaho ako sa mga proyekto na may kinalaman sa pamamahala ng healthcare, career assessment, at iba pang praktikal na aplikasyon, kung saan nabuo ko ang aking pundasyon sa front-end development, disenyo ng interface, at karanasan ng gumagamit.",
        about_p3: "Mayroon din akong TESDA National Certificate II sa Computer Systems Servicing at nakabuo ng karanasan sa pamumuno, pakikipagtulungan, at gawaing nakabatay sa proyekto. Habang sinisimulan ko ang aking propesyonal na paglalakbay, patuloy akong natututo at pinalalakas ang aking teknikal na kasanayan habang naghahanap ng mga pagkakataon upang mag-ambag, makakuha ng tunay na karanasan, at lumago bilang isang propesyonal sa IT.",
        about_resume_preview: "Silipin ang Resume",
        about_resume_download: "I-download ang PDF",
        skills_tech_title: "Mga Teknikal na Kasanayan",
        skills_tools_title: "Mga Tool at Teknolohiya",
        skills_prof_title: "Mga Propesyonal na Kasanayan",
        skills_proficiency: "Kahusayan sa Kasanayan",
        skills_distribution: "Distribusyon ng Kasanayan",
        edu_tag: "Edukasyon",
        edu_title: "Ang Aking <span class=\"gradient-text\">Akademikong Paglalakbay</span>",
        timeline_tag: "Paglalakbay",
        timeline_title: "Proyekto <span class=\"gradient-text\">Timeline</span>",
        timeline_desc1: "Akademikong thesis project - isang healthcare management system para sa Rural Health Unit ng Morong, Rizal. Ka-develop si Ariel B. Eubanas, Jr. Nakatanggap ng Outstanding System Design at Outstanding Thesis Writing awards.",
        timeline_desc2: "Isang malayang binuong akademikong proyekto - isang web-based na career assessment tool na idinisenyo upang tulungan ang mga papasok na Senior High School na mag-aaral na tuklasin ang angkop na SHS strands batay sa kanilang mga interes at kasanayan.",
        timeline_desc3: "Propesyonal na proyekto na binuo sa Real IT OPC sa pakikipagtulungan kay Kenji Akira Bergaño at Ariel B. Eubanas, Jr. Isang healthcare at assistance platform na aktibong ginagamit sa mga clinic workflows.",
        timeline_desc4: "Propesyonal na proyekto na binuo sa Real IT OPC sa pakikipagtulungan kay Kenji Akira Bergaño at Ariel B. Eubanas, Jr. Isang real estate management at property information platform.",
        team_tag: "Pakikipagtulungan",
        team_title: "Mga Taong <span class=\"gradient-text\">Nakatrabaho Ko</span>",
        team_sub: "Umunlad ako sa pagtutulungan. Narito ang ilan sa mga mahuhusay na developer na aking nakatrabaho.",
        clients_title: "May <span class=\"gradient-text\">Web System</span> o Digital Project Ka Bang Naisip?",
        clients_desc: "Nakikipagtulungan ako sa isang development team upang bumuo ng mga praktikal na web-based na sistema at aplikasyon para sa mga negosyo, organisasyon, at project teams. Nakatuon kami sa mga functional na solusyon, user-friendly na interface, at mga sistemang idinisenyo ayon sa mga tiyak na kinakailangan.",
        clients_cta: "Talakayin ang isang Proyekto",
        projects_tag: "Portfolio",
        projects_title: "Itinatampok na <span class=\"gradient-text\">Mga Proyekto</span>",
        project_rhu_desc: "Web‑based na management information system para sa Rural Health Unit ng Morong, Rizal.",
        project_angono_desc: "Web‑based na career assessment tool para sa mga papasok na Senior High School na mag-aaral.",
        project_hci_desc: "Pinagsamang clinic record at healthcare management system na nag-uugnay sa mga pasyente, klinika, at donor.",
        projects_see_all: "Tingnan ang Lahat ng Proyekto",
        projects_page_title: "Mga Proyekto",
        projects_page_sub: "Isang koleksyon ng akademiko at propesyonal na gawa na nagpapakita ng aking paglago sa web development, disenyo ng sistema, at collaborative na paglutas ng problema.",
        filter_all: "Lahat",
        filter_healthcare: "Pangangalagang Pangkalusugan",
        filter_education: "Edukasyon",
        filter_realestate: "Real Estate",
        project_rhu_long: "Isang komprehensibong healthcare management platform na binuo bilang aming thesis project. Dinigitan ng sistemang ito ang pagtanggap ng pasyente, pag-iskedyul ng appointment, at pamamahala ng record para sa Rural Health Unit ng Morong, Rizal.<br /><br /><strong>Aking Kontribusyon:</strong> Pinangunahan ang front-end architecture at disenyo ng user interface, tinitiyak ang maayos na karanasan para sa mga healthcare personnel. Nakipagtulungan nang malapit sa aking kapwa-developer sa back-end integration at pag-optimize ng sistema.<br /><br /><strong>Pagkilala:</strong> Nakatanggap ng <strong>Outstanding System Design</strong> at <strong>Outstanding Thesis Writing</strong> awards para sa aming gawa.",
        project_angono_long: "Isang web-based na career guidance tool na binuo upang tulungan ang mga papasok na Senior High School na mag-aaral na matukoy ang kanilang SHS strand. Sinusuri ng sistema ang mga interes, kasanayan, at akademikong hilig ng mga mag-aaral upang magbigay ng mga rekomendasyon batay sa datos.<br /><br /><strong>Aking Papel:</strong> Binuo ang sistema nang nakapag-iisa, nagtrabaho sa database, front-end, mga feature ng sistema, at deployment. Ang proyektong ito ay nagbigay sa akin ng hands-on na karanasan sa pagbuo ng isang kumpletong web application at tumulong sa akin na mas maunawaan kung paano nagtutulungan ang iba't ibang bahagi nito. Napabuti rin nito ang aking mga kasanayan sa pag-develop at paglutas ng problema.<br /><br /><strong>Epekto:</strong> Matagumpay na nasuri ang mahigit 50 mga mag-aaral, tinutulungan silang gumawa ng matalinong desisyon tungkol sa kanilang akademikong landas.",
        project_hci_long: "Isang multi-tenant healthcare ecosystem na nagtutulay sa pagitan ng mga pasyente, klinika, at mga network ng suporta sa komunidad. Pina-streamline ng platform ang mga klinikal na operasyon, koordinasyon ng donor, at outreach ng pasyente sa pamamagitan ng isang sentralisadong digital na imprastraktura.<br /><br /><strong>Konteks ng Proyekto:</strong> Binuo bilang bahagi ng aking propesyonal na trabaho sa <strong>Real IT OPC</strong>, kung saan nakipagtulungan ako sa mga senior developer upang dalhin ang solusyong ito mula sa konsepto patungo sa produksyon. Kasalukuyang naka-deploy at aktibong sumusuporta sa mga clinic workflows.<br /><br /><strong>Pangunahing Nagawa:</strong> Ang sistema ay ganap na naisama sa pang-araw-araw na operasyon ng mga partner clinic, pinapalitan ang mga manu-manong proseso ng mahusay na digital records management.",
        project_ritremis_long: "Isang komprehensibong real estate management information system na idinisenyo upang sentralisahin ang mga talaan ng ari-arian, i-streamline ang mga transaksyon, at magbigay sa mga stakeholder ng real-time na visibility sa mga portfolio ng ari-arian.<br /><br /><strong>Konteks ng Proyekto:</strong> Kasalukuyang aktibong binuo sa <strong>Real IT OPC</strong>, na binuo sa pakikipagtulungan ng aming development team.<br /><br /><strong>Aking Pokus:</strong> Front-end implementation, UI/UX design, at pagtiyak ng isang responsive, intuitive na interface para sa mga property manager at kliyente.",
        back_home: "Bumalik sa Bahay",
        lets_build: "Magtayo Tayo ng Isang Bagay",
        carousel_tag: "Kamakailang Gawain",
        carousel_title: "Proyekto <span class=\"gradient-text\">Showcase</span>",
        contact_tag: "Kontak",
        contact_title: "Makipag-<span class=\"gradient-text\">Ugnayan</span>",
        contact_sub: "Lagi akong bukas sa mga bagong oportunidad, pakikipagtulungan, o simpleng maiksing usapan. Huwag mag-atubiling makipag-ugnayan!",
        form_name: "Iyong Pangalan",
        form_email: "Iyong Email",
        form_message: "Iyong Mensahe",
        form_submit: "Magpadala ng Mensahe",
        form_success_title: "Salamat!",
        form_success_desc: "Naipadala na ang iyong mensahe. Babalikan kita sa lalong madaling panahon!",
        footer_sub: "Computer Science Graduate · Web Developer · UI/UX Designer",
        footer_badge: "Bukas para sa mga oportunidad",
        visitor_label: "mga bisita",
        resume_title: "Aking Resume",
        resume_sub: "Cathyrine Menguito — Computer Science Graduate",
        resume_personal: "Personal na Detalye",
        resume_personal_sub: "Impormasyon sa kontak at lokasyon",
        resume_fullname: "Buong Pangalan",
        resume_email: "Email",
        resume_phone: "Telepono",
        resume_location: "Lokasyon",
        resume_pdf_title: "Resume PDF",
        resume_pdf_sub: "Buong preview ng dokumento",
        resume_loading: "Naglo-load ng resume preview...",
        resume_download: "I-download ang PDF",
        resume_close: "Isara"
    }
};

// ============================================================
//  TOAST SYSTEM (Error Handling)
// ============================================================
function showToast(message, type = 'error') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const iconMap = {
        error: 'fa-exclamation-triangle',
        success: 'fa-check-circle',
        warning: 'fa-exclamation-circle'
    };
    const icon = iconMap[type] || iconMap.error;
    toast.innerHTML = `<i class="fas ${icon}"></i> ${message}`;
    container.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    setTimeout(() => {
        toast.classList.remove('show');
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 400);
    }, 4500);
}

// ============================================================
//  I18N ENGINE
// ============================================================
function setLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    localStorage.setItem('lang', lang);

    const toggle = document.getElementById('lang-toggle');
    if (toggle) toggle.textContent = lang === 'en' ? '🇵🇭' : '🇺🇸';

    // Update all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.getAttribute('data-i18n');
        const text = translations[lang][key];
        if (text !== undefined) {
            el.innerHTML = text;
        }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
        const key = el.getAttribute('data-i18n-placeholder');
        const text = translations[lang][key];
        if (text !== undefined) {
            el.placeholder = text;
        }
    });

    // Update the tagline typewriter if it exists
    const tagline = document.getElementById('tagline');
    if (tagline && window.typewriterRunning) {
        // Restart typewriter with new language (will re-init on next initApp)
    }
}

// ============================================================
//  TYPEWRITER EFFECT
// ============================================================
let typewriterRunning = false;
let typewriterTimeoutId = null;

function startTypewriter() {
    const taglineElement = document.getElementById('tagline');
    if (!taglineElement) return;
    
    const taglines = [
        translations[currentLang]?.hero_title?.replace(/<[^>]*>/g, '') || 'Computer Science Graduate',
        translations[currentLang]?.hero_title?.replace(/<[^>]*>/g, '') || 'Aspiring IT Professional',
        'Web Developer',
        'UI/UX Enthusiast'
    ];
    
    let typeIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    if (typewriterTimeoutId) clearTimeout(typewriterTimeoutId);
    typewriterRunning = true;

    function typeEffect() {
        if (!typewriterRunning) return;
        const current = taglines[typeIndex] || '';

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
        typewriterTimeoutId = setTimeout(typeEffect, speed);
    }

    if (typewriterTimeoutId) clearTimeout(typewriterTimeoutId);
    setTimeout(typeEffect, 500);
}

// ============================================================
//  PARTICLE SYSTEM
// ============================================================
let particleAnimationId = null;
let particles = [];
let mouse = { x: null, y: null };

function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    if (particleAnimationId) {
        cancelAnimationFrame(particleAnimationId);
        particleAnimationId = null;
    }
    
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;

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

    function initParticleArray() {
        particles = [];
        const count = Math.min(50, Math.floor((width * height) / 20000));
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }
    initParticleArray();

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

        particleAnimationId = requestAnimationFrame(animateParticles);
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
        initParticleArray();
    });
}

// ============================================================
//  VISITOR COUNTER
// ============================================================
async function getVisitorCount() {
    const countElement = document.getElementById('visitor-count');
    if (!countElement) return;
    
    try {
        const response = await fetch('https://api.countapi.xyz/hit/cthyrnmngt718/visits');
        const data = await response.json();
        countElement.textContent = data.value || 0;
    } catch (error) {
        showToast('Unable to load visitor count. Please try again.', 'warning');
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

// ============================================================
//  QUOTE OF THE DAY
// ============================================================
function displayQuote() {
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
        quoteType.innerHTML = `<i class="fas fa-bible"></i> ${translations[currentLang]?.quote_label || 'Verse of the Day'}`;
        quoteType.style.color = '#ffdd44';
        quoteType.style.borderColor = 'rgba(255, 221, 68, 0.3)';
        quoteType.style.background = 'rgba(255, 221, 68, 0.1)';
    }
}

// ============================================================
//  CAROUSEL
// ============================================================
function initCarousel() {
    const track = document.getElementById('carousel-track');
    if (!track) return;
    
    if (carouselInterval) {
        clearInterval(carouselInterval);
        carouselInterval = null;
    }
    
    const slides = track.querySelectorAll('.carousel-slide');
    const dotsContainer = document.getElementById('carousel-dots');
    let currentSlide = 0;

    if (dotsContainer) dotsContainer.innerHTML = '';

    slides.forEach((_, index) => {
        if (!dotsContainer) return;
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    function goToSlide(index) {
        if (!track) return;
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
        if (carouselInterval) clearInterval(carouselInterval);
        carouselInterval = setInterval(nextSlide, 4000);
    }

    function stopAutoSlide() {
        if (carouselInterval) {
            clearInterval(carouselInterval);
            carouselInterval = null;
        }
    }

    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); startAutoSlide(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); startAutoSlide(); });
    
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);
    }
    
    if (slides.length > 0) {
        goToSlide(0);
        startAutoSlide();
    }

    // Store cleanup
    window.__carouselCleanup = () => {
        if (carouselInterval) clearInterval(carouselInterval);
        carouselInterval = null;
    };
}

// ============================================================
//  RADAR CHART
// ============================================================
function loadRadarChart() {
    const canvas = document.getElementById('radarChart');
    if (!canvas) return;
    
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
                        font: { family: 'Inter', size: 12 }
                    }
                }
            },
            scales: {
                r: {
                    angleLines: { color: gridColor },
                    grid: { color: gridColor },
                    pointLabels: {
                        color: textColor,
                        font: { family: 'Inter', size: 11 }
                    },
                    ticks: {
                        color: textColor,
                        backdropColor: 'transparent',
                        font: { size: 9 }
                    },
                    max: 100,
                    min: 0
                }
            }
        }
    });
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

// ============================================================
//  SCROLL BUTTON
// ============================================================
function initScrollButton() {
    const scrollBtn = document.getElementById('scroll-btn');
    const scrollIcon = document.getElementById('scroll-icon');
    const tooltip = document.getElementById('scroll-tooltip');
    if (!scrollBtn) return;

    let isAtTop = true;

    function updateScrollButton() {
        const scrollY = window.scrollY;
        if (scrollY < 100) {
            if (scrollIcon) scrollIcon.className = 'fas fa-chevron-down';
            if (tooltip) tooltip.textContent = translations[currentLang]?.scroll_down || 'Scroll Down';
            isAtTop = true;
            scrollBtn.classList.remove('pulse');
        } else if (scrollY > 300) {
            if (scrollIcon) scrollIcon.className = 'fas fa-chevron-up';
            if (tooltip) tooltip.textContent = 'Back to Top';
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
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    window.addEventListener('scroll', updateScrollButton);
    updateScrollButton();
}

// ============================================================
//  SKILL BARS
// ============================================================
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });
    skillBars.forEach(bar => observer.observe(bar));
}

// ============================================================
//  STATS COUNTERS
// ============================================================
function initStatsCounters() {
    const stats = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
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
                observer.unobserve(stat);
            }
        });
    }, { threshold: 0.5 });
    stats.forEach(stat => observer.observe(stat));
}

// ============================================================
//  3D TILT EFFECT
// ============================================================
function initTilt() {
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
}

// ============================================================
//  THEME TOGGLE
// ============================================================
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    const getPreferredTheme = () => {
        const saved = localStorage.getItem('theme');
        if (saved) return saved;
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            return 'light';
        }
        return 'dark';
    };

    const currentTheme = getPreferredTheme();
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeToggle.innerHTML = currentTheme === 'light' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';

    themeToggle.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        themeToggle.innerHTML = theme === 'light' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        updateRadarChartTheme();
    });
}

// ============================================================
//  FILTER BUTTONS (Projects Page)
// ============================================================
function initFilterButtons() {
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
}

// ============================================================
//  FORM HANDLER
// ============================================================
function initFormHandler() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

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
                headers: { 'Accept': 'application/json' }
            });
            
            if (response.ok) {
                contactForm.style.display = 'none';
                const successMsg = document.getElementById('form-success');
                if (successMsg) {
                    successMsg.style.display = 'block';
                    successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    launchConfetti();
                }
                contactForm.reset();
                showToast('Message sent successfully!', 'success');
            } else {
                showToast('Oops! Something went wrong. Please try again.', 'error');
                btn.innerHTML = originalText;
                btn.disabled = false;
            }
        } catch (error) {
            showToast('Network error. Please check your connection and try again.', 'error');
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    });
}

// ============================================================
//  CONFETTI
// ============================================================
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

// ============================================================
//  MOBILE MENU
// ============================================================
function initMobileMenu() {
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
}

// ============================================================
//  RESUME MODAL
// ============================================================
function initResumeModal() {
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
                <span>${translations[currentLang]?.resume_loading || 'Loading resume preview...'}</span>
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

    if (resumeModalClose) resumeModalClose.addEventListener('click', closeResumeModal);
    if (resumeModalCloseBtn) resumeModalCloseBtn.addEventListener('click', closeResumeModal);
    
    resumeModal.addEventListener('click', (e) => {
        if (e.target === resumeModal) closeResumeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
            closeResumeModal();
        }
    });
}

// ============================================================
//  SPA PAGE TRANSITIONS
// ============================================================
function initSPA() {
    const app = document.getElementById('app');
    if (!app) return;

    document.addEventListener('click', async (e) => {
        const link = e.target.closest('a');
        if (!link || !link.href || link.target === '_blank') return;
        
        // Ignore external links, hash links, and downloads
        if (!link.href.includes(window.location.origin)) return;
        if (link.href.includes('#') && link.href.split('#')[0] === window.location.href.split('#')[0]) return;
        if (link.hasAttribute('download')) return;

        e.preventDefault();
        const url = link.href;

        // Animate out
        app.classList.add('page-exit');
        
        setTimeout(async () => {
            try {
                const resp = await fetch(url);
                if (!resp.ok) throw new Error('Network response was not ok');
                const html = await resp.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                
                // Update title
                document.title = doc.title;
                
                // Swap content
                const newApp = doc.getElementById('app');
                if (!newApp) throw new Error('New app content not found');
                
                app.innerHTML = newApp.innerHTML;
                
                // Re-initialize everything
                app.classList.remove('page-exit');
                app.classList.add('page-enter');
                
                // Update URL
                window.history.pushState({}, '', url);
                
                // Re-init app
                initApp();
                
                // Trigger enter animation
                requestAnimationFrame(() => {
                    app.classList.remove('page-enter');
                });
                
                // Scroll to top
                window.scrollTo(0, 0);
                
            } catch (error) {
                showToast('Failed to load page. Please try again.', 'error');
                app.classList.remove('page-exit');
                // Fallback: reload page
                window.location.href = url;
            }
        }, 300);
    });

    // Handle back/forward browser buttons
    window.addEventListener('popstate', () => {
        window.location.reload();
    });
}

// ============================================================
//  MAIN INIT FUNCTION (called on load & after SPA navigation)
// ============================================================
function initApp() {
    // Language
    setLanguage(currentLang);

    // Theme
    initThemeToggle();

    // Particles (only once)
    if (!particlesInitialized) {
        initParticles();
        particlesInitialized = true;
    }

    // Typewriter
    if (typewriterTimeoutId) clearTimeout(typewriterTimeoutId);
    typewriterRunning = false;
    startTypewriter();

    // Tilt
    initTilt();

    // Mobile menu
    initMobileMenu();

    // Scroll button
    initScrollButton();

    // Skill bars
    initSkillBars();

    // Stats counters
    initStatsCounters();

    // Quote
    displayQuote();

    // Carousel
    initCarousel();

    // Filter buttons
    initFilterButtons();

    // Form
    initFormHandler();

    // Resume modal
    initResumeModal();

    // Visitor count
    getVisitorCount();

    // Radar chart (lazy load)
    const radarContainer = document.querySelector('.radar-chart-container');
    if (radarContainer && typeof Chart !== 'undefined') {
        loadRadarChart();
    } else if (radarContainer) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadRadarChart();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        observer.observe(radarContainer);
    }

    // Update copyright year
    const yearElement = document.getElementById('year');
    if (yearElement) yearElement.textContent = new Date().getFullYear();

    // Scroll progress bar
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            progressBar.style.width = Math.min(progress, 100) + '%';
        });
    }

    // Active nav link
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ============================================================
//  SERVICE WORKER REGISTRATION + UPDATE NOTIFICATION
// ============================================================
if ('serviceWorker' in navigator) {
    let swRegistration;
    navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
            swRegistration = registration;
            console.log('Service Worker registered successfully');
            
            // Check for updates every 60 seconds
            setInterval(() => {
                registration.update();
            }, 60000);
        })
        .catch((error) => {
            console.log('Service Worker registration failed:', error);
        });

    // Listen for controllerchange (new SW takes over)
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (refreshing) return;
        refreshing = true;
        showToast('New version available! Refreshing...', 'success');
        setTimeout(() => window.location.reload(), 1500);
    });
}

// ============================================================
//  DOM READY & LOADER
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    // Wait for DOM, then init app
    initApp();
    
    // Hide loader after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            const loader = document.getElementById('page-loader');
            if (loader) loader.classList.add('hidden');
        }, 600);
    });

    // Handle SPA navigation after initial load
    initSPA();
});

// ============================================================
//  KEYBOARD SHORTCUTS
// ============================================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' && !e.target.closest('input, textarea, button')) {
        window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
        e.preventDefault();
    }
    if (e.key === 'ArrowUp' && !e.target.closest('input, textarea, button')) {
        window.scrollBy({ top: -window.innerHeight * 0.8, behavior: 'smooth' });
        e.preventDefault();
    }
});
