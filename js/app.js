// Constants for referencing positions
var xConstant = 100;
var yConstant = 75;

//Win/lose the game
var Reset = function() {
  player.x = 2;
  player.y = 6;
};

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.speed = speed;
  this.x = x;
  this.y = y;
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
// If it runs off the screen respawn it
  if (this.x >= 5) {
    this.x = 0;
  }
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  else {
    this.x += this.speed * dt;
  }

// Collision
  if (player.x >= this.x - 0.7 && player.x <= this.x + 0.7) {
    if (player.y === this.y) {
      Reset();
    }
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(
    Resources.get(this.sprite),
    this.x * xConstant,
    this.y * yConstant
  );
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
  this.sprite = 'images/char-cat-girl.png';
  this.x = x;
  this.y = y;
  this.speed = speed;
};

//Draw player
Player.prototype.update = function(dt) {};
Player.prototype.render = function() {
  ctx.drawImage(
    Resources.get(this.sprite),
    this.x * xConstant,
    this.y * yConstant);
};

// Keybinding
Player.prototype.handleInput = function(press) {
  //Hit the water, go back home
  if (this.y <= 1) {
    Reset();
  }
  //Be sure you don't go off the map!
  else {
    if (press === 'up') {
      this.y = this.y - 1;
    }
    if (press === 'right' && this.x != 4) {
      this.x = this.x + 1;
    }
    if (press === 'down' && this.y != 6) {
      this.y = this.y + 1;
    }
    if (press === 'left' && this.x != 0) {
      this.x = this.x - 1;
    }
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var pushEnemies = function() {
  allEnemies.push(new Enemy(0, 1, (Math.max(Math.random() * 4, 2))))
  allEnemies.push(new Enemy(0, 2, (Math.max(Math.random() * 4, 2))))
  allEnemies.push(new Enemy(0, 3, (Math.max(Math.random() * 4, 2))))
  allEnemies.push(new Enemy(0, 4, (Math.max(Math.random() * 4, 2))));
};
pushEnemies();

var player = new Player(2, 6);

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
// Added WASD compatibility. Left-handed players are important too!
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    //ARROW
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    //WASD
    87: 'up',
    65: 'left',
    83: 'down',
    68: 'right'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
