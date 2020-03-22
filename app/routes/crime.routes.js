module.exports = app => {
    const crimes = require("../controllers/crime.controller.js");
  
    // POST: /crimes
    //Inserir um novo crime com todas as suas informações agregadas (armas, vítimas, criminosos);
    app.post("/crimes", crimes.create);
  
    //GET: /crimes{id}
    //Trazer todas as informações acerca de um determinado crime (vítimas, armas, criminosos, país e data). 
    app.get("/crimes/:crime_id", crimes.findOne);

    //GET: /crimes{id}
    //Trazer todos os crimes 
    app.get("/crimes", crimes.findAll);
  
    // DELETE: /crimes
    //Remover um crime do sistema. 
    app.delete("/crimes/:crime_id", crimes.delete);
  
  };