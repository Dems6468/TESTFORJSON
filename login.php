<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Exemple basique : utilisateur et mot de passe statiques
    $correct_username = 'admin';
    $correct_password = '1234';

    if ($username == $correct_username && $password == $correct_password) {
        // Démarre une session et définit que l'utilisateur est admin
        session_start();
        $_SESSION['is_admin'] = true;
        header("Location: admin.php");  // Redirige vers la page admin
    } else {
        echo "Nom d'utilisateur ou mot de passe incorrect.";
    }
}
?>
