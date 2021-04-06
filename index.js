const express = require("express");
const app = express();
const dataRoutes = require("./routes/dataRoutes");

//SETTING SERVER PORT
const lPort = process.env.PORT || 1000;

//MIDDLEWARE AND BODY PARSER
app.use(express.json());

//INITIALIZING THE ROUTES
app.use("/api/v1/data", dataRoutes);

//INITIALIZING AND CHECKING THE STATE OF THE SERVER
app.listen(lPort, () => {
  console.log(`Server started on PORT:${lPort}`);
});

module.exports = app;
