import { place_database } from "../places/place.js";
import { current_place } from "../travel.js";
import { dialogues } from "./dialogues.js";
import { create_message } from "../message_center.js";

export var current_dialogue;

export function init_dialogue() {
    console.log("Initiating dialogue...");
    if(current_place == place_database.riverwood.riverwood_trader) {
        console.log("Place: " + current_place);
        current_dialogue = dialogues.riverwood.trader.greeting_0;
        console.log("Current dialogue: " + current_dialogue);
        create_message(current_dialogue.text, 1);
    }
}

export function leave_dialogue() {
    current_dialogue = null;
}