// scripts/classes/Platform.js
import { gameState } from '../config/gameState.js';
import { ctx } from '../game/setup.js';
import { keys } from '../utils/input.js';

export class Platform {
    constructor(x, y, width, height) {
        this.initialX = x;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    update(player, layer1) {
        if (player.x >= player.initialThreshold && !gameState.worldBoundary) {
            this.x = this.initialX - layer1.totalMovement;
        }
        else if (gameState.worldBoundary && gameState.playerDirection !== 0) {
            const speed = gameState.gameSpeed * (keys.Shift.pressed ? 2 : 1);
            this.x += gameState.playerDirection === 1 ? -speed : speed;
        }
    }

    draw() {
        ctx.fillStyle = '#654321';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}