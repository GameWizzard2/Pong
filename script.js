// Draw the game
function draw() {

// Gameplay area
ctx.fillStyle = "black";
ctx.fillRect(0, 0, width, height);

// Ball
ctx.fillStyle = "white";
ctx.fillRect(ballPosition.x, ballPosition.y, BALL_SIZE, BALL_SIZE)

// Draw the paddles
ctx.fillRect(
    PADDLE_OFFSET,
    leftPaddleTop,
    PADDLE_WIDTH,
    PADDLE_HEIGHT
);

ctx.fillRect(
    width - PADDLE_WIDTH - PADDLE_OFFSET,
    rightPaddleTop,
    PADDLE_WIDTH,
    PADDLE_HEIGHT
    );
}

// Update the game
function update() {
    ballPosition.x += xSpeed;
    ballPosition.y += ySpeed;
}

function checkCollision() {
    let ball = {
        left: ballPosition.x,
        right: ballPosition.x + BALL_SIZE,
        top: ballPosition.y,
        bottom: ballPosition.y + BALL_SIZE
    }

    if (ball.left < 0 || ball.right > width) {
        xSpeed = -xSpeed;
    }

    if (ball.top < 0 || ball.bottom > height) {
        ySpeed = -ySpeed;
    }
}

function gameloop() {
    draw();
    update();
    checkCollision()
    ;

    // Call this function after a timeout
    setTimeout(gameloop, 30)
}

// Creating the window
let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;

// Creating the ball
const BALL_SIZE = 5;
let ballPosition = {x: 20, y: 30};

// ball settings 
let xSpeed = 4;
let ySpeed = 2;

// Paddles
const PADDLE_WIDTH = 5;
const PADDLE_HEIGHT = 20;
const PADDLE_OFFSET = 10;

let leftPaddleTop = 10;
let rightPaddleTop = 30;

// Paddle controls
const PADDLESPEED = 10



function gameControls() {
    document.addEventListener("mousemove", e => {
    rightPaddleTop = e.y - canvas.offsetTop;
    if (rightPaddleTop < 0) {
        rightPaddleTop = 0;
        } 

        else if (rightPaddleTop + PADDLE_HEIGHT > height) {
        rightPaddleTop = height - PADDLE_HEIGHT;
    }
    });
    document.addEventListener("keydown", e => {
    // Check which key is pressed
    switch(e.key) {
        case "ArrowUp":
            // Move the paddle up
            rightPaddleTop -= PADDLESPEED;
            // Make sure the paddle doesn't go off the top of the canvas
            if (rightPaddleTop < 0) {
                rightPaddleTop = 0;
            }
            break;
        case "ArrowDown":
            // Move the paddle down
            rightPaddleTop += PADDLESPEED;
            // Make sure the paddle doesn't go off the bottom of the canvas
            if (height - PADDLE_HEIGHT > height) {
                rightPaddleTop = 50;
            } 

            else if (rightPaddleTop + PADDLE_HEIGHT > height) {
                rightPaddleTop = height - PADDLE_HEIGHT;
            }
            break;
    }
});

}






gameControls();
gameloop();
