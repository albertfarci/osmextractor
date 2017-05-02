
var fs = require("fs");
var request = require('request');

const Sparql = require('virtuoso-sparql-client');
const Client = new Sparql.Client("http://dbpedia.org/sparql");

var osmDbpedia = fs.readFileSync("../Overpass/overpass.json");
var jsonOsmDbpedia = JSON.parse(osmDbpedia);

Client.setOptions("application/json");

queryBDpedia(jsonOsmDbpedia).then((results)=>{

    let dbpediaJson="";

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
  
    return Client.query(`
      prefix wikidata: <http://www.wikidata.org/entity/>
    	SELECT ?a  wikidata:${item.tags.wikidata} as ?data
    	WHERE {

    		?a owl:sameAs wikidata:${item.tags.wikidata}.
    	}`);

}



function writeRdf(geojson){
  fs.writeFile('./dbpedia.jsonld', geojson, function (err) {
    if (err)
      return console.log(err);

  });
}
