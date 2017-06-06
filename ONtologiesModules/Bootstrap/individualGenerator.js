var fs = require("fs");
var request = require('request');
var shortid = require('shortid');
var encode = require( 'hashcode' ).hashCode;

const COMUNE = 8;
const PROVINCIA = 6;
const REGIONE = 4;

exports.createIndividual = (file)=> {
      let promises=[];
      var osmDbpediaWikidata = fs.readFileSync(`./${file}.json`);
      var jsonOsmDbpediaWikidata = JSON.parse(osmDbpediaWikidata);

          for (var item of jsonOsmDbpediaWikidata){
              promises.push(exports.jsonToIndividuals(item));
          }

          Promise.all(promises)
          .then(results=>{
              let i=0;
              let individuals="";
              for(let item of results){

                  let identifier=encode().value( item.type + "/" +  item.id);
                  individuals=individuals+`\n<owl:NamedIndividual rdf:about="https://w3id.org/toti/geo/${item.urlName}">`;

                    individuals=individuals+`<administrativeLevel rdf:datatype="http://www.w3.org/2001/XMLSchema#integer">${item.tags.admin_level}</administrativeLevel>`;
                    individuals=individuals+`
                            <owl:sameAs rdf:resource="https://www.openstreetmap.org/relation/${item.id}"/>`;

                    if(item.tags.wikidata){
                      individuals=individuals+`
                            <owl:sameAs rdf:resource="http://www.wikidata.org/entity/${item.tags.wikidata}"/>`;
                    }

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
                          <owl:Axiom>
                              <owl:annotatedSource rdf:resource="https://w3id.org/toti/geo/${item.urlName}"/>
                              <owl:annotatedProperty rdf:resource="https://w3id.org/toti/geo/administrativeLevel"/>
                              <owl:annotatedTarget>${item.tags.admin_level}</owl:annotatedTarget>
                              <dc:date>${Date.now()}</dc:date>
                              <terms:source>OSM</terms:source>
                          </owl:Axiom>
                          <owl:Axiom>
                              <owl:annotatedSource rdf:resource="https://w3id.org/toti/geo/${item.urlName}"/>
                              <owl:annotatedProperty rdf:resource="http://www.w3.org/2002/07/owl#sameAs"/>
                              <owl:annotatedTarget rdf:resource="https://www.openstreetmap.org/relation/${item.id}"/>
                              <dc:date>${Date.now()}</dc:date>
                              <terms:source>OSM</terms:source>
                          </owl:Axiom>
                          <owl:Axiom>
                              <owl:annotatedSource rdf:resource="https://w3id.org/toti/geo/${item.urlName}"/>
                              <owl:annotatedProperty rdf:resource="http://www.w3.org/2002/07/owl#sameAs"/>
                              <owl:annotatedTarget rdf:resource="http://www.wikidata.org/entity/${item.tags.wikidata}"/>
                              <dc:date>${Date.now()}</dc:date>
                              <terms:source>OSM</terms:source>
                          </owl:Axiom>
                          <owl:Axiom>
                              <owl:annotatedSource rdf:resource="https://w3id.org/toti/geo/${item.urlName}"/>
                              <owl:annotatedProperty rdf:resource="http://www.opengis.net/ont/geosparql#hasGeometry"/>
                              <owl:annotatedTarget rdf:resource="https://w3id.org/toti/geo/TG${identifier}"/>
                              <dc:date>${Date.now()}</dc:date>
                              <terms:source>OSM</terms:source>
                          </owl:Axiom>
                          <owl:Axiom>
                              <owl:annotatedSource rdf:resource="https://w3id.org/toti/geo/TG${identifier}"/>
                              <owl:annotatedProperty rdf:resource="http://www.opengis.net/ont/geosparql#asWKT"/>
                              <owl:annotatedTarget>"${item.wkt}"</owl:annotatedTarget>
                              <dc:date>${Date.now()}</dc:date>
                              <terms:source>OSM</terms:source>
                          </owl:Axiom>
                        `;
                      i++;

                      if(i==results.length){

                          writeRdf(individuals,file);
                      }
              }

          })
          .catch((err)=>{
            console.log("Errore");
            console.log(err);
          });
};

exports.jsonToIndividuals=(item)=>{
  return new Promise((resolve, reject) => {
      let title="", admLevel;
      item.urlName=shortid.generate();
      //let identifier=encode().value( item.type + "/" +  item.id);
      item.geometry=shortid.generate();
      if(item.tags["name"]){
        item.title=item.tags["name"];
      }else if(item.tags["name:it"]){
        item.title=item.tags["name:it"];
      } else if(item.tags["official_name"]){
        item.title=item.tags["official_name"];
      } else if(item.tags["official_name:it"]){
        item.title=item.tags["official_name:it"];
      }


      if (item.tags.admin_level == COMUNE){
        item.tags.admin_level= 3;
        item.tags.type="Comune";
      }else if (item.tags.admin_level == PROVINCIA){
        item.tags.admin_level= 2;
        item.tags.type="Provincia";
      }else if (item.tags.admin_level == REGIONE){
        item.tags.admin_level= 1;
        item.tags.type="Regione";
      }


      //console.log("UrlName",item.urlName);
      return resolve(item);

    });
};

function writeRdf(geojson,file){
  fs.writeFile(`./${file}.rdf`, geojson, function (err) {
    if (err)
      return console.log(err);

  });

}
