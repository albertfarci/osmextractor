var request = require('request');
const Sparql = require('virtuoso-sparql-client');
const Client = new Sparql.Client("http://dbpedia.org/sparql");
Client.setOptions("application/ld+json");

/**
Utilizza il modulo npm request e virtuoso-sparql-client.
Parametri:
Effettua la chiamata al servizio virtuoso-sparql-client;
  la query è un construct, ci permette di ottenere un json-ld;
  Per ottenere l'individuo desiderato cerca per riferimento entità wikidata.
Return:
  - Promise
**/
exports.individuals=(item,i)=>{

  return new Promise((resolve, reject) => {
    setTimeout(function() {
      /**Client.query(`

        PREFIX wikidata: <http://www.wikidata.org/entity/>

        construct {
        ?dbpediaId ?prop ?obj;
           owl:sameAs wikidata:${item.tags.wikidata}.
        }
        WHERE {
          {
              ?dbpediaId owl:sameAs wikidata:${item.tags.wikidata};
              ?prop ?obj.
              ?prop rdf:type owl:DatatypeProperty
            }
        union
          {
              ?dbpediaId owl:sameAs wikidata:${item.tags.wikidata};
              ?prop ?obj.
              ?prop rdf:type owl:ObjectProperty
            }
        union
          {
              ?dbpediaId owl:sameAs wikidata:${item.tags.wikidata};
              rdfs:label ?obj.
              bind(rdfs:label as ?prop)
            }

        }
      `)**/
      Client.query(`

        PREFIX wikidata: <http://www.wikidata.org/entity/>

        construct {
         ?subj ?prop ?obj
        }
        where
        {
            ?subj owl:sameAs wikidata:${item.tags.wikidata}.
            ?subj ?prop ?obj
        }


      `)
      .then((results)=>{
        if(results){
          if (results["@graph"] != undefined){
            console.log(results);
            resolve(results["@graph"][0]);
          }else{
            resolve(results);
          }

        }

      })
      .catch(reject);
    }, 1500);
  });
};
