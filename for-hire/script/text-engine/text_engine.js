import { current_location, current_place } from "./travel.js";
import { current_dialogue } from "./dialogues/dialogue_manager.js";

var action_input_form = document.getElementById("action_input_form");
var action_input = document.getElementById("action_input");

export var player_action;

function init_text_engine() {
    setTimeout(() => {
        console.log("Initiating text engine... ")
        console.log("Current location: " + current_location.name)
        action_input_form.addEventListener("submit", function(event) {
            event.preventDefault();
            get_player_choice();
        });
    }, 1000);
}

init_text_engine();

function get_player_choice() {
    player_action = action_input.value.split(" ");

    if(current_dialogue != null) {
        current_dialogue.choices.forEach(choice => {
            choice.key_words.forEach(key_word => {
                player_action.forEach(action => {
                    if(action == key_word) {
                        console.log("Found key-word: " + key_word);
                        choice.next();
                        return;
                    }
                });
            });
        });
    }

    if(current_place != null && current_dialogue == null) {
        var found_action = false;
        var found_npc = false;

        current_place.npcs.forEach(npc => {
            console.log("Available NPCs: " + npc.name);
            npc.actions.forEach(available_action => {
                available_action.key_words.forEach(key_word => {
                    player_action.forEach(action => {
                        if(action == key_word && !found_action) {
                            found_action = true;
                            console.log("Found action: " + action);
                            return;
                        }
                        if(action == npc.name && found_action && !found_npc) {
                            console.log("Found NPC: " + action);
                            available_action.effect(npc);
                            found_npc = true;
                            return;
                        }
                    })
                })
            })
        })
    }

    if(current_place == null && current_dialogue == null) {
        current_location.actions.forEach(available_action => {
            available_action.key_words.forEach(key_word => {
                player_action.forEach(action => {
                    if(action == key_word) {
                        console.log("Found key-word: " + key_word);
                        available_action.effect();
                        return;
                    }
                });
            });
        });
    }

    action_input.value = "";
}