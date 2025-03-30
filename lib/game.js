const playerPositions = { player1: 0, player2: 0 };
let raceFinished = false;
let raceStarted = false;

function movePlayer(playerId) {
  if (raceFinished || !raceStarted) return;

  const player = document.getElementById(playerId);
  const step = 50;
  playerPositions[playerId] += step;
  player.style.left = `${playerPositions[playerId]}px`;

  playAudio(playerId, playerSoundUrls[playerId]);
  checkWinner();
}

function checkWinner() {
  const finishLine = 750;
  if (playerPositions.player1 >= finishLine && playerPositions.player2 >= finishLine) {
    alert('Tie, both players crossed the line at the same time!');
    raceFinished = true;
  } else if (playerPositions.player1 >= finishLine) {
    alert('Player 1 wins!');
    raceFinished = true;
  } else if (playerPositions.player2 >= finishLine) {
    alert('Player 2 wins!');
    raceFinished = true;
  }

  if (raceFinished) {
    playWinningSound();
    resetGame();
  }
}

function resetGame() {
  playerPositions.player1 = 0;
  playerPositions.player2 = 0;
  document.getElementById('player1').style.left = '0px';
  document.getElementById('player2').style.left = '0px';

  raceFinished = false;
  raceStarted = false;

  document.getElementById('start-btn').disabled = false;
}
