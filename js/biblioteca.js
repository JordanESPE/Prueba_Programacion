// Datos iniciales
var libros = [
    { id: 1, titulo: "Cien Años de Soledad", autor: "Gabriel García Márquez", genero: "Novela", disponible: true },
    { id: 2, titulo: "Don Quijote de la Mancha", autor: "Miguel de Cervantes", genero: "Clásico", disponible: true },
    { id: 3, titulo: "El Principito", autor: "Antoine de Saint-Exupéry", genero: "Infantil", disponible: true }
];

var librosPrestados = [];
var busquedaActual = '';

// Mostrar libros disponibles y prestados
function mostrarLibros(lista) {
    var listaDisponibles = document.getElementById("librosDisponibles");
    var listaPrestados = document.getElementById("librosPrestados");
    
    listaDisponibles.innerHTML = "<h3>Libros Disponibles</h3>";
    listaPrestados.innerHTML = "<h3>Libros Prestados</h3>";

    // Filtrar y mostrar disponibles
    lista.filter(libro => libro.disponible).forEach(libro => {
        listaDisponibles.innerHTML += 
            `<div class="libro disponible">${libro.titulo} - ${libro.autor}<button onclick="prestarLibro(${libro.id})">Prestar</button></div>`;
    });

    // Mapear y mostrar prestados
    librosPrestados.map(libroPrestado => {
        listaPrestados.innerHTML += 
            `<div class="libro prestado">${libroPrestado.titulo} - ${libroPrestado.autor}<button onclick="devolverLibro(${libroPrestado.id})">Devolver</button></div>`;
    });
}

// Buscar libros por título
function buscarLibros() {
    var termino = document.getElementById('busqueda').value.toLowerCase();
    busquedaActual = termino;
    mostrarLibros(libros.filter(libro => libro.titulo.toLowerCase().includes(termino)));
}

// Mostrar todos los libros
function mostrarTodos() {
    busquedaActual = '';
    mostrarLibros(libros);
}

// Prestar un libro
function prestarLibro(id) {
    var libro = libros.find(libro => libro.id === id && libro.disponible);
    if (libro) {
        libro.disponible = false;
        librosPrestados.push(libro);
        alert(`Libro prestado: ${libro.titulo}`);
        setTimeout(() => alert(`Recordatorio: ¡Debes devolver "${libro.titulo}"!`), 5000);
        busquedaActual ? buscarLibros() : mostrarLibros(libros);
    } else {
        alert("El libro no está disponible");
    }
}

// Devolver un libro
function devolverLibro(id) {
    var index = librosPrestados.findIndex(libro => libro.id === id);
    if (index !== -1) {
        var libro = librosPrestados[index];
        libro.disponible = true;
        librosPrestados.splice(index, 1);
        alert(`Libro devuelto: ${libro.titulo}`);
        busquedaActual ? buscarLibros() : mostrarLibros(libros);
    } else {
        alert("Libro no encontrado en préstamos");
    }
}

// Contar libros disponibles
function contarLibrosDisponibles() {
    var totalDisponibles = libros.reduce((contador, libro) => libro.disponible ? contador + 1 : contador, 0);
    console.log(`Total de libros disponibles: ${totalDisponibles}`);
}

// Agregar libro al inicio
function agregarLibroAlInicio(libro) {
    libros.unshift(libro);
    mostrarLibros(libros);
}

// Eliminar primer libro
function eliminarPrimerLibro() {
    var libroEliminado = libros.shift();
    if (libroEliminado) {
        alert(`Libro eliminado: ${libroEliminado.titulo}`);
        mostrarLibros(libros);
    } else {
        alert("No hay libros para eliminar");
    }
}

// Eliminar último libro
function eliminarUltimoLibro() {
    var libroEliminado = libros.pop();
    if (libroEliminado) {
        alert(`Libro eliminado: ${libroEliminado.titulo}`);
        mostrarLibros(libros);
    } else {
        alert("No hay libros para eliminar");
    }
}

// Mostrar libros al cargar la página
mostrarLibros(libros);