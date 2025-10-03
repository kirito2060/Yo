document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

    slides.forEach((slide) => {
        slide.classList.remove('active');
    });

        slides[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    showSlide(currentSlide);

    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000); 
    }

    startSlideShow();
});