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
                data.pet.forEach(pet => {
                    const card = document.createElement('div');
                    card.classList.add('card'); // Add the 'card' class for styling
                    
                    if (pet.petpic) {
                        const blobURL = URL.createObjectURL(pet.petpic);

                        // Create an image element
                        const img = new Image();

                        // Set the source of the image to the blob URL
                        img.src = blobURL;

                        // Add the image to the DOM or perform other actions as needed
                        card.appendChild(img);

                        // Don't forget to revoke the object URL when you're done to prevent memory leaks
                        URL.revokeObjectURL(blobURL);   
                    }
                    /*
                    card.innerHTML = `
                        <h2>${pet.petname}</h2>
                        <p><strong>Date:</strong> ${pet.date}</p>
                        <p><strong>Species:</strong> ${pet.species}</p>
                        <p><strong>Breed:</strong> ${pet.breed}</p>
                        <p><strong>Gender:</strong> ${pet.gender}</p>
                        <p><strong>Size:</strong> ${pet.size}</p>
                        <p><strong>Name:</strong> ${pet.name}</p>
                        <p><strong>Age:</strong> ${pet.age}</p>
                        <p><strong>Address:</strong> ${pet.address}</p>
                        <p><strong>Email:</strong> ${pet.email}</p>
                        <p><strong>No.:</strong> ${img.src}</p>
                    `;
                    
                   /*
                       // Create an <img> element for the pet picture
                    if (pet.petpic) {
                        const petPic = document.createElement('img');
                        petPic.src = `data:image/png;base64, ${pet.petpic.toString('base64')}`; // Use "image/jpeg" for JPG images
    
                        // Append the pet picture to the car
                    }*/
                    
                    
    
                    petCardContainer.appendChild(card);
                
            })
        })
        .catch(error => {
            console.error('Error:', error);
        });
        
    }
