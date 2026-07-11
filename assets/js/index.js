//! =========== Selectors =========== //

//? ===== Theme ===== //
const themeToggle = document.getElementById('theme-toggle-button');
const html = document.documentElement;

//? ===== Navigation ===== //
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

//? ===== Portfolio ===== //
const portfolioFilters = document.querySelectorAll('.portfolio-filter');
const portfolioItems = document.querySelectorAll('.portfolio-item');

//? ===== Testimonials ===== //
const carousel = document.getElementById('testimonials-carousel');
const cards = document.querySelectorAll('.testimonial-card');
const prevBtn = document.getElementById('prev-testimonial');
const nextBtn = document.getElementById('next-testimonial');
const indicators = document.querySelectorAll('.carousel-indicator');

//? ===== Settings ===== //
const settingsToggle = document.getElementById('settings-toggle');
const settingsSidebar = document.getElementById('settings-sidebar');
const closeSettings = document.getElementById('close-settings');
const fontOptions = document.querySelectorAll('.font-option');
const resetBtn = document.getElementById('reset-settings');

//? ===== Scroll To Top ===== //
const scrollToTopBtn = document.getElementById('scroll-to-top');

//? ===== Contact Form ===== //
const customSelects = document.querySelectorAll('.custom-select');
const contactForm = document.querySelector('form');

//? ===== Theme Colors ===== //
const colorsGrid = document.getElementById('theme-colors-grid');


//! =========== Event Listeners =========== //

document.addEventListener('DOMContentLoaded', () => {

  //? Theme initialization
  themeToggle.addEventListener('click', toggleTheme);
  loadSavedTheme();

  //? Navigation events
  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();

  //? Portfolio events
  initPortfolioFilters();

  //? Testimonials events
  nextBtn.addEventListener('click', handleNextTestimonial);
  prevBtn.addEventListener('click', handlePrevTestimonial);
  initCarouselIndicators();
  startAutoPlay();

  //? Settings events
  settingsToggle.addEventListener('click', openSettings);
  closeSettings.addEventListener('click', closeSettingsFn);
  initFontSwitcher();
  resetBtn.addEventListener('click', handleResetSettings);

  //? Scroll to Top events
  window.addEventListener('scroll', handleScrollToTopVisibility);
  scrollToTopBtn.addEventListener('click', handleScrollToTopClick);

  //? Contact Form events
  initCustomSelects();
  initFormSubmission();

  //? Theme Colors events
  initThemeColors();

  console.log('Portfolio JS initialized successfully! 🎉');
});


//! =========== Functions =========== //

//? ===== Theme ===== //
function toggleTheme() {
  if (html.classList.contains('dark')) {
    html.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  } else {
    html.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }
  updateThemeToggle();
}

function updateThemeToggle() {
  const isDark = html.classList.contains('dark');
  themeToggle.setAttribute('aria-pressed', isDark);
}

function loadSavedTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    html.classList.remove('dark');
  } else if (savedTheme === 'dark' || !savedTheme) {
    html.classList.add('dark');
  }
  updateThemeToggle();
}

//? ===== Active Navigation ===== //
function updateActiveNav() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

//? ===== Portfolio Filter ===== ai help me //
function initPortfolioFilters() {
  portfolioFilters.forEach(filter => {
    filter.addEventListener('click', () => {
     
      portfolioFilters.forEach(f => {
        f.classList.remove('active', 'bg-linear-to-r', 'from-primary', 'to-secondary', 'text-white');
        f.classList.add('bg-white', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300', 'border', 'border-slate-300', 'dark:border-slate-700');
      });
     
      filter.classList.add('active', 'bg-linear-to-r', 'from-primary', 'to-secondary', 'text-white');
      filter.classList.remove('bg-white', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300', 'border', 'border-slate-300', 'dark:border-slate-700');

      const filterValue = filter.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'block';
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

//? ===== Testimonials Carousel =====ai help me //
let currentIndex = 0;
let autoPlay;

function updateCarousel() {
  const offset = -currentIndex * (100 / 3); 
  carousel.style.transform = `translateX(${offset}%)`;
  
 
  indicators.forEach((ind, idx) => {
    ind.setAttribute('aria-selected', idx === currentIndex ? 'true' : 'false');
    if (idx === currentIndex) {
      ind.classList.add('bg-accent');
    } else {
      ind.classList.remove('bg-accent');
    }
  });
}

function handleNextTestimonial() {
  currentIndex = (currentIndex + 1) % cards.length;
  updateCarousel();
}

function handlePrevTestimonial() {
  currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  updateCarousel();
}

function initCarouselIndicators() {
  indicators.forEach((ind, idx) => {
    ind.addEventListener('click', () => {
      currentIndex = idx;
      updateCarousel();
    });
  });
}

function startAutoPlay() {
  autoPlay = setInterval(() => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCarousel();
  }, 5000);

  const carouselContainer = carousel.parentElement.parentElement;
  carouselContainer.addEventListener('mouseenter', () => clearInterval(autoPlay));
  carouselContainer.addEventListener('mouseleave', () => {
    autoPlay = setInterval(() => {
      currentIndex = (currentIndex + 1) % cards.length;
      updateCarousel();
    }, 5000);
  });
}

//? ===== Settings Sidebar ===== //
function openSettings() {
  settingsSidebar.classList.remove('translate-x-full');
  settingsToggle.setAttribute('aria-expanded', 'true');
}

function closeSettingsFn() {
  settingsSidebar.classList.add('translate-x-full');
  settingsToggle.setAttribute('aria-expanded', 'false');
}

//? ===== Font Switcher ===== //
function initFontSwitcher() {
  fontOptions.forEach(option => {
    option.addEventListener('click', () => {
   
      fontOptions.forEach(opt => opt.classList.remove('active'));
      option.classList.add('active');
      
      const fontFamily = option.getAttribute('data-font');
      if (fontFamily) {
        document.body.classList.remove('font-alexandria', 'font-tajawal', 'font-cairo');
        document.body.classList.add(`font-${fontFamily}`);
      }
    });
  });
}

//? ===== Reset Settings ===== //
function handleResetSettings() {
  document.body.classList.remove('font-alexandria', 'font-cairo');
  document.body.classList.add('font-tajawal');
  fontOptions.forEach(opt => {
    opt.classList.remove('active');
    if (opt.getAttribute('data-font') === 'tajawal') opt.classList.add('active');
  });
  closeSettingsFn();
}

//? ===== Scroll To Top ===== //
function handleScrollToTopVisibility() {
  if (window.scrollY > 500) {
    scrollToTopBtn.classList.remove('opacity-0', 'invisible');
    scrollToTopBtn.classList.add('opacity-100', 'visible');
  } else {
    scrollToTopBtn.classList.add('opacity-0', 'invisible');
    scrollToTopBtn.classList.remove('opacity-100', 'visible');
  }
}

function handleScrollToTopClick() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

//? ===== Contact Form ===== //
function initCustomSelects() {
  customSelects.forEach(select => {
    select.addEventListener('click', () => {
      const options = select.nextElementSibling;
      options.classList.toggle('hidden');
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.custom-select-wrapper')) {
      document.querySelectorAll('.custom-options').forEach(opt => opt.classList.add('hidden'));
    }
  });
}

function initFormSubmission() {
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      Swal.fire({
        title: 'تم إرسال رسالتك بنجاح!',
        html: `شكراً <strong>${name}</strong>،<br>هرد عليك في أقرب وقت ممكن.`,
        icon: 'success',
        confirmButtonText: 'تمام',
        confirmButtonColor: '#6366f1',
        background: document.documentElement.classList.contains('dark') ? '#1e2937' : '#ffffff',
        color: document.documentElement.classList.contains('dark') ? '#e2e8f0' : '#1e2937',
        showClass: {
          popup: 'animate__animated animate__bounceIn'
        }
      });
      contactForm.reset();
    });
  }
}

//? ===== Theme Colors ===== //
function initThemeColors() {
  if (colorsGrid && colorsGrid.children.length === 0) {
    const colors = [
      '#6366f1', '#EE4F83', '#22c55e', '#2894EA', '#F14250', '#EE720B'
    ];

    colors.forEach(hex => {
      const btn = document.createElement('button');
      btn.className = "w-12 h-12 rounded-2xl shadow-md border-2 border-white dark:border-slate-700 hover:scale-110 transition-all";
      btn.style.backgroundColor = hex;
      
      btn.addEventListener('click', () => {
        document.documentElement.style.setProperty('--color-primary', hex);
      });
      
      colorsGrid.appendChild(btn);
    });
  }
}