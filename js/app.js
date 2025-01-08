

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






// Initialize Game on Page Load:
// Define color options for the game
// Create variables to store
// Secret code
// Current row being guessed
// Current guess in progress
// Hover timer for speech interactions
// Select necessary DOM elements like the guess container, color options, and buttons

// Speech Functions for Buttons
// Function to read the name of a color out loud
// Function to read "Submit" when hovering over the submit button
// Start a timer to delay speech
// Cancel the timer if the mouse leaves the button
// Similar functions for "Reset" and "Delete" buttons

// Select Colors for the Current Guess
// For each color option
// When clicked
// Determine the selected color
// Check the current row for an empty slot
// Add the color to the first empty slot and store it in the currentGuess
// Speak the color name aloud

// Generate the Secret Code
// Randomly select 4 colors from the available color options
// Store these as the secret code for the game

// Create Rows for Guesses
// Clear any previous rows (important for resetting)
// Create 10 rows, each containing
// Four empty slots for guesses
// Four slots for feedback (black/white pegs)

// Submit a Guess
// On clicking the submit button
// If fewer than 4 colors are selected
// Show a message asking the player to fill all slots
// Otherwise
// Evaluate the guess against the secret code
// Display feedback (black and white pegs for correct colors/positions)
// If all 4 are correct
// Show a "You Win!" message
// If all rows are used and no correct guess
// Show a "Game Over!" message with the secret code

// Reset the Game
// On clicking the reset button
// Reset the current row, guess, and secret code
// Generate a new secret code
// Recreate the guess rows

// Delete Last Color
// On clicking the delete button
// Remove the last selected color from the current guess
// Clear the corresponding slot in the current row

// Evaluate and Provide Feedback
// Compare the current guess to the secret code
// For exact matches (correct color and position), add a black peg
// For correct colors in the wrong position, add a white peg
// Ignore already-matched slots

// Display Feedback
// Add black and white feedback pegs to the feedback slots in the current row

// Background Selector
// When a background option is selected
// Change the page background to the selected theme using specific URLs for each theme
// Apply "cover" and "center" styles to ensure the background fits well

// Message Box
// Show messages dynamically for events like
// "Please select all slots."
// "You Win!"
// "Game Over!"
// Automatically hide the message after a few seconds

// Initialize the Game
// Generate the secret code
// Create rows for guesses





const colors = ["red", "green", "blue", "yellow", "orange", "purple"]
let secretCode = []
let currentRow = 0
let currentGuess = []
let hoverTime
let isAudioEnabled = true

const guessContainer = document.querySelector(".guess-container")
const colorOptions = document.querySelectorAll(".color-inner")
const submitButton = document.querySelector(".submit-btn")
const resetButton = document.querySelector(".reset-btn")
const deleteButton = document.querySelector(".delete-btn")
const audioToggleButton = document.querySelector(".audio-toggle-btn")


// Toggle audio functionality
audioToggleButton.addEventListener("click", () => {
    isAudioEnabled = !isAudioEnabled
    audioToggleButton.textContent = isAudioEnabled ? "Audio: On" : "Audio: Off"
})

// Speech function with audio check
function speakColor(color) {
    if (!isAudioEnabled) return // Exit if audio is disabled
    const utterance = new SpeechSynthesisUtterance(color)
    speechSynthesis.speak(utterance)

}
// Speak text for submit button
function speakSubmit() {
    if (!isAudioEnabled) return
    const utterance = new SpeechSynthesisUtterance("Submit")
    speechSynthesis.speak(utterance)
}

// Speak text for reset button
function speakReset() {
    if (!isAudioEnabled) return
    const utterance = new SpeechSynthesisUtterance("Reset")
    speechSynthesis.speak(utterance)
}

// Speak text for delete button
function speakDelete() {
    if (!isAudioEnabled) return
    const utterance = new SpeechSynthesisUtterance("Delete")
    speechSynthesis.speak(utterance)
}

// Submit button hover
submitButton.addEventListener("mouseenter", () => {
    hoverTime = setTimeout(() => {
        speakSubmit()
    }, 500)
})

submitButton.addEventListener("mouseleave", () => {
    clearTimeout(hoverTime)
})

// Reset button hover
resetButton.addEventListener("mouseenter", () => {
    hoverTime = setTimeout(() => {
        speakReset()
    }, 500)
})

resetButton.addEventListener("mouseleave", () => {
    clearTimeout(hoverTime)
})

// Delete button hover
deleteButton.addEventListener("mouseenter", () => {
    hoverTime = setTimeout(() => {
        speakDelete()
    }, 500)
})

deleteButton.addEventListener("mouseleave", () => {
    clearTimeout(hoverTime)
})

// Adding colors to current guess
colorOptions.forEach((colorOption) => {
    colorOption.addEventListener("click", (e) => {
        // Determines the color clicked
        const selectedColor = e.target.classList[1]
        const currentRowElement = guessContainer.children[currentRow].querySelectorAll(".guess-color")

        // Ensure that a color is added only if there is an empty slot
        let colorAdded = false
        for (let slot of currentRowElement) {
            if (!slot.style.backgroundColor && !colorAdded) {
                slot.style.backgroundColor = selectedColor
                currentGuess.push(selectedColor)
                colorAdded = true; // Mark that the color was added
            }
        }
    })
})

// Add speech functionality for color options
colorOptions.forEach((colorOption) => {
    let hoverTimer // Timer to track hover time

    colorOption.addEventListener("mouseenter", (e) => {
        if (!isAudioEnabled) return // Do not play audio if disabled
        // Start a timer when the mouse enters the color option
        hoverTimer = setTimeout(() => {
            const selectedColor = e.target.classList[1] // Get the color class
            speakColor(selectedColor) // Speak the color name
        }, 500) // 500ms delay
    })

    colorOption.addEventListener("mouseleave", () => {
        // Clear the timer if the mouse leaves before 500ms
        clearTimeout(hoverTimer)
    })
})


// Function to speak the color name
function speakColor(color) {
    const utterance = new SpeechSynthesisUtterance(color)
    speechSynthesis.speak(utterance)
}



// Generate Secret Code
function generateSecretCode() {
    // Creates an array of 4 elements
    // Each element is randomly selected from the colors array
    secretCode = Array.from({ length: 4 }, () => colors[Math.floor(Math.random() * colors.length)]) 
    console.log("Secret Code:", secretCode) 
}

// Create Guess Rows
function createRows() {
    guessContainer.innerHTML = "" // Clear any existing rows (important for reset)
    // Creates 10 rows 
    for (let i = 0; i < 10; i++) {
        const row = document.createElement("div")
        row.classList.add("guess-row")

        const guessColors = document.createElement("div")
        guessColors.classList.add("guess-colors")
        // Creates 4 guess color slots for when color is selected
        for (let j = 0; j < 4; j++) {
            const colorSlot = document.createElement("div")
            colorSlot.classList.add("guess-color")
            guessColors.appendChild(colorSlot)
        }

        const gradeColors = document.createElement("div")
        gradeColors.classList.add("grade-colors")
        // Creates 4 grade color slots for when the player clicks submit
        for (let j = 0; j < 4; j++) {
            const gradeSlot = document.createElement("div")
            gradeSlot.classList.add("grade-color")
            gradeColors.appendChild(gradeSlot)
        }

        row.appendChild(guessColors)
        row.appendChild(gradeColors)
        guessContainer.appendChild(row)
    }
}


function showMessage(message, type = "info") {
    const messageBox = document.getElementById("messageBox");

    // Set the message and style based on type
    messageBox.textContent = message;
    if (type === "success") {
        messageBox.style.backgroundColor = "#d4edda" // Green
        messageBox.style.color = "#155724"
        messageBox.style.borderColor = "#c3e6cb"
    } else if (type === "error") {
        messageBox.style.backgroundColor = "#f8d7da" // Red
        messageBox.style.color = "#721c24"
        messageBox.style.borderColor = "#f5c6cb"
    } else {
        messageBox.style.backgroundColor = "#f8f9fa" // Neutral
        messageBox.style.color = "#333"
        messageBox.style.borderColor = "#ccc"
    }

    // Show the message box
    messageBox.classList.add("show");
    messageBox.classList.remove("hide");

    // Hide the message box after 3 seconds
    setTimeout(() => {
        messageBox.classList.add("hide");
        messageBox.classList.remove("show");
    }, 5000);
}


// Submit Guess
submitButton.addEventListener("click", () => {
    // Ensures the player has selected 4 colors before submitting
    if (currentGuess.length < 4) {
        showMessage("Please fill all slots before submitting.")
        return
    }

    // Evaluates the guess and displays feedback
    const feedback = checkGuess(currentGuess)
    displayFeedback(feedback)

    if (feedback.black === 4) {
        showMessage("Congratulations! You've guessed the code!")
        return
    }

    currentGuess = []
    currentRow++

    if (currentRow >= 10) {
        showMessage("Game Over! The secret code was: " + secretCode.join(", "))
    }
})

// Reset Button 
resetButton.addEventListener("click", () => {
    // Resets game 
    currentRow = 0
    currentGuess = []
    secretCode = []
    
    // Generate new game setup
    generateSecretCode()
    createRows()
})

// Delete Button 
deleteButton.addEventListener("click", () => {
    if (currentGuess.length > 0) {
        // Delete the last color from the guess array
        currentGuess.pop()

        // Clear the last filled slot in the current row
        const currentRowElement = guessContainer.children[currentRow].querySelectorAll(".guess-color")
        for (let i = currentRowElement.length - 1; i >= 0; i--) {
            if (currentRowElement[i].style.backgroundColor) {
                currentRowElement[i].style.backgroundColor = ""
                break
            }
        }
    }
})

// Check Guess
function checkGuess(guess) {
    let feedback = { black: 0, white: 0 }
    let codeCopy = [...secretCode]
    let guessCopy = [...guess]

    // Check for black pegs
    guessCopy.forEach((color, index) => {
        if (color === codeCopy[index]) {
            feedback.black++
            codeCopy[index] = null
            guessCopy[index] = null
        }
    })

    // Check for white pegs
    guessCopy.forEach((color) => {
        if (color && codeCopy.includes(color)) {
            feedback.white++
            codeCopy[codeCopy.indexOf(color)] = null
        }
    })

    return feedback
}

// Display Feedback
function displayFeedback({ black, white }) {
    const gradeSlots = guessContainer.children[currentRow].querySelectorAll(".grade-color")
    let index = 0

    for (let i = 0; i < black; i++) gradeSlots[index++].style.backgroundColor = "black"
    for (let i = 0; i < white; i++) gradeSlots[index++].style.backgroundColor = "white"
}

// Background images
document.getElementById("changeBackgroundButton").addEventListener("click", () => {
    const selector = document.getElementById("backgroundSelector");
    const selectedBackground = selector.value;

    // Apply the corresponding background image
    switch (selectedBackground) {
        case "beach":
            document.body.style.backgroundImage = "url('https://wallpapercave.com/wp/wp6782679.jpg')";
            document.body.style.backgroundSize = "cover"; // Fill the page
            document.body.style.backgroundPosition = "center";
            document.body.style.backgroundRepeat = "no-repeat";
            break;
        case "mountain":
            document.body.style.backgroundImage = "url('https://wallpapers.com/images/featured/patagonia-y5yq50svrz3x20oq.jpg')";
            document.body.style.backgroundSize = "cover"; // Fill the page
            document.body.style.backgroundPosition = "center";
            document.body.style.backgroundRepeat = "no-repeat";
            break;
        case "forest":
            document.body.style.backgroundImage = "url('https://4kwallpapers.com/images/walls/thumbs_3t/14776.jpg')";
            document.body.style.backgroundSize = "cover"; // Fill the page
            document.body.style.backgroundPosition = "center";
            document.body.style.backgroundRepeat = "no-repeat"
            break;
        case "city":
            document.body.style.backgroundImage = "url('https://images2.alphacoders.com/546/546678.jpg')";
            document.body.style.backgroundSize = "cover"; // Fill the page
            document.body.style.backgroundPosition = "center";
            document.body.style.backgroundRepeat = "no-repeat"
            break;
        case "country-side":
            document.body.style.backgroundImage = "url('https://images.pexels.com/photos/1662145/pexels-photo-1662145.jpeg?cs=srgb&dl=pexels-fotios-photos-1662145.jpg&fm=jpg')";
            document.body.style.backgroundSize = "cover"; // Fill the page
            document.body.style.backgroundPosition = "center";
            document.body.style.backgroundRepeat = "no-repeat"
            break;

        default:
            document.body.style.backgroundImage = ""; // Reset to default
    }
});



// Initialize Game
generateSecretCode()
createRows()

