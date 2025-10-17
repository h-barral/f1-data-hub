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


    // ======================= COMPARATEUR DE PILOTES =======================
// On s'assure que ce code ne s'exécute que sur la page du comparateur
if (document.getElementById('comparison-container')) {
    const pilote1Select = document.getElementById('pilote1-select');
    const pilote2Select = document.getElementById('pilote2-select');
    const resultsContainer = document.getElementById('comparison-results');
    let allPilotesData = []; // Pour stocker les données de tous les pilotes

    // 1. Aller chercher les données de tous les pilotes via notre API PHP
    fetch('./api/get_pilotes.php')
        .then(response => response.json())
        .then(data => {
            allPilotesData = data;
            populateSelects(data);
        });

    // 2. Remplir les menus déroulants
    function populateSelects(pilotes) {
        pilotes.forEach(pilote => {
            const option1 = new Option(pilote.nom_complet, pilote.id);
            const option2 = new Option(pilote.nom_complet, pilote.id);
            pilote1Select.add(option1);
            pilote2Select.add(option2);
        });
    }

    // 3. Écouter les changements sur les menus
    pilote1Select.addEventListener('change', comparePilotes);
    pilote2Select.addEventListener('change', comparePilotes);

    // 4. Fonction principale de comparaison
    function comparePilotes() {
        const id1 = pilote1Select.value;
        const id2 = pilote2Select.value;

        // Si les deux pilotes sont sélectionnés
        if (id1 && id2) {
            const pilote1 = allPilotesData.find(p => p.id == id1);
            const pilote2 = allPilotesData.find(p => p.id == id2);
            displayResults(pilote1, pilote2);
        }
    }

    // 5. Afficher les résultats
    // 5. Afficher les résultats (VERSION AMÉLIORÉE)
    function displayResults(p1, p2) {
        // Un tableau des statistiques que nous voulons comparer
        const statsToCompare = [
            { key: 'victoires', label: 'Victoires' },
            { key: 'podiums', label: 'Podiums' },
            { key: 'poles', label: 'Pôles' },
            { key: 'championnats_monde', label: 'Titres Mondiaux' }
        ];

        let html = `<h2>${p1.nom_complet} <span class="vs-text-small">vs</span> ${p2.nom_complet}</h2>`;

        statsToCompare.forEach(stat => {
            const val1 = parseInt(p1[stat.key]);
            const val2 = parseInt(p2[stat.key]);
            const total = val1 + val2;
            
            // On calcule le pourcentage pour chaque pilote (on évite la division par zéro si le total est 0)
            const width1 = total > 0 ? (val1 / total) * 100 : 50;
            const width2 = total > 0 ? (val2 / total) * 100 : 50;

            html += `
                <div class="stat-row">
                    <div class="stat-value">${val1}</div>
                    <div class="stat-label">${stat.label}</div>
                    <div class="stat-value">${val2}</div>
                </div>
                <div class="progress-bar-container">
                    <div class="progress-bar bar-p1" style="width: ${width1}%;"></div>
                    <div class="progress-bar bar-p2" style="width: ${width2}%;"></div>
                </div>
            `;
        });

        resultsContainer.innerHTML = html;
    }
}



});