import { play_dialogue_sound } from "../audio_engine.js";

var message_holder = document.getElementById("message_holder");

export function create_message(text, type) {
    var message = document.createElement("div");
    message.classList.add("message");
    message.innerHTML = text;

    if(type == 1) {
        message.style.fontStyle = "oblique";
    }
    if(type == 2) {
        message.style.fontWeight = "bold";

    }

    message_holder.appendChild(message);
    message.animate(
        [
            {filter: "invert(100%)"},
            {filter: "invert(0%)"}
        ],
        {
            duration: 500,
        }
    )

    play_dialogue_sound();
}