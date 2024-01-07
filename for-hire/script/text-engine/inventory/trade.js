import { add_item_from_database } from "./inventory.js";
import { player } from "../../player.js";
import { npc_database } from "../npc/npc_database.js";
import { close_inventory_menu, open_inventory_menu } from "./trade_menu.js";

export function buy(npc, item) {
    console.log("Buying item... - " + item);
    if(player.money - item.price < 0) {
        return alert("Not enough money!");
    }
    player.money -= item.price;
    add_item_from_database(item.index);
    npc.inventory.forEach(npc_item => {
        if(npc_item == item) {
            if(npc_item.amount - 1 >= 0) {
                npc_item.amount--;
            }
        }
    });
}