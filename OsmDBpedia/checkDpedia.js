var fs = require("fs");

var osmDbpedia = fs.readFileSync("./osmDbpedia.json");
var jsonosmDbpedia = JSON.parse(osmDbpedia);

checkDBpedia(jsonosmDbpedia);

function checkDBpedia(jsonArray){

    for(let item of jsonArray){

        if(!item["dbpedia"]){

            console.log(item.tags.name);

        }

    }

}
