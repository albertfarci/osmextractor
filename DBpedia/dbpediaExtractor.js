
var fs = require("fs");
var request = require('request');

const Sparql = require('virtuoso-sparql-client');
const Client = new Sparql.Client("http://dbpedia.org/sparql");

var osmDbpedia = fs.readFileSync("../Overpass/overpass.json");
var jsonOsmDbpedia = JSON.parse(osmDbpedia);

Client.setOptions("application/ld+json");

queryBDpedia(jsonOsmDbpedia)
  .then((results)=>{

      console.log("Length",results);
      writeRdf(JSON.stringify(results));
      ///console.log(results);

  })
  .catch((err)=>{
    console.log("Errore");
    console.log(err);
  });


function queryBDpedia (jsonOverpass){

    let promises=[];
    let count = 0;

      //for(var item of jsonOverpass){
      for(let item of jsonOverpass){

        count++;
        //console.log(jsonOverpass[379]);
          promises.push(addItem(item, count));
          //promises.push(addItem(item, count));
      }

      return Promise.all(promises);

}

/**
PREFIX wikidata: <http://www.wikidata.org/entity/>
SELECT ?dbpediaId  wikidata:${item.tags.wikidata} as ?data
WHERE {
  ?dbpediaId owl:sameAs wikidata:${item.tags.wikidata}.
}
**/
function addItem(item, i){
  console.log(i);
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      console.log(i);
      Client.query(`

        PREFIX wikidata: <http://www.wikidata.org/entity/>

        construct {
        ?dbpediaId ?prop ?obj;
           owl:sameAs wikidata:${item.tags.wikidata}.
        }
        WHERE {
          {
              ?dbpediaId owl:sameAs wikidata:${item.tags.wikidata};
              ?prop ?obj.
              ?prop rdf:type owl:DatatypeProperty
            }
        union
          {
              ?dbpediaId owl:sameAs wikidata:${item.tags.wikidata};
              ?prop ?obj.
              ?prop rdf:type owl:ObjectProperty
            }
        union
          {
              ?dbpediaId owl:sameAs wikidata:${item.tags.wikidata};
              rdfs:label ?obj.
              bind(rdfs:label as ?prop)
            }

        }
      `)
      .then((results)=>{
        if(results){
          if (results["@graph"] != undefined){
            //console.log(results["@graph"]);
            resolve(results["@graph"][0]);
          }else{
            resolve(results);
          }

        }

      })
      .catch(reject);
    }, 1500*i);
  });
}



function writeRdf(geojson){
  fs.writeFile('./dbpedia.json', geojson, function (err) {
    if (err)
      return console.log(err);

  });
}
