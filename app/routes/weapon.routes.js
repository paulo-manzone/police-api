module.exports = app => {
  const weapons = require("../controllers/weapon.controller.js");

  //GET: /weapons
  //Trazer todas as armas que já foram utilizadas em algum crime. 
  app.get("/weapons", weapons.findAll);

};