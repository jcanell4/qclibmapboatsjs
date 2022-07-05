import LineString from 'ol/geom/LineString';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';

class WorldSeaRoutes{
    constructor(param){
        this.__routes=[];
        this.__alfaIndx=[];
        let aRoutes=[];
        if (typeof param === 'string' || param instanceof String){
            //llegir el fitxer
            fetch(param)
                    .then(function(response){
                        aRoutes = response.json();
                    })
                    .then(data => console.log(data));
        }else if(Array.isArray(param)){
            aRoutes = param;
        }        
        for(const elem of aRoutes){
            this.addRoute(elem);
        }
         
       
    }
    
    addRoute(routeObj){
        let r = new Route(routeObj);
        this.__alfaIndx[r.alfaId]=this.__routes.length;
        this.__routes.push(r);
        
    }    
}

class Route{
    constructor(routeObj){
        this.__numId;
        this.__alfaId;
        this.__locations;
        this.__line;
        this.__feature;
        this.__startPoint;
        this.__endPoint;
        
        if (typeof routeObj === 'object' &&
                !Array.isArray(routeObj) &&
                routeObj !== null){
            this.__numId = routeObj.numId;
            this.__alfaId = routeObj.alfaId;
            if(routeObj.format && routeObj.format.startsWith("r")){
                routeObj.locations.map(function(l) {
                    return l.reverse();
                });
            }
            this.__locations = routeObj.locations;
            this.__line = new LineString(this.locations);
            this.__line.transform('EPSG:4326', 'EPSG:3857');
            this.__feauture = new Feature({
                type: 'route',
                geometry: route
            });
            let aExtrems = this.alfaId.split("-");
            this.__starPoit = new Feature({
                type: aExtrems[0]+'_icon',
                geometry: new Point(this.__line.getFirstCoordinate())
            });
            this.__endPoint = new Feature({
                type: aExtrems[1]+'_icon',
                geometry: new Point(this.__line.getLastCoordinate())
            });
        }
    }
    
    get numId(){
        return this.__numId;
    }
    
    get alfaId(){
        return this.__alfaId;
    }
    
    static get locations(){
        return this.__locations;
    } 
    
    static get routeLine(){
        return this.__line;
    }
}


export {WorldSeaRoutes as default, Route};