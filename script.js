/**
 * ==========================================================================
 * EDITORIAL PORTFOLIO INTERACTIVE LOGIC — NGUYỄN THỊ NGA
 * Features:
 * - Bilingual Language Engine (Vietnamese & English)
 * - Interactive Modals (CV Dossier, Research Paper, UX Blueprint)
 * - Copy to Clipboard & Toast Notifications
 * - Navigation Scrollspy & Mobile Drawer
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initLanguageEngine();
  initModals();
  initContactForm();
  initCopyActions();
});

/* ==========================================================================
   1. NAVIGATION & SCROLLSPY
   ========================================================================== */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('navMenu');

  // Sticky header scroll shadow
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    highlightCurrentSection();
  });

  // Mobile menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // Scrollspy
  function highlightCurrentSection() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 140;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
}

/* ==========================================================================
   2. BILINGUAL LANGUAGE ENGINE (VI / EN)
   ========================================================================== */
const TRANSLATIONS = {
  vi: {
    // Header & Meta
    dossierIssue: "NGUYỄN THỊ NGA — PORTFOLIO CÁ NHÂN",
    institution: "ĐẠI HỌC NGOẠI THƯƠNG (FTU) • HÀ NỘI",
    navHome: "Trang Chủ",
    navAbout: "Giới Thiệu",
    navSkills: "Kỹ Năng",
    navProjects: "Dự Án",
    navExperience: "Kinh Nghiệm",
    navContact: "Liên Hệ",
    btnDownloadCV: "Tải CV (PDF)",
    btnPreviewCV: "Xem Nhanh CV",

    // Hero Section
    heroIssueBadge: "PORTFOLIO CÁ NHÂN • ĐẠI HỌC NGOẠI THƯƠNG",
    heroRoleTitle: "Sinh viên Kinh tế Quốc tế | Dữ liệu & Nghiên cứu",
    heroAbstract: "Sinh viên Kinh tế Quốc tế tại Trường Đại học Ngoại thương (FTU) với định hướng phân tích dữ liệu, nghiên cứu thực nghiệm và giải quyết vấn đề dựa trên dữ liệu định lượng.",
    btnViewWork: "Xem Công Trình & Dự Án",
    statStat1: "1.000+ Quan Sát",
    statLabel1: "Dữ Liệu Bảng & Chuỗi Thời Gian",
    statStat2: "FWPS Published",
    statLabel2: "FTU Working Paper Series",
    statStat3: "MOS Excel",
    statLabel3: "Chứng Chỉ Chuyên Nghiệp",

    // About Section
    aboutChapter: "CHƯƠNG 01 / HỒ SƠ & NỀN TẢNG HỌC THUẬT",
    aboutTitle: "Về Bản Thân & Định Hướng",
    aboutEducationTitle: "Học Vấn Tiêu Biểu",
    aboutDegree: "Sinh viên năm 3 Chuyên ngành Kinh tế Quốc tế",
    aboutSchool: "Trường Đại học Ngoại thương (FTU)",
    aboutGPA: "GPA Tích lũy 3.8",
    aboutPeriod: "08/2024 – Hiện tại",
    aboutCoursesTitle: "Môn Học Định Lượng Tiêu Biểu:",
    aboutCourse1: "Kinh tế lượng (Econometrics)",
    aboutCourse2: "Thống kê Kinh doanh",
    aboutCourse3: "Phân tích Dữ liệu trong Kinh tế & Kinh doanh",
    aboutCourse4: "Toán Kinh tế",
    aboutInterestTitle: "Định Hướng Học Thuật & Nghiên Cứu",
    aboutInterestDesc: "Tập trung vào mô hình hóa kinh tế lượng thực nghiệm, phân tích chuỗi thời gian, dữ liệu bảng (Panel Data) và nghiên cứu thị trường dựa trên dữ liệu định lượng.",
    aboutCareerTitle: "Mục Tiêu Nghề Nghiệp",
    aboutCareerDesc: "Ứng dụng năng lực phân tích dữ liệu và tư duy kinh tế vào nghiên cứu thị trường, tư vấn phân tích chiến lược kinh doanh và kinh tế học ứng dụng.",
    aboutHonorsTitle: "Học Bổng & Hoạt Động",
    aboutScholarship: "Học bổng KKHT (HK 2 năm học 2024–2025)",
    aboutClub: "Thành viên CLB Nghiên cứu thị trường FTU (MRC)",
    aboutLangTitle: "Ngoại Ngữ & Chứng Chỉ",

    // Skills Section
    skillsChapter: "CHƯƠNG 02 / NĂNG LỰC CHUYÊN MÔN",
    skillsTitle: "Hệ Thống Kỹ Năng & Công Cụ Phân Tích",
    skillsDesc: "Tập trung vào năng lực định lượng thực nghiệm, xử lý dữ liệu và công cụ phân tích hiện đại, không sử dụng thanh phần trăm ước lệ.",
    skill1Title: "Xử Lý, Làm Sạch & Phân Tích Dữ Liệu",
    skill1Desc: "Thu thập, làm sạch và xử lý bộ dữ liệu chuỗi thời gian/dữ liệu bảng (Panel Data) quy mô lớn (>1.000 quan sát) từ các nguồn dữ liệu vĩ mô uy tín (World Bank, Tổng cục Thống kê GSO).",
    skill2Title: "Mô Hình Hóa Kinh Tế Lượng & Dự Báo",
    skill2Desc: "Thiết lập, kiểm định giả thuyết và chạy mô hình hồi quy (OLS, Fixed Effects, Random Effects). Phát hiện và khắc phục hiện tượng khuyết tật mô hình (phương sai sai số thay đổi, tự tương quan).",
    skill3Title: "Phần Mềm & Công Cụ Phân Tích",
    skill3Desc: "Sử dụng thành thạo Stata, EViews trong nghiên cứu kinh tế lượng; làm chủ Microsoft Excel nâng cao (chứng chỉ quốc tế MOS Excel), SQL cơ bản và Power BI để trực quan hóa báo cáo.",
    skill4Title: "Tư Duy Phản Biện & Nghiên Cứu Khảo Sát",
    skill4Desc: "Kỹ năng thiết kế khảo sát, tổng hợp ý kiến và phản hồi từ người dùng (>200 sinh viên), phân tích hành vi người dùng, kỹ năng giao tiếp, đàm phán và thuyết trình tốt.",

    // Projects Section
    projectsChapter: "CHƯƠNG 03 / CÔNG TRÌNH & DỰ ÁN",
    projectsTitle: "Dự Án Nghiên Cứu & Thực Nghiệm",
    proj1Tag: "NGHIÊN CỨU KINH TẾ LƯỢNG • ẤN PHẨM FWPS",
    proj1Title: "Dự án Nghiên cứu Kinh tế lượng – Đăng trên FTU Working Paper Series (FWPS)",
    proj1Role: "Vai trò: Thành viên Dự án Môn học Kinh tế Quốc tế",
    proj1Timeline: "Tháng 01/2024 – Hiện tại",
    proj1OutcomeTitle: "KẾT QUẢ then chốt:",
    proj1Outcome: "Bài nghiên cứu hoàn chỉnh được công nhận và xuất bản chính thức trên hệ thống ấn phẩm FWPS của Trường Đại học Ngoại thương.",
    proj1Btn: "Xem Chi Tiết Nghiên Cứu",

    proj2Tag: "DỰ ÁN CÔNG NGHỆ & NGHIÊN CỨU TRẢI NGHIỆM",
    proj2Title: "Dự án Website Trao đổi Sinh viên FTU (Exchange Student Portal)",
    proj2Role: "Vai trò: Thành viên Hỗ trợ Dự án Lập trình Web",
    proj2Timeline: "Tháng 09/2026 – Hiện tại",
    proj2OutcomeTitle: "KẾT QUẢ then chốt:",
    proj2Outcome: "Tổng hợp phản hồi từ 200+ sinh viên, đề xuất cải tiến hoàn thiện giao diện và luồng thao tác người dùng (User Journey).",
    proj2Btn: "Xem Bản Đồ Luồng & Khảo Sát",

    // Experience Section
    expChapter: "CHƯƠNG 04 / TIẾN TRÌNH KINH NGHIỆM",
    expTitle: "Kinh Nghiệm Chuyên Môn & Hoạt Động",

    // Contact Section
    contactChapter: "CHƯƠNG 05 / LIÊN HỆ & KẾT NỐI",
    contactTitle: "Thông Tin Liên Hệ Trực Tiếp",
    contactSubtitle: "Sẵn sàng trao đổi về cơ hội thực tập, nghiên cứu kinh tế lượng, phân tích dữ liệu và hợp tác dự án.",
    formName: "Họ và Tên",
    formEmail: "Địa Chỉ Email",
    formSubject: "Tiêu Đề",
    formMessage: "Nội Dung Tin Nhắn",
    btnSendMessage: "Gửi Thư Liên Hệ",
    downloadCVCardTitle: "Hồ Sơ Năng Lực Bản Đầy Đủ (Curriculum Vitae)",
    downloadCVCardDesc: "Tải xuống tài liệu PDF chính thức đính kèm để xem chi tiết đầy đủ về học thuật và kinh nghiệm.",
    btnDownloadPDF: "Tải Xuống CV (PDF)",
    btnOpenPDF: "Mở Xem CV Trong Tab Mới"
  },

  en: {
    // Header & Meta
    dossierIssue: "NGUYỄN THỊ NGA — PERSONAL PORTFOLIO",
    institution: "FOREIGN TRADE UNIVERSITY (FTU) • HANOI",
    navHome: "Home",
    navAbout: "About",
    navSkills: "Skills",
    navProjects: "Projects",
    navExperience: "Experience",
    navContact: "Contact",
    btnDownloadCV: "Download CV (PDF)",
    btnPreviewCV: "Preview CV",

    // Hero Section
    heroIssueBadge: "PERSONAL PORTFOLIO • FOREIGN TRADE UNIVERSITY",
    heroRoleTitle: "International Economics Student | Data & Research",
    heroAbstract: "International Economics student at Foreign Trade University (FTU) with a strong focus on quantitative data analysis, empirical research, and data-driven problem solving.",
    btnViewWork: "View My Work",
    statStat1: "1,000+ Obs",
    statLabel1: "Panel & Time Series Observations",
    statStat2: "FWPS Published",
    statLabel2: "FTU Working Paper Series",
    statStat3: "MOS Excel",
    statLabel3: "Certified Specialist",

    // About Section
    aboutChapter: "CHAPTER 01 / PROFILE & ACADEMIC FOUNDATION",
    aboutTitle: "About Me & Academic Direction",
    aboutEducationTitle: "Formal Education",
    aboutDegree: "3rd-Year Student in International Economics",
    aboutSchool: "Foreign Trade University (FTU)",
    aboutGPA: "Cumulative GPA 3.8",
    aboutPeriod: "08/2024 – Present",
    aboutCoursesTitle: "Notable Quantitative Coursework:",
    aboutCourse1: "Econometrics",
    aboutCourse2: "Business Statistics",
    aboutCourse3: "Data Analysis in Economics & Business",
    aboutCourse4: "Mathematical Economics",
    aboutInterestTitle: "Academic & Research Interests",
    aboutInterestDesc: "Focused on empirical econometric modeling, time series forecasting, panel data estimation, and data-driven market intelligence.",
    aboutCareerTitle: "Career Aspirations",
    aboutCareerDesc: "Applying quantitative data analysis, economic intuition, and analytical tooling to business intelligence, market research, and economic consultancy.",
    aboutHonorsTitle: "Honors & Activities",
    aboutScholarship: "Academic Encouragement Scholarship (Sem 2, Academic Year 2024–2025)",
    aboutClub: "Active Member, FTU Market Research Club (MRC)",
    aboutLangTitle: "Languages & Certifications",

    // Skills Section
    skillsChapter: "CHAPTER 02 / TAXONOMY OF EXPERTISE",
    skillsTitle: "Core Capabilities & Analytical Toolkit",
    skillsDesc: "Structured taxonomy of empirical research, quantitative modeling, and analytical software proficiency without artificial percentage bars.",
    skill1Title: "Data Cleaning & Quantitative Analysis",
    skill1Desc: "Collecting, cleaning, and harmonizing large-scale panel datasets and time-series (>1,000 observations) from trusted macroeconomic sources (World Bank, GSO).",
    skill2Title: "Econometric Modeling & Forecasting",
    skill2Desc: "Specifying and testing regression models (OLS, Fixed Effects, Random Effects). Performing diagnostic tests for heteroskedasticity, autocorrelation, and multicollinearity.",
    skill3Title: "Analytical Software & Tools",
    skill3Desc: "Proficient in Stata and EViews for econometric analysis; advanced Microsoft Excel (MOS Excel Certified), basic SQL data retrieval, and Power BI dashboard visualization.",
    skill4Title: "Critical Thinking & User Research",
    skill4Desc: "Survey design, synthesizing qualitative/quantitative user feedback from 200+ respondents, user journey optimization, strong communication, negotiation, and presentation skills.",

    // Projects Section
    projectsChapter: "CHAPTER 03 / SELECTED WORKS",
    projectsTitle: "Research Projects & Empirical Studies",
    proj1Tag: "ECONOMETRIC RESEARCH • FWPS PUBLICATION",
    proj1Title: "Econometric Research Project – Published on FTU Working Paper Series (FWPS)",
    proj1Role: "Role: International Economics Course Project Member",
    proj1Timeline: "Jan 2024 – Present",
    proj1OutcomeTitle: "KEY OUTCOME:",
    proj1Outcome: "Complete empirical paper officially peer-recognized and published on the Foreign Trade University Working Paper Series (FWPS).",
    proj1Btn: "View Research Dossier",

    proj2Tag: "WEB PLATFORM & USER EXPERIENCE RESEARCH",
    proj2Title: "FTU Exchange Student Portal Support Project",
    proj2Role: "Role: Web Programming Project Support Member",
    proj2Timeline: "Sep 2026 – Present",
    proj2OutcomeTitle: "KEY OUTCOME:",
    proj2Outcome: "Gathered and synthesized feedback from 200+ students; formulated UX architecture and user journey improvements for partner school search, visas, and housing.",
    proj2Btn: "View UX Blueprint",

    // Experience Section
    expChapter: "CHAPTER 04 / CHRONOLOGY & ENGAGEMENTS",
    expTitle: "Professional & Academic Experience",

    // Contact Section
    contactChapter: "CHAPTER 05 / CORRESPONDENCE & ARCHIVE",
    contactTitle: "Direct Contact & Inquiries",
    contactSubtitle: "Open for internship opportunities, quantitative research, economic data analysis, and academic collaboration.",
    formName: "Full Name",
    formEmail: "Email Address",
    formSubject: "Subject",
    formMessage: "Your Message",
    btnSendMessage: "Send Message",
    downloadCVCardTitle: "Official Curriculum Vitae (Complete Dossier)",
    downloadCVCardDesc: "Download the original PDF document to view the full academic record and verified credentials.",
    btnDownloadPDF: "Download CV (PDF)",
    btnOpenPDF: "Open CV in New Tab"
  }
};

let currentLang = 'vi';

function initLanguageEngine() {
  const langBtns = document.querySelectorAll('.lang-btn');

  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      if (lang && lang !== currentLang) {
        setLanguage(lang);
      }
    });
  });
}

function setLanguage(lang) {
  currentLang = lang;

  // Update active button state
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  // Update text nodes with data-i18n
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
      el.textContent = TRANSLATIONS[lang][key];
    }
  });

  showToast(lang === 'vi' ? 'Đã chuyển sang Tiếng Việt' : 'Switched to English');
}

/* ==========================================================================
   3. MODAL MANAGEMENT
   ========================================================================== */
function initModals() {
  const modalBackdrops = document.querySelectorAll('.modal-backdrop');
  const closeBtns = document.querySelectorAll('.modal-close-btn');

  // Trigger buttons
  const openCVBtn = document.getElementById('btnPreviewCV');
  const openProj1Btn = document.getElementById('btnOpenProj1');
  const openProj2Btn = document.getElementById('btnOpenProj2');

  const cvModal = document.getElementById('cvModal');
  const proj1Modal = document.getElementById('proj1Modal');
  const proj2Modal = document.getElementById('proj2Modal');

  if (openCVBtn && cvModal) {
    openCVBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(cvModal);
    });
  }

  if (openProj1Btn && proj1Modal) {
    openProj1Btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(proj1Modal);
    });
  }

  if (openProj2Btn && proj2Modal) {
    openProj2Btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(proj2Modal);
    });
  }

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-backdrop');
      if (modal) closeModal(modal);
    });
  });

  modalBackdrops.forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeModal(backdrop);
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modalBackdrops.forEach(modal => {
        if (modal.classList.contains('open')) closeModal(modal);
      });
    }
  });
}

function openModal(modal) {
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

/* ==========================================================================
   4. CONTACT FORM & INTERACTION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('senderName').value.trim();
    const email = document.getElementById('senderEmail').value.trim();
    const subject = document.getElementById('msgSubject').value.trim();
    const message = document.getElementById('msgContent').value.trim();

    if (!name || !email || !message) {
      showToast(currentLang === 'vi' ? 'Vui lòng điền đầy đủ thông tin' : 'Please fill in all required fields');
      return;
    }

    // Build mailto link as fallback/direct trigger
    const mailtoLink = `mailto:qnhu6841@gmail.com?subject=${encodeURIComponent(subject || 'Academic & Professional Inquiry from Portfolio')}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    // Open default mail client
    window.open(mailtoLink, '_blank');

    showToast(currentLang === 'vi' ? 'Cảm ơn bạn! Đang mở ứng dụng email gửi tới qnhu6841@gmail.com' : 'Thank you! Launching email to qnhu6841@gmail.com');
    form.reset();
  });
}

/* ==========================================================================
   5. COPY TO CLIPBOARD & TOAST SYSTEM
   ========================================================================== */
function initCopyActions() {
  const copyButtons = document.querySelectorAll('.channel-copy-btn');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(currentLang === 'vi' ? `Đã sao chép: ${textToCopy}` : `Copied to clipboard: ${textToCopy}`);
        }).catch(() => {
          showToast(`qnhu6841@gmail.com`);
        });
      }
    });
  });
}

function showToast(message) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B68D40" stroke-width="2">
      <path d="M20 6L9 17l-5-5"/>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Trigger animation
  setTimeout(() => toast.classList.add('show'), 10);

  // Remove after 3.5s
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}
