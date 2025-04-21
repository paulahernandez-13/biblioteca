// Verificar disponibilidad y habilitar o deshabilitar botones
function verificarDisponibilidad() {
    const filas = document.querySelectorAll('#datatable tbody tr');
    filas.forEach((fila, tables) => {
      const disponibilidad = fila.querySelector('td:nth-child(4)').innerText;
      const btnSolicitar = fila.querySelector('button');
      if (disponibilidad === 'Disponible') {
        btnSolicitar.disabled = false; // Habilita el botón
      }
    });
  }
  
  // Solicitar libro y almacenarlo en localStorage
  function solicitarLibro(event) {
    const boton = event.target;
    const fila = boton.closest('tr');
    const titulo = fila.querySelector('td:nth-child(1)').innerText; // Primera columna es el título
    const autor = fila.querySelector('td:nth-child(2)').innerText;  // Segunda columna es el autor
    const año = fila.querySelector('td:nth-child(3)').innerText;    // Tercera columna es el año

    // Cambiar la disponibilidad a "No disponible"
    fila.querySelector('td:nth-child(4)').innerText = 'No disponible'; // Cambia a la cuarta columna
    
    let librosSolicitados = JSON.parse(localStorage.getItem('librosSolicitados')) || [];
    librosSolicitados.push({ titulo, autor, año });
    localStorage.setItem('librosSolicitados', JSON.stringify(librosSolicitados));

    boton.disabled = true; // Deshabilitar el botón después de solicitar
  }
  
  // Cargar los libros solicitados desde localStorage en la otra página
  function cargarLibrosSolicitados() {
    const librosSolicitados = JSON.parse(localStorage.getItem('librosSolicitados')) || [];
    const tablaSolicitados = document.querySelector('#tabla-solicitados tbody');
    const nuevaFila = document.createElement('tr');

    // Obtener la fecha actual y calcular la fecha de devolución
    const fechaActual = new Date();
    const fechaDevolucion = new Date(fechaActual);
    fechaDevolucion.setDate(fechaActual.getDate() + 7); // Sumar 7 días
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    const fechaDevolucionFormateada = fechaDevolucion.toLocaleDateString('es-ES', opciones);


    librosSolicitados.forEach(libro => {
      const nuevaFila = document.createElement('tr');
      nuevaFila.innerHTML = `
        <td>${libro.titulo}</td>
        <td>${libro.autor}</td>
        <td>${libro.año}</td>
        <td>${fechaDevolucionFormateada}</td>
      `;
      tablaSolicitados.appendChild(nuevaFila);
    });
  }

  // Llamar a la función al cargar la página
document.addEventListener('DOMContentLoaded', cargarLibrosSolicitados);
  
  // Asignar eventos y funciones cuando la página cargue
  document.addEventListener('DOMContentLoaded', () => {
    verificarDisponibilidad(); // Inicializa verificación de botones en la página principal
    
    // Asignar eventos de clic a los botones "Solicitar"
    const botonesSolicitar = document.querySelectorAll('button[id^="btn-solicitar"]');
    botonesSolicitar.forEach(boton => {
      boton.addEventListener('click', solicitarLibro);
    });
  });

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.solicitar').forEach(function (boton) {
      boton.addEventListener('click', function () {
          const fila = this.closest('tr'); // Busca la fila correspondiente
          const titulo = fila.querySelector('.titulo-libro').textContent;
          const autor = fila.querySelector('.titulo-libro').getAttribute('data-autor');
          const año = fila.querySelector('.titulo-libro').getAttribute('data-año');

          // Llama a la función para agregar el libro solicitado
          agregarLibroSolicitado(titulo, autor, año);

          // Opcionalmente, puedes deshabilitar el botón después de solicitar
          this.disabled = true;
      });
  });
});


  document.addEventListener('DOMContentLoaded', () => {
    // Selecciona todos los títulos de los libros en la tabla
    const titulosLibros = document.querySelectorAll('.titulo-libro');
    
    // Añade un evento click a cada título
    titulosLibros.forEach(titulo => {
        titulo.addEventListener('click', () => {
            // Extrae los atributos data del título clickeado
            const tituloLibro = titulo.textContent;
            const resumenLibro = titulo.getAttribute('data-resumen');
            const autorLibro = titulo.getAttribute('data-autor');
            const añoLibro = titulo.getAttribute('data-año');
            
            // Muestra un modal SweetAlert con los detalles del libro
            swal({
                title: tituloLibro,
                text: `Autor: ${autorLibro}\nAño: ${añoLibro}\n\nResumen: ${resumenLibro}`,
                icon: "null",
                buttons: true,
            });
        });
    });
});

// Función para limpiar la tabla de solicitudes
function limpiarTablaSolicitados() {
  const tablaSolicitados = document.querySelector('#tabla-solicitados tbody');
  tablaSolicitados.innerHTML = ''; // Limpiar el contenido de la tabla
}

// Agregar un evento al botón de limpiar
document.getElementById('btn-limpiar').addEventListener('click', limpiarTablaSolicitados);

