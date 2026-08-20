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
//  TRANSLATIONS (i18n) - COMPLETE & ACCURATE
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
        // Projects (Featured)
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
        project_rhu_long: "A comprehensive healthcare management platform built as our thesis project. This system digitized patient intake, appointment scheduling, and record management for the Rural Health Unit of Morong, Rizal.<br><br><strong>My Contribution:</strong> Spearheaded the front-end architecture and user interface design, ensuring a seamless experience for healthcare personnel. Collaborated closely with my co-developer on back-end integration and system optimization.<br><br><strong>Recognition:</strong> Received the <strong>Outstanding System Design</strong> and <strong>Outstanding Thesis Writing</strong> awards for our work.",
        project_angono_long: "A web-based career guidance tool developed to help incoming Senior High School students identify their SHS strand. The system evaluates students' interests, skills, and academic inclinations to provide data-driven recommendations.<br><br><strong>My Role:</strong> Developed the system independently, working on the database, front-end, system features, and deployment. This project gave me hands-on experience in building a complete web application and helped me better understand how its different parts work together. It also improved my development and problem-solving skills.<br><br><strong>Impact:</strong> Successfully assessed over 50 students, helping them make informed decisions about their academic pathways.",
        project_hci_long: "A multi-tenant healthcare ecosystem that bridges the gap between patients, clinics, and community support networks. The platform streamlines clinical operations, donor coordination, and patient outreach through a centralized digital infrastructure.<br><br><strong>Project Context:</strong> Developed as part of my professional work at <strong>Real IT OPC</strong>, where I collaborated with senior developers to bring this solution from concept to production. Currently deployed and actively supporting clinic workflows.<br><br><strong>Key Achievement:</strong> The system has been fully integrated into the daily operations of partner clinics, replacing manual processes with efficient digital records management.",
        project_ritremis_long: "A comprehensive real estate management information system designed to centralize property records, streamline transactions, and provide stakeholders with real-time visibility into property portfolios.<br><br><strong>Project Context:</strong> Currently in active development at <strong>Real IT OPC</strong>, built in collaboration with our development team.<br><br><strong>My Focus:</strong> Front-end implementation, UI/UX design, and ensuring a responsive, intuitive interface for property managers and clients.",
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
        project_rhu_long: "Isang komprehensibong healthcare management platform na binuo bilang aming thesis project. Dinigitan ng sistemang ito ang pagtanggap ng pasyente, pag-iskedyul ng appointment, at pamamahala ng record para sa Rural Health Unit ng Morong, Rizal.<br><br><strong>Aking Kontribusyon:</strong> Pinangunahan ang front-end architecture at disenyo ng user interface, tinitiyak ang maayos na karanasan para sa mga healthcare personnel. Nakipagtulungan nang malapit sa aking kapwa-developer sa back-end integration at pag-optimize ng sistema.<br><br><strong>Pagkilala:</strong> Nakatanggap ng <strong>Outstanding System Design</strong> at <strong>Outstanding Thesis Writing</strong> awards para sa aming gawa.",
        project_angono_long: "Isang web-based na career guidance tool na binuo upang tulungan ang mga papasok na Senior High School na mag-aaral na matukoy ang kanilang SHS strand. Sinusuri ng sistema ang mga interes, kasanayan, at akademikong hilig ng mga mag-aaral upang magbigay ng mga rekomendasyon batay sa datos.<br><br><strong>Aking Papel:</strong> Binuo ang sistema nang nakapag-iisa, nagtrabaho sa database, front-end, mga feature ng sistema, at deployment. Ang proyektong ito ay nagbigay sa akin ng hands-on na karanasan sa pagbuo ng isang kumpletong web application at tumulong sa akin na mas maunawaan kung paano nagtutulungan ang iba't ibang bahagi nito. Napabuti rin nito ang aking mga kasanayan sa pag-develop at paglutas ng problema.<br><br><strong>Epekto:</strong> Matagumpay na nasuri ang mahigit 50 mga mag-aaral, tinutulungan silang gumawa ng matalinong desisyon tungkol sa kanilang akademikong landas.",
        project_hci_long: "Isang multi-tenant healthcare ecosystem na nagtutulay sa pagitan ng mga pasyente, klinika, at mga network ng suporta sa komunidad. Pina-streamline ng platform ang mga klinikal na operasyon, koordinasyon ng donor, at outreach ng pasyente sa pamamagitan ng isang sentralisadong digital na imprastraktura.<br><br><strong>Konteks ng Proyekto:</strong> Binuo bilang bahagi ng aking propesyonal na trabaho sa <strong>Real IT OPC</strong>, kung saan nakipagtulungan ako sa mga senior developer upang dalhin ang solusyong ito mula sa konsepto patungo sa produksyon. Kasalukuyang naka-deploy at aktibong sumusuporta sa mga clinic workflows.<br><br><strong>Pangunahing Nagawa:</strong> Ang sistema ay ganap na naisama sa pang-araw-araw na operasyon ng mga partner clinic, pinapalitan ang mga manu-manong proseso ng mahusay na digital records management.",
        project_ritremis_long: "Isang komprehensibong real estate management information system na idinisenyo upang sentralisahin ang mga talaan ng ari-arian, i-streamline ang mga transaksyon, at magbigay sa mga stakeholder ng real-time na visibility sa mga portfolio ng ari-arian.<br><br><strong>Konteks ng Proyekto:</strong> Kasalukuyang aktibong binuo sa <strong>Real IT OPC</strong>, na binuo sa pakikipagtulungan ng aming development team.<br><br><strong>Aking Pokus:</strong> Front-end implementation, UI/UX design, at pagtiyak ng isang responsive, intuitive na interface para sa mga property manager at kliyente.",
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
    },
        ja: {
        // Navigation
        nav_home: "ホーム",
        nav_projects: "プロジェクト",
        nav_about: "プロフィール",
        nav_contact: "お問い合わせ",
        // Hero
        hero_badge: "機会とフリーランスプロジェクトに対応可能",
        hero_title: "こんにちは、<span class=\"gradient-text\">Cathyrine Menguito</span>です",
        hero_description: "私は最近コンピュータサイエンスを卒業し、ウェブ開発、UI/UX、テクノロジーにますます興味を持っています。学術プロジェクトを通じて、ウェブベースのシステムを構築し、思慮深いデザインがテクノロジーをより使いやすく、より便利にする方法を探求する機会を得ました。これからも学び続け、実務経験を積み、IT業界でのキャリアを始めることを楽しみにしています。",
        hero_projects_btn: "プロジェクト一覧",
        hero_contact_btn: "お問い合わせ",
        scroll_indicator: "スクロール",
        stat_projects: "プロジェクト",
        stat_experience: "年の経験",
        stat_certifications: "認定資格",
        live_status: "現在探求中: React.js & Tailwind CSS",
        floating_cta: "お話ししましょう",
        scroll_down: "下へスクロール",
        // Quote
        quote_label: "今日の聖句",
        // Services
        services_tag: "提供できるサービス",
        services_title: "貢献できる <span class=\"gradient-text\">分野</span>",
        service_web_title: "ウェブ開発",
        service_web_desc: "HTML、CSS、JavaScript、PHP、MySQLなどの技術を使用した、レスポンシブで機能的なウェブサイトやウェブアプリケーションの開発。",
        service_ui_title: "UI/UX & インターフェースデザイン",
        service_ui_desc: "ユーザビリティ、整理整頓、全体的なユーザーエクスペリエンスに配慮した、クリーンで直感的なユーザーインターフェースのデザイン。",
        service_academic_title: "学術システム開発",
        service_academic_desc: "ウェブベースのシステム、システムインターフェース、および関連する開発タスクを含む、学術および卒業研究プロジェクトの技術支援。",
        service_doc_title: "技術文書作成",
        service_doc_desc: "システム文書、技術図、プロジェクトプレゼンテーション、およびソフトウェアプロジェクトに関連するその他の文書の作成支援。",
        service_brand_title: "ブランディング & ビジュアルアイデンティティ",
        service_brand_desc: "ロゴデザイン、カラーパレット、タイポグラフィシステム、ブランドガイドラインを含む、一貫性のあるビジュアルアイデンティティを作成し、ビジネスやプロジェクトが際立ち、記憶に残る存在になるようサポートします。",
        // Experience
        exp_tag: "経歴",
        exp_title: "私の <span class=\"gradient-text\">キャリア</span>",
        exp_role1: "オペレーション & クライアントサクセスオフィサー | システム開発者",
        exp_desc1: "システム機能、ユーザーインターフェースの実装、プロジェクト関連の技術作業を含む、ウェブベースのシステムとデジタルソリューションの開発に貢献。この役割は、コンピュータサイエンスの知識を実践的なプロジェクトに応用し、技術的・専門的スキルを強化し続けることを可能にします。",
        exp_role2: "エグゼクティブエージェント",
        exp_desc2: "問い合わせ対応、サービス関連の問題解決、リクエストの調整を通じて、プロフェッショナルなカスタマーサポートを提供し、顧客満足と効率的な運用を確保。",
        // About
        about_tag: "プロフィール",
        about_title: "意味のあるソリューションを <span class=\"gradient-text\">構築することに情熱を注ぐ</span>",
        about_p1: "私はCathyrine Menguito、Renaissance School of Science and Technology, Inc.でコンピュータサイエンスの学士号を取得しました。ウェブ開発、ユーザーインターフェースデザイン、そして現実世界のニーズに対応する実用的なテクノロジーソリューションの作成にますます関心を持っています。",
        about_p2: "学業を通じて、特にウェブベースのシステム構築において、ソフトウェア開発プロジェクトでの実践的な経験を積みました。医療管理、キャリアアセスメント、その他の実用的なアプリケーションを含むプロジェクトに携わり、フロントエンド開発、インターフェースデザイン、ユーザーエクスペリエンスの基礎を築きました。",
        about_p3: "TESDAのコンピュータシステムサービスに関する国家資格IIを保有しており、リーダーシップ、コラボレーション、プロジェクトベースの仕事における経験を積んできました。プロフェッショナルとしての旅を始めるにあたり、私は継続的に学び、技術スキルを強化し、貢献し、実務経験を積み、ITプロフェッショナルとして成長する機会を探しています。",
        about_resume_preview: "履歴書をプレビュー",
        about_resume_download: "PDFをダウンロード",
        // Skills
        skills_tech_title: "技術スキル",
        skills_tools_title: "ツール & テクノロジー",
        skills_prof_title: "プロフェッショナルスキル",
        skills_proficiency: "スキル習熟度",
        skills_distribution: "スキル分布",
        // Education
        edu_tag: "学歴",
        edu_title: "私の <span class=\"gradient-text\">学業の歩み</span>",
        // Timeline
        timeline_tag: "歩み",
        timeline_title: "プロジェクト <span class=\"gradient-text\">タイムライン</span>",
        timeline_desc1: "アカデミックな卒業研究プロジェクト - リサール州モロンの地方保健ユニット向けの医療管理システム。Ariel B. Eubanas, Jr.と共同開発。優秀システムデザイン賞と優秀論文執筆賞を受賞。",
        timeline_desc2: "独立して開発したアカデミックプロジェクト - 新入高校生が自分の興味やスキルに基づいて適切なSHSトラックを探求できるように設計されたウェブベースのキャリアアセスメントツール。",
        timeline_desc3: "Real IT OPCでKenji Akira BergañoおよびAriel B. Eubanas, Jr.と共同で開発したプロフェッショナルプロジェクト。クリニックのワークフローで積極的に使用されているヘルスケアおよび支援プラットフォーム。",
        timeline_desc4: "Real IT OPCでKenji Akira BergañoおよびAriel B. Eubanas, Jr.と共同で開発したプロフェッショナルプロジェクト。不動産管理および物件情報プラットフォーム。",
        // Team
        team_tag: "コラボレーション",
        team_title: "一緒に仕事をした <span class=\"gradient-text\">人々</span>",
        team_sub: "私はチームワークで力を発揮します。ここに私が協力してきた才能ある開発者たちの一部をご紹介します。",
        // Clients
        clients_title: "ウェブシステムやデジタルプロジェクトを <span class=\"gradient-text\">お考えですか？</span>",
        clients_desc: "私は開発チームと協力して、企業、組織、プロジェクトチーム向けの実用的なウェブベースのシステムやアプリケーションを構築します。私たちは、機能的なソリューション、ユーザーフレンドリーなインターフェース、特定の要件に基づいて設計されたシステムに焦点を当てています。",
        clients_cta: "プロジェクトについて話し合う",
        // Projects (Featured)
        projects_tag: "ポートフォリオ",
        projects_title: "注目の <span class=\"gradient-text\">プロジェクト</span>",
        project_rhu_desc: "リサール州モロン地方保健ユニット向けのウェブベースの管理情報システム。",
        project_angono_desc: "新入高校生向けのウェブベースのキャリアアセスメントツール。",
        project_hci_desc: "患者、クリニック、ドナーを結ぶ統合クリニック記録および医療管理システム。",
        projects_see_all: "すべてのプロジェクトを見る",
        // Projects Page
        projects_page_title: "プロジェクト",
        projects_page_sub: "ウェブ開発、システムデザイン、協力的な問題解決における私の成長を示す学術的および専門的な仕事のコレクション。",
        filter_all: "すべて",
        filter_healthcare: "ヘルスケア",
        filter_education: "教育",
        filter_realestate: "不動産",
        project_rhu_long: "私たちの卒業研究プロジェクトとして構築された総合的な医療管理プラットフォーム。このシステムは、リサール州モロンの地方保健ユニットの患者受付、予約スケジュール、記録管理をデジタル化しました。<br><br><strong>私の貢献:</strong> フロントエンドアーキテクチャとユーザーインターフェースデザインを主導し、医療従事者にとってシームレスな体験を保証しました。バックエンドの統合とシステム最適化については、共同開発者と緊密に協力しました。<br><br><strong>評価:</strong> 私たちの仕事に対して、<strong>優秀システムデザイン賞</strong>と<strong>優秀論文執筆賞</strong>を受賞しました。",
        project_angono_long: "新入高校生が自分のSHSトラックを特定するのを支援するために開発されたウェブベースのキャリアガイダンスツール。このシステムは、学生の興味、スキル、学問的傾向を評価し、データに基づいた推奨事項を提供します。<br><br><strong>私の役割:</strong> データベース、フロントエンド、システム機能、デプロイメントに取り組み、システムを独立して開発しました。このプロジェクトは、完全なウェブアプリケーションを構築する実践的な経験を与え、そのさまざまな部分がどのように連携するかをより深く理解するのに役立ちました。また、開発スキルと問題解決能力も向上しました。<br><br><strong>影響:</strong> 50人以上の学生を評価し、彼らが学業の道について情報に基づいた決定を下すのを支援しました。",
        project_hci_long: "患者、クリニック、コミュニティサポートネットワーク間のギャップを埋めるマルチテナントヘルスケアエコシステム。このプラットフォームは、集中型デジタルインフラストラクチャを通じて、臨床業務、ドナー調整、患者支援を効率化します。<br><br><strong>プロジェクトの背景:</strong> <strong>Real IT OPC</strong>でのプロフェッショナルな仕事の一環として開発され、シニアデベロッパーと協力してこのソリューションをコンセプトから本番環境に移行しました。現在デプロイされており、クリニックのワークフローを積極的にサポートしています。<br><br><strong>主な実績:</strong> このシステムはパートナークリニックの日常業務に完全に統合され、手動プロセスを効率的なデジタル記録管理に置き換えました。",
        project_ritremis_long: "物件記録を集中化し、取引を合理化し、関係者に物件ポートフォリオのリアルタイムの可視性を提供するように設計された総合的な不動産管理情報システム。<br><br><strong>プロジェクトの背景:</strong> 現在<strong>Real IT OPC</strong>で開発チームと協力して積極的に開発中です。<br><br><strong>私の焦点:</strong> フロントエンド実装、UI/UXデザイン、および物件管理者とクライアントのためのレスポンシブで直感的なインターフェースの確保。",
        back_home: "ホームに戻る",
        lets_build: "一緒に何かを作りましょう",
        // Carousel
        carousel_tag: "最近の作品",
        carousel_title: "プロジェクト <span class=\"gradient-text\">ショーケース</span>",
        // Contact
        contact_tag: "連絡先",
        contact_title: "<span class=\"gradient-text\">ご連絡</span>ください",
        contact_sub: "私は新しい機会、コラボレーション、またはただの気軽な会話にも常にオープンです。お気軽にお問い合わせください！",
        form_name: "お名前",
        form_email: "メールアドレス",
        form_message: "メッセージ",
        form_submit: "メッセージを送信",
        form_success_title: "ありがとうございます！",
        form_success_desc: "メッセージは送信されました。すぐにご連絡いたします！",
        // Footer
        footer_sub: "コンピュータサイエンス学士 · ウェブデベロッパー · UI/UXデザイナー",
        footer_badge: "機会に対応可能",
        visitor_label: "訪問者",
        // Resume Modal
        resume_title: "私の履歴書",
        resume_sub: "Cathyrine Menguito — コンピュータサイエンス学士",
        resume_personal: "個人情報",
        resume_personal_sub: "連絡先と場所の情報",
        resume_fullname: "氏名",
        resume_email: "メール",
        resume_phone: "電話番号",
        resume_location: "所在地",
        resume_pdf_title: "履歴書PDF",
        resume_pdf_sub: "完全な文書プレビュー",
        resume_loading: "履歴書プレビューを読み込み中...",
        resume_download: "PDFをダウンロード",
        resume_close: "閉じる"
    },
        ko: {
        // Navigation
        nav_home: "홈",
        nav_projects: "프로젝트",
        nav_about: "소개",
        nav_contact: "연락처",
        // Hero
        hero_badge: "기회 및 프리랜서 프로젝트 가능",
        hero_title: "안녕하세요, <span class=\"gradient-text\">Cathyrine Menguito</span>입니다",
        hero_description: "저는 최근 컴퓨터 과학을 전공하고 졸업했으며, 웹 개발, UI/UX, 기술에 대한 관심이 점점 커지고 있습니다. 학술 프로젝트를 통해 웹 기반 시스템을 구축하고, 신중한 디자인이 기술을 더 쉽고 유용하게 만드는 방법을 탐구할 기회를 얻었습니다. 계속 배우고, 실제 경험을 쌓고, IT 업계에서의 여정을 시작하게 되어 기쁩니다.",
        hero_projects_btn: "프로젝트 목록",
        hero_contact_btn: "연락하기",
        scroll_indicator: "스크롤",
        stat_projects: "프로젝트",
        stat_experience: "년 경력",
        stat_certifications: "자격증",
        live_status: "현재 탐구 중: React.js 및 Tailwind CSS",
        floating_cta: "대화하기",
        scroll_down: "아래로 스크롤",
        // Quote
        quote_label: "오늘의 성구",
        // Services
        services_tag: "제공 가능한 서비스",
        services_title: "기여할 수 있는 <span class=\"gradient-text\">분야</span>",
        service_web_title: "웹 개발",
        service_web_desc: "HTML, CSS, JavaScript, PHP, MySQL과 같은 기술을 사용하여 반응형 및 기능적인 웹사이트와 웹 기반 애플리케이션을 개발합니다.",
        service_ui_title: "UI/UX 및 인터페이스 디자인",
        service_ui_desc: "사용성, 구성, 전반적인 사용자 경험에 중점을 둔 깔끔하고 직관적인 사용자 인터페이스를 디자인합니다.",
        service_academic_title: "학술 시스템 개발",
        service_academic_desc: "웹 기반 시스템, 시스템 인터페이스 및 관련 개발 작업을 포함한 학술 및 캡스톤 프로젝트에 대한 기술 지원을 제공합니다.",
        service_doc_title: "기술 문서화",
        service_doc_desc: "시스템 문서, 기술 다이어그램, 프로젝트 프레젠테이션 및 소프트웨어 프로젝트 관련 기타 문서 작성 지원.",
        service_brand_title: "브랜딩 및 시각적 아이덴티티",
        service_brand_desc: "로고 디자인, 색상 팔레트, 타이포그래피 시스템, 브랜드 가이드라인을 포함한 일관된 시각적 아이덴티티를 만들어 비즈니스와 프로젝트가 돋보이고 기억에 남도록 지원합니다.",
        // Experience
        exp_tag: "경력",
        exp_title: "내 <span class=\"gradient-text\">경력 여정</span>",
        exp_role1: "운영 및 고객 성공 책임자 | 시스템 개발자",
        exp_desc1: "시스템 기능, 사용자 인터페이스 구현, 프로젝트 관련 기술 작업을 포함한 웹 기반 시스템 및 디지털 솔루션 개발에 기여합니다. 이 역할은 컴퓨터 과학 지식을 실용적인 프로젝트에 적용하고 기술 및 전문 기술을 지속적으로 강화할 수 있게 해줍니다.",
        exp_role2: "임원 에이전트",
        exp_desc2: "문의 처리, 서비스 관련 문제 해결, 요청 조정을 통해 전문적인 고객 지원을 제공하여 고객 만족과 효율적인 운영을 보장했습니다.",
        // About
        about_tag: "소개",
        about_title: "의미 있는 솔루션 구축에 <span class=\"gradient-text\">열정적</span>",
        about_p1: "저는 Renaissance School of Science and Technology, Inc.에서 컴퓨터 과학 학사 학위를 받은 Cathyrine Menguito입니다. 웹 개발, 사용자 인터페이스 디자인, 실제 요구 사항을 해결하는 실용적인 기술 솔루션 생성에 점점 더 관심을 갖고 있습니다.",
        about_p2: "학업 과정을 통해, 특히 웹 기반 시스템 구축에서 소프트웨어 개발 프로젝트를 통해 실무 경험을 쌓았습니다. 의료 관리, 진로 평가 및 기타 실용적인 애플리케이션과 관련된 프로젝트에 참여하여 프론트엔드 개발, 인터페이스 디자인 및 사용자 경험에 대한 기초를 다졌습니다.",
        about_p3: "TESDA의 컴퓨터 시스템 서비스 국가 자격증 II를 보유하고 있으며, 리더십, 협업 및 프로젝트 기반 작업에 대한 경험을 쌓았습니다. 전문적인 여정을 시작하면서, 저는 지속적으로 배우고 기술을 강화하며, 기여하고, 실제 경험을 쌓고, IT 전문가로 성장할 기회를 찾고 있습니다.",
        about_resume_preview: "이력서 미리보기",
        about_resume_download: "PDF 다운로드",
        // Skills
        skills_tech_title: "기술 능력",
        skills_tools_title: "도구 및 기술",
        skills_prof_title: "전문 능력",
        skills_proficiency: "능력 숙련도",
        skills_distribution: "능력 분포",
        // Education
        edu_tag: "학력",
        edu_title: "내 <span class=\"gradient-text\">학업 여정</span>",
        // Timeline
        timeline_tag: "여정",
        timeline_title: "프로젝트 <span class=\"gradient-text\">타임라인</span>",
        timeline_desc1: "학술 논문 프로젝트 - 리살주 모롱의 지역 보건소를 위한 의료 관리 시스템. Ariel B. Eubanas, Jr.와 공동 개발. 우수 시스템 디자인 및 우수 논문 작성 상 수상.",
        timeline_desc2: "독자적으로 개발한 학술 프로젝트 - 입학 예정 고등학생들이 자신의 관심사와 기술에 따라 적합한 SHS 트랙을 탐색할 수 있도록 설계된 웹 기반 진로 평가 도구.",
        timeline_desc3: "Real IT OPC에서 Kenji Akira Bergaño 및 Ariel B. Eubanas, Jr.와 협력하여 개발한 전문 프로젝트. 클리닉 워크플로에서 활발히 사용되는 의료 및 지원 플랫폼.",
        timeline_desc4: "Real IT OPC에서 Kenji Akira Bergaño 및 Ariel B. Eubanas, Jr.와 협력하여 개발한 전문 프로젝트. 부동산 관리 및 자산 정보 플랫폼.",
        // Team
        team_tag: "협업",
        team_title: "함께 일한 <span class=\"gradient-text\">사람들</span>",
        team_sub: "저는 팀워크에서 활력을 얻습니다. 제가 함께 협업한 재능 있는 개발자들을 소개합니다.",
        // Clients
        clients_title: "웹 시스템이나 디지털 프로젝트를 <span class=\"gradient-text\">계획 중이신가요?</span>",
        clients_desc: "저는 개발 팀과 협력하여 기업, 조직, 프로젝트 팀을 위한 실용적인 웹 기반 시스템과 애플리케이션을 구축합니다. 우리는 기능적인 솔루션, 사용자 친화적인 인터페이스, 특정 요구 사항에 맞게 설계된 시스템에 중점을 둡니다.",
        clients_cta: "프로젝트 논의하기",
        // Projects (Featured)
        projects_tag: "포트폴리오",
        projects_title: "주요 <span class=\"gradient-text\">프로젝트</span>",
        project_rhu_desc: "리살주 모롱 지역 보건소를 위한 웹 기반 관리 정보 시스템.",
        project_angono_desc: "입학 예정 고등학생을 위한 웹 기반 진로 평가 도구.",
        project_hci_desc: "환자, 클리닉, 기증자를 연결하는 통합 클리닉 기록 및 의료 관리 시스템.",
        projects_see_all: "모든 프로젝트 보기",
        // Projects Page
        projects_page_title: "프로젝트",
        projects_page_sub: "웹 개발, 시스템 디자인, 협업 문제 해결에서의 성장을 보여주는 학술 및 전문 작업 모음.",
        filter_all: "전체",
        filter_healthcare: "헬스케어",
        filter_education: "교육",
        filter_realestate: "부동산",
        project_rhu_long: "우리의 논문 프로젝트로 구축된 종합 의료 관리 플랫폼입니다. 이 시스템은 리살주 모롱의 지역 보건소의 환자 접수, 예약 일정, 기록 관리를 디지털화했습니다.<br><br><strong>제 기여:</strong> 프론트엔드 아키텍처와 사용자 인터페이스 디자인을 주도하여 의료진에게 원활한 경험을 보장했습니다. 백엔드 통합 및 시스템 최적화를 위해 공동 개발자와 긴밀히 협력했습니다.<br><br><strong>인정:</strong> 우리의 작업으로 <strong>우수 시스템 디자인</strong> 및 <strong>우수 논문 작성</strong> 상을 수상했습니다.",
        project_angono_long: "입학 예정 고등학생들이 자신의 SHS 트랙을 식별하도록 돕기 위해 개발된 웹 기반 진로 안내 도구입니다. 이 시스템은 학생들의 관심사, 기술, 학업 성향을 평가하여 데이터 기반 추천을 제공합니다.<br><br><strong>제 역할:</strong> 데이터베이스, 프론트엔드, 시스템 기능, 배포에 대해 독립적으로 시스템을 개발했습니다. 이 프로젝트는 완전한 웹 애플리케이션을 구축하는 실무 경험을 제공했으며, 다양한 부분이 어떻게 함께 작동하는지 더 잘 이해하는 데 도움이 되었습니다. 또한 개발 및 문제 해결 능력을 향상시켰습니다.<br><br><strong>영향:</strong> 50명 이상의 학생을 성공적으로 평가하여 학업 경로에 대해 정보에 입각한 결정을 내리도록 도왔습니다.",
        project_hci_long: "환자, 클리닉, 커뮤니티 지원 네트워크 간의 격차를 해소하는 멀티테넌트 헬스케어 생태계입니다. 이 플랫폼은 중앙 집중식 디지털 인프라를 통해 임상 운영, 기증자 조정, 환자 지원을 간소화합니다.<br><br><strong>프로젝트 맥락:</strong> <strong>Real IT OPC</strong>에서의 전문 업무의 일환으로 개발되었으며, 시니어 개발자와 협력하여 이 솔루션을 컨셉에서 프로덕션까지 구현했습니다. 현재 배포되어 클리닉 워크플로를 적극적으로 지원하고 있습니다.<br><br><strong>주요 성과:</strong> 이 시스템은 파트너 클리닉의 일상 업무에 완전히 통합되어 수동 프로세스를 효율적인 디지털 기록 관리로 대체했습니다.",
        project_ritremis_long: "자산 기록을 중앙화하고, 거래를 간소화하며, 이해관계자에게 자산 포트폴리오에 대한 실시간 가시성을 제공하도록 설계된 종합 부동산 관리 정보 시스템입니다.<br><br><strong>프로젝트 맥락:</strong> 현재 <strong>Real IT OPC</strong>에서 개발 팀과 협력하여 활발히 개발 중입니다.<br><br><strong>제 초점:</strong> 프론트엔드 구현, UI/UX 디자인, 그리고 자산 관리자와 클라이언트를 위한 반응형이고 직관적인 인터페이스 보장.",
        back_home: "홈으로 돌아가기",
        lets_build: "함께 무언가를 만들어 봐요",
        // Carousel
        carousel_tag: "최근 작업",
        carousel_title: "프로젝트 <span class=\"gradient-text\">쇼케이스</span>",
        // Contact
        contact_tag: "연락처",
        contact_title: "<span class=\"gradient-text\">연락</span>주세요",
        contact_sub: "저는 새로운 기회, 협업, 또는 단순한 대화에도 항상 열려 있습니다. 편하게 연락주세요!",
        form_name: "이름",
        form_email: "이메일",
        form_message: "메시지",
        form_submit: "메시지 보내기",
        form_success_title: "감사합니다!",
        form_success_desc: "메시지가 전송되었습니다. 곧 연락드리겠습니다!",
        // Footer
        footer_sub: "컴퓨터 과학 학사 · 웹 개발자 · UI/UX 디자이너",
        footer_badge: "기회 가능",
        visitor_label: "방문자",
        // Resume Modal
        resume_title: "내 이력서",
        resume_sub: "Cathyrine Menguito — 컴퓨터 과학 학사",
        resume_personal: "개인 정보",
        resume_personal_sub: "연락처 및 위치 정보",
        resume_fullname: "성명",
        resume_email: "이메일",
        resume_phone: "전화번호",
        resume_location: "위치",
        resume_pdf_title: "이력서 PDF",
        resume_pdf_sub: "전체 문서 미리보기",
        resume_loading: "이력서 미리보기 로딩 중...",
        resume_download: "PDF 다운로드",
        resume_close: "닫기"
    },
};

// ============================================================
//  LANGUAGE DROPDOWN - Updated HTML structure required
// ============================================================
// The language dropdown HTML should replace the old button:
// <div class="lang-selector">
//     <select id="lang-select" aria-label="Select language">
//         <option value="en">🇺🇸 English</option>
//         <option value="fil">🇵🇭 Filipino</option>
//     </select>
// </div>

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
//  I18N ENGINE - FIXED with Dropdown Support
// ============================================================
function setLanguage(lang) {
    if (!translations[lang]) {
        lang = 'en';
    }
    currentLang = lang;
    localStorage.setItem('lang', lang);

    // Update dropdown select if it exists
    const select = document.getElementById('lang-select');
    if (select) {
        select.value = lang;
    }

    // Update all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.getAttribute('data-i18n');
        const text = translations[lang][key];
        if (text !== undefined) {
            // Check if we need to preserve HTML inside the element
            // For elements with nested HTML (like gradient-text), we use innerHTML
            // But we need to be careful not to double-escape
            if (key === 'hero_title' || key === 'services_title' || key === 'exp_title' || 
                key === 'about_title' || key === 'edu_title' || key === 'timeline_title' ||
                key === 'team_title' || key === 'projects_title' || key === 'contact_title' ||
                key === 'clients_title' || key === 'carousel_title' || key === 'projects_page_title') {
                el.innerHTML = text;
            } else {
                el.innerHTML = text;
            }
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

    // Update quote type
    const quoteType = document.getElementById('quote-type');
    if (quoteType) {
        const label = translations[lang]?.quote_label || 'Verse of the Day';
        quoteType.innerHTML = `<i class="fas fa-bible"></i> ${label}`;
    }

    // Restart typewriter with new language
    const tagline = document.getElementById('tagline');
    if (tagline) {
        typewriterRunning = false;
        if (typewriterTimeoutId) clearTimeout(typewriterTimeoutId);
        setTimeout(() => startTypewriter(), 300);
    }
}

// ============================================================
//  TYPEWRITER EFFECT - Fixed to use current language
// ============================================================
let typewriterRunning = false;
let typewriterTimeoutId = null;

function startTypewriter() {
    const taglineElement = document.getElementById('tagline');
    if (!taglineElement) return;
    
    // Get the current hero title, strip HTML tags for the typewriter
    const heroText = translations[currentLang]?.hero_title || 'Hi, I\'m Cathyrine Menguito';
    const cleanHero = heroText.replace(/<[^>]*>/g, '');
    
    const taglines = [
        cleanHero,
        translations[currentLang]?.hero_title?.replace(/<[^>]*>/g, '') || 'Computer Science Graduate',
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
//  VISITOR COUNTER - FIXED with better error handling
// ============================================================
async function getVisitorCount() {
    const countElement = document.getElementById('visitor-count');
    if (!countElement) return;
    
    // Try multiple strategies to get a visitor count
    const strategies = [
        // Strategy 1: Try countapi.xyz
        async () => {
            const response = await fetch('https://api.countapi.xyz/hit/cthyrnmngt718/visits');
            if (!response.ok) throw new Error('API returned ' + response.status);
            const data = await response.json();
            return data.value || 0;
        },
        // Strategy 2: Use localStorage counter
        () => {
            if (!sessionStorage.getItem('visitorCounted')) {
                let count = parseInt(localStorage.getItem('visitorCount') || '0');
                count++;
                localStorage.setItem('visitorCount', count);
                sessionStorage.setItem('visitorCounted', 'true');
                return count;
            }
            return parseInt(localStorage.getItem('visitorCount') || '0');
        }
    ];

    let count = 0;
    let success = false;

    for (const strategy of strategies) {
        try {
            const result = await strategy();
            if (result !== undefined && result !== null) {
                count = result;
                success = true;
                break;
            }
        } catch (e) {
            // Continue to next strategy
            console.log('Visitor count strategy failed:', e.message);
        }
    }

    // If all strategies failed, use a random fallback
    if (!success) {
        count = Math.floor(Math.random() * 100) + 50;
        // Store in localStorage for persistence
        if (!localStorage.getItem('visitorCount')) {
            localStorage.setItem('visitorCount', count.toString());
        }
        // Don't show toast for visitor count - it's non-critical
    }

    countElement.textContent = count;
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
    
    try {
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
            const label = translations[currentLang]?.quote_label || 'Verse of the Day';
            quoteType.innerHTML = `<i class="fas fa-bible"></i> ${label}`;
            quoteType.style.color = '#ffdd44';
            quoteType.style.borderColor = 'rgba(255, 221, 68, 0.3)';
            quoteType.style.background = 'rgba(255, 221, 68, 0.1)';
        }
    } catch (e) {
        // Silent fallback
        quoteText.textContent = "I can do all things through Christ who strengthens me.";
        quoteAuthor.textContent = "— Philippians 4:13";
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

    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = () => createRadarChart(canvas);
        document.head.appendChild(script);
        return;
    }

    createRadarChart(canvas);
}

function createRadarChart(canvas) {
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
            .catch(() => {
                renderPDFWithIframe();
            });
    }

    function renderPDFWithIframe() {
        const viewer = pdfViewer;
        const pdfUrl = 'Cathyrine%20Menguito%20Resume.pdf';
        
        viewer.innerHTML = `
            <iframe src="${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0" 
                    style="width:100%;height:100%;min-height:400px;border:none;display:block;"
                    loading="lazy">
            </iframe>
            <div class="pdf-error" style="display:none;flex-direction:column;align-items:center;justify-content:center;height:400px;color:var(--text-secondary);text-align:center;padding:24px;gap:12px;">
                <i class="fas fa-file-pdf" style="font-size:3.5rem;color:var(--text-secondary);opacity:0.3;"></i>
                <p style="font-size:0.95rem;margin:0;">Resume preview unavailable.</p>
                <p style="font-size:0.85rem;opacity:0.6;margin:0;">Use the Download button below to view the full PDF.</p>
            </div>
        `;
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
        const isMobile = window.innerWidth < 768;
        const count = isMobile ? 25 : Math.min(50, Math.floor((width * height) / 20000));
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
//  SPA PAGE TRANSITIONS
// ============================================================
function initSPA() {
    const app = document.getElementById('app');
    if (!app) return;

    document.addEventListener('click', async (e) => {
        const link = e.target.closest('a');
        if (!link || !link.href || link.target === '_blank') return;
        
        if (!link.href.includes(window.location.origin)) return;
        if (link.href.includes('#') && link.href.split('#')[0] === window.location.href.split('#')[0]) return;
        if (link.hasAttribute('download')) return;

        e.preventDefault();
        const url = link.href;

        app.classList.add('page-exit');
        
        setTimeout(async () => {
            try {
                const resp = await fetch(url);
                if (!resp.ok) throw new Error('Network response was not ok');
                const html = await resp.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                
                document.title = doc.title;
                
                const newApp = doc.getElementById('app');
                if (!newApp) throw new Error('New app content not found');
                
                app.innerHTML = newApp.innerHTML;
                
                app.classList.remove('page-exit');
                app.classList.add('page-enter');
                
                window.history.pushState({}, '', url);
                
                initApp();
                
                requestAnimationFrame(() => {
                    app.classList.remove('page-enter');
                });
                
                window.scrollTo(0, 0);
                
            } catch (error) {
                showToast('Failed to load page. Please try again.', 'error');
                app.classList.remove('page-exit');
                window.location.href = url;
            }
        }, 300);
    });

    window.addEventListener('popstate', () => {
        window.location.reload();
    });
}

// ============================================================
//  MAIN INIT FUNCTION
// ============================================================
function initApp() {
    // Language - set from stored preference
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

    // Visitor count (silent, no toast on error)
    getVisitorCount();

    // Radar chart (lazy load)
    const radarContainer = document.querySelector('.radar-chart-container');
    if (radarContainer) {
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
//  SERVICE WORKER REGISTRATION
// ============================================================
if ('serviceWorker' in navigator) {
    let swRegistration;
    navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
            swRegistration = registration;
            console.log('Service Worker registered successfully');
            
            setInterval(() => {
                registration.update();
            }, 60000);
        })
        .catch((error) => {
            console.log('Service Worker registration failed:', error);
        });

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
    initApp();
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            const loader = document.getElementById('page-loader');
            if (loader) loader.classList.add('hidden');
        }, 600);
    });

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

// ============================================================
//  CURSOR GLOW
// ============================================================
const cursorGlow = document.getElementById('cursor-glow');

if (cursorGlow) {
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });
}

// ============================================================
//  LIVE STATUS ROTATOR
// ============================================================
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

// ============================================================
//  LIVE STATUS ROTATOR (i18n-aware)
// ============================================================
let statusIndex = 0;
const statusElement = document.querySelector('.status-text');

function getStatusTexts() {
    // Use the live_status from current language, or fallback
    const liveStatus = translations[currentLang]?.live_status || 'Currently exploring: React.js & Tailwind CSS';
    // Create variations from the current status
    const base = liveStatus.replace(/Currently exploring:|Kasalukuyang nag-e-explore:|現在探求中:|현재 탐구 중:/g, '').trim();
    return [
        liveStatus,
        `${translations[currentLang]?.live_status_prefix || 'Building:'} New portfolio projects`,
        `${translations[currentLang]?.live_status_learning || 'Learning:'} Advanced JavaScript`,
        translations[currentLang]?.live_status_available || 'Available for freelance work'
    ];
}

// Fallback status texts if translations are missing
const fallbackStatuses = [
    'Currently exploring: React.js & Tailwind CSS',
    'Building: New portfolio projects',
    'Learning: Advanced JavaScript',
    'Available for freelance work'
];

function rotateStatus() {
    if (!statusElement) return;
    
    // Try to get translated statuses, fallback to hardcoded
    let statuses = fallbackStatuses;
    try {
        const translated = getStatusTexts();
        if (translated && translated.length > 0) {
            statuses = translated;
        }
    } catch (e) {
        // Use fallback
    }
    
    statusIndex = (statusIndex + 1) % statuses.length;
    statusElement.textContent = statuses[statusIndex];
}

// Update statuses when language changes
function updateStatusesOnLangChange() {
    if (statusElement) {
        const liveStatus = translations[currentLang]?.live_status || 'Currently exploring: React.js & Tailwind CSS';
        statusElement.textContent = liveStatus;
        statusIndex = 0; // Reset index when language changes
    }
}

// Add this to setLanguage() function
// Find the setLanguage function and add this line inside it:
// updateStatusesOnLangChange();

// Start the rotator
if (statusElement) {
    setInterval(rotateStatus, 5000);
}
