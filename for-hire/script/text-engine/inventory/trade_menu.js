import { sort_inventory, re_open_inventory } from "./inventory.js";
import { player } from "../../player.js";
import { buy } from "./trade.js";
import { item_database } from "./item_database.js";

var inventory_menu;
var inventory_menu_holder;
var inventory_menu_window;
var trade_menu_window;

var inventory_slots = [];
var trade_slots = [];

var ascending = true;

export function open_inventory_menu(npc) {
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
    open_inventory_tab();
    open_trade_menu(npc);
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

export function open_inventory_tab() {
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
    })
    inventory_menu_window.appendChild(slot);
}

function open_trade_menu(npc) {
    trade_menu_window = document.createElement("div");
    trade_menu_window.classList.add("inventory_menu_window");
    inventory_menu_holder.appendChild(trade_menu_window);
    open_trade_tab(npc);
}

export function open_trade_tab(npc) {
    trade_slots = [];
    for (let index = 0; index < npc.inventory.length; index++) {
        const item = npc.inventory[index];
        create_slot_trade(npc, item);
        console.log("Creating trade slot... " + item.name);
    }
}

function create_slot_trade(npc, item) {
    if(!item) {
        console.log("No item!")
    }

    var slot = document.createElement("div");
    inventory_slots.push(slot);
    slot.classList.add("inventory_menu_slot");
    slot.innerHTML = item_database[item.index].name;

    slot.addEventListener("click", () => {
        buy(npc, item);
        close_inventory_menu();
        open_inventory_menu(npc);
    })
    trade_menu_window.appendChild(slot);
}

export function close_inventory_menu() {
    if(inventory_menu == null) {
        return;
    }

    inventory_menu.remove();
    inventory_menu_holder.remove()
    inventory_menu_window.remove();
}