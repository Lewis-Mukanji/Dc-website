// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (mobileMenuToggle) {
            mobileMenuToggle.classList.remove('active');
        }
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
        } else {
            navbar.style.background = '#ffffff';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    });
}

// Active Navigation Link Based on Scroll Position
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Event Data
const eventData = {
    prema: {
        title: 'PREMA 2026',
        date: 'Sat 17 January - Sat 4 April, 2026',
        time: '8:00 AM',
        venue: 'Destiny Chapel - Nairobi',
        description: 'PREMA is for dating and courting couples while Marriage Blessing is for couples staying together and would like to solemnize their union, or are married but did not get an opportunity to attend a comprehensive Premarital Counseling.',
        price: 'Kshs. 15,000/= for ICC Members, Kshs.18,000/= for non-ICC couples',
        paybill: '904800',
        account: 'Prema or MB then your names. For example: PremaJohnJane / MBJohnJane.',
        posterClass: 'prema-poster'
    },
    prayer: {
        title: 'Prayer Conference',
        date: 'Feb 13th 2026',
        time: '9:00am - 4:00pm',
        venue: 'Destiny Chapel - Nairobi',
        description: 'Join us for a powerful day of prayer and seeking God\'s presence. Guest Speaker: Evangelist Mikel French will be ministering throughout the conference.',
        price: 'Free Entry',
        paybill: 'N/A',
        account: 'N/A',
        posterClass: 'prayer-poster'
    },
    masters: {
        title: 'Masters Commission 2026',
        date: '30th Jan - 10th May 2026',
        time: 'Various Times',
        venue: 'Destiny Chapel - Nairobi',
        description: 'Master\'s commission is a three month transitional program for high school graduates that equips them for whatever God has next for them. In those three months, we instill spiritual disciplines and life skills and then give them access to professional short courses on Udemy.',
        price: 'KES. 9,000/- The charge for the program is KES. 9,000/- is payable upon registration.',
        paybill: '904800',
        account: 'Account name: "Masters" followed by the participant\'s name',
        posterClass: 'masters-poster'
    },
    valentine: {
        title: 'Couples Valentine\'s Dinner',
        date: '13TH FEBRUARY 2026',
        time: '7:00PM',
        venue: 'Destiny Chapel - Nairobi',
        description: 'Celebrating Love - Join us for an elegant evening of romance, fine dining, and fellowship with other couples.',
        price: 'KSH 6,000',
        paybill: 'MPESA PAYBILL: 904800 ACCOUNT NAME: VALENTINES COUPLES DINNER',
        account: 'VALENTINES COUPLES DINNER',
        posterClass: 'valentine-poster'
    }
};

// Event Modal Functionality
const modal = document.getElementById('eventModal');
const modalOverlay = modal.querySelector('.modal-overlay');
const modalClose = modal.querySelector('.modal-close');
const eventCards = document.querySelectorAll('.event-card-new');

// Function to create poster HTML for modal
function createPosterHTML(eventKey) {
    const event = eventData[eventKey];
    
    switch(eventKey) {
        case 'prema':
            return `
                <div class="event-poster ${event.posterClass}">
                    <div class="event-poster-content">
                        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 24 24' fill='none' stroke='%23d4af37' stroke-width='2'%3E%3Ccircle cx='12' cy='8' r='5'/%3E%3Cpath d='M12 13a8 8 0 0 0-8 8h16a8 8 0 0 0-8-8z'/%3E%3C/svg%3E" alt="Rings" class="poster-icon">
                        <div class="event-badge">Destiny Chapel</div>
                        <h3 class="event-poster-title">PREMARITAL COUNSELLING &<br>MARRIAGE BLESSING<br>COUNSELLING 2026</h3>
                        <p class="event-poster-desc">PREMA is for dating and courting couples while Marriage Blessing is for couples staying together</p>
                    </div>
                </div>
            `;
        case 'prayer':
            return `
                <div class="event-poster ${event.posterClass}">
                    <div class="event-poster-content">
                        <div class="event-badge">Destiny Chapel - Nairobi</div>
                        <h3 class="event-poster-title-large">Prayer<br>Conference</h3>
                        <p class="event-speaker">Guest Speaker: Evangelist Mikel French</p>
                        <p class="event-date-time">Date: Feb 13th 2026<br>Time: 9:00am - 4:00pm<br>at ICC Nairobi</p>
                    </div>
                </div>
            `;
        case 'masters':
            return `
                <div class="event-poster ${event.posterClass}">
                    <div class="event-poster-content">
                        <h3 class="event-poster-title-stylized">Masters<br>Commission</h3>
                        <div class="masters-group-photo">
                            <div class="photo-placeholder">Group Photo</div>
                        </div>
                        <p class="event-dates">30th Jan - 10th May<br>2026</p>
                    </div>
                </div>
            `;
        case 'valentine':
            return `
                <div class="event-poster ${event.posterClass}">
                    <div class="event-poster-content">
                        <div class="event-badge">Destiny Chapel - Nairobi</div>
                        <div class="heart-icon">❤️</div>
                        <h3 class="event-poster-title-elegant">Couples<br>Valentine's<br>Dinner</h3>
                        <p class="event-subtitle">CELEBRATING LOVE</p>
                        <p class="event-date-venue">13TH FEBRUARY 2026 | 7:00PM<br>JACARANDA HOTEL 'THE NODE'</p>
                    </div>
                </div>
            `;
    }
}

// Open modal when clicking event card or More Info button
eventCards.forEach(card => {
    const eventKey = card.getAttribute('data-event');
    const moreInfoBtn = card.querySelector('.more-info-btn');
    
    if (moreInfoBtn) {
        moreInfoBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openModal(eventKey);
        });
    }
    
    // Also open on card click
    card.addEventListener('click', () => {
        openModal(eventKey);
    });
});

function openModal(eventKey) {
    const event = eventData[eventKey];
    
    // Populate modal poster
    const modalPoster = modal.querySelector('.modal-poster');
    modalPoster.innerHTML = createPosterHTML(eventKey);
    
    // Populate modal info
    modal.querySelector('.modal-title').textContent = event.title;
    modal.querySelector('.event-date').textContent = event.date;
    modal.querySelector('.event-time').textContent = event.time;
    modal.querySelector('.event-venue').textContent = event.venue;
    modal.querySelector('.event-description').textContent = event.description;
    modal.querySelector('.event-price').textContent = event.price;
    modal.querySelector('.event-paybill').textContent = event.paybill;
    modal.querySelector('.event-account').textContent = event.account;
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking close button
if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

// Close modal when clicking overlay
if (modalOverlay) {
    modalOverlay.addEventListener('click', closeModal);
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// Fade In Animation on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add fade-in class and observe elements
const fadeElements = document.querySelectorAll('.service-card, .connect-card, .fusion-feature, .event-card-new');
fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Form Validation (Visitor Form)
const visitorForm = document.querySelector('.visitor-form form');
if (visitorForm) {
    visitorForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = visitorForm.querySelector('input[type="text"]').value;
        const email = visitorForm.querySelector('input[type="email"]').value;
        
        if (!name || !email) {
            alert('Please fill in all required fields (Name and Email)');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        alert('Thank you! We look forward to welcoming you. You will receive a confirmation email shortly.');
        visitorForm.reset();
    });
}

// Counter Animation for Impact Stats
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
};

// Observe stats section for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stats = entry.target.querySelectorAll('.stat h3');
            stats.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.impact-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Add current year to footer
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    const currentYear = new Date().getFullYear();
    footerYear.innerHTML = footerYear.innerHTML.replace('2026', currentYear);
}

// Scroll-to-Top Button
let scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--primary-color);
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
`;
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.background = 'var(--accent-color)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.background = 'var(--primary-color)';
});

// Lazy Loading for Images (if you add real images later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));
}

console.log('Destiny Chapel Website Initialized Successfully! 🙏');