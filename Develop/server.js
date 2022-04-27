const express = require("express");
const htmlRoutes = require("./routes/htmlRoutes");
const app = express();


const port = process.env.port || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
//app.use("/api");
app.use("/", htmlRoutes);
app.listen(port, () => console.log(`listening on port: ${port}`));
