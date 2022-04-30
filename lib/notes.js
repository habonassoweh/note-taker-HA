const fs = require("fs");
const path = require("path");

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
  // const notes = body;
  notesArray.push(body);
  fs.writeFileSync(
    path.join(__dirname, "../db/notes.json"),
    JSON.stringify({ notes: notesArray }, null, 2)
  );

  return notesArray;
}

function validateNotes(notes) {
  if (!notes.title || typeof notes.title !== "string") {
    return false;
  }
  return true;
}

module.exports = {
  filterByQuery,
  findbyTitle,
  createNewNote,
  validateNotes,
};
