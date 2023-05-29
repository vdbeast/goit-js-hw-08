import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

const STORAGE_KEY = 'videoplayer-current-time';

player.on('timeupdate', throttle(saveCurrentTime, 1000));

const savedTime = localStorage.getItem(STORAGE_KEY);

if (savedTime) {
  player.setCurrentTime(savedTime);
}

function saveCurrentTime() {
  player
    .getCurrentTime()
    .then((currentTime) => {
      localStorage.setItem(STORAGE_KEY, currentTime);
    })
    .catch((error) => {
      console.error('Error saving current time:', error);
    });
}