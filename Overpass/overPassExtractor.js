var fs = require("fs");
var request = require('request');

/**
Estrae dal json le features che appartengono al tipo relation,
  inserendo gli oggetti trovati in un array di supporto.
Return:
  -Array di oggetti JSON
**/
exports.relationExtractor = (jsonContent)=>{

    let relationArray=[];
    for(let k in jsonContent.features) {

      if (jsonContent.features[k].properties.type=="relation"){

         relationArray.push(jsonContent.features[k].properties);
      }
    }

    return relationArray;
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
exports.relationResolve=(item)=>{
  return new Promise((resolve,reject) => {
    request('http://polygons.openstreetmap.fr/get_wkt.py?id='+item.id+'&params=0', function (error, response, body) {

      if(error){
        return reject(error);
      }

      var poly=body.split(";")[1].split("\n")[0];
      item.wkt=poly;
      return resolve(item);

    });
  });
};
