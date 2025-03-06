fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const personnagesList = document.getElementById('personnages-list');

    // Pour chaque personnage, créer une carte
    data.forEach(personnage => {
        // Créer l'élément de carte
        const card = document.createElement('div');
        card.classList.add('personnage-card');

        // Ajouter l'image du personnage
        const imageDiv = document.createElement('div');
        imageDiv.classList.add('personnage-image');
        const image = document.createElement('img');
        image.src = personnage.photo; // Assurez-vous que les images sont dans le bon dossier
        image.alt = personnage.Nom;
        imageDiv.appendChild(image);

        // Ajouter les infos du personnage
        const infoDiv = document.createElement('div');
        infoDiv.classList.add('personnage-info');
        const name = document.createElement('h3');
        name.textContent = personnage.NomCourt || personnage.Nom;
        infoDiv.appendChild(name);

        const classe = document.createElement('p');
        classe.textContent = `Classe: ${personnage.Classe}`;
        infoDiv.appendChild(classe);

        // Afficher les immunités
        if (personnage.immunite) {
            const immunitesDiv = document.createElement('div');
            immunitesDiv.classList.add('immunites');

            // Parcourir les immunités
            for (const [immunite, details] of Object.entries(personnage.immunite)) {
                // Créer un élément pour chaque immunité
                const immuniteElement = document.createElement('p');
                immuniteElement.textContent = immunite; // Affiche juste le nom de l'immunité (ex: "Poison")

                // Créer un élément pour afficher les détails sous forme de tooltip (initialement caché)
                const detailsTooltip = document.createElement('div');
                detailsTooltip.classList.add('details-tooltip');
                detailsTooltip.style.display = 'none'; // On cache les détails par défaut

                // Si l'immunité a des détails (une valeur spécifique)
                if (details.length > 0) {
                    // Ajouter les détails à afficher dans le tooltip
                    detailsTooltip.textContent = details.join(", ");
                    immuniteElement.appendChild(detailsTooltip);

                    // Ajouter un événement de clic pour afficher/masquer les détails
                    immuniteElement.addEventListener('click', (event) => {
                        // On ferme tous les tooltips ouverts
                        const allTooltips = document.querySelectorAll('.details-tooltip');
                        allTooltips.forEach(tooltip => {
                            if (tooltip !== detailsTooltip) {
                                tooltip.style.display = 'none';
                            }
                        });

                        // Toggle l'affichage du tooltip de l'immunité cliquée
                        if (detailsTooltip.style.display === 'none') {
                            detailsTooltip.style.display = 'block';
                        } else {
                            detailsTooltip.style.display = 'none';
                        }

                        // Empêcher la propagation du clic pour ne pas fermer les détails immédiatement
                        event.stopPropagation();
                    });
                } else {
                    // Si l'immunité n'a pas de détail spécifique, afficher "Aucun détail"
                    const noDetails = document.createElement('span');
                    noDetails.textContent = " : Aucun détail";
                    immuniteElement.appendChild(noDetails);
                }

                immunitesDiv.appendChild(immuniteElement);
            }

            infoDiv.appendChild(immunitesDiv);
        }

        // Ajouter la carte à la liste
        card.appendChild(imageDiv);
        card.appendChild(infoDiv);
        personnagesList.appendChild(card);
    });
})
  .catch(error => console.error('Erreur de chargement des données:', error));

// Fermer les tooltips quand on clique ailleurs
document.addEventListener('click', () => {
    const allTooltips = document.querySelectorAll('.details-tooltip');
    allTooltips.forEach(tooltip => {
        tooltip.style.display = 'none';
    });
});
