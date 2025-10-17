// ======================= COMPTE À REBOURS =======================
const raceDate = new Date('2025-11-24T00:00:00');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

function updateCountdown() {
    // On vérifie si les éléments existent avant de les utiliser
    if (daysEl && hoursEl && minutesEl && secondsEl) {
        const now = new Date();
        const diff = raceDate - now;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        daysEl.innerHTML = days < 10 ? '0' + days : days;
        hoursEl.innerHTML = hours < 10 ? '0' + hours : hours;
        minutesEl.innerHTML = minutes < 10 ? '0' + minutes : minutes;
        secondsEl.innerHTML = seconds < 10 ? '0' + seconds : seconds;
    }
}

// On lance la fonction uniquement si on est sur la page d'accueil
if (document.getElementById('countdown')) {
    setInterval(updateCountdown, 1000);
}

// ======================= ANIMATION AU SCROLL (VERSION RÉVERSIBLE) =======================
document.addEventListener('DOMContentLoaded', () => {
    const hiddenElements = document.querySelectorAll('.hidden-on-load');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.25
    };

    if (hiddenElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } else {
                    entry.target.classList.remove('visible');
                }
            });
        }, observerOptions);

        hiddenElements.forEach((el) => observer.observe(el));
    }
});