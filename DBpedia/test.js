const dbpediaQuery = require('./dbpediaQuery');
var fs = require("fs");

if(process.argv[2]){
    console.log(process.argv[2]);


     var osmDbpedia = fs.readFileSync(`../ONtologiesModules/Bootstrap/Json/${process.argv[2]}.json`);
     var jsonOsmDbpedia = JSON.parse(osmDbpedia);

     console.log("Json");

     let promises=[];
     let i=0;
      //for(var item of jsonOsmDbpedia){
      for(i;i<jsonOsmDbpedia.length;i++){
          if(jsonOsmDbpedia[i].tags.wikidata){

            console.log("CIuccia",jsonOsmDbpedia[i]);
            promises.push(dbpediaQuery.individuals(jsonOsmDbpedia[i],i));

          } 
      }

      Promise.all(promises)
      .then((results)=>{
          console.log("RESULT",results);
          fs.writeFile(`./${process.argv[2]}.json`, JSON.stringify(results), function (err) {
          if (err)
            return console.log(err);
      });
      })
      .catch((err)=>{
          console.log(err);
      });
      

    

}


