import { player } from "../../player.js"
import { item_database } from "./item_database.js";
import { close_inventory_menu, open_inventory_menu } from "./inventory_menu.js";

export var clicked_index = 0;

export function add_item_from_database(index) {
    if(player.inventory.length + 1 >= player.max_inventory_size) {
        return console.log("Not enough space in the inventory!");
    }
    var item = item_database[index];
    player.inventory.push(item);
};

export function remove_item_from_inventory(index) {
    player.inventory.splice(index, 1);
    re_open_inventory();
}

export function de_equip_item (type) {
    if(type == 0) {
        add_item_from_database(player.helmet.id);
        player.helmet = null;
    }
    if(type == 1) {
        add_item_from_database(player.torso.id);
        player.torso = null;
    }
    if(type == 2) {
        add_item_from_database(player.gloves.id);
        player.gloves = null;
    }
    if(type == 3) {
        add_item_from_database(player.pants.id);
        player.pants = null;
    }
    if(type == 4) {
        add_item_from_database(player.boots.id);
        player.boots = null;
    }
    if(type == 5) {
        add_item_from_database(player.weapon.id);
        player.weapon = null;
    }

    re_open_inventory();
}

export function equip_item(index) {
    var item = player.inventory[index];
    // console.log(item);
    if(item.type == 6 || item.type == 7) {
        return console.log("Item is not equipment!");
    }

    if(item.type == 0) {
        if(player.helmet == null) {
            player.helmet = item;
        } else {
            add_item_from_database(player.helmet.id);
            player.helmet = item;
        }
    }
    if(item.type == 1) {
        if(player.torso == null) {
            player.torso = item;
        } else {
            add_item_from_database(player.torso.id);
            player.torso = item;
        }
    }
    if(item.type == 2) {
        if(player.gloves == null) {
            player.gloves = item;
        } else {
            add_item_from_database(player.gloves.id);
            player.gloves = item;
        }
    }
    if(item.type == 3) {
        if(player.pants == null) {
            player.pants = item;
        } else {
            add_item_from_database(player.pants.id);
            player.pants = item;
        }
    }
    if(item.type == 4) {
        if(player.boots == null) {
            player.boots = item;
        } else {
            add_item_from_database(player.boots.id);
            player.boots = item;
        }
    }
    if(item.type == 5) {
        if(player.weapon == null) {
            player.weapon = item;
        } else {
            add_item_from_database(player.weapon.id);
            player.weapon = item;
        }
    }
    
    console.log(index);
    remove_item_from_inventory(index);

    console.log("Item equiped: " + item.name)
}

export function sort_inventory(isAscending) {
    console.log("Sorting inventory... " + isAscending);
    if(isAscending) {
        player.inventory.sort(function(a, b) {
            return parseFloat(a.type) - parseFloat(b.type);
        });
    } else {
        player.inventory.sort(function(a, b) {
            return parseFloat(b.type) - parseFloat(a.type);
        });
    }
}

export function re_open_inventory() {
    close_inventory_menu();
    open_inventory_menu();
}

add_item_from_database(1);
add_item_from_database(0);
add_item_from_database(1);
add_item_from_database(0);
