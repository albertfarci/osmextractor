var fs = require("fs");
var request = require('request');
var shortid = require('shortid');
var encode = require( 'hashcode' ).hashCode;

const COMUNE = 8;
const PROVINCIA = 6;
const REGIONE = 4;

exports.createIndividualBoundary = (file)=> {
      let promises=[];
      var osmDbpediaWikidata = fs.readFileSync(`./Json/${file}.json`);
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

                    //individuals=individuals+`<administrativeLevel rdf:datatype="http://www.w3.org/2001/XMLSchema#integer">${item.tags.admin_level}</administrativeLevel>`;
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
                            <geosparql:hasGeometry rdf:resource="https://w3id.org/toti/geo/tg_${item.id}"/>
                          </owl:NamedIndividual>
                          <owl:NamedIndividual rdf:about="https://w3id.org/toti/geo/tg_${item.id}">
                            <rdf:type rdf:resource="http://www.opengis.net/ont/geosparql#Geometry"/>
                            <geosparql:asWKT rdf:datatype="http://www.opengis.net/ont/geosparql#wktLiteral">${item.wkt}</geosparql:asWKT>
                          </owl:NamedIndividual>

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

exports.createBootIndividual = (file) => {
      let promises=[];
      var osmDbpediaWikidata = fs.readFileSync(`./Json/${file}.json`);
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
                  individuals=individuals+`\n<owl:NamedIndividual rdf:about="https://w3id.org/osmtoti/${item.id}">`;

                    individuals=individuals+`
                          <rdf:type rdf:resource="https://w3id.org/osmtoti/Destination"/>
                          <geosparql:hasGeometry rdf:resource="https://w3id.org/osmtoti/G-${item.id}"/>
                          </owl:NamedIndividual>
                          <owl:NamedIndividual rdf:about="https://w3id.org/osmtoti/G-${item.id}">
                            <rdf:type rdf:resource="http://www.opengis.net/ont/geosparql#Geometry"/>
                            <geosparql:asWKT rdf:datatype="http://www.opengis.net/ont/geosparql#wktLiteral">${item.wkt}</geosparql:asWKT>
                          </owl:NamedIndividual>
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

}


exports.jsonToIndividuals=(item)=>{
  return new Promise((resolve, reject) => {
      let title="", admLevel;
      item.urlName=shortid.generate();
      //let identifier=encode().value( item.type + "/" +  item.id);
      item.geometry=shortid.generate();
      console.log(item.properties);
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
  fs.writeFile(`./Vir/${file}.rdf`, geojson, function (err) {
    if (err)
      return console.log(err);

  });

}
