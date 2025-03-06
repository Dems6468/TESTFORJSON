// Fetch character data from the external JSON file
function fetchCharacterData() {
    fetch('data.json') // The path to your JSON file
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Log the data to check its structure
            console.log("Character Data:", data);

            // After loading the data, display the characters
            displayCharacters(data);
        })
        .catch(error => {
            console.error("Error loading the JSON data:", error);
        });
}

function createCharacterCard(character) {
    const card = document.createElement('div');
    card.classList.add('card');

    // Log the character to see what data is available
    console.log("Character:", character);

    const cardImage = document.createElement('img');
    cardImage.src = character["Emplacements Photos"] || "https://via.placeholder.com/150"; // Default image if none is provided
    cardImage.alt = character["Champion Name"];
    card.appendChild(cardImage);

    const cardTitle = document.createElement('h3');
    cardTitle.textContent = character["Champion Name"];
    card.appendChild(cardTitle);

    const cardClass = document.createElement('p');
    cardClass.textContent = `Class: ${character.Class}`;
    card.appendChild(cardClass);

    const cardImmunities = document.createElement('p');
    cardImmunities.textContent = `Immunities: ${Object.keys(character.Immunities).join(", ")}`;
    card.appendChild(cardImmunities);

    return card;
}

function displayCharacters(characters) {
    const container = document.getElementById('cards-container');
    container.innerHTML = '';  // Clear any existing content

    characters.forEach(character => {
        const card = createCharacterCard(character);
        container.appendChild(card);
    });
}

// Call the function to fetch and display characters when the page loads
window.onload = fetchCharacterData;
