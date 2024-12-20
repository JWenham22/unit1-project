

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
