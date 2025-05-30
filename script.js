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


