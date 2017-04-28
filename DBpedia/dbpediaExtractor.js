
var fs = require("fs");
var request = require('request');

var mPoli="MULTIPOLYGON(((8.11 40.725,8.11 40.74,8.145 40.775,8.14 40.8,8.195 40.87,8.19 40.88,8.195 40.89,8.18 40.895,8.17 40.915,8.155 40.925,8.155 40.95,8.19 40.99,8.19 41.01,8.2 41.02,8.195 41.035,8.205 41.055,8.24 41.07,8.255 41.09,8.25 41.1,8.265 41.125,8.295 41.125,8.31 41.14,8.325 41.14,8.37 41.1,8.37 41.08,8.36 41.07,8.355 41.045,8.34 41.03,8.32 41.03,8.305 41.04,8.285 41.04,8.275 41.03,8.285 40.99,8.265 40.965,8.255 40.965,8.255 40.915,8.295 40.875,8.315 40.865,8.34 40.865,8.36 40.875,8.405 40.87,8.455 40.84,8.51 40.84,8.595 40.865,8.61 40.875,8.615 40.895,8.675 40.92,8.7 40.94,8.785 40.94,8.845 40.99,8.85 41,8.84 41.005,8.84 41.025,8.85 41.035,8.86 41.035,8.875 41.05,8.91 41.055,8.94 41.075,8.99 41.125,8.995 41.14,9.03 41.15,9.04 41.16,9.065 41.15,9.095 41.15,9.105 41.175,9.14 41.175,9.135 41.185,9.14 41.21,9.12 41.225,9.12 41.25,9.13 41.265,9.17 41.265,9.24 41.28,9.26 41.265,9.28 41.265,9.305 41.235,9.3 41.26,9.32 41.27,9.315 41.315,9.335 41.33,9.355 41.325,9.375 41.335,9.395 41.32,9.415 41.32,9.425 41.29,9.455 41.265,9.48 41.265,9.5 41.25,9.5 41.235,9.51 41.225,9.5 41.2,9.505 41.185,9.535 41.185,9.555 41.15,9.58 41.15,9.59 41.14,9.59 41.11,9.63 41.09,9.63 41.065,9.615 41.05,9.595 41.05,9.58 41.04,9.595 41.045,9.64 41.02,9.665 41.025,9.685 41.005,9.685 40.985,9.655 40.96,9.63 40.96,9.615 40.975,9.595 40.935,9.615 40.945,9.625 40.94,9.64 40.945,9.66 40.935,9.67 40.915,9.68 40.915,9.735 40.95,9.755 40.94,9.765 40.915,9.76 40.9,9.75 40.895,9.755 40.885,9.77 40.895,9.79 40.895,9.8 40.885,9.79 40.855,9.76 40.86,9.745 40.83,9.695 40.79,9.735 40.765,9.74 40.75,9.735 40.72,9.785 40.695,9.785 40.675,9.77 40.665,9.77 40.645,9.76 40.64,9.775 40.62,9.775 40.6,9.79 40.6,9.81 40.58,9.815 40.56,9.83 40.56,9.85 40.535,9.845 40.49,9.83 40.475,9.815 40.43,9.795 40.42,9.785 40.38,9.76 40.36,9.74 40.36,9.725 40.34,9.705 40.335,9.7 40.32,9.645 40.26,9.65 40.23,9.645 40.205,9.66 40.19,9.675 40.15,9.7 40.125,9.75 40.1,9.755 40.065,9.745 40.06,9.735 40.03,9.72 40.015,9.72 39.995,9.73 39.98,9.72 39.955,9.735 39.945,9.735 39.915,9.72 39.9,9.705 39.9,9.715 39.84,9.705 39.835,9.69 39.8,9.695 39.7,9.68 39.675,9.68 39.655,9.67 39.65,9.68 39.6,9.67 39.54,9.68 39.53,9.68 39.515,9.66 39.505,9.665 39.445,9.655 39.42,9.645 39.42,9.62 39.36,9.62 39.335,9.65 39.315,9.655 39.29,9.64 39.275,9.615 39.275,9.59 39.24,9.59 39.2,9.6 39.19,9.6 39.17,9.615 39.17,9.63 39.15,9.63 39.135,9.615 39.115,9.595 39.115,9.58 39.135,9.58 39.125,9.565 39.11,9.545 39.11,9.56 39.095,9.56 39.07,9.545 39.06,9.525 39.06,9.485 39.095,9.48 39.11,9.455 39.11,9.435 39.1,9.42 39.115,9.385 39.125,9.36 39.155,9.34 39.16,9.31 39.185,9.29 39.185,9.285 39.195,9.245 39.195,9.215 39.21,9.19 39.2,9.19 39.18,9.165 39.16,9.135 39.165,9.12 39.18,9.095 39.17,9.07 39.175,9.035 39.14,9.03 39.12,9.035 39.095,9.065 39.065,9.06 39.03,9.05 39.02,9.055 39,9.04 38.97,8.995 38.955,8.985 38.94,8.93 38.91,8.92 38.89,8.86 38.855,8.79 38.865,8.76 38.895,8.735 38.905,8.715 38.89,8.695 38.895,8.68 38.88,8.675 38.855,8.635 38.845,8.615 38.86,8.615 38.87,8.585 38.885,8.585 38.91,8.6 38.925,8.6 38.935,8.58 38.935,8.555 38.965,8.555 38.98,8.545 38.99,8.55 39.025,8.52 39.04,8.485 39.035,8.47 39.02,8.47 38.975,8.46 38.96,8.47 38.955,8.47 38.925,8.46 38.915,8.44 38.915,8.43 38.925,8.43 38.94,8.405 38.935,8.385 38.95,8.375 38.98,8.34 39.03,8.33 39.1,8.305 39.075,8.265 39.075,8.23 39.095,8.225 39.12,8.19 39.135,8.19 39.16,8.205 39.165,8.22 39.185,8.24 39.185,8.255 39.2,8.29 39.2,8.305 39.205,8.31 39.215,8.33 39.215,8.345 39.2,8.345 39.18,8.33 39.17,8.335 39.155,8.33 39.105,8.36 39.135,8.38 39.135,8.395 39.12,8.415 39.125,8.39 39.145,8.385 39.17,8.335 39.22,8.335 39.235,8.35 39.25,8.365 39.25,8.415 39.29,8.415 39.3,8.4 39.315,8.38 39.32,8.355 39.365,8.36 39.395,8.38 39.42,8.39 39.42,8.36 39.445,8.36 39.465,8.37 39.49,8.395 39.505,8.43 39.545,8.435 39.575,8.445 39.585,8.445 39.605,8.43 39.62,8.43 39.665,8.42 39.685,8.43 39.7,8.425 39.765,8.445 39.79,8.465 39.79,8.48 39.78,8.49 39.76,8.525 39.795,8.535 39.845,8.52 39.855,8.515 39.885,8.48 39.885,8.46 39.87,8.45 39.84,8.425 39.84,8.41 39.86,8.415 39.875,8.39 39.88,8.375 39.9,8.38 39.955,8.37 39.965,8.37 39.985,8.39 40.01,8.36 40.015,8.355 40.04,8.385 40.07,8.4 40.075,8.45 40.07,8.465 40.085,8.465 40.11,8.445 40.135,8.435 40.17,8.435 40.22,8.46 40.27,8.445 40.3,8.43 40.3,8.42 40.315,8.4 40.32,8.385 40.315,8.365 40.325,8.355 40.365,8.375 40.39,8.38 40.425,8.365 40.445,8.36 40.47,8.35 40.48,8.33 40.48,8.315 40.495,8.305 40.535,8.28 40.565,8.26 40.56,8.255 40.55,8.185 40.555,8.175 40.54,8.155 40.54,8.13 40.56,8.13 40.585,8.12 40.59,8.125 40.635,8.155 40.655,8.17 40.655,8.175 40.675,8.165 40.675,8.155 40.695,8.145 40.695,8.11 40.725),(9.305 41.235,9.31 41.225,9.315 41.225,9.315 41.23,9.305 41.235),(9.375 41.255,9.38 41.255,9.38 41.27,9.37 41.265,9.375 41.255),(9.38 41.27,9.385 41.27,9.38 41.275,9.38 41.27)),((8.39 38.86,8.39 38.875,8.405 38.885,8.43 38.875,8.43 38.85,8.42 38.84,8.39 38.845,8.39 38.86)),((8.305 39.96,8.29 39.96,8.28 39.97,8.275 39.99,8.295 40.015,8.325 40.015,8.335 39.99,8.305 39.96)),((8.26 39.895,8.29 39.9,8.295 39.87,8.27 39.86,8.255 39.875,8.26 39.895)))";

const Sparql = require('virtuoso-sparql-client');
const Client = new Sparql.Client("http://dbpedia.org/sparql");
 
Client.setOptions("application/ld+json");
 
Client.query(`
	prefix geo:<http://www.w3.org/2003/01/geo/wgs84_pos#>
	prefix dbo: <http://dbpedia.org/ontology/>
	prefix dbp: <http://dbpedia.org/property/>
	prefix dbr: <http://dbpedia.org/resource/>

	construct {
		?a geo:geometry ?Pobj.
		?a owl:sameAs ?c
	}
	WHERE {

		?a geo:geometry ?Pobj;
		   owl:sameAs ?c.
		filter(fn:contains(?c, "http://www.wikidata.org/entity/"))
		FILTER( bif:st_within (?Pobj, bif:st_geomfromtext("${mPoli}"), 0))
	}`)
  .then((results)=>{
    writeRdf(JSON.stringify(results));
  })
  .catch((err) => {
    console.log(err);
  });

  function writeRdf(geojson){
  fs.writeFile('./dbpedia.jsonld', geojson, function (err) {
    if (err)
      return console.log(err);

  });
}