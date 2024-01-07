import { play_clock_sound, pause_sound, unpause_sound} from "../audio_engine.js";
import { handle_buttons, close_action_menu } from "./action_menu_combat.js";
import { spawn_shield_button } from "./spawn_shield.js";
import { block_player, attack_enemy } from "./combat.js";

var turn_timer_bar = document.getElementById("turn_timer_bar");
var turn_timer_text = document.getElementById("turn_timer_text");
var pause_fight_button = document.getElementById("pause_fight_button");
var pause_fight_icon = document.getElementById("pause_fight_icon");

var timer = 0;
var time_for_turn = 8;
var turn_timer;
var turn_timer_interval;

export function start_turn_timer(paused) {
    if(!paused) {
        timer = time_for_turn;
        pause_fight_button.style.pointerEvents = "auto";
    }

    var percentage = Math.floor((timer / time_for_turn) * 100);
    turn_timer_text.innerHTML = timer;
    turn_timer_bar.style.width = (percentage) + "%";
    
    turn_timer = setTimeout(() => {
        pause_fight_button.style.pointerEvents = "none";
        spawn_shield_button(block_player, attack_enemy);
        enemy_img.style.pointerEvents = "none";
        close_action_menu();
    }, time_for_turn * 1000);
    
    turn_timer_interval = setInterval(() => {
        if(timer > 0) {
            timer--;
            var percentage = Math.floor((timer / time_for_turn) * 100);
            turn_timer_text.innerHTML = timer;
            turn_timer_bar.style.width = (percentage) + "%";
            console.log(timer);
            play_clock_sound();
        } else {
            clearInterval(turn_timer_interval);
        }
    }, 1000);
}

export function stop_turn_timer() {
    clearInterval(turn_timer_interval);
    clearTimeout(turn_timer);
    pause_fight_button.style.pointerEvents = "none";
}

export function finish_turn() {
    enemy_img.style.pointerEvents = "none";
    spawn_shield_button(block_player, attack_enemy);
    handle_buttons(0);
    close_action_menu();
    stop_turn_timer();
}

export function pause_fight() {
    clearTimeout(turn_timer);
    clearInterval(turn_timer_interval);

    pause_fight_button.removeEventListener("click", pause_fight);
    pause_fight_button.addEventListener("click", unpause_fight);
    pause_fight_icon.src = "./img/ui/play-button.png";
    enemy_img.style.filter = ("brightness(50%)")
    enemy_img.style.pointerEvents = "none";
    pause_sound.play();
    handle_buttons(0);
}

export function unpause_fight() {
    start_turn_timer(true);
    
    pause_fight_button.addEventListener("click", pause_fight);
    pause_fight_button.removeEventListener("click", unpause_fight);
    pause_fight_icon.src = "./img/ui/pause-button.png";
    enemy_img.style.filter = ("brightness(100%)")
    enemy_img.style.pointerEvents = "";
    pause_sound.play();
    handle_buttons(1);
}