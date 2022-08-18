// const http = require("http");

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2022-1-17T17:30:31.098Z",
    important: false,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    date: "2022-1-17T18:39:34.091Z",
    important: true,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2022-1-17T19:20:14.298Z",
    important: true,
  },
  {
    content: "a new note...",
    date: "2022-08-09T05:13:30.173Z",
    important: true,
    id: 4,
  },
  {
    content: "some note",
    date: "2022-08-09T05:34:49.023Z",
    important: true,
    id: 5,
  },
  {
    content: "i'm put using axios post request",
    date: "2022-08-09T05:44:46.816Z",
    important: true,
    id: 6,
  },
  {
    content: "part3",
    date: "2022-08-10T06:50:15.344Z",
    important: false,
    id: 7,
  },
  {
    content: "a new note...",
    date: "2022-08-10T06:58:17.873Z",
    important: false,
    id: 8,
  },
];
const { response, request } = require("express");
// const app=http.createServer((request,response)=>{
//     response.writeHead(200,{'Content-Type':'application/json'})
//     response.end(JSON.stringify(notes))
// })

// const PORT=3001
// app.listen(PORT)
// console.log(`server listening at ${PORT}`)

const generateId = () => {
  const maxId =
    notes.length > 0 ? Math.max(...notes.map((note) => note.id)) : 0;
  return maxId + 1;
};

const express = require("express");
const cors=require("cors");
const app = express();
const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:", request.path);
  console.log("Body:", request.body);
  console.log("----");
  next();
};
app.use(cors())
app.use(express.json());
app.use(express.static('build'))
app.use(requestLogger);

app.get("/", (request, response) => {
  response.send("<h2>Hello world</h2>");
});
app.get("/api/notes", (request, response) => {
  response.json(notes);
});

app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => {
    return note.id === id;
  });
  if (note) response.json(note);
  else response.status(404).end("Note doesnot exist");
});

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);
  response.status(204).end();
});

app.post("/api/notes", (request, response) => {
  const body = request.body;
  if (!body.content) {
    return response.status(400).end({
      error: "content is empty",
    });
  }

  const note = {
    id: generateId(),
    date: new Date(),
    important: body.important || false,
    content: body.content,
  };
  notes = notes.concat(note);
  response.json(note);
});

const unknownEndpoint=(request,response)=>{
  response.status(404).send({error:`Cannot find ${request.path}`})
}
app.use(unknownEndpoint)
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`listening at PORT ${PORT}`);
});
