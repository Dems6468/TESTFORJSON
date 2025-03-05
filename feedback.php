<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $feedback = $_POST['feedback'];
    
    // Sauvegarde du feedback dans un fichier
    $file = fopen("feedback.txt", "a");
    fwrite($file, "Feedback: " . $feedback . "\n\n");
    fclose($file);

    echo "Merci pour votre retour !";
}
?>
