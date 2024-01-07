export var skill_button = document.getElementById("skill");
export var spell_button = document.getElementById("spell");
export var inventory_button = document.getElementById("item");
export var flee_button = document.getElementById("flee");

var action_menu;
var action_menu_window;

export function assign_buttons(player) {
    skill_button.addEventListener("click", () => {
        open_action_menu(0, player);
    });
    spell_button.addEventListener("click", () => {
        open_action_menu(1, player);
    });
    inventory_button.addEventListener("click", () => {
        open_action_menu(2, player);
    });
}

export function handle_buttons(index) {
    var events = "";

    if (index == 0) events = "none";
    if (index == 1) events = "auto";

    skill_button.style.pointerEvents = events;
    spell_button.style.pointerEvents = events;
    inventory_button.style.pointerEvents = events;
    flee_button.style.pointerEvents = events;
}

export function open_action_menu(index, player) {
    action_menu = document.createElement("div");
    action_menu.classList.add("action_menu");
    document.body.appendChild(action_menu);
    action_menu.addEventListener("click", close_action_menu);

    action_menu_window = document.createElement("div");
    action_menu_window.classList.add("action_menu_window");
    document.body.appendChild(action_menu_window);
    console.log("Opened action menu");

    if(index == 0) 
        open_skill_tab(player);
    if(index == 1) 
        open_spell_tab(player);
    if(index == 2) 
        open_inventory_tab(player);
    
}

function create_slot(item) {
    if(!item) 
        console.log("No item!")
    if(!item.icon) 
        console.log("No icon!")
    

    var slot = document.createElement("div");
    slot.classList.add("bottom_menu_slot");
    
    var icon = document.createElement("img");
    icon.src = item.icon;
    icon.classList.add("bottom_menu_slot_icon")
    
    slot.addEventListener("click", item.effect);
    
    action_menu_window.appendChild(slot);
    slot.appendChild(icon);
}

export function open_skill_tab(player) {
    player.available_skills.forEach(skill => {
        if(!skill) {
            console.log("No skill");
            return;
        }
        console.log(skill);
        create_slot(skill);
    });
}

export function open_spell_tab(player) {
    player.available_spells.forEach(spell => {
        create_slot(spell);
    });
}

export function open_inventory_tab(player) {
    for (let index = 0; index < player.inventory.length; index++) {
        const item = player.inventory[index];
        item.index = index;
        create_slot(item);
    }
}

export function close_action_menu() {
    if(action_menu == null) {
        return;
    }

    action_menu.remove();
    action_menu_window.remove();
}