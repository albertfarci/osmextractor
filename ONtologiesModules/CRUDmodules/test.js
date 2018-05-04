const sameAsWikidata = require('./sameAsWikidata');
var fs = require("fs");



if (process.argv[2]=="-u" && process.argv[3]=="-label" && process.argv[4]=="Wikidata") {
    console.log(process.argv[2],process.argv[3],process.argv[4]);
    sameAsWikidata.sparqlTotiWikidata("http://db.intuit.crs4.it:8890/sparql")
    .then((results)=>{

        let promise=[];
        for (let i=0;i<results.length;i++) {
            promise.push(sameAsWikidata.sparqlWikidataLabel(results[i],i));
        }

        return Promise.all(promise);
    })
    .then((results)=>{
        console.log(results);
        let insertPromise=[];
        for (let i=0;i<results.length;i++) {
            insertPromise.push(sameAsWikidata.insertTotiWikidataLabel(results[i],i));
        }

        return Promise.all(insertPromise);
    })
    .then((results)=>{
        console.log("Ciuppa");
    })
    .catch((error)=>{
      console.log(error);
    });
} else if (process.argv[2]=="-u" && process.argv[3]=="-linksDbpedia" && process.argv[4]=="Wikidata") {
  console.log(process.argv[2],process.argv[3],process.argv[4]);
  sameAsWikidata.sparqlTotiWikidata("http://db.intuit.crs4.it:8890/sparql")
  .then((results)=>{
    let insertPromise=[];
    for (let i=0;i<results.length;i++) {
        insertPromise.push(sameAsWikidata.sparqlAllSameAs(results[i],i));
    }
    return Promise.all(insertPromise);
  })
  .then((results)=>{
      let promise=[];
      for (let i=0;i<results.length;i++) {
          promise.push(sameAsWikidata.sparqlWikidataDBpediaLink(results[i],i));
      }

      return Promise.all(promise);
  })
  .then((results)=>{
      let insertPromise=[];
      for (let i=0;i<results.length;i++) {
          insertPromise.push(sameAsWikidata.insertWikidataDBpediaSameAs(results[i],i));
      }

      return Promise.all(insertPromise);
  })
  .then((results)=>{
      console.log("Ciuppa");
  })
  .catch((error)=>{
    console.log(error);
  });
}
