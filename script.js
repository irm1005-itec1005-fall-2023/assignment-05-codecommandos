function startGame() {
  if (!gameInProgress) {
    playerScore = 0;
    dealerScore = 0;
    playerHand = [];
    dealerHand = [];
    gameInProgress = true;

    document.getElementById('result').innerText = '';
    document.getElementById('player-score').innerText = playerScore;
    document.getElementById('dealer-score').innerText = dealerScore;
    document.getElementById('wallet').innerText = wallet;
    document.getElementById('bet').innerText = bet;

    dealCard(playerHand, 'player');
    dealCard(dealerHand, 'dealer');
    dealCard(playerHand, 'player');
    dealCard(dealerHand, 'dealer');

  }
}

function dealCard(hand, role) {
  const cardValue = Math.floor(Math.random() * 9) + 2; 
  hand.push(cardValue);
  updateScore(hand, role);
}

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

function hit() {
  if (gameInProgress) {
    dealCard(playerHand, 'player');
  }
}

function stand() {
  if (gameInProgress) {
    while (dealerScore < 17) {
      dealCard(dealerHand, 'dealer');
    }
    if (dealerScore > playerScore && dealerScore <= 21) {
      endGame('Dealer Wins.');
    } else if (playerScore > dealerScore || dealerScore > 21) {
      endGame('You Win!');
    } else {
      endGame('It\'s a Tie!');
    }
  }
}

function endGame(message) {
  document.getElementById('result').innerText = message;
  gameInProgress = false;

  if (message.includes('Win')) {
    wallet += bet;
  } else if (message.includes('Dealer Wins')) {
    wallet -= bet;
  }

  document.getElementById('wallet').innerText = wallet;
}

function placeBet() {
  var amount = document.getElementById("amount").value;
  var prediction = document.getElementById("prediction").value;

  if (amount <= 0) {
    alert("Please enter a valid bet amount.");
    return;
  }
 
  setTimeout(function() {
    var resultDiv = document.getElementById("result");

    var randomResult = Math.random() < 0.5 ? "Win" : "Lose";
     
    resultDiv.innerHTML = `Your bet of ${amount} on ${prediction} is a ${randomResult}!`;

    document.getElementById("betForm").reset();
  }, 1000);
}


function resetGame() {
  if (!gameInProgress) {

    bet = 0;


    document.getElementById('result').innerText = '';
    document.getElementById('player-score').innerText = '0';
    document.getElementById('dealer-score').innerText = '0';
    document.getElementById('wallet').innerText = wallet;
    document.getElementById('bet').innerText = bet;
  }
}
  
