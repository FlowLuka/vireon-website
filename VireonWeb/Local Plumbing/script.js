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
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Emergency button pulse animation
const emergencyBtn = document.querySelector('.emergency-btn');
if (emergencyBtn) {
    emergencyBtn.addEventListener('mouseenter', () => {
        emergencyBtn.style.animation = 'pulse 0.5s infinite';
    });
    
    emergencyBtn.addEventListener('mouseleave', () => {
        emergencyBtn.style.animation = '';
    });
}

// Service cards hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Project cards click effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = 'translateY(-10px)';
        }, 150);
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = this.querySelector('input[type="text"]').value;
        const phone = this.querySelector('input[type="tel"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const serviceType = this.querySelector('select').value;
        const message = this.querySelector('textarea').value;
        const checkbox = this.querySelector('input[type="checkbox"]').checked;
        
        // Simple validation
        if (!name || !phone || !email || !serviceType || !checkbox) {
            showNotification('Please fill in all required fields and accept terms.', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Thank you! We\'ll contact you within 2 hours.', 'success');
            this.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.5s ease;
        font-weight: 500;
        max-width: 300px;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 4000);
}

// Animate elements on scroll
document.addEventListener('DOMContentLoaded', () => {
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
    const animateElements = document.querySelectorAll('.service-card, .project-card, .contact-method, .feature');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Pipe system animation
    const pipes = document.querySelectorAll('.pipe');
    pipes.forEach((pipe, index) => {
        pipe.style.animationDelay = `${index * 0.5}s`;
    });
    
    // Add industrial sound effects (optional)
    const emergencyButtons = document.querySelectorAll('.emergency-btn, .btn-secondary');
    emergencyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Add a subtle vibration effect
            btn.style.animation = 'pulse 0.3s ease';
            setTimeout(() => {
                btn.style.animation = '';
            }, 300);
        });
    });
    
    // Add a professional welcome message
    setTimeout(() => {
        const welcomeMessage = document.createElement('div');
        welcomeMessage.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #ff6b35, #f7931e);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 8px 25px rgba(255, 107, 53, 0.3);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.5s ease;
            font-family: 'Orbitron', monospace;
            font-size: 1rem;
            font-weight: 600;
        `;
        welcomeMessage.innerHTML = '<i class="fas fa-wrench"></i> IronFlow Plumbing - Ready to Serve!';
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

// Add some industrial-specific interactions
document.addEventListener('DOMContentLoaded', () => {
    // Make service icons more interactive
    const serviceIcons = document.querySelectorAll('.service-icon');
    serviceIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            icon.style.boxShadow = '0 8px 25px rgba(255, 107, 53, 0.4)';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = '';
            icon.style.boxShadow = '';
        });
    });
    
    // Add emergency contact highlight
    const emergencyContact = document.querySelector('.emergency-contact');
    if (emergencyContact) {
        emergencyContact.addEventListener('mouseenter', () => {
            emergencyContact.style.background = 'rgba(255, 107, 53, 0.1)';
            emergencyContact.style.borderRadius = '5px';
            emergencyContact.style.padding = '5px 10px';
        });
        
        emergencyContact.addEventListener('mouseleave', () => {
            emergencyContact.style.background = '';
            emergencyContact.style.borderRadius = '';
            emergencyContact.style.padding = '';
        });
    }
    
    // Add certification badges animation
    const badges = document.querySelectorAll('.badge');
    badges.forEach((badge, index) => {
        badge.addEventListener('mouseenter', () => {
            badge.style.transform = 'scale(1.05) rotate(2deg)';
            badge.style.boxShadow = '0 8px 25px rgba(255, 107, 53, 0.3)';
        });
        
        badge.addEventListener('mouseleave', () => {
            badge.style.transform = '';
            badge.style.boxShadow = '';
        });
    });
});

// Add scroll progress indicator
window.addEventListener('scroll', () => {
    const scrollProgress = document.createElement('div');
    scrollProgress.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: ${(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%;
        height: 3px;
        background: linear-gradient(135deg, #ff6b35, #f7931e);
        z-index: 1001;
        transition: width 0.3s ease;
    `;
    
    // Remove existing progress bar
    const existingProgress = document.querySelector('.scroll-progress');
    if (existingProgress) {
        existingProgress.remove();
    }
    
    scrollProgress.className = 'scroll-progress';
    document.body.appendChild(scrollProgress);
}); 