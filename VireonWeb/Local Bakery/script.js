// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(210, 105, 30, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(255, 182, 193, 0.1)';
    }
});

// Product Tab Functionality
const productTabs = document.querySelectorAll('.product-tab');
const productCategories = document.querySelectorAll('.product-category');

productTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and categories
        productTabs.forEach(t => t.classList.remove('active'));
        productCategories.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Show corresponding category
        const category = document.getElementById(tab.dataset.category);
        if (category) {
            category.classList.add('active');
        }
    });
});

// Side Navigation Functionality
const sideNav = document.querySelector('.side-nav');
const navLinks = document.querySelectorAll('.nav-link');

// Active navigation link
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        this.classList.add('active');
        
        // Smooth scroll to section
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Floating order button functionality
const orderBtn = document.querySelector('.order-btn');
orderBtn.addEventListener('click', () => {
    // Scroll to contact section
    document.querySelector('#contact').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

// Menu filtering functionality
const tabBtns = document.querySelectorAll('.tab-btn');
const menuItems = document.querySelectorAll('.menu-item');

tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all tabs
        tabBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked tab
        this.classList.add('active');
        
        const category = this.getAttribute('data-category');
        
        // Show/hide menu items based on category
        menuItems.forEach(item => {
            if (category === 'all' || item.getAttribute('data-category') === category) {
                item.style.display = 'flex';
                item.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Gallery hover effects
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    // Click to enlarge (simple modal effect)
    item.addEventListener('click', function() {
        const overlay = this.querySelector('.gallery-overlay');
        if (overlay) {
            overlay.style.transform = 'translateY(0)';
        }
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const phone = this.querySelector('input[type="tel"]').value;
        const orderType = this.querySelector('select').value;
        const message = this.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !phone || !orderType) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Simulate form submission
        const submitButton = this.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your order request! We\'ll get back to you soon with a confirmation.');
            this.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#48bb78' : type === 'error' ? '#f56565' : '#4299e1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Parallax effect for floating elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const floatingItems = document.querySelectorAll('.floating-item');
    
    floatingItems.forEach(item => {
        const speed = parseFloat(item.getAttribute('data-speed'));
        const yPos = -(scrolled * speed);
        item.style.transform = `translateY(${yPos}px) rotate(${yPos * 0.1}deg)`;
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.menu-item, .gallery-item, .contact-item, .stat');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add hover effects to bread showcase
document.querySelectorAll('.bread-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.05)';
        this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
    });
});

// Add click effects to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add some creative interactions
document.addEventListener('DOMContentLoaded', () => {
    // Typing effect for main title
    const mainTitle = document.querySelector('.title-highlight');
    if (mainTitle) {
        const text = mainTitle.textContent;
        mainTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                mainTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a delay
        setTimeout(typeWriter, 1000);
    }

    // Add floating animation to bread showcase
    const breadItems = document.querySelectorAll('.bread-item');
    breadItems.forEach((item, index) => {
        item.style.animation = `float 4s ease-in-out infinite ${index * 0.5}s`;
    });

    // Add pulse effect to order button
    const orderButton = document.querySelector('.order-btn');
    if (orderButton) {
        setInterval(() => {
            orderButton.style.animation = 'pulse 2s ease-in-out';
            setTimeout(() => {
                orderButton.style.animation = 'none';
            }, 2000);
        }, 8000);
    }
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
        100% {
            transform: scale(1);
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
    
    .menu-item {
        opacity: 0;
        transform: translateY(30px);
    }
    
    .menu-item.show {
        opacity: 1;
        transform: translateY(0);
    }
    
    .bread-item {
        transition: all 0.3s ease;
    }
    
    .tab-btn {
        position: relative;
        overflow: hidden;
    }
    
    .tab-btn::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: rgba(245, 101, 101, 0.2);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        transition: width 0.3s ease, height 0.3s ease;
    }
    
    .tab-btn:hover::before {
        width: 100%;
        height: 100%;
    }
    
    .tab-btn span {
        position: relative;
        z-index: 1;
    }
`;
document.head.appendChild(style);

// Add some bakery-specific interactions
document.addEventListener('DOMContentLoaded', () => {
    // Make floating elements more interactive
    const floatingItems = document.querySelectorAll('.floating-item');
    floatingItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.2) rotate(10deg)';
            item.style.filter = 'drop-shadow(0 15px 25px rgba(210, 105, 30, 0.4))';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = '';
            item.style.filter = '';
        });
    });
    
    // Add a warm welcome message
    setTimeout(() => {
        const welcomeMessage = document.createElement('div');
        welcomeMessage.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #d2691e, #cd853f);
            color: white;
            padding: 15px 20px;
            border-radius: 25px;
            box-shadow: 0 8px 25px rgba(210, 105, 30, 0.3);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.5s ease;
            font-family: 'Dancing Script', cursive;
            font-size: 1.1rem;
        `;
        welcomeMessage.innerHTML = '<i class="fas fa-bread-slice"></i> Welcome to Sweet Dreams!';
        document.body.appendChild(welcomeMessage);
        
        setTimeout(() => {
            welcomeMessage.style.transform = 'translateX(0)';
        }, 1000);
        
        setTimeout(() => {
            welcomeMessage.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(welcomeMessage);
            }, 500);
        }, 4000);
    }, 2000);
}); 