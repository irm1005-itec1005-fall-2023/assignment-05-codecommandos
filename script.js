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