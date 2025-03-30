const playerPositions = { player1: 0, player2: 0 };
let raceFinished = false;
let raceStarted = false;

const playerSoundUrls = {
  player1: './sounds/racing-engine.wav',
  player2: './sounds/motocross-engine.wav'
};
const backgroundMusicUrl = './sounds/background-sound.mp3';
const winningSoundUrl = './sounds/winning-sound.wav';

let audioPlayers = {
  player1: null,
  player2: null,
  background: null,
  winning: null
};

const volumeLevel = 0.5;
const backgroundMusicVolume = 0.2;

function playAudio(playerId, soundUrl) {
  if (audioPlayers[playerId] && !audioPlayers[playerId].ended) {
    return;
  }

  if (audioPlayers[playerId]) {
    audioPlayers[playerId].pause();
    audioPlayers[playerId].currentTime = 0;
  }

  const audioFile = new Audio(`${soundUrl}?${new Date().getTime()}`);
  audioFile.volume = volumeLevel;

  audioFile.onended = function () {
    audioPlayers[playerId] = null;
  };

  audioFile.play().catch((error) => {
    console.error('Audio playback failed: ', error);
  });

  audioPlayers[playerId] = audioFile;
}

function playBackgroundMusic() {
  if (audioPlayers.background && !audioPlayers.background.ended) {
    return;
  }

  if (audioPlayers.background) {
    audioPlayers.background.pause();
    audioPlayers.background.currentTime = 0;
  }

  audioPlayers.background = new Audio(`${backgroundMusicUrl}?${new Date().getTime()}`);
  audioPlayers.background.volume = backgroundMusicVolume;
  audioPlayers.background.loop = true;
  audioPlayers.background.play().catch((error) => {
    console.error('Background music playback failed: ', error);
  });
}

function playWinningSound() {
  stopAllSounds();
  audioPlayers.winning = new Audio(`${winningSoundUrl}?${new Date().getTime()}`);
  audioPlayers.winning.volume = 0.5;
  audioPlayers.winning.play().catch((error) => {
    console.error('Winning sound playback failed: ', error);
  });
}

function stopAllSounds() {
  Object.values(audioPlayers).forEach((audio) => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  });
}

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
  const player1Position = playerPositions.player1;
  const player2Position = playerPositions.player2;

  if (player1Position >= finishLine && player2Position >= finishLine) {
    alert('Tie, both players crossed the line at the same time!');
    raceFinished = true;
    playWinningSound();
    resetGame();
  } else if (player1Position >= finishLine) {
    alert('Player 1 wins!');
    raceFinished = true;
    playWinningSound();
    resetGame();
  } else if (player2Position >= finishLine) {
    alert('Player 2 wins!');
    raceFinished = true;
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

document.getElementById('start-btn').addEventListener('click', () => {
  playBackgroundMusic();
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
