const sql = require("./db.js");

// constructor
const Weapon = function(weapon) {
  this.weapon_id = weaponr.weapon_id;
  this.model = weapon.model;
  this.type = weapon.type;
};

//Reading all weapons used in a crime
Weapon.getAll = result => {
  sql.query("SELECT * FROM weapon AS w WHERE EXISTS(SELECT * FROM weapon_crime AS wc WHERE wc.id_weapon = w.id_weapon);", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("used weapons: ", res);
    result(null, res);
  });
};

module.exports = Weapon;