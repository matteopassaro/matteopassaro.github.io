// Constants
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const gridSize = 10;
const snakeColor = 'green';
const foodColor = 'red';

// Variables
let score = 0;
let direction = 'right';
let snake = [
  { x: 50, y: 50 },
  { x: 40, y: 50 },
  { x: 30, y: 50 },
  { x: 20, y: 50 },
  { x: 10, y: 50 }
];
let food = {};

// Initialize the game
initializeGame();

// Listen for keyboard events
document.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 37: // Left arrow
      if (direction !== 'right') {
        direction = 'left';
      }
      break;
    case 38: // Up arrow
      if (direction !== 'down') {
        direction = 'up';
      }
      break;
    case 39: // Right arrow
      if (direction !== 'left') {
        direction = 'right';
      }
      break;
    case 40: // Down arrow
      if (direction !== 'up') {
        direction = 'down';
      }
      break;
  }
});

// Game loop
setInterval(function() {
  // Move the snake
  moveSnake();

  // Check if the snake has collided with the wall or itself
  if (hasCollided()) {
    endGame();
    return;
  }

  // Check if the snake has eaten the food
  if (hasEaten()) {
    score++;
    generateFood();
  }

  // Draw the game
  drawGame();
}, 100);

// Functions
function initializeGame() {
  // Generate the first food
  generateFood();
}

function moveSnake() {
  // Move the head of the snake
  let head = { x: snake[0].x, y: snake[0].y };
  switch (direction) {
    case 'left':
      head.x -= gridSize;
      break;
    case 'up':
      head.y -= gridSize;
      break;
    case 'right':
      head.x += gridSize;
      break;
    case 'down':
      head.y += gridSize;
      break;
  }
  snake.unshift(head);

  // Remove the tail of the snake
  snake.pop();
}

function hasCollided() {
  // Check if the snake has collided with the wall
  if (snake[0].x < 0 || snake[0].x >= canvas.width || snake[0].y < 0 || snake[0].y >= canvas.height) {
    return true;
  }

  // Check if the snake has collided with itself
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            return true;
          }
        }

        return false;
        }
        
        function hasEaten() {
        // Check if the snake has eaten the food
        if (snake[0].x === food.x && snake[0].y === food.y) {
        return true;
        }
        return false;
        }
        
        function generateFood() {
        // Generate a new food at a random location
        let x = Math.floor(Math.random() * canvas.width / gridSize) * gridSize;
        let y = Math.floor(Math.random() * canvas.height / gridSize) * gridSize;
        food = { x: x, y: y };
        }
        function drawGame() {
            // Clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw the score
            ctx.fillStyle = 'black';
            ctx.font = '20px Arial';
            ctx.fillText('Score: ' + score, 10, 30);
            
            // Draw the food
            ctx.fillStyle = foodColor;
            ctx.fillRect(food.x, food.y, gridSize, gridSize);
            
            // Draw the snake
            for (let i = 0; i < snake.length; i++) {
            ctx.fillStyle = snakeColor;
            ctx.fillRect(snake[i].x, snake[i].y, gridSize, gridSize);
            }
            }
            function endGame() {
                // Stop the game loop
                clearInterval();
                
                // Display the game over message
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = 'black';
                ctx.font = '40px Arial';
                ctx.fillText('Game Over', canvas.width / 2 - 100, canvas.height / 2 - 20);
                ctx.font = '20px Arial';
                ctx.fillText('Score: ' + score, canvas.width / 2 - 40, canvas.height / 2 + 20);
                }