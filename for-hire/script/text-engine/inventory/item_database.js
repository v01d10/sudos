import { player } from "../../player.js";
import { item_base } from "./item_base.js";
import { equip_item, clicked_index  } from "./inventory.js";

var hunting_knife = new item_base("Hunting Knife", 5, 1, 0, (index) => {
    equip_item(index);
    console.log(index)
});
var leather_vest = new item_base("Leather Vest", 1, 1, 1, (index) => {
    equip_item(index);
    console.log(index)
});
var health_potion_minor = new item_base("Health Potion - Minor", 7, 0, 2, () => {
    var health_increment = 2;
    player.change_health(health_increment);
    player.inventory.splice(health_potion_minor.index, 1);
});

export var item_database = [
    hunting_knife,
    leather_vest,
    health_potion_minor,
];