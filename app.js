/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores , currentScore , activePlayer , isPlaying , lastDice;
startGame();
// Hide the dice on the begining of the game
document.getElementById('dice').style.display = 'none';
// Set all results to 0
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';
// Roll dice button
document.querySelector('.roll-dice').addEventListener('click' , function() {
  if (isPlaying) {
  // 1. Show the dice with random number
  var dice = (Math.floor(Math.random()*6) + 1);

  var diceDOM = document.querySelector('.dice');
  diceDOM.style.display = 'block';
  diceDOM.src = 'dice-' + dice + '.png';

  // 2. Add the result of the dice to current result if it is NOT 1
  if(lastDice === 6 && dice === 6) {
    scores[activePlayer] = 0;
    document.querySelector('#score-' + activePlayer).textContent = '0';
    nextPlayer();
  } else if (dice !== 1) {
    currentScore += dice;
    document.querySelector('#current-' + activePlayer).textContent = currentScore;
  } else {
    nextPlayer();
  }

  lastDice = dice;
}
});
// Hold dice button
document.querySelector('.hold-dice').addEventListener('click' , function() {
  if (isPlaying) {
  // 1. Add the current result to scores
  scores[activePlayer] += currentScore;
  // 2. Change the UI
  document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
  var input = document.querySelector('.input').value;
  var winScore;

  if (input) {
    winScore = input;
  } else {
    winScore = 100;
  }
  // 3. Check if we have a winner
  if (scores[activePlayer] >= winScore) {
    document.querySelector('.player-' + activePlayer).textContent = 'Winner !!!';
    document.querySelector('#player-' + activePlayer + '-label').classList.add('winner');
    document.querySelector('#player-' + activePlayer + '-label').classList.remove('active');
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.input').style.display = 'none';
    document.querySelector('.current-box-' + activePlayer).style.display = 'none';
    isPlaying = false;
    //document.querySelector('.player-' + activePlayer + '-label')
  } else {
    nextPlayer();
  }
}
});
// New game button
document.querySelector('.new-game').addEventListener('click' , startGame);

// Function next player turn
function nextPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1
  } else {
    activePlayer = 0;
  }

  currentScore = 0;
  document.querySelector('#current-0').textContent = '0';
  document.querySelector('#current-1').textContent = '0';

  document.querySelector('.player-0-label').classList.toggle('active');
  document.querySelector('.player-1-label').classList.toggle('active');
};

function startGame() {
  scores = [0 , 0];
  currentScore = 0;
  activePlayer = 0;
  isPlaying = true;
  document.querySelector('.dice').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0').textContent = 'Player 1';
  document.querySelector('.player-1').textContent = 'Player 2';
  document.querySelector('#player-0-label').classList.remove('active');
  document.querySelector('#player-1-label').classList.remove('active');
  document.querySelector('#player-0-label').classList.remove('winner');
  document.querySelector('#player-1-label').classList.remove('winner');
  document.querySelector('#player-0-label').classList.add('active');
  document.querySelector('.current-box-0').style.display = 'block';
  document.querySelector('.current-box-1').style.display = 'block';
  document.querySelector('.input').style.display = 'block';
};
