<template>
  <div class="w-full h-screen flex items-center justify-center bg-[#f0f0f0] m-0 overflow-hidden">
    <div class="relative w-full max-w-[1200px] border-b-4 border-[#535353] bg-white shadow-2xl">
      <canvas ref="canvas" class="w-full block"></canvas>

      <div v-if="gameOver" class="absolute inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-md">
        <div class="text-[#535353] text-5xl font-mono font-bold tracking-[15px] mb-8">GAME OVER</div>
        <button @click="resetGame" class="p-6 bg-[#535353] hover:bg-black text-white rounded-full transition-all hover:scale-110 shadow-2xl">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const mascotImg = new Image();
mascotImg.src = "/mascot.png"; 

const canvas = ref(null);
let ctx;
let animationId;

const gameOver = ref(false);
const score = ref(0);
const best = ref(localStorage.getItem("bestScore") || 0);

// --- 調整後的巨大化參數 ---
const GROUND_Y = 220;     // 地面下移，畫布變高（原 150）
const INITIAL_SPEED = 7;  // 初始速度稍微提升一點，更有動感
const GRAVITY = 0.6;      // 配合高度微調重力
const JUMP_FORCE = -14;   // 配合高度增加跳躍力
const SPEED_ACCEL = 200;  

let gameSpeed = INITIAL_SPEED;
let frameCount = 0;
let obstacles = [];
let clouds = [];
let nextSpawnTimer = 0;

// 🦖 吉祥物尺寸加大！
const dino = {
  x: 80,         // 稍微往右移一點
  y: GROUND_Y,
  w: 80,         // 從 50 放大到 80
  h: 80,         // 從 50 放大到 80
  vy: 0,
  jumping: false
};

onMounted(() => {
  ctx = canvas.value.getContext("2d");
  window.addEventListener("resize", resizeCanvas);
  document.addEventListener("keydown", handleKeyDown);
  resizeCanvas();
  initClouds();
  gameLoop();
});

function resizeCanvas() {
  if (!canvas.value) return;
  canvas.value.width = canvas.value.parentElement.clientWidth;
  canvas.value.height = 300; // 畫布高度從 200 增加到 300
}

function initClouds() {
  clouds = [
    { x: 200, y: 40, s: 0.8 },
    { x: 700, y: 70, s: 0.5 },
    { x: 1100, y: 30, s: 0.6 }
  ];
}

function handleKeyDown(e) {
  if (e.code === "Space" && !dino.jumping && !gameOver.value) {
    dino.vy = JUMP_FORCE;
    dino.jumping = true;
    e.preventDefault();
  }
}

function update() {
  if (gameOver.value) return;

  frameCount++;
  score.value = Math.floor(frameCount / 6);
  gameSpeed = INITIAL_SPEED + (score.value / SPEED_ACCEL); 

  dino.vy += GRAVITY;
  dino.y += dino.vy;
  if (dino.y > GROUND_Y) {
    dino.y = GROUND_Y;
    dino.vy = 0;
    dino.jumping = false;
  }

  if (nextSpawnTimer <= 0) {
    const isBird = Math.random() > 0.8;
    obstacles.push({
      x: canvas.value.width + 100,
      y: isBird ? (Math.random() > 0.5 ? GROUND_Y - 80 : GROUND_Y - 40) : GROUND_Y + 10,
      w: isBird ? 50 : 35, // 障礙物也稍微加大一點點保持比例
      h: isBird ? 40 : 60,
      type: isBird ? "bird" : "cactus"
    });
    nextSpawnTimer = (Math.random() * 60 + 80) / (gameSpeed / INITIAL_SPEED);
  }
  nextSpawnTimer--;

  obstacles.forEach((ob, index) => {
    ob.x -= gameSpeed;
    if (ob.x + ob.w < 0) obstacles.splice(index, 1);

    // 碰撞偵測（加大後的 Hitbox 優化）
    if (
      dino.x + 15 < ob.x + ob.w &&
      dino.x + dino.w - 15 > ob.x &&
      dino.y + 15 < ob.y + ob.h &&
      dino.y + dino.h - 10 > ob.y
    ) {
      endGame();
    }
  });

  clouds.forEach(c => {
    c.x -= gameSpeed * 0.15;
    if (c.x < -150) c.x = canvas.value.width + 150;
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);

  // 加粗的地平線
  ctx.strokeStyle = "#535353";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, GROUND_Y + dino.h);
  ctx.lineTo(canvas.value.width, GROUND_Y + dino.h);
  ctx.stroke();
  
  // 地表顆粒
  ctx.fillStyle = "#535353";
  for(let i=0; i<canvas.value.width; i+=150) {
    let dotX = (i - (frameCount * gameSpeed * 0.5) % 150);
    ctx.fillRect(dotX, GROUND_Y + dino.h + 5, 4, 2);
  }

  // 雲朵
  ctx.fillStyle = "#E0E0E0";
  clouds.forEach(c => {
    ctx.fillRect(c.x, c.y, 60, 15);
    ctx.fillRect(c.x + 15, c.y - 10, 30, 10);
  });

  // 🦖 繪製吉祥物
  if (mascotImg.complete && mascotImg.naturalWidth > 0) {
    ctx.drawImage(mascotImg, dino.x, dino.y, dino.w, dino.h);
  } else {
    ctx.fillStyle = "rgba(0,0,0,0.1)";
    ctx.fillRect(dino.x, dino.y, dino.w, dino.h);
    ctx.fillStyle = "#999";
    ctx.font = "12px Arial";
    ctx.fillText("Mascot Here", dino.x + 5, dino.y + 40);
  }

  // 障礙物
  ctx.fillStyle = "#535353";
  obstacles.forEach(ob => {
    ctx.fillRect(ob.x, ob.y, ob.w, ob.h);
    if (ob.type === "bird") {
      let wingPos = (frameCount % 16 < 8) ? -15 : 15;
      ctx.fillRect(ob.x + 15, ob.y + wingPos, 15, 10);
    }
  });

  // 分數（字體也放大）
  ctx.fillStyle = "#535353";
  ctx.font = "bold 24px monospace";
  ctx.textAlign = "right";
  ctx.fillText(`HI ${String(best.value).padStart(5, '0')} ${String(score.value).padStart(5, '0')}`, canvas.value.width - 20, 40);
}

function gameLoop() {
  update();
  draw();
  animationId = requestAnimationFrame(gameLoop);
}

function endGame() {
  gameOver.value = true;
  cancelAnimationFrame(animationId);
  if (score.value > best.value) {
    best.value = score.value;
    localStorage.setItem("bestScore", best.value);
  }
}

function resetGame() {
  gameOver.value = false;
  score.value = 0;
  frameCount = 0;
  gameSpeed = INITIAL_SPEED; 
  obstacles = [];
  nextSpawnTimer = 0;
  dino.y = GROUND_Y;
  dino.vy = 0;
  dino.jumping = false;
  initClouds();
  cancelAnimationFrame(animationId);
  gameLoop(); 
}

onUnmounted(() => {
  window.removeEventListener("resize", resizeCanvas);
  document.removeEventListener("keydown", handleKeyDown);
  cancelAnimationFrame(animationId);
});
</script>