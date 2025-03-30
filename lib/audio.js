const playerSoundUrls = {
  player1: './sounds/racing-engine.wav',
  player2: './sounds/motocross-engine.wav'
};
const backgroundMusicUrl = './sounds/background-sound.mp3';
const winningSoundUrl = './sounds/winning-sound.wav';

let audioPlayers = { player1: null, player2: null, background: null, winning: null };
const volumeLevel = 0.5;
const backgroundMusicVolume = 0.2;

function playAudio(playerId, soundUrl) {
  if (audioPlayers[playerId] && !audioPlayers[playerId].ended) return;

  if (audioPlayers[playerId]) {
    audioPlayers[playerId].pause();
    audioPlayers[playerId].currentTime = 0;
  }

  const audioFile = new Audio(`${soundUrl}?${new Date().getTime()}`);
  audioFile.volume = volumeLevel;

  audioFile.onended = function () {
    audioPlayers[playerId] = null;
  };

  audioFile.play().catch((error) => console.error('Audio playback failed: ', error));
  audioPlayers[playerId] = audioFile;
}

function playBackgroundMusic() {
  if (audioPlayers.background && !audioPlayers.background.ended) return;

  audioPlayers.background = new Audio(`${backgroundMusicUrl}?${new Date().getTime()}`);
  audioPlayers.background.volume = backgroundMusicVolume;
  audioPlayers.background.loop = true;
  audioPlayers.background.play().catch((error) => console.error('Background music playback failed: ', error));
}

function playWinningSound() {
  stopAllSounds();
  audioPlayers.winning = new Audio(`${winningSoundUrl}?${new Date().getTime()}`);
  audioPlayers.winning.volume = 0.5;
  audioPlayers.winning.play().catch((error) => console.error('Winning sound playback failed: ', error));
}

function stopAllSounds() {
  Object.values(audioPlayers).forEach((audio) => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  });
}

window.addEventListener('load', () => {
  playBackgroundMusic();
});
