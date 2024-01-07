import { get_random_int } from "../utils.js";
import { player } from "../player.js"
import { finish_turn } from "./turn_timer.js";

class skill_base {
    constructor(name, icon, cost, level, effect){
        this.name = name;
        this.icon = icon;
        this.cost = cost;
        this.level = level;
        this.effect = effect;
    };
}

function level_up_skill(skill_index) {
    var skill = skill_book[skill_index];
    skill.level++;
    skill.cost = skill.cost * 1.7;
}

var heavy_strike = new skill_base(
    "Heavy Strike", 
    "../img/skills/heavy_strike.png", 
    -2, 1, 
    () => {
    let damage_multiplier = 2.3;
    player.deal_damage(player.damage * damage_multiplier);
    player.change_energy(heavy_strike.cost);
    finish_turn();
});

var spinning_blade = new skill_base (
    "Spinning Blade", 
    "../img/skills/spinning_blade.png", 
    -3.5, 1, 
    () => {
    let damage_multiplier = 0.7;
    player.deal_damage((player.damage * damage_multiplier) * get_random_int(2, 3));
    player.change_energy(spinning_blade.cost);
    finish_turn();
});

export var skill_book = [
    heavy_strike, spinning_blade,
];

export function learn_new_skill(index) {
    player.available_skills.push(skill_book[index]);
};

learn_new_skill(0);
learn_new_skill(1);