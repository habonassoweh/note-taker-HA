const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");
const express = require("express");
const { notes } = require("./db/notes.json");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 3001;

//instantiate the server
const app = express();

//middleware
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
