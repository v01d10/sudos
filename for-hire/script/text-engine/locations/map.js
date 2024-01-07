import { location_database } from "./location.js"

export let map;

function init_map() {
    setTimeout(() => {
        map = [
            {coord: "0,0", location: location_database.riverwood,},
            {coord: "0,1", location: location_database.lush_green_forest,},
            {coord: "0,2", location: location_database.rocky_mountains},
            {coord: "0,3", location: location_database.lush_green_forest,},
            {coord: "0,4", location: location_database.lush_green_forest,},
            
            {coord: "1,0", location: location_database.rocky_mountains},
            {coord: "1,1", location: location_database.lush_green_forest,},
            {coord: "1,2", location: location_database.rocky_mountains},
            {coord: "1,3", location: location_database.lush_green_forest,},
            {coord: "1,4", location: location_database.lush_green_forest,},
        ]
    }, 900);
}