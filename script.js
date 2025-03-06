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
                card.setAttribute('data-name', character.name);
                card.setAttribute('data-class', character.class);
                card.setAttribute('data-immunities', JSON.stringify(character.immunities));
                card.setAttribute('data-photo', character.photo);

                card.innerHTML = `
                    <img src="${character.photo}" alt="${character.name}" class="photo">
                    <div class="info">
                        <h3>${character.name}</h3>
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
        document.getElementById('modal-name').textContent = character.name;
        document.getElementById('modal-class').textContent = character.class;
        document.getElementById('modal-immunities').textContent = JSON.stringify(character.immunities, null, 2);
        document.getElementById('modal-photo').src = character.photo;
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
