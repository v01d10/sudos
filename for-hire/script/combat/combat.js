import { enemies } from "./enemies.js";
import { player } from "../player.js";
import { assign_buttons, handle_buttons, close_action_menu } from "./action_menu_combat.js";
import { spawn_shield_button, shield, fadeOutInterval } from "./spawn_shield.js";
import { start_turn_timer, stop_turn_timer, pause_fight, unpause_fight, finish_turn } from "./turn_timer.js";
import { roar_monster_0, bite_monster_0, bite_monster_armored_0, block_hand, slash_sword_0 } from "../audio_engine.js";

var enemy_name = document.getElementById("enemy_name");
var enemy_health_bar = document.getElementById("enemy_health_bar");
var enemy_health_text = document.getElementById("enemy_health_text");
var enemy_img = document.getElementById("enemy_img");

export var enemy;

var blocked = false;

function init_combat() {
    if(player.target != null) {
        enemy = enemies[Math.floor(Math.random() * enemies.length)];
        enemy_name.innerHTML = enemy.name;
        enemy_img.src = enemy.img;
        enemy_img.addEventListener("click", attack_player);
        enemy.get_health_percentage();
        roar_monster_0.play();
    
        player.target = enemy;
        player.get_percentages();
        assign_buttons(player);
    
        start_turn_timer(false);
        pause_fight_button.addEventListener("click", pause_fight);
        pause_fight();
    } else {
        return console.log("No target");
    }
}

init_combat()

function attack_player() {
    if(player.energy + player.attack_cost <= 0){
        return;
    }
    
    slash_sword_0.play();
    player.change_energy(player.attack_cost);
    enemy.change_health(player.damage);
    finish_turn();
}

export function block_player () {
    if(player.energy + player.block_cost <= 0){
        shield.remove();
        return;
    }
    
    block_hand.play();
    player.change_energy(player.block_cost);
    console.log("Player blocked!")
    blocked = true;
    shield.remove();
    clearInterval(fadeOutInterval);
}

export function attack_enemy () {
    setTimeout(() => {
        clearInterval(fadeOutInterval);
        setTimeout(() => {
            enemy_img.style.pointerEvents = "";
        }, 200);

        if(blocked){
            bite_monster_armored_0.play();
            player.change_health(enemy.damage / 3);
            player.blocked = false;
            if(player.health > 0) {
                stop_turn_timer();
                start_turn_timer(false);
                handle_buttons(1);
            }
            return;
        }
        
        bite_monster_0.play();
        player.change_health(enemy.damage);
        console.log("Player health: " + player.health);
        if(player.health > 0) {
            stop_turn_timer();
            start_turn_timer(false);
            handle_buttons(1);
        }
    }, 500);
}