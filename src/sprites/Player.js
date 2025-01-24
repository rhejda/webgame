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
    }


    update() {

        // walking right and left
        if (this.body.velocity.x < 0) {
            this.anims.play("left", true)
        } else if (this.body.velocity.x > 0) {
            this.anims.play("right", true)
        }

        // is sword up?
        if (this.anims.currentFrame != null) {
            if(this.anims.currentFrame.index != 1 && this.anims.currentFrame.index <= 4 && this.body.velocity.y == 0) {
                this.sword_up = true;
            }
            if(this.anims.currentFrame.index > 4 && this.anims.currentFrame.index < 8 && this.body.velocity.y == 0) {
                this.sword_up = false;
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

        // standing looking direction
        if (this.body.velocity.x == 0) {
            if (this.stand_right == true) {
                this.anims.play('face_right', true);
            }
            else {
                this.anims.play('face_left', true);
            }
        }
    }
}