document.addEventListener('DOMContentLoaded', function() {
    // --- Project Details Expansion ---
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(projectItem => {
        const expandButton = projectItem.querySelector('.expand-button');
        const details = projectItem.querySelector('.project-details');

        if (expandButton && details) {
            expandButton.addEventListener('click', () => {
                const isExpanded = details.classList.contains('expanded');
                details.classList.toggle('expanded');
                expandButton.textContent = isExpanded ? 'Xem chi tiết' : 'Thu gọn';
            });
        }
    });

    // --- Smooth Scrolling and Active Navigation ---
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(navLink => {
        navLink.addEventListener('click', function(event) {
            event.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });

                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // --- AOS Initialization ---
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
        });
    } else {
        console.warn('AOS is not defined. Ensure it is properly included.');
    }

    // --- Particle Creation ---
    const homeSection = document.getElementById('home');
    if (homeSection) {
        const numParticles = 30;
        for (let i = 0; i < numParticles; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            const x = (Math.random() - 0.5) * 100;
            const y = (Math.random() - 0.5) * 100;
            particle.style.setProperty('--x', `${x}px`);
            particle.style.setProperty('--y', `${y}px`);
            particle.style.top = `${Math.random() * 100}vh`;
            particle.style.left = `${Math.random() * 100}vw`;
            particle.style.animationDelay = `${Math.random() * 3}s`;
            particle.style.scale = `${Math.random() * 0.5 + 0.5}`;
            homeSection.appendChild(particle);
        }
    } else {
        console.warn('Home section not found, particles not generated.');
    }

    // --- Add scroll animations ---
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.8s ease-in-out';

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    section.style.opacity = 1;
                    section.style.transform = 'translateY(0)';
                    observer.disconnect();
                }
            });
        }, {
            threshold: 0.1,
        });

        observer.observe(section);
    });

    // --- Chế độ Sáng/Tối ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const sunIcon = themeToggle.querySelector('.fa-sun');
    const moonIcon = themeToggle.querySelector('.fa-moon');

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        sunIcon.style.display = sunIcon.style.display === 'none' ? 'block' : 'none';
        moonIcon.style.display = moonIcon.style.display === 'none' ? 'block' : 'none';
    });

    // --- Chuyển đổi Ngôn Ngữ ---
    const languageToggle = document.getElementById('language-toggle');
    const langVi = languageToggle.querySelector('.lang-vi');
    const langEn = languageToggle.querySelector('.lang-en');

    // Dữ liệu ngôn ngữ
    const translations = {
        'Home': { 'VI': 'Trang Chủ', 'EN': 'Home' },
        'Introduce': { 'VI': 'Giới Thiệu', 'EN': 'Introduce' },
        'Projects': { 'VI': 'Dự Án', 'EN': 'Projects' },
        'Level': { 'VI': 'Trình Độ', 'EN': 'Level' },
        'Programming': { 'VI': 'Lập Trình', 'EN': 'Programming' },
        'Channel': { 'VI': 'Kênh', 'EN': 'Channel' },
        'Contact': { 'VI': 'Liên Hệ', 'EN': 'Contact' },
        'homeHeading': { 'VI': 'Đoàn Công Minh', 'EN': 'Doan Cong Minh' },
        'homeSubheading': { 'VI': 'Web Developer & Hardware Engineer', 'EN': 'Web Developer & Hardware Engineer' },
        'homeDescription': { 'VI': 'Sinh viên IT năng động, đam mê giải quyết vấn đề và khám phá công nghệ.', 'EN': 'Dynamic IT student, passionate about problem-solving and exploring technology.' },
        'homeProjectButton': { 'VI': 'Xem dự án', 'EN': 'View Projects' },
        'homeAboutButton': { 'VI': 'Tìm hiểu thêm', 'EN': 'Learn More' },
        'introduce': { 'VI': 'Giới Thiệu', 'EN': 'Introduce' },
        'aboutText1': { 'VI': 'Xin chào! Tôi là Đoàn Công Minh, một sinh viên năm 2 chuyên ngành Công nghệ Thông tin tại Đại học Nam Cần Thơ. Tôi có niềm đam mê đặc biệt với lĩnh vực phát triển web và khám phá thế giới phần cứng. Tôi luôn tìm kiếm những thử thách mới để rèn luyện kỹ năng và áp dụng kiến thức đã học vào các dự án thực tế.', 'EN': 'Hello! I am Doan Cong Minh, a second-year student majoring in Information Technology at Nam Can Tho University. I have a special passion for web development and exploring the world of hardware. I am always looking for new challenges to improve my skills and apply my knowledge to real-world projects.' },
        'aboutText2': { 'VI': 'Trong lĩnh vực phát triển web, tôi tập trung vào việc xây dựng các trang web hiện đại, responsive và thân thiện với người dùng. Tôi có kiến thức về HTML, CSS, JavaScript và đang học hỏi thêm về các framework và thư viện phổ biến.', 'EN': 'In web development, I focus on building modern, responsive, and user-friendly websites. I have knowledge of HTML, CSS, JavaScript, and am learning more about popular frameworks and libraries.' },
        'aboutText3': { 'VI': 'Đối với phần cứng, tôi thích tìm hiểu về cách các thiết bị hoạt động, mày mò với Arduino và các dự án điện tử sáng tạo khác. Sự kết hợp giữa phần mềm và phần cứng mang đến cho tôi những ý tưởng độc đáo và thú vị.', 'EN': 'For hardware, I like to learn about how devices work, tinker with Arduino, and explore other creative electronics projects. The combination of software and hardware brings me unique and interesting ideas.' },
        'projects': { 'VI': 'Dự Án', 'EN': 'Projects' },
        'project1Title': { 'VI': 'Bảng Mạch In', 'EN': 'Printed Circuit Board' },
        'project1Button': { 'VI': 'Xem chi tiết', 'EN': 'View Details' },
        'project1Details': { 'VI': 'Đây là mô tả chi tiết về nền tảng thương mại điện tử này.', 'EN': 'This is a detailed description of this e-commerce platform.' },
        'project1Detail1': { 'VI': 'Thiết kế và chế tạo bảng:', 'EN': 'Board design and fabrication:' },
        'project1Detail2': { 'VI': 'Bảng treo quần áo tự động có cảm biến ánh sáng', 'EN': 'Automatic clothes hanger board with light sensor' },
        'project1Detail3': { 'VI': 'Bảng đèn nháy kiểu cảnh sát', 'EN': 'Police-style flashing light board' },
        'project1Detail4': { 'VI': 'Bảng khuếch đại âm thanh', 'EN': 'Audio amplifier board' },
        'project2Title': { 'VI': 'Dog Carbot', 'EN': 'Dog Carbot' },
        'project2Button': { 'VI': 'Xem chi tiết', 'EN': 'View Details' },
        'project2Details': { 'VI': 'Đây là mô tả chi tiết về robot Dog Carbot.', 'EN': 'This is a detailed description of the Dog Carbot project.' },
        'project2Detail1': { 'VI': 'Bộ vi điều khiển: Arduino Mega', 'EN': 'Microcontroller: Arduino Mega' },
        'project2Detail2': { 'VI': 'Firmware: lập trình C++ cho Arduino Uno R3, sử dụng HC 05 để kết nối điện thoại di động qua bluetooth, bánh xe mecanum giúp xe di chuyển nhẹ nhàng', 'EN': 'Firmware: C++ programming for Arduino Uno R3, using HC 05 to connect mobile phone via Bluetooth, mecanum wheels for smooth vehicle movement' },
        'project2Detail3': { 'VI': 'Sofware: sử dụng ứng dụng trên CH Play "Bluetooth RC Car"', 'EN': 'Software: using "Bluetooth RC Car" app on CH Play' },
        'project3Title': { 'VI': 'Thùng Rác Thông Minh', 'EN': 'Smart Trash Can' },
        'project3Button': { 'VI': 'Xem chi tiết', 'EN': 'View Details' },
        'project3Details': { 'VI': 'Đây là mô tả chi tiết về thùng rác thông minh.', 'EN': 'This is a detailed description of the smart trash can.' },
        'project3Detail1': { 'VI': 'Cảm biến khoảng cách: có thể phát hiện người trong phạm vi 20cm và tự động mở nắp', 'EN': 'Distance sensor: can detect people within 20cm and automatically open the lid' },
           'project3Detail2': { 'VI': 'Cơ cấu phân loại: có chức năng báo đầy rác', 'EN': 'Sorting mechanism: has a function to indicate when the trash is full' },
           'project3Detail3': { 'VI': 'Tiện ích: có loa tuyên truyền bảo vệ môi trường', 'EN': 'Utilities: has a speaker to promote environmental protection' },
           'level': { 'VI': 'Trình Độ', 'EN': 'Level' },
           'mySkills': { 'VI': 'Kỹ Năng Của Tôi', 'EN': 'My Skills' },
           'skillWebDev': { 'VI': 'Web Development', 'EN': 'Web Development' },
           'skillHardware': { 'VI': 'Hardware Programming', 'EN': 'Hardware Programming' },
           'skillProblemSolving': { 'VI': 'Problem Solving', 'EN': 'Problem Solving' },
           'skillTeamwork': { 'VI': 'Teamwork', 'EN': 'Teamwork' },
           'myEducation': { 'VI': 'Học Vấn', 'EN': 'Education' },
           'eduNCTU': { 'VI': 'Đại học Nam Cần Thơ', 'EN': 'Nam Can Tho University' },
           'eduNCTUInfo': { 'VI': 'Sinh viên ngành Công nghệ Thông tin', 'EN': 'Student of Information Technology' },
           'eduNCTUTime': { 'VI': '2022 - 2026 (dự kiến)', 'EN': '2022 - 2026 (expected)' },
           'otherSkills': { 'VI': 'Kỹ Năng Khác', 'EN': 'Other Skills' },
           'otherSkill1': { 'VI': 'Giao tiếp', 'EN': 'Communication' },
           'otherSkill2': { 'VI': 'Quản lý thời gian', 'EN': 'Time management' },
           'otherSkill3': { 'VI': 'Tư duy phản biện', 'EN': 'Critical thinking' },
           'programming': { 'VI': 'Lập Trình', 'EN': 'Programming' },
           'langHTML': { 'VI': 'HTML', 'EN': 'HTML' },
           'langCSS': { 'VI': 'CSS', 'EN': 'CSS' },
           'langJS': { 'VI': 'JavaScript', 'EN': 'JavaScript' },
           'langCPlusPlus': { 'VI': 'C++', 'EN': 'C++' },
           'langPython': { 'VI': 'Python', 'EN': 'Python' },
           'langMySQL': { 'VI': 'MySQL', 'EN': 'MySQL' },
           'langScratch': { 'VI': 'Scratch', 'EN': 'Scratch' },
           'langReact': { 'VI': 'React', 'EN': 'React' },
           'langReactNative': { 'VI': 'React Native', 'EN': 'React Native' },
           'channel': { 'VI': 'Kênh', 'EN': 'Channel' },
           'channelYouTube': { 'VI': 'YouTube', 'EN': 'YouTube' },
           'channelGitHub': { 'VI': 'GitHub', 'EN': 'GitHub' },
           'contact': { 'VI': 'Liên Hệ', 'EN': 'Contact' },
           'contactAddress': { 'VI': 'Địa Chỉ', 'EN': 'Address' },
           'contactAddressInfo': { 'VI': 'TP. Cần Thơ, VN', 'EN': 'Can Tho City, VN' },
           'contactPhone': { 'VI': 'Số Điện Thoại', 'EN': 'Phone Number' },
           'contactPhoneInfo': { 'VI': '+84 917847649', 'EN': '+84 917847649' },
           'contactEmail': { 'VI': 'Địa Chỉ Email', 'EN': 'Email Address' },
           'contactFacebook': { 'VI': 'Facebook', 'EN': 'Facebook' },
           'footer': { 'VI': '© 2025 All rights reserved | This template is made by Tommy Doan', 'EN': '© 2025 All rights reserved | This template is made by Tommy Doan' },
           'levelJunior': { 'VI': 'Junior', 'EN': 'Junior' },
           'levelFresher': { 'VI': 'Fresher', 'EN': 'Fresher' },
           'eduB1': { 'VI': 'Chứng chỉ B1', 'EN': 'B1 Certificate' },
           'eduB1Info': { 'VI': 'Được cấp bởi Đại học Cần Thơ', 'EN': 'Issued by Can Tho University' },
           'eduB1Time': { 'VI': 'Chứng chỉ chứng minh trình độ tiếng Anh ở trình độ B1. (2025)', 'EN': 'Certificate of English proficiency at B1 level. (2025)' },
           'eduSoftSkill': { 'VI': 'Chứng chỉ Kỹ năng mềm loại giỏi', 'EN': 'Excellent Soft Skills Certificate' },
           'eduSoftSkillInfo': { 'VI': 'Được cấp bởi Trường Đại học Nam Cần Thơ', 'EN': 'Issued by Nam Can Tho University' },
           'eduSoftSkillTime': { 'VI': '(2025)', 'EN': '(2025)' },
           'skillDatasheet': { 'VI': 'Đọc Datasheet', 'EN': 'Read Datasheet' },
           'skillCommunication': { 'VI': 'Kỹ năng giao tiếp', 'EN': 'Communication skills' },
           'skillPresentation': { 'VI': 'Kỹ năng thuyết trình', 'EN': 'Presentation skills' },
           'channelInstagram': { 'VI': 'Instagram', 'EN': 'Instagram' },
           'channelTiktok': { 'VI': 'TikTok', 'EN': 'TikTok' },
           'contactAddressCard': { 'VI': 'Địa Chỉ', 'EN': 'Address' },
           'contactPhoneCard': { 'VI': 'Số Điện Thoại', 'EN': 'Phone Number' },
           'contactEmailCard': { 'VI': 'Địa Chỉ Email', 'EN': 'Email Address' },
           'contactFacebookCard': { 'VI': 'Facebook', 'EN': 'Facebook' },
       };
   
       function updateText(lang) {
           for (const key in translations) {
               const element = document.querySelector(`[data-i18n="${key}"]`);
               if (element) {
                   element.textContent = translations[key][lang];
               }
           }
           document.documentElement.lang = lang;
       }
   
       languageToggle.addEventListener('click', (e) => {
           if (e.target.classList.contains('lang-vi')) {
               langVi.classList.add('active');
               langEn.classList.remove('active');
               updateText('VI');
               document.documentElement.lang = 'vi'; // Cập nhật thuộc tính lang của html
           } else if (e.target.classList.contains('lang-en')) {
               langEn.classList.add('active');
               langVi.classList.remove('active');
               updateText('EN');
               document.documentElement.lang = 'en';
           }
       });
   });
