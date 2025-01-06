

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






// Initialize Game
// Generate Secret Code:

// Generate a random sequence of 4 colors 
// Store this sequence as secret_code.
// Set Up Game Variables:

// max_attempts = 10
// attempts = 0
// game_over = false
// Game Loop
// While attempts < max_attempts and game_over == false:
// Prompt Player Input:

// Ask the player to guess a sequence of 4 colors.
// Store the input as player_guess.
// Validate Input:

// Ensure player_guess contains 4 valid colors from the set.
// If invalid, ask the player to re-enter their guess.
// Check Guess Against secret_code:

// Initialize counters:

// correct_position = 0
// correct_color = 0
// Create a copy of secret_code to track matched colors.

// First Pass (Correct Position):

// For each index i in player_guess:
// If player_guess[i] == secret_code[i], increment correct_position.
// Mark this position as checked in the copied secret_code.
// Second Pass (Correct Color, Wrong Position):

// For each color in player_guess:
// If color exists in the remaining unmatched secret_code:
// Increment correct_color.
// Remove this color from the copied secret_code.
// Provide Feedback:

// Display the number of correct_position and correct_color.
// Check for Win:

// If correct_position == 4:
// Set game_over = true.
// Print "Congratulations! You guessed the secret code!"
// Increment Attempts:

// Increment attempts.
// End Game
// If attempts == max_attempts and game_over == false:
// Print "Game Over! You've used all attempts."
// Reveal the secret_code.




document.addEventListener("DOMContentLoaded", () => {
    const colors = ["red", "green", "blue", "yellow", "orange", "purple"];
    let secretCode = [];
    let currentRow = 0;
    let currentGuess = [];

    const guessContainer = document.querySelector(".guess-container");
    const colorOptions = document.querySelectorAll(".color-inner");
    const submitButton = document.querySelector(".submit-btn");

    // Generate Secret Code
    function generateSecretCode() {
        secretCode = Array.from({ length: 4 }, () => colors[Math.floor(Math.random() * colors.length)]);
        console.log("Secret Code:", secretCode); 
    }

    // Create Guess Rows
    function createRows() {
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
