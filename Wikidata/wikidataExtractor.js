var fs = require("fs");
var request = require('request');

var osmDbpedia = fs.readFileSync("../OsmDBpedia/osmDbpedia.json");
var jsonOsmDbpedia = JSON.parse(osmDbpedia);

createWikidataJson(jsonOsmDbpedia).then((arrayWikiData) => {

	writeRdf(JSON.stringify(arrayWikiData));


});


function writeRdf(geojson){
  fs.writeFile('./OsmDBpediaWikidata.json', geojson, function (err) {
    if (err)
      return console.log(err);

  });

}

function addItem(item, i){
	return new Promise((resolve,reject) => {
		let query=encodeURIComponent(`
			PREFIX wikibase: <http://wikiba.se/ontology#>
			PREFIX wd: <http://www.wikidata.org/entity/>
			SELECT *
			WHERE{
					BIND(wd:${item.tags.wikidata} AS ?wikidata)?sitelink schema:about ?wikidata.
				FILTER REGEX(STR(?sitelink), ".wikipedia.org/wiki/") .
			}`);

		console.log(query);

		var options = {
		  url: 'https://query.wikidata.org/sparql?query='+query,
		  headers: {
		    'Accept': 'application/json'
		  }
		};
		setTimeout(function() {
		request(options, function (error, response, body) {

			if(error){
		        return reject(error);
		      }

		      let wikiObject={};


		      body=JSON.parse(body);
		      console.log(body);

		     for (var wiki of body.results.bindings){

		     	  let lang=wiki.sitelink.value.split("https://")[1].split(".")[0];

		     	  wikiObject[lang]=wiki.sitelink.value;

		     }

		     item.wikipediaLinks=wikiObject;


		     return resolve(item);


	    });
	    }, 1000*i);

	});
}

function createWikidataJson(geoJson){

    let promises=[];
    let count = 0;
    for(var item of geoJson){
    	count++;
        promises.push(addItem(item, count ));

    }

    return Promise.all(promises);

}
