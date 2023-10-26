document.getElementById('searchBtn').addEventListener('click', handleSubmit);

async function handleSubmit(event) {
    event.preventDefault();
    var species = document.getElementById('species').value;
    var gender = document.getElementById('gender').value;
    var size = document.getElementById('size').value;
    var breed = document.getElementById('breed').value;

            // Create data object to send to the backend
    var searchData = {
        species: species,
        gender: gender,
        size: size,
        breed: breed
    };
            fetch('/display', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(searchData)
            })
            .then(response => response.json())
            .then(data => {
                const petCardContainer = document.getElementById('petCardContainer');
                petCardContainer.innerHTML = '';
                data.pet.forEach(pet => {

                    const card = document.createElement('div');
                    card.classList.add('card'); // Add the 'card' class for styling
                    
                    
                    card.innerHTML = `
                        <h2>${pet.petname}</h2>
                        <p><strong>Species:</strong> ${pet.species}</p>
                        <p><strong>Breed:</strong> ${pet.breed}</p>
                        <p><strong>Gender:</strong> ${pet.gender}</p>
                        <p><strong>Size:</strong> ${pet.size}</p>
                        <p><button onclick="Dothis('${pet.email}')"">Select Pet</button></p>
                    `;
                    if (pet.petpic) {
                        const petPic = document.createElement('img');
                        petPic.src = `data:image/png;base64, ${pet.petpic.toString('base64')}`; // Use "image/jpeg" for JPG images

                        // Append the pet picture to the card
                        card.appendChild(petPic);
                    }
                    petCardContainer.appendChild(card);
                })
            });
        
}    


function Dothis(x){
    fetch('/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: x})
    })
    .then(response => response.json())
    .then(data => {

        console.log(data)

    })
}
        


   