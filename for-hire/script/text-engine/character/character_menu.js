import { player } from "../../player.js";
import { player_statistics } from "../../statistics.js";

var character_menu_holder;
var character_menu;
var character_menu_window;

var name_bar;

var character_sections = [];

export function open_character_menu() {
    character_menu = document.createElement("div");
    character_menu.classList.add("character_menu");
    document.body.appendChild(character_menu);
    character_menu.addEventListener("click", close_character_menu);

    character_menu_holder = document.createElement("div");
    character_menu_holder.classList.add("character_menu_holder");
    document.body.appendChild(character_menu_holder);

    create_character_tab();
    create_statistics_tab();
}


function create_character_tab() {
    character_menu_window = document.createElement("div");
    character_menu_window.classList.add("character_menu_window");
    character_menu_holder.appendChild(character_menu_window);
    
    create_character_sections(1);
}

function create_character_sections(section_count) {
    for (let index = 0; index < section_count; index++) {
        character_sections[index] = document.createElement("div");
        character_sections[index].classList.add("character_section_holder");
        character_menu_window.appendChild(character_sections[index]);
    }

    create_basic_stats();
}

function create_basic_stats() {
    name_bar = document.createElement("div");
    name_bar.innerHTML = player.attribute_points.value > 0 ? player.name.value + " + " + player.attribute_points.value : player.name.value;
    name_bar.classList.add("basic_stats_cell_name");
    character_sections[0].appendChild(name_bar);

    create_attributes();

    var basic_stats_table = document.createElement("table");
    basic_stats_table.classList.add("basic_stats_table");
    character_sections[0].appendChild(basic_stats_table);

    var cells = [];
    var stats = [player.honor, player.notoriety];
    var row;

    for (let index = 0; index < stats.length; index++) {
        cells[index] = document.createElement("td");
        cells[index].classList.add("basic_stats_cell_lower");

        var name_cell = document.createElement("div");
        var value_cell = document.createElement("div");
        name_cell.classList.add("name_cell"); 
        value_cell.classList.add("value_cell"); 

        name_cell.innerHTML = stats[index].name;
        value_cell.innerHTML = stats[index].value;
        cells[index].appendChild(name_cell);
        cells[index].appendChild(value_cell);

        if(index == 0 || index == 1 || index == 3) {
            row = document.createElement("tr");
            basic_stats_table.appendChild(row);
        }

        row.appendChild(cells[index]);
    }
}

function create_attributes () {
    var attributes_table = document.createElement("table");
    attributes_table.classList.add("statistics_table");
    character_sections[0].appendChild(attributes_table);

    var attributes = player.attributes;

    var cells = [];
    var stats = [attributes.strength, attributes.endurance, attributes.agility, attributes.inteligence, attributes.charisma, attributes.luck];
    var row;

    for (let index = 0; index < stats.length; index++) {
        cells[index] = document.createElement("td");
        cells[index].classList.add("basic_stats_cell");

        var name_cell = document.createElement("div");
        var value_cell = document.createElement("div");
        name_cell.classList.add("name_cell"); 
        value_cell.classList.add("value_cell"); 

        name_cell.innerHTML = stats[index].name;
        value_cell.innerHTML = stats[index].value;
        cells[index].appendChild(name_cell);
        cells[index].appendChild(value_cell);

        if(player.attribute_points.value > 0) {

            cells[index].animate(
                [{ filter: "invert(0%)" }, { filter: "invert(50%)" }, { filter: "invert(00%)" }
                ], { duration: 1500, iterations: Infinity}
            );
            
            cells[index].addEventListener("click", () => {
                stats[index].value++;
                player.attribute_points.value--;
                close_character_menu();
                open_character_menu();
            });

        }

        if(index == 0 || index == 2 || index == 4) {
            row = document.createElement("tr");
            attributes_table.appendChild(row);
        }

        row.appendChild(cells[index]);
    }
}

function create_statistics_tab() {
    character_menu_window = document.createElement("div");
    character_menu_window.classList.add("statistics_menu_window");
    character_menu_holder.appendChild(character_menu_window);

    for (let index = 0; index < player_statistics.stats.length; index++) {
        const stat = player_statistics.stats[index];

        var stat_cell = document.createElement("div");
        var stat_name = document.createElement("div");
        var stat_value = document.createElement("div");

        stat_cell.classList.add("stat_cell");
        stat_name.classList.add("stat_name");
        stat_value.classList.add("stat_value");

        stat_name.innerHTML = stat.name;
        stat_value.innerHTML = stat.value;

        stat_cell.appendChild(stat_name);
        stat_cell.appendChild(stat_value);
        character_menu_window.appendChild(stat_cell);
    }
} 

export function close_character_menu() {
    if(character_menu == null) {
        return;
    }

    character_menu.remove();
    character_menu_holder.remove()
    character_menu_window.remove();
}