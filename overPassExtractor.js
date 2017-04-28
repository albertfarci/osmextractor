var fs = require("fs");
var request = require('request');

var queryOverpass = require('query-overpass');

var contents = fs.readFileSync("overpassTurbo.json");

var jsonContent = JSON.parse(contents);

console.log(jsonContent.features[0]);

relationExtractor(jsonContent);

function relationExtractor(jsonContent){
  let relation=[];
  for(let k in jsonContent.features) {

    if (jsonContent.features[k].properties.type=="relation"){
      //console.log(jsonContent.elements[k].id);

       relation.push(jsonContent.features[k].properties);
    }

  }

  console.log(relation[0]);

  createOsmJson(relation).then( (arrayItem) => {

      writeRdf(JSON.stringify(arrayItem));

  });
}

/**
queryOverpass('[out:json][timeout:25];area(3606847723)->.searchArea;(relation["boundary"="administrative"](area.searchArea););out;>;out skel qt;', function(error, geojson){
    console.log(error);
    console.log(geojson);
    relationExtractor(geojson);
});**/

function addItem(item){
  return new Promise((resolve,reject) => {

    request('http://polygons.openstreetmap.fr/get_wkt.py?id='+item.id+'&params=0', function (error, response, body) {
      
    
      if(error){
        return reject(error);
      }
      
      var poly=body.split(";")[1];

      item.wkt=poly;

      return resolve(item);

    });

  });
  

}

function writeRdf(geojson){
  fs.writeFile('./overpass.json', geojson, function (err) {
    if (err)
      return console.log(err);

  });
}

function createOsmJson(geoJson){

    let promises=[];

    for(var item of geoJson){

        promises.push(addItem(item));

    }

    return Promise.all(promises);

}
