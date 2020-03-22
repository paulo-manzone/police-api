const sql = require("./db.js");

//Construtor
const Crime = function(crime) {
  this.id          = crime.id;
  this.country     = crime.country;
  this.date        = crime.date;
  this.victims     = crime.victims;
  this.weapons     = crime.weapons;
};

//Creating a crime
Crime.create = (newCrime, result) => {


    //Inserting in crime table 
    sql.query("INSERT INTO crime  SET ?,?,?", newCrime.crime_id, newCrime.country, newCrime.date, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created crime: ", { id: res.insertId, ...newCrime });
      result(null, { id: res.insertId, ...newCrime });
    });

    //Inserting in victims table
    newCrime.victims.forEach(e => {
      sql.query("INSERT INTO victim  SET ?, ?", e.id, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
    
        console.log("created crime: ", { id: res.insertId, ...newCrime });
        result(null, { id: res.insertId, ...newCrime });
      });
    });
    

    //Inserting in crime table 
    sql.query("INSERT INTO crime  SET ?", newCrime, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created crime: ", { id: res.insertId, ...newCrime });
      result(null, { id: res.insertId, ...newCrime });
    });

    //Inserting in crime table 
    sql.query("INSERT INTO crime  SET ?", newCrime, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created crime: ", { id: res.insertId, ...newCrime });
      result(null, { id: res.insertId, ...newCrime });
    });

    //Inserting in crime table 
    sql.query("INSERT INTO crime  SET ?", newCrime, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created crime: ", { id: res.insertId, ...newCrime });
      result(null, { id: res.insertId, ...newCrime });
    });



  };

  //Reading a crime
  Crime.findById = (CrimeId, result) => {
    sql.query('SELECT * FROM crime WHERE id = ${CrimeId}', (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found crime: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      //if not found
      result({ kind: "not_found" }, null);
    });
  };

  //Reading all crimes
  Crime.getAll = result => {
    sql.query("SELECT * FROM Crimes", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Crimes: ", res);
      result(null, res);
    });
  };

  //Deleting a crime
  Crime.remove = (id, result) => {
    sql.query("DELETE FROM crime WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Crime with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted Crime with id: ", id);
      result(null, res);
    });
  };

