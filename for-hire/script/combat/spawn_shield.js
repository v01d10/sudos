export var shield;
export let shield_fade_rate = 100;
export let shield_lifetime = 1500;

export var fadeOutInterval;

export function spawn_shield_button(block_player, attack_enemy) {
    shield = document.createElement("img");
    shield.src = "./img/ui/shield.png";
    shield.style.position = "absolute"; shield.style.width = "100px"; shield.style.height = "100px";
    shield.style.left = Math.floor(Math.random() * ( window.innerWidth - 100)) + "px";
    shield.style.top = Math.floor(Math.random() * (window.innerHeight - 100)) + "px";
    shield.style.opacity = 0;
    document.body.appendChild(shield);

    shield.addEventListener("click", block_player);
    shield.addEventListener("click", attack_enemy);

    var fadeInInterval = setInterval(function() {
    if (shield.style.opacity < 1) {
        shield.style.opacity = parseFloat(shield.style.opacity) + 0.1;
    } else {
        clearInterval(fadeInInterval);
    }
    }, shield_fade_rate);

    var fadeOutTimeout = setTimeout(() => {
        fadeOutInterval = setInterval(function() {
            if (shield.style.opacity > 0) {
                shield.style.opacity = parseFloat(shield.style.opacity) - 0.1;
            } else {
                shield.remove();
                attack_enemy();
                clearInterval(fadeOutInterval);
            }
            }, shield_fade_rate);
    }, shield_lifetime);
}