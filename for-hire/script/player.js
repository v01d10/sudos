var player_health_bar = document.getElementById("player_health_bar");
var player_health_text = document.getElementById("player_health_text");
import { player_attributes } from "./player_attributes.js";

var player_energy_bar = document.getElementById("player_energy_bar");
var player_energy_text = document.getElementById("player_energy_text");
var player_mana_bar = document.getElementById("player_mana_bar");
var player_mana_text = document.getElementById("player_mana_text");

export let player = {
    name: { name: "Name", value: "Fuckface"},
    sex: {male: false, female: false},

    health: {name: "Health", value: 10},
    health_max: 10,
    energy: {name: "Energy", value: 10},
    energy_max: 10,
    mana: {name: "Mana", value: 10},
    mana_max: 10,
    
    hunger: {name: "Hunger", value: 1},
    thirst: {name: "Thirst", value: 0},

    level: {name: "Level", value: 1},
    experience: {name: "Experience", value: 0},
    experience_needed: {name: "Experience Needed", value: 100},
    attribute_points: {name: "Attribute Points", value: 1},

    attributes: player_attributes,

    honor: {name: "Honor", value: 0},
    notoriety: {name: "Notoriety", value: 0},
    days: {name: "Days Passed", value: 0},

    attack_cost: -1.5,
    block_cost: -1,

    damage: -1,
    damage_increment: 0,
    armor: 1,

    money: 10,

    isInCombat: false,
    target: {},

    available_skills: [],
    active_skills: [],
    available_spells: [],
    active_spells: [],

    max_inventory_size: 7,
    inventory: [],
    helmet: null,
    torso: null,
    gloves: null,
    pants: null,
    boots: null,
    weapon: null,

    get_health_percentage: function() {
        var percentage = Math.floor((this.health / this.health_max) * 100);
        player_health_text.innerHTML = percentage + "%";
    
        if(percentage < 3) {
            player_health_bar.style.display = "none";
        }
        player_health_bar.style.width = (percentage - 5) + "%";
    },

    get_energy_percentage: function() {
        var percentage = Math.floor((this.energy / this.energy_max) * 100);
        player_energy_text.innerHTML = percentage + "%";
    
        if(percentage < 3) {
            player_energy_bar.style.display = "none";
        }
        player_energy_bar.style.width = (percentage - 5) + "%";
    },

    get_mana_percentage: function() {
        var percentage = Math.floor((this.mana / this.mana_max) * 100);
        player_mana_text.innerHTML = percentage + "%";
    
        if(percentage < 3) {
            player_mana_bar.style.display = "none";
        }
        player_mana_bar.style.width = (percentage - 7.5) + "%";
    },

    get_percentages: function() {
        this.get_health_percentage();
        this.get_energy_percentage();
        this.get_mana_percentage();
    },

    change_health: function(amount) {
        if(amount > 0) {
            if(this.health + amount >= this.health_max) {
                this.health = this.health_max;
                this.get_health_percentage();
                return;
            }
        }
        if(this.health + amount <= 0) {
            death();
            return;
        }
        this.health += amount;
        this.get_health_percentage();
    },

    change_energy: function(amount) {
        if(amount > 0) {
            if(this.energy + amount >= this.energy_max) {
                this.energy = this.energy_max;
                this.get_energy_percentage();
                return;
            }
        }

        if(this.energy + amount <= 0) {
            return;
        }
        
        this.energy += amount;
        this.get_energy_percentage();
    },

    change_mana: function(amount) {
        if(amount > 0) {
            if(this.mana + amount >= this.mana_max) {
                this.mana = this.mana_max;
                this.get_mana_percentage();
                return;
            }
        }
        if(this.mana + amount < 0) {
            alert("Not enough mana!");
            return;
        }
        this.mana += amount;
        this.get_mana_percentage();
    },

    deal_damage: function(amount) {
        this.target.change_health(-3);
        console.log(this.target.health);
    },

    death: function () {
        console.log("You are dead!");
    },
}