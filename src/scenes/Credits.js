class Credits extends Phaser.Scene {
    constructor() {
        super('creditsScene')
    }

    preload() {
        this.load.image('credits', './assets/Credits Page  - Endless Runner-01.png')

        this.load.spritesheet('menuButton', './assets/Menu Button.png', {
            frameWidth: 160,
            frameHeight: 52,
            start: 0,
            end: 1
        })
        this.load.audio('song', './assets/Endless Runner Song-001.wav')
    }

    create() {
        // credits image
        this.add.image(game.config.width / 2, game.config.height / 2, 'credits')

        // add music
        this.loop = this.sound.add('song', {
            mute: false,
            volume: 2,
            rate: 1,
            loop: true
        })
        this.loop.play()

        // add menu button
        this.menu = this.add.sprite(game.config.width - 260, 100, 'menuButton', 0)
        this.menu.setScale(3, 3)

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

        this.menu.setInteractive({
            useHandCursor: true,
        })

        // menu button interactions
        this.menu.on('pointerover', () => {
            this.menu.play('menu-hover', true)
        })
        this.menu.on('pointerout', () => {
            this.menu.play('menu-out', true)
        })

        // menu button change scene
        this.menu.on('pointerdown', () => {
            this.loop.stop()
            this.scene.start('menuScene')
        })
    }
}