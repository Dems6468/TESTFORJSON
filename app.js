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
                immuniteElement.textContent = immunite;

                // Ajouter un événement au clic pour afficher les détails
                immuniteElement.addEventListener('click', () => {
                    // Créer un paragraphe pour afficher les détails (par exemple "100% Resistance")
                    const detailsElement = document.createElement('span');
                    detailsElement.textContent = `: ${details.join(", ")}`;
                    immuniteElement.appendChild(detailsElement);
                    immuniteElement.style.color = 'blue'; // Change la couleur pour signaler que c'est cliquable
                });

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
