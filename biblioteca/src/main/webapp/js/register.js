document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.getElementById('formularioRegistro');
    const nombreInput = document.getElementById('exampleFirstName');
    const apellidoInput = document.getElementById('exampleLastName');
    const emailInput = document.getElementById('exampleInputEmail');
    const passwordInput = document.getElementById('exampleInputPassword');
    const repeatPasswordInput = document.getElementById('exampleRepeatPassword');
    const errorMessage = document.getElementById('error-message');

    formulario.addEventListener('submit', function (event) {
        event.preventDefault(); // Siempre detener el envío del formulario
    
        let mensajeError = '';
    
        // Validación de solo letras en nombre y apellido
        const soloLetrasRegex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;
    
        if (!soloLetrasRegex.test(nombreInput.value)) {
            mensajeError += 'El nombre solo debe contener letras.\n';
        }
    
        if (!soloLetrasRegex.test(apellidoInput.value)) {
            mensajeError += 'El apellido solo debe contener letras.\n';
        }
    
        // Validación de formato de correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        if (!emailRegex.test(emailInput.value)) {
            mensajeError += 'El correo electrónico no es válido.\n';
        }
    
        // Validación de la contraseña
        const password = passwordInput.value;
        const regexPassword = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    
        if (!regexPassword.test(password)) {
            mensajeError += 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número.\n';
        }
    
        // Verificar que ambas contraseñas coincidan
        if (password !== repeatPasswordInput.value) {
            mensajeError += 'Las contraseñas no coinciden.\n';
        }
    
        // Mostrar mensaje de error si hay alguna validación fallida
        if (mensajeError) {
            errorMessage.textContent = mensajeError; // Mostrar los errores
        } else {
            // Si no hay errores, guardar los datos del usuario en localStorage
            const usuario = {
                nombre: nombreInput.value,
                apellido: apellidoInput.value,
                email: emailInput.value,
                password: password
            };
    
            localStorage.setItem('usuario', JSON.stringify(usuario)); // Guardar en localStorage
    
            // Redirigir a la página login.html manualmente
            window.location.href = 'login.html'; 
        }
    });
    
});
