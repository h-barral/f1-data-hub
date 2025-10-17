<?php
// Configuration de la base de données
$servername = "localhost";
$username = "root"; // Utilisateur par défaut de XAMPP
$password = ""; // Mot de passe par défaut de XAMPP
$dbname = "f1_data_hub";

// Créer la connexion
$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Requête SQL pour récupérer tous les pilotes
$sql = "SELECT * FROM pilotes";
$result = $conn->query($sql);

$pilotes = array();

if ($result->num_rows > 0) {
  // Stocker les données de chaque ligne dans un tableau
  while($row = $result->fetch_assoc()) {
    $pilotes[] = $row;
  }
}

// Fermer la connexion
$conn->close();

// Renvoyer les données au format JSON
header('Content-Type: application/json');
echo json_encode($pilotes);
?>