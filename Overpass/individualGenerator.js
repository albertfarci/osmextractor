var fs = require("fs");
var request = require('request');
var encode = require( 'hashcode' ).hashCode;

const COMUNE = 8;
const PROVINCIA = 6;
const REGIONE = 4;

exports.createIndividual = (file)=> {
      let promises=[];
      var osmDbpediaWikidata = fs.readFileSync(`./boundary.json`);
      var jsonOsmDbpediaWikidata = JSON.parse(osmDbpediaWikidata);

          for (var item of jsonOsmDbpediaWikidata){
              promises.push(jsonToIndividuals(item));
          }

          Promise.all(promises)
          .then(results=>{
              let i=0;
              for(let item of results){

                  let identifier=encode().value( item.type + "/" +  item.id);
                  individuals=individuals+`\n<owl:NamedIndividual rdf:about="https://w3id.org/toti/geo/${item.urlName}">`;

                    individuals=individuals+`<administrativeLevel rdf:datatype="http://www.w3.org/2001/XMLSchema#integer">${item.tags.admin_level}</administrativeLevel>`;
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
      let urlName, admLevel;

      let identifier=encode().value( item.type + "/" +  item.id);
      if (item.tags.admin_level == COMUNE){
        if(item.tags["name"]==="Sant'Andrea Frius" || item.tags["name"]==="Siliqua" || item.tags["name"]==="Margaxori/Morgongiori" || item.tags["name"]==="Agghju/Aggius" || item.tags["name"]==="Thiesi" ){
          urlName=item.tags["name"];
        }else{
          urlName=item.tags["name:it"];
        }
        item.tags.admin_level= 3;
        item.tags.type="Comune";
      }else if (item.tags.admin_level == PROVINCIA){
        if(item.tags["official_name"]==="Provincia del Sud Sardegna" ){
          urlName=item.tags["official_name"];
        }else{
          urlName=item.tags["official_name:it"];
        }
        item.tags.admin_level= 2;
        item.tags.type="Provincia";
      }else if (item.tags.admin_level == REGIONE){
        urlName=item.tags.name;
        item.tags.admin_level= 1;
        item.tags.type="Regione";
      }

      if(urlName.includes("/")){
          urlName.split("/")[1]
      }

      if(urlName.includes(" ") && urlName.includes("'")){
        item.urlName=urlName.split(' ').join('').split("'").join('');
      } else if(urlName.includes(" ")){
        item.urlName=urlName.split(' ').join('');
      }else if(urlName.includes("'")){
        item.urlName=urlName.split("'").join('');
      }else{
        item.urlName=urlName;
      }
      console.log(item.urlName);
      return resolve(item);

    });
};

function writeRdf(geojson,file){
  fs.writeFile(`./${file}.rdf`, geojson, function (err) {
    if (err)
      return console.log(err);

  });

}
