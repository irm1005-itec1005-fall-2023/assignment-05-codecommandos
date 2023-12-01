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
  }
}