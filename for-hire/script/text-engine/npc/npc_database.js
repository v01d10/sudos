import { actions } from "../locations/actions.js"

export var npc_database; 

function init_npc_database() {
    setTimeout(() => {
        npc_database = {
            riverwood: {
                trader: { 
                    name: "Johan",
                    money: 66,
                    inventory: [
                        {index: 2, amount: 5, price: 11},
                        {index: 0, amount: 2, price: 24},
                        {index: 1, amount: 1, price: 37},
                    ],
                    dialogues: [],
                    actions: [actions[2], actions[3],],
                }
            }
        }
    }, 500);
}

init_npc_database();