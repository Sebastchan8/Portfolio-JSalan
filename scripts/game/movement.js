// scripts/game/movement.js
import { gameState, setGameSpeed, setRunningState, setPlayerDirection } from '../config/gameState.js';
import { keys } from '../utils/input.js';

export function movePlayer(player) {
    if (player.isAttacking) return;

    if (keys.ArrowUp.pressed && !player.isJumping) {
        player.jump();
    } else if (!player.isJumping) {
        if (keys.ArrowLeft.pressed || keys.ArrowRight.pressed) {
            if (keys.Shift.pressed) {
                setRunningState(true);
                setGameSpeed(2.2);
            } else {
                setRunningState(false);
                setGameSpeed(1);
            }
            
            if (keys.ArrowLeft.pressed) {
                player.moveLeft();
            } else {
                player.moveRight();
            }
        } else {
            setPlayerDirection(0);
            setGameSpeed(0.5);
            setRunningState(false);
            player.idle();
        }
    }
}