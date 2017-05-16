const dbpediaQuery = require('./dbpediaQuery');
var fs = require("fs");

if(process.argv[2]){
    console.log(process.argv[2]);


     var osmDbpedia = fs.readFileSync(`../Overpass/${process.argv[2]}.json`);
     var jsonOsmDbpedia = JSON.parse(osmDbpedia);

     let promises=[];
     let i=0;
      //for(var item of jsonOsmDbpedia){
     for(i;i<3;i++){

        promises.push(dbpediaQuery.individuals(jsonOsmDbpedia[i],i));
            //i++;
      }

      Promise.all(promises)
      .then((results)=>{

      /**fs.writeFile(`./${process.argv[2]}.json`, JSON.stringify(results), function (err) {
          if (err)
            return console.log(err);
          if(process.argv[3]){
            console.log("err");
            individualCreator.createIndividual(process.argv[3]);
          }
      });**/
      console.log(results);

    })
    .catch((err)=>{

      console.log("Errore");
      console.log(err);
    });

}
