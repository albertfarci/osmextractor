var request = require('request');
var fs = require("fs");
var shortid = require('shortid');

const Sparql = require('virtuoso-sparql-client');
const WIKIDATA = "http://www.wikidata.org/entity/";

/**
Istanzia la connessione con l'endpoint Sparql.
Legge i json con i dati da trasformare in individui.
Per ogni individuo crea una promise delle funzioni che creano le triple da inserire.
Stampa a video un feedback sul risultato dell'operazione di inserimento.
**/
exports.sparqlWikidataDBpediaLink=(individualToti,i)=>{
      return new Promise((resolve, reject) => {
        let query=encodeURIComponent(`

            PREFIX wd: <http://www.wikidata.org/entity/>

            SELECT *
            WHERE{
              BIND(<${individualToti.wikidataEntity.value}> AS ?wikidata)?dbpediaEntity schema:about ?wikidata.
              FILTER REGEX(STR(?dbpediaEntity), ".wikipedia.org/wiki/") .
            }

        `);

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
                body=JSON.parse(body);

                for(let dbpediaEntity of body.results.bindings){
                    individualToti.sameAs.link.push(dbpediaEntity.dbpediaEntity.value);
                }
                return resolve(individualToti);


            });
          }, 100*i);
        });
    }

/**
Istanzia la connessione con l'endpoint Sparql.
Legge i json con i dati da trasformare in individui.
Per ogni individuo crea una promise delle funzioni che creano le triple da inserire.
Stampa a video un feedback sul risultato dell'operazione di inserimento.
**/
exports.sparqlWikidataLabel=(individualToti,i)=>{
      return new Promise((resolve, reject) => {
        let query=encodeURIComponent(`

            SELECT ?item ?label
            WHERE{
                  <${individualToti.wikidataEntity.value}> rdfs:label ?label.
                  BIND(<${individualToti.wikidataEntity.value}>  as ?item)
            }

        `);

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
                individualToti.wikidataEntity.labels=[];
                body=JSON.parse(body);
                for(let label of body.results.bindings){
                    individualToti.wikidataEntity.labels.push(label.label);
                }
                return resolve(individualToti);


            });
          }, 100*i);
        });
    }

    /**
    Istanzia la connessione con l'endpoint Sparql.
    Legge i json con i dati da trasformare in individui.
    Per ogni individuo crea una promise delle funzioni che creano le triple da inserire.
    Stampa a video un feedback sul risultato dell'operazione di inserimento.
    **/
    exports.sparqlAllSameAs=(individualToti,i)=>{
          return new Promise((resolve, reject) => {
            const Client = new Sparql.Client(`http://db.intuit.crs4.it:8890/sparql`);
            Client.setOptions("application/json");
            Client.query(`


                SELECT ?item ?sameAs
                WHERE{
                      <${individualToti.totiEntity.value}> owl:sameAs ?sameAs.
                }


            `)
            .then((results)=>{

                if (results){
                  //console.log(results["@graph"]);
                  individualToti.sameAs={};
                  individualToti.sameAs.link=[];
                  for(let link of results.results.bindings){
                      individualToti.sameAs.link.push(link.sameAs.value);
                  }
                  return resolve(individualToti);
                }
            })
            .catch(error=>{
              console.log(error);
            });
          });
    }

/**
Istanzia la connessione con l'endpoint Sparql.
Legge i json con i dati da trasformare in individui.
Per ogni individuo crea una promise delle funzioni che creano le triple da inserire.
Stampa a video un feedback sul risultato dell'operazione di inserimento.
**/
exports.sparqlTotiWikidata=(endpoint)=>{
      return new Promise((resolve, reject) => {
        const Client = new Sparql.Client(`${endpoint}`);
        Client.setOptions("application/json");

        Client.query(`

          SELECT *
          WHERE {
            ?totiEntity owl:sameAs ?wikidataEntity
            FILTER( fn:contains (?wikidataEntity, "${WIKIDATA}"))
          }

        `)
        .then((results)=>{
            if (results){
              //console.log(results["@graph"]);
              resolve(results.results.bindings);
            }
            reject(error);
        })
        .catch(error=>{
          reject(error);
        });
      });
}

/**
Istanzia la connessione con l'endpoint Sparql.
Legge i json con i dati da trasformare in individui.
Per ogni individuo crea una promise delle funzioni che creano le triple da inserire.
Stampa a video un feedback sul risultato dell'operazione di inserimento.
**/
exports.insertTotiWikidataLabel=(individual,i)=>{
      return new Promise((resolve, reject) => {
        const Client = new Sparql.Client(`http://db.intuit.crs4.it:8890/sparql`);
        Client.setOptions("application/json");
          setTimeout(function() {
          let query=`prefix geo:<https://w3id.org/toti/geo/resource/>

                    WITH <https://w3id.org/toti/>
                    DELETE
                     { <${individual.totiEntity.value}> rdfs:label ?label  }
                    WHERE
                     {
                       <${individual.totiEntity.value}> owl:sameAs <${individual.wikidataEntity.value}>.
                       <${individual.totiEntity.value}> rdfs:label ?label
                     }
                     INSERT
                       { GRAPH <https://w3id.org/toti/>
                         { `;
          for(let label of individual.wikidataEntity.labels){
                let date=Date.now();
                query=query + `
                <${individual.totiEntity.value}> rdfs:label "${label.value}"@${label["xml:lang"]}.`;
          }

          query=query+`}
              }
              WHERE
                { GRAPH  <https://w3id.org/toti/>
                   {
                        <${individual.totiEntity.value}> owl:sameAs <${individual.wikidataEntity.value}>
                   }
                } `;



            Client.query(`${query}`)
            .then((insertResult)=>{

            })
            .catch(error =>{

                console.log(query);
                console.log(error);
            });
          }, 1500*i);

      });
}

/**
Istanzia la connessione con l'endpoint Sparql.
Legge i json con i dati da trasformare in individui.
Per ogni individuo crea una promise delle funzioni che creano le triple da inserire.
Stampa a video un feedback sul risultato dell'operazione di inserimento.
**/
exports.insertWikidataDBpediaSameAs=(individual,i)=>{
      return new Promise((resolve, reject) => {
        const Client = new Sparql.Client(`http://db.intuit.crs4.it:8890/sparql`);
        Client.setOptions("application/json");
          setTimeout(function() {
          let query=`prefix geo:<https://w3id.org/toti/geo/resource/>

                    WITH <https://w3id.org/toti/>
                    INSERT
                    { GRAPH <https://w3id.org/toti/>
                          { `;
          for(let link of individual.sameAs.link){
                query=query + `<${individual.totiEntity.value}> owl:sameAs <${link}>.`;
          }

          query=query+`}
              }`;




            Client.query(`${query}`)
            .then((insertResult)=>{

            })
            .catch(error =>{
              console.log(query);
                console.log(error);
            });
          }, 1500*i);

      });
}
