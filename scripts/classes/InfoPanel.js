import { ctx } from '../game/setup.js';

export class InfoPanel {
    constructor(x, y, width, height, fileName, isCollisionTriggered = false, canvasX = 0, canvasY = 0, logo = 'chest.jpg', socialLink = '') {
        this.initialX = x;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.fileName = fileName;
        this.isLoaded = false;
        this.isVisible = isCollisionTriggered ? false : !isCollisionTriggered;
        this.isCollisionTriggered = isCollisionTriggered;
        this.socialLink = socialLink;
        this.isSocialIcon = logo === 'github.png' || logo === 'linkedin.png';
        this.hasBeenActivated = false;
        this.lastLinkOpen = 0; // Nuevo: timestamp de la última apertura
        this.linkCooldown = 1000; // Nuevo: 1 segundo de cooldown

        this.collisionBox = isCollisionTriggered ? {
            width: 100,
            height: 100,
            image: new Image(),
        } : null;

        if (this.collisionBox) {
            this.collisionBox.image.src = `./img/assets/${logo}`;
        }

        this.panelCanvas = document.createElement('canvas');
        this.panelCanvas.width = width;
        this.panelCanvas.height = height;
        this.canvasX = canvasX;
        this.canvasY = canvasY;

        if (fileName !== '') {
            this.loadContent();
        }
    }

    loadContent() {
        if (this.fileName === '') return;
        
        fetch(`./pages/${this.fileName}.html`)
            .then(response => response.text())
            .then(html => {
                const temp = document.createElement('div');
                temp.innerHTML = html;
                temp.style.position = 'absolute';
                temp.style.left = '-9999px';
                document.body.appendChild(temp);

                html2canvas(temp.querySelector('.info-panel')).then(canvas => {
                    const ctx = this.panelCanvas.getContext('2d');
                    const radius = 20;

                    this.panelCanvas.width = canvas.width;
                    this.panelCanvas.height = canvas.height;

                    ctx.beginPath();
                    ctx.moveTo(radius, 0);
                    ctx.lineTo(canvas.width - radius, 0);
                    ctx.quadraticCurveTo(canvas.width, 0, canvas.width, radius);
                    ctx.lineTo(canvas.width, canvas.height - radius);
                    ctx.quadraticCurveTo(canvas.width, canvas.height, canvas.width - radius, canvas.height);
                    ctx.lineTo(radius, canvas.height);
                    ctx.quadraticCurveTo(0, canvas.height, 0, canvas.height - radius);
                    ctx.lineTo(0, radius);
                    ctx.quadraticCurveTo(0, 0, radius, 0);
                    ctx.closePath();

                    ctx.clip();
                    ctx.drawImage(canvas, 0, 0);

                    document.body.removeChild(temp);
                    this.isLoaded = true;
                });
            });
    }

    update(player, layer1) {
        if (player.x >= player.initialThreshold && !player.worldBoundary) {
            this.x = this.initialX - layer1.totalMovement;
        }
        else if (player.worldBoundary && playerDirection !== 0) {
            const speed = gameSpeed * (keys.Shift.pressed ? 2 : 1);
            this.x += playerDirection === 1 ? -speed : speed;
        }
    }

    draw() {
        if (this.isCollisionTriggered && this.collisionBox.image.complete) {
            ctx.drawImage(
                this.collisionBox.image,
                this.x,
                this.y,
                this.collisionBox.width,
                this.collisionBox.height
            );
        }

        if (this.isVisible && this.isLoaded) {
            let panelX = this.x;
            let panelY = this.y;

            if (this.isCollisionTriggered) {
                panelX = this.x + this.canvasX;
                panelY = this.y - this.height - this.canvasY;
            }

            ctx.drawImage(
                this.panelCanvas,
                panelX,
                panelY,
                this.width,
                this.height
            );
        }
    }

    checkCollision(player) {
        if (!this.isCollisionTriggered) return;
        if (!this.isSocialIcon && this.hasBeenActivated) return;
        
        const attackRange = 100;
        const playerCenterX = player.x + 200;
        const playerCenterY = player.y + 200;
        const objectCenterX = this.x + this.collisionBox.width / 2;
        const objectCenterY = this.y + this.collisionBox.height / 2;

        const currentTime = Date.now();

        if (player.isAttacking &&
            Math.abs(playerCenterX - objectCenterX) < attackRange &&
            Math.abs(playerCenterY - objectCenterY) < attackRange) {
            
            if (this.socialLink) {
                // Verificar el cooldown antes de abrir el enlace
                if (currentTime - this.lastLinkOpen >= this.linkCooldown) {
                    window.open(this.socialLink, '_blank');
                    this.lastLinkOpen = currentTime;
                }
            } else {
                // Comportamiento original para paneles no sociales
                this.isVisible = true;
                this.hasBeenActivated = true;
                if ((this.collisionBox.image.src).includes('chest')) {
                    this.collisionBox.image.src = './img/assets/broken.png';
                }
            }
        }
    }
}