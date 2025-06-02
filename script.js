  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
        
        // Form submission
        const contactForm = document.querySelector('.contact-form form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Thank you for your message! We will contact you shortly.');
                this.reset();
            });
        }
        
        // Gallery Modal Functionality
        const modal = document.getElementById("imageModal");
        const modalImg = document.getElementById("modalImage");
        const captionText = document.getElementById("modalCaption");
        const closeBtn = document.querySelector(".close");
        
        // Get all gallery items
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const img = this.querySelector('img');
                modal.style.display = "block";
                modalImg.src = img.src;
                captionText.innerHTML = this.querySelector('h3').innerHTML + 
                                        "<br><small>" + this.querySelector('p').innerHTML + "</small>";
            });
        });
        
        closeBtn.addEventListener('click', function() {
            modal.style.display = "none";
        });
        
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
        
        // Gallery category filtering
        const categories = document.querySelectorAll('.gallery-category');
        
        categories.forEach(category => {
            category.addEventListener('click', function() {
                // Remove active class from all categories
                categories.forEach(cat => cat.classList.remove('active'));
                
                // Add active class to clicked category
                this.classList.add('active');
                
                // Here would be the filtering logic in a real implementation
                // For this demo, we'll just show all items
            });
        });


        
        // Header scroll effect
        window.addEventListener('scroll', function() {
            const header = document.querySelector('header');
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
                header.style.padding = '10px 0';
            } else {
                header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
                header.style.padding = '15px 0';
            }
        });
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

         // Fixed animation for stats - now handles percentages and plus signs
        document.addEventListener('DOMContentLoaded', function() {
            const statsSection = document.querySelector('.stats-section');
            const statNumbers = document.querySelectorAll('.stat-number');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        statNumbers.forEach(stat => {
                            const originalText = stat.innerText;
                            // Extract the numeric value (remove % and +)
                            let target = parseFloat(originalText.replace(/[^0-9.]/g, ''));
                            
                            // If we have a percentage sign, we'll need to add it back later
                            const isPercentage = originalText.includes('%');
                            const hasPlus = originalText.includes('+');
                            
                            // If we couldn't parse a number, skip this stat
                            if (isNaN(target)) return;
                            
                            let count = 0;
                            const increment = target / 30;
                            
                            const updateCount = () => {
                                if (count < target) {
                                    let displayValue = Math.ceil(count);
                                    // Add back the symbols as needed
                                    if (isPercentage) displayValue += '%';
                                    if (hasPlus) displayValue += '+';
                                    stat.innerText = displayValue;
                                    count += increment;
                                    setTimeout(updateCount, 50);
                                } else {
                                    // Final value with symbols
                                    let displayValue = target;
                                    if (isPercentage) displayValue += '%';
                                    if (hasPlus) displayValue += '+';
                                    stat.innerText = displayValue;
                                }
                            };
                            
                            updateCount();
                        });
                        
                        // Stop observing after animation
                        observer.unobserve(statsSection);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(statsSection);
        });


  document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    toggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });
  });






// Contact Form Submission with Formspree



document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    
    if (!form || !submitBtn) return;

    // Form submission handler
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Add loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Get form data
        const formData = new FormData(form);
        
        // Submit to Formspree
        fetch('https://formspree.io/f/xwplyovp', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                showSuccessMessage();
                form.reset();
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showErrorMessage();
        })
        .finally(() => {
            // Remove loading state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        });
    });
    
    // Success message
    function showSuccessMessage() {
        const message = document.createElement('div');
        message.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #10b981, #059669);
                color: white;
                padding: 16px 24px;
                border-radius: 8px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
                z-index: 1000;
                animation: slideInFromRight 0.3s ease-out;
            ">
                <div style="display: flex; align-items: center;">
                    <i class="fas fa-check-circle" style="margin-right: 8px;"></i>
                    <span>Message sent successfully! We'll respond within 24 hours.</span>
                </div>
            </div>
        `;
        
        document.body.appendChild(message);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            message.remove();
        }, 5000);
    }
    
    // Error message
    function showErrorMessage() {
        const message = document.createElement('div');
        message.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #ef4444, #dc2626);
                color: white;
                padding: 16px 24px;
                border-radius: 8px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
                z-index: 1000;
                animation: slideInFromRight 0.3s ease-out;
            ">
                <div style="display: flex; align-items: center;">
                    <i class="fas fa-exclamation-triangle" style="margin-right: 8px;"></i>
                    <span>Failed to send message. Please try again.</span>
                </div>
            </div>
        `;
        
        document.body.appendChild(message);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            message.remove();
        }, 5000);
    }
    
    // Add animation for toast messages
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInFromRight {
            from {
                opacity: 0;
                transform: translateX(100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Form validation enhancements
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
    
    function validateField(field) {
        const value = field.value.trim();
        
        // Remove any existing error
        clearFieldError(field);
        
        if (field.hasAttribute('required') && !value) {
            showFieldError(field, 'This field is required');
            return false;
        }
        
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(field, 'Please enter a valid email address');
                return false;
            }
        }
        
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[\d\s\-\(\)]+$/;
            if (!phoneRegex.test(value)) {
                showFieldError(field, 'Please enter a valid phone number');
                return false;
            }
        }
        
        return true;
    }
    
    function showFieldError(field, message) {
        field.style.borderColor = '#ef4444';
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.style.color = '#ef4444';
        errorDiv.style.fontSize = '14px';
        errorDiv.style.marginTop = '4px';
        errorDiv.textContent = message;
        
        field.parentNode.appendChild(errorDiv);
    }
    
    function clearFieldError(field) {
        field.style.borderColor = '';
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }
    
    // Enhance form submission with validation
    const originalSubmitHandler = form.onsubmit;
    form.addEventListener('submit', function(event) {
        let isValid = true;
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            event.preventDefault();
            return false;
        }
    });
});

  






   // Mobile Menu Toggle
        const hamburger = document.querySelector('.hamburger');
        const mobileMenu = document.querySelector('.mobile-menu');
        const overlay = document.querySelector('.overlay');
        
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            overlay.classList.toggle('active');
        });
        
        overlay.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
        });
        