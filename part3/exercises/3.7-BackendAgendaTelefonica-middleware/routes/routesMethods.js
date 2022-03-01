const express = require("express");
const router = express.Router();

let phonebook = [
  { name: "Arto Hellas", number: "040-123456", id: 1 },
  { name: "Ada Lovelasce", number: "39-44-5323522", id: 2 },
  { name: "Dan Abramov gerez", number: "12-43-234345", id: 3 },
  { name: "Mary Poppendieck", number: "39-23-6423522", id: 4 },
  { name: "Luis Gerez", number: "39-23-6423522", id: 5 },
  { name: "Milagros Hernandez Gerez", number: "39-23-6423522", id: 6 },
];

const generateId = () => {
  const maxId =
    phonebook.length > 0
      ? Math.max(...phonebook.map((element) => element.id))
      : 0;

  return maxId + 1;
};

const checkingNameExist = (name, phonebook) =>
  (checkName = phonebook.filter((element) => element.name === name));

// app.post("/api/persons", morgan('combined'), (request, response) => {
router.post("/persons", (request, response) => {
  const { name, number } = request.body;

  if (!name || !number)
    return response
      .status(400)
      .json({ error: "content missing. Number or Name cannot be empty" });

  const checkName = checkingNameExist(name, phonebook);
  // console.log("checkName", checkName);

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

// app.delete("/api/persons/:id", (request, response) => {
//   const id = Number(request.params.id);
//   persons = phonebook.filter((element) => element.id !== id);
//   response.status(204).end();
// });

router.get("/persons/:id", (request, response) => {
  //  response.send("GET by ID from Express Router!! ID =>" + request.params.id);

  const id = Number(request.params.id);

  const numberPhone = phonebook.find((element) => element.id === id);
  // console.log('numberPhone', numberPhone)
  // if (numberPhone) return response.json(numberPhone);
  if (numberPhone) return response.json(numberPhone);

  return response.status(404).end();
});

// app.get("/api/persons", (request, response) => {
//   response.json(phonebook);
// });

// const quantityNumbers = (phonebook) => {
//   return phonebook.length;
// };

// app.get("/api/info", (request, response) => {
//   const quantityNums = quantityNumbers(phonebook);
//   const date = new Date();

//   response.send(
//     `<p>Phonebook has info for ${quantityNums} people</p>
//     <p>${date}</p>`
//   );
// });

module.exports = router;
