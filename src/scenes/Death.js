class Death extends Phaser.Scene {
    constructor() {
        super('deathScene')
    }

    preload() {
        this.load.spritesheet('restartButton', './assets/Restart Button.png', {
            frameWidth: 160,
            frameHeight: 52,
            start: 0,
            end: 1
        })

        this.load.spritesheet('menuButton', './assets/Menu Button.png', {
            frameWidth: 160,
            frameHeight: 52,
            start: 0,
            end: 1
        })
        this.load.audio('song', './assets/Endless Runner Song-001.wav')
    }

    create() {
        // add end screen background
        this.add.image(game.config.width / 2, game.config.height / 2, 'endScreen')

        // add music
        this.loop = this.sound.add('song', {
            mute: false,
            volume: 2,
            rate: 1,
            loop: true
        })
        this.loop.play()

        // add restart button
        this.restart = this.add.sprite(game.config.width / 2,  game.config.height - game.config.height / 2, 'restartButton', 0)
        this.restart.setScale(3, 3)

        // add menu button
        this.menu = this.add.sprite(game.config.width / 2, game.config.height - game.config.height / 2 + 180, 'menuButton', 0)
        this.menu.setScale(3, 3)

        // restart button animations
        this.anims.create({
            key: 'restart-out',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('restartButton', {
                start: 0,
                end: 0
            })
        })
        this.anims.create({
            key: 'restart-hover',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('restartButton', {
                start: 1,
                end: 1
            })
        })

        // menu button animations
        this.anims.create({
            key: 'menu-out',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('menuButton', {
                start: 0,
                end: 0
            })
        })
        this.anims.create({
            key: 'menu-hover',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('menuButton', {
                start: 1,
                end: 1
            })
        })

        this.restart.setInteractive({
            useHandCursor: true,
        })

        this.menu.setInteractive({
            useHandCursor: true,
        })

        // restart button interactions
        this.restart.on('pointerover', () => {
            this.restart.play('restart-hover', true)
        })
        this.restart.on('pointerout', () => {
            this.restart.play('restart-out', true)
        })

        // menu button interactions
        this.menu.on('pointerover', () => {
            this.menu.play('menu-hover', true)
        })
        this.menu.on('pointerout', () => {
            this.menu.play('menu-out', true)
        })

        // restart button change scene
        this.restart.on('pointerdown', () => {
            this.loop.stop()
            this.scene.start('playScene')
        })

        // menu button change scene
        this.menu.on('pointerdown', () => {
            this.loop.stop()
            this.scene.start('menuScene')
        })
    }
}