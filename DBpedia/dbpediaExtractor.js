
var fs = require("fs");
var request = require('request');

const Sparql = require('virtuoso-sparql-client');
const Client = new Sparql.Client("http://dbpedia.org/sparql");

var osmDbpedia = fs.readFileSync("../Overpass/overpass.json");
var jsonOsmDbpedia = JSON.parse(osmDbpedia);

Client.setOptions("application/json");

queryBDpedia(jsonOsmDbpedia).then((results)=>{

    let dbpediaJson="";
    writeRdf(JSON.stringify(results));
    console.log(results);

})
.catch(console.log);

function queryBDpedia (jsonOverpass){

    let promises=[];
    let count = 0;

      for(var item of jsonOverpass){
        count++;
          promises.push(addItem(item, count));
      }

      return Promise.all(promises);

}


function addItem(item, i){
  console.log(i);
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      console.log(i);
      Client.query(`
        PREFIX wikidata: <http://www.wikidata.org/entity/>
        SELECT ?dbpediaId  wikidata:${item.tags.wikidata} as ?data
        WHERE {
        	?dbpediaId owl:sameAs wikidata:${item.tags.wikidata}.
        }
      `)
      .then((results)=>{
        resolve(results.results.bindings[0]);
      })
      .catch(reject);
    }, 1500*i);
  });
}



function writeRdf(geojson){
  fs.writeFile('./dbpedia.jsonld', geojson, function (err) {
    if (err)
      return console.log(err);

  });
}
