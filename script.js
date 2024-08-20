// Draw the game //
function draw() {
ctx.fillStyle = "black";
ctx.fillRect(0, 0, width, height);

ctx.fillStyle = "white";
ctx.fillRect(ballPosition.x, ballPosition.y, BALL_SIZE, BALL_SIZE)
}

// Creating the window //
let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;

// Creating the ball //
const BALL_SIZE = 5;
let ballPosition = {x: 20, y: 30};

draw();