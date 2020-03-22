const Weapon = require("../models/weapon.model.js");

// Retrieve all Weapons from the database.
exports.findAll = (req, res) => {
    Weapon.getAll((err, data) => {
        if (err)
            res.status(500).send({
            message:
                err.message || "Unknown Error (at Finding Weapons)."
            });
        else res.send(data);
    });
  
};
