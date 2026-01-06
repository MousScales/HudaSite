const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
const topNav = document.querySelector('.top-nav');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      navLinks.classList.remove('open');
    }
  });
});

// Light transparency on nav when scrolling
if (topNav) {
  const handleNavTransparency = () => {
    if (window.scrollY > 12) {
      topNav.classList.add('scrolled');
    } else {
      topNav.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavTransparency);
  handleNavTransparency();
}

// Include section preview swap
const includeCards = document.querySelectorAll('.include-card');
const includePreview = document.getElementById('include-preview-img');
const includeDots = document.querySelectorAll('.include-dots .dot');

if (includeCards.length && includePreview) {
  includeCards.forEach((card) => {
    card.addEventListener('click', () => {
      includeCards.forEach((c) => c.classList.remove('active'));
      card.classList.add('active');
      const img = card.getAttribute('data-img');
      if (img) {
        includePreview.src = img;
        includePreview.alt = `${card.getAttribute('aria-label')} preview`;
      }

      if (includeDots.length) {
        includeDots.forEach((dot) => dot.classList.remove('active'));
        const idx = Array.from(includeCards).indexOf(card);
        if (idx >= 0 && includeDots[idx]) {
          includeDots[idx].classList.add('active');
        }
      }
    });
  });
}

// Lockscreen widget slider (stacked preview with grouped cards)
(() => {
  const slides = [
    { src: 'imagesv2/4.png', title: 'Quran Verse (English)' },
    { src: 'imagesv2/13.png', title: 'Quran Verse (Arabic)' },
    { src: 'imagesv2/5.png', title: 'Daily Hadith (Arabic)' },
    { src: 'imagesv2/6.png', title: 'Daily Hadith (English)' },
    { src: 'imagesv2/7.png', title: 'Daily Dua (Arabic)' },
    { src: 'imagesv2/8.png', title: 'Daily Dua (English)' },
    { src: 'imagesv2/9.png', title: 'Daily Dhikr (Arabic)' },
    { src: 'imagesv2/10.png', title: 'Daily Dhikr (English)' },
    { src: 'imagesv2/11.png', title: 'Ramadan Countdown' },
    { src: 'imagesv2/12.png', title: 'Next Prayer' },
    { src: 'imagesv2/14.png', title: 'Prayer Times' },
  ];

  const groups = [
    { title: 'Daily Content (Quran/Hadith/Dua/Dhikr)', indices: [0, 1, 2, 3, 4, 5, 6, 7] },
    { title: 'Ramadan Countdown', indices: [8] },
    { title: 'Next Prayer', indices: [9] },
    { title: 'Prayer Times', indices: [10] },
  ];

  const preview = document.getElementById('lockscreen-preview-img');
  const step = document.getElementById('lockscreen-step');
  const prevBtn = document.getElementById('lockscreen-prev');
  const nextBtn = document.getElementById('lockscreen-next');
  const cards = document.querySelectorAll('.lock-card');
  const dots = document.querySelectorAll('.lock-dot');

  if (!preview || !step || !prevBtn || !nextBtn || !slides.length) return;

  let idx = 0;

  const render = () => {
    const slide = slides[idx];
    preview.src = slide.src;
    preview.alt = `${slide.title} widget preview`;
    step.textContent = `${idx + 1} / ${slides.length}`;

    if (cards.length) {
      cards.forEach((c) => c.classList.remove('active'));
      const groupIndex = groups.findIndex((g) => g.indices.includes(idx));
      if (groupIndex >= 0 && cards[groupIndex]) {
        cards[groupIndex].classList.add('active');
      }
    }

    if (dots.length) {
      dots.forEach((d) => d.classList.remove('active'));
      const activeDot = dots[idx];
      if (activeDot) activeDot.classList.add('active');
    }
  };

  prevBtn.addEventListener('click', () => {
    idx = (idx - 1 + slides.length) % slides.length;
    render();
  });

  nextBtn.addEventListener('click', () => {
    idx = (idx + 1) % slides.length;
    render();
  });

  if (cards.length) {
    cards.forEach((card) => {
      card.addEventListener('click', () => {
        const groupIdx = Number(card.getAttribute('data-group'));
        if (Number.isInteger(groupIdx) && groups[groupIdx]) {
          const targetSlide = groups[groupIdx].indices[0];
          idx = targetSlide;
          render();
        }
      });
    });
  }

  render();
})();

// What's new image slider (stacked cards with bullet nav)
(() => {
  const cardsWrap = document.getElementById('wn-cards');
  if (!cardsWrap) return;

  const cards = Array.from(cardsWrap.querySelectorAll('.wn-card'));
  const dots = Array.from(document.querySelectorAll('.wn-dots .wn-dot'));
  const prevBtn = document.getElementById('wn-prev');
  const nextBtn = document.getElementById('wn-next');

  let idx = 0;

  const applyState = () => {
    cards.forEach((card, i) => {
      card.classList.remove('active', 'prev', 'next');
      if (i === idx) card.classList.add('active');
      if (i === (idx - 1 + cards.length) % cards.length) card.classList.add('prev');
      if (i === (idx + 1) % cards.length) card.classList.add('next');
    });

    if (dots.length) {
      dots.forEach((dot) => dot.classList.remove('active'));
      if (dots[idx]) dots[idx].classList.add('active');
    }
  };

  const go = (delta) => {
    idx = (idx + delta + cards.length) % cards.length;
    applyState();
  };

  prevBtn?.addEventListener('click', () => go(-1));
  nextBtn?.addEventListener('click', () => go(1));

  applyState();
})();

