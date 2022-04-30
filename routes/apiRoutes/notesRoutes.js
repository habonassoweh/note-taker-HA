const router = require("express").Router();
const {
  filterByQuery,
  findbyTitle,
  createNewNote,
  validateNotes,
} = require("../../lib/notes");
const { notes } = require("../../db/notes.json");

router.get("/notes", (req, res) => {
  let results = notes;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }

  res.json(results);
});

router.get("/notes/:title", (req, res) => {
  const result = findbyTitle(req.params.title, notes);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

router.post("/notes", (req, res) => {
  // set id based on what the next index of the array
  //will be

  req.body.id = notes.length.toString();
  if (!validateNotes(req.body)) {
    res.status(400).send("The note is not properly formatted.");
  } else {
    const notes = createNewNote(req.body, notes);
    res.json(notes);
  }
});

module.exports = router;
