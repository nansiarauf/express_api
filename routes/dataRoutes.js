const express = require("express");
const data = require("../data");
const router = express.Router();

//DISPLAY ALL DATA
router.get("/", (req, res) => {
  res.json(data);
});

//DISPLAY DATA FROM A SPECIFIED ID
router.get("/:id", (req, res) => {
  const dataCheck = data.some(
    (data) => data.id === parseInt(req.params.id)
  );
  if (dataCheck) {
    res.json(
      data.filter(
        (data) =>
          data.id === parseInt(req.params.id)
      )
    );
  } else {
    res
      .status(400)
      .send(
        `<h2>Sorry data with id:${req.params.id} not found</h2>`
      );
  }
});

//POST DATA TO THE SERVER
router.post("/", (req, res) => {
  const newData = {
    id: req.body.id,
    capital: req.body.capital,
    region: req.body.region,
  };
  if (
    !newData.id ||
    !newData.capital ||
    !newData.region
  ) {
    res
      .status(400)
      .send(
        "<h3>Please fill out all the fields</h3>"
      );
  }
  //adding new data
  data.push(newData);
  //return all data
  res.json(data);
});

//USING TO THE PUT METHOD TO UPDATE OUR DATA OBJECT
router.put("/:id", (req, res) => {
  const dataCheck = data.some(
    (data) => data.id === parseInt(req.params.id)
  );
  if (dataCheck) {
    const updateInfo = req.body;
    //using a forEach structure to loop through the data with a specified ID
    //..checking its contents and make the availanble changes
    data.forEach((data) => {
      if (data.id === parseInt(req.params.id)) {
        data.id = updateInfo.id
          ? updateInfo.id
          : data.id;
        data.capital = updateInfo.capital
          ? updateInfo.capital
          : data.capital;
        data.region = updateInfo.region
          ? updateInfo.region
          : data.region;

        res.json({
          msg: "Data update successful",
          data,
        });
      }
    });
  } else {
    res
      .status(400)
      .send(
        `<h2>Sorry data with id:${req.params.id} not found</h2>`
      );
  }
});
//DELETE METHOD
router.delete("/:id", (req, res) => {
  //creating an object to check for the data with the specified id
  const dataCheck = data.some(
    (data) => data.id === parseInt(req.params.id)
  );
  if (dataCheck) {
    res.json({
      Note: "data deleted successfully",
      data: data.filter(
        (data) =>
          data.id !== parseInt(req.params.id)
      ),
    });
    //error handling with status codes and a custom message
  } else {
    res
      .status(400)
      .send(
        `<h2>Sorry data with id:${req.params.id} not found</h2>`
      );
  }
});

module.exports = router;
