// Draw the game
function draw() {

    // Gameplay area
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);

    //Draw Ball
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

    // Draw scores
    ctx.font = "30px monospace";
    ctx.textAlign = "left"
    ctx.fillText(leftScore.toString(), 50, 50);
    ctx.textAlign = "right"
    ctx.fillText(rightScore.toString(), width - 50, 50);
    
    
    


}


// Update the game
function update() {
    ballPosition.x += xSpeed;
    ballPosition.y += ySpeed;
}

function checkPaddleCollision(ball, paddle ) {
    // check if the paddle and ball overlap vertically and horizontally.
    return (
        ball.left   < paddle.right &&
        ball.right  > paddle.left &&
        ball.top    < paddle.bottom &&
        ball.bottom > paddle.top
    );
}

// check what angle of the paddle the ball hit, then increase or decrese ySpeed based on that.
function adjustAngle(distanceFromTop, distanceFromBottom) {
    console.log(`top: ${distanceFromTop}, bottom: ${distanceFromBottom}`);
    if (distanceFromTop < 5) {
        // If ball hit near the of the paddle, reduce ySpeed.
        ySpeed -= 0.5;
        console.log(`adjustAngle - Speed near top: ${ySpeed}`);
    } else if (distanceFromBottom < 0) {
        // If ball hit near bottom of paddle, increase ySpeed
        ySpeed += 0.5;
        console.log(`adjustAngle - Speed near bottom: ${ySpeed}`);
    }
}

function checkCollision() {
    let ball = {
        left: ballPosition.x,
        right: ballPosition.x + BALL_SIZE,
        top: ballPosition.y,
        bottom: ballPosition.y + BALL_SIZE
    }

    let leftPaddle = {
        left: PADDLE_OFFSET,
        right: PADDLE_OFFSET + PADDLE_WIDTH,
        top: leftPaddleTop,
        bottom: leftPaddleTop + PADDLE_HEIGHT
    };
    
    let rightPaddle = {
        left: width - PADDLE_WIDTH - PADDLE_OFFSET,
        right: width - PADDLE_OFFSET,
        top: rightPaddleTop,
        bottom: rightPaddleTop + PADDLE_HEIGHT
    };

    if (checkPaddleCollision(ball, leftPaddle)) {
        // Left paddle collision happened
        let distanceFromTop = ball.top - leftPaddle.top;
        let distanceFromBottom = leftPaddle.bottom - ball.bottom;
        adjustAngle(distanceFromTop, distanceFromBottom);
        xSpeed = Math.abs(xSpeed);
    }

    if (checkPaddleCollision(ball, rightPaddle)) {
        // Right paddle collision happened
        let distanceFromTop = ball.top - rightPaddle.top;
        let distanceFromBottom = rightPaddle.bottom - ball.bottom;
        adjustAngle(distanceFromTop, distanceFromBottom);
        xSpeed = -Math.abs(xSpeed);
    }
    
    if (ball.left < 0) {
        rightScore++;
        initBall();
    }
    if (ball.right > width) {
        leftScore++;
        initBall();
    }

    if (ball.top < 0 || ball.bottom > height) {
        ySpeed = -ySpeed;
    }
}

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

// Ball postion at the start of each game.
function initBall() {
    ballPosition = {x: 20, y: 30}; 
    xSpeed = 4;
    ySpeed = 2;
}

// runs the game.
function gameloop() {
    draw();
    update();
    checkCollision();

    // Call this function after a timeout, can set the game speed.
    setTimeout(gameloop, 30)
}

// Creating the window
let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;

// Creating the ball
const BALL_SIZE = 5;
let ballPosition 
let xSpeed;
let ySpeed;

// Paddles
const PADDLE_WIDTH = 5;
const PADDLE_HEIGHT = 20;
const PADDLE_OFFSET = 10;

let leftPaddleTop = 10;
let rightPaddleTop = 30;

// Score Variables
let leftScore = 0;
let rightScore = 0;

// Paddle controls
const PADDLESPEED = 10



initBall();
gameControls();
gameloop();
