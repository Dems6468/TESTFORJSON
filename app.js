// Charger les données JSON (ici on suppose qu'elles sont dans un fichier "data.json")
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

        // Ajouter les immunités
        if (personnage.immunite) {
            const immunites = document.createElement('p');
            immunites.textContent = `Immunités: ${JSON.stringify(personnage.immunite)}`;
            infoDiv.appendChild(immunites);
        }

        // Ajouter la carte à la liste
        card.appendChild(imageDiv);
        card.appendChild(infoDiv);
        personnagesList.appendChild(card);
    });
})
  .catch(error => console.error('Erreur de chargement des données:', error));
