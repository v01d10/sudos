import { location_base } from "./location_base.js"
import { place_database } from "../places/place.js";
import { riverwood_description, lush_green_forrest_description, rocky_mountains_description } from "./location_descriptions.js";
import { actions } from "./actions.js";

export var location_database;

function init_location_database() {
    setTimeout(() => {
        location_database = {
            riverwood: {
                name: "Riverwood",
                description: () => riverwood_description(location_database.riverwood),
                actions: [actions[0], actions[1]],
                available_places: [place_database.riverwood.riverwood_trader, place_database.riverwood.riverwood_pub],
                type: 0
            },
            lush_green_forrest: {
                name: "Lush Green Forest",
                description: () => lush_green_forrest_description(location_database.lush_green_forrest),
                actions: [actions[0], actions[1]],
                available_places: [],
                type: 1
            },
            rocky_mountains: {
                name: "Rocky Mountains",
                description: () => rocky_mountains_description(rlocation_database.ocky_mountains),
                actions: [actions[0], actions[1]],
                available_places: [],
                type: 1
            },

        }
    }, 800);
}

init_location_database();