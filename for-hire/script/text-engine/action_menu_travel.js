import { visit_place } from "./travel.js";
import { travel_to_location } from "./travel.js";
import { location_database } from "./locations/location.js";

var visit_button;
var travel_button;

var action_menu;
var action_menu_window;
var action_menu_slots = [];

export function assign_buttons(player) {
    visit_button.addEventListener("click", () => {
        open_action_menu(0, player);
    });
    travel_button.addEventListener("click", () => {
        open_action_menu(1, player);
    });
}

export function handle_buttons(index) {
    var events = "";

    if (index == 0) events = "none";
    if (index == 1) events = "auto";

    skill_button.style.pointerEvents = events;
    spell_button.style.pointerEvents = events;
    inventory_button.style.pointerEvents = events;
    flee_button.style.pointerEvents = events;
}

export function open_action_menu_travel(index, location) {
    action_menu = document.createElement("div");
    action_menu.classList.add("action_menu_travel");
    document.body.appendChild(action_menu);
    action_menu.addEventListener("click", close_action_menu);

    action_menu_window = document.createElement("div");
    action_menu_window.classList.add("action_menu_window_travel");
    document.body.appendChild(action_menu_window);
    console.log("Opened action menu");

    if(index == 0) 
        open_visit_tab(location);
    if(index == 1) 
        open_travel_tab();
    
}

export function open_visit_tab(location) {
    console.log("Opened visit tab: " + location);
    location.available_places.forEach(place => {
        if(!place) {
            console.log("No place!");
            return;
        }
        console.log(place);
        create_slot(place, location, false);
    });
}

export function open_travel_tab() {
    location_database.forEach(location => {
        create_slot(null, location, true);
    });
}

function create_slot(place, location, isLocation) {
    var slot = document.createElement("div");
    slot.classList.add("action_menu_slot_travel");
    slot.innerHTML = isLocation ? location.name : place.name;
    action_menu_window.appendChild(slot);
    action_menu_slots.push(slot);
    slot.addEventListener("click", () => { 
        if(place) {
            visit_place(place); 
        } else {
            travel_to_location(location);
        }
    });  
}

export function close_action_menu() {
    if(action_menu == null) {
        console.log("No action menu!");
        return;
    }
    action_menu.remove();
    action_menu_window.remove();
}