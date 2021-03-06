var request = require('request');
var fs = require("fs");
var shortid = require('shortid');
var encode = require( 'hashcode' ).hashCode;
const individualCreator = require('./individualGenerator');
const fileFromTags = require('./mapFeatures');
const Sparql = require('virtuoso-sparql-client');

const COMUNE = 8;
const PROVINCIA = 6;
const REGIONE = 4;

/**
Istanzia la connessione con l'endpoint Sparql.
Legge i json con i dati da trasformare in individui.
Per ogni individuo crea una promise delle funzioni che creano le triple da inserire.
Stampa a video un feedback sul risultato dell'operazione di inserimento.
**/
exports.sparqlUpdate=(endpoint,graph,tags)=>{

        const Client = new Sparql.Client(`${endpoint}`);
        Client.setOptions("application/json");

        let promises=[];

        if(tags=="Boundary"){
          var osmDbpediaWikidata = fs.readFileSync(`../boundary.json`);
          var jsonOsmDbpediaWikidata = JSON.parse(osmDbpediaWikidata);

          for (var item of jsonOsmDbpediaWikidata){
              promises.push(insertIndividualBoundary(item,graph));
          }
        }else{
            for(let i=0;i<fileFromTags.length;i++){
              if(fileFromTags[i].key == tags)
                {
                  for(let values of fileFromTags[i].values){
                    var osmDbpediaWikidata = fs.readFileSync(`../${values["@id"]}.json`);
                    var jsonOsmDbpediaWikidata = JSON.parse(osmDbpediaWikidata);
                    console.log(jsonOsmDbpediaWikidata);
                    for (var item of jsonOsmDbpediaWikidata){
                        promises.push(insertGeneralIndividual(item,graph,tags));
                    }
                  }
                }
            }
        }



        Promise.all(promises)
        .then(results=>{
          //for(let item of results){
          for(let i=0;i<results.length;i++){
            setTimeout(function() {

              console.log(results[i]);
              Client.query(`${results[i]}`)
              .then((insertResult)=>{

                  console.log("Success");

              })
              .catch(error =>{
                  console.log(`${results[i]}`);
                  console.log(error);
              });
            }, 150*i);

          }
        })
        .catch(error=>{
            console.log(error);
        });

}

/**
Inserimento generico degli individui.
Cambiando la classe di apparteneneza di ogni individuo, ognuno di essi è istanziato nell'onotologia.
Per ogni individuo vengono inserite le opportune proprietà, i collegamenti con OSM e wikidata.
Ad ognuna di queste triple sono associai degli assiomi, nei quali salviamo la provenienza dei dati che compongono la terzina.
**/
function insertGeneralIndividual(item,graph,type) {

    return individualCreator.jsonToIndividuals(item)
      .then((item)=>{
        let date=Date.now();
        let insert= `  WITH <${graph}>
                  DELETE { <https://w3id.org/toti/geo/resource/${item.urlName}> rdf:type <https://w3id.org/toti/geo/${type}> }
                  INSERT {
                              <https://w3id.org/toti/geo/resource/${item.urlName}> rdf:type <https://w3id.org/toti/geo/${type}>.`;
                              if(item.title){
                                insert=insert+`
                                        <https://w3id.org/toti/geo/resource/${item.urlName}> <https://w3id.org/toti/tempLabel> "${item.title}.".
                                        <nodeID://b${generateId()}> rdf:type <http://www.w3.org/2002/07/owl#Axiom>;
                                                        <http://www.w3.org/2002/07/owl#annotatedSource> <https://w3id.org/toti/resource/${item.urlName}>;
                                                        <http://www.w3.org/2002/07/owl#annotatedProperty> <https://w3id.org/toti/tempLabel>;
                                                        <http://www.w3.org/2002/07/owl#annotatedTarget> "${item.title}";
                                                        <http://purl.org/dc/elements/1.1/date> "${date}";
                                                        <http://purl.org/dc/terms/source> <https://w3id.org/toti/OpenStreetMap>;
                                                        <http://www.w3.org/2000/01/rdf-schema#isDefinedBy> "https://www.openstreetmap.org/${item.type}/${item.id}".`;
                              }

                              insert=insert+`<https://w3id.org/toti/geo/resource/${item.urlName}> <http://www.w3.org/2002/07/owl#sameAs> <https://www.openstreetmap.org/${item.type}/${item.id}>;`;


                              if(item.tags.wikidata){
                                insert=insert+`
                                        <http://www.w3.org/2002/07/owl#sameAs> <http://www.wikidata.org/entity/${item.tags.wikidata}>;`;
                              }
                                              insert=insert+`<http://www.opengis.net/ont/geosparql#hasGeometry> <https://w3id.org/toti/resource/${item.geometry}>.

                              <https://w3id.org/toti/geo/resource/${item.geometry}> rdf:type <http://www.opengis.net/ont/geosparql#Geometry>;
                                                    <http://www.opengis.net/ont/geosparql#asWKT> "${item.wkt}"^^ogcgs:wktLiteral.

                    }`;

                    return insert;
      })



}

function generateId(){
  let id=""+encode().value(shortid.generate())
  if(id.includes("-")){
    return id.split("-")[1];
  }
  return id;
}

function insertIndividualBoundary(item,graph) {

    return individualCreator.jsonToIndividuals(item)
      .then((item)=>{

        let date=Date.now();
        let insert= `  WITH <${graph}>
                  DELETE { <https://w3id.org/toti/resource/${item.urlName}> rdf:type <https://w3id.org/toti/${item.tags.type}> }
                  INSERT {
                              <https://w3id.org/toti/resource/${item.urlName}> rdf:type <https://w3id.org/toti/${item.tags.type}>;
                                                  <https://w3id.org/toti/administrativeLevel> ${item.tags.admin_level};
                                                  <http://www.w3.org/2002/07/owl#sameAs> <https://www.openstreetmap.org/relation/${item.id}>;
                                                  <http://www.w3.org/2002/07/owl#sameAs> <http://www.wikidata.org/entity/${item.tags.wikidata}>;
                                                  <http://www.opengis.net/ont/geosparql#hasGeometry> <https://w3id.org/toti/resource/${item.geometry}>;`;
                              if(item.title){
                                insert=insert+`
                                        <https://w3id.org/toti/tempLabel> "${item.title}".
                                        <nodeID://b${generateId()}> rdf:type <http://www.w3.org/2002/07/owl#Axiom>;
                                                        <http://www.w3.org/2002/07/owl#annotatedSource> <https://w3id.org/toti/resource/${item.urlName}>;
                                                        <http://www.w3.org/2002/07/owl#annotatedProperty> <https://w3id.org/toti/tempLabel>;
                                                        <http://www.w3.org/2002/07/owl#annotatedTarget> "${item.title}";
                                                        <http://purl.org/dc/elements/1.1/date> "${date}";
                                                        <http://purl.org/dc/terms/source> <https://w3id.org/toti/OpenStreetMap>;
                                                        <http://www.w3.org/2000/01/rdf-schema#isDefinedBy> "https://www.openstreetmap.org/${item.type}/${item.id}".`;
                              }
                              insert=insert+`<https://w3id.org/toti/resource/${item.geometry}> rdf:type <http://www.opengis.net/ont/geosparql#Geometry>;
                                                  <http://www.opengis.net/ont/geosparql#asWKT> "${item.wkt}"^^ogcgs:wktLiteral.

                              <nodeID://b${generateId()}> rdf:type <http://www.w3.org/2002/07/owl#Axiom>;
                                                  <http://www.w3.org/2002/07/owl#annotatedSource> <https://w3id.org/toti/resource/${item.urlName}>;
                                                  <http://www.w3.org/2002/07/owl#annotatedProperty> <https://w3id.org/toti/administrativeLevel>;
                                                  <http://www.w3.org/2002/07/owl#annotatedTarget> ${item.tags.admin_level};
                                                  <http://purl.org/dc/elements/1.1/date> "${date}";
                                                  <http://purl.org/dc/terms/source> <https://w3id.org/toti/OpenStreetMap>;
                                                  <http://www.w3.org/2000/01/rdf-schema#isDefinedBy> "https://www.openstreetmap.org/${item.type}/${item.id}".
                              <nodeID://b${generateId()}> rdf:type <http://www.w3.org/2002/07/owl#Axiom>;
                                                  <http://www.w3.org/2002/07/owl#annotatedSource> <https://w3id.org/toti/resource/${item.urlName}>;
                                                  <http://www.w3.org/2002/07/owl#annotatedProperty> <http://www.w3.org/2002/07/owl#sameAs>;
                                                  <http://www.w3.org/2002/07/owl#annotatedTarget> <https://www.openstreetmap.org/relation/${item.id}>;
                                                  <http://purl.org/dc/elements/1.1/date> "${date}";
                                                  <http://purl.org/dc/terms/source> <https://w3id.org/toti/OpenStreetMap>;
                                                  <http://www.w3.org/2000/01/rdf-schema#isDefinedBy> "https://www.openstreetmap.org/${item.type}/${item.id}".
                              <nodeID://b${generateId()}> rdf:type <http://www.w3.org/2002/07/owl#Axiom>;
                                                  <http://www.w3.org/2002/07/owl#annotatedSource> <https://w3id.org/toti/resource/${item.urlName}>;
                                                  <http://www.w3.org/2002/07/owl#annotatedProperty> <https://w3id.org/toti/administrativeLevel>;
                                                  <http://www.w3.org/2002/07/owl#annotatedTarget> <http://www.wikidata.org/entity/${item.tags.wikidata}>;
                                                  <http://purl.org/dc/elements/1.1/date> "${date}";
                                                  <http://purl.org/dc/terms/source> <https://w3id.org/toti/OpenStreetMap>;
                                                  <http://www.w3.org/2000/01/rdf-schema#isDefinedBy> "https://www.openstreetmap.org/${item.type}/${item.id}".
                              <nodeID://b${generateId()}> rdf:type <http://www.w3.org/2002/07/owl#Axiom>;
                                                  <http://www.w3.org/2002/07/owl#annotatedSource> <https://w3id.org/toti/resource/${item.urlName}>;
                                                  <http://www.w3.org/2002/07/owl#annotatedProperty> <http://www.opengis.net/ont/geosparql#hasGeometry>;
                                                  <http://www.w3.org/2002/07/owl#annotatedTarget> <https://w3id.org/toti/resource/${item.geometry}>;
                                                  <http://purl.org/dc/elements/1.1/date> "${date}";
                                                  <http://purl.org/dc/terms/source> <https://w3id.org/toti/OpenStreetMap/>;
                                                  <http://www.w3.org/2000/01/rdf-schema#isDefinedBy> "https://www.openstreetmap.org/${item.type}/${item.id}".
                              <nodeID://b${generateId()}> rdf:type <http://www.w3.org/2002/07/owl#Axiom>;
                                                  <http://www.w3.org/2002/07/owl#annotatedSource> <https://w3id.org/toti/resource/${item.geometry}>;
                                                  <http://www.w3.org/2002/07/owl#annotatedProperty> <http://www.opengis.net/ont/geosparql#asWKT>;
                                                  <http://www.w3.org/2002/07/owl#annotatedTarget> "${item.wkt}"^^ogcgs:wktLiteral;
                                                  <http://purl.org/dc/elements/1.1/date> "${date}";
                                                  <http://purl.org/dc/terms/source> <https://w3id.org/toti/OpenStreetMap>;
                                                  <http://www.w3.org/2000/01/rdf-schema#isDefinedBy> "https://www.openstreetmap.org/${item.type}/${item.id}".

                    }`;
                    return insert;
      })



}
