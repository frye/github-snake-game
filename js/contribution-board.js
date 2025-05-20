/**
 * GitHub Contribution Board
 * This file handles the rendering of the GitHub-like contribution board
 */

class ContributionBoard {
    constructor(canvas, cellSize) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.cellSize = cellSize;
        this.padding = 1; // Space between cells
        
        // GitHub contribution colors
        this.colors = {
            0: 'var(--github-green-0)', // Empty
            1: 'var(--github-green-1)', // Light
            2: 'var(--github-green-2)', // Medium
            3: 'var(--github-green-3)', // Dark
            4: 'var(--github-green-4)'  // Very Dark
        };
        
        this.board = [];
        this.rows = 0;
        this.cols = 0;
    }
    
    // Initialize the board with dimensions based on canvas size
    init() {
        // Resize canvas to fill parent container while maintaining aspect ratio
        const container = this.canvas.parentElement;
        
        // Set canvas dimensions
        const containerWidth = container.clientWidth;
        this.canvas.width = containerWidth;
        this.canvas.height = containerWidth; // Square canvas
        
        // Reset the style
        this.canvas.style.width = '100%';
        this.canvas.style.height = 'auto';
        
        // Calculate rows and columns
        this.cols = Math.floor(this.canvas.width / (this.cellSize + this.padding));
        this.rows = Math.floor(this.canvas.height / (this.cellSize + this.padding));
        
        // Make sure we have even number of rows/cols
        this.cols = this.cols - (this.cols % 2);
        this.rows = this.rows - (this.rows % 2);
        
        // Initialize empty board
        this.reset();
    }
    
    // Reset the board to all empty cells
    reset() {
        this.board = [];
        
        // Create random pattern with mostly empty cells and some colored cells
        for (let y = 0; y < this.rows; y++) {
            const row = [];
            for (let x = 0; x < this.cols; x++) {
                // Random intensity (mostly empty, with some colored cells)
                const rand = Math.random();
                let intensity = 0;
                
                if (rand > 0.8) {
                    intensity = 1;
                } 
                if (rand > 0.9) {
                    intensity = 2;
                }
                if (rand > 0.95) {
                    intensity = 3;
                }
                if (rand > 0.98) {
                    intensity = 4;
                }
                
                row.push(intensity);
            }
            this.board.push(row);
        }
    }
    
    // Draw the entire contribution board
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                const cellValue = this.board[y][x];
                this.drawCell(x, y, this.colors[cellValue]);
            }
        }
    }
    
    // Draw a single cell on the board
    drawCell(x, y, color) {
        const xPos = x * (this.cellSize + this.padding);
        const yPos = y * (this.cellSize + this.padding);
        
        this.ctx.fillStyle = color;
        this.ctx.fillRect(xPos, yPos, this.cellSize, this.cellSize);
    }
    
    // Get position in pixels
    getPixelPosition(boardX, boardY) {
        return {
            x: boardX * (this.cellSize + this.padding),
            y: boardY * (this.cellSize + this.padding)
        };
    }
    
    // Check if position is within bounds
    isValidPosition(x, y) {
        return x >= 0 && x < this.cols && y >= 0 && y < this.rows;
    }
    
    // Increase cell intensity when snake passes through
    increaseIntensity(x, y) {
        if (this.isValidPosition(x, y)) {
            // Increase intensity up to maximum (4)
            this.board[y][x] = Math.min(4, this.board[y][x] + 1);
        }
    }
}
