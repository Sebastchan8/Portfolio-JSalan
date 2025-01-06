// scripts/game/assets.js
export function loadImages() {
    const bgLayer1 = new Image();
    bgLayer1.src = "./img/Background/1.png";

    const bgLayer2 = new Image();
    bgLayer2.src = "./img/Background/2.png";

    const bgLayer3 = new Image();
    bgLayer3.src = "./img/Background/3.png";

    const bgLayer4 = new Image();
    bgLayer4.src = "./img/Background/4.png";

    return { bgLayer1, bgLayer2, bgLayer3, bgLayer4 };
}