var fs = require("fs");
var request = require('request');

const overpassQuery = require('./overpassQuery');

/**
Estrae dal json le map features,
  inserendo gli oggetti trovati in un array di supporto.
Return:
  -Array di oggetti JSON
**/
exports.mapFeatureExtractor = (jsonContent)=>{

    let mapFeatureArray=[];
    let nodeFeatureArray=[];
    let relationFeatureArray=[];
    for(let k=0;k<jsonContent.features.length;k++) {
         /**if(jsonContent.features[k].properties.type==="relation"){
            console.log(jsonContent.features[k].properties.type);
            relationFeatureArray.push(jsonContent.features[k].properties);
         }else if(jsonContent.features[k].properties.type==="node"){
            console.log(jsonContent.features[k].properties.type);**/
            mapFeatureArray.push(jsonContent.features[k].properties);
         //}
    }/**
    if(relationFeatureArray.length > 0){
        mapFeatureArray.push(relationFeatureArray);
    }
    if(nodeFeatureArray.length > 0){
        mapFeatureArray.push(nodeFeatureArray)
    }**/
    return mapFeatureArray;
};


/**
Utilizza il modulo npm request.
Parametri:
  -Item= oggetto JSON
Effettua la chiamata al servizio http://polygons.openstreetmap.fr/get_wkt.py,
  passando come paramentri l'id della relazione e specificando che la risposta
  deve essere in formato wkt.
Infine la geometry ottenuta dal servizio verrà inserita
  come coppia chiave valore all'interno dell'oggetto passato come parametro.
Return:
  - Promise
**/
//http://ustroetz.github.io/gimmeOSM/?relationID=40007
exports.relationResolve=(relationItems)=>{
  return new Promise((resolve,reject) => {

      request('http://polygons.openstreetmap.fr/get_wkt.py?id='+relationItems.id+'&params=0', function (error, response, body) {

        if(error){
          return reject(error);
        }
        if(body.includes(";")){
          var poly=body.split(";")[1].split("\n")[0];
          relationItems.wkt=poly;
          return resolve(relationItems);
        }else{
          request.post(`http://polygons.openstreetmap.fr/?id=${relationItems.id}`, function (e, r, body) {
            if(error){
              return reject(error);
            }
            return resolve(relationResolve(relationItems));
            //return resolve(reject("Stefano"));
          });
        }
        return resolve(relationItems);

      });

  });
};

/**

**/
exports.nodeResolve=(nodeItems)=>{
  return new Promise((resolve,reject) => {
    overpassQuery.IdQuery(nodeItems)
          .then((overpassTurbo) => {
                  let nodes=[];
                  if(overpassTurbo.features){
                    for(let feature of overpassTurbo.features){
                        feature.properties.tags=feature.properties.tags;
                        feature.properties.wkt=`${feature.geometry.type}(${feature.geometry.coordinates[0]} ${feature.geometry.coordinates[1]})`;
                        nodes.push(feature.properties);
                    }
                  }else{
                    console.log(overpassTurbo);
                  }

                  resolve(nodes);
            })
            .catch((error)=>{
                console.log(error);
            });
  });
};

/**

**/
exports.wayResolve=(wayItems)=>{
  return new Promise((resolve,reject) => {
    console.log("Way",wayItems);
    overpassQuery.IdQuery(wayItems)
          .then((overpassTurbo) => {
                  let nodes=[];

                  for(let feature of overpassTurbo.features){
                      let wkt=`${feature.geometry.type}(`;
                      //feature.properties.tags=feature.properties.tags;
                      for(let geometry of feature.geometry.coordinates){
                        for(let i=0;i<geometry.length;i++){
                          wkt=wkt+geometry[i][0]+" "+geometry[i][1];
                          if((i<geometry.length-1)){
                              wkt=wkt+",";
                          }
                        }
                      }
                      feature.properties.wkt=`${wkt})`;
                      nodes.push(feature.properties);
                  }
                  resolve(nodes);
            })
            .catch((error)=>{
                console.log(error);
            });
  });
};
