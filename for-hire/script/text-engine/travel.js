import { player } from "../player.js";
import { location_database } from "./locations/location.js";
import { open_inventory_menu } from "./inventory/inventory_menu.js";
import { open_character_menu } from "./character/character_menu.js";
import { map } from "./locations/map.js";
import { player_action } from "./text_engine.js";
import { leave_dialogue } from "./dialogues/dialogue_manager.js";
import { door_open, footsteps_wood, footsteps_concrete, door_slam, play_ambience_location } from "../audio_engine.js";

export var location_description = document.getElementById("description_text");

var inventory_menu_button = document.getElementById("inventory_button");
var character_menu_button = document.getElementById("character_button");

export var current_location = null;
export var current_coordinates = null;
export var current_place = null;
export var current_npc = null;

function init_travel() {4
    setTimeout(() => {
        current_location = location_database.riverwood;
        load_location(current_location);
        current_coordinates = "0,0";
    
        inventory_menu_button.addEventListener("click", () => { open_inventory_menu(player) })
        character_menu_button.addEventListener("click", () => { open_character_menu(player) })

    }, 950);
}

init_travel();

export function travel_to_location(coordinates) {
    console.log(coordinates);
    map.forEach(location => {
        if(location.coord == coordinates) {
            current_location = location.location;
            current_coordinates = location.coord;
            console.log(current_location.name);
            load_location();
        }
    });
}

export function visit_place() {
    load_place();
}

function load_location() {
    current_location.description();
    play_ambience_location(current_location.type);
}

function load_place() {
    current_place.description();
}

export function load_description(text) {
    location_description.innerHTML = text;
    location_description.animate(
        [
            {filter: "invert(100%)"},
            {filter: "invert(0%)"}
        ],
        {
            duration: 500,
        }
    )
}

export function travel_action() {
    footsteps_concrete.play();

    setTimeout(() => {
        var current_cord = current_coordinates.split(",");
        var coord_y = current_cord[0];
        var coord_x = current_cord[1];

        var max_y_coord = 10;
        var max_x_coord = 100;
        
        player_action.forEach(action => {
            if(action == "North" || action == "north") {
                if(coord_y + 1 <= max_y_coord) {
                    coord_y++;
                    var new_coordinates = (coord_y + "," + coord_x).toString();
                    travel_to_location(new_coordinates);
                } else {
                    console.log("Cannot go more North. Mountains are too high and dangerous");
                }
            }
            if(action == "South" || action == "south") {
                if(coord_y - 1 >= 0) {
                    coord_y--;
                    var new_coordinates = (coord_y + "," + coord_x).toString();
                    travel_to_location(new_coordinates);
                } else {
                    console.log("Cannot go more South. Mountains are too high and dangerous");
                }
            }
            if(action == "East" || action == "east") {
                if(coord_x + 1 <= max_x_coord) {
                    coord_x++;
                    var new_coordinates = (coord_y + "," + coord_x).toString();
                    travel_to_location(new_coordinates);
                } else {
                    console.log("Cannot go more East. Mountains are too high and dangerous");
                }
            }
            if(action == "West" || action == "west") {
                if(coord_x - 1 >= 0) {
                    coord_x--;
                    var new_coordinates = (coord_y + "," + coord_x).toString();
                    travel_to_location(new_coordinates);
                } else {
                    console.log("Cannot go more West. Mountains are too high and dangerous");
                }
            }
        });
    }, 1000);
    
}

export function visit_action() {
    door_open.play();

    setTimeout(() => {
        current_location.available_places.forEach(place => {
            player_action.forEach(input => {
                place.key_words.forEach(key_word => {
                    if(key_word == input) {
                        current_place = place;
                        console.log(current_place);
                        visit_place();
                        return;
                    }
                });
            });
    
            console.log("No such place here!");
        });
    }, 1000);
}

export function leave_place() {
    
    setTimeout(() => {
        current_place = null;
        leave_dialogue();
        load_location();
        door_slam.play();
    }, 1000);
}