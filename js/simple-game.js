/**
 * GitHub Snake Game - Simplified Version
 */

document.addEventListener('DOMContentLoaded', () => {
    // Canvas and context
    const canvas = document.getElementById('game-board');
    const ctx = canvas.getContext('2d');
    
    // Set fixed canvas dimensions
    canvas.width = 500;
    canvas.height = 500;
    
    // Grid cell size
    const CELL_SIZE = 20;
    const GRID_SIZE = 25; // 500/20 = 25 cells
    
    // Game variables
    let snake = [];
    let direction = 'right';
    let nextDirection = 'right';
    let food = { x: 0, y: 0 };
    let score = 0;
    let gameLoop = null;
    let gameActive = false;
    
    // DOM elements
    const scoreElement = document.getElementById('score');
    const gameOverElement = document.getElementById('game-over');
    const finalScoreElement = document.getElementById('final-score');
    const restartButton = document.getElementById('restart-btn');
    
    // Initialize the game
    function init() {
        // Add event listeners
        document.addEventListener('keydown', handleKeyPress);
        restartButton.addEventListener('click', startGame);
        
        // Initialize touch controls if they exist
        const upBtn = document.getElementById('up-btn');
        const downBtn = document.getElementById('down-btn');
        const leftBtn = document.getElementById('left-btn');
        const rightBtn = document.getElementById('right-btn');
        
        if (upBtn) upBtn.addEventListener('click', () => changeDirection('up'));
        if (downBtn) downBtn.addEventListener('click', () => changeDirection('down'));
        if (leftBtn) leftBtn.addEventListener('click', () => changeDirection('left'));
        if (rightBtn) rightBtn.addEventListener('click', () => changeDirection('right'));
        
        // Start the game
        startGame();
    }
    
    // Reset and start the game
    function startGame() {
        // Hide game over screen
        if (gameOverElement) gameOverElement.classList.add('hidden');
        
        // Reset game variables
        snake = [];
        score = 0;
        if (scoreElement) scoreElement.textContent = '0';
        
        // Reset the direction
        direction = 'right';
        nextDirection = 'right';
        
        // Create snake in the middle of the board
        const startX = Math.floor(GRID_SIZE / 4);
        const startY = Math.floor(GRID_SIZE / 2);
        
        console.log(`Starting snake at ${startX},${startY}`);
        
        // Start with a snake of length 3
        for (let i = 0; i < 3; i++) {
            snake.push({ x: startX - i, y: startY });
        }
        
        console.log('Snake segments:', snake.map(s => `(${s.x},${s.y})`).join(', '));
        
        // Create first food
        createFood();
        
        // Start game loop
        if (gameLoop) clearInterval(gameLoop);
        gameActive = true;
        
        gameLoop = setInterval(update, 150);
        
        // Draw the initial state
        draw();
    }
    
    // Game update function
    function update() {
        if (!gameActive) return;
        
        // Move snake in the current direction
        moveSnake();
        
        // Check for collisions
        if (checkCollision()) {
            gameOver();
            return;
        }
        
        // Check if snake ate food
        if (snake[0].x === food.x && snake[0].y === food.y) {
            eatFood();
        } else {
            // Remove tail if not eating
            snake.pop();
        }
        
        // Draw everything
        draw();
    }
    
    // Snake movement
    function moveSnake() {
        // Update direction from next direction
        direction = nextDirection;
        
        // Calculate new head position
        const head = { x: snake[0].x, y: snake[0].y };
        
        switch (direction) {
            case 'up':
                head.y -= 1;
                break;
            case 'down':
                head.y += 1;
                break;
            case 'left':
                head.x -= 1;
                break;
            case 'right':
                head.x += 1;
                break;
        }
        
        // Add new head to the beginning of the snake array
        snake.unshift(head);
    }
    
    // Check for collisions
    function checkCollision() {
        const head = snake[0];
        
        // Check for wall collision
        if (
            head.x < 0 || 
            head.x >= GRID_SIZE || 
            head.y < 0 || 
            head.y >= GRID_SIZE
        ) {
            return true;
        }
        
        // Check for self collision (skip the head)
        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                return true;
            }
        }
        
        return false;
    }
    
    // Create a new food item at a random position
    function createFood() {
        // Get a random position that is not occupied by the snake
        let newFoodPos;
        
        do {
            newFoodPos = {
                x: Math.floor(Math.random() * GRID_SIZE),
                y: Math.floor(Math.random() * GRID_SIZE)
            };
        } while (snake.some(segment => segment.x === newFoodPos.x && segment.y === newFoodPos.y));
        
        food = newFoodPos;
        console.log(`Food created at ${food.x},${food.y}`);
    }
    
    // Handle snake eating food
    function eatFood() {
        // Increase score
        score += 1;
        if (scoreElement) scoreElement.textContent = score;
        
        // Create new food
        createFood();
    }
    
    // Draw the game
    function draw() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw background grid
        ctx.fillStyle = '#161b22'; // Dark background
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Grid lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        for (let i = 0; i < canvas.width; i += CELL_SIZE) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, canvas.height);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(canvas.width, i);
            ctx.stroke();
        }
        
        // Draw food - bright orange circle
        const foodX = food.x * CELL_SIZE;
        const foodY = food.y * CELL_SIZE;
        
        ctx.fillStyle = '#FF5500';
        ctx.beginPath();
        ctx.arc(
            foodX + CELL_SIZE / 2, 
            foodY + CELL_SIZE / 2, 
            CELL_SIZE / 2, 
            0, 
            Math.PI * 2
        );
        ctx.fill();
        
        // Draw snake - red head, green body
        snake.forEach((segment, index) => {
            const x = segment.x * CELL_SIZE;
            const y = segment.y * CELL_SIZE;
            
            // Red head, green body for high visibility
            ctx.fillStyle = index === 0 ? '#FF0000' : '#00FF00';
            ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
            
            // Add eyes to the head
            if (index === 0) {
                ctx.fillStyle = '#FFFFFF';
                
                // Position eyes based on direction
                const eyeSize = CELL_SIZE / 4;
                const eyeOffset = CELL_SIZE / 3;
                
                // Left eye
                let leftEyeX, leftEyeY;
                // Right eye
                let rightEyeX, rightEyeY;
                
                switch (direction) {
                    case 'up':
                        leftEyeX = x + eyeOffset;
                        leftEyeY = y + eyeOffset;
                        rightEyeX = x + CELL_SIZE - eyeOffset - eyeSize;
                        rightEyeY = y + eyeOffset;
                        break;
                    case 'down':
                        leftEyeX = x + eyeOffset;
                        leftEyeY = y + CELL_SIZE - eyeOffset - eyeSize;
                        rightEyeX = x + CELL_SIZE - eyeOffset - eyeSize;
                        rightEyeY = y + CELL_SIZE - eyeOffset - eyeSize;
                        break;
                    case 'left':
                        leftEyeX = x + eyeOffset;
                        leftEyeY = y + eyeOffset;
                        rightEyeX = x + eyeOffset;
                        rightEyeY = y + CELL_SIZE - eyeOffset - eyeSize;
                        break;
                    case 'right':
                        leftEyeX = x + CELL_SIZE - eyeOffset - eyeSize;
                        leftEyeY = y + eyeOffset;
                        rightEyeX = x + CELL_SIZE - eyeOffset - eyeSize;
                        rightEyeY = y + CELL_SIZE - eyeOffset - eyeSize;
                        break;
                }
                
                ctx.fillRect(leftEyeX, leftEyeY, eyeSize, eyeSize);
                ctx.fillRect(rightEyeX, rightEyeY, eyeSize, eyeSize);
            }
        });
        
        // Log drawing status
        console.log('Game redrawn with', snake.length, 'snake segments');
    }
    
    // Game over
    function gameOver() {
        gameActive = false;
        clearInterval(gameLoop);
        
        console.log('Game over! Final score:', score);
        
        // Show game over screen
        if (gameOverElement) {
            gameOverElement.classList.remove('hidden');
            if (finalScoreElement) finalScoreElement.textContent = score;
        }
    }
    
    // Handle keyboard input
    function handleKeyPress(e) {
        if (!gameActive) return;
        
        // Prevent default behavior for arrow keys
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd'].includes(e.key)) {
            e.preventDefault();
        }
        
        // Change direction
        switch (e.key) {
            case 'ArrowUp':
            case 'w':
            case 'W':
                changeDirection('up');
                break;
            case 'ArrowDown':
            case 's':
            case 'S':
                changeDirection('down');
                break;
            case 'ArrowLeft':
            case 'a':
            case 'A':
                changeDirection('left');
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
                changeDirection('right');
                break;
            case ' ': // space bar to pause/resume
                togglePause();
                break;
        }
    }
    
    // Change snake direction
    function changeDirection(newDirection) {
        // Prevent 180-degree turns
        if (
            (direction === 'up' && newDirection === 'down') ||
            (direction === 'down' && newDirection === 'up') ||
            (direction === 'left' && newDirection === 'right') ||
            (direction === 'right' && newDirection === 'left')
        ) {
            return;
        }
        
        nextDirection = newDirection;
    }
    
    // Toggle pause state
    function togglePause() {
        if (gameActive) {
            gameActive = false;
            clearInterval(gameLoop);
        } else {
            gameActive = true;
            gameLoop = setInterval(update, 150);
        }
    }
    
    // Initialize the game
    init();
});
