const express = require("express");
const app = express();

// Recibiendo información
// Para acceder a los datos fácilmente, necesitamos la ayuda del json-parser de express, que se usa con el comando
app.use(express.json());

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true,
  },
  {
    id: 4,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true,
  },
];

const generateId = () => {
  //Necesitamos un id única para la nota. Primero, encontramos el número de id más grande en la lista actual y lo asignamos a la variable maxId
  // Aclarando --> notes.map(n => n.id) crea un nuevo array que contiene todos los ids de las notas. Math.max devuelve el valor máximo de los números que se le pasan. Sin embargo, notes.map(n => n.id) es un array, por lo que no se puede asignar directamente como parámetro a Math.max. El array se puede transformar en números individuales mediante el uso de la sintaxis de spread de los "tres puntos", ....
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;

  // este método no se recomienda, lo reemplazaremos pronto.
  return maxId + 1;
};

// controlador manejo de solicitudes POST
app.post("/api/notes", (request, response) => {
  // accedemos a los datos de la propiedad body del objeto de request
  const body = request.body;
  //console.log(note);
  //{content: 'Postman is a good tool for testing REST apis', important: true }

  // la propiedad content no puede estar vacía. Las propiedades important y date recibirán valores predeterminados
  if (!body.content) {
    return response.status(400).json({ error: "content missing" });
  }

  const note = {
    content: body.content,
    // Si falta la propiedad important, el valor predeterminado será false.
    important: body.important || false,
    date: new Date(),
    id: generateId(),
  };

  notes = notes.concat(note);

  response.json(note);
});

// creamos ruta para buscar un solo recurso;
// app.get('/api/notes/:id', ...)manejará todas las solicitudes HTTP GET, que tienen el formato /api/notes/SOMETHING, donde SOMETHING es un string arbitraria.
app.get("/api/notes/:id", (request, response) => {
  // accedemos al parámetro id en la ruta de una solicitud
  const id = Number(request.params.id);
  // estos console.log se observan en la consola en VSCode en mi caso y no es consola de navegador (pero si debemos refrescar el navegador); note.find terminaba siendo undefined, porque id es string y en notas el id es entero
  // console.log("id", id);
  // console.log("id", typeof id);
  const note = notes.find((note) => note.id === id);
  // console.log("note", note);

  // Si no se encuentra ninguna nota, el servidor debe responder con el código de estado 404 not found en lugar de 200.
  if (note) {
    response.json(note);
  } else {
    // status establece estado y end responde a la solicitud sin enviar ningún dato.
    response.status(404).end();
  }
});

// eliminacion
// POSTMAN -> status: 204 No Content ; Exitoso
app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
