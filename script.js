let personnagesData = [];
let personnagesFiltrés = [];

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    personnagesData = data.personnages;
    personnagesFiltrés = personnagesData; // Initialement, tous les personnages sont affichés
    afficherPersonnages(personnagesFiltrés);
  })
  .catch(error => console.error('Erreur lors du chargement du fichier JSON:', error));

// Fonction pour afficher les personnages
const afficherPersonnages = (personnages) => {
  const personnagesDiv = document.getElementById('personnages-list');
  personnagesDiv.innerHTML = ''; // Effacer la liste actuelle

  personnages.forEach(personnage => {
    const div = document.createElement('div');
    div.classList.add('personnage');
    div.innerHTML = `
      <h2>${personnage.nom}</h2>
      <p>Age: ${personnage.age}</p>
      <p>Profession: ${personnage.profession.join(', ')}</p>
      <p>Origine: ${personnage.origine.join(', ')}</p>
      <p>${personnage.description}</p>
      <img src="${personnage.image}" alt="${personnage.nom}">
    `;
    personnagesDiv.appendChild(div);
  });
};

// Fonction pour filtrer par âge
document.getElementById('filter-age').addEventListener('change', () => {
  const selectedAge = document.getElementById('filter-age').value;
  let filteredByAge = personnagesData;

  if (selectedAge === "20-30") {
    filteredByAge = personnagesData.filter(p => p.age >= 20 && p.age <= 30);
  } else if (selectedAge === "30-40") {
    filteredByAge = personnagesData.filter(p => p.age >= 30 && p.age <= 40);
  }

  personnagesFiltrés = filteredByAge;
  afficherPersonnages(personnagesFiltrés);
});

// Fonction pour filtrer par profession
document.getElementById('filter-profession').addEventListener('change', () => {
  const selectedProfession = document.getElementById('filter-profession').value;
  let filteredByProfession = personnagesData;

  if (selectedProfession !== "all") {
    filteredByProfession = personnagesData.filter(p => p.profession.includes(selectedProfession));
  }

  personnagesFiltrés = filteredByProfession;
  afficherPersonnages(personnagesFiltrés);
});

// Fonction pour filtrer par origine
document.getElementById('filter-origine').addEventListener('change', () => {
  const selectedOrigine = document.getElementById('filter-origine').value;
  let filteredByOrigine = personnagesData;

  if (selectedOrigine !== "all") {
    filteredByOrigine = personnagesData.filter(p => p.origine.includes(selectedOrigine));
  }

  personnagesFiltrés = filteredByOrigine;
  afficherPersonnages(personnagesFiltrés);
});

// Fonction pour trier par ordre alphabétique
document.getElementById('sort-alpha').addEventListener('click', () => {
  personnagesFiltrés.sort((a, b) => a.nom.localeCompare(b.nom));
  afficherPersonnages(personnagesFiltrés);
});
