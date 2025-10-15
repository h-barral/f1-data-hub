// ======================= COMPTE À REBOURS =======================

// 1. Définir la date de la course (Année, Mois-1, Jour)
const raceDate = new Date('2025-11-24T00:00:00');

// 2. Récupérer les éléments du DOM
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

// 3. Fonction pour mettre à jour le compte à rebours
function updateCountdown() {
    const now = new Date();
    const diff = raceDate - now;

    // Calculs pour convertir les millisecondes
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // 4. Mettre à jour le HTML
    daysEl.innerHTML = days < 10 ? '0' + days : days;
    hoursEl.innerHTML = hours < 10 ? '0' + hours : hours;
    minutesEl.innerHTML = minutes < 10 ? '0' + minutes : minutes;
    secondsEl.innerHTML = seconds < 10 ? '0' + seconds : seconds;
}

// 5. Lancer la fonction toutes les secondes
setInterval(updateCountdown, 1000);