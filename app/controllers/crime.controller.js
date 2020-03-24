const Crime = require("../models/crime.model.js");
//================================================================================================
// Creating Crime
//================================================================================================
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  //Instantiating a Crime
  const crime = new Crime({
    id: req.body.id_crime,
    country: req.body.country,
    date: req.body.dt_crime,
    victims: req.body.victims,
    weapons: req.body.weapons,
    criminals: req.body.criminals
  });

   console.log('Corpo ', req.body);

  //Persisting Crime
  Crime.create(crime, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Unknown Error (At Creating Crime)."
      });
    else res.send(data);
  });
};

//================================================================================================
// Reading all Crimes
//================================================================================================
exports.findAll = (req, res) => {
  Crime.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Unknown Error (At Reading Crimes)."
      });
    else res.send(data);
  });
};

//================================================================================================
//Reading Crime with specific id
//================================================================================================
exports.findOne = (req, res) => {
  Crime.findById(req.params.crime_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Crime with id ${req.params.crime_id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Crime with id " + req.params.crime_id
        });
      }
    } else res.send(data);
  });
};

//================================================================================================
// Deleting Crime witch specific id 
//================================================================================================
exports.delete = (req, res) => {
  Crime.remove(req.params.crime_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found crime with id ${req.params.crime_id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete crime with id " + req.params.crime_id
        });
      }
    } else res.send({ message: `Crime ${req.params.crime_id} was deleted successfully!` });
  });
};
