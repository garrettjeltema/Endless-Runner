// Game Title: Milo's Adventure
// Created by Garrett Jeltema
// Started 2 / 3 / 2025
// Hours Spent: 21
// Creative Tilt:
// One of the programming techniques that seems simple now but I struggled with understanding
// for a while was implementing the cat spawn every 10 seconds. I figured this out through
// previous knowledge of Javascript although it wasn't particularly difficult to create
// it is still an aspect of my game that I am proud of.

// One of the artistic aspects that I'm proud of is that I used Adobe Illustrator for all of the
// assets and made the music using my own software (although I'm still learning the software).
// Although I'm not trying anything particularly interesting, I think that my game has beauty in its
// simplicity. The background and overall look of the game contribute to the cool, vibe-y feel of the
// it besides the dark music.

let cursors

var config = {
    parent: 'phaser-game',
    type: Phaser.WEBGL,
    width: 1920,
    height: 1080,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            wrap: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ Menu, Play, Death, Credits ]
}

let game = new Phaser.Game(config)

let highScore = 0