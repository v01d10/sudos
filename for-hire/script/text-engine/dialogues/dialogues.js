import { quest_action, shop_action } from "../locations/actions.js";
import { create_message } from "../message_center.js";
import { current_place, travel_to_location, leave_place } from "../travel.js";
import { leave_dialogue } from "./dialogue_manager.js";

var shop_key_words = ["Trade", "trade", "Shop", "shop", "Buy", "buy", "Sell", "sell"];
var quest_key_words = ["Quest", "quest", "Task", "task", "Mission", "mission", "Job", "job", "Work", "work"];
var insult_key_words = ["Bitch", "bitch", "Idiot", "idiot", "Dick", "dick", "Pussy", "pussy"];
var exit_key_words = ["Bye", "bye", "Leave", "leave", "Goodbye", "goodbye", "Farewell", "farewell"];

var npc;

var trader_choices = {
    shop: {key_words: shop_key_words, next: () => {
        shop_action()
    }},
    quest: {key_words: quest_key_words, next: () => {
        if(npc.available_quests != null) {
            return dialogues.riverwood.trader.quest_positive_0;
        } else {
            return dialogues.riverwood.trader.quest_negative_0;
        }
    }},
    insult: {key_words: insult_key_words, next: () => {
        leave_place();
        create_message(dialogues.riverwood.trader.insult_exit_0.text, 1);
    }},
    exit_0: {key_words: exit_key_words, next: () => {
        leave_place();
        create_message(dialogues.riverwood.trader.leave_0.text, 1);
    }},
}

export let dialogues = {
    riverwood: {
        trader: {
            greeting_0 : { text: "Welcome to my humble shop hero. What can i do for you today?",
                choices: [ trader_choices.shop, trader_choices.quest, trader_choices.insult, trader_choices.exit_0 ]
            },
            quest_positive_0: { text: "Yes I might have something here...",
                choices: [ trader_choices.exit_0, ]
            },
            quest_negative_0: { text: "Unfortenately no. Try to ask around in the town or come in a few days.",
                choices: [ trader_choices.insult, trader_choices.exit_0, ]
            },
            insult_exit_0: { text: "You're trying to say stuff like that in MY shop?! Get the fuck out of here NOW!!." },
            leave_0: { text: "Farewell."},   

        }
    }
}


