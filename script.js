document.addEventListener('DOMContentLoaded', () => {
    const menuTrigger = document.querySelector('.menu-trigger');
    const circle = document.querySelector('.circle');
    const navigation = document.querySelector('.navigation');
    const navItems = document.querySelectorAll('.navigation li');
    const content = document.querySelector('.content');
    let isMenuOpen = false;

    // Create and append overlay element
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);

    menuTrigger.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        circle.classList.toggle('active');
        navigation.classList.toggle('active');
        overlay.classList.toggle('active');
        
        if (!isMenuOpen) {
            content.style.transform = 'rotate(0deg) translateX(0)';
        }
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const angle = parseInt(item.getAttribute('data-angle'));
            const slideDirection = angle === 0 ? 0 : (angle === 120 ? 100 : -100);
            
            // Handle page navigation
            let targetPage;
            if (angle === 0) {
                targetPage = 'index.html';
            } else if (angle === 120) {
                targetPage = 'account.html';
            } else if (angle === 240) {
                targetPage = 'contact.html';
            }

            // Animate and then navigate
            content.style.transform = `rotate(${angle}deg) translateX(${slideDirection}vw)`;
            
            // Wait for animation to complete before navigating
            setTimeout(() => {
                window.location.href = targetPage;
            }, 800); // Match this with your CSS transition time
            
            // Update active states
            navItems.forEach(navItem => navItem.classList.remove('active'));
            item.classList.add('active');

            // Close menu and remove overlay
            isMenuOpen = false;
            circle.classList.remove('active');
            navigation.classList.remove('active');
            overlay.classList.remove('active');
        });
    });

    // New Image Slideshow Code
    const imageContainers = document.querySelectorAll('.image-container');
    
    // Image arrays for each slideshow
    const imageArrays = {
        'hero-slideshow': [
            {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80',
                label: 'Beautiful Beach Shoreline'
            },
            {
                src: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
                label: 'Scenic Beach Sunset'
            },
            {
                src: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
                label: 'Beachfront Paradise'
            }
        ],
        'longbeach-slideshow': [
            {
                src: 'https://images.unsplash.com/photo-1597466599360-3b9775841aec?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
                label: 'Beach Boardwalk'
            },
            {
                src: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
                label: 'Surfing Waves'
            },
            {
                src: 'https://images.unsplash.com/photo-1471922694854-ff1b63b20054?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
                label: 'Beach Aerial View'
            }
        ],
        'jonesbeach-slideshow': [
            {
                src: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
                label: 'Beach Sunset'
            },
            {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
                label: 'Beach Activities'
            },
            {
                src: 'https://images.unsplash.com/photo-1520942702018-0862200e6873?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
                label: 'Beach Walkway'
            }
        ]
    };

    imageContainers.forEach(container => {
        if (container.dataset.slideshow) {
            const images = imageArrays[container.dataset.slideshow];
            let currentImageIndex = 0;

            // Create navigation buttons
            const prevBtn = document.createElement('button');
            prevBtn.className = 'slide-nav prev';
            prevBtn.innerHTML = '❮';

            const nextBtn = document.createElement('button');
            nextBtn.className = 'slide-nav next';
            nextBtn.innerHTML = '❯';

            // Create dots container
            const dotsContainer = document.createElement('div');
            dotsContainer.className = 'slide-dots';

            // Add dots for each image
            images.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.className = 'slide-dot';
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    currentImageIndex = index;
                    updateImage();
                });
                dotsContainer.appendChild(dot);
            });

            // Add navigation elements to container
            container.appendChild(prevBtn);
            container.appendChild(nextBtn);
            container.appendChild(dotsContainer);

            // Navigation functions
            const updateImage = () => {
                const img = container.querySelector('img');
                const label = container.querySelector('.image-label');
                const dots = container.querySelectorAll('.slide-dot');

                img.src = images[currentImageIndex].src;
                label.textContent = images[currentImageIndex].label;
                
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentImageIndex);
                });
            };

            prevBtn.addEventListener('click', () => {
                currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
                updateImage();
            });

            nextBtn.addEventListener('click', () => {
                currentImageIndex = (currentImageIndex + 1) % images.length;
                updateImage();
            });

            // Auto-advance slideshow
            setInterval(() => {
                if (!container.matches(':hover')) {
                    currentImageIndex = (currentImageIndex + 1) % images.length;
                    updateImage();
                }
            }, 5000);
        }
    });
}); 