function Zoro(game, spritesheet) {
    this.ctx = game.ctx;
    this.scale = 1;
    this.idle = new Animation(spritesheet[0], 65, 70, 261, 0.4, 4, true, this.scale);
    this.running = new Animation(spritesheet[1], 80, 50, 632, 0.15 ,8, true, this.scale);
    this.dash = new Animation(spritesheet[2], 82, 50, 577, 0.15, 7, true, this.scale);
    this.speed = this.scale * 50;
    this.dashSpeed = this.scale * 200;
    this.acceleration = this.scale * 1.5;
    this.actionSheet = this.idle;
    this.actionAnchor = [];
    this.actionAnchor.push(380);
    this.actionAnchor.push(394);
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
    if (this.x > 960) {
        this.move = false;
        this.game.move = false;
        this.actionSheet = this.idle;

        this.speed = this.scale * 50;
        this.x = 0;
        this.y = this.actionAnchor[0];
        this.count = 0;
    }

    if (this.move) {

        if (this.x >= 300) {
            this.speed = this.dashSpeed;
            this.x += this.game.clockTick * (this.speed);
            this.actionSheet = this.dash;

        } else {
            this.x += this.game.clockTick * (this.speed);
        }
    } else {
        this.count += 1;
        if (this.count > 100) {
            this.move = true;
            this.game.move = true;
            this.actionSheet = this.running;
            this.x = this.x + 65;
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

