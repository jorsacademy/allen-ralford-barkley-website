// Professional Interactive Features JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Clean, professional interactions only

    // Scroll Progress Indicator
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    document.body.appendChild(scrollProgress);

    window.addEventListener('scroll', function() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile Menu Toggle
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu && !document.querySelector('.mobile-menu-toggle')) {
        const mobileToggle = document.createElement('div');
        mobileToggle.className = 'mobile-menu-toggle';
        mobileToggle.innerHTML = '<span></span><span></span><span></span>';
        
        const navContainer = document.querySelector('.nav-container');
        navContainer.appendChild(mobileToggle);

        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
    }

    // Clean professional styling
    function applyProfessionalStyling() {
        // Apply professional card styling
        document.querySelectorAll('.feature-card, .benefit-item').forEach(card => {
            card.classList.add('professional-card');
        });
        
        // Apply professional image styling
        document.querySelectorAll('.hero-image, .feature-image').forEach(image => {
            image.classList.add('professional-image');
        });
        
        // Apply professional button styling
        document.querySelectorAll('.cta-button').forEach(btn => {
            btn.classList.add('btn-professional');
        });
    }

    // Clean professional hover effects
    document.querySelectorAll('.feature-card, .benefit-item').forEach(card => {
        card.classList.add('subtle-hover');
    });

    // Apply clean styling to titles
    document.querySelectorAll('.hero-title').forEach(title => {
        title.classList.add('professional-title');
    });
    
    document.querySelectorAll('.hero-subtitle').forEach(subtitle => {
        subtitle.classList.add('professional-subtitle');
    });
    
    document.querySelectorAll('.feature-description, .benefit-description').forEach(text => {
        text.classList.add('professional-text');
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    document.querySelectorAll('.feature-card, .benefit-item, .section-title').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Initialize professional styling
    applyProfessionalStyling();

    // Enhanced image loading with fade-in effect
    document.querySelectorAll('img').forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // If image is already loaded
        if (img.complete) {
            img.style.opacity = '1';
        }
    });

    console.log('✨ Professional enhancements loaded successfully!');
});
