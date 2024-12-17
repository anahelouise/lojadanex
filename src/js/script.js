document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.product-card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dots = document.querySelectorAll('.dot');

    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth + 20; // 20px for gap

    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = Math.max(currentIndex - 1, 0);
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = Math.min(currentIndex + 1, cards.length - 1);
        updateCarousel();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });

    // Optional: Add touch swipe functionality
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchStartX - touchEndX > 50) {
            // Swipe left
            currentIndex = Math.min(currentIndex + 1, cards.length - 1);
        } else if (touchEndX - touchStartX > 50) {
            // Swipe right
            currentIndex = Math.max(currentIndex - 1, 0);
        }
        updateCarousel();
    }
});
