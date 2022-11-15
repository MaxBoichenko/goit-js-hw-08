import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const KEY = 'videoplayer-current-time';
const iframe = document.querySelector('#vimeo-player');

const player = new Player(iframe);

const TimeChange = e => {
  localStorage.setItem(KEY, e.seconds);
};
const EndFn = () => {
  player.off('timeupdate', throttledFn);
  localStorage.removeItem(KEY);
};
const throttledFn = throttle(TimeChange, 1000, { trailing: false });

player.on('timeupdate', throttledFn);
player.on('ended', EndFn);

const savedTime = localStorage.getItem(KEY);

if (savedTime) {
  player.setCurrentTime(savedTime);
}
