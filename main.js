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
function Background(game, x, goBackX, spritesheet) {
    this.x = x;
    this.xCopy = x;

    this.goBackX = goBackX,

    this.y = 0;
    this.scale = 0.5;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
};

Background.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet,
        this.x, this.y, 1280, 540);
};

Background.prototype.update = function () {
    if (this.game.move)
        this.x -= 0.25;
    //Move past canvas
    if (this.x < this.goBackX) {
        this.x = this.xCopy;
    }
    //this.game.parallax_x2 -= 1;
};
function Foreground(game, x, goBackX, spritesheet) {
    this.x = x;
    this.xCopy = x;

    this.goBackX = goBackX;

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
    if (this.game.move) {
        if (this.game.dash) {
            this.x -= 5;
        } else {
            this.x -= 2;
        }
    }
    if (this.x < this.goBackX) {
        this.x = this.xCopy;
    }
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
function Sunny(game, spritesheet) {
    this.speed = 100;
    this.x = 480;
    this.y = 6;
    this.game = game;
    this.ctx = game.ctx
    this.sheet = spritesheet;
}

Sunny.prototype = new Entity();
Sunny.prototype.constructor = Sunny;

Sunny.prototype.update = function () {
    if (this.game.move)
        this.x -= 0.25;
}

Sunny.prototype.draw = function () {
    this.ctx.drawImage(this.sheet,
        this.x, this.y, 230 * 1.98, 230 * 1.98);
}

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
AM.queueDownload("./img/water.png");

AM.queueDownload("./img/Idle.png");
AM.queueDownload("./img/Running.png");
AM.queueDownload("./img/Dash.png");
AM.queueDownload("./img/Guard.png");
AM.queueDownload("./img/thousand_sunny.png");

//props
AM.queueDownload("./img/barrel.png");


AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var canvas2 = document.getElementById("secondGameWorld");

    var ctx = canvas.getContext("2d");
    var ctx2 = canvas2.getContext("2d");

    var gameEngine = new GameEngine();
    var gameEngine2 = new GameEngine();

    gameEngine2.init(ctx2);
    gameEngine2.start();

    gameEngine.init(ctx);
    gameEngine.start();


    gameEngine2.addEntity(new Background(gameEngine2, 1270, 0, AM.getAsset("./img/background.png")));
    gameEngine2.addEntity(new Background(gameEngine2, 0, -1280, AM.getAsset("./img/background.png")));
    gameEngine2.addEntity(new Sunny(gameEngine2, AM.getAsset("./img/thousand_sunny.png")));
    gameEngine2.addEntity(new Background(gameEngine2, 0, -1920, AM.getAsset("./img/water.png")));

    //gameEngine2.addEntity(new BackgroundLater(gameEngine2, AM.getAsset("./img/background.png")));
    gameEngine.addEntity(new Foreground(gameEngine, 0, -1920, AM.getAsset("./img/foreground.png")));
    gameEngine.addEntity(new Foreground(gameEngine, 1920, 0, AM.getAsset("./img/foreground.png")));


    // gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/background - 2 - 1.png")));

    //gameEngine.addEntity(new MushroomDude(gameEngine, AM.getAsset("./img/mushroomdude.png")));
    //gameEngine.addEntity(new Cheetah(gameEngine, AM.getAsset("./img/runningcat.png")));
    //gameEngine.addEntity(new Guy(gameEngine, AM.getAsset("./img/guy.jpg")));

    var spriteSheets = [];
    spriteSheets.push(AM.getAsset("./img/Idle.png"));
    spriteSheets.push(AM.getAsset("./img/Running.png"));
    spriteSheets.push(AM.getAsset("./img/Dash.png"));
    spriteSheets.push(AM.getAsset("./img/Guard.png"));

   gameEngine.addEntity(new Prop(gameEngine, AM.getAsset("./img/barrel.png"), 970, 400, 140, 190, 2, false, 0))

    var zoro = new Zoro(gameEngine, gameEngine2, spriteSheets);
    gameEngine.addEntity(zoro);

    console.log("All Done!");
});