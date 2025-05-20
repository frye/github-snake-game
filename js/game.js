/**
 * GitHub Snake Game
 * A snake game with GitHub contribution graph aesthetics
 */

document.addEventListener('DOMContentLoaded', () => {
    // Canvas and context
    const canvas = document.getElementById('game-board');
    const ctx = canvas.getContext('2d');
    
    // Grid cell size
    const CELL_SIZE = 15; // Size of each cell in pixels
    
    // Game variables
    let snake = [];
    let direction = 'right';
    let nextDirection = 'right';
    let food = null;
    let score = 0;
    let highScore = localStorage.getItem('github-snake-high-score') || 0;
    let gameSpeed = 150; // milliseconds between moves
    let gameLoop = null;
    let gameActive = false;
    
    // Initialize the GitHub icons
    const githubIcons = new GithubIcons();
    
    // Initialize the contribution board
    const board = new ContributionBoard(canvas, CELL_SIZE);
    
    // Color scheme detection
    const colorSchemeMedia = window.matchMedia('(prefers-color-scheme: dark)');
    colorSchemeMedia.addEventListener('change', handleColorSchemeChange);
    
    // DOM elements
    const scoreElement = document.getElementById('score');
    const highScoreElement = document.getElementById('high-score');
    const gameOverElement = document.getElementById('game-over');
    const finalScoreElement = document.getElementById('final-score');
    const restartButton = document.getElementById('restart-btn');
    
    // Touch controls
    const upBtn = document.getElementById('up-btn');
    const downBtn = document.getElementById('down-btn');
    const leftBtn = document.getElementById('left-btn');
    const rightBtn = document.getElementById('right-btn');
    
    // Initialize the game
    function init() {
        // Set high score from local storage
        highScoreElement.textContent = highScore;
        
        // Initialize the board
        board.init();
        
        // Add event listeners
        document.addEventListener('keydown', handleKeyPress);
        window.addEventListener('resize', handleResize);
        restartButton.addEventListener('click', startGame);
        
        // Touch controls
        upBtn.addEventListener('click', () => changeDirection('up'));
        downBtn.addEventListener('click', () => changeDirection('down'));
        leftBtn.addEventListener('click', () => changeDirection('left'));
        rightBtn.addEventListener('click', () => changeDirection('right'));
        
        // Start the game
        startGame();
    }
    
    // Reset and start the game
    function startGame() {
        // Hide game over screen
        gameOverElement.classList.add('hidden');
        
        // Reset game variables
        snake = [];
        score = 0;
        gameSpeed = 150;
        scoreElement.textContent = '0';
        
        // Reset the direction
        direction = 'right';
        nextDirection = 'right';
        
        // Reset the board
        board.reset();
        
        // Create snake in the middle of the board
        const startX = Math.floor(board.cols / 4);
        const startY = Math.floor(board.rows / 2);
        
        // Start with a snake of length 3
        for (let i = 0; i < 3; i++) {
            snake.push({ x: startX - i, y: startY });
        }
        
        // Create first food
        createFood();
        
        // Start game loop
        if (gameLoop) clearInterval(gameLoop);
        gameActive = true;
        
        gameLoop = setInterval(update, gameSpeed);
        
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
        
        // Increase cell intensity where snake passes
        board.increaseIntensity(head.x, head.y);
    }
    
    // Check for collisions
    function checkCollision() {
        const head = snake[0];
        
        // Check for wall collision
        if (
            head.x < 0 || 
            head.x >= board.cols || 
            head.y < 0 || 
            head.y >= board.rows
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
                x: Math.floor(Math.random() * board.cols),
                y: Math.floor(Math.random() * board.rows)
            };
        } while (isPositionOccupied(newFoodPos));
        
        // Get a random GitHub icon
        const icon = githubIcons.getRandomIcon();
        
        // Create food object
        food = {
            x: newFoodPos.x,
            y: newFoodPos.y,
            icon: icon
        };
    }
    
    // Check if a position is occupied by the snake
    function isPositionOccupied(pos) {
        return snake.some(segment => segment.x === pos.x && segment.y === pos.y);
    }
    
    // Handle snake eating food
    function eatFood() {
        // Increase score
        score += food.icon.points;
        scoreElement.textContent = score;
        
        // Check for high score
        if (score > highScore) {
            highScore = score;
            highScoreElement.textContent = highScore;
            localStorage.setItem('github-snake-high-score', highScore);
        }
        
        // Create new food
        createFood();
        
        // Increase game speed
        gameSpeed = Math.max(50, gameSpeed - 2);
        clearInterval(gameLoop);
        gameLoop = setInterval(update, gameSpeed);
    }
    
    // Draw the game
    function draw() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw the contribution board
        board.draw();
        
        // Draw food
        if (food) {
            const foodPos = board.getPixelPosition(food.x, food.y);
            githubIcons.drawIcon(ctx, food.icon, foodPos.x, foodPos.y, CELL_SIZE);
        }
        
        // Draw snake
        snake.forEach((segment, index) => {
            const pos = board.getPixelPosition(segment.x, segment.y);
            
            // Head of the snake is a bit brighter
            ctx.fillStyle = index === 0 ? 'var(--snake-head)' : 'var(--snake-body)';
            ctx.fillRect(pos.x, pos.y, CELL_SIZE, CELL_SIZE);
            
            // Add eyes to the head
            if (index === 0) {
                ctx.fillStyle = 'var(--snake-eyes)';
                
                // Position eyes based on direction
                const eyeSize = CELL_SIZE / 5;
                const eyeOffset = CELL_SIZE / 3;
                
                // Left eye
                let leftEyeX, leftEyeY;
                // Right eye
                let rightEyeX, rightEyeY;
                
                switch (direction) {
                    case 'up':
                        leftEyeX = pos.x + eyeOffset;
                        leftEyeY = pos.y + eyeOffset;
                        rightEyeX = pos.x + CELL_SIZE - eyeOffset - eyeSize;
                        rightEyeY = pos.y + eyeOffset;
                        break;
                    case 'down':
                        leftEyeX = pos.x + eyeOffset;
                        leftEyeY = pos.y + CELL_SIZE - eyeOffset - eyeSize;
                        rightEyeX = pos.x + CELL_SIZE - eyeOffset - eyeSize;
                        rightEyeY = pos.y + CELL_SIZE - eyeOffset - eyeSize;
                        break;
                    case 'left':
                        leftEyeX = pos.x + eyeOffset;
                        leftEyeY = pos.y + eyeOffset;
                        rightEyeX = pos.x + eyeOffset;
                        rightEyeY = pos.y + CELL_SIZE - eyeOffset - eyeSize;
                        break;
                    case 'right':
                        leftEyeX = pos.x + CELL_SIZE - eyeOffset - eyeSize;
                        leftEyeY = pos.y + eyeOffset;
                        rightEyeX = pos.x + CELL_SIZE - eyeOffset - eyeSize;
                        rightEyeY = pos.y + CELL_SIZE - eyeOffset - eyeSize;
                        break;
                }
                
                ctx.fillRect(leftEyeX, leftEyeY, eyeSize, eyeSize);
                ctx.fillRect(rightEyeX, rightEyeY, eyeSize, eyeSize);
            }
        });
    }
    
    // Game over
    function gameOver() {
        gameActive = false;
        clearInterval(gameLoop);
        
        // Show game over screen
        gameOverElement.classList.remove('hidden');
        finalScoreElement.textContent = score;
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
            gameLoop = setInterval(update, gameSpeed);
        }
    }
    
    // Handle window resize
    function handleResize() {
        // Reinitialize the board
        board.init();
        
        // Redraw
        if (gameActive) {
            draw();
        }
    }
    
    // Handle color scheme changes
    function handleColorSchemeChange() {
        // Reload the icons with the new color scheme
        githubIcons.loadImages();
        
        // Redraw the game
        if (gameActive) {
            draw();
        }
    }
    
    // Initialize the game
    init();
});
