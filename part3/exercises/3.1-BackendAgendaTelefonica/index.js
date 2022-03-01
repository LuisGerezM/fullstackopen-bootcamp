const express = require("express");
const app = express();

app.use(express.json());

let phonebook = [
  { name: "Arto Hellas", number: "040-123456", id: 1 },
  { name: "Ada Lovelasce", number: "39-44-5323522", id: 2 },
  { name: "Dan Abramov gerez", number: "12-43-234345", id: 3 },
  { name: "Mary Poppendieck", number: "39-23-6423522", id: 4 },
  { name: "Luis Gerez", number: "39-23-6423522", id: 5 },
  { name: "Milagros Hernandez Gerez", number: "39-23-6423522", id: 6 },
];

// creamos una entrada
// 3.5: Expanda el backend para que se puedan agregar nuevas entradas a la agenda telefónica realizando solicitudes HTTP POST a la dirección http://localhost:3001/api/persons. Genere una nueva id para la entrada de la agenda con la función Math.random.
// 3.6: mplemente el manejo de errores para crear nuevas entradas. No se permite que la solicitud se realice correctamente si: Falta el nombre o número, El nombre ya existe en la agenda

const generateId = () => {
  const maxId =
    phonebook.length > 0
      ? Math.max(...phonebook.map((element) => element.id))
      : 0;

  return maxId + 1;
};

const checkingNameExist = (name, phonebook) =>
  (checkName = phonebook.filter((element) => element.name === name));

app.post("/api/persons", (request, response) => {
  const { name, number } = request.body;

  if (!name || !number)
    return response
      .status(400)
      .json({ error: "content missing. Number or Name cannot be empty" });

  const checkName = checkingNameExist(name, phonebook);
  console.log("checkName", checkName);

  if (checkName.length !== 0)
    return response.status(400).json({ error: "name must be unique" });

  const numberPhone = {
    name,
    number: Number(number),
    id: generateId(),
  };

  phonebook = phonebook.concat(numberPhone);

  response.json(numberPhone);
});

// eliminamos una entrada
// 3.4: Implemente la funcionalidad que hace posible eliminar una sola entrada de la agenda telefónica mediante una solicitud HTTP DELETE a la URL única de esa entrada de la agenda.
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = phonebook.filter((element) => element.id !== id);
  // console.log("persons", persons);
  //   persons [
  //   { name: 'Arto Hellas', number: '040-123456', id: 1 },
  //   { name: 'Ada Lovelasce', number: '39-44-5323522', id: 2 },
  //   { name: 'Dan Abramov gerez', number: '12-43-234345', id: 3 },
  //   { name: 'Mary Poppendieck', number: '39-23-6423522', id: 4 },
  //   { name: 'Luis Gerez', number: '39-23-6423522', id: 5 }
  // ]

  // 204 -> no content
  response.status(204).end();
});

// retorna una entrada especificada
// 3.3 Implemente la funcionalidad para mostrar la información de una sola entrada de la agenda. La URL para obtener los datos de una persona con la identificación 5 debe ser http://localhost:3001/api/persons/5; Si no se encuentra una entrada para la identificación dada, el servidor debe responder con el código de estado apropiado.
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  //   console.log("id", id);

  const numberPhone = phonebook.find((element) => element.id === id);
  //   console.log("numberPhone", numberPhone);

  if (numberPhone) return response.json(numberPhone);

  return response.status(404).end();
});

// lista hardcodeada de entradas de la agenda telefónica
app.get("/api/persons", (request, response) => {
  response.json(phonebook);
});

const quantityNumbers = (phonebook) => {
  return phonebook.length;
};

// hora en que se recibió la solicitud y cuántas entradas hay en la agenda telefónica
app.get("/api/info", (request, response) => {
  const quantityNums = quantityNumbers(phonebook);
  const date = new Date();

  response.send(
    `<p>Phonebook has info for ${quantityNums} people</p>
    <p>${date}</p>`
  );
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
