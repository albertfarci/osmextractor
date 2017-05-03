var fs = require("fs");
var request = require('request');
var encode = require( 'hashcode' ).hashCode;

const COMUNE = 8;
const PROVINCIA = 6;
const REGIONE = 4;

var osmDbpediaWikidata = fs.readFileSync("./OsmDBpediaWikidata.json");

var jsonOsmDbpediaWikidata = JSON.parse(osmDbpediaWikidata);

createIndividual();

function createIndividual(){

    var individuals=`<?xml version="1.0"?>
<rdf:RDF xmlns="https://w3id.org/toti/geo/"
     xml:base="https://w3id.org/toti/geo/"
     xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
     xmlns:terms="http://purl.org/dc/terms/"
     xmlns:owl="http://www.w3.org/2002/07/owl#"
     xmlns:xml="http://www.w3.org/XML/1998/namespace"
     xmlns:xsd="http://www.w3.org/2001/XMLSchema#"
     xmlns:skos="http://www.w3.org/2004/02/skos/core#"
     xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:geosparql="http://www.opengis.net/ont/geosparql#">
    <owl:Ontology rdf:about="https://w3id.org/toti/geo/">
        <owl:imports rdf:resource="http://www.opengis.net/ont/geosparql"/>
    </owl:Ontology>



    <!--
    ///////////////////////////////////////////////////////////////////////////////////////
    //
    // Classes
    //
    ///////////////////////////////////////////////////////////////////////////////////////
     -->




    <!-- https://w3id.org/toti/geo/Comune -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/Comune">
        <rdfs:subClassOf rdf:resource="http://www.opengis.net/ont/geosparql#Feature"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/Provincia -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/Provincia">
        <rdfs:subClassOf rdf:resource="http://www.opengis.net/ont/geosparql#Feature"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/Regione -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/Regione">
        <rdfs:subClassOf rdf:resource="http://www.opengis.net/ont/geosparql#Feature"/>
    </owl:Class>`;

    for (let item of jsonOsmDbpediaWikidata){

        let identifier=encode().value( item.type + "/" +  item.id); ;

        individuals=individuals+`<owl:NamedIndividual rdf:about="https://w3id.org/toti/geo/TF${identifier}">`;

        if (item.tags.admin_level == COMUNE){
          individuals=individuals+`<rdf:type rdf:resource="https://w3id.org/toti/geo/Comune"/>`;
        } else if (item.tags.admin_level == PROVINCIA){
          individuals=individuals+`<rdf:type rdf:resource="https://w3id.org/toti/geo/Provincia"/>`;
        } else {
          individuals=individuals+`<rdf:type rdf:resource="https://w3id.org/toti/geo/Regione"/>`;
        }

        individuals=individuals+`
                <owl:sameAs rdf:resource="https://www.openstreetmap.org/relation/${item.id}"/>
                <owl:sameAs rdf:resource="http://www.wikidata.org/entity/${item.tags.wikidata}"/>`;

        if(item.dbpedia){
          individuals=individuals+`
                  <owl:sameAs rdf:resource="${item.dbpedia}"/>`;
        }

        individuals=individuals+`
                <geosparql:hasGeometry rdf:resource="https://w3id.org/toti/geo/TG${identifier}"/>
              </owl:NamedIndividual>
              <owl:NamedIndividual rdf:about="https://w3id.org/toti/geo/TG${identifier}">
                <rdf:type rdf:resource="http://www.opengis.net/ont/geosparql#Geometry"/>
                <geosparql:asWKT rdf:datatype="http://www.opengis.net/ont/geosparql#wktLiteral">${item.wkt}</geosparql:asWKT>
              </owl:NamedIndividual>
            `;


    }
    individuals=individuals+`</rdf:RDF>`;
    writeRdf(individuals);

}


function writeRdf(geojson){
  fs.writeFile('./individualsOsmDBpediaWikidata.rdf', geojson, function (err) {
    if (err)
      return console.log(err);

  });

}
