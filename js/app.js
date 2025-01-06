

// As a user I am able select a secret code of 4 colors to challenge his/her opponent to try and guess the pattern
// Users are able to select between 6 different colors per bubble
// Users will be able to click a check button that then gives them feedback
// Users are able to receive feedback based on his/her guesses showing correct color and position
// Users are able to see how many guesses they have left so they are able to strategize their guesses.
// Users are able to see visual representation of their last guesses
// As a user, you will be able to read how the game works down below the actual game
// As a user I want to be able to get notified when I have guessed the correct code and display how many tries it took 
// User is able to restart the game at anytime
// If user doesn't succeed, let them know that they have lost and give an option to try again






// Define colors as the list of possible colors.
// Initialize secretCode as an empty array.
// Initialize currentRow to 0.
// Initialize currentGuess as an empty array.

// Get reference to .guess-container.
// Get all .color-inner elements.
// Get reference to .submit-btn.
// Generate Secret Code:

// Create a function generateSecretCode:
// Randomly select 4 colors from the colors array and store them in secretCode.

// Create a function createRows:
// Loop 10 times to create 10 rows:
// For each row:
// Create a guess-colors section with 4 empty slots.
// Create a grade-colors section with 4 empty slots for feedback.
// Append both sections to a new row and add it to .guess-container.
// Add Color to Current Guess:

// Loop through colorOptions:
// Add a click event listener for each color option:
// Get the color from the clicked element.
// Find the first empty slot in the current row.
// Fill the slot with the selected color.
// Add the color to currentGuess.

// Add a click event listener to the submitButton:
// If currentGuess is not fully filled:
// Alert the player to complete their guess.
// Otherwise:
// Call checkGuess to compare currentGuess with secretCode.
// Call displayFeedback to show the result.
// If all 4 colors are correct:
// Alert the player they won.
// Clear currentGuess.
// Increment currentRow.
// If currentRow exceeds 10:
// Alert the player they lost and show the secret code.
// Check Guess:

// Create a function checkGuess(guess):
// Initialize feedback with black = 0 and white = 0.
// Create copies of secretCode and guess.
// Loop through guess to check for exact matches (black pegs):
// If a color matches the secret code at the same position:
// Increment black.
// Remove the matched color from both copies.
// Loop through guess again to check for partial matches (white pegs):
// If a color exists in the secret code (but not exact position):
// Increment white.
// Remove the matched color from the secret code copy.
// Return feedback.
// Display Feedback:

// Create a function displayFeedback(feedback):
// Get feedback slots for the current row.
// Fill black feedback slots with black.
// Fill white feedback slots with white.
// Initialize the Game:

// Call generateSecretCode to set the secret code.
// Call createRows to set up the game board.



document.addEventListener("DOMContentLoaded", () => {
    const colors = ["red", "green", "blue", "yellow", "orange", "purple"];
    let secretCode = [];
    let currentRow = 0;
    let currentGuess = [];

    const guessContainer = document.querySelector(".guess-container");
    const colorOptions = document.querySelectorAll(".color-inner");
    const submitButton = document.querySelector(".submit-btn");
    const resetButton = document.querySelector(".reset-btn"); 
    const deleteButton = document.querySelector(".delete-btn"); 

    // Generate Secret Code
    function generateSecretCode() {
        secretCode = Array.from({ length: 4 }, () => colors[Math.floor(Math.random() * colors.length)]);
        console.log("Secret Code:", secretCode); 
    }

    // Create Guess Rows
    function createRows() {
        guessContainer.innerHTML = ""; // Clear any existing rows (important for reset)
        for (let i = 0; i < 10; i++) {
            const row = document.createElement("div");
            row.classList.add("guess-row");

            const guessColors = document.createElement("div");
            guessColors.classList.add("guess-colors");
            for (let j = 0; j < 4; j++) {
                const colorSlot = document.createElement("div");
                colorSlot.classList.add("guess-color");
                guessColors.appendChild(colorSlot);
            }

            const gradeColors = document.createElement("div");
            gradeColors.classList.add("grade-colors");
            for (let j = 0; j < 4; j++) {
                const gradeSlot = document.createElement("div");
                gradeSlot.classList.add("grade-color");
                gradeColors.appendChild(gradeSlot);
            }

            row.appendChild(guessColors);
            row.appendChild(gradeColors);
            guessContainer.appendChild(row);
        }
    }

    // Add Color to Current Guess
    colorOptions.forEach((colorOption) => {
        colorOption.addEventListener("click", (e) => {
            const selectedColor = e.target.classList[1];
            const currentRowElement = guessContainer.children[currentRow].querySelectorAll(".guess-color");

            for (let slot of currentRowElement) {
                if (!slot.style.backgroundColor) {
                    slot.style.backgroundColor = selectedColor;
                    currentGuess.push(selectedColor);
                    break;
                }
            }
        });
    });

    // Submit Guess
    submitButton.addEventListener("click", () => {
        if (currentGuess.length < 4) {
            alert("Please fill all slots before submitting.");
            return;
        }

        const feedback = checkGuess(currentGuess);
        displayFeedback(feedback);

        if (feedback.black === 4) {
            alert("Congratulations! You've guessed the code!");
            return;
        }

        currentGuess = [];
        currentRow++;

        if (currentRow >= 10) {
            alert("Game Over! The secret code was: " + secretCode.join(", "));
        }
    });

    // Reset Button 
    resetButton.addEventListener("click", () => {
        // Reset game state
        currentRow = 0;
        currentGuess = [];
        secretCode = [];
        
        // Generate new game setup
        generateSecretCode();
        createRows();
    });

    // Delete Button 
    deleteButton.addEventListener("click", () => {
        if (currentGuess.length > 0) {
            // Remove last color from the guess array
            currentGuess.pop();

            // Clear the last filled slot in the current row
            const currentRowElement = guessContainer.children[currentRow].querySelectorAll(".guess-color");
            for (let i = currentRowElement.length - 1; i >= 0; i--) {
                if (currentRowElement[i].style.backgroundColor) {
                    currentRowElement[i].style.backgroundColor = "";
                    break;
                }
            }
        }
    });

    // Check Guess
    function checkGuess(guess) {
        let feedback = { black: 0, white: 0 };
        let codeCopy = [...secretCode];
        let guessCopy = [...guess];

        // Check for black pegs
        guessCopy.forEach((color, index) => {
            if (color === codeCopy[index]) {
                feedback.black++;
                codeCopy[index] = null; 
                guessCopy[index] = null;
            }
        });

        // Check for white pegs
        guessCopy.forEach((color) => {
            if (color && codeCopy.includes(color)) {
                feedback.white++;
                codeCopy[codeCopy.indexOf(color)] = null;
            }
        });

        return feedback;
    }

    // Display Feedback
    function displayFeedback({ black, white }) {
        const gradeSlots = guessContainer.children[currentRow].querySelectorAll(".grade-color");
        let index = 0;

        for (let i = 0; i < black; i++) gradeSlots[index++].style.backgroundColor = "black";
        for (let i = 0; i < white; i++) gradeSlots[index++].style.backgroundColor = "white";
    }

    // Initialize Game
    generateSecretCode();
    createRows();
});
