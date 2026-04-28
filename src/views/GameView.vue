<template>
  <div class="w-full h-screen flex items-center justify-center bg-[#1a1a1a] m-0 overflow-hidden">
    <div class="relative w-full max-w-[1200px] border-b-4 border-white bg-[#252525] shadow-2xl overflow-hidden">
      <canvas ref="canvas" class="w-full block"></canvas>

      <div v-if="gameOver" class="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md">
        <div class="text-white text-5xl font-mono font-bold tracking-[15px] mb-8">GAME OVER</div>
        <button @click="resetGame" class="p-6 bg-white hover:bg-gray-200 text-black rounded-full transition-all">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, reactive } from "vue";

const images = reactive({
  run1: new Image(), run2: new Image(), jump: new Image(), loaded: false
});

images.run1.src = "/mascot_run_1.png";
images.run2.src = "/mascot_run_2.png";
images.jump.src = "/mascot_jump.png";

const canvas = ref(null);
let ctx;
let animationId;
const gameOver = ref(false);
const score = ref(0);
const best = ref(localStorage.getItem("bestScore") || 0);

// --- 參數 ---
const GROUND_Y = 280;
const INITIAL_SPEED = 650; 
const GRAVITY = 2600;      
const JUMP_FORCE = -850;   
const SPEED_ACCEL = 12;    

let gameSpeed = INITIAL_SPEED;
let obstacles = [];
let clouds = [];
let nextSpawnTimer = 0;
let lastTime = 0; 
let distanceTraveled = 0; 

const dino = reactive({ x: 80, y: 0, w: 0, h: 0, vy: 0, jumping: false });

const checkMascotRatio = () => {
  const naturalW = images.jump.naturalWidth;
  const naturalH = images.jump.naturalHeight;
  if (naturalW && naturalH) {
    const baseW = 100;
    dino.w = baseW;
    dino.h = baseW / (naturalW / naturalH);
    dino.y = GROUND_Y - dino.h;
  }
};

let loadedCount = 0;
const onImgLoad = () => {
  if (++loadedCount === 3) {
    checkMascotRatio();
    images.loaded = true;
  }
};
images.run1.onload = images.run2.onload = images.jump.onload = onImgLoad;

// --- 🎮 鍵盤處理修正 ---
const handleKeyDown = (e) => {
  // 核心：只要按下的是 Space 或 方向鍵，立刻阻止瀏覽器預設行為（防止捲動）
  if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) {
    e.preventDefault();
  }

  if (e.code === "Space" && !dino.jumping && !gameOver.value) {
    dino.vy = JUMP_FORCE;
    dino.jumping = true;
  }
};

onMounted(() => {
  ctx = canvas.value.getContext("2d", { alpha: false });
  
  // 建議監聽 window 層級，確保在頁面任何角落按空格都能攔截
  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("resize", resizeCanvas);
  
  resizeCanvas();
  initClouds();
  animationId = requestAnimationFrame(gameLoop);
});

function resizeCanvas() {
  if (!canvas.value) return;
  canvas.value.width = canvas.value.parentElement.clientWidth;
  canvas.value.height = 350;
}

function initClouds() {
  clouds = [{ x: 200, y: 50 }, { x: 700, y: 90 }, { x: 1100, y: 40 }];
}

function update(dt) {
  if (gameOver.value || !images.loaded || dino.h === 0) return;

  gameSpeed += SPEED_ACCEL * dt;
  distanceTraveled += gameSpeed * dt;
  score.value = Math.floor(distanceTraveled / 50);

  dino.vy += GRAVITY * dt;
  dino.y += dino.vy * dt;

  if (dino.y > GROUND_Y - dino.h) {
    dino.y = GROUND_Y - dino.h;
    dino.vy = 0;
    dino.jumping = false;
  }

  nextSpawnTimer -= dt;
  if (nextSpawnTimer <= 0) {
    const isBird = Math.random() > 0.8;
    obstacles.push({
      x: canvas.value.width + 150,
      y: isBird ? (Math.random() > 0.5 ? GROUND_Y - 140 : GROUND_Y - 95) : GROUND_Y - 50,
      w: isBird ? 50 : 35, h: isBird ? 40 : 50, type: isBird ? "bird" : "cactus"
    });
    nextSpawnTimer = (Math.random() * 0.7 + 0.7) * (INITIAL_SPEED / gameSpeed); 
  }

  for (let i = obstacles.length - 1; i >= 0; i--) {
    let ob = obstacles[i];
    ob.x -= gameSpeed * dt;
    if (ob.x + ob.w < -100) obstacles.splice(i, 1);

    const pw = dino.w * 0.3; 
    const ph = dino.h * 0.2;
    if (dino.x + pw < ob.x + ob.w && dino.x + dino.w - pw > ob.x &&
        dino.y + ph < ob.y + ob.h && dino.y + dino.h - ph > ob.y) {
      gameOver.value = true;
      if (score.value > best.value) {
        best.value = score.value;
        localStorage.setItem("bestScore", best.value);
      }
    }
  }

  clouds.forEach(c => {
    c.x -= gameSpeed * 0.15 * dt;
    if (c.x < -150) c.x = canvas.value.width + 150;
  });
}

function draw() {
  ctx.fillStyle = "#252525";
  ctx.fillRect(0, 0, canvas.value.width, canvas.value.height);

  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, GROUND_Y);
  ctx.lineTo(canvas.value.width, GROUND_Y);
  ctx.stroke();
  
  ctx.fillStyle = "#ffffff";
  for(let i=0; i < canvas.value.width + 150; i += 150) {
    let dotX = (i - (distanceTraveled * 0.5) % 150);
    ctx.fillRect(dotX, GROUND_Y + 5, 4, 2);
  }

  ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
  clouds.forEach(c => {
    ctx.fillRect(c.x, c.y, 60, 15);
    ctx.fillRect(c.x + 15, c.y - 10, 30, 10);
  });

  if (images.loaded && dino.h > 0) {
    let mascotToDraw = (dino.jumping || gameOver.value) ? images.jump : 
                       (Math.floor(distanceTraveled / 30) % 2 === 0 ? images.run1 : images.run2);
    ctx.drawImage(mascotToDraw, dino.x, dino.y, dino.w, dino.h);
  }

  ctx.fillStyle = "#ff4757";
  obstacles.forEach(ob => ctx.fillRect(ob.x, ob.y, ob.w, ob.h));

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 24px monospace";
  ctx.textAlign = "right";
  ctx.fillText(`HI ${String(best.value).padStart(5, '0')} ${String(score.value).padStart(5, '0')}`, canvas.value.width - 20, 45);
}

function gameLoop(timestamp) {
  if (!lastTime) lastTime = timestamp;
  const dt = (timestamp - lastTime) / 1000;
  lastTime = timestamp;
  update(Math.min(dt, 0.1)); 
  draw();
  animationId = requestAnimationFrame(gameLoop);
}

function resetGame() {
  gameOver.value = false;
  score.value = 0;
  distanceTraveled = 0;
  gameSpeed = INITIAL_SPEED;
  obstacles = [];
  nextSpawnTimer = 0;
  dino.y = GROUND_Y - dino.h;
  dino.vy = 0;
  dino.jumping = false;
  initClouds();
  lastTime = performance.now();
}

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
  window.removeEventListener("resize", resizeCanvas);
  cancelAnimationFrame(animationId);
});
</script>

<style scoped>
canvas {
  image-rendering: -webkit-optimize-contrast;
  image-rendering: pixelated;
  filter: drop-shadow(4px 4px 8px rgba(0,0,0,0.5));
}
</style>