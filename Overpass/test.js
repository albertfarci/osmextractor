const overpassQuery = require('./overpassQuery');
const overpassExtractor = require('./overpassExtractor');
const individualCreator = require('./individualGenerator');
const individualInsert = require('./individualInsert');
var fs = require("fs");

if(process.argv[2] && process.argv[2]==='museum'){

  overpassQuery.tourism()
    .then((overpassTurbo)=>{

        let geoJson=overpassExtractor.relationExtractor(overpassTurbo);

        let promises=[];
        for(var item of geoJson){

            promises.push(overpassExtractor.relationResolve(item));
        }

        return Promise.all(promises);
    })
    .then((results)=>{

        fs.writeFile(`./${process.argv[2]}.json`, JSON.stringify(results), function (err) {
          if (err)
            return console.log(err);
            /**if(process.argv[3]){

                individualCreator.createIndividual(process.argv[3]);

            }**/
        });

    })
    .catch((err)=>{

      console.log("Errore");
      console.log(err);
    });

}

if(process.argv[2] && process.argv[2]==='boundary'){

  overpassQuery.boundary()
    .then((overpassTurbo)=>{

        let geoJson=overpassExtractor.relationExtractor(overpassTurbo);

        let promises=[];
        for(var item of geoJson){

            promises.push(overpassExtractor.relationResolve(item));
        }

        return Promise.all(promises);
    })
    .then((results)=>{

        fs.writeFile(`./${process.argv[2]}.json`, JSON.stringify(results), function (err) {
          if (err)
            return console.log(err);
            if(process.argv[3]){

                individualCreator.createIndividual(process.argv[3]);

            }
        });

    })
    .catch((err)=>{

      console.log("Errore");
      console.log(err);
    });

}

if(!process.argv[2]){
    individualInsert.sparqlUpdate("http://localhost:8890/sparql","https://w3id.org/toti/geo/","boundary.json");

}
