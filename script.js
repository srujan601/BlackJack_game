// Array of card values
const cards = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
let userHand = [];
let computerHand = [];
let isGameOver = false;

// Function to deal a random card
function dealCard() {
    return cards[Math.floor(Math.random() * cards.length)];
}

// Function to calculate score
function calculateScore(hand) {
    let sum = hand.reduce((a, b) => a + b, 0);
    if (sum === 21 && hand.length === 2) {
        return 0; // Blackjack
    }
    if (sum > 21 && hand.includes(11)) {
        hand[hand.indexOf(11)] = 1; // Replace Ace (11) with 1
        sum = hand.reduce((a, b) => a + b, 0);
    }
    return sum;
}

// Update the UI with the current hand and score
function updateUI() {
    document.getElementById('user-hand').innerHTML = `Your Hand: ${userHand.join(", ")}`;
    document.getElementById('computer-hand').innerHTML = `Computer's Hand: ${computerHand[0]} and ...`;
    document.getElementById('status').innerText = `Your score: ${calculateScore(userHand)}`;
}

// Function to handle 'stand'
function stand() {
    isGameOver = true;
    let computerScore = calculateScore(computerHand);
    let userScore = calculateScore(userHand);

    // Computer logic: draw until score >= 17
    while (computerScore < 17) {
        computerHand.push(dealCard());
        computerScore = calculateScore(computerHand);
    }

    // Final outcome display
    let result = compare(userScore, computerScore);
    document.getElementById('status').innerText = `Your final score: ${userScore}. Computer's final score: ${computerScore}. ${result}`;

    // Show the final computer hand
    document.getElementById('computer-hand').innerHTML = `Computer's Hand: ${computerHand.join(", ")}`;
    document.getElementById('new-game-button').style.display = "block";
    document.getElementById('deal-button').style.display = "none";
    document.getElementById('stand-button').style.display = "none";
}

// Function to compare scores
function compare(userScore, computerScore) {
    if (userScore > 21) return "You went over 21. You lose 😭";
    if (computerScore > 21) return "Computer went over 21. You win 😁";
    if (userScore === computerScore) return "It's a draw! 🙃";
    if (userScore === 0) return "You got a Blackjack! You win 😎";
    if (computerScore === 0) return "Computer has Blackjack! You lose 😱";
    return userScore > computerScore ? "You win! 😃" : "You lose! 😤";
}

// Function to start a new game
function startGame() {
    userHand = [dealCard(), dealCard()];
    computerHand = [dealCard(), dealCard()];
    isGameOver = false;

    document.getElementById('deal-button').style.display = "inline-block";
    document.getElementById('stand-button').style.display = "inline-block";
    document.getElementById('new-game-button').style.display = "none";
    updateUI();
}

// Function to handle 'deal card'
function deal() {
    if (!isGameOver) {
        userHand.push(dealCard());
        let userScore = calculateScore(userHand);

        if (userScore > 21 || userScore === 0) {
            stand(); // Auto-stand if game ends (user bust or Blackjack)
        } else {
            updateUI();
        }
    }
}

// Event listeners
document.getElementById('deal-button').addEventListener('click', deal);
document.getElementById('stand-button').addEventListener('click', stand);
document.getElementById('new-game-button').addEventListener('click', startGame);

// Start the game initially
startGame();
