// scripts/game/setup.js
export const canvas = document.getElementById("canvas");
export const canvasPlayer = document.getElementById("canvasPlayer");

export const ctx = canvas.getContext("2d");
export const ctxPlayer = canvasPlayer.getContext("2d");

export function initializeCanvas() {
    canvas.width = canvasPlayer.width = window.innerWidth;
    canvas.height = canvasPlayer.height = window.innerHeight;
    return {
        canvas,
        canvasPlayer,
        ctx,
        ctxPlayer,
        width: canvas.width,
        height: canvas.height
    };
}