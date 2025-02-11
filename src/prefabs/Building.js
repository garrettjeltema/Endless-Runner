class Building extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)
        scene.add.existing(this)
        this.moveSpeed = 5
    }

    create() {
        this.y.setImmovable(true)
        this.y.setAllowGravity(false)
        
        // move buildings left
        // this.x.setVelocityX(-this.moveSpeed)
    }

    update() {
        // wrap from left to right edge
        if(this.x <= 0 - game.config.width) {
            this.x = game.config.width
        }
    }
}