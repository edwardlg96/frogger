var incrementX = 101;
var incrementY = 200;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 0;
    this.y = 20;
    this.width = 50;
    this.height = 85;
    this.speed = Math.random() * 5;


    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};


Enemy.prototype.collisions = function(object) {
    return (this.x < object.x + object.width  && this.x + this.width  > object.x &&
        this.y < object.y + object.height && this.y + this.height > object.y);    
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x += (incrementX* dt * this.speed);
    //console.log('enemy x = ', this.x, 'enemy y = ', this.y);    
    if(this.x > 480){
        var locations = [85.8 , 97.6 , 242.40];
        this.speed = Math.random() * 5;
        this.x = 0;
        this.y = locations[getRandomInt(0,2)];

    }
    if(this.collisions(player)){
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    Enemy.call(this);
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 424;

};
Player.prototype = Object.create(Enemy.prototype);
Player.prototype.reset = function(){
    this.x = 202;
    this.y = 424;
};
Player.prototype.update = function(dt) {
    if(player.y < 20){
        alert("You did it!");
        player.reset();
    }
    console.log('player x = ', this.x, 'player y = ', this.y);    
};
Player.prototype.handleInput = function(direction){
    console.log("Handle input");
    switch(direction){
    case 'left':
    if(this.x > 0){
        this.x -= incrementX;
    }
    break;
    case 'up':
    this.y -= incrementY;
    break;
    case 'right':
    if(this.x < 404){
        this.x += incrementX;    
    }    
    break;
    case 'down':
    if(this.y < 424){
        this.y += incrementY;
    }
    break;    

    }
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player();
for(var i = 1 ; i < 3 ; i++){
    var enemy = new Enemy();
    enemy.y= 75*(i+1);
     allEnemies.push(enemy);
   // allEnemies[i]= new Enemy();
    
   
}



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});