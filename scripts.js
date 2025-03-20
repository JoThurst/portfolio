// Single DOMContentLoaded event listener for all functionality
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu functionality
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }

    // Typing effect
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const words = ['Full Stack Development', 'SBIR Projects', 'Agile Development', 'AI Integration'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingDelay = 100;

        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typingDelay = 1000; // Pause at end of word
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typingDelay = 200;
            } else {
                typingDelay = isDeleting ? 50 : 100;
            }

            setTimeout(type, typingDelay);
        }

        type();
    }

    // Art Gallery Carousel
    const artImages = [
        '/static/images/interests/art/ai-14.png',
        '/static/images/interests/art/ai-13.png',
        '/static/images/interests/art/ai-12.png',
        '/static/images/interests/art/ai-15.png',
        '/static/images/interests/art/ai-11.png',
        '/static/images/interests/art/ai-10.png',
        '/static/images/interests/art/ai-9.png',
        '/static/images/interests/art/ai-8.png',
        '/static/images/interests/art/ai-0.png',
        '/static/images/interests/art/ai-1.jpg',
        '/static/images/interests/art/ai-2.png',
        '/static/images/interests/art/ai-3.png',
        '/static/images/interests/art/ai-4.png',
        '/static/images/interests/art/ai-5.png',
        '/static/images/interests/art/ai-6.png',
        '/static/images/interests/art/ai-7.png'
    ];

    const carousel = document.getElementById('art-carousel');
    const dotsContainer = document.getElementById('carousel-dots');
    const thumbnailStrip = document.getElementById('thumbnail-strip');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentIndex = 0;

    if (carousel && dotsContainer && thumbnailStrip) {
        // Initialize carousel
        artImages.forEach((src, index) => {
            // Add main carousel images
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Art piece ${index + 1}`;
            img.className = 'w-full h-[600px] object-contain flex-shrink-0';
            carousel.appendChild(img);

            // Add dots
            const dot = document.createElement('button');
            dot.className = `w-3 h-3 rounded-full ${index === 0 ? 'bg-white' : 'bg-white/50'}`;
            dot.onclick = () => goToSlide(index);
            dotsContainer.appendChild(dot);

            // Add thumbnails
            const thumb = document.createElement('img');
            thumb.src = src;
            thumb.alt = `Thumbnail ${index + 1}`;
            thumb.className = 'h-20 w-20 object-cover rounded cursor-pointer ' + 
                            (index === 0 ? 'ring-2 ring-accent' : '');
            thumb.onclick = () => goToSlide(index);
            thumbnailStrip.appendChild(thumb);
        });

        // Navigation functions
        function updateCarousel() {
            const offset = currentIndex * -100;
            carousel.style.transform = `translateX(${offset}%)`;
            
            // Update dots
            Array.from(dotsContainer.children).forEach((dot, index) => {
                dot.className = `w-3 h-3 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-white/50'}`;
            });

            // Update thumbnails
            Array.from(thumbnailStrip.children).forEach((thumb, index) => {
                thumb.className = `h-20 w-20 object-cover rounded cursor-pointer ${
                    index === currentIndex ? 'ring-2 ring-accent' : ''
                }`;
            });
        }

        function goToSlide(index) {
            currentIndex = index;
            updateCarousel();
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % artImages.length;
            updateCarousel();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + artImages.length) % artImages.length;
            updateCarousel();
        }

        // Add event listeners
        if (prevBtn) prevBtn.onclick = prevSlide;
        if (nextBtn) nextBtn.onclick = nextSlide;

        // Auto advance slides every 5 seconds
        setInterval(nextSlide, 5000);
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                if (mobileMenu) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('opacity-0');
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Only observe sections below the fold
    document.querySelectorAll('section:not(#hero)').forEach(section => {
        section.classList.add('opacity-0');
        observer.observe(section);
    });
});
