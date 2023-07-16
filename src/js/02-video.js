import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const STORAGE_KEY = 'videoplayer-current-time';

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

const playbackTime = localStorage.getItem(STORAGE_KEY);
if (playbackTime) {
  player
    .setCurrentTime(playbackTime)
    .then(function (seconds) {
      console.log('The alarm position is set to ', seconds, 'seconds');
    })
    .catch(function (error) {});
}

const onPlay = throttle(updateTime, 1000);

function updateTime() {
  player
    .getCurrentTime()
    .then(function (seconds) {
      localStorage.setItem(STORAGE_KEY, seconds);
    })
    .catch(function (error) {
      console.log('An error occurred current time:', error);
    });
}

player.on('timeupdate', onPlay);
