// script.js

// Chemin du fichier JSON local
const urlJson = 'data.json';

// Fonction pour récupérer les personnages depuis le fichier JSON local et les afficher dans la grille
async function afficherPersonnages() {
    try {
        // Récupère le fichier JSON local
        const response = await fetch(urlJson);
        const personnages = await response.json();  // Parse le JSON
        
        const gridContainer = document.getElementById('grid-container');
        
        // Afficher chaque personnage dans une carte
        personnages.forEach(personnage => {
            const card = document.createElement('div');
            card.classList.add('card');

            card.innerHTML = `
                <img src="${personnage.photo}" alt="${personnage.Nom}">
                <h3>${personnage.Nom}</h3>
                <p><strong>Classe:</strong> ${personnage.Classe}</p>
                <p><strong>Immunité:</strong> ${Object.keys(personnage.immunite).join(', ')}</p>
            `;
            
            gridContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des personnages:', error);
    }
}

// Appeler la fonction pour afficher les personnages
afficherPersonnages();
