const express = require("express");
const { notes } = require("./db/notes.json");
const PORT = process.env.PORT || 3001;

//instantiate the server
const app = express();

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

app.get("/api/notes", (req, res) => {
  let results = notes;
  if (req.query) {
    results = filterByQuery(req.query, results);
    console.log(req.query);
  }

  res.json(notes);
});

app.get("/api/notes/:title", (req, res) => {
  const result = findbyTitle(req.params.title, notes);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
