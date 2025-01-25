import Phaser from 'phaser'

console.log(window.innerHeight);
console.log(window.innerWidth);
console.log(window);

export default {
  type: Phaser.AUTO,
  parent: 'content',
  width: window.innerWidth - 5,
  height: window.innerHeight - 5,
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 700 },
        debug: true // show bounding boxes and velocity on screen
    }
  },
  localStorageName: 'phaseres6webpack'
}
