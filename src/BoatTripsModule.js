import Feature from 'ol/Feature';
import millisPerDay from "./timeModule";

const DEPARTUREDATE = 0;
const ARRIBALDATE = 1;
const CSV_TRIP_ID = 0;
const CSV_TRIP_REV = 1;
const CSV_TRIP_BOATNOM = 2;
const CSV_TRIP_BOATNOMREV = 3;
const CSV_TRIP_DEPDIA = 4;
const CSV_TRIP_DEPMES = 5;
const CSV_TRIP_DEPANY = 6;
const CSV_TRIP_DEPESTAT = 7;
const CSV_TRIP_DEPLLOC = 8;
const CSV_TRIP_LINIA = 9;
const CSV_TRIP_DESTORI = 10;
const CSV_TRIP_ESTAT2 = 11;
const CSV_TRIP_ARRDIA = 12;
const CSV_TRIP_ARRMES = 13;
const CSV_TRIP_ARRANY = 14;
const CSV_TRIP_ARRLLOC = 15;
const CSV_TRIP_ETAPA = 16;
const CSV_TRIP_CODI = 16;
const CSV_TRIP_ROUTEID = 17;
    
class WorldBoats{
    construct(params){
        this.__boats = [];
        this._nameIndex = {};
        let strBoatTrips = [];
        if (params.endsWith(".csv")){
           //llegir el fitxer
           fetch(params)
                   .then(function(response){
                       strBoatTrips = response.text();
                   })
                   .then(data => console.log(data));
        }else{
            strBoatTrips = params;
        }
        let aLines = strBoatTrips.split("\n");
        for(const elem of aLines){
           let aData = elem.split(",");
           if(!(aData[CSV_TRIP_BOATNOMREV] in this._nameIndex)){
               this._nameIndex[aData[CSV_TRIP_BOATNOMREV]] = this.__boats.length;
               this.__boats.push(new Boat(aData[CSV_TRIP_BOATNOMREV]));
           }
           this.__boats[this._nameIndex[aData[CSV_TRIP_BOATNOMREV]]].addTrip(aData);
        }        
    }
}

class Trip{
    constructor(aDate){
        this.__departureDate;
        this.__arribalDate;
        this.__totalDaysOfTrip;
        this.__departureHarbour = aDate[CSV_TRIP_DEPLLOC];
        this.__arribalHarbour = aDate[CSV_TRIP_ARRLLOC];
        this.__routeAlfaId = aDate[CSV_TRIP_ROUTEID];
        this.departureDate = aDate[CSV_TRIP_DEPDIA]+"/"+aDate[CSV_TRIP_DEPMES]+"/"+aDate[CSV_TRIP_DEPANY];
        this.arrivalDate = aDate[CSV_TRIP_ARRDIA]+"/"+aDate[CSV_TRIP_ARRMES]+"/"+aDate[CSV_TRIP_ARRANY];
    }
    
    static get millisPerDay(){
        return millisPerDay;
    }
    
    set departureDate(date){
        setDateFromString(date, DEPARTUREDATE);
    }
    
    setDateFromString(date, fieldDate){
        let day, month, year;
        let aDate = date.matchAll(/(\d{1,4])[-\/](\d{1,2})[-\/](\d{1,4])/g);
        if(Iterators.size(aDate)>0 && Iterators.size(aDate[0])===4){
            if(aDate[0][1].length===4){
                year = parseInt(aDate[0][1]);
                month = parseInt(aDate[0][2]);
                day = parseInt(aDate[0][3]);
            }else if(aDate[0][3].length===4){
                day = parseInt(aDate[0][1]);
                month = parseInt(aDate[0][2]);
                year = parseInt(aDate[0][3]);
            }else{
                //ERROR
            }
        }else{
            //ERROR
        }
        this.setDate(day, month, year, fieldDate);
    }
    
    get departureDate(){
        return this.__departureDate;
    }

    set arribalDate(date){
        setDateFromString(date, ARRIBALDATE);
    }
    
    get arribalDate(){
        return this.__arribalDate;
    }
    
    set routeAlfaId(id){
        this.__routeAlfaId=id;

    }
    
    get routeAlfaId(){
        return this.__routeAlfaId;
    }
    
    get totalDaysOfTrip(){
        if(this.__totalDaysOfTrip===-1){
            this.__totalDaysOfTrip = (this.arrivalDate.getTime() - this.departureDate.getTime())/this.millisPerday; 
        }
        return this.__totalDaysOfTrip;
    }
    
    setDate(day, month, year, fieldDate){
        if(fieldDate === DEPARTUREDATE){
            this.__departureDate = new Date(year, month, day);
        }else if(fieldDate===ARRIBALDATE){
            this.__arribalDate = new Date(year, month, day);
        }
        this.__totalDaysOfTrip = -1;
    }
}

class Boat{
    constructor(name){
        this.__name = name;
        this.__currentTripId=0;
        this.__trips=[];
        this.__currentRoute;
        this.__daysOfCurrentTrip;
//        this.__speedOfCurrentTrip;
    }
    
    get name(){
        return this.__name;
    }
    
    get currentTripId(){
        return this.__currentTripId;
    }
    
    get currentTrip(){
        return this.trips[this.currentTripId];
    }
    
    get trips(){
        return this._trips;
    }
    
    get currentRoute(){
        return this.__currentRoute;
    }
    
    get daysOfCurrentTrip(){
        return this.__daysOfCurrentTrip;
    }
    
//    get speedOfCurrentTrip(){
//        return this.__speedOfCurrentTrip;
//    }
    
    get curretTripFraction(){
        return this.daysOfCurrentTrip/this.currentTrip().totalDaysOfTrip();
    }
    
    addTrip(aData){
        this.__trips.push(new Trip(aData));
    }
    
}

export {Trip, Boat};


