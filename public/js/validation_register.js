document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('loginFormRegister');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();
        if (validateForm()) {
            try {
                const nombre = document.getElementById('name').value;
                const apellido = document.getElementById('lastname').value;
                const correo = document.getElementById('email').value;
                const contrasena = document.getElementById('password').value;
                const fechaNacimiento = document.getElementById('birthdate').value;

                const res = await fetch('https://tourtales.3.us-1.fl0.io/api/authenticator/registro/usuarioTurista', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        Nombre: nombre,
                        Apellido: apellido, 
                        Correo: correo,
                        Contrasena: contrasena,
                        Fecha_Nacimiento: fechaNacimiento
                    })
                });
                
                const resultado = await res.json();

                if (resultado.redirect) {
                    handleSuccessfulAccountCreation(resultado.redirect);
                } else {
                    showAlert(resultado.message, 'error');
                }
            } catch (error) {
                showAlert(error, 'error');
            }
        }
    });

    function validateForm() {
        // Obtener los valores de los campos
        const name = document.getElementById('name');
        const lastname = document.getElementById('lastname');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const passwordRE = document.getElementById('passwordRE');
        const birthdate = document.getElementById('birthdate');
        const today = new Date();
        const birthdateValue = new Date(birthdate.value);
        const age = today.getFullYear() - birthdateValue.getFullYear();

        if(name.value.trim() === ''){
            showAlert('El nombre no ha sido llenado', 'error');
            highlightInvalidField(name);
            return false;
        } else {
            removeHighlight(name);
        }

        if(lastname.value.trim() === ''){
            showAlert('El apellido no ha sido llenado', 'error');
            highlightInvalidField(lastname);
            return false;
        } else {
            removeHighlight(lastname);
        }

        if(email.value.trim() === ''){
            showAlert('El correo electrónico no ha sido llenado', 'error');
            highlightInvalidField(email);
            return false;
        } else {
            removeHighlight(email);
        }

        if(!isValidEmail(email.value.trim())){
            showAlert('Correo electrónico mal formado', 'error');
            highlightInvalidField(email);
            return false;
        } else {
            removeHighlight(email);
        }

        if(password.value === ''){
            showAlert('La contraseña no ha sido llenada', 'error');
            highlightInvalidField(password);
            return false;
        } else {
            removeHighlight(password);
        }

        if(passwordRE.value === ''){
            showAlert('Confirma tu contraseña', 'error');
            highlightInvalidField(passwordRE);
            return false;
        } else {
            removeHighlight(passwordRE);
        }

        if (password.value !== passwordRE.value) {
            showAlert('Contraseñas no coinciden', 'error');
            highlightInvalidField(password);
            highlightInvalidField(passwordRE);
            return false;
        }

        if (birthdate.value.trim() === '') {
            showAlert('La fecha de nacimiento no ha sido llenada', 'error');
            highlightInvalidField(birthdate);
            return false;
        } else {
            removeHighlight(birthdate);
        }

        if (age < 18) {
            showAlert('Debes ser mayor de 18 años para registrarte', 'error');
            highlightInvalidField(birthdate);
            return false;
        } else {
            removeHighlight(birthdate);
        }

        return true;
    }

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    function showAlert(message, icon) {
        Swal.fire({
            icon: icon,
            title: icon.charAt(0).toUpperCase() + icon.slice(1),
            text: message,
        });
    }

    function highlightInvalidField(field) {
        field.style.borderColor = 'red';
    }

    function removeHighlight(field) {
        field.style.borderColor = ''; // Reset to default
    }

    function handleSuccessfulAccountCreation(redirectUrl) {
        Swal.fire({
            icon: 'success',
            title: 'Felicidades, cuenta creada!',
            text: 'Se ha enviado un correo de verificación a tu dirección de email. Por favor, revisa tu bandeja de entrada.',
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = redirectUrl;
            }
        });
    }
});
