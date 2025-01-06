// scripts/utils/input.js
export const keys = {
    ArrowUp: { pressed: false },
    ArrowDown: { pressed: false },
    ArrowLeft: { pressed: false },
    ArrowRight: { pressed: false },
    Shift: { pressed: false }
};

export function setupInputHandlers(player) {
    window.addEventListener("keydown", ({ key }) => {
        switch (key) {
            case "ArrowUp":
                keys.ArrowUp.pressed = true;
                break;
            case "ArrowDown":
                keys.ArrowDown.pressed = true;
                break;
            case "ArrowLeft":
                keys.ArrowLeft.pressed = true;
                break;
            case "ArrowRight":
                keys.ArrowRight.pressed = true;
                break;
            case "Shift":
                keys.Shift.pressed = true;
                break;
            case " ":
                player.attack();
                break;
        }
    });

    window.addEventListener("keyup", ({ key }) => {
        switch (key) {
            case "ArrowUp":
                keys.ArrowUp.pressed = false;
                break;
            case "ArrowDown":
                keys.ArrowDown.pressed = false;
                break;
            case "ArrowLeft":
                keys.ArrowLeft.pressed = false;
                break;
            case "ArrowRight":
                keys.ArrowRight.pressed = false;
                break;
            case "Shift":
                keys.Shift.pressed = false;
                break;
        }
        if (!keys.ArrowLeft.pressed && !keys.ArrowRight.pressed) {
            player.idle();
        }
    });
}