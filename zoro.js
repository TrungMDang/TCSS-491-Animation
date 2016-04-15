function Zoro(game, game2, spritesheets) {
    this.ctx = game.ctx;
    this.ctx2 = game2.ctx;
    this.game2 = game2;
    this.scale = 1.5;
    this.idle = new Animation(spritesheets[0], 65, 70, 261, 0.5, 4, true, this.scale);
    this.running = new Animation(spritesheets[1], 79, 50, 632, 0.15 ,8, true, this.scale);
    this.dash = new Animation(spritesheets[2], 82, 50, 577, 0.15, 7, true, this.scale);
    this.guard = new Animation(spritesheets[3], 55, 55, 165, 0.5, 3, true, this.scale);
    this.speed = this.scale * 50;
    this.dashSpeed = this.scale * 200;
    this.acceleration = this.scale * 1.5;
    this.actionSheet = this.idle;
    this.actionAnchor = [];
    this.actionAnchor.push(351);
    this.actionAnchor.push(370);
    this.actionAnchor.push(367);

    this.line = createLine();
    this.move = false;
    this.count = 0;
    Entity.call(this, game, 0, this.actionAnchor[0]);
}

Zoro.prototype = new Entity();
Zoro.prototype.constructor = Zoro;


/**************************************************************************************
 * Source: http://stackoverflow.com/questions/4270485/drawing-lines-on-html-page
 * */
function createLineElement(x, y, length, angle) {
    var line = document.createElement("div");
    var styles = 'border: 1px solid black; '
        + 'width: ' + length + 'px; '
        + 'height: 0px; '
        + '-moz-transform: rotate(' + angle + 'rad); '
        + '-webkit-transform: rotate(' + angle + 'rad); '
        + '-o-transform: rotate(' + angle + 'rad); '
        + '-ms-transform: rotate(' + angle + 'rad); '
        + 'position: absolute; '
        + 'top: ' + y + 'px; '
        + 'left: ' + x + 'px; ';
    line.setAttribute('style', styles);
    return line;
}

function createLine(x1, y1, x2, y2) {
    var a = x1 - x2,
        b = y1 - y2,
        c = Math.sqrt(a * a + b * b);

    var sx = (x1 + x2) / 2,
        sy = (y1 + y2) / 2;

    var x = sx - c / 2,
        y = sy;

    var alpha = Math.PI - Math.atan2(-b, a);

    return createLineElement(x, y, c, alpha);
};
/**                                        END
 **************************************************************************************/

Zoro.prototype.update = function (){
    //console.log(this.game.clockTick);

    //Move out of canvas
    if (this.x > 960) {
        this.move = false;
        this.game.move = false;
        this.game.dash =  false;
        this.game2.move = false;
        this.game2.dash =  false;

        this.actionSheet = this.idle;

        this.speed = this.scale * 50;
        this.x = 0;
        this.y = this.actionAnchor[0];
        this.count = 0;
    }

    //Inside canvas. Permit to move
    if (this.move) {
        if (this.x >= 200 && this.x <= 400) {           //Dash
            this.speed = this.dashSpeed;
            this.x += this.game.clockTick * (this.speed);
            this.actionSheet = this.dash;
            this.game.dash = true;
            this.game2.dash = true;
        } else if (this.x > 400) {
            //console.log(this.count);
            if (this.count > 200) {            //Running again
                this.move = true;
                this.game.move = true;
                this.game2.move = true;
                this.x += this.game.clockTick * (this.speed);
                this.actionSheet = this.running;
                this.y = this.actionAnchor[1];
            } else {                             //Guard
                this.count++;
                this.x = 401;
                //this.y = this.actionAnchor[2];
                this.speed = this.scale * 50;
                this.actionSheet = this.guard;
                this.game.move = false;
                this.game2.move = false;
                this.game.dash = false;
                this.game2.dash = false;
            }
        } else {
            //this.game.dash = false;
            this.x += this.game.clockTick * (this.speed);
        }
    } else {
        this.count++;
        if (this.count > 100) {         //Running
            this.move = true;
            this.game.move = true;
            this.game2.move = true;
            this.actionSheet = this.running;
            this.x = this.x + 20;
            this.y = this.actionAnchor[1];
        }
    }
    Entity.prototype.update.call(this);

};
Zoro.prototype.draw = function(game) {
    //document.body.appendChild(createLine(10, 450, 960, 450));
    this.actionSheet.drawFrame(this.game.clockTick, this.game.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
};

