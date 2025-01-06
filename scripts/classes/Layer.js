// scripts/classes/Layer.js
import { gameState } from '../config/gameState.js';
import { ctx } from '../game/setup.js';

const totalMovementFactor = 5.6;

export class Layer {
    constructor(image, speedModifier, isIdleLayer = false) {
        this.x = 0;
        this.y = 0;
        this.width = 2000;
        this.height = 1000;
        this.image = image;
        this.speedModifier = speedModifier;
        this.isIdleLayer = isIdleLayer;
        this.speed = 0;
        this.totalMovement = 0;
    }

    update() {
        if(this.totalMovement > 11700) {
            return;       
        }
        if (this.isIdleLayer) {
            this.speed = 0.5 * this.speedModifier;
            this.x = (this.x - this.speed) % this.width;
            return;
        }

        if (gameState.gameSpeed === 0 || gameState.playerDirection === 0) {
            return;
        }

        if (this.speedModifier === 0) {
            this.speed = gameState.playerDirection * gameState.gameSpeed;
        } else {
            this.speed = gameState.gameSpeed * this.speedModifier * gameState.playerDirection;
        }

        this.x = (this.x - this.speed) % this.width;
        
        if (gameState.playerDirection === 1) {
            this.totalMovement += this.speed;
        }

        if (this.totalMovement > this.width * totalMovementFactor) {
            gameState.worldBoundary = true;
        }
        
        // console.log("Total movement: ", this.totalMovement);
        
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}