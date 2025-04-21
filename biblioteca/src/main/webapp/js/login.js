document.addEventListener('DOMContentLoaded', function () {
    const formularioLogin = document.getElementById('formularioLogin');
    const emailInput = document.getElementById('exampleInputEmail');
    const passwordInput = document.getElementById('exampleInputPassword');
    const errorMessage = document.createElement('p');
    
    errorMessage.style.color = 'red';
    formularioLogin.appendChild(errorMessage);

    formularioLogin.addEventListener('submit', function (event) {
        event.preventDefault(); // Evitar el envío del formulario

        const emailIngresado = emailInput.value;
        const passwordIngresada = passwordInput.value;

        // Obtener los datos del usuario registrado desde localStorage
        const usuarioGuardado = JSON.parse(localStorage.getItem('usuario'));

        // Validar si el usuario está registrado y las credenciales coinciden
        if (usuarioGuardado && usuarioGuardado.email === emailIngresado && usuarioGuardado.password === passwordIngresada) {
            // Redirigir al índice o página principal
            window.location.href = 'index.html';
        } else {
            // Mostrar mensaje de error si las credenciales no coinciden
            errorMessage.textContent = 'Correo o contraseña incorrectos.';
        }
    });
});
