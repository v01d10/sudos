import { get_random_int } from "../../utils.js";
import { init_dialogue } from "../dialogues/dialogue_manager.js";
import { player_action } from "../text_engine.js";
import { travel_action, visit_action, current_location, current_place, visit_place, travel_to_location, current_npc } from "../travel.js";
import { open_inventory_menu } from "../inventory/trade_menu.js";

export let actions = [
    {name: "Travel", key_words: ["Go", "go", "Head", "head",], effect: () => {
        travel_action();
    }},
    {name: "Visit", key_words: ["Visit", "visit"], effect: () => {
        visit_action();
    }},
    {name: "Dialogue", key_words: ["Talk", "talk", "Tell", "tell", "Ask", "ask"], effect: (npc) => {
        init_dialogue(npc);
    }},
    {name: "Shop", key_words: ["Trade", "trade" ,"Shop", "shop", "Buy", "buy", "Sell", "sell", "Haggle", "haggle"], effect: (npc) => {
        shop_action(npc);
    }},
    {name: "Examine", key_words: ["Examine", "examine", "Check", "check", "See", "see"], effect: (object) => {

    }},

    {name: "Cut Trees", key_words: ["Cut", "cut", "Trees", "trees",], effect: () => {
        var tree_count = get_random_int(0,3);
        console.log("Cut trees: " + tree_count);
    }},
    {name: "Mine Rocks", key_words: ["Mine", "mine", "Rocks", "rocks"], effect: () => {
        var rock_count = get_random_int(0,3);
        console.log("Mined rocks: " + rock_count);
    }},
]


export function shop_action(npc) {
    console.log("Opening shop window...");
    open_inventory_menu(npc);
}

export function quest_action() {

}


