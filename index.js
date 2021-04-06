const express = require("express");
const app = express();
const exhb = require("express-handlebars");
const dataRoutes = require("./routes/dataRoutes");

//SETTING SERVER PORT
const lPort = process.env.PORT || 1000;

//MIDDLEWARE AND BODY PARSER
app.use(express.json());

//INIT HANDLEBARS MIDDLEWARE
app.engine("handlebars", exhb({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//DEFAULT MAIN
app.get("/", (req, res) => {
  res.render("index");
});

//INITIALIZING THE ROUTES
app.use("/api/v1/data", dataRoutes);

//INITIALIZING AND CHECKING THE STATE OF THE SERVER
app.listen(lPort, () => {
  console.log(`Server started on PORT:${lPort}`);
});

// module.exports = app;
