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
                card.setAttribute('data-name', character[ChampionName]);
                card.setAttribute('data-class', character.Class);
                card.setAttribute('data-immunities', JSON.stringify(character.Immunities));
                card.setAttribute('data-photo', character.Photos);

                card.innerHTML = `
                    <img src="${character.Photos}" alt="${character.name}" class="Photos">
                    <div class="info">
                        <h3>${character[ChampionName]}</h3>
                        <div class="class" style="background-color: #8e44ad;">${character.class}</div>
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
        document.getElementById('modal-name').textContent =character[ChampionName];
        document.getElementById('modal-class').textContent = character.Class;
        document.getElementById('modal-immunities').textContent = JSON.stringify(character.Immunities, null, 2);
        document.getElementById('modal-photo').src = character.Photos;
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
