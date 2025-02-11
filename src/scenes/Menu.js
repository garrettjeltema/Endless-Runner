class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }

    preload() {
        // load background screens
        this.load.image('background', './assets/Background - Endless Runner-03-01.png')
        this.load.image('menuScreen', './assets/Menu Screen - Endless Runner-01.png')
        this.load.image('endScreen', './assets/Game Over - Endless Runner-01.png')
        
        // load menu buttons
        this.load.spritesheet('startButton', './assets/Start Button.png', {
            frameWidth: 160,
            frameHeight: 52,
            startFrame: 0,
            endFrame: 1
        })
        this.load.spritesheet('creditsButton', './assets/Credits Button.png', {
            frameWidth: 160,
            frameHeight: 52,
            startFrame: 0,
            endFrame: 1
        })

        // load audio
        this.load.audio('jump', './assets/sound.wav')
        this.load.audio('land', './assets/sound2.wav')
        this.load.audio('cat1', './assets/Cat1.wav')
        this.load.audio('cat2', './assets/Cat2.wav')

        this.load.audio('song', './assets/Endless Runner Song-001.wav')
    }

    create() {
        // add menu background
        this.add.image(game.config.width / 2, game.config.height / 2,'menuScreen')

        // add music
        this.loop = this.sound.add('song', {
            mute: false,
            volume: 2,
            rate: 1,
            loop: true
        })
        this.loop.play()

        // add credits button
        this.credit = this.add.sprite(game.config.width - game.config.width / 6,  game.config.height - game.config.height / 3.5 + 180, 'creditsButton', 0)
        this.credit.setScale(3, 3)

        // add start button
        this.start = this.add.sprite(game.config.width - game.config.width / 6, game.config.height - game.config.height / 3.5, 'startButton', 0)
        this.start.setScale(3, 3)

        // start button animations
        this.anims.create({
            key: 'start-out',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('startButton', {
                start: 0,
                end: 0
            })
        })
        this.anims.create({
            key: 'start-hover',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('startButton', {
                start: 1,
                end: 1
            })
        })

        // credit button animations
        this.anims.create({
            key: 'credits-out',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('creditsButton', {
                start: 0,
                end: 0
            })
        })
        this.anims.create({
            key: 'credits-hover',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('creditsButton', {
                start: 1,
                end: 1
            })
        })

        this.start.setInteractive({
            useHandCursor: true,
        })

        this.credit.setInteractive({
            useHandCursor: true,
        })
        
        // start button interactions
        this.start.on('pointerover', () => {
            this.start.play('start-hover', true)
        })
        this.start.on('pointerout', () => {
            this.start.play('start-out', true)
        })

        // credit button interactions
        this.credit.on('pointerover', () => {
            this.credit.play('credits-hover', true)
        })
        this.credit.on('pointerout', () => {
            this.credit.play('credits-out', true)
        })

        // start button change scene
        this.start.on('pointerdown', () => {
            this.loop.stop()
            this.scene.start('playScene')
        })

        // credit button change scene
        this.credit.on('pointerdown', () => {
            this.loop.stop()
            this.scene.start('creditsScene')
        })

        // info text
        document.getElementById('info').innerHTML = 'Spacebar: Jump | D: toggle debug'
        let controlConfig = {
            fontFamily: 'Impact',
            fontSize: '72px',
            backgroundColor: '#000000',
            color: '#EEE824',
            align: 'center',
            padding: {
                top: 25,
                bottom: 25
            },
            fixedWidth: 400
        }
        this.controlWord = this.add.text(game.config.width - 450, 50, 'Space: Jump', controlConfig)
    }
}