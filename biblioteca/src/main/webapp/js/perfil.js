document.addEventListener('DOMContentLoaded', () => {
    // Cargar los datos del usuario desde localStorage
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario) {
        document.getElementById('nombreInput').value = usuario.nombre;
        document.getElementById('apellidoInput').value = usuario.apellido;
        document.getElementById('emailInput').value = usuario.email;
        // Puedes dejar la contraseña en blanco o permitir que se ingrese
    }

    // Manejar la actualización de los datos
    const formularioPerfil = document.getElementById('formularioPerfil');
    formularioPerfil.addEventListener('submit', (event) => {
        event.preventDefault(); // Evitar el envío del formulario

        // Recuperar los nuevos valores
        const nombre = document.getElementById('nombreInput').value;
        const apellido = document.getElementById('apellidoInput').value;
        const email = document.getElementById('emailInput').value;
        const password = document.getElementById('passwordInput').value; // Si se quiere cambiar

        // Guardar los datos actualizados en localStorage
        const updatedUsuario = {
            nombre: nombre,
            apellido: apellido,
            email: email,
            password: password // Guardar la nueva contraseña, si se cambia
        };

        localStorage.setItem('usuario', JSON.stringify(updatedUsuario)); // Actualizar en localStorage

        alert('Datos actualizados correctamente.');
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Obtener los datos del usuario del localStorage
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    
    // Obtener los elementos del DOM
    const userNameElement = document.getElementById('user-name');
    const loginButton = document.getElementById('login-btn');
    
    if (usuario && usuario.nombre) {
        // Si el usuario está registrado, mostrar su nombre
        userNameElement.textContent = `Bienvenido, ${usuario.nombre}`;
        loginButton.style.display = 'none'; // Ocultar el botón de iniciar sesión
    } else {
        // Si no hay datos, mostrar el botón de iniciar sesión
        userNameElement.textContent = '';
        loginButton.style.display = 'inline'; // Mostrar el botón de iniciar sesión
        loginButton.addEventListener('click', function() {
            // Redirigir al usuario a la página de inicio de sesión
            window.location.href = 'login.html';
        });
    }
});
