// scripts/classes/Player.js
import { CANVAS_WIDTH, CANVAS_HEIGHT, ANIMATION_STATES } from '../config/constants.js';
import { keys } from '../utils/input.js';
import { ctxPlayer } from '../game/setup.js';
import { gameState } from '../config/gameState.js';

const initialSpeed = 2;

export class Player {
    constructor() {
        this.x = 0;
        this.y = 400;
        this.spriteWidth = 128;
        this.spriteHeight = 300;
        this.frameX = 0;
        this.gameFrame = 0;
        this.staggerFrames = 15;
        this.animationStates = ANIMATION_STATES;
        this.changeAnimationState(5);

        this.minX = -100;
        this.maxX = CANVAS_WIDTH - 280;
        this.initialThreshold = 200;
        this.worldBoundary = false;

        this.isJumping = false;
        this.jumpVelocity = 0;
        this.gravity = 0.5;
        this.facingLeft = false;
        this.isAttacking = false;
        this.onGround = true;
    }

    changeAnimationState = (newAnimationState) => {
        this.currentAnimationState = this.animationStates[newAnimationState];
        this.playerImage = new Image();
        this.playerImage.src = `./img/Fighter/${this.currentAnimationState.name}.png`;
    }

    attack() {
        if (!this.isAttacking) {
            this.isAttacking = true;

            // Elegir un ataque aleatorio
            const attackAnimations = [0, 1, 2];
            const randomAttack = attackAnimations[Math.floor(Math.random() * attackAnimations.length)];
            this.changeAnimationState(randomAttack);

            setTimeout(() => {
                this.isAttacking = false;

                if (this.isJumping) {
                    this.changeAnimationState(6);
                } else if (keys.ArrowLeft.pressed || keys.ArrowRight.pressed) {
                    this.changeAnimationState(gameState.isRunning ? 7 : 9);
                } else {
                    this.changeAnimationState(5);
                }
            }, this.currentAnimationState.frames * this.staggerFrames * (1000 / 100));
        }
    }

    jump() {
        if (this.onGround) {
            this.isJumping = true;
            this.onGround = false;
            this.jumpVelocity = -15;
            this.changeAnimationState(6);
        }
    } 

    
    draw() {
        ctxPlayer.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        
        let position = Math.floor(this.gameFrame / this.staggerFrames) % this.currentAnimationState.frames;
        this.frameX = this.spriteWidth * position;
        
        ctxPlayer.save();
    
        if (this.facingLeft) {
            ctxPlayer.scale(-1, 1);
            ctxPlayer.translate(-CANVAS_WIDTH, 0);
            ctxPlayer.drawImage(
                this.playerImage,
                this.frameX, 0, this.spriteWidth, this.spriteHeight,
                CANVAS_WIDTH - this.x - 350, this.y, 400, 1000
            );
        } else {
            ctxPlayer.drawImage(
                this.playerImage,
                this.frameX, 0, this.spriteWidth, this.spriteHeight,
                this.x, this.y, 400, 1000
            );
        }
    
        this.gameFrame++;
        ctxPlayer.restore();
    }  

    updatePosition(platforms, infoPanels) {
        this.jumpVelocity += this.gravity;
        const nextY = this.y + this.jumpVelocity;
        
        const playerBottom = nextY + 425;
        const playerLeft = this.x + 150;
        const playerRight = this.x + 250;
        
        this.onGround = false;
        
        for (const platform of platforms) {
            if (playerRight >= platform.x && 
                playerLeft <= platform.x + platform.width &&
                this.y + 425 <= platform.y + 10 && 
                playerBottom >= platform.y) {
                
                this.y = platform.y - 425;
                this.jumpVelocity = 0;
                this.onGround = true;
                break;
            }
        }
        
        if (!this.onGround) {
            this.y = nextY;
            
            if (this.y >= 400) {
                this.y = 400;
                this.jumpVelocity = 0;
                this.onGround = true;
            }
        }
        
        this.isJumping = !this.onGround;
        
        if (keys.ArrowUp.pressed && this.onGround) {
            this.jump();
        }
        
        if (keys.ArrowRight.pressed) {
            this.moveRight();
            this.facingLeft = false;
        }
        if (keys.ArrowLeft.pressed) {
            this.moveLeft();
            this.facingLeft = true;
        }
        
        for (const obj of infoPanels) {
            obj.checkCollision(this);
        }
    }

    moveLeft() {
        if (this.isAttacking) return;
        
        this.changeAnimationState(gameState.isRunning ? 7 : 9);
        const speed = initialSpeed * (keys.Shift.pressed ? 2 : 1);
        
        if (this.x > this.minX) {
            this.x = Math.max(this.minX, this.x - speed);
            gameState.playerDirection = 0;
            this.facingLeft = true;
        }
    }
    
    moveRight() {
        if (this.isAttacking) return;
        
        this.changeAnimationState(gameState.isRunning ? 7 : 9);
        const speed = initialSpeed * (keys.Shift.pressed ? 2 : 1);
        
        if (gameState.worldBoundary) {
            if (this.x < this.maxX) {
                this.x = Math.min(this.maxX, this.x + speed);
            }
            gameState.playerDirection = 1;
        } else if (this.x < this.initialThreshold) {
            this.x = Math.min(this.initialThreshold, this.x + speed);
            gameState.playerDirection = 0;
        } else {
            gameState.playerDirection = 1;
        }
        
        this.facingLeft = false;
    }
    
    idle() {
        if (!keys.ArrowLeft.pressed && !keys.ArrowRight.pressed) {
            this.changeAnimationState(5);
            gameState.playerDirection = 0;
        }
    }
    
}