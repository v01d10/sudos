import { player } from "../player.js"
import { finish_turn } from "./turn_timer.js";

class spell_base {
    constructor(name, icon, cost, level, effect){
        this.name = name;
        this.icon = icon;
        this.cost = cost;
        this.level = level;
        this.effect = effect;
    };
}

function level_up_spell(spell_index) {
    let spell = spell_book[spell_index];
    spell.level++;
    spell.cost = spell.cost * 1.7;
}

let heal = new spell_base("Heal", "./img/skills/heavy_strike.png", -2, 1, () => {
    let health_increment = 2;
    player.change_health(health_increment);
    player.change_mana(heal.cost);
    finish_turn();
});

let restore_energy = new spell_base("Restore Energy", "./img/skills/heavy_strike.png", -2, 1, () => {
    let energy_increment = 2;
    player.change_energy(energy_increment);
    player.change_mana(restore_energy.cost);
    finish_turn();
});

export var spell_book = [
    heal, restore_energy,
];

export function learn_new_spell(index) {
    player.available_spells.push(spell_book[index]);
};

learn_new_spell(0);
learn_new_spell(1);