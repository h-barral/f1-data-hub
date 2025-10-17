const drivers = [
    {
        number: 1,
        name: "Max Verstappen",
        team: "Oracle Red Bull Racing",
        image: "./images/verstappen.jpg",
        flag: "./images/flags/netherlands.png",
        teamColor: "#3671C6"
    },
    {
        number: 11,
        name: "Sergio Pérez",
        team: "Oracle Red Bull Racing",
        image: "./images/perez.png",
        flag: "./images/flags/mexico.png",
        teamColor: "#3671C6"
    },
    {
        number: 44,
        name: "Lewis Hamilton",
        team: "Scuderia Ferrari",
        image: "./images/hamilton.jpg",
        flag: "./images/flags/united-kingdom.png",
        teamColor: "#E10600"
    },
    {
        number: 16,
        name: "Charles Leclerc",
        team: "Scuderia Ferrari",
        image: "./images/leclerc.png",
        flag: "./images/flags/monaco.png",
        teamColor: "#E10600"
    }
    // ... Ajoutez les autres pilotes ici
];


const raceSchedule = [
    {
        round: 1,
        date: "02 Mars",
        name: "Grand Prix de Bahreïn",
        circuit: "Bahrain International Circuit",
        flag: "./images/flags/bahrain.png",
        status: "Terminé"
    },
    {
        round: 2,
        date: "09 Mars",
        name: "Grand Prix d'Arabie Saoudite",
        circuit: "Jeddah Corniche Circuit",
        flag: "./images/flags/saudi-arabia.png",
        status: "Terminé"
    },
    {
        round: 3,
        date: "23 Mars",
        name: "Grand Prix d'Australie",
        circuit: "Albert Park Circuit",
        flag: "./images/flags/australia.png",
        status: "À venir"
    }
    // ... Ajoutez les autres courses ici
];


// ... vos tableaux 'drivers' et 'raceSchedule' sont ici ...

const driverStandings = [
    { pos: 1, driver: "Max Verstappen", team: "Red Bull Racing", points: 575, teamColor: "#3671C6" },
    { pos: 2, driver: "Sergio Pérez", team: "Red Bull Racing", points: 285, teamColor: "#3671C6" },
    { pos: 3, driver: "Lewis Hamilton", team: "Mercedes-AMG Petronas", points: 234, teamColor: "#6CD3BF" },
    { pos: 4, driver: "Charles Leclerc", team: "Scuderia Ferrari", points: 206, teamColor: "#E10600" }
    // ... Ajoutez les autres pilotes ici
];

const constructorStandings = [
    { pos: 1, team: "Red Bull Racing", points: 860, teamColor: "#3671C6" },
    { pos: 2, team: "Mercedes-AMG Petronas", points: 409, teamColor: "#6CD3BF" },
    { pos: 3, team: "Scuderia Ferrari", points: 406, teamColor: "#E10600" }
    // ... Ajoutez les autres écuries ici
];