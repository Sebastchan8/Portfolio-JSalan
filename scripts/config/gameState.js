// scripts/config/gameState.js
export const gameState = {
    gameSpeed: 0.5,
    isRunning: false,
    playerDirection: 0,
    worldBoundary: false,
    layer1Movement: 0,
};

export function setGameSpeed(speed) {
    gameState.gameSpeed = speed;
}

export function setRunningState(isRunning) {
    gameState.isRunning = isRunning;
}

export function setPlayerDirection(direction) {
    gameState.playerDirection = direction;
}

export function setWorldBoundary(boundary) {
    gameState.worldBoundary = boundary;
}

export function updateLayer1Movement(movement) {
    gameState.layer1Movement = movement;
}