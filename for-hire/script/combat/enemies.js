export class enemy_base {
    constructor(name, health, health_max, damage, armor, img) {
        this.name = name;
        this.health = health;
        this.health_max = health_max;
        this.damage = damage;
        this.armor = armor;
        this.img = img;
    }

    get_health_percentage() {
        var percentage = Math.floor((this.health / this.health_max) * 100);
        enemy_health_text.innerHTML = percentage + "%";
    
        if(percentage < 3) {
            enemy_health_bar.style.display = "none";
        }
        enemy_health_bar.style.width = (percentage - 5) + "%";
    }

    change_health(amount) {
        if(amount > 0) {
            if(this.health + amount > this.health_max) {
                this.health = this.health_max;
                return;
            }
        }
        if(this.health - amount < 0) {
            death();
            return;
        }
        this.health += amount;
        this.get_health_percentage();
    }

    death() {
        console.log("Enemy dead!");
    }

};

export let enemy_0 = new enemy_base("Enemy 0", 10, 10, -2, 1, '../img/enemies/monster_river.jpg');
let enemy_1 = new enemy_base("Enemy 1", 7, 7, -1, 0, '../img/enemies/monster_river.jpg');
let enemy_2 = new enemy_base("Enemy 0", 13, 13, -3, 2, "../img/enemies/monster_river.jpg");

export var enemies = [
    enemy_0,
    enemy_1,
    enemy_2
];
