import { actions } from "../locations/actions.js";
import { riverwood_trader_description, riverwood_inn_description } from "./place_descriptions.js";
import { npc_database } from "../npc/npc_database.js";

export var place_database;

function init_place_database() {
    setTimeout(() => {
        place_database = {
            riverwood: {
                riverwood_trader: {
                    name: "Riverwood Trader",
                    key_words: ["Trader", "trader", "Merchant", "merchants"],
                    description: riverwood_trader_description,
                    actions: [actions[2], actions[3]],
                    npcs: [npc_database.riverwood.trader],
                    type: 0,
                }, 
                riverwood_pub: {
                    name: "Tipsy Mule",
                    key_words: ["Inn", "inn", "Pub", "pub"],
                    description: riverwood_inn_description,
                    actions: [],
                    npc: [],
                    type: 1,
        
                }
            }
        }
    }, 700);
}

init_place_database();

