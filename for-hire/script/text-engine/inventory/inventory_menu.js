import { de_equip_item, sort_inventory, re_open_inventory } from "./inventory.js";

var inventory_menu;
var inventory_menu_holder;
var inventory_menu_window;
var equipment_menu_window;

var inventory_slots = [];

var ascending = true;

export function open_inventory_menu(player) {
    inventory_menu = document.createElement("div");
    inventory_menu.classList.add("inventory_menu");
    document.body.appendChild(inventory_menu);
    inventory_menu.addEventListener("click", close_inventory_menu);

    inventory_menu_holder = document.createElement("div");
    inventory_menu_holder.classList.add("inventory_menu_holder");
    document.body.appendChild(inventory_menu_holder);

    inventory_menu_window = document.createElement("div");
    inventory_menu_window.classList.add("inventory_menu_window");
    inventory_menu_holder.appendChild(inventory_menu_window);

    create_sort_button();

    open_inventory_tab(player);
    open_equipment_menu(player);
}

function create_sort_button() {
    var sort_button = document.createElement("div");
    sort_button.classList.add("sort_button");
    inventory_menu_window.appendChild(sort_button);

    var sort_icon = document.createElement("img");
    sort_icon.src = "../img/ui/sort.png";
    sort_icon.classList.add("sort_icon");
    sort_button.appendChild(sort_icon);
    sort_button.addEventListener("click", () => {
        if(ascending == true) {
            sort_inventory(true);
            ascending = false;
        } else {
            sort_inventory(false);
            ascending = true;
        }
        console.log(ascending);
        re_open_inventory();
    })
}

export function open_inventory_tab(player) {
    inventory_slots = [];
    for (let index = 0; index < player.inventory.length; index++) {
        const item = player.inventory[index];
        item.index = index;
        create_slot_inventory(item);
    }
}

function create_slot_inventory(item) {
    if(!item) {
        console.log("No item!")
    }

    var slot = document.createElement("div");
    inventory_slots.push(slot);
    slot.classList.add("inventory_menu_slot");
    slot.innerHTML = item.name;

    slot.addEventListener("click", () => {
        var index = inventory_slots.indexOf(slot);
        item.effect(index);
    })
    inventory_menu_window.appendChild(slot);
}

function open_equipment_menu(player) {
    equipment_menu_window = document.createElement("div");
    equipment_menu_window.classList.add("equipment_menu_window");
    inventory_menu_holder.appendChild(equipment_menu_window);
    open_equipment_tab(player);
}

function open_equipment_tab(player) {
    var name;
    var item = null;

    for (let index = 0; index < 6; index++) {
        if(index == 0) {
            item = player.helmet;
            name = "Helmet";
        }
        if(index == 1) {
            item = player.torso;
            name = "Torso";
        }
        if(index == 2) {
            item = player.gloves;
            name = "Gloves";
        }
        if(index == 3) {
            item = player.pants;
            name = "Pants";
        }
        if(index == 4) {
            item = player.boots;
            name = "Boots";
        }
        if(index == 5) {
            item = player.weapon;
            name = "Weapon";
        }
        
        if(item != null) {
            create_slot_equipment(item);
        } else {
            create_slot_equipment(null, true, name);
        }
    }
}

function create_slot_equipment(item, isEmpty, name) {
    var slot = document.createElement("div");
    slot.classList.add("equipment_menu_slot");
    
    if(isEmpty) {
        slot.innerHTML = name;
        slot.style.fontStyle = "oblique"
    } else {
        slot.innerHTML = item.name;
        slot.style.fontWeight = "bold"
        slot.addEventListener("click", () => {
            console.log(item.id);
            de_equip_item(item.type);
        })
    }
    
    equipment_menu_window.appendChild(slot);
}


export function close_inventory_menu() {
    if(inventory_menu == null) {
        return;
    }

    inventory_menu.remove();
    inventory_menu_holder.remove()
    inventory_menu_window.remove();
}