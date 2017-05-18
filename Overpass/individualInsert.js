var request = require('request');
var fs = require("fs");
var encode = require( 'hashcode' ).hashCode;
const individualCreator = require('./individualGenerator');

const Sparql = require('virtuoso-sparql-client');

const COMUNE = 8;
const PROVINCIA = 6;
const REGIONE = 4;

exports.sparqlUpdate=(endpoint,graph,json)=>{

        const Client = new Sparql.Client(`${endpoint}`);
        Client.setOptions("application/json");

        let promises=[];
        var osmDbpediaWikidata = fs.readFileSync(`./${json}`);
        var jsonOsmDbpediaWikidata = JSON.parse(osmDbpediaWikidata);

        for (var item of jsonOsmDbpediaWikidata){
            promises.push(insertIndividual(item,graph));
        }

        Promise.all(promises)
        .then(results=>{
          //for(let item of results){
          for(let i=0;i<results.length;i++){
            setTimeout(function() {

              console.log(i);
              Client.query(`${results[i]}`)
              .then((insertResult)=>{

                  console.log(insertResult);

              })
              .catch(error =>{
                  console.log(error);
              });
            }, 150*i);

          }
        })
        .catch(error=>{
            console.log(error);
        });

}

function insertIndividual(item,graph) {

    return individualCreator.jsonToIndividuals(item)
      .then((item)=>{
        let identifier="";
        identifier=identifier+encode().value( item.type + "/" +  item.id);

        if(identifier.includes("-")){
          identifier=identifier.split("-")[1];
        }

        let date=Date.now();
        return `  WITH <${graph}>
                  DELETE { <https://w3id.org/toti/geo/${item.urlName}> rdf:type <https://w3id.org/toti/geo/${item.tags.type}> }
                  INSERT {
                              <https://w3id.org/toti/geo/${item.urlName}> rdf:type <https://w3id.org/toti/geo/${item.tags.type}>;
                                                  <https://w3id.org/toti/geo/administrativeLevel> ${item.tags.admin_level};
                                                  <http://www.w3.org/2002/07/owl#sameAs> <https://www.openstreetmap.org/relation/${item.id}>;
                                                  <http://www.w3.org/2002/07/owl#sameAs> <http://www.wikidata.org/entity/${item.tags.wikidata}>;
                                                  <http://www.opengis.net/ont/geosparql#hasGeometry> <https://w3id.org/toti/geo/TG${identifier}>.

                              <https://w3id.org/toti/geo/TG${identifier}> rdf:type <http://www.opengis.net/ont/geosparql#Geometry>;
                                                  <http://www.opengis.net/ont/geosparql#asWKT> "${item.wkt}".

                              <nodeID://b${identifier}> rdf:type <http://www.w3.org/2002/07/owl#Axiom>;
                                                  <http://www.w3.org/2002/07/owl#annotatedSource> <https://w3id.org/toti/geo/${item.urlName}>;
                                                  <http://www.w3.org/2002/07/owl#annotatedProperty> <https://w3id.org/toti/geo/administrativeLevel>;
                                                  <http://www.w3.org/2002/07/owl#annotatedTarget> ${item.tags.admin_level};
                                                  <http://purl.org/dc/elements/1.1/date> "${date}";
                                                  <http://purl.org/dc/terms/source> "OSM".
                              <nodeID://b${identifier+1}> rdf:type <http://www.w3.org/2002/07/owl#Axiom>;
                                                  <http://www.w3.org/2002/07/owl#annotatedSource> <https://w3id.org/toti/geo/${item.urlName}>;
                                                  <http://www.w3.org/2002/07/owl#annotatedProperty> <http://www.w3.org/2002/07/owl#sameAs>;
                                                  <http://www.w3.org/2002/07/owl#annotatedTarget> <https://www.openstreetmap.org/relation/${item.id}>;
                                                  <http://purl.org/dc/elements/1.1/date> "${date}";
                                                  <http://purl.org/dc/terms/source> "OSM".
                              <nodeID://b${identifier+2}> rdf:type <http://www.w3.org/2002/07/owl#Axiom>;
                                                  <http://www.w3.org/2002/07/owl#annotatedSource> <https://w3id.org/toti/geo/${item.urlName}>;
                                                  <http://www.w3.org/2002/07/owl#annotatedProperty> <https://w3id.org/toti/geo/administrativeLevel>;
                                                  <http://www.w3.org/2002/07/owl#annotatedTarget> <http://www.wikidata.org/entity/${item.tags.wikidata}>;
                                                  <http://purl.org/dc/elements/1.1/date> "${date}";
                                                  <http://purl.org/dc/terms/source> "OSM".
                              <nodeID://b${identifier+3}> rdf:type <http://www.w3.org/2002/07/owl#Axiom>;
                                                  <http://www.w3.org/2002/07/owl#annotatedSource> <https://w3id.org/toti/geo/${item.urlName}>;
                                                  <http://www.w3.org/2002/07/owl#annotatedProperty> <http://www.opengis.net/ont/geosparql#hasGeometry>;
                                                  <http://www.w3.org/2002/07/owl#annotatedTarget> <https://w3id.org/toti/geo/TG${identifier}>;
                                                  <http://purl.org/dc/elements/1.1/date> "${date}";
                                                  <http://purl.org/dc/terms/source> "OSM".
                              <nodeID://b${identifier+4}> rdf:type <http://www.w3.org/2002/07/owl#Axiom>;
                                                  <http://www.w3.org/2002/07/owl#annotatedSource> <https://w3id.org/toti/geo/TG${identifier}>;
                                                  <http://www.w3.org/2002/07/owl#annotatedProperty> <http://www.opengis.net/ont/geosparql#asWKT>;
                                                  <http://www.w3.org/2002/07/owl#annotatedTarget> "${item.wkt}";
                                                  <http://purl.org/dc/elements/1.1/date> "${date}";
                                                  <http://purl.org/dc/terms/source> "OSM".

                    }`;
      })



}
