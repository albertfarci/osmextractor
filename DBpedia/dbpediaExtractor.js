/**var fs = require("fs");
//var osmDbpedia = fs.readFileSync("../Overpass/boundary.json");
//var jsonOsmDbpedia = JSON.parse(osmDbpedia);

queryBDpedia(jsonOsmDbpedia)
  .then((results)=>{

      console.log("Length",results);
      writeRdf(JSON.stringify(results));

  })
  .catch((err)=>{
    console.log("Errore");
    console.log(err);
  });


/**
PREFIX wikidata: <http://www.wikidata.org/entity/>
SELECT ?dbpediaId  wikidata:${item.tags.wikidata} as ?data
WHERE {
  ?dbpediaId owl:sameAs wikidata:${item.tags.wikidata}.
}
**/


/**function writeRdf(geojson){
  fs.writeFile('./dbpedia.json', geojson, function (err) {
    if (err)
      return console.log(err);

  });
}**/
