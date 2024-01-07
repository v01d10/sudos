import { current_location, load_description } from "../travel.js";

export function riverwood_description(location) {
    var description;
    description = "Little village on banks of a river called Wood. <br>"
    + "A few wooden houses surrounded by a thick forrest. <br>" 
    + "Two mills, blacksmith and small stables.";
    
    load_description(description);
}

export function lush_green_forrest_description(location) {
    var description;
    description = "Beautiful green forrest filled with life."
    + "<br> You see " + get_action_description(location);
    
    load_description(description);
}

export function rocky_mountains_description(location) {
    var description;
    description = "So rocky. Watch out or you're gonna sprain your ankle."
    + "<br> You see " + get_action_description(location);
    
    load_description(description);
}

function get_action_description(location) {
    var description = "";
    location.actions.forEach(action => {
        console.log(action.name);
        if(action.name == "Cut Trees") {
            description = description + "plenty of trees just waiting to be cut down"
        }
        if(action.name == "Mine Rocks") {
            description = description + "some rocks that may contain valuable ores or minerals"
        }
    });
    
    return description;
}