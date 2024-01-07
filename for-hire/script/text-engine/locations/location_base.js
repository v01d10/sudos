export class location_base {
    constructor(name, description, actions, available_places, type) {
        this.name = name;
        this.description = description;
        this.actions = actions;
        this.available_places = available_places;
        this.type = type;
    }
};