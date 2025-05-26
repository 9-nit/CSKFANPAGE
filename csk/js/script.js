document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileNav.classList.toggle('show');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Hero Slider
    let currentSlide = 0;
    const heroSlides = [
        {
            title: "5-TIME CHAMPIONS OF IPL",
            subtitle: "IPL 2023 CHAMPIONS",
            description: "The most consistent team in IPL history continues its legacy of excellence and dominance.",
            badge: "IPL 2023 CHAMPIONS",
            image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600"
        },
        {
            title: "WHISTLE PODU ARMY",
            subtitle: "BIGGEST FAN FOLLOWING",
            description: "Join millions of CSK fans and be part of the Yellow Army that supports the team through thick and thin.",
            badge: "FAN FAVORITE",
            image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600"
        },
        {
            title: "HOME OF LEGENDS",
            subtitle: "THALA & CO.",
            description: "Chennai Super Kings has been home to cricket legends who have shaped the game's history.",
            badge: "TEAM LEGENDS",
            image: "https://images.unsplash.com/photo-1629652487043-fb2825838f8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600"
        }
    ];

    // Set up hero slider dots
    const heroDots = document.querySelectorAll('.hero-dots button');
    heroDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            updateHeroSlide(index);
        });
    });

    function updateHeroSlide(index) {
        // Update current slide
        currentSlide = index;
        
        // Update active dot
        heroDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        // Update content
        const slide = heroSlides[index];
        const heroSlide = document.querySelector('.hero-slide');
        const heroImg = heroSlide.querySelector('img');
        const badge = document.querySelector('.hero-text .badge');
        const title = document.querySelector('.hero-text h2');
        const description = document.querySelector('.hero-text p');
        
        // Fade out
        heroSlide.style.opacity = '0';
        
        // Update content after a short delay
        setTimeout(() => {
            heroImg.src = slide.image;
            heroImg.alt = `Chennai Super Kings - ${slide.title}`;
            badge.textContent = slide.badge;
            title.textContent = slide.title;
            description.textContent = slide.description;
            
            // Fade in
            heroSlide.style.opacity = '1';
        }, 300);
    }

    // Auto-rotate hero slider
    let heroInterval = setInterval(() => {
        const nextSlide = (currentSlide + 1) % heroSlides.length;
        updateHeroSlide(nextSlide);
    }, 5000);

    // Team Filter
    const categoryBtns = document.querySelectorAll('.category-btn');
    const playerCards = document.querySelectorAll('.player-card');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.textContent.trim();
            
            // Show/hide player cards based on category
            // This is a simplified version - in a real application, 
            // you would fetch data from a server based on the category
            if (category === 'All Players') {
                playerCards.forEach(card => card.style.display = 'block');
            } else {
                playerCards.forEach(card => {
                    const playerRole = card.querySelector('.player-info p').textContent.trim();
                    if ((category === 'Wicketkeeper' && playerRole.includes('Wicketkeeper')) ||
                        (category === 'Batsmen' && playerRole.includes('Batsman')) ||
                        (category === 'Bowlers' && playerRole.includes('Bowler')) ||
                        (category === 'All-Rounders' && playerRole.includes('All-Rounder'))) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            }
        });
    });

    // Poll form submission
    const pollForm = document.getElementById('pollForm');
    if (pollForm) {
        pollForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const selectedOption = document.querySelector('input[name="poll-options"]:checked');
            
            if (!selectedOption) {
                alert('Please select an option before voting.');
                return;
            }
            
            // In a real application, you would send this data to a server
            const optionId = selectedOption.value;
            console.log('Voted for option:', optionId);
            
            // Show poll results (simplified)
            document.querySelector('.poll-results').style.display = 'block';
            pollForm.style.display = 'none';
        });
    }

    // Newsletter subscription
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!email) {
                alert('Please enter your email address.');
                return;
            }
            
            // In a real application, you would send this data to a server
            console.log('Subscribed email:', email);
            
            // Show success message
            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
        });
    }

    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileNav.classList.contains('show')) {
                    mobileNav.classList.remove('show');
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });

    // Add fade-in effect to hero slide
    const heroSlide = document.querySelector('.hero-slide');
    if (heroSlide) {
        heroSlide.style.transition = 'opacity 0.3s ease';
        heroSlide.style.opacity = '1';
    }
});