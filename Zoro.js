function Zoro(game, spritesheet) {
    this.gameEngine = game;
    this.running = new Animation(spritesheet, 65, 20, 632, 0.02 ,8, true, 2);
}

Zoro.prototype = new Entity();
Zoro.prototype.constructor = Zoro;
