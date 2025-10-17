-- Création de la table 'ecuries'
CREATE TABLE `ecuries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom_ecurie` varchar(255) NOT NULL,
  `couleur_equipe` varchar(7) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insertion des données dans 'ecuries'
INSERT INTO `ecuries` (`id`, `nom_ecurie`, `couleur_equipe`) VALUES
(1, 'Oracle Red Bull Racing', '#3671C6'),
(2, 'Scuderia Ferrari', '#E10600'),
(3, 'Mercedes-AMG Petronas', '#6CD3BF');

-- Création de la table 'pilotes'
CREATE TABLE `pilotes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom_complet` varchar(255) NOT NULL,
  `nationalite` varchar(255) NOT NULL,
  `numero_permanent` int(11) NOT NULL,
  `championnats_monde` int(11) NOT NULL,
  `victoires` int(11) NOT NULL,
  `podiums` int(11) NOT NULL,
  `poles` int(11) NOT NULL,
  `meilleurs_tours` int(11) NOT NULL,
  `id_ecurie_actuelle` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_ecurie_actuelle` (`id_ecurie_actuelle`),
  CONSTRAINT `pilotes_ibfk_1` FOREIGN KEY (`id_ecurie_actuelle`) REFERENCES `ecuries` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insertion des données dans 'pilotes'
INSERT INTO `pilotes` (`id`, `nom_complet`, `nationalite`, `numero_permanent`, `championnats_monde`, `victoires`, `podiums`, `poles`, `meilleurs_tours`, `id_ecurie_actuelle`) VALUES
(1, 'Max Verstappen', 'Pays-Bas', 33, 3, 54, 98, 32, 30, 1),
(2, 'Lewis Hamilton', 'Royaume-Uni', 44, 7, 103, 197, 104, 65, 3),
(3, 'Charles Leclerc', 'Monaco', 16, 0, 5, 30, 23, 7, 2),
(4, 'Sergio Pérez', 'Mexique', 11, 0, 6, 35, 3, 11, 1);