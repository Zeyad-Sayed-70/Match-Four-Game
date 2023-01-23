export default class Player {
    
    constructor(_name = 'player', _color) {
        this.player_name = _name;
        this.score = 0;
        this.color = _color;
    }

    setScore(_newScore) {
        this.score = _newScore;
        return this.score;
    }

    getScore() {
        return this.score;
    }

    setColor(_newColor) {
        this.color = _newColor;
    }

    getColor() {
        return this.color;
    }

    getName() {
        return this.player_name;
    }
}