var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var blockSize = 20;

var dirX = 0;
var dirY = 0;

var posX = blockSize;
var posY = blockSize;

var tailPos = [];
var tail = 5;

var appleX = getRandomInt(30)*20;
var appleY = getRandomInt(30)*20;

var score = 0;

myCanvas.width = width = 600;
myCanvas.height = height = 600;
ctx.beginPath();

//This generates a random number from zero to the specific max
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

//This function draws the snake and advances its position
function drawSnake(){
	ctx.fillStyle = "#00ff00";
	ctx.fillRect(posX, posY, blockSize, blockSize);
	posX += dirX;
	posY += dirY;
	tailPos.push([posX, posY]);
	worldCheck();
}

//This function draws the tail of the snake based on all the positions stored in the tailPos array
function drawTail(){
	for(var i = 0; i < tailPos.length; i++){
		ctx.fillStyle = "#00ff00";
		ctx.fillRect(tailPos[i][0], tailPos[i][1], blockSize, blockSize);
	}
	if(tailPos.length > score){
		tailPos.shift();
	}
}

function countInArray(what) {
	var count = 0;
  for (var i = 0; i < bombs.length; i++) {
    if (bombs[i] === what) {
      count++;
    }
  }
  return count;
}

function hitTail(){
	for(var i = 0; i < bombs.length; i++){
		if(countInArray(bombs[i] > 1)){
			alert("hit tail");
		}
	}
}

//This function draws the apple
function drawApple(){
	ctx.fillStyle = "#ff0000";
	ctx.fillRect(appleX, appleY, blockSize, blockSize);
}

//This function checks if the the head of the snake is in the same position of the apple
function appleCheck(){
	if(posX == appleX && posY == appleY){
		score += 3;
		appleX = getRandomInt(30)*20;
		appleY = getRandomInt(30)*20;
		var j = document.getElementById("score").innerHTML = score;
	}
}

//This function checks if the snake has moved out of the world
function worldCheck(){
	if(posX - blockSize >= width || posX + blockSize < 0 || posY - blockSize >= height || posY + blockSize < 0){
		alert("game over :( \n your score was: " + score);
		reset();
	}
}

//This function uses the keyboard input to change the direction of the snake
function movePlayer(e){
    console.log(e.keyCode);
		if(e.keyCode == 38){
			dirX = 0;
			dirY = -blockSize;
		}else if(e.keyCode == 40){
			dirX = 0;
			dirY = blockSize;
		}else if(e.keyCode == 39){
			dirX = blockSize;
			dirY = 0;
		}else if(e.keyCode == 37){
			dirX = -blockSize;
			dirY = 0;
		}
	e.preventDefault();
}

//this function resets the canvas and all variabls to resart the game
function reset(){
	ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
	posX = blockSize;
	posY = blockSize;
	dirX = 0;
	dirY = 0;
	score = 0;
	tailPos = [];
	appleX = getRandomInt(30)*20;
	appleY = getRandomInt(30)*20;
	var j = document.getElementById("score").innerHTML = score;
}

//////Program\\\\\\
addEventListener("keydown", movePlayer, false);

setInterval(function game(){
	ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
	drawApple();
	drawSnake();
	drawTail();
	appleCheck();
	worldCheck();
}, 99);
