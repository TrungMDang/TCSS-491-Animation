var AM = new AssetManager();

function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.scale = scale;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth);

    ctx.drawImage(this.spriteSheet,
                 xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
                 this.frameWidth, this.frameHeight,
                 x, y,
                 this.frameWidth * this.scale,
                 this.frameHeight * this.scale);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

// no inheritance
function Background(game, spritesheet) {
    this.x = 0;
    this.y = 0;
    this.scale = 0.5;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
};


Background.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet,
        this.x, this.y, 1920, 540);
};

Background.prototype.update = function () {
    if (this.game.move)
        this.x -= 1;
    //this.game.parallax_x2 -= 1;
};
function BackgroundLater(game, spritesheet) {
    this.x = 1920;
    this.y = 0;
    this.scale = 0.5;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
};


BackgroundLater.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet,
        this.x, this.y, 1920, 540);
};

BackgroundLater.prototype.update = function () {
    if (this.game.move)
        this.x -= 0.5;
    //this.game.parallax_x2 -= 1;
};
function Foreground(game, spritesheet) {
    this.x = 0;
    this.y = 0;
    this.scale = 0.5;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
};

Foreground.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet,
        this.x, this.y, 1920, 540);
};

Foreground.prototype.update = function () {
    if (this.game.move)
        this.x -= 2;
    //this.game.parallax_x1 -= 2;
    //if (this.game.parallax_x1 < -960) {
    //    this.game.parallax_x1 = 0;
    //    this.x = this.game.parallax_x1;
    //}
};
function ForegroundLater(game, spritesheet) {
    this.x = 1920;
    this.y = 0;
    this.scale = 0.5;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
};

ForegroundLater.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet,
        this.x, this.y, 1920, 540);
};

ForegroundLater.prototype.update = function () {
    if (this.game.move)
        this.x -= 2;
    //this.game.parallax_x1 -= 2;
    //if (this.game.parallax_x1 < -960) {
    //    this.game.parallax_x1 = 0;
    //    this.x = this.game.parallax_x1;
    //}
};
//function Foreground1(game, spritesheet) {
//    this.x = game.parallax_x2;
//    this.y = game.parallax_y2;
//    this.scale = 0.5;
//    this.spritesheet = spritesheet;
//    this.game = game;
//    this.ctx = game.ctx;
//};
//
//Foreground1.prototype.draw = function () {
//    this.ctx.drawImage(this.spritesheet,
//        this.x, this.y, 960, 540);
//};
//
//Foreground1.prototype.update = function () {
//    this.x -= 2;
//    this.game.parallax_x1 -= 2;
//    if (this.game.parallax_x2 < 0) {
//        this.game.parallax_x2 = 960;
//        this.x = this.game.parallax_x2;
//    }
//};
//function MushroomDude(game, spritesheet) {
//    this.animation = new Animation(spritesheet, 189, 230, 5, 0.10, 14, true, 1);
//    this.x = 0;
//    this.y = 0;
//    this.speed = 100;
//    this.game = game;
//    this.ctx = game.ctx;
//}
//
//MushroomDude.prototype.draw = function () {
//    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
//}
//
//MushroomDude.prototype.update = function () {
//    if (this.animation.elapsedTime < this.animation.totalTime * 8 / 14)
//        this.x += this.game.clockTick * this.speed;
//    if (this.x > 800) this.x = -230;
//}
//
//
//// inheritance
//function Cheetah(game, spritesheet) {
//    this.animation = new Animation(spritesheet, 512, 256, 2, 0.05, 8, true, 0.5);
//    this.speed = 350;
//    this.ctx = game.ctx;
//    Entity.call(this, game, 0, 250);
//}
//
//Cheetah.prototype = new Entity();
//Cheetah.prototype.constructor = Cheetah;
//
//Cheetah.prototype.update = function () {
//    this.x += this.game.clockTick * this.speed;
//    if (this.x > 800) this.x = -230;
//    Entity.prototype.update.call(this);
//}
//
//Cheetah.prototype.draw = function () {
//    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
//    Entity.prototype.draw.call(this);
//}
//
//// inheritance
//function Guy(game, spritesheet) {
//    this.animation = new Animation(spritesheet, 154, 215, 4, 0.15, 8, true, 0.5);
//    this.speed = 100;
//    this.ctx = game.ctx;
//    Entity.call(this, game, 0, 450);
//}
//
//Guy.prototype = new Entity();
//Guy.prototype.constructor = Guy;
//
//Guy.prototype.update = function () {
//    this.x += this.game.clockTick * this.speed;
//    if (this.x > 800) this.x = -230;
//    Entity.prototype.update.call(this);
//}
//
//Guy.prototype.draw = function () {
//    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
//    Entity.prototype.draw.call(this);
//}

function calcParallax(tileheight, speedratio, scrollposition) {
    //    by Brett Taylor http://inner.geek.nz/
    //    originally published at http://inner.geek.nz/javascript/parallax/
    //    usable under terms of CC-BY 3.0 licence
    //    http://creativecommons.org/licenses/by/3.0/
    return ((tileheight) - (Math.floor(scrollposition / speedratio) % (tileheight+1)));
}
//window.onload = function() {
//
//    window.onscroll = function() {
//        var posX = (document.documentElement.scrollLeft) ? document.documentElement.scrollLeft : window.pageXOffset;
//        var posY = (document.documentElement.scrollTop) ? document.documentElement.scrollTop : window.pageYOffset;
//
//        var ground = document.getElementById('ground');
//        var groundparallax = calcParallax(53, 8, posY);
//        ground.style.backgroundPosition = "0 " + groundparallax + "px";
//
//        var clouds = document.getElementById('clouds');
//        var cloudsparallax = calcParallax(400, .5, posY);
//        clouds.style.backgroundPosition = "0 " + cloudsparallax + "px";
//    }
//
//    document.getElementById('javascriptcode').onscroll = function() {
//        var posX = (this.scrollLeft) ? this.scrollLeft : this.pageXOffset;
//        var j = calcParallax(53, 16, posX);
//        console.log('scroll js: '+ j);
//        document.getElementById('javascriptcode').style.backgroundPosition = j + "px 0";
//    }
//}
AM.queueDownload("./img/RobotUnicorn.png");
AM.queueDownload("./img/guy.jpg");
AM.queueDownload("./img/mushroomdude.png");
AM.queueDownload("./img/runningcat.png");
AM.queueDownload("./img/background.png");
AM.queueDownload("./img/foreground.png");

AM.queueDownload("./img/Idle.png");
AM.queueDownload("./img/Running.png");
AM.queueDownload("./img/Dash.png");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");
    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();

    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/background.png")));
    gameEngine.addEntity(new BackgroundLater(gameEngine, AM.getAsset("./img/background.png")));
    gameEngine.addEntity(new Foreground(gameEngine, AM.getAsset("./img/foreground.png")));
    gameEngine.addEntity(new ForegroundLater(gameEngine, AM.getAsset("./img/foreground.png")));


    // gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/background - 2 - 1.png")));

    //gameEngine.addEntity(new MushroomDude(gameEngine, AM.getAsset("./img/mushroomdude.png")));
    //gameEngine.addEntity(new Cheetah(gameEngine, AM.getAsset("./img/runningcat.png")));
    //gameEngine.addEntity(new Guy(gameEngine, AM.getAsset("./img/guy.jpg")));

    var spritesheets = [];
    spritesheets.push(AM.getAsset("./img/Idle.png"));
    spritesheets.push(AM.getAsset("./img/Running.png"));
    spritesheets.push(AM.getAsset("./img/Dash.png"));

    var zoro = new Zoro(gameEngine, spritesheets);
    gameEngine.addEntity(zoro);

    console.log("All Done!");
});