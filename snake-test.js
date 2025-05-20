// Simple testing script for snake rendering
document.addEventListener('DOMContentLoaded', () => {
    // Get the canvas
    const canvas = document.getElementById('game-board');
    const ctx = canvas.getContext('2d');
    
    // Set explicit canvas dimensions
    canvas.width = 500;
    canvas.height = 500;
    
    // Ensure canvas styling
    canvas.style.width = '500px';
    canvas.style.height = '500px';
    canvas.style.border = '2px solid white';
    canvas.style.backgroundColor = '#333';
    
    // Test drawing function
    function drawTest() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw grid
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        for (let i = 0; i < 500; i += 20) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, 500);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(500, i);
            ctx.stroke();
        }
        
        // Draw test snake
        const cellSize = 20;
        
        // Snake body - 3 segments in a row
        const segments = [
            { x: 5, y: 5 },
            { x: 4, y: 5 },
            { x: 3, y: 5 }
        ];
        
        segments.forEach((segment, index) => {
            const x = segment.x * cellSize;
            const y = segment.y * cellSize;
            
            // Draw snake segment
            ctx.fillStyle = index === 0 ? '#FF0000' : '#00FF00'; // Red head, green body
            ctx.fillRect(x, y, cellSize, cellSize);
            
            // Add eyes to the head
            if (index === 0) {
                ctx.fillStyle = '#FFFFFF';
                
                // Eyes
                const eyeSize = cellSize / 4;
                ctx.fillRect(x + cellSize - eyeSize * 2, y + eyeSize, eyeSize, eyeSize);
                ctx.fillRect(x + cellSize - eyeSize * 2, y + cellSize - eyeSize * 2, eyeSize, eyeSize);
            }
        });
        
        // Draw test food
        ctx.fillStyle = '#FFFF00'; // Yellow
        ctx.beginPath();
        ctx.arc(15 * cellSize + cellSize/2, 10 * cellSize + cellSize/2, cellSize/2, 0, Math.PI * 2);
        ctx.fill();
        
        // Log status
        console.log('Test drawing complete');
    }
    
    // Run the test drawing
    drawTest();
});
