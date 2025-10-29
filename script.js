// NAV TOGGLE for mobile
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('mainNav');
navToggle.addEventListener('click', () => {
  mainNav.classList.toggle('open');
});

// Close nav on link click (mobile)
document.querySelectorAll('.main-nav a').forEach(a => {
  a.addEventListener('click', () => {
    if (mainNav.classList.contains('open')) mainNav.classList.remove('open');
  });
});

// Initialize Swiper for HERO
const heroSwiper = new Swiper('.hero-swiper', {
  loop: true,
  centeredSlides: true,
  speed: 800,
  autoplay: {
    delay: 4500,
    disableOnInteraction: false,
  },
  slidesPerView: 1,
  spaceBetween: 18,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  effect: 'slide',
});

// ✅ Initialize Swiper for MENU
const menuSwiper = new Swiper(".menuSwiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".menuSwiper .swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".menuSwiper .swiper-button-next",
    prevEl: ".menuSwiper .swiper-button-prev",
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
    }
  }
});

// Initialize Swiper for TESTIMONIALS
const testiSwiper = new Swiper('.testiSwiper', {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 18,
  autoplay: {
    delay: 4200,
    disableOnInteraction: false
  },
  pagination: {
    el: '.testiSwiper .swiper-pagination',
    clickable: true,
    bulletClass: 'swiper-pagination-bullet testi-pagination-bullet',
    bulletActiveClass: 'swiper-pagination-bullet-active'
  },
  breakpoints: {
    700: { slidesPerView: 1 },
    1000: { slidesPerView: 2 }
  }
});

// Image upload / replace for hero slider
const fileInput = document.getElementById('slideUpload');
fileInput.addEventListener('change', (ev) => {
  const files = Array.from(ev.target.files).slice(0, 6);
  if (files.length === 0) return;

  const wrapper = document.querySelector('.hero-swiper .swiper-wrapper');
  const frag = document.createDocumentFragment();
  let loaded = 0;

  files.forEach((file, idx) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';
      slide.setAttribute('data-index', idx);

      const img = document.createElement('img');
      img.src = e.target.result;
      img.alt = `Slide ${idx+1}`;

      slide.appendChild(img);
      frag.appendChild(slide);

      loaded++;
      if (loaded === files.length) {
        wrapper.innerHTML = '';
        wrapper.appendChild(frag);
        heroSwiper.update();
        heroSwiper.slideToLoop(0, 0);
      }
    };
    reader.readAsDataURL(file);
  });

  ev.target.value = '';
});

// Simple contact form handler (no backend)
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();
  if (!name || !email || !message) {
    alert('Mohon lengkapi semua field.');
    return;
  }

  contactForm.querySelector('.btn-primary').classList.add('sending');
  setTimeout(() => {
    contactForm.reset();
    contactForm.querySelector('.btn-primary').classList.remove('sending');
    alert('Pesan terkirim! Terima kasih — kami akan menghubungi Anda segera.');
  }, 900);
});

/* Smooth scroll for internal anchors */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href.length > 1) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
