document.addEventListener('DOMContentLoaded', () => {

    // ======================= COMPTE À REBOURS (PAGE D'ACCUEIL) =======================
    const countdownContainer = document.getElementById("countdown");
    if (countdownContainer) {
        const raceDate = new Date("2025-11-24T00:00:00");
        const daysEl = document.getElementById("days");
        const hoursEl = document.getElementById("hours");
        const minutesEl = document.getElementById("minutes");
        const secondsEl = document.getElementById("seconds");

        function updateCountdown() {
            if (daysEl && hoursEl && minutesEl && secondsEl) {
                const now = new Date();
                const diff = raceDate - now;
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);

                daysEl.innerHTML = days < 10 ? "0" + days : days;
                hoursEl.innerHTML = hours < 10 ? "0" + hours : hours;
                minutesEl.innerHTML = minutes < 10 ? "0" + minutes : minutes;
                secondsEl.innerHTML = seconds < 10 ? "0" + seconds : seconds;
            }
        }
        setInterval(updateCountdown, 1000);
    }

    // ======================= ANIMATION AU SCROLL =======================
    const hiddenElements = document.querySelectorAll(".hidden-on-load");
    if (hiddenElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                } else {
                    entry.target.classList.remove("visible");
                }
            });
        }, { threshold: 0.25 });
        hiddenElements.forEach((el) => observer.observe(el));
    }

    // ======================= GÉNÉRATION DYNAMIQUE DES COURSES =======================
    const scheduleContainer = document.getElementById('schedule-grid-container');
    if (scheduleContainer && typeof raceSchedule !== "undefined") {
        raceSchedule.forEach((race) => {
            const statusClass = race.status === "Terminé" ? "status-completed" : "status-upcoming";
            const raceCardHTML = `
                <div class="race-card">
                    <div class="race-card-header"><span class="round-number">Round ${String(race.round).padStart(2, "0")}</span><span class="race-date">${race.date}</span></div>
                    <div class="race-card-body"><div class="race-flag"><img src="${race.flag}" alt="Drapeau"></div><div class="race-details"><h3>${race.name}</h3><p>${race.circuit}</p></div></div>
                    <div class="race-card-status"><span class="status ${statusClass}">${race.status}</span></div>
                </div>`;
            scheduleContainer.innerHTML += raceCardHTML;
        });
    }

    // ======================= GÉNÉRATION DYNAMIQUE DES CLASSEMENTS =======================
    const driverStandingsBody = document.getElementById('driver-standings-body');
    if (driverStandingsBody && typeof driverStandings !== 'undefined') {
        driverStandings.forEach((standing) => {
            const rowHTML = `<tr style="--team-color: ${standing.teamColor};"><td>${standing.pos}</td><td>${standing.driver}</td><td>${standing.team}</td><td>${standing.points}</td></tr>`;
            driverStandingsBody.innerHTML += rowHTML;
        });
    }

    const constructorStandingsBody = document.getElementById('constructor-standings-body');
    if (constructorStandingsBody && typeof constructorStandings !== 'undefined') {
        constructorStandings.forEach((standing) => {
            const rowHTML = `<tr style="--team-color: ${standing.teamColor};"><td>${standing.pos}</td><td>${standing.team}</td><td>${standing.points}</td></tr>`;
            constructorStandingsBody.innerHTML += rowHTML;
        });
    }

    // ======================= VUE GRILLE / CARROUSEL 3D POUR LES PILOTES =======================
    const viewContainer = document.getElementById('pilots-view-container');
    const toggleCheckbox = document.getElementById('view-toggle-checkbox');
    if (viewContainer && toggleCheckbox && typeof drivers !== 'undefined') {
        let currentAngle = 0;
        const anglePerItem = 360 / drivers.length;

        function generateGridView() {
            let gridHTML = '<div class="pilots-grid">';
            drivers.forEach(driver => {
                gridHTML += `<div class="pilot-card" style="--team-color: ${driver.teamColor};"><div class="pilot-card-header"><span class="pilot-number">${driver.number}</span><img src="${driver.flag}" alt="Drapeau" class="pilot-flag"></div><div class="pilot-image"><img src="${driver.image}" alt="${driver.name}"></div><div class="pilot-info"><h3>${driver.name}</h3><p>${driver.team}</p></div></div>`;
            });
            gridHTML += '</div>';
            viewContainer.innerHTML = gridHTML;
        }

        function generateCarouselView() {
            const radius = 420;
            let carouselHTML = `<div class="carousel-scene"><div class="carousel-3d">`;
            drivers.forEach((driver, index) => {
                const itemAngle = anglePerItem * index;
                const transformStyle = `transform: rotateY(${itemAngle}deg) translateZ(${radius}px);`;
                carouselHTML += `<div class="carousel-3d-item" style="${transformStyle}"><div class="pilot-card" style="--team-color: ${driver.teamColor};"><div class="pilot-card-header"><span class="pilot-number">${driver.number}</span><img src="${driver.flag}" alt="Drapeau" class="pilot-flag"></div><div class="pilot-image"><img src="${driver.image}" alt="${driver.name}"></div><div class="pilot-info"><h3>${driver.name}</h3><p>${driver.team}</p></div></div></div>`;
            });
            carouselHTML += `</div><div class="carousel-3d-nav"><button id="prev-btn">‹</button><button id="next-btn">›</button></div></div>`;
            viewContainer.innerHTML = carouselHTML;

            const carousel3d = document.querySelector('.carousel-3d');
            document.getElementById('prev-btn').addEventListener('click', () => {
                currentAngle += anglePerItem;
                carousel3d.style.transform = `rotateY(${currentAngle}deg)`;
            });
            document.getElementById('next-btn').addEventListener('click', () => {
                currentAngle -= anglePerItem;
                carousel3d.style.transform = `rotateY(${currentAngle}deg)`;
            });
        }

        toggleCheckbox.addEventListener('change', () => {
            if (toggleCheckbox.checked) {
                generateCarouselView();
            } else {
                generateGridView();
            }
        });

        generateGridView(); // Affiche la grille par défaut
    }
});