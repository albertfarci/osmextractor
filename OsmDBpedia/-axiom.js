                          /**<owl:Axiom>
                              <owl:annotatedSource rdf:resource="https://w3id.org/toti/geo/${item.urlName}"/>
                              <owl:annotatedProperty rdf:resource="https://w3id.org/toti/geo/administrativeLevel"/>
                              <owl:annotatedTarget>${item.tags.admin_level}</owl:annotatedTarget>
                              <dc:date>${Date.now()}</dc:date>
                              <terms:source>OSM</terms:source>
                          </owl:Axiom>
                          <owl:Axiom>
                              <owl:annotatedSource rdf:resource="https://w3id.org/toti/geo/${item.urlName}"/>
                              <owl:annotatedProperty rdf:resource="http://www.w3.org/2002/07/owl#sameAs"/>
                              <owl:annotatedTarget rdf:resource="https://www.openstreetmap.org/relation/${item.id}"/>
                              <dc:date>${Date.now()}</dc:date>
                              <terms:source>OSM</terms:source>
                          </owl:Axiom>
                          <owl:Axiom>
                              <owl:annotatedSource rdf:resource="https://w3id.org/toti/geo/${item.urlName}"/>
                              <owl:annotatedProperty rdf:resource="http://www.w3.org/2002/07/owl#sameAs"/>
                              <owl:annotatedTarget rdf:resource="http://www.wikidata.org/entity/${item.tags.wikidata}"/>
                              <dc:date>${Date.now()}</dc:date>
                              <terms:source>OSM</terms:source>
                          </owl:Axiom>
                          <owl:Axiom>
                              <owl:annotatedSource rdf:resource="https://w3id.org/toti/geo/${item.urlName}"/>
                              <owl:annotatedProperty rdf:resource="http://www.opengis.net/ont/geosparql#hasGeometry"/>
                              <owl:annotatedTarget rdf:resource="https://w3id.org/toti/geo/TG${identifier}"/>
                              <dc:date>${Date.now()}</dc:date>
                              <terms:source>OSM</terms:source>
                          </owl:Axiom>
                          <owl:Axiom>
                              <owl:annotatedSource rdf:resource="https://w3id.org/toti/geo/TG${identifier}"/>
                              <owl:annotatedProperty rdf:resource="http://www.opengis.net/ont/geosparql#asWKT"/>
                              <owl:annotatedTarget>"${item.wkt}"</owl:annotatedTarget>
                              <dc:date>${Date.now()}</dc:date>
                              <terms:source>OSM</terms:source>
                          </owl:Axiom>**/