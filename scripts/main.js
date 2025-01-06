// scripts/main.js
import { initializeCanvas } from './game/setup.js';
import { loadImages } from './game/assets.js';
import { movePlayer } from './game/movement.js';
import { Player } from './classes/Player.js';
import { Layer } from './classes/Layer.js';
import { Platform } from './classes/Platform.js';
import { InfoPanel } from './classes/InfoPanel.js';
import { setupInputHandlers } from './utils/input.js';
import { ANIMATION_STATES, GITHUB_URL, LINKEDIN_URL } from './config/constants.js';

const { ctx, ctxPlayer, width, height } = initializeCanvas();

const player = new Player(ANIMATION_STATES);
setupInputHandlers(player);

const images = loadImages();

const layers = [
    new Layer(images.bgLayer1, 0, false),
    new Layer(images.bgLayer2, 0.2, true),
    new Layer(images.bgLayer3, 0.3, true),
    new Layer(images.bgLayer4, 0, false)
];

const platforms = [
    new Platform(4200, 700, 200, 20),//4200, 700
    new Platform(4500, 600, 200, 20),//4500, 600
    new Platform(10000, 700, 150, 20),//10000, 700
    new Platform(10200, 600, 150, 20),//10200, 600
    new Platform(10400, 500, 150, 20),//10400, 500
];

const infoPanels = [
    new InfoPanel(620, 100, 450, 450, 'controls', false),//620
    new InfoPanel(1400, 220, 300, 300, 'message', false),//1400
    new InfoPanel(1500, 550, 400, 600, 'about', true, 500, -150),//1500
    new InfoPanel(2800, 450, 800, 650, 'education', true, 400, -250),//2800
    new InfoPanel(4820, 320, 540, 650, 'experience', true, 400, -350),//4820
    new InfoPanel(5975, 550, 3000, 600, 'projects', true, 400, -100),//5975
    new InfoPanel(10620, 280, 600, 600, 'skills', true, 400, -400),//10620
    new InfoPanel(12350, 130, 500, 400, 'contact', false),//12350
    new InfoPanel(12450, 580, 500, 400, '', true, 0, 0, 'github.png', GITHUB_URL),
    new InfoPanel(12650, 580, 530, 400, '', true, 0, 0, 'linkedin.png', LINKEDIN_URL),
];

function animate() {
    ctx.clearRect(0, 0, width, height);
    ctxPlayer.clearRect(0, 0, width, height);

    layers.forEach(layer => {
        layer.update();
        layer.draw();
    });

    platforms.forEach(platform => {
        platform.update(player, layers[0]);
        platform.draw();
    });
    
    infoPanels.forEach(panel => {
        panel.update(player, layers[0]);
        panel.draw();
    });

    player.updatePosition(platforms, infoPanels);
    player.draw();

    movePlayer(player);

    requestAnimationFrame(animate);
}

animate();