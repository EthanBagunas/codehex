// JavaScript to toggle visibility of donation instructions
const shelters = document.querySelectorAll('.shelter');

shelters.forEach((shelter) => {
    shelter.addEventListener('click', () => {
        shelter.querySelector('.hidden').classList.toggle('visible');
    });
});

