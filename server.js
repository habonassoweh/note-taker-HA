const express = require("express");
const { notes } = require("./db/notes.json");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 3001;

//instantiate the server
const app = express();

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function filterByQuery(query, notesArray) {
  let filteredResults = notesArray;
  if (query.title) {
    filteredResults = filteredResults.filter(
      (notes) => notes.title === query.title
    );
  }
  return filteredResults;
}

function findbyTitle(title, notesArray) {
  const result = notesArray.filter((notes) => notes.title === title)[0];
  return result;
}

function createNewNote(body, notesArray) {
  const notes = body;
  notesArray.push(notes);
  fs.writeFileSync(
    path.join(__dirname, "./db/notes.json"),
    JSON.stringify({ notes: notesArray }, null, 2)
  );

  return notes;
}

app.get("/api/notes", (req, res) => {
  let results = notes;
  if (req.query) {
    results = filterByQuery(req.query, results);
    console.log(req.query);
  }

  res.json(results);
});

app.get("/api/notes/:title", (req, res) => {
  const result = findbyTitle(req.params.title, notes);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

app.post("/api/notes", (req, res) => {
  const animal = createNewNote(req.body, notes);
  res.json(notes);
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
