document.addEventListener('DOMContentLoaded', function() {
    const successPopup = document.getElementById('success-popup');
    const changePasswordForm = document.querySelector('.change-password-form');

    successPopup.style.display = 'none';

    
    changePasswordForm.addEventListener('submit', function(e) {
        e.preventDefault(); 
        successPopup.style.display = 'block';
    });
});



