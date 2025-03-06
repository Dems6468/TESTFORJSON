document.addEventListener('DOMContentLoaded', function () {
    // Charger les données JSON
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('characters-container');

            // Générer les cartes pour chaque personnage
            data.forEach(character => {
                const card = document.createElement('div');
                card.classList.add('card');
                card.setAttribute('data-name', character['Champion Name']);  // Accès avec la clé correcte
                card.setAttribute('data-class', character['Class']);  // Utilisation de la clé "Class"
                card.setAttribute('data-immunities', JSON.stringify(character['Immunities']));  // Utilisation de "Immunities"
                card.setAttribute('data-photo', character['Photos'][0]);  // Utilisation de "Photos", ici on prend la première photo

                card.innerHTML = `
                    <img src="${character['Photos'][0]}" alt="${character['Champion Name']}" class="photo">
                    <div class="info">
                        <h3>${character['Champion Name']}</h3>
                        <div class="class" style="background-color: #8e44ad;">${character['Class']}</div>
                    </div>
                `;

                // Ajouter l'événement de clic pour ouvrir le modal
                card.addEventListener('click', function () {
                    openModal(character);
                });

                container.appendChild(card);
            });
        })
        .catch(error => console.error('Erreur lors du chargement du JSON:', error));

    // Modal
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close-btn');

    function openModal(character) {
        document.getElementById('modal-name').textContent = character['Champion Name'];
        document.getElementById('modal-class').textContent = character['Class'];
        document.getElementById('modal-immunities').textContent = JSON.stringify(character['Immunities'], null, 2);
        document.getElementById('modal-photo').src = character['Photos'][0];  // Affichage de la photo dans le modal
        modal.style.display = 'block';
    }

    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
