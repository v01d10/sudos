import { get_random_int } from "./utils.js";

export var slash_sword_0 = new Audio("../audio/slash_sword_0.ogg");
export var block_hand = new Audio("../audio/block_hand.wav");
export var bite_monster_0 = new Audio("../audio/bite_monster_0.wav");
export var bite_monster_armored_0 = new Audio("../audio/bite_monster_armored_0.wav");
export var roar_monster_0 = new Audio("../audio/roar_monster_0.mp3");

export var pause_sound = new Audio('../audio/pause_1.wav');
export var unpause_sound = new Audio('../audio/unpause.wav');
pause_sound.volume = 0.5;

export var clock_tick = new Audio('../audio/clock_tick.wav');
export var clock_tack = new Audio('../audio/clock_tack.wav');
var clock_index = 0;
clock_tick.volume = 0.1;
clock_tack.volume = 0.1;

export var footsteps_concrete = new Audio("../audio/text_engine/footsteps/footsteps_concrete.wav");
export var footsteps_wood = new Audio("../audio/text_engine/footsteps/footsteps_wood.mp3");
export var wood_creak = new Audio("../audio/text_engine/footsteps/wood_creak.mp3");
export var door_open = new Audio("../audio/text_engine/door_open_0.wav");
export var door_slam = new Audio("../audio/text_engine/door_slam.mp3");
export var shop_bell = new Audio("../audio/text_engine/shop_bell.mp3");

var background_song;
var background_volume = 0.2;

var background_music = [
    new Audio("../audio/background/background_main.mp3"),
    new Audio("../audio/background/background_eagle.mp3"),
    new Audio("../audio/background/background_ride.mp3"),
    new Audio("../audio/background/background_vopna.mp3"),
]

var background_music_inn = new Audio("../audio/background/background_bard.mp3");

var ambience_sound;
var ambience_volume = 0.2;
var ambience_timeout = null;
var ambience_sounds = [
    new Audio("../audio/town_ambience.mp3"),
    new Audio("../audio/forest_ambience_0.mp3"),
    new Audio("../audio/forest_ambience_1.mp3"),
    new Audio("../audio/forest_ambience_night_0.mp3"),
    new Audio("../audio/river_ambience_0.mp3"),
    new Audio("../audio/mountain_ambience_0.mp3"),
    new Audio("../audio/mountain_ambience_1.mp3"),
]

var dialogue_sounds = [
    new Audio("../audio/text_engine/dialogue_0.wav"),
    new Audio("../audio/text_engine/dialogue_1.wav"),
    new Audio("../audio/text_engine/dialogue_2.wav"),
    new Audio("../audio/text_engine/dialogue_3.wav")
]


play_background_music_first();

function play_background_music_first() {
    var song_duration;
    
    setTimeout(() => {
        background_song = background_music[0];
        song_duration = background_song.duration * 1000;
        background_song.volume = background_volume;     
        background_song.play();  

        setTimeout(() => {
            play_background_music();
        }, song_duration);
    }, 1000);


}

function play_background_music(){
    var song_duration;

    background_song == background_music[Math.floor(Math.random() * background_music.length)]
    
    setTimeout(() => {
        song_duration = background_song.duration * 1000;
        background_song.volume = background_volume;     
        background_song.play();

        setTimeout(() => {
            play_background_music();
        }, song_duration);
    }, 250);
}

export function play_ambience_location(type) {
    if(ambience_sound != null) {
        clearTimeout(ambience_timeout);
        ambience_sound.pause();
    }

    var sound_duration;

    if(type == 0) {
        ambience_sound = ambience_sounds[0];
    }
    if(type == 1) {
        ambience_sound = ambience_sounds[get_random_int(1, 2)];
    }

    setTimeout(() => {
        ambience_sound.volume = ambience_volume;
        sound_duration = ambience_sound.duration;
        ambience_sound.play();
    }, 1000);

    ambience_timeout = setTimeout(() => {
        play_ambience_location(type);
    }, sound_duration);
}

export function play_ambience_place(type) {
    if(ambience_sound != null) {
        clearTimeout(ambience_timeout);
        ambience_sound.pause();
    }

    var sound_duration;

    if(type == 0) {
        ambience_sound = ambience_sounds[0];
    }
    if(type == 1) {
        ambience_sound = ambience_sounds[get_random_int(1, 2)];
    }

    setTimeout(() => {
        ambience_sound.volume = ambience_volume;
        sound_duration = ambience_sound.duration;
        ambience_sound.play();
        
    }, 500);

    ambience_timeout = setTimeout(() => {
        play_ambience_location(type);
    }, sound_duration);
}

export function play_clock_sound() {
    if(clock_index == 0) {
        clock_tick.play();
        clock_index = 1;
        return;
    }

    clock_tack.play();
    clock_index = 0; 
}

export function play_dialogue_sound() {
    var dialogue_sound = dialogue_sounds[Math.floor(Math.random() * dialogue_sounds.length)];
    dialogue_sound.play();
}