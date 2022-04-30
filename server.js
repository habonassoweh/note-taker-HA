const express = require("express");
const { notes } = require("./db/notes.json");

//instantiate the server
const app = express();

app.listen(3001, () => {
  console.log("API server now on port 3001");
});

function filterByQuery(query, notesArray) {
  let filteredResults = notesArray;
  if (query.title) {
    filteredResults = filteredResults.filter(
      (notes) => notes.title === query.title
    );
  }
  if (query.text) {
    filteredResults = filteredResults.filter(
      (notes) => notes.text === query.text
    );
  }
  return filteredResults;
}

app.get("/api/notes", (req, res) => {
  let results = notes;
  if (req.query) {
    results = filterByQuery(req.query, results);
    console.log(req.query);
  }

  res.json(notes);
});
