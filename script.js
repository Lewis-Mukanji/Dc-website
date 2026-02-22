/* ============================================================
   DESTINY CHAPEL – script.js
   ============================================================ */

/* ── MOBILE MENU ── */
const mobileToggle = document.getElementById('mobileToggle');
const navMenu      = document.getElementById('navMenu');

if (mobileToggle && navMenu) {
  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    mobileToggle.classList.toggle('open');
  });

  // Close when a link is clicked
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      mobileToggle.classList.remove('open');
    });
  });
}

/* ── NAVBAR SHADOW ON SCROLL ── */
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.style.boxShadow = '0 4px 32px rgba(0,0,0,0.13)';
    } else {
      navbar.style.boxShadow = '0 1px 0 rgba(201,149,42,0.18), 0 4px 24px rgba(0,0,0,0.07)';
    }
  });
}

/* ── ACTIVE NAV LINK ON SCROLL ── */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current) && current) {
      link.classList.add('active');
    }
  });
});

/* ── SMOOTH SCROLL FOR HASH LINKS ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    }
  });
});

/* ── COUNTER ANIMATION ── */
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start);
    }
  }, 16);
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num[data-target]').forEach(el => {
        animateCounter(el, parseInt(el.dataset.target));
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

const statsSection = document.querySelector('.stats-row');
if (statsSection) statsObserver.observe(statsSection);

/* ── FADE-UP ON SCROLL ── */
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.connect-card, .event-card, .feat-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
  fadeObserver.observe(el);
});

/* ── EVENT DATA ── */
const eventData = {
  prema: {
    title: 'PREMA 2026',
    date: 'Sat 17 January – Sat 4 April, 2026',
    time: '8:00 AM',
    venue: 'Destiny Chapel – Nairobi',
    description: 'PREMA is for dating and courting couples, while Marriage Blessing is for couples staying together and who would like to solemnise their union, or are married but did not get an opportunity to attend comprehensive Premarital Counselling.',
    price: 'Kshs. 15,000/= for ICC Members · Kshs. 18,000/= for non-ICC couples',
    paybill: '904800',
    account: 'Prema or MB then your names. E.g. PremaJohnJane / MBJohnJane.',
    image: 'images/allyours.jpeg'
  },
  prayer: {
    title: 'Prayer Conference',
    date: 'Feb 13th, 2026',
    time: '9:00 AM – 4:00 PM',
    venue: 'Destiny Chapel – Nairobi',
    description: "Join us for a powerful day of prayer and seeking God's presence. Guest Speaker: Evangelist Mikel French will be ministering throughout the conference.",
    price: 'Free Entry',
    paybill: 'N/A',
    account: 'N/A',
    image: 'images/how.jpeg'
  },
  valentine: {
    title: "Couples Valentine's Dinner",
    date: '13th February, 2026',
    time: '7:00 PM',
    venue: 'Destiny Chapel – Nairobi',
    description: 'Celebrating Love — Join us for an elegant evening of romance, fine dining, and fellowship with other couples.',
    price: 'KSH 6,000 per couple',
    paybill: '904800',
    account: 'VALENTINES COUPLES DINNER',
    image: 'images/Gala.jpeg'
  }
};

/* ── EVENT CARDS – SET BACKGROUND IMAGES ── */
document.querySelectorAll('.event-card[data-image]').forEach(card => {
  const wrap = card.querySelector('.event-img-wrap');
  if (wrap) wrap.style.backgroundImage = `url('${card.dataset.image}')`;
});

/* ── EVENT MODAL ── */
const modal       = document.getElementById('eventModal');
const modalOverlay = modal && modal.querySelector('.modal-overlay');
const modalClose   = modal && modal.querySelector('.modal-close');

function openModal(key) {
  const ev = eventData[key];
  if (!ev || !modal) return;

  modal.querySelector('.modal-poster').innerHTML =
    `<img src="${ev.image}" alt="${ev.title}" />`;
  modal.querySelector('.modal-title').textContent     = ev.title;
  modal.querySelector('.event-date').textContent      = ev.date;
  modal.querySelector('.event-time').textContent      = ev.time;
  modal.querySelector('.event-venue').textContent     = ev.venue;
  modal.querySelector('.event-description').textContent = ev.description;
  modal.querySelector('.event-price').textContent     = ev.price;
  modal.querySelector('.event-paybill').textContent   = ev.paybill;
  modal.querySelector('.event-account').textContent   = ev.account;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal && modal.classList.remove('active');
  document.body.style.overflow = '';
}

document.querySelectorAll('.event-card').forEach(card => {
  const key = card.dataset.event;
  const btn = card.querySelector('.more-info-btn');
  if (btn) btn.addEventListener('click', e => { e.stopPropagation(); openModal(key); });
  card.addEventListener('click', () => openModal(key));
});

if (modalClose)   modalClose.addEventListener('click', closeModal);
if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* ── VISITOR FORM ── */
const visitorForm = document.getElementById('visitorForm');
if (visitorForm) {
  visitorForm.addEventListener('submit', e => {
    e.preventDefault();
    const name  = visitorForm.querySelector('input[type="text"]').value.trim();
    const email = visitorForm.querySelector('input[type="email"]').value.trim();
    if (!name || !email) { alert('Please fill in your name and email.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { alert('Please enter a valid email address.'); return; }
    alert('Thank you! We look forward to welcoming you. You will receive a confirmation shortly. 🙏');
    visitorForm.reset();
  });
}

/* ── FOOTER YEAR ── */
const yearEl = document.getElementById('footerYear');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ── SCROLL TO TOP BUTTON ── */
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
Object.assign(scrollTopBtn.style, {
  position: 'fixed', bottom: '28px', right: '28px',
  width: '48px', height: '48px', borderRadius: '50%',
  background: '#0d1f3c', color: '#fff', border: 'none',
  fontSize: '20px', cursor: 'pointer', opacity: '0',
  visibility: 'hidden', transition: 'all 0.3s ease',
  zIndex: '999', boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
});
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
  const show = window.scrollY > 500;
  scrollTopBtn.style.opacity     = show ? '1' : '0';
  scrollTopBtn.style.visibility  = show ? 'visible' : 'hidden';
});
scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
scrollTopBtn.addEventListener('mouseenter', () => { scrollTopBtn.style.background = '#c9952a'; });
scrollTopBtn.addEventListener('mouseleave', () => { scrollTopBtn.style.background = '#0d1f3c'; });

console.log('Destiny Chapel – Activating Dreams To Transform Lives 🙏');