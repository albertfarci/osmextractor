const overpassQuery = require('./overpassQuery');
const overpassExtractor = require('./overpassExtractor');
const individualCreator = require('./individualGenerator');
var fs = require("fs");

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
              console.log("err");
                individualCreator.createIndividual(process.argv[3]);
            }
        });

    })
    .catch((err)=>{

      console.log("Errore");
      console.log(err);
    });

}
