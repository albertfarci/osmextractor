const overpassQuery = require('./overpassQuery');
const overpassExtractor = require('./overpassExtractor');
const individualCreator = require('./individualGenerator');
const individualInsert = require('./individualInsert');
const tagsConstants = require('./tagsCostants');
var fs = require("fs");


if (process.argv[2]) {

    console.log(process.argv[2]);
    if (process.argv[2].includes("=")) {

        for (let key of tagsConstants) {
            
            if (process.argv[2].split("=")[0] === key.key) {
               
                for (let value of key.values) {
                    
                    if (process.argv[2].split("=")[1] === value["@id"]) {

                        console.log("includes = && vlues exist");

                        overpassQuery.generalQuery(process.argv[2])
                            .then((overpassTurbo) => {

                                let promises = [];
                                let identifiersNodesForQuery='';
                                let identifiersWaysForQuery='';
                                let geoJsonMap = overpassExtractor.mapFeatureExtractor(overpassTurbo);

                                for(let i=0;i<geoJsonMap.length;i++){

                                    if(geoJsonMap[i].type=="relation"){
                                          promises.push(overpassExtractor.relationResolve(geoJsonMap[i]));
                                    }else if(geoJsonMap[i].type=="node"){
                                          identifiersNodesForQuery=identifiersNodesForQuery+"node("+geoJsonMap[i].id+");";
                                    }else if(geoJsonMap[i].type=="way"){
                                          identifiersWaysForQuery=identifiersWaysForQuery+"way("+geoJsonMap[i].id+");";
                                    }
                                    if(i==geoJsonMap.length-1){
                                        promises.push(overpassExtractor.nodeResolve(identifiersNodesForQuery));
                                        promises.push(overpassExtractor.wayResolve(identifiersWaysForQuery));
                                    }
                                }
                                return Promise.all(promises);

                            }).then((results)=>{

                                let arrayTmp=[];
                                for(let i=0;i<results.length;i++){

                                    if(Array.isArray(results[i])){
                                        for(let j=0;j<results[i].length;j++){

                                            arrayTmp[i+j]=results[i][j];
                                        }
                                    }else{

                                        arrayTmp[i]=results[i];
                                    }
                                }

                                return arrayTmp;
                            })
                            .then((results) => {

                                fs.writeFile(`../${process.argv[2]}.json`, JSON.stringify(results), function(err) {
                                    if (err)
                                        return console.log(err);

                                });


                            })
                            .catch((err) => {

                                console.log("Errore");
                                console.log(err);
                            });
                    }
                }
            }
        }
    } else if (process.argv[2] && process.argv[2]!="-i") {
        console.log("all");
        for (let key of tagsConstants) {
            if (process.argv[2] === key.key) {
                console.log(key.values);
                overpassQuery.generalQuery(process.argv[2])
                    .then((overpassTurbo) => {
                        
                            let promises = [];
                            let identifiersNodesForQuery='';
                            let identifiersWaysForQuery='';
                            let geoJsonRelation = overpassExtractor.mapFeatureExtractor(overpassTurbo);
                            for(let i=0;i<geoJsonRelation.length;i++){

                                if(geoJsonRelation[i].type=="relation"){

                                      promises.push(overpassExtractor.relationResolve(geoJsonRelation[i]));
                                }else if(geoJsonRelation[i].type=="node"){
                                      identifiersNodesForQuery=identifiersNodesForQuery+"node("+geoJsonRelation[i].id+");";

                                }else if(geoJsonRelation[i].type=="way"){
                                      identifiersWaysForQuery=identifiersWaysForQuery+"way("+geoJsonRelation[i].id+");";

                                }
                                if(i==geoJsonRelation.length-1){

                                    promises.push(overpassExtractor.nodeResolve(identifiersNodesForQuery));
                                    promises.push(overpassExtractor.wayResolve(identifiersWaysForQuery));
                                }
                            }
                            return Promise.all(promises);


                    }).then((results)=>{

                        let arrayTmp=[];
                        for(let i=0;i<results.length;i++){
                            if(Array.isArray(results[i])){
                                for(let j=0;j<results[i].length;j++){
                                    arrayTmp[i+j]=results[i][j];
                                }
                            }else{
                              arrayTmp[i]=results[i];
                            }


                        }
                        return arrayTmp;
                    }).then((results) => {

                        fs.writeFile(`./Json/${process.argv[2]}.json`, JSON.stringify(results), function(err) {
                            if (err)
                                return console.log(err);
                            if (process.argv[3]) {

                                individualCreator.createIndividual(process.argv[3]);

                            }
                        });


                    });
            }
        }

    }else if (process.argv[2]=="-i") {
        /**
        Bootstrap per inserire nell'Onotlogia toti/geo gli individui presi dai json scaricati precedentemente da Overpass-turbo
        **/
        //individualInsert.sparqlUpdate("http://localhost:8890/sparql", "https://w3id.org/toti/geo/",  process.argv[3]);
        individualCreator.createBootIndividual(process.argv[3]);
    }
}
