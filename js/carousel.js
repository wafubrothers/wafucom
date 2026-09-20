(function () {
    'use strict';

    const carousel = document.getElementById('heroCarousel');
    if (!carousel) return;

    const slides = Array.from(carousel.querySelectorAll('[data-cosmo-slide]'));
    const dots = Array.from(carousel.querySelectorAll('[data-cosmo-dot]'));
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const interval = 6000;
    let activeIndex = 0;
    let timer = null;
    let touchStartX = null;

    if (slides.length < 2 || slides.length !== dots.length) return;

    function restartProgress(dot) {
        const progress = dot.querySelector('.cosmo-hero__dot-progress');
        if (!progress || reducedMotion) return;
        progress.style.animation = 'none';
        void progress.getBoundingClientRect();
        progress.style.animation = '';
    }

    function showSlide(index) {
        activeIndex = (index + slides.length) % slides.length;

        slides.forEach((slide, slideIndex) => {
            const active = slideIndex === activeIndex;
            slide.classList.toggle('is-active', active);
            slide.setAttribute('aria-hidden', String(!active));
        });

        dots.forEach((dot, dotIndex) => {
            const active = dotIndex === activeIndex;
            dot.classList.toggle('is-active', active);
            dot.setAttribute('aria-selected', String(active));
            dot.tabIndex = active ? 0 : -1;
            if (active) restartProgress(dot);
        });
    }

    function stopAutoplay() {
        window.clearInterval(timer);
        timer = null;
    }

    function startAutoplay() {
        if (reducedMotion || document.hidden) return;
        stopAutoplay();
        timer = window.setInterval(() => showSlide(activeIndex + 1), interval);
    }

    dots.forEach((dot) => {
        dot.addEventListener('click', () => {
            showSlide(Number(dot.dataset.cosmoDot));
            startAutoplay();
        });
    });

    carousel.addEventListener('focusin', stopAutoplay);
    carousel.addEventListener('focusout', startAutoplay);

    carousel.addEventListener('keydown', (event) => {
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
        event.preventDefault();
        showSlide(activeIndex + (event.key === 'ArrowRight' ? 1 : -1));
        dots[activeIndex].focus();
        startAutoplay();
    });

    carousel.addEventListener('touchstart', (event) => {
        touchStartX = event.changedTouches[0].clientX;
    }, { passive: true });

    carousel.addEventListener('touchend', (event) => {
        if (touchStartX === null) return;
        const distance = event.changedTouches[0].clientX - touchStartX;
        touchStartX = null;
        if (Math.abs(distance) < 50) return;
        showSlide(activeIndex + (distance < 0 ? 1 : -1));
        startAutoplay();
    }, { passive: true });

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) stopAutoplay();
        else startAutoplay();
    });

    showSlide(0);
    startAutoplay();
}());
