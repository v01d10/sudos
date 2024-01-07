import { load_description } from "../travel.js";

export function riverwood_trader_description() {
    var string;
    string = "You slowly open heavy wooden door and there behind the counter is standing old fat blading man. Lives in this village his whole life. <br>"
    + "On his shelves you can find old and mostly rusty equipment of long dead adventurers like yourself,"
    + " some food and potions. <br>" 
    + "Be careful for he knows every possible trick and scam in the book. Watch your pockets...";
    
    load_description(string);
}

export function riverwood_inn_description() {
    var string;
    string = "You open the door and your nose gets immediately hit by a stench of old beer, piss and sweat.";
    
    load_description(string);
}