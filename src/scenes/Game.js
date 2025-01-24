/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player'

// class StateMachine {
//     constructor(initialState, possibleStates, stateArgs=[]) {
//         this.initialState = initialState;
//         this.possibleStates = possibleStates;
//         this.stateArgs = stateArgs;
//         this.currentState = null;

//         for (const state of Object.values(this.possibleStates)) {
//             state.stateMachine = this;
//         }
//     }

//     step() {
//         if (this.state == null) {
//             this.state = this.initialState;
//             this.possibleStates[this.state].enter(...this.stateArgs);
//         }
//         this.possibleStates[this.state.execute(...this.stateArgs)];
//     }

//     transition(newState, ...enterArgs) {
//         this.state = newState;
//         this.possibleStates[this.state].enter(...this.stateArgs, ...enterArgs);
//     }
// }

// class State {
//     enter() {

//     }

//     execute() {

//     }
// }

export default class GameScene extends Phaser.Scene {
  constructor () {
    super({ key: 'GameScene' })
  }
  
  init () {}
  preload () {
    this.load.baseURL = 'images/';
    this.load.spritesheet('hero', 'sprites/link64_red.png', {frameWidth: 64, frameHeight: 64});
    this.load.image('background', 'sky_background_wide.png ');
    this.load.image('grass', 'grass.png');
    this.load.image('grass_foreground', 'grass_foreground.png');
    this.load.image('tileset', 'tileset-64x.png');
    this.load.tilemapTiledJSON('map', 'map.json');
  }
  create () {
    this.add.image(640, 256, 'background');
    this.add.image(640, 256, 'grass');

    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('tileset');
    const worldLayer = map.createLayer('World', tileset, 0, 0);
    this.framerate = 12;

    this.player = this.add.existing(new Player(this, 200, 200));
    this.physics.world.enable([ this.player ]);

    this.cameras.main.setBounds(0, 0, 1280, 512);
    this.physics.world.setBounds(0, 0, 1280, 512);

    this.cameras.main.startFollow(this.player);
    this.cameras.main.setFollowOffset(0, 240);

    this.physics.add.collider(this.player, worldLayer);
    worldLayer.setCollisionBetween(0,4)
    this.add.image(640, 256, 'grass_foreground');

    // this.stateMachine = new StateMachine('idle', {
    //     idle: new IdleState(),
    //     move: new MoveState(),
    //     jump: new JumpState(),
    //     climb: new ClimbState(),
    //     attack: new AttackState(),
    // }, [this, this.player])
  }

  update() {
    var keyboard = this.input.keyboard.addKeys('W, A, S, D, SPACE');
    var cursors = this.input.keyboard.createCursorKeys();
    var player = this.player;

    if (keyboard.D.isDown) {
        player.setVelocityX(player.player_speed);
        player.stand_right = true;
        if (keyboard.SPACE.isDown && player.can_jump == true) {
            player.setVelocityY(-player.jump_velocity)
        }
    }
    else if (keyboard.A.isDown) {
        player.setVelocityX(-player.player_speed);
        player.stand_right = false; // no longer facing right
        if (keyboard.SPACE.isDown && player.can_jump == true) {
            player.setVelocityY(-player.jump_velocity)
        }
    }
    else if (keyboard.SPACE.isDown && player.can_jump == true) {
        player.setVelocityY(-player.jump_velocity)  
        player.can_jump = false
    }
    else {
        player.setVelocityX(0);
        player.sword_up = false;
    }
    player.update()
  }
  
}