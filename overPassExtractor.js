var fs = require("fs");
var queryOverpass = require('query-overpass');

var contents = fs.readFileSync("overpassTurbo.json");

var jsonContent = JSON.parse(contents);

var relation=[];

for(var k in jsonContent.elements) {

  if (jsonContent.elements[k].type=="relation"){
    //console.log(jsonContent.elements[k].id);

     relation.push(jsonContent.elements[k]);
  }

}


createOsmJson(relation).then( (arrayItem) => {

    writeRdf(JSON.stringify(arrayItem));

});

/**
queryOverpass('[out:json][timeout:25];area(3606847723)->.searchArea;(relation["boundary"="administrative"](area.searchArea););out;>;out skel qt;', function(error, geojson){
    console.log(error);
    console.log(geojson);
    writeRdf(JSON.stringify(geojson));
});**/

function addItem(item){
  return new Promise((resolve,reject) => {

    request('http://polygons.openstreetmap.fr/get_wkt.py?id='+id+'&params=0', function (error, response, body) {
      
    
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
  fs.writeFile('./overpassTurnbo.json', geojson, function (err) {
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
