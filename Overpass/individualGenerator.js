var fs = require("fs");
var request = require('request');
var encode = require( 'hashcode' ).hashCode;

const COMUNE = 8;
const PROVINCIA = 6;
const REGIONE = 4;

exports.createIndividual = (file)=> {
  var osmDbpediaWikidata = fs.readFileSync(`./${file}.json`);

    var jsonOsmDbpediaWikidata = JSON.parse(osmDbpediaWikidata);

    var individuals=`<?xml version="1.0"?>
<rdf:RDF xmlns="https://w3id.org/toti/geo/"
     xml:base="https://w3id.org/toti/geo/"
     xmlns:tz-world="http://www.w3.org/2006/timezone-world#"
     xmlns:schema="http://schema.org/"
     xmlns:ns="http://creativecommons.org/ns#"
     xmlns:owl="http://www.w3.org/2002/07/owl#"
     xmlns:xsd="http://www.w3.org/2001/XMLSchema#"
     xmlns:skos="http://www.w3.org/2004/02/skos/core#"
     xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#"
     xmlns:wd="http://www.wikidata.org/entity/"
     xmlns:geo="http://intuit.crs4.it/vocabulary/geo/"
     xmlns:terms="http://purl.org/dc/terms/"
     xmlns:xml="http://www.w3.org/XML/1998/namespace"
     xmlns:dbr-it="http://it.dbpedia.org/resource/"
     xmlns:vann="http://purl.org/vocab/vann/"
     xmlns:prov="http://www.w3.org/ns/prov#"
     xmlns:foaf="http://xmlns.com/foaf/0.1/"
     xmlns:dbpedia="http://dbpedia.org/resource/"
     xmlns:gr="http://purl.org/goodrelations/v1#"
     xmlns:dbo="http://dbpedia.org/ontology/"
     xmlns:geosparql="http://www.opengis.net/ont/geosparql#"
     xmlns:tzont="http://www.w3.org/2006/timezone#"
     xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
     xmlns:wd-prop="http://www.wikidata.org/prop/"
     xmlns:time="http://www.w3.org/2006/time#"
     xmlns:dc="http://purl.org/dc/elements/1.1/">
    <owl:Ontology rdf:about="https://w3id.org/toti/geo/">
        <owl:imports rdf:resource="http://www.opengis.net/ont/geosparql"/>
        <owl:imports rdf:resource="http://dbpedia.org/ontology/"/>
        <owl:imports rdf:resource="http://www.w3.org/2004/02/skos/core"/>
        <dc:contributor rdf:datatype="http://www.w3.org/2000/01/rdf-schema#Literal">Intuit Team</dc:contributor>
        <rdfs:label xml:lang="en"></rdfs:label>
        <dc:title xml:lang="en"></dc:title>
        <rdfs:comment xml:lang="en"></rdfs:comment>
        <dc:format rdf:datatype="http://www.w3.org/2000/01/rdf-schema#Literal">OWL 2 DL</dc:format>
        <dc:publisher rdf:datatype="http://www.w3.org/2000/01/rdf-schema#Literal">CRS4</dc:publisher>
        <dc:creator rdf:datatype="http://www.w3.org/2000/01/rdf-schema#Literal">CRS4</dc:creator>
    </owl:Ontology>



    <!--
    ///////////////////////////////////////////////////////////////////////////////////////
    //
    // Annotation properties
    //
    ///////////////////////////////////////////////////////////////////////////////////////
     -->




    <!-- http://purl.org/dc/elements/1.1/contributor -->

    <owl:AnnotationProperty rdf:about="http://purl.org/dc/elements/1.1/contributor"/>



    <!-- http://purl.org/dc/elements/1.1/source -->

    <owl:AnnotationProperty rdf:about="http://purl.org/dc/elements/1.1/source"/>



    <!-- http://purl.org/dc/terms/description -->

    <owl:AnnotationProperty rdf:about="http://purl.org/dc/terms/description"/>



    <!-- http://purl.org/dc/terms/hasPartOf -->

    <owl:AnnotationProperty rdf:about="http://purl.org/dc/terms/hasPartOf"/>



    <!-- http://purl.org/dc/terms/hasVersion -->

    <owl:AnnotationProperty rdf:about="http://purl.org/dc/terms/hasVersion"/>



    <!-- http://purl.org/dc/terms/issued -->

    <owl:AnnotationProperty rdf:about="http://purl.org/dc/terms/issued"/>



    <!-- http://purl.org/dc/terms/modified -->

    <owl:AnnotationProperty rdf:about="http://purl.org/dc/terms/modified"/>



    <!-- http://www.w3.org/2000/01/rdf-schema#isDefinedBy -->

    <owl:AnnotationProperty rdf:about="http://www.w3.org/2000/01/rdf-schema#isDefinedBy"/>



    <!-- https://w3id.org/toti/geo/isDescribedBy -->

    <owl:AnnotationProperty rdf:about="https://w3id.org/toti/geo/isDescribedBy">
        <rdfs:range rdf:resource="http://www.w3.org/2001/XMLSchema#anyURI"/>
    </owl:AnnotationProperty>



    <!-- https://w3id.org/toti/geo/notes -->

    <owl:AnnotationProperty rdf:about="https://w3id.org/toti/geo/notes"/>



    <!--
    ///////////////////////////////////////////////////////////////////////////////////////
    //
    // Datatypes
    //
    ///////////////////////////////////////////////////////////////////////////////////////
     -->




    <!-- http://www.w3.org/2001/XMLSchema#date -->

    <rdfs:Datatype rdf:about="http://www.w3.org/2001/XMLSchema#date"/>



    <!--
    ///////////////////////////////////////////////////////////////////////////////////////
    //
    // Object Properties
    //
    ///////////////////////////////////////////////////////////////////////////////////////
     -->




    <!-- http://purl.org/dc/terms/hasPart -->

    <owl:ObjectProperty rdf:about="http://purl.org/dc/terms/hasPart">
        <owl:inverseOf rdf:resource="http://purl.org/dc/terms/isPartOf"/>
        <terms:hasVersion rdf:resource="http://dublincore.org/usage/terms/history/#hasPart-003"/>
        <terms:issued rdf:datatype="http://www.w3.org/2001/XMLSchema#date">2000-07-11</terms:issued>
        <terms:modified rdf:datatype="http://www.w3.org/2001/XMLSchema#date">2008-01-14</terms:modified>
        <rdfs:comment xml:lang="en">A related resource that is included either physically or logically in the described resource.</rdfs:comment>
        <rdfs:isDefinedBy rdf:resource="http://purl.org/dc/terms/"/>
        <rdfs:label xml:lang="it">Ha parte</rdfs:label>
        <rdfs:label xml:lang="en">Has Part</rdfs:label>
        <skos:note xml:lang="en">This term is intended to be used with non-literal values as defined in the DCMI Abstract Model (http://dublincore.org/documents/abstract-model/).  As of December 2007, the DCMI Usage Board is seeking a way to express this intention with a formal range declaration.</skos:note>
    </owl:ObjectProperty>



    <!-- http://purl.org/dc/terms/isPartOf -->

    <owl:ObjectProperty rdf:about="http://purl.org/dc/terms/isPartOf">
        <terms:hasVersion rdf:resource="http://dublincore.org/usage/terms/history/#isPartOf-003"/>
        <terms:issued rdf:datatype="http://www.w3.org/2001/XMLSchema#date">2000-07-11</terms:issued>
        <terms:modified rdf:datatype="http://www.w3.org/2001/XMLSchema#date">2008-01-14</terms:modified>
        <rdfs:comment xml:lang="en">A related resource in which the described resource is physically or logically included.</rdfs:comment>
        <rdfs:isDefinedBy rdf:resource="http://purl.org/dc/terms/"/>
        <rdfs:label xml:lang="en">Is Part Of</rdfs:label>
        <rdfs:label xml:lang="it">È parte di</rdfs:label>
        <skos:note xml:lang="en">This term is intended to be used with non-literal values as defined in the DCMI Abstract Model (http://dublincore.org/documents/abstract-model/).  As of December 2007, the DCMI Usage Board is seeking a way to express this intention with a formal range declaration.</skos:note>
    </owl:ObjectProperty>



    <!-- http://www.w3.org/2004/02/skos/core#broader -->

    <owl:ObjectProperty rdf:about="http://www.w3.org/2004/02/skos/core#broader"/>



    <!-- http://www.w3.org/2004/02/skos/core#related -->

    <owl:ObjectProperty rdf:about="http://www.w3.org/2004/02/skos/core#related"/>



    <!-- https://w3id.org/toti/geo/country -->

    <owl:ObjectProperty rdf:about="https://w3id.org/toti/geo/country">
        <rdfs:subPropertyOf rdf:resource="https://w3id.org/toti/geo/location"/>
        <rdfs:range rdf:resource="https://w3id.org/toti/geo/Country"/>
    </owl:ObjectProperty>



    <!-- https://w3id.org/toti/geo/hasAdministrativeParent -->

    <owl:ObjectProperty rdf:about="https://w3id.org/toti/geo/hasAdministrativeParent">
        <owl:inverseOf rdf:resource="https://w3id.org/toti/geo/isAdministrativeParentOf"/>
        <rdf:type rdf:resource="http://www.w3.org/2002/07/owl#FunctionalProperty"/>
    </owl:ObjectProperty>



    <!-- https://w3id.org/toti/geo/isAdministrativeParentOf -->

    <owl:ObjectProperty rdf:about="https://w3id.org/toti/geo/isAdministrativeParentOf"/>



    <!-- https://w3id.org/toti/geo/location -->

    <owl:ObjectProperty rdf:about="https://w3id.org/toti/geo/location"/>



    <!--
    ///////////////////////////////////////////////////////////////////////////////////////
    //
    // Data properties
    //
    ///////////////////////////////////////////////////////////////////////////////////////
     -->




    <!-- https://w3id.org/toti/geo/administrativeLevel -->

    <owl:DatatypeProperty rdf:about="https://w3id.org/toti/geo/administrativeLevel">
        <rdfs:domain rdf:resource="https://w3id.org/toti/geo/AdministrativeArea"/>
        <rdfs:range rdf:resource="http://www.w3.org/2001/XMLSchema#integer"/>
    </owl:DatatypeProperty>



    <!-- https://w3id.org/toti/geo/test -->

    <owl:DatatypeProperty rdf:about="https://w3id.org/toti/geo/test"/>



    <!--
    ///////////////////////////////////////////////////////////////////////////////////////
    //
    // Classes
    //
    ///////////////////////////////////////////////////////////////////////////////////////
     -->




    <!-- http://dbpedia.org/ontology/Archipelago -->

    <owl:Class rdf:about="http://dbpedia.org/ontology/Archipelago">
        <owl:equivalentClass rdf:resource="https://w3id.org/toti/geo/Archipelago"/>
    </owl:Class>



    <!-- http://dbpedia.org/ontology/Atoll -->

    <owl:Class rdf:about="http://dbpedia.org/ontology/Atoll">
        <owl:equivalentClass rdf:resource="https://w3id.org/toti/geo/Atoll"/>
    </owl:Class>



    <!-- http://dbpedia.org/ontology/Bay -->

    <owl:Class rdf:about="http://dbpedia.org/ontology/Bay">
        <owl:equivalentClass rdf:resource="https://w3id.org/toti/geo/Bay"/>
    </owl:Class>



    <!-- http://dbpedia.org/ontology/Beach -->

    <owl:Class rdf:about="http://dbpedia.org/ontology/Beach">
        <owl:equivalentClass rdf:resource="https://w3id.org/toti/geo/Beach"/>
    </owl:Class>



    <!-- http://dbpedia.org/ontology/BodyOfWater -->

    <owl:Class rdf:about="http://dbpedia.org/ontology/BodyOfWater">
        <owl:equivalentClass rdf:resource="https://w3id.org/toti/geo/BodyOfWater"/>
    </owl:Class>



    <!-- http://dbpedia.org/ontology/Canal -->

    <owl:Class rdf:about="http://dbpedia.org/ontology/Canal">
        <owl:equivalentClass rdf:resource="https://w3id.org/toti/geo/Canal"/>
    </owl:Class>



    <!-- http://dbpedia.org/ontology/Cape -->

    <owl:Class rdf:about="http://dbpedia.org/ontology/Cape">
        <owl:equivalentClass rdf:resource="https://w3id.org/toti/geo/Cape"/>
        <rdfs:subClassOf rdf:resource="http://dbpedia.org/ontology/NaturalPlace"/>
    </owl:Class>



    <!-- http://dbpedia.org/ontology/Cave -->

    <owl:Class rdf:about="http://dbpedia.org/ontology/Cave">
        <owl:equivalentClass rdf:resource="https://w3id.org/toti/geo/Cave"/>
    </owl:Class>



    <!-- http://dbpedia.org/ontology/Country -->

    <owl:Class rdf:about="http://dbpedia.org/ontology/Country">
        <owl:equivalentClass rdf:resource="https://w3id.org/toti/geo/Country"/>
    </owl:Class>



    <!-- http://dbpedia.org/ontology/Crater -->

    <owl:Class rdf:about="http://dbpedia.org/ontology/Crater">
        <owl:equivalentClass rdf:resource="https://w3id.org/toti/geo/Crater"/>
    </owl:Class>



    <!-- http://dbpedia.org/ontology/Creek -->

    <owl:Class rdf:about="http://dbpedia.org/ontology/Creek">
        <owl:equivalentClass rdf:resource="https://w3id.org/toti/geo/Creek"/>
    </owl:Class>



    <!-- http://dbpedia.org/ontology/Desert -->

    <owl:Class rdf:about="http://dbpedia.org/ontology/Desert">
        <owl:equivalentClass rdf:resource="https://w3id.org/toti/geo/Desert"/>
    </owl:Class>



    <!-- http://dbpedia.org/ontology/Forest -->

    <owl:Class rdf:about="http://dbpedia.org/ontology/Forest">
        <owl:equivalentClass rdf:resource="https://w3id.org/toti/geo/Forest"/>
        <rdfs:subClassOf rdf:resource="http://dbpedia.org/ontology/NaturalPlace"/>
    </owl:Class>



    <!-- http://dbpedia.org/ontology/Glacier -->

    <owl:Class rdf:about="http://dbpedia.org/ontology/Glacier">
        <owl:equivalentClass rdf:resource="https://w3id.org/toti/geo/Glacier"/>
    </owl:Class>



    <!-- http://dbpedia.org/ontology/HistoricalCountry -->

    <owl:Class rdf:about="http://dbpedia.org/ontology/HistoricalCountry">
        <owl:equivalentClass rdf:resource="https://w3id.org/toti/geo/HistoricalCountry"/>
    </owl:Class>



    <!-- http://dbpedia.org/ontology/HotSpring -->

    <owl:Class rdf:about="http://dbpedia.org/ontology/HotSpring">
        <owl:equivalentClass rdf:resource="https://w3id.org/toti/geo/HotSpring"/>
    </owl:Class>



    <!-- http://dbpedia.org/ontology/Island -->

    <owl:Class rdf:about="http://dbpedia.org/ontology/Island">
        <owl:equivalentClass rdf:resource="https://w3id.org/toti/geo/Island"/>
    </owl:Class>



    <!-- http://dbpedia.org/ontology/Lake -->

    <owl:Class rdf:about="http://dbpedia.org/ontology/Lake">
        <owl:equivalentClass rdf:resource="https://w3id.org/toti/geo/Lake"/>
    </owl:Class>



    <!-- http://dbpedia.org/ontology/Mountain -->

    <owl:Class rdf:about="http://dbpedia.org/ontology/Mountain">
        <owl:equivalentClass rdf:resource="https://w3id.org/toti/geo/Mountain"/>
    </owl:Class>



    <!-- http://dbpedia.org/ontology/MountainRange -->

    <owl:Class rdf:about="http://dbpedia.org/ontology/MountainRange">
        <owl:equivalentClass rdf:resource="https://w3id.org/toti/geo/MountainRange"/>
    </owl:Class>



    <!-- http://dbpedia.org/ontology/NaturalPlace -->

    <owl:Class rdf:about="http://dbpedia.org/ontology/NaturalPlace">
        <owl:equivalentClass rdf:resource="https://w3id.org/toti/geo/NaturalPlace"/>
    </owl:Class>



    <!-- http://dbpedia.org/ontology/Ocean -->

    <owl:Class rdf:about="http://dbpedia.org/ontology/Ocean">
        <owl:equivalentClass rdf:resource="https://w3id.org/toti/geo/Ocean"/>
    </owl:Class>



    <!-- http://dbpedia.org/ontology/River -->

    <owl:Class rdf:about="http://dbpedia.org/ontology/River">
        <owl:equivalentClass rdf:resource="https://w3id.org/toti/geo/River"/>
    </owl:Class>



    <!-- http://dbpedia.org/ontology/Sea -->

    <owl:Class rdf:about="http://dbpedia.org/ontology/Sea">
        <owl:equivalentClass rdf:resource="https://w3id.org/toti/geo/Sea"/>
    </owl:Class>



    <!-- http://dbpedia.org/ontology/Stream -->

    <owl:Class rdf:about="http://dbpedia.org/ontology/Stream">
        <owl:equivalentClass rdf:resource="https://w3id.org/toti/geo/Stream"/>
    </owl:Class>



    <!-- http://dbpedia.org/ontology/Valley -->

    <owl:Class rdf:about="http://dbpedia.org/ontology/Valley">
        <owl:equivalentClass rdf:resource="https://w3id.org/toti/geo/Valley"/>
    </owl:Class>



    <!-- http://dbpedia.org/ontology/Volcano -->

    <owl:Class rdf:about="http://dbpedia.org/ontology/Volcano">
        <owl:equivalentClass rdf:resource="https://w3id.org/toti/geo/Volcano"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/AdministrativeArea -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/AdministrativeArea">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/Zone"/>
        <rdfs:seeAlso>http://dbpedia.org/resource/Administrative_division</rdfs:seeAlso>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/AdministrativeDivisionOfChina -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/AdministrativeDivisionOfChina">
        <owl:equivalentClass>
            <owl:Class>
                <owl:intersectionOf rdf:parseType="Collection">
                    <rdf:Description rdf:about="https://w3id.org/toti/geo/NonSelfGoverningTerritories"/>
                    <owl:Restriction>
                        <owl:onProperty rdf:resource="https://w3id.org/toti/geo/country"/>
                        <owl:hasValue rdf:resource="https://w3id.org/toti/geo/resource/China"/>
                    </owl:Restriction>
                </owl:intersectionOf>
            </owl:Class>
        </owl:equivalentClass>
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/NonSelfGoverningTerritories"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/Archipelago -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/Archipelago">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/NaturalPlace"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/Area -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/Area">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/Zone"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/Atoll -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/Atoll">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/Island"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/Bay -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/Bay">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/BodyOfWater"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/Beach -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/Beach">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/NaturalPlace"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/BiodiversityHotspot -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/BiodiversityHotspot">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/Area"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/BodyOfWater -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/BodyOfWater">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/NaturalPlace"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/BritishOverseasTerritory -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/BritishOverseasTerritory">
        <owl:equivalentClass>
            <owl:Class>
                <owl:intersectionOf rdf:parseType="Collection">
                    <rdf:Description rdf:about="https://w3id.org/toti/geo/NonSelfGoverningTerritories"/>
                    <owl:Restriction>
                        <owl:onProperty rdf:resource="https://w3id.org/toti/geo/country"/>
                        <owl:hasValue rdf:resource="https://w3id.org/toti/geo/resource/UnitedKingdom"/>
                    </owl:Restriction>
                </owl:intersectionOf>
            </owl:Class>
        </owl:equivalentClass>
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/NonSelfGoverningTerritories"/>
        <isDescribedBy rdf:resource="http://dbpedia.org/resource/British_Overseas_Territories"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/Canal -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/Canal">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/Stream"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/Canyon -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/Canyon">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/NaturalPlace"/>
        <isDescribedBy rdf:resource="http://dbpedia.org/resource/Canyon"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/Cape -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/Cape">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/NaturalPlace"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/CaribbeanNetherlands -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/CaribbeanNetherlands">
        <owl:equivalentClass>
            <owl:Class>
                <owl:intersectionOf rdf:parseType="Collection">
                    <rdf:Description rdf:about="https://w3id.org/toti/geo/NonSelfGoverningTerritories"/>
                    <owl:Restriction>
                        <owl:onProperty rdf:resource="https://w3id.org/toti/geo/country"/>
                        <owl:hasValue rdf:resource="https://w3id.org/toti/geo/Netherlands"/>
                    </owl:Restriction>
                </owl:intersectionOf>
            </owl:Class>
        </owl:equivalentClass>
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/NonSelfGoverningTerritories"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/Cave -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/Cave">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/NaturalPlace"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/CittaMetropolitana -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/CittaMetropolitana">
        <owl:equivalentClass>
            <owl:Class>
                <owl:intersectionOf rdf:parseType="Collection">
                    <owl:Restriction>
                        <owl:onProperty rdf:resource="https://w3id.org/toti/geo/country"/>
                        <owl:hasValue rdf:resource="https://w3id.org/toti/geo/resource/Italy"/>
                    </owl:Restriction>
                    <owl:Restriction>
                        <owl:onProperty rdf:resource="https://w3id.org/toti/geo/administrativeLevel"/>
                        <owl:hasValue rdf:datatype="http://www.w3.org/2001/XMLSchema#integer">2</owl:hasValue>
                    </owl:Restriction>
                </owl:intersectionOf>
            </owl:Class>
        </owl:equivalentClass>
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/AdministrativeArea"/>
        <rdfs:label xml:lang="it">Città metropolitana</rdfs:label>
        <rdfs:label xml:lang="en">Metropolitan City</rdfs:label>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/City -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/City">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/Settlement"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/ColdDesert -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/ColdDesert">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/Desert"/>
        <isDescribedBy rdf:resource="http://dbpedia.org/resource/"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/Comune -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/Comune">
        <owl:equivalentClass>
            <owl:Class>
                <owl:intersectionOf rdf:parseType="Collection">
                    <owl:Restriction>
                        <owl:onProperty rdf:resource="https://w3id.org/toti/geo/country"/>
                        <owl:hasValue rdf:resource="https://w3id.org/toti/geo/resource/Italy"/>
                    </owl:Restriction>
                    <owl:Restriction>
                        <owl:onProperty rdf:resource="https://w3id.org/toti/geo/administrativeLevel"/>
                        <owl:hasValue rdf:datatype="http://www.w3.org/2001/XMLSchema#integer">3</owl:hasValue>
                    </owl:Restriction>
                </owl:intersectionOf>
            </owl:Class>
        </owl:equivalentClass>
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/AdministrativeArea"/>
        <terms:description xml:lang="it">Comune: ente amministrativo determinato da precisi limiti territoriali sui quali insiste una porzione di popolazione</terms:description>
        <rdfs:label xml:lang="it">Comune</rdfs:label>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/Continent -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/Continent">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/GeographicalGrouping"/>
        <rdfs:isDefinedBy rdf:resource="dbpedia:Continent"/>
        <rdfs:label xml:lang="en">Continent</rdfs:label>
        <rdfs:label xml:lang="fr">Continent</rdfs:label>
        <rdfs:label xml:lang="es">Continente</rdfs:label>
        <rdfs:label xml:lang="it">Continente</rdfs:label>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/Country -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/Country">
        <owl:equivalentClass>
            <owl:Restriction>
                <owl:onProperty rdf:resource="https://w3id.org/toti/geo/administrativeLevel"/>
                <owl:hasValue rdf:datatype="http://www.w3.org/2001/XMLSchema#integer">0</owl:hasValue>
            </owl:Restriction>
        </owl:equivalentClass>
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/AdministrativeArea"/>
        <terms:description xml:lang="it">Stato: Entita politica che governa ed esercita il potere sovrano su un determinato territorio e sui soggetti ad esso appartenenti</terms:description>
        <rdfs:label xml:lang="en">Country</rdfs:label>
        <rdfs:label xml:lang="es">Pais</rdfs:label>
        <rdfs:label xml:lang="fr">Pay</rdfs:label>
        <rdfs:label xml:lang="it">Stato</rdfs:label>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/CountryGrouping -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/CountryGrouping">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/Zone"/>
        <rdfs:label xml:lang="es">Agrupacion de paises</rdfs:label>
        <rdfs:label xml:lang="en">Country grouping</rdfs:label>
        <rdfs:label xml:lang="fr">Groupement de pays</rdfs:label>
        <rdfs:label xml:lang="it">Raggruppamento di paesi</rdfs:label>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/CountryWithinTheKingdomOfDenmark -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/CountryWithinTheKingdomOfDenmark">
        <owl:equivalentClass>
            <owl:Class>
                <owl:intersectionOf rdf:parseType="Collection">
                    <rdf:Description rdf:about="https://w3id.org/toti/geo/NonSelfGoverningTerritories"/>
                    <owl:Restriction>
                        <owl:onProperty rdf:resource="https://w3id.org/toti/geo/country"/>
                        <owl:hasValue rdf:resource="https://w3id.org/toti/geo/resource/Denmark"/>
                    </owl:Restriction>
                </owl:intersectionOf>
            </owl:Class>
        </owl:equivalentClass>
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/NonSelfGoverningTerritories"/>
        <isDescribedBy>http://dbpedia.org/page/Danish_Realm</isDescribedBy>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/Crater -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/Crater">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/NaturalPlace"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/Creek -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/Creek">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/Stream"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/CulturalRegion -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/CulturalRegion">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/Area"/>
        <rdfs:isDefinedBy rdf:resource="dbpedia:Cultural_area"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/DependentTerritoryUSA -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/DependentTerritoryUSA">
        <owl:equivalentClass>
            <owl:Class>
                <owl:intersectionOf rdf:parseType="Collection">
                    <rdf:Description rdf:about="https://w3id.org/toti/geo/NonSelfGoverningTerritories"/>
                    <owl:Restriction>
                        <owl:onProperty rdf:resource="https://w3id.org/toti/geo/country"/>
                        <owl:hasValue rdf:resource="https://w3id.org/toti/geo/resource/USA"/>
                    </owl:Restriction>
                </owl:intersectionOf>
            </owl:Class>
        </owl:equivalentClass>
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/NonSelfGoverningTerritories"/>
        <isDescribedBy>http://dbpedia.org/page/Territories_of_the_United_States</isDescribedBy>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/DependetTerritoryNorway -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/DependetTerritoryNorway">
        <owl:equivalentClass>
            <owl:Class>
                <owl:intersectionOf rdf:parseType="Collection">
                    <rdf:Description rdf:about="https://w3id.org/toti/geo/NonSelfGoverningTerritories"/>
                    <owl:Restriction>
                        <owl:onProperty rdf:resource="https://w3id.org/toti/geo/country"/>
                        <owl:hasValue rdf:resource="https://w3id.org/toti/geo/resource/Norway"/>
                    </owl:Restriction>
                </owl:intersectionOf>
            </owl:Class>
        </owl:equivalentClass>
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/NonSelfGoverningTerritories"/>
        <isDescribedBy>http://dbpedia.org/page/Dependencies_of_Norway</isDescribedBy>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/Desert -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/Desert">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/NaturalPlace"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/DesertPavement -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/DesertPavement">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/HotDesert"/>
        <isDescribedBy rdf:resource="http://dbpedia.org/resource/Desert_pavement"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/DuneSea -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/DuneSea">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/HotDesert"/>
        <isDescribedBy rdf:resource="http://dbpedia.org/resource/Erg_(landform)"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/EconomicGrouping -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/EconomicGrouping">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/CountryGrouping"/>
        <rdfs:label xml:lang="es">Agrupacion economica</rdfs:label>
        <rdfs:label xml:lang="en">Economic grouping</rdfs:label>
        <rdfs:label xml:lang="fr">Groupement economique</rdfs:label>
        <rdfs:label xml:lang="it">Raggruppamento economico</rdfs:label>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/EthnicAndReligiousGrouping -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/EthnicAndReligiousGrouping">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/CountryGrouping"/>
        <rdfs:label xml:lang="es">Agrupacion etnico religiosa</rdfs:label>
        <rdfs:label xml:lang="en">Ethnic and religious grouping</rdfs:label>
        <rdfs:label xml:lang="fr">Groupement ethnique et religieux</rdfs:label>
        <rdfs:label xml:lang="it">Raggruppamento etnico e religioso</rdfs:label>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/Fjord -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/Fjord">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/BodyOfWater"/>
        <isDescribedBy rdf:resource="http://dbpedia.org/resource/Fjord"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/Forest -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/Forest">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/NaturalPlace"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/FreeAssociationNewZealand -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/FreeAssociationNewZealand">
        <owl:equivalentClass>
            <owl:Class>
                <owl:intersectionOf rdf:parseType="Collection">
                    <rdf:Description rdf:about="https://w3id.org/toti/geo/NonSelfGoverningTerritories"/>
                    <owl:Restriction>
                        <owl:onProperty rdf:resource="https://w3id.org/toti/geo/country"/>
                        <owl:hasValue rdf:resource="https://w3id.org/toti/geo/resource/NewZealand"/>
                    </owl:Restriction>
                </owl:intersectionOf>
            </owl:Class>
        </owl:equivalentClass>
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/NonSelfGoverningTerritories"/>
        <isDescribedBy>http://dbpedia.org/page/Realm_of_New_Zealand</isDescribedBy>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/GeographicalGrouping -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/GeographicalGrouping">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/CountryGrouping"/>
        <rdfs:label xml:lang="es">Agrupacion geografica</rdfs:label>
        <rdfs:label xml:lang="en">Geographical groupings</rdfs:label>
        <rdfs:label xml:lang="fr">Groupement geographique</rdfs:label>
        <rdfs:label xml:lang="it">Raggruppamento geografico</rdfs:label>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/GeographicalPart -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/GeographicalPart">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/Area"/>
        <rdfs:comment xml:lang="it">Ripartizione geografica: Nord-Ovest, Nord-Est, Centro, Sud, Isole</rdfs:comment>
        <rdfs:label xml:lang="it">Ripartizione Geografica</rdfs:label>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/Geyser -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/Geyser">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/NaturalPlace"/>
        <isDescribedBy rdf:resource="http://dbpedia.org/resource/Geyser"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/Glacier -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/Glacier">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/NaturalPlace"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/Gorge -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/Gorge">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/Canyon"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/Grove -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/Grove">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/Woodland"/>
        <isDescribedBy rdf:resource="http://dbpedia.org/Grove_(nature)"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/Hamada -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/Hamada">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/HotDesert"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/Hamlet -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/Hamlet">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/Settlement"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/Hill -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/Hill">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/NaturalPlace"/>
        <isDescribedBy rdf:resource="http://dbpedia.org/resource/Hill"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/HistoricPlace -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/HistoricPlace">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/Zone"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/HistoricalCountry -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/HistoricalCountry">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/Country"/>
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/HistoricPlace"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/HotDesert -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/HotDesert">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/Desert"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/HotSpring -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/HotSpring">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/BodyOfWater"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/IncorporatedUnorganizedTerritory -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/IncorporatedUnorganizedTerritory">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/DependentTerritoryUSA"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/Island -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/Island">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/NaturalPlace"/>
        <isDescribedBy rdf:resource="http://dbpedia.org/resource/Island"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/Jungle -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/Jungle">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/Forest"/>
        <isDescribedBy rdf:resource="http://dbpedia.org/resource/Jungle"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/Lagoon -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/Lagoon">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/BodyOfWater"/>
        <isDescribedBy rdf:resource="http://dbpedia.org/resource/Lagoon"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/Lake -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/Lake">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/BodyOfWater"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/MilitaryArea -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/MilitaryArea">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/Area"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/Mountain -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/Mountain">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/NaturalPlace"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/MountainRange -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/MountainRange">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/NaturalPlace"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/NationalPark -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/NationalPark">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/Park"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/NaturalPlace -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/NaturalPlace">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/Zone"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/NonSelfGoverningTerritories -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/NonSelfGoverningTerritories">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/AdministrativeArea"/>
        <owl:disjointWith rdf:resource="https://w3id.org/toti/geo/State"/>
        <rdfs:label xml:lang="en">Non-self governing territories</rdfs:label>
        <rdfs:label xml:lang="fr">Territoire non autonome</rdfs:label>
        <rdfs:label xml:lang="it">Territori non autonomi</rdfs:label>
        <rdfs:label xml:lang="es">Territorio no autonomo</rdfs:label>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/Oasis -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/Oasis">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/NaturalPlace"/>
        <isDescribedBy rdf:resource="http://dbpedia.org/resource/Oasis"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/Ocean -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/Ocean">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/BodyOfWater"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/OverseasCollectivity -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/OverseasCollectivity">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/OverseasFrance"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/OverseasDepartment -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/OverseasDepartment">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/OverseasFrance"/>
        <isDescribedBy rdf:resource="http://dbpedia.org/resource/Overseas_department"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/OverseasFrance -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/OverseasFrance">
        <owl:equivalentClass>
            <owl:Class>
                <owl:intersectionOf rdf:parseType="Collection">
                    <rdf:Description rdf:about="https://w3id.org/toti/geo/NonSelfGoverningTerritories"/>
                    <owl:Restriction>
                        <owl:onProperty rdf:resource="https://w3id.org/toti/geo/country"/>
                        <owl:hasValue rdf:resource="https://w3id.org/toti/geo/resource/France"/>
                    </owl:Restriction>
                </owl:intersectionOf>
            </owl:Class>
        </owl:equivalentClass>
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/NonSelfGoverningTerritories"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/OverseasTerritory -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/OverseasTerritory">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/OverseasFrance"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/Park -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/Park">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/Zone"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/PolarDesert -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/PolarDesert">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/Desert"/>
        <isDescribedBy rdf:resource="http://dbpedia.org/resource/Polar_desert"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/PoliticalGrouping -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/PoliticalGrouping">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/CountryGrouping"/>
        <rdfs:label xml:lang="es">Agrupacion politica</rdfs:label>
        <rdfs:label xml:lang="fr">Groupement politique</rdfs:label>
        <rdfs:label xml:lang="en">Political grouping</rdfs:label>
        <rdfs:label xml:lang="it">Raggruppamento politico</rdfs:label>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/Pond -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/Pond">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/BodyOfWater"/>
        <isDescribedBy rdf:resource="http://dbpedia.org/resource/Pond"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/ProtectedArea -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/ProtectedArea">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/Park"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/Provincia -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/Provincia">
        <owl:equivalentClass>
            <owl:Class>
                <owl:intersectionOf rdf:parseType="Collection">
                    <owl:Restriction>
                        <owl:onProperty rdf:resource="https://w3id.org/toti/geo/country"/>
                        <owl:hasValue rdf:resource="https://w3id.org/toti/geo/resource/Italy"/>
                    </owl:Restriction>
                    <owl:Restriction>
                        <owl:onProperty rdf:resource="https://w3id.org/toti/geo/administrativeLevel"/>
                        <owl:hasValue rdf:datatype="http://www.w3.org/2001/XMLSchema#integer">2</owl:hasValue>
                    </owl:Restriction>
                </owl:intersectionOf>
            </owl:Class>
        </owl:equivalentClass>
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/AdministrativeArea"/>
        <terms:description xml:lang="it">Provincia: ente locale avente una competenza su un gruppo di comuni, non necessariamente contigui</terms:description>
        <rdfs:label xml:lang="it">Provincia</rdfs:label>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/Regione -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/Regione">
        <owl:equivalentClass>
            <owl:Class>
                <owl:intersectionOf rdf:parseType="Collection">
                    <owl:Restriction>
                        <owl:onProperty rdf:resource="https://w3id.org/toti/geo/country"/>
                        <owl:hasValue rdf:resource="https://w3id.org/toti/geo/resource/Italy"/>
                    </owl:Restriction>
                    <owl:Restriction>
                        <owl:onProperty rdf:resource="https://w3id.org/toti/geo/administrativeLevel"/>
                        <owl:hasValue rdf:datatype="http://www.w3.org/2001/XMLSchema#integer">1</owl:hasValue>
                    </owl:Restriction>
                </owl:intersectionOf>
            </owl:Class>
        </owl:equivalentClass>
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/AdministrativeArea"/>
        <terms:description xml:lang="it">Regione: ente territoriale presente nell&apos;ordinamento giuridico Italiano</terms:description>
        <rdfs:label xml:lang="it">Regione</rdfs:label>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/River -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/River">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/Stream"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/RiverDelta -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/RiverDelta">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/NaturalPlace"/>
        <isDescribedBy rdf:resource="http://dbpedia.org/resource/River_delta"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/Sea -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/Sea">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/BodyOfWater"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/Settlement -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/Settlement">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/Zone"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/Slum -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/Slum">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/Settlement"/>
        <notes>Numerous other terms are often used interchangeably with slum: shanty town, favela, rookery, gecekondu, skid row, barrio, ghetto, bidonville, taudis, bandas de miseria, barrio marginal, morro, loteamento, barraca, musseque, tugurio, solares, mudun safi, karyan, medina achouaia, brarek, ishash, galoos, tanake, baladi, hrushebi, chalis, katras, zopadpattis, bustee, estero, looban, dagatan, umjondolo, watta, udukku, and chereka bete.</notes>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/SovereignState -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/SovereignState">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/Country"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/State -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/State">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/AdministrativeArea"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/StateWithLimitedRecognition -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/StateWithLimitedRecognition">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/Country"/>
        <isDescribedBy>http://dbpedia.org/page/List_of_states_with_limited_recognition</isDescribedBy>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/Stream -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/Stream">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/BodyOfWater"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/Town -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/Town">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/Settlement"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/UnincorporatedOrganizedTerritory -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/UnincorporatedOrganizedTerritory">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/DependentTerritoryUSA"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/UnincorporatedUnorganizedTerritory -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/UnincorporatedUnorganizedTerritory">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/DependentTerritoryUSA"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/UrbanPark -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/UrbanPark">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/Park"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/Valley -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/Valley">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/NaturalPlace"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/Village -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/Village">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/Settlement"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/Volcano -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/Volcano">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/NaturalPlace"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/Waterfall -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/Waterfall">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/BodyOfWater"/>
        <isDescribedBy rdf:resource="http://dbpedia.org/resource/Waterfall"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/WineRegion -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/WineRegion">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/Area"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/Woodland -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/Woodland">
        <rdfs:subClassOf rdf:resource="https://w3id.org/toti/geo/NaturalPlace"/>
        <isDescribedBy rdf:resource="http://dbpedia.org/resource/"/>
    </owl:Class>



    <!-- https://w3id.org/toti/geo/Zone -->

    <owl:Class rdf:about="https://w3id.org/toti/geo/Zone">
        <rdfs:subClassOf rdf:resource="http://www.opengis.net/ont/geosparql#Feature"/>
    </owl:Class>`;

    for (let item of jsonOsmDbpediaWikidata){
        let identifier, urlName, admLevel;
        identifier=encode().value( item.type + "/" +  item.id);

        if (item.tags.admin_level == COMUNE){
          urlName = cleanNameForIri(name:it)
          admLevel= 3;
        } else if (item.tags.admin_level == PROVINCIA){
          urlName = cleanNameForIri(official_name)
          admLevel= 2;
        } else if (item.tags.admin_level == REGIONE){{
          urlName = cleanNameForIri(name:it)
          admLevel= 1;
        } else {
          //DO NOTHING
        }
        individuals=individuals+`<owl:NamedIndividual rdf:about="https://w3id.org/toti/geo/${urlName}">`;
        individuals=individuals+`<administrativeLevel rdf:datatype="http://www.w3.org/2001/XMLSchema#integer">${admLevel}</administrativeLevel>`;

        if (item.tags.name ){
          individuals=individuals+`<foaf:name >${item.tags.name}</foaf:name>`;
        }
        if (item.tags["name:ar"]){
          individuals=individuals+`<foaf:name xml:lang="ar">${item.tags["name:ar"]}</foaf:name>`;
        }
        if (item.tags["name:ca"]){
          individuals=individuals+`<foaf:name xml:lang="ca">${item.tags["name:ca"]}</foaf:name>`;
        }
        if (item.tags["name:co"]){
          individuals=individuals+`<foaf:name xml:lang="co">${item.tags["name:co"]}</foaf:name>`;
        }
        if (item.tags["name:cs"]){
          individuals=individuals+`<foaf:name xml:lang="cs">${item.tags["name:cs"]}</foaf:name>`;
        }
        if (item.tags["name:de"]){
          individuals=individuals+`<foaf:name xml:lang="de">${item.tags["name:de"]}</foaf:name>`;
        }
        if (item.tags["name:el"]){
          individuals=individuals+`<foaf:name xml:lang="el">${item.tags["name:el"]}</foaf:name>`;
        }
        if (item.tags["name:en"]){
          individuals=individuals+`<foaf:name xml:lang="en">${item.tags["name:en"]}</foaf:name>`;
        }
        if (item.tags["name:eo"]){
          individuals=individuals+`<foaf:name xml:lang="eo">${item.tags["name:eo"]}</foaf:name>`;
        }
        if (item.tags["name:es"]){
          individuals=individuals+`<foaf:name xml:lang="es">${item.tags["name:es"]}</foaf:name>`;
        }
        if (item.tags["name:eu"]){
          individuals=individuals+`<foaf:name xml:lang="eu">${item.tags["name:eu"]}</foaf:name>`;
        }
        if (item.tags["name:fa"]){
          individuals=individuals+`<foaf:name xml:lang="fa">${item.tags["name:fa"]}</foaf:name>`;
        }
        if (item.tags["name:fi"]){
          individuals=individuals+`<foaf:name xml:lang="fi">${item.tags["name:fi"]}</foaf:name>`;
        }
        if (item.tags["name:fr"]){
          individuals=individuals+`<foaf:name xml:lang="fr">${item.tags["name:fr"]}</foaf:name>`;
        }
        if (item.tags["name:fur"]){
          individuals=individuals+`<foaf:name xml:lang="fur">${item.tags["name:fur"]}</foaf:name>`;
        }
        if (item.tags["name:hsb"]){
          individuals=individuals+`<foaf:name xml:lang="hsb">${item.tags["name:hsb"]}</foaf:name>`;
        }
        if (item.tags["name:hu"]){
          individuals=individuals+`<foaf:name xml:lang="hu">${item.tags["name:hu"]}</foaf:name>`;
        }
        if (item.tags["name:it"]){
          individuals=individuals+`<foaf:name xml:lang="it">${item.tags["name:it"]}</foaf:name>`;
        }
        if (item.tags["name:kn"]){
          individuals=individuals+`<foaf:name xml:lang="kn">${item.tags["name:kn"]}</foaf:name>`;
        }
        if (item.tags["name:ku"]){
          individuals=individuals+`<foaf:name xml:lang="ku">${item.tags["name:ku"]}</foaf:name>`;
        }
        if (item.tags["name:la"]){
          individuals=individuals+`<foaf:name xml:lang="la">${item.tags["name:la"]}</foaf:name>`;
        }
        if (item.tags["name:pl"]){
          individuals=individuals+`<foaf:name xml:lang="pl">${item.tags["name:pl"]}</foaf:name>`;
        }
        if (item.tags["name:pt"]){
          individuals=individuals+`<foaf:name xml:lang="pt">${item.tags["name:pt"]}</foaf:name>`;
        }
        if (item.tags["name:ro"]){
          individuals=individuals+`<foaf:name xml:lang="ro">${item.tags["name:ro"]}</foaf:name>`;
        }
        if (item.tags["name:ru"]){
          individuals=individuals+`<foaf:name xml:lang="ru">${item.tags["name:ru"]}</foaf:name>`;
        }
        if (item.tags["name:sc"]){
          individuals=individuals+`<foaf:name xml:lang="sc">${item.tags["name:sc"]}</foaf:name>`;
        }
        if (item.tags["name:scn"]){
          individuals=individuals+`<foaf:name xml:lang="scn">${item.tags["name:scn"]}</foaf:name>`;
        }
        if (item.tags["name:sdc"]){
          individuals=individuals+`<foaf:name xml:lang="sdc">${item.tags["name:sdc"]}</foaf:name>`;
        }
        if (item.tags["name:sdn"]){
          individuals=individuals+`<foaf:name xml:lang="sdn">${item.tags["name:sdn"]}</foaf:name>`;
        }
        if (item.tags["name:sk"]){
          individuals=individuals+`<foaf:name xml:lang="sk">${item.tags["name:sk"]}</foaf:name>`;
        }
        if (item.tags["name:sl"]){
          individuals=individuals+`<foaf:name xml:lang="sl">${item.tags["name:sl"]}</foaf:name>`;
        }
        if (item.tags["name:zh"]){
          individuals=individuals+`<foaf:name xml:lang="zh">${item.tags["name:zh"]}</foaf:name>`;
        }

        if (item.tags["alt_name"]){
          individuals=individuals+`<skos:altLabel>${item.tags["alt_name"]}</skos:altLabel>`;
        }
        if (item.tags["alt_name:co"]){
          individuals=individuals+`<skos:altLabel xml:lang="co">${item.tags["alt_name:co"]}</skos:altLabel>`;
        }
        if (item.tags["alt_name:sc"]){
          individuals=individuals+`<skos:altLabel xml:lang="co">${item.tags["alt_name:sc"]}</skos:altLabel>`;
        }
        if (item.tags["note"]){
          individuals=individuals+`<skos:note xml:lang="co">${item.tags["note"]}</skos:note>`;
        }
        if (item.tags["population"]){
          individuals=individuals+`<skos:note xml:lang="co">${item.tags["population"]}</skos:note>`;
        }

        individuals=individuals+`
                <owl:sameAs rdf:resource="https://www.openstreetmap.org/relation/${item.id}"/>
                <owl:sameAs rdf:resource="http://www.wikidata.org/entity/${item.tags.wikidata}"/>`;

        if(item.dbpedia){
          individuals=individuals+`
                  <owl:sameAs rdf:resource="${item.dbpedia}"/>`;
        }

        individuals=individuals+`
                <geosparql:hasGeometry rdf:resource="https://w3id.org/toti/geo/TG${identifier}"/>
              </owl:NamedIndividual>
              <owl:NamedIndividual rdf:about="https://w3id.org/toti/geo/TG${identifier}">
                <rdf:type rdf:resource="http://www.opengis.net/ont/geosparql#Geometry"/>
                <geosparql:asWKT rdf:datatype="http://www.opengis.net/ont/geosparql#wktLiteral">${item.wkt}</geosparql:asWKT>
              </owl:NamedIndividual>
            `;


    }
    individuals=individuals+`
                <!--
                ///////////////////////////////////////////////////////////////////////////////////////
                //
                // Annotations
                //
                ///////////////////////////////////////////////////////////////////////////////////////
                 -->

                <rdf:Description rdf:about="http://www.w3.org/2004/02/skos/core#changeNote">
                    <rdfs:isDefinedBy rdf:resource="http://www.w3.org/2004/02/skos/core"/>
                    <rdfs:comment xml:lang="en">A note about a modification to a concept.</rdfs:comment>
                    <rdfs:label xml:lang="en">change note</rdfs:label>
                </rdf:Description>
                <rdf:Description rdf:about="http://www.w3.org/2004/02/skos/core#editorialNote">
                    <rdfs:label xml:lang="en">editorial note</rdfs:label>
                    <rdfs:comment xml:lang="en">A note for an editor, translator or maintainer of the vocabulary.</rdfs:comment>
                    <rdfs:isDefinedBy rdf:resource="http://www.w3.org/2004/02/skos/core"/>
                </rdf:Description>
                <rdf:Description rdf:about="http://www.w3.org/2004/02/skos/core#historyNote">
                    <rdfs:comment xml:lang="en">A note about the past state/use/meaning of a concept.</rdfs:comment>
                    <rdfs:isDefinedBy rdf:resource="http://www.w3.org/2004/02/skos/core"/>
                    <rdfs:label xml:lang="en">history note</rdfs:label>
                </rdf:Description>
                <rdf:Description rdf:about="http://www.w3.org/2004/02/skos/core#notation">
                    <rdfs:isDefinedBy rdf:resource="http://www.w3.org/2004/02/skos/core"/>
                    <rdfs:comment xml:lang="en">A notation, also known as classification code, is a string of characters such as &quot;T58.5&quot; or &quot;303.4833&quot; used to uniquely identify a concept within the scope of a given concept scheme.</rdfs:comment>
                    <rdfs:label xml:lang="en">notation</rdfs:label>
                    <rdfs:comment xml:lang="en">By convention, skos:notation is used with a typed literal in the object position of the triple.</rdfs:comment>
                </rdf:Description>



                <!--
                ///////////////////////////////////////////////////////////////////////////////////////
                //
                // General axioms
                //
                ///////////////////////////////////////////////////////////////////////////////////////
                 -->

                <rdf:Description>
                    <rdf:type rdf:resource="http://www.w3.org/2002/07/owl#AllDisjointClasses"/>
                    <owl:members rdf:parseType="Collection">
                        <rdf:Description rdf:about="https://w3id.org/toti/geo/AdministrativeArea"/>
                        <rdf:Description rdf:about="https://w3id.org/toti/geo/Area"/>
                        <rdf:Description rdf:about="https://w3id.org/toti/geo/CountryGrouping"/>
                        <rdf:Description rdf:about="https://w3id.org/toti/geo/HistoricPlace"/>
                        <rdf:Description rdf:about="https://w3id.org/toti/geo/Park"/>
                        <rdf:Description rdf:about="https://w3id.org/toti/geo/Settlement"/>
                    </owl:members>
                </rdf:Description>
                <rdf:Description>
                    <rdf:type rdf:resource="http://www.w3.org/2002/07/owl#AllDisjointClasses"/>
                    <owl:members rdf:parseType="Collection">
                        <rdf:Description rdf:about="https://w3id.org/toti/geo/City"/>
                        <rdf:Description rdf:about="https://w3id.org/toti/geo/Hamlet"/>
                        <rdf:Description rdf:about="https://w3id.org/toti/geo/Slum"/>
                        <rdf:Description rdf:about="https://w3id.org/toti/geo/Town"/>
                        <rdf:Description rdf:about="https://w3id.org/toti/geo/Village"/>
                    </owl:members>
                </rdf:Description>
            </rdf:RDF>
            `;
    writeRdf(individuals, file);

};



function writeRdf(geojson,file){
  fs.writeFile(`./${file}.rdf`, geojson, function (err) {
    if (err)
      return console.log(err);

  });

}
