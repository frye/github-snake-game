# Copilot Instructions for GitHub Snake Game

## GitHub Snake Game - Copilot Context
-------------------------------------------------

## Project Overview
----------------
This is a vanilla JavaScript implementation of the classic Snake game
with GitHub's visual aesthetics, including a contribution graph as the game board
and GitHub-related icons as collectible food items.

## File Structure
-------------
- index.html - Main HTML file with game container and UI elements
- styles.css - CSS styling with GitHub-themed colors and responsive design
- js/
  - game.js - Core game mechanics and logic
  - contribution-board.js - GitHub contribution graph board implementation
  - github-icons.js - GitHub-themed icons for collectible items

## Runnin the Game
-------------------
1. Open index.html in a web browser.

## Main Game Components
-------------------
1. ContributionBoard class - Manages the GitHub-like contribution graph
   - Handles rendering of cells with varying intensity of green
   - Manages board state and dimensions
   - Updates cell intensity as snake passes

2. GithubIcons class - Manages GitHub-themed food items
   - Contains SVG data for GitHub icons (Octocat, PR, Issue, etc.)
   - Handles icon selection and rendering
   - Assigns different point values to different icons

3. Main game logic (in game.js)
   - Snake movement and growth
   - Collision detection
   - Food generation
   - Score tracking
   - Game loop management
   - Input handling (keyboard and touch)

## Key Functions
------------
- init() - Initializes the game, sets up event listeners and board
- startGame() - Resets game state and starts a new game
- update() - Main game loop function, updates snake position and checks collisions
- moveSnake() - Handles snake movement logic
- checkCollision() - Checks for collisions with walls or snake itself
- createFood() - Creates new food item at random position with random GitHub icon
- eatFood() - Handles snake eating food, increases score, speeds up game
- draw() - Renders the game state to canvas
- handleKeyPress() - Processes keyboard input
- changeDirection() - Changes snake direction with 180-degree turn prevention
- togglePause() - Pauses/resumes game
- handleResize() - Handles canvas resizing for responsive design

## CSS Variables
------------
- --github-bg: #0d1117 - GitHub dark background color
- --github-fg: #c9d1d9 - GitHub text color
- --github-green-0: #161b22 - Empty cell color
- --github-green-1: #0e4429 - Light green cell
- --github-green-2: #006d32 - Medium green cell
- --github-green-3: #26a641 - Dark green cell
- --github-green-4: #39d353 - Very dark green cell
- --github-border: #30363d - Border color

## Game Mechanics
-------------
- Snake grows when it consumes food items
- Different icons give different point values
- Game speed increases as score increases
- Local storage is used to persist high score
- Contribution board cells increase in intensity when snake passes over them
- Game ends when snake collides with itself or a wall

## Responsive Design
----------------
- Touch controls appear on mobile devices
- Canvas size adjusts to container width
- UI elements reflow on smaller screens

## Enhancement Opportunities
-----------------------
1. Add sound effects for eating, game over, etc.
2. Implement difficulty levels with different starting speeds
3. Add animations for snake movement and food collection
4. Create a leaderboard system with Firebase or similar
5. Add power-ups that grant special abilities (e.g., phase through walls)
6. Implement a streak system for collecting same-type icons
7. Add theme toggle for light/dark mode
8. Create custom snake skins or colors

## Testing Suggestions
------------------
- Test on different screen sizes for responsive behavior
- Verify keyboard controls work correctly
- Test touch controls on mobile devices
- Check high score persistence between sessions
- Verify collision detection accuracy
- Test performance with very long snake
- Verify food doesn't spawn on snake