const Crime = require("../models/crime.model.js");

//Request body model
const requestBodyModel = {"country": "Guacamole","dt_crime": "2019-02-22","victims": [{"id_victim": 1}],"criminals": [{"id_criminal":1,"id_crime_type":1}],"weapons":[{"id_weapon": 1}]};

//================================================================================================
// Creating Crime
//================================================================================================
exports.create = (req, res) => {
  // Validating request body (more validations needed)
  if (!req.body.country || !req.body.dt_crime) {
    res.status(400).send({
      message: "Request body content can not be empty!",
      request_body_model: requestBodyModel
    });
    return;
  }

  //Instantiating a Crime
  const crime = new Crime({
    country: req.body.country,
    date: req.body.dt_crime,
    victims: req.body.victims,
    weapons: req.body.weapons,
    criminals: req.body.criminals
  });

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
