const { request, response } = require("express");
const express = require("express");

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
  {
    name: "a",
    number: "1",
    id: 10,
  },
  {
    name: "an",
    number: "9",
    id: 11,
  },
  {
    name: "as",
    number: "12",
    id: 12,
  },
];

const gernerateId = () => {
  return Math.floor(Math.random() * 1000 + 1) % 1001;
};
const morgan = require("morgan");
const app = express();
app.use(express.json());
morgan.token("log", function ss(req, res) {
  if (req.method === "POST" )
    return `{ name:${req.body.name},number:${req.body.number}}`;
  return "";
});
app.use(morgan(":method :url :status :response-time :log"));
app.get("/", (request, response) => {
  response.send("<h3>HELLO</h3>");
});
app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/info", (request, response) => {
  response.send(`<h4>Phone book has info ${persons.length} people</h4>
    <p>${new Date().toString()}</p>`);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (!person) {
    return response.status(404).end("Person not found");
  }
  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.paramsid);
  persons = persons.map((person) => person.id !== id);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body.number || !body.name)
    return response.status(400).end("number or name is empty");
  const person = {
    name: body.name,
    number: body.number,
    id: gernerateId(),
  };
  persons = persons.concat(person);
  response.json(person);
});
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Listening at PORT ${PORT}`);
});
