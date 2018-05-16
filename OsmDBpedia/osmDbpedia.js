var fs = require("fs");
const individualCreator = require('./individualGenerator');
const {Client, Node, Text, Data, Triple} = require('virtuoso-sparql-client'); 

merge();

function merge(){

	if (process.argv[2]!="-i") {


		if(process.argv[2]=="-ic"){

			individualCreator.createBootIndividual(process.argv[3]);

		}else{

			var overpass = fs.readFileSync(`../ONtologiesModules/Bootstrap/Json/${process.argv[2]}.json`);
		    var jsonOverpass = JSON.parse(overpass);

			var dbpedia = fs.readFileSync(`../DBpedia/Json/${process.argv[2]}.json`);
			var jsonDbpedia = JSON.parse(dbpedia);

			let osmDbpedia=[];
			var i=0;

			for (var itemOverpass of jsonOverpass){

				if(itemOverpass.tags.wikidata){
					
					for (var itemDbpedia of jsonDbpedia){

						if(itemDbpedia["http://www.w3.org/2002/07/owl#sameAs"]){
					  		
					  		for(var sameAs of itemDbpedia["http://www.w3.org/2002/07/owl#sameAs"]){
								if(sameAs['@id'].split("http://www.wikidata.org/entity/")[1] == itemOverpass.tags.wikidata){
									itemOverpass.dbpedia={};
									itemOverpass.dbpedia.type=[];
									if(itemDbpedia['@type']){
										itemOverpass.dbpedia.type=itemDbpedia['@type'];
									}
									if(itemDbpedia['http://www.w3.org/2000/01/rdf-schema#label']){
										itemOverpass.dbpedia.label=itemDbpedia['http://www.w3.org/2000/01/rdf-schema#label'];
									}
									if(itemDbpedia['http://purl.org/dc/terms/subject']){
										itemOverpass.dbpedia.subject=itemDbpedia['http://purl.org/dc/terms/subject'];
									}
									if(itemDbpedia['http://dbpedia.org/ontology/abstract']){
										itemOverpass.dbpedia.abstract=itemDbpedia['http://dbpedia.org/ontology/abstract'];
									}
									console.log(itemOverpass.dbpedia);
								}
					  		}	
						}
		     		}
				}
				osmDbpedia.push(itemOverpass);
			}

			

			fs.writeFile(`./Json/${process.argv[2]}.json`, JSON.stringify(osmDbpedia), function (err) {
		    if (err)
		      return console.log(err);

		  	});	
		
		}

	    
	}else{

		var overpass = fs.readFileSync(`./Json/${process.argv[3]}.json`);
	    var jsonOverpass = JSON.parse(overpass);

		const SaveClient = new Client('http://localhost:8890/sparql');

        SaveClient.setOptions( 
          "application/json",
          {"ogcgs": "http://www.opengis.net/ont/geosparql#"},
          "http://www.opengis.net/ont/geosparql"
        );


        for(let item of jsonOverpass){
            
        	SaveClient.getLocalStore().add(
                  new Triple(
                    `ogcgs:${item.id}`,
                    "rdf:type",
                    "ogcgs:Feature"),
                    Triple.ADD
                  
                );

        	

            if(item.tags.name){

            	if(item.tags.name.includes('\"') ){

            		console.log("Gav",JSON.stringify(item.tags.name));

            		let str=JSON.stringify(item.tags.name);

            		SaveClient.getLocalStore().add(
	                  	new Triple(
	                    `ogcgs:${item.id}`,
	                    "rdfs:label",
	                    `${str}@en`,
	                    Triple.ADD
	                  	)
                	);
            	}else{
					SaveClient.getLocalStore().add(
	                  	new Triple(
	                    `ogcgs:${item.id}`,
	                    "rdfs:label",
	                    new Text(item.tags.name, "en"),
	                    Triple.ADD
	                  	)
                	);
            	}

                
                
            }

            if(item.wkt){
            	

            	SaveClient.getLocalStore().add(
                  new Triple(
                    `ogcgs:Tg-${item.id}`,
                    "ogcgs:asWKT",            
                    new Data(item.wkt, "ogcgs:wktLiteral"),
                    Triple.ADD
                  )
                );

                SaveClient.getLocalStore().add(
                  new Triple(
                    `ogcgs:${item.id}`,
                    "ogcgs:hasGeometry",
                    `ogcgs:Tg-${item.id}`),
                    Triple.ADD
                  
                );

            }
             

        }

        SaveClient.store(true)
        .then((result)=>{
          console.log("--",result);
        })
        .catch((err) => {
          err;
        });
            }

	

	
}
