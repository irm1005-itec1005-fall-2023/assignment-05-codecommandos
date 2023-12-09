let gameInProgress = false;
let playerScore = 0;
let dealerScore = 0;
let wallet = parseInt(document.getElementById('wallet').innerText);
let bet = 0;

// Event listeners to buttons
document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('hit-btn').addEventListener('click', hit);
document.getElementById('bet-btn').addEventListener('click', placeBet);
document.getElementById('stand-btn').addEventListener('click', stand);
document.getElementById('reset-btn').addEventListener('click', resetGame);

// Event listener for bet input changes
document.getElementById('bet-input').addEventListener('input', function () {
  let betAmount = parseInt(document.getElementById('bet-input').value);

  if (!isNaN(betAmount) && betAmount > 0 && Number.isInteger(betAmount) && betAmount <= wallet) {
    document.getElementById('bet-btn').disabled = false;
  } else {
    document.getElementById('bet-btn').disabled = true;
  }
});

  // Function to start the game
  function startGame() {
    if (!gameInProgress) {
      playerScore = 0;
      dealerScore = 0;
      playerHand = [];
      dealerHand = [];
      gameInProgress = true;
      bet = 0; // Set an initial bet or retrieve it from an input field

      // Update the display
      document.getElementById('result').innerText = '';
      document.getElementById('player-score').innerText = playerScore;
      document.getElementById('dealer-score').innerText = dealerScore;
      document.getElementById('wallet').innerText = wallet;
      document.getElementById('bet').innerText = bet; // Ensure bet is displayed as a string

      // Deal initial cards
      dealCard(playerHand, 'player');
      dealCard(dealerHand, 'dealer');
      dealCard(playerHand, 'player');
      dealCard(dealerHand, 'dealer');
    }
  }

  // Function to deal a card
  function dealCard(hand, role) {
    const cardValue = Math.floor(Math.random() * 9) + 2;
    hand.push(cardValue);
    updateScore(hand, role);
  }

// Update the wallet variable each time it changes in the UI
function updateWallet(newWalletValue) {
  wallet = newWalletValue;
  document.getElementById('wallet').innerText = wallet.toString();
}

  // Function to place a bet
  function placeBet() {
    if (!gameInProgress) {
      let betAmount = parseInt(document.getElementById('bet-input').value);
  
      if (!isNaN(betAmount) && betAmount > 0 && Number.isInteger(betAmount)) {
        if (betAmount <= wallet) {
          bet = betAmount;
          wallet -= bet;
  
          document.getElementById('bet').innerText = bet.toString();
          updateWallet(wallet); // Update the wallet value
  
          // Enable the bet button after a valid amount is entered
          document.getElementById('bet-btn').disabled = false;
        } else {
          alert('Bet amount exceeds your wallet balance. Please enter a valid amount.');
        }
      } else {
        alert('Invalid bet amount. Please enter a whole number.');
      }
    }
  }


  // Function to update the score
  function updateScore(hand, role) {
    const scoreElement = document.getElementById(`${role}-score`);
    const score = hand.reduce((sum, card) => sum + card, 0);
    scoreElement.innerText = score;

    if (role === 'player') {
      playerScore = score;
      if (playerScore > 21) {
        endGame('You have Busted! Dealer Wins.');
      }
    } else {
      dealerScore = score;
      if (dealerScore > 21) {
        endGame('Dealer has Busted! You Win.');
      }
    }
  }

  // Function for when the player hits
  function hit() {
    if (gameInProgress) {
      dealCard(playerHand, 'player');
    }
  }

  // Function for when the player stands
  function stand() {
    if (gameInProgress) {
      while (dealerScore < 17) {
        dealCard(dealerHand, 'dealer');
      }
      endGameBasedOnScore();
    }
  }

  // Function to determine the outcome after the player stands
  function endGameBasedOnScore() {
    if (dealerScore > playerScore && dealerScore <= 21) {
      endGame('Dealer Wins.');
    } else if (playerScore > dealerScore || dealerScore > 21) {
      endGame('You Win!');
    } else {
      endGame('It\'s a Tie!');
    }
  }

  // Function to end the game and update wallet
  function endGame(message) {
    console.log('Wallet before endGame:', wallet);
    document.getElementById('result').innerText = message;
    gameInProgress = false;
  
    if (message.includes('You Win')) {
      wallet += bet * 2; // Add the winning amount to the wallet (original bet + win)
    } else if (message.includes('Dealer Wins')) {
      wallet -= bet; // Deduct the bet amount from the wallet
    }
  
    updateWallet(wallet); // Update the wallet value in the UI
  
    console.log('Wallet after endGame:', wallet);
    document.getElementById('wallet').innerText = wallet.toString(); // Update the wallet display
  }

    // UI update after game is over
    function updateUIAfterEndGame() {
      document.getElementById('wallet').innerText = wallet.toString(); // Update wallet display
      document.getElementById('bet').innerText = bet.toString(); // Update bet display
    }

  // Function to reset the game
  function resetGame() {
    if (!gameInProgress) {
      bet = 0; // Reset the bet
      wallet = parseInt(document.getElementById('wallet').innerText); // Get the initial wallet value
  
      // Update the display
      document.getElementById('result').innerText = '';
      document.getElementById('player-score').innerText = '0';
      document.getElementById('dealer-score').innerText = '0';
      updateWallet(wallet); // Update the wallet value in the UI
      document.getElementById('bet').innerText = bet.toString();
  
      // Disable the bet button until a new bet is entered
      document.getElementById('bet-btn').disabled = true;
    }
  }
