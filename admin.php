<?php
// Vérifier que l'utilisateur est un administrateur
session_start();
if (!isset($_SESSION['is_admin']) || $_SESSION['is_admin'] !== true) {
    die("Accès non autorisé. Vous devez être administrateur pour voir cette page.");
}

// Lire le contenu du fichier feedback.txt
$feedback_file = "feedback.txt";
if (file_exists($feedback_file)) {
    $feedbacks = file_get_contents($feedback_file);
} else {
    $feedbacks = "Aucun feedback disponible.";
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Admin - Feedbacks</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f9;
        }
        .container {
            width: 80%;
            margin: 0 auto;
            padding: 20px;
        }
        h1 {
            text-align: center;
            color: #333;
        }
        .feedback-container {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            margin-bottom: 20px;
            white-space: pre-wrap; /* Permet de conserver les sauts de ligne dans le texte */
        }
        .feedback-container h2 {
            color: #333;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Page Admin - Feedbacks des Utilisateurs</h1>

        <div class="feedback-container">
            <h2>Feedbacks reçus :</h2>
            <pre><?php echo $feedbacks; ?></pre>
        </div>
    </div>
</body>
</html>
