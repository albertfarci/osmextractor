var fs = require("fs");


var overpass = fs.readFileSync("../Overpass/overpass.json");
var jsonOverpass = JSON.parse(overpass);

var dbpedia = fs.readFileSync("../DBpedia/dbpedia.json");
var jsonDbpedia = JSON.parse(dbpedia);

merge();
/**
function merge(){

	let osmDbpedia=[];

	for (var itemOverpass of jsonOverpass){

		for (var itemDBpedia of jsonDbpedia["@graph"]){

			if(itemOverpass.tags.wikidata == itemDBpedia["http://www.w3.org/2002/07/owl#sameAs"]["@id"].split("http://www.wikidata.org/entity/")[1]){

				itemOverpass.dbpedia=itemDBpedia["@id"];

				osmDbpedia.push(itemOverpass);
			}

		}

	}

	writeRdf(JSON.stringify(osmDbpedia));

}
**/

function merge(){

	let osmDbpedia=[];

	for (var itemOverpass of jsonOverpass){

		for (var itemDBpedia of jsonDbpedia){

			if(itemDBpedia){

				if(itemOverpass.tags.wikidata == itemDBpedia["data"]["value"].split("http://www.wikidata.org/entity/")[1]){

					itemOverpass.dbpedia=itemDBpedia["dbpediaId"]["value"];

					console.log(itemDBpedia["dbpediaId"]);

				}



			}

		}

		osmDbpedia.push(itemOverpass);

	}

	writeRdf(JSON.stringify(osmDbpedia));

}

function writeRdf(geojson){
  fs.writeFile('./osmDbpedia.json', geojson, function (err) {
    if (err)
      return console.log(err);

  });
}
