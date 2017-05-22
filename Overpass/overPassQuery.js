var queryOverpass = require('query-overpass');

/**
Utilizza il modulo npm query-overpass.
Parametri:
Effettua la chiamata al servizio query-overpass;
  la query contienete il riferimento all' area, in questo caso la Sardegna;
  specifichiama che la query si riferisce esclusivamente alle relazioni tra confini amministrativi.
Return:
  - Promise
**/
exports.boundary = () => {

  return new Promise((resolve,reject) => {

    queryOverpass('[out:json];area(3606847723)->.searchArea;(relation["boundary"="administrative"](area.searchArea););out;>;out skel qt;', function(error, geojson){
      if(error){
        return reject(error);
      }
      return resolve(geojson);
    });

  });

};

/**
Utilizza il modulo npm query-overpass.
Parametri:
Effettua la chiamata al servizio query-overpass;
  la query contienete il riferimento all' area, in questo caso la Sardegna;
  specifichiama che la query si riferisce .
Return:
  - Promise
**/
exports.generalQuery = (tags) => {

  return new Promise((resolve,reject) => {

    queryOverpass(`[out:json];area(3606847723)->.searchArea;(way[${tags}](area.searchArea);relation[${tags}](area.searchArea);node[${tags}](area.searchArea););out;>;out skel qt;`, function(error, geojson){
      if(error){
        return reject(error);
      }
      return resolve(geojson);
    });

  });

};

/**
**/
exports.IdQuery = (id) => {
  return new Promise((resolve,reject) => {
        queryOverpass(`[out:json];(${id});out;>;out skel qt;`, function(error, geojson){
          return resolve(geojson);
        });

  });
};
