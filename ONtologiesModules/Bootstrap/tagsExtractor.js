var fs = require("fs");

var osmDbpediaWikidata = fs.readFileSync(`./boundary.json`);
var jsonOsmDbpediaWikidata = JSON.parse(osmDbpediaWikidata);

let properties=[];
for (let item in jsonOsmDbpediaWikidata){

  let obj =jsonOsmDbpediaWikidata[item].tags;

  for(let ciao in obj){
      properties.push(ciao+"\n");
  }

}
properties=properties.sort();
properties=Array.from(new Set(properties));

fs.writeFile(`./propertiesOSM.txt`, properties, function (err) {
    if (err)
      return console.log(err);

  });
