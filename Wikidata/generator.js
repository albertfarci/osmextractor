var fs = require("fs");
var request = require('request');
var encode = require( 'hashcode' ).hashCode;

const COMUNE = 8;
const PROVINCIA = 6;
const REGIONE = 4;

var osmDbpediaWikidata = fs.readFileSync("./OsmDBpediaWikidata.json");

var jsonOsmDbpediaWikidata = JSON.parse(osmDbpediaWikidata);

createIndividual(){

    var individuals="";

    for (let item of jsonOsmDbpediaWikidata){

        let identifier=encode().value( item.type + "/" + item.id ); ;

        if (id.tags.admin_level == COMUNE){

        } else if (id.tags.admin_level == PROVINCIA){

        } else {

        }

        individuals=individuals+`
              <owl:NamedIndividual rdf:about="https://w3id.org/toti/geo/TF${identifier}">
                <rdf:type rdf:resource="http://www.opengis.net/ont/geosparql#Geometry"/>
                <geosparql:asWKT rdf:datatype="http://www.opengis.net/ont/geosparql#wktLiteral">POINT(${lon} ${lat})</geosparql:asWKT>
              </owl:NamedIndividual>
              <owl:NamedIndividual rdf:about="https://w3id.org/toti/geo/TG${identifier}">
                <rdf:type rdf:resource="http://www.opengis.net/ont/geosparql#Geometry"/>
                <geosparql:asWKT rdf:datatype="http://www.opengis.net/ont/geosparql#wktLiteral">POINT(${lon} ${lat})</geosparql:asWKT>
              </owl:NamedIndividual>
            `;

    }

}


function writeRdf(geojson){
  fs.writeFile('./OsmDBpediaWikidata.json', geojson, function (err) {
    if (err)
      return console.log(err);

  });

}
