export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {  
        super(scene, x, y, 'hero');

        

        // scene.add.existing(this);
        scene.physics.add.existing(this);
        // this.scene.physics.world.enableBody(this, 0);
        this.body.onWorldBounds = true;

        this.setScale(1);

        // this.body.useDamping = true;
        // this.body.setDrag(.9, 0);
        this.body.setSize(24, 64);
        this.body.setCollideWorldBounds(true);
        this.stand_right = true;
        this.can_jump = false;
        this.player_speed = 300;
        this.jump_velocity = 325;
        this.body.setVelocity(0)
        this.sword_up = false

        
        this.anims.create({
            key: 'face_right',
            frames: [{ key: 'hero', frame: 8 }],
            frameRate: scene.framerate
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('hero', { start: 0, end: 7 }),
            randomFrame: true,
            frameRate: scene.framerate,
            repeat: -1
        });
        this.anims.create({
            key: 'face_left',
            frames: [ { key: 'hero', frame: 18 } ],
            frameRate: scene.framerate
        });
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('hero', { start: 10, end: 17 }),
            randomFrame: true,
            frameRate: scene.framerate,
            repeat: -1
        });
        this.anims.create({
            key: 'jumping_right',
            frames: [ { key: 'hero', frame: 7 } ],
            frameRate: scene.framerate
        });
        this.anims.create({
            key: 'floating_right',
            frames: [ { key: 'hero', frame: 4 } ],
            frameRate: scene.framerate
        });
        this.anims.create({
            key: 'floating_left',
            frames: [ { key: 'hero', frame: 11 } ],
            frameRate: scene.framerate
        });
        this.anims.create({
            key: 'falling_right',
            frames: [ { key: 'hero', frame: 9 } ],
            frameRate: scene.framerate
        });
        this.anims.create({
            key: 'jumping_left',
            frames: [ { key: 'hero', frame: 17 } ],
            frameRate: scene.framerate
        });
        this.anims.create({
            key: 'falling_left',
            frames: [ { key: 'hero', frame: 19 } ],
            frameRate: scene.framerate
        });
        this.anims.create({
            key: 'jumping_left_sword',
            frames: [ { key: 'hero', frame: 13 } ],
            frameRate: scene.framerate
        });
        this.anims.create({
            key: 'jumping_right_sword',
            frames: [ { key: 'hero', frame: 3 } ],
            frameRate: scene.framerate
        });
    }


    update() {

        // is sword up?
        if (this.anims.currentFrame != null) {
            if(this.anims.currentFrame.index != 1 && this.anims.currentFrame.index <= 4 && this.body.velocity.y == 0) {
                this.sword_up = true;
            }
            if(this.anims.currentFrame.index > 4 && this.anims.currentFrame.index < 8 && this.body.velocity.y == 0) {
                this.sword_up = false;
            }
        }

        // on the ground
        if (this.body.velocity.y == 0 ) {
            // standing looking direction
            if (this.body.velocity.x == 0 ) {
                if (this.stand_right == true) {
                    this.anims.play('face_right', true);
                }
                else {
                    this.anims.play('face_left', true);
                }
            }

            // walking right and left
            if (this.body.velocity.x < 0) {
                this.anims.play("left", true)
            } else if (this.body.velocity.x > 0) {
                this.anims.play("right", true)
            }
        }


        // sprite is moving upward facing right
        if(this.body.velocity.y < 0 && this.stand_right == true) {
            if(this.sword_up == true) {
                this.anims.play('jumping_right_sword', true);
            }
            else {
                this.anims.play('jumping_right', true);
            }
        }
        // sprite is falling looking right
        else if (this.body.velocity.y > 0 && this.stand_right == true) {
            this.anims.play('falling_right', true)
        }

        // sprite is moving upward looking left
        if (this.body.velocity.y < 0 && this.stand_right == false) {
            if (this.sword_up == true) {
                this.anims.play('jumping_left_sword');
            }
            else {
            this.anims.play('jumping_left', true);
            }
        }

        // sprite is falling looking left
        else if (this.body.velocity.y > 0 && this.stand_right == false) {
            this.anims.play('falling_left', true);
            this.can_jump = false;
        }

        // can jump once in the air
        if (this.body.velocity.y != 0) {
            this.can_jump = false;
        }

        // can jump once on the ground
        if (this.body.velocity.y == 0) {
            this.can_jump = true;
        }


    }
}