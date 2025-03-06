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
                const immuniteElement = document.createElement('p');
                immuniteElement.textContent = immunite; // Affiche juste le nom de l'immunité (ex: "Poison")

                // Si l'immunité a des détails (une valeur spécifique)
                if (details.length > 0) {
                    // Créer un lien cliquable pour afficher les détails
                    const detailsElement = document.createElement('span');
                    detailsElement.style.color = 'blue';
                    detailsElement.style.cursor = 'pointer';
                    detailsElement.textContent = ` (${details.join(", ")})`; // Affiche les détails après le nom de l'immunité
                    immuniteElement.appendChild(detailsElement);

                    // Ajouter un événement de clic pour afficher plus d'informations si besoin
                    detailsElement.addEventListener('click', () => {
                        // Afficher les détails complets lorsque l'on clique
                        const fullDetails = document.createElement('span');
                        fullDetails.textContent = ` : ${details.join(", ")}`;
                        immuniteElement.appendChild(fullDetails);
                        immuniteElement.style.color = 'green'; // Change la couleur pour signaler que c'est cliquable
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
