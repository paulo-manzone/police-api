const sql = require("./db.js");

//Construtor
const Crime = function(crime) {
  this.id          = crime.id;
  this.country     = crime.country;
  this.date        = crime.date;
  this.victims     = crime.victims;
  this.weapons     = crime.weapons;
};

//================================================================================================
//Creating a crime
//================================================================================================
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

    //Inserting in crime-victims table
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
    

    //Inserting in crime-weapons table 
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

  //================================================================================================
  //Reading a crime
  //================================================================================================
  Crime.findById = (crimeId, result) => {

    //Local variables storing every list of objects returned
    lCrime = [];
    lVictims = [];
    lWeapons = [];
    lCriminals = [];

    //Getting info about crime itself
    sql.query(`SELECT * FROM crime WHERE id_crime = ${crimeId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found crime: ", res[0]);
        lCrime = res[0];
      }else {
        //if not found
        result({ kind: "not_found" }, null);
        return;
      }
        

      //Getting info about victims
      sql.query(`select v.id_victim, v.tx_name from  crime as c 
      inner join victim_crime as vc on vc.id_crime = c.id_crime
      inner join victim as v on vc.id_victim = v.id_victim
      where c.id_crime = ${crimeId}`, (err, res) => {

        console.log('3');
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        if (res.length) {
          console.log("found victim: ", res[0]);
          lVictims = res;
        }//else
          //if not found
          //result({ kind: "not_found" }, null);

        //Getting info about weapons
        sql.query(`select w.tx_model, wt.tx_weapon_type from crime as c
        inner join weapon_crime as wc on wc.id_crime = c.id_crime
          inner join weapon as w on w.id_weapon = wc.id_weapon
          left join weapon_type as wt on wt.id_weapon_type = w.id_weapon_type
          where c.id_crime = ${crimeId}`, (err, res) => {
            
          if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
                
          if (res.length) {
            console.log("found weapon: ", res[0]);
            lWeapons = res;
           
          }//else
            //if not found
            //result({ kind: "not_found" }, null);

          //Getting info about criminals
          sql.query(`select cl.tx_name, ct.tx_type from crime as c
          inner join criminal_crime as cc on cc.id_crime = c.id_crime
            inner join criminal as cl on cl.id_criminal = cc.id_criminal
            left join crime_type as ct on ct.id_crime_type = cc.id_crime_type
            where c.id_crime = ${crimeId}`, (err, res) => {
              
            if (err) {
              console.log("error: ", err);
              result(err, null);
              return;
            }
            
            if (res.length) {
              console.log("found weapon: ", res[0]);
              lCriminals = res;
            }//else
              //if not found
              //result({ kind: "not_found" }, null);
            
            //Returning object with all the information
            result (null, {'id_crime': lCrime.id_crime,
                           'country' : lCrime.tx_country,
                           'dt_crime': lCrime.dt_crime,
                           'victims': lVictims,
                           'weapons': lWeapons,
                           'criminals': lCriminals});
          });
        
        });

      });

    });
  };

  //================================================================================================
  //Reading all crimes
  //================================================================================================
  Crime.getAll = result => {
    sql.query("SELECT * FROM crime", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Crimes: ", res);
      result(null, res);
    });
  };

  //================================================================================================
  //Deleting a crime
  //================================================================================================
  Crime.remove = (id, result) => {
    const queryString = " DELETE FROM crime WHERE id_crime=?;" +
                        " DELETE FROM victim_crime WHERE id_crime=?;" +
                        " DELETE FROM weapon_crime WHERE id_crime=?;" +
                        " DELETE FROM criminal_crime WHERE id_crime=?;";
    console.log(queryString);
    sql.query(queryString, [id, id, id, id] , (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found crime with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted crime with id: ", id);
      result(null, res);
    });
  };

  module.exports = Crime;
