const express = require("express");
const { notes } = require("./db/notes.json");
const PORT = process.env.PORT || 3001;

//instantiate the server
const app = express();

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});

function filterByQuery(query, notesArray) {
  let filteredResults = notesArray;
  if (query.title) {
    filteredResults = filteredResults.filter(
      (notes) => notes.title === query.title
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
