class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {
        this.physics.world.gravity.y = 1000
        this.JUMP_VELOCITY = -850
    }

    preload() {
        // load buildings
        this.load.image('building1', './assets/Building 1 - Endless Runner.png')
        this.load.image('building2', './assets/Building 2 - Endless Runner.png')

        this.load.image('sidewalk', './assets/Sidewalk - Endless Runner.png')
        this.load.image('lamp', './assets/Lamp Post.png')
        this.load.image('mailbox', './assets/Mail Box.png')


        // load dog
        this.load.spritesheet('dog', './assets/Dog Character - Endless Runner.png', {
            frameWidth: 150,
            frameHeight: 115,
            startFrame: 0,
            endFrame: 5
        })

        // load cat
        this.load.image('cat', './assets/Cat Character - Endless Runner.png')

        // load bird
        this.load.spritesheet('bird', './assets/Bird Character - Endless Runner.png', {
            frameWidth: 25,
            frameHeight: 11,
            startFrame: 0,
            endFrame: 3
        })
    }

    create() {
        // add in-game background
        this.background = this.add.tileSprite(0, 0, 1920, 1080, 'background').setOrigin(0, 0)

        // add music
        this.loop = this.sound.add('song', {
            mute: false,
            volume: 1,
            rate: 1,
            loop: true
        })
        this.loop.play()

        // add buildings to background
        this.building1 = this.physics.add.sprite(game.config.width - game.config.width / 3, game.config.height - 335, 'building1')
        this.building1.setScale(4, 4)
        this.building1.body.setAllowGravity(false)
        this.building1.body.setImmovable(true)

        this.building2 = this.physics.add.sprite(game.config.width / 4, game.config.height - 335, 'building2')
        this.building2.setScale(3, 3)
        this.building2.body.setAllowGravity(false)
        this.building2.body.setImmovable(true)

        this.building3 = this.physics.add.sprite(game.config.width + 100, game.config.height - 335, 'building1')
        this.building3.setScale(5, 5)
        this.building3.body.setAllowGravity(false)
        this.building3.body.setImmovable(true)

        // add lamp post
        this.lamp = this.physics.add.sprite(-200, game.config.height - 335, 'lamp')
        this.lamp.body.setAllowGravity(false)
        this.lamp.body.setImmovable(true)

        // add mail box
        this.mail = this.physics.add.sprite(game.config.width + 100, game.config.height - 320, 'mailbox')
        this.mail.body.setAllowGravity(false)
        this.mail.body.setImmovable(true)

        // add sidewalk
        this.sidewalk = this.physics.add.sprite(game.config.width, game.config.height - 100, 'sidewalk')
        this.sidewalk.body.setAllowGravity(false)
        this.sidewalk.body.setImmovable(true)

        this.sidewalk2 = this.physics.add.sprite(0, game.config.height - 100, 'sidewalk')
        this.sidewalk2.body.setAllowGravity(false)
        this.sidewalk2.body.setImmovable(true)

        // add cat sprite
        this.cat = this.physics.add.sprite(game.config.width, 0, 'cat')
        this.cat.setScale(2, 2)
        this.cat.body.setSize(85, 115)
        this.cat.body.setAllowGravity(false)

        // add bird sprite
        this.bird = this.physics.add.sprite(game.config.width + 100, game.config.height / 2, 'bird', 0)
        this.bird.setScale(3, 3)
        this.bird.body.setAllowGravity(false)

        // group buildings
        this.sidewalks = this.add.group([this.sidewalk, this.sidewalk2])


        // moving buildings
        this.building1.body.setVelocityX(-300)
        this.building2.body.setVelocityX(-300)
        this.building3.body.setVelocityX(-300)

        this.lamp.body.setVelocityX(-300)

        // moving sidewalk
        this.sidewalk.body.setVelocityX(-300)
        this.sidewalk2.body.setVelocityX(-300)

        // add dog character
        this.dog = this.physics.add.sprite(300, game.config.height - 700, 'dog', 0)
        this.dog.setScale(2, 2)
        this.dog.body.setSize(150, 50)
        this.dog.body.setOffset(0, 60)

        // dog character animations
        this.anims.create({
            key: 'walking',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('dog', {
                start: 0,
                end: 2
            })
        })

        this.anims.create({
            key: 'jumping',
            frameRate: 2,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('dog', {
                start: 3,
                end: 5
            })
        })

        // bird character animations
        this.anims.create({
            key: 'flying',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('bird', {
                start: 0,
                end: 3
            })
        })


        // add phyics collider
        this.physics.add.collider(this.dog, this.sidewalks)
        
        // add cat physics overlap
        this.catOver = this.physics.add.overlap(this.dog, this.cat)
        
        // add bird physics overlap
        this.birdOver = this.physics.add.overlap(this.dog, this.bird)

        // add mailbox physics collider
        this.mailOver = this.physics.add.collider(this.dog, this.mail)

        cursors = this.input.keyboard.createCursorKeys()


        // timer create
        this.timer = this.time.addEvent({
            delay: 6000000,
            args: [],
            startAt: 0,
            timeScale: 1,
            paused: false,
            loop: true
        })

        // tutorial config
        let tutConfig = {
            fontFamily: 'Myriad Pro',
            fontSize: '64px',
            color: '#FF0000',
            align: 'center',
            padding: {
                top: 25,
                bottom: 25
            },
            fixedWidth: 400
        }
        this.tut1 = this.add.text(game.config.width / 2 - 300, 200, 'Avoid Birds', tutConfig)

        this.tut2 = this.add.text(game.config.width / 2, 200, '...and Cats', tutConfig)
        
        // debug
        this.input.keyboard.on('keydown-D', function() {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this)
    }
    
    update() {
        this.dog.body.x = 300

        // timer
        let clockConfig = {
            fontFamily: 'Impact',
            fontSize: '64px',
            backgroundColor: '#000000',
            color: '#EEE824',
            align: 'center',
            padding: {
                top: 25,
                bottom: 25
            },
            fixedWidth: 100
        }
        this.elapsed = this.timer.getElapsedSeconds()
        this.elapsed = Math.ceil(this.elapsed)
        this.timeDisplay = this.add.text(game.config.width - 100, 0, this.elapsed, clockConfig)

        // start movement of animals
        if(this.elapsed == 2) {
            // moving bird
            this.bird.body.setVelocityX(-800)
        }
        if(this.elapsed == 7) {
            // moving cat
            this.cat.body.setVelocityX(-1400)
            this.cat.body.setVelocityY(800)
            this.playCat()
        }
        if(this.elapsed == 8) {
            // moving mailbox
            this.mail.body.setVelocityX(-300)
        }

        // timer
        let wordConfig = {
            fontFamily: 'Impact',
            fontSize: '64px',
            backgroundColor: '#000000',
            color: '#EEE824',
            align: 'center',
            padding: {
                top: 25,
                bottom: 25
            },
            fixedWidth: 150
        }
        this.timeWord = this.add.text(game.config.width - 250, 0, 'Time: ', wordConfig)

        // high score
        if(this.elapsed > highScore) {
            highScore = this.elapsed
        }
        this.scoreDisplay = this.add.text(game.config.width - 350, 0, highScore, clockConfig)
        this.scoreWord = this.add.text(game.config.width - 500, 0, 'Best:', wordConfig)

        // game over
        if(this.dog.body.y >= game.config.height + 70) {
            this.loop.stop()
            this.scene.start('deathScene')
        }

        // cat spawn from time to time
        if(this.elapsed % 10 == 0) {
            this.spawnCat(this.cat)
            this.playCat()
        }

        // bird spawn
        if(this.bird.body.x <= 0) {
            this.bird.setX(Phaser.Math.Between(game.config.width + 100, game.config.width + 800))
            this.bird.setY(Phaser.Math.Between(game.config.height - 500, game.config.height - 900))
        }

        // mailbox spawn
        if(this.mail.body.x <= -50) {
            this.mail.setX(Phaser.Math.Between(game.config.width, game.config.width + 700))
        }

        // remove tutorial
        if(this.elapsed == 4) {
            this.tut1.destroy()
            this.tut2.destroy()
        }
        // if(this.elapsed == 9) {
        //     this.tut2.destroy()
        // }

        // speed up the game
        if(this.elapsed < 20) {
            this.background.tilePositionX += 4
        } else if(this.elapsed >= 20) {
            this.background.tilePositionX += 6
        } else if(this.elapsed >= 40) {
            this.background.tilePositionX += 10
        }

        if(this.elapsed == 20) {
            this.building1.setVelocityX(-900)
            this.building2.setVelocityX(-900)
            this.building3.setVelocityX(-900)
            this.lamp.setVelocityX(-900)
            
            this.sidewalk.setVelocityX(-900)
            this.sidewalk2.setVelocityX(-900)

            this.bird.setVelocityX(-1400)

            this.mail.body.setVelocityX(-900)
        }
        if(this.elapsed == 40) {
            this.building1.setVelocityX(-1000)
            this.building2.setVelocityX(-1000)
            this.building3.setVelocityX(-1000)
            this.lamp.setVelocityX(-1000)

            this.sidewalk.setVelocityX(-1000)
            this.sidewalk2.setVelocityX(-1000)

            this.bird.setVelocityX(-15000)

            this.mail.body.setVelocityX(-1000)
        }

        // cat kills dog
        if(this.dog.x < this.cat.x + this.cat.width &&
            this.dog.x + this.dog.width > this.cat.x &&
            this.dog.y < this.cat.y + this.cat.height &&
            this.dog.height + this.dog.y > this.cat.y) {
                this.loop.stop()
                this.scene.start('deathScene')
            }

        // bird kills dog
        if(this.dog.x < this.bird.x + this.bird.width &&
            this.dog.x + this.dog.width > this.bird.x &&
            this.dog.y < this.bird.y + this.bird.height &&
            this.dog.height + this.dog.y > this.bird.y) {
                this.loop.stop()
                this.scene.start('deathScene')
            }

        // mailbox kills dog
        if(this.dog.x < this.mail.x + this.mail.width &&
            this.dog.x + this.dog.width > this.mail.x &&
            this.dog.y < this.mail.y + this.mail.height &&
            this.dog.height + this.dog.y > this.mail.y) {
                this.loop.stop()
                this.scene.start('deathScene')
            }

        // bird animations
        this.bird.anims.play('flying', true)

        
        // walking animation
        if(this.dog.body.touching.down) {
            this.dog.anims.play('walking', true)
        }

        // jumping animation
        if(!this.dog.body.touching.down) {
            this.dog.anims.play('jumping', true)
        }
        if(this.dog.body.touching.down && Phaser.Input.Keyboard.JustDown(cursors.space)) {
            this.dog.body.setVelocityY(this.JUMP_VELOCITY)
            this.playJump()
        }
        
        // wrap objects
        // this.physics.world.wrap(this.startPlatform, this.startPlatform.width + 300)
        // this.physics.world.wrap(this.building2, this.building2.width + 300)

        this.physics.world.wrap(this.sidewalk, this.sidewalk.width / 2)
        this.physics.world.wrap(this.sidewalk2, this.sidewalk2.width / 2)

        this.physics.world.wrap(this.building1, this.building2.width + 200)
        this.physics.world.wrap(this.building2, this.building2.width + 200)
        this.physics.world.wrap(this.building3, this.building2.width + 200)
        this.physics.world.wrap(this.lamp, this.building2.width + 200)
    }

    playJump() {
        switch(Math.floor(Math.random() * 2)) {
            case 0:
                this.sound.play('jump')
                break
            case 1:
                this.sound.play('land')
                break
            default:
                console.log('Error: Invalid Sound')
        }
    }

    playCat() {
        switch(Math.floor(Math.random() * 2)) {
            case 0:
                this.sound.play('cat1')
                break
            case 1:
                this.sound.play('cat2')
                break
            default:
                console.log('Error: Invalid Sound')
        }
    }

    spawnCat(cat) {
        cat.setX(game.config.width)
        cat.setY(0)
    }
}