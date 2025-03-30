document.getElementById('start-btn').addEventListener('click', () => {
  raceStarted = true;
  document.getElementById('start-btn').disabled = true;
});

document.addEventListener('keyup', (event) => {
  if (event.key === 'a' || event.key === 'A') {
    movePlayer('player1');
  } else if (event.key === 'd' || event.key === 'D') {
    movePlayer('player2');
  }
});

document.getElementById('reset-btn').addEventListener('click', () => {
  location.reload();
});
