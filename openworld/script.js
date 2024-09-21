import tileColors from './tileColors.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const playerSize = 50;
const world = { width: 2000, height: 2000 };
const tileSize = playerSize;

const player = {
    x: Math.floor(world.width / 2 / tileSize) * tileSize,
    y: Math.floor(world.height / 2 / tileSize) * tileSize,
    width: playerSize,
    height: playerSize,
    speed: tileSize,
    canMove: true,
};

const camera = {
    x: 0,
    y: 0,
    width: canvas.width,
    height: canvas.height,
};

const keys = {};
window.addEventListener('keydown', function(e) {
    if (player.canMove) {
        keys[e.key] = true;
        movePlayer();
    }
});
window.addEventListener('keyup', function(e) {
    keys[e.key] = false;
});

function movePlayer() {
    if (keys['ArrowUp']) player.y -= player.speed;
    if (keys['ArrowDown']) player.y += player.speed;
    if (keys['ArrowLeft']) player.x -= player.speed;
    if (keys['ArrowRight']) player.x += player.speed;

    player.x = Math.max(0, Math.min(world.width - player.width, player.x));
    player.y = Math.max(0, Math.min(world.height - player.height, player.y));

    player.canMove = false;
    setTimeout(() => { player.canMove = true; }, 100);
    updateCamera();
}

function gameLoop() {
    render();
    requestAnimationFrame(gameLoop);
}

function updateCamera() {
    camera.x = Math.max(0, Math.min(world.width - camera.width, player.x - camera.width / 2));
    camera.y = Math.max(0, Math.min(world.height - camera.height, player.y - camera.height / 2));
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawWorld();
    ctx.fillStyle = '#FF0000'; // Red player
    ctx.fillRect(player.x - camera.x, player.y - camera.y, player.width, player.height);
}

function initializeTileColors() {
    const rows = Math.ceil(world.height / tileSize);
    const cols = Math.ceil(world.width / tileSize);

    for (let y = 0; y < rows; y++) {
        tileColors[y] = tileColors[y] || [];
        for (let x = 0; x < cols; x++) {
            tileColors[y][x] = tileColors[y][x] || getRandomColor();
        }
    }
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function drawWorld() {
    const rows = Math.ceil(world.height / tileSize);
    const cols = Math.ceil(world.width / tileSize);

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            ctx.fillStyle = tileColors[y][x];
            ctx.fillRect(x * tileSize - camera.x, y * tileSize - camera.y, tileSize, tileSize);
            ctx.strokeStyle = '#000000';
            ctx.strokeRect(x * tileSize - camera.x, y * tileSize - camera.y, tileSize, tileSize);
        }
    }
}

initializeTileColors();
gameLoop();
