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

            mapFeatureArray.push(jsonContent.features[k].properties);
    }

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
            return resolve(exports.relationResolve(relationItems));
            //return resolve(reject("Stefano"));
          });
        }
        return resolve(relationItems);

      });

  });
};

/**
Utilizza il modulo npm request.
Parametri:
  -Item= oggetto JSON
Crea l'oggetto json in modo appropriato, togliendo alcune informazioni dall'oggetto arrivato da Overpass .
Infine la geometry, calcolata, verrà inserita
  come coppia chiave valore all'interno dell'oggetto passato come parametro.
Return:
  - Promise
**/
exports.nodeResolve=(nodeItems)=>{
  return new Promise((resolve,reject) => {
    overpassQuery.IdQuery(nodeItems)
          .then((overpassTurbo) => {
                  let nodes=[];
                  if(overpassTurbo){
                    if(overpassTurbo.features){
                      for(let feature of overpassTurbo.features){
                          feature.properties.tags=feature.properties.tags;
                          if(feature.geometry.type == "POLYGON"){
                            feature.properties.wkt=`${feature.geometry.type}((${feature.geometry.coordinates[0]} ${feature.geometry.coordinates[1]}))`;

                          }else {
                            feature.properties.wkt=`${feature.geometry.type}(${feature.geometry.coordinates[0]} ${feature.geometry.coordinates[1]})`;

                          }

                          nodes.push(feature.properties);
                      }
                    }else{
                      console.log(overpassTurbo);
                    }
                    resolve(nodes);
                  }

            })
            .catch((error)=>{
                console.log(error);
            });
  });
};

/**
Utilizza il modulo npm request.
Parametri:
  -Item= oggetto JSON
Crea l'oggetto json in modo appropriato, togliendo alcune informazioni dall'oggetto arrivato da Overpass .
Infine la geometry, calcolata, verrà inserita
  come coppia chiave valore all'interno dell'oggetto passato come parametro.
Return:
  - Promise
**/
exports.wayResolve=(wayItems)=>{
  return new Promise((resolve,reject) => {
    overpassQuery.IdQuery(wayItems)
          .then((overpassTurbo) => {
                  let nodes=[];
                  let wkt;
                  if(overpassTurbo){
                    for(let feature of overpassTurbo.features){
                      if(feature.geometry.type == "Polygon"){
                        wkt=`${feature.geometry.type}((`;

                      }else {
                         wkt=`${feature.geometry.type}(`;
                      }
                        //feature.properties.tags=feature.properties.tags;
                        for(let geometry of feature.geometry.coordinates){
                          for(let i=0;i<geometry.length;i++){
                            wkt=wkt+geometry[i][0]+" "+geometry[i][1];
                            if((i<geometry.length-1)){
                                wkt=wkt+",";
                            }
                          }
                        }
                        if(feature.geometry.type == "Polygon"){
                          feature.properties.wkt=`${wkt}))`;

                        }else {
                          feature.properties.wkt=`${wkt})`;
                        }

                        nodes.push(feature.properties);
                    }
                  }

                  resolve(nodes);
            })
            .catch((error)=>{
                console.log(error);
            });
  });
};
