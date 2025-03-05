fetch('data.json')
    .then(response => response.json())  // Convertir la réponse en JSON
    .then(data => {
        const utilisateurs = data.utilisateurs;
        const utilisateursDiv = document.getElementById('utilisateurs-list');
        
        utilisateurs.forEach(utilisateur => {
            const div = document.createElement('div');
            div.classList.add('utilisateur');
            div.innerHTML = `<strong>${utilisateur.nom}</strong> - Age: ${utilisateur.age}`;
            utilisateursDiv.appendChild(div);
        });
    })
    .catch(error => console.error('Erreur lors du chargement du fichier JSON:', error));
