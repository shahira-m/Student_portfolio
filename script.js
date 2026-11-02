/**
 * SHAHIRA M. - PORTFOLIO INTERACTION ENGINE
 * Responsive navigation, scrollspy, interactive skills filter,
 * project detail modals, gallery lightbox previews, contact validation, and toast notifications.
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    const emailAddressEl = document.getElementById('emailAddress');
    const contactForm = document.getElementById('contactForm');
    const backToTopBtn = document.getElementById('backToTop');
    const currentYearEl = document.getElementById('currentYear');
    
    // Project Modal Elements
    const projectModal = document.getElementById('projectModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalTag = document.getElementById('modalTag');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalTriggers = document.querySelectorAll('.project-modal-trigger');

    // Lightbox Elements
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxMedia = document.getElementById('lightboxMedia');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
    const galleryCards = document.querySelectorAll('.gallery-card');

    // Toast
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    // 1. Dynamic Year
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    // 2. Sticky Navbar Blur on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Scrollspy (Active Link Highlighting)
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -65% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                
                // Update Desktop Links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });

                // Update Mobile Links
                mobileLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));

    // 4. Mobile Menu Navigation Toggle
    function toggleMobileMenu() {
        const isOpen = mobileMenu.classList.contains('open');
        if (isOpen) {
            mobileMenu.classList.remove('open');
            mobileToggle.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        } else {
            mobileMenu.classList.add('open');
            mobileToggle.classList.add('active');
            mobileToggle.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        }
    }

    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu when a navigation item is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu && mobileMenu.classList.contains('open')) {
                toggleMobileMenu();
            }
        });
    });

    // Close mobile menu if clicked outside
    document.addEventListener('click', (e) => {
        if (mobileMenu && mobileMenu.classList.contains('open')) {
            if (!mobileMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                toggleMobileMenu();
            }
        }
    });

    // 5. Skills Filtering
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            skillCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue || category === 'all') {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 200);
                }
            });
        });
    });

    // 6. Toast Notification Helper
    let toastTimeout;
    function showToast(message, duration = 3500) {
        if (!toast || !toastMessage) return;
        
        toastMessage.textContent = message;
        toast.classList.add('show');
        
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, duration);
    }

    // 7. Copy Email to Clipboard
    if (copyEmailBtn && emailAddressEl) {
        copyEmailBtn.addEventListener('click', async () => {
            const email = 'shahira.abbas22@gmail.com';
            try {
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(email);
                } else {
                    const textArea = document.createElement('textarea');
                    textArea.value = email;
                    textArea.style.position = 'fixed';
                    textArea.style.left = '-999999px';
                    document.body.appendChild(textArea);
                    textArea.focus();
                    textArea.select();
                    document.execCommand('copy');
                    textArea.remove();
                }
                showToast(`Email copied: ${email}`);
            } catch (err) {
                showToast(`Email: ${email}`);
            }
        });
    }

    // 8. Verified Project Detail Modal Data
    const projectDetails = {
        'tracex': {
            tag: 'Lost-and-Found Project',
            title: 'TraceX',
            html: `
                <p><strong>TraceX</strong> is a lost-and-found project designed around the idea of helping people report and find lost items.</p>
                <h4>Project Summary</h4>
                <p>Focused on simplifying the process of reporting lost belongings, indexing found items, and facilitating efficient recovery.</p>
                <h4>Verified Details:</h4>
                <ul>
                    <li>Project name: <strong>TraceX</strong></li>
                    <li>Designed to provide an intuitive interface for lost item submissions and lookups.</li>
                    <li>Repository &amp; demo links can be directly updated in this configuration.</li>
                </ul>
            `
        },
        'tourist-of-tn': {
            tag: 'AI Trip Planning',
            title: 'Tourist of TN',
            html: `
                <p><strong>Tourist of TN</strong> is an AI trip-planning project focused on helping users explore travel possibilities across Tamil Nadu.</p>
                <h4>Project Summary</h4>
                <p>Designed around the concept of intelligent travel planning to assist users in discovering landmarks, cultural destinations, and scenic spots across Tamil Nadu.</p>
                <h4>Verified Details:</h4>
                <ul>
                    <li>Project name: <strong>Tourist of TN</strong></li>
                    <li>Focused on travel exploration and itinerary conceptualization for Tamil Nadu tourism.</li>
                    <li>Repository &amp; demo links can be directly updated in this configuration.</li>
                </ul>
            `
        }
    };

    function openModal(projectId) {
        const data = projectDetails[projectId];
        if (!data || !projectModal) return;

        modalTag.textContent = data.tag;
        modalTitle.textContent = data.title;
        modalBody.innerHTML = data.html;
        projectModal.classList.add('open');
        projectModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (!projectModal) return;
        projectModal.classList.remove('open');
        projectModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    modalTriggers.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.getAttribute('data-project');
            openModal(projectId);
        });
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    if (projectModal) {
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                closeModal();
            }
        });
    }

    // 9. Activity Gallery Lightbox Data & Handling
    const galleryDetails = {
        'code-oclock': {
            title: 'CODE O’ CLOCK 2K26',
            caption: 'An event in my technology and innovation journey, providing an opportunity to engage with coding and problem-solving.',
            mediaHtml: `
                <div class="gallery-placeholder-view" style="min-height: 280px;">
                    <div class="gallery-placeholder-icon" style="width: 64px; height: 64px;">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                            <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>
                    </div>
                    <span class="gallery-placeholder-label" style="font-size: 0.95rem;">CODE O’ CLOCK 2K26</span>
                    <span class="gallery-placeholder-text">Event Photo Placeholder &mdash; Ready for event photograph</span>
                </div>
            `
        },
        'imagine-x': {
            title: 'IMAGINE X',
            caption: 'An event included in my innovation journey, reflecting my interest in technology, creativity, and exploring new ideas.',
            mediaHtml: `
                <div class="gallery-placeholder-view" style="min-height: 280px;">
                    <div class="gallery-placeholder-icon" style="width: 64px; height: 64px;">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                            <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>
                    </div>
                    <span class="gallery-placeholder-label" style="font-size: 0.95rem;">IMAGINE X</span>
                    <span class="gallery-placeholder-text">Event Photo Placeholder &mdash; Ready for event photograph</span>
                </div>
            `
        },
        'illuminate-bootcamp': {
            title: 'Illuminate Entrepreneurship Bootcamp — E-Cell, IIT Bombay',
            caption: 'Completed the Illuminate Entrepreneurship Bootcamp in association with E-Cell, IIT Bombay. This experience forms part of my learning journey in entrepreneurship and innovation.',
            mediaHtml: `
                <div class="gallery-placeholder-view" style="min-height: 280px;">
                    <div class="gallery-placeholder-icon" style="width: 64px; height: 64px;">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                            <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>
                    </div>
                    <span class="gallery-placeholder-label" style="font-size: 0.95rem;">Illuminate Entrepreneurship Bootcamp</span>
                    <span class="gallery-placeholder-text">In Association with E-Cell, IIT Bombay &mdash; Ready for event photograph</span>
                </div>
            `
        }
    };

    function openLightbox(galleryId) {
        const item = galleryDetails[galleryId];
        if (!item || !lightboxModal) return;

        lightboxTitle.textContent = item.title;
        lightboxCaption.textContent = item.caption;
        lightboxMedia.innerHTML = item.mediaHtml;

        lightboxModal.classList.add('open');
        lightboxModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        if (!lightboxModal) return;
        lightboxModal.classList.remove('open');
        lightboxModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    galleryCards.forEach(card => {
        card.addEventListener('click', () => {
            const galleryId = card.getAttribute('data-gallery-id');
            openLightbox(galleryId);
        });

        // Keyboard accessible Enter/Space activation
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const galleryId = card.getAttribute('data-gallery-id');
                openLightbox(galleryId);
            }
        });
    });

    if (lightboxCloseBtn) {
        lightboxCloseBtn.addEventListener('click', closeLightbox);
    }

    if (lightboxModal) {
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                closeLightbox();
            }
        });
    }

    // Close any modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (projectModal && projectModal.classList.contains('open')) {
                closeModal();
            }
            if (lightboxModal && lightboxModal.classList.contains('open')) {
                closeLightbox();
            }
        }
    });

    // 10. Certificate Links Feedback
    const certLinks = document.querySelectorAll('.cert-link');
    certLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#' || href.startsWith('#courses')) {
                e.preventDefault();
                showToast('Certificate link is editable: update href with your verified credential URL.');
            }
        });
    });

    // 11. Contact Form Validation & Submission Simulation
    if (contactForm) {
        const nameInput = document.getElementById('userName');
        const emailInput = document.getElementById('userEmail');
        const subjectInput = document.getElementById('userSubject');
        const messageInput = document.getElementById('userMessage');

        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const subjectError = document.getElementById('subjectError');
        const messageError = document.getElementById('messageError');
        const submitBtn = document.getElementById('submitFormBtn');

        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // Reset errors
            nameError.textContent = '';
            emailError.textContent = '';
            subjectError.textContent = '';
            messageError.textContent = '';

            // Name validation
            if (!nameInput.value.trim()) {
                nameError.textContent = 'Please enter your name.';
                isValid = false;
            }

            // Email validation
            if (!emailInput.value.trim()) {
                emailError.textContent = 'Please enter your email address.';
                isValid = false;
            } else if (!validateEmail(emailInput.value.trim())) {
                emailError.textContent = 'Please enter a valid email address.';
                isValid = false;
            }

            // Subject validation
            if (!subjectInput.value.trim()) {
                subjectError.textContent = 'Please enter a subject.';
                isValid = false;
            }

            // Message validation
            if (!messageInput.value.trim()) {
                messageError.textContent = 'Please enter your message.';
                isValid = false;
            } else if (messageInput.value.trim().length < 5) {
                messageError.textContent = 'Message should be at least 5 characters long.';
                isValid = false;
            }

            if (isValid) {
                const originalBtnContent = submitBtn.innerHTML;
                submitBtn.disabled = true;
                submitBtn.innerHTML = `<span>Sending...</span>`;

                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnContent;
                    contactForm.reset();
                    showToast('Thank you! Your message has been received.', 4500);
                }, 800);
            }
        });
    }

    // 12. Back to Top Button
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
