const ball = document.getElementById("ball");
const paddle = document.getElementById("paddle");
const scoreDisplay = document.getElementById("score");

let ballY = 0;
let ballX = Math.random() * 380;
let ballSpeed = 3;
let score = 0;
let paddleX = 160;

// Gerakkan Paddle dengan Mouse
document.addEventListener("mousemove", (e) => {
  const containerRect = document
    .querySelector(".game-container")
    .getBoundingClientRect();
  paddleX = e.clientX - containerRect.left - 40;

  // Batasi agar paddle tidak keluar kotak
  if (paddleX < 0) paddleX = 0;
  if (paddleX > 320) paddleX = 320;

  paddle.style.left = paddleX + "px";
});

function update() {
  ballY += ballSpeed;

  // Jika bola jatuh ke bawah
  if (ballY > 480) {
    // Cek apakah kena paddle
    if (ballX > paddleX && ballX < paddleX + 80) {
      score++;
      scoreDisplay.innerText = "Skor: " + score;
      resetBall();
      ballSpeed += 0.2; // Game semakin cepat
    } else {
      alert("Game Over! Skor Akhir: " + score);
      score = 0;
      ballSpeed = 3;
      scoreDisplay.innerText = "Skor: 0";
      resetBall();
    }
  }

  ball.style.top = ballY + "px";
  ball.style.left = ballX + "px";

  requestAnimationFrame(update);
}

function resetBall() {
  ballY = 0;
  ballX = Math.random() * 380;
}

update();
// Memastikan semua elemen HTML sudah dimuat sebelum kode berjalan
window.onload = function () {
  const ball = document.getElementById("ball");
  const paddle = document.getElementById("paddle");
  const scoreDisplay = document.getElementById("score");
  const uiLayer = document.getElementById("ui-layer");
  const startBtn = document.getElementById("start-btn");
  const container = document.querySelector(".game-container");

  // Variabel Game
  let ballY = -30;
  let ballX = Math.random() * 350;
  let ballSpeed = 4;
  let score = 0;
  let level = 1;
  let paddleX = 160;
  let isPlaying = false;
  let animationID;

  // 1. FUNGSI TOMBOL MULAI
  startBtn.onclick = function () {
    console.log("Game Dimulai!"); // Cek di Console F12
    uiLayer.style.display = "none";
    isPlaying = true;

    // Reset data game
    score = 0;
    level = 1;
    ballSpeed = 4;
    ballY = -30;
    ballX = Math.random() * 350;

    updateUI();
    gameLoop(); // Jalankan gerakan
  };

  // 2. KONTROL GERAKAN (MOUSE)
  container.onmousemove = function (e) {
    if (!isPlaying) return;

    const rect = container.getBoundingClientRect();
    // Hitung posisi mouse di dalam kotak game
    let x = e.clientX - rect.left - paddle.offsetWidth / 2;

    // Batas agar papan tidak keluar kotak
    if (x < 0) x = 0;
    if (x > rect.width - paddle.offsetWidth)
      x = rect.width - paddle.offsetWidth;

    paddleX = x;
    paddle.style.left = paddleX + "px";
  };

  // 3. LOGIKA GERAKAN BOLA
  function gameLoop() {
    if (!isPlaying) return;

    ballY += ballSpeed;

    // Cek jika bola sampai di bawah
    if (ballY > 470) {
      // Logika Tabrakan (Papan Menangkap Bola)
      // Ukuran bola = 25px, Ukuran papan = 90px
      if (ballX + 25 > paddleX && ballX < paddleX + 90) {
        score++;
        if (score % 5 === 0) {
          level++;
          ballSpeed += 1; // Level naik, kecepatan naik
        }
        updateUI();
        resetBall();
      } else {
        gameOver();
        return; // Berhenti jika kalah
      }
    }

    // Terapkan posisi ke elemen visual
    ball.style.top = ballY + "px";
    ball.style.left = ballX + "px";

    // Panggil fungsi ini terus menerus (animasi)
    animationID = requestAnimationFrame(gameLoop);
  }

  function resetBall() {
    ballY = -30;
    ballX = Math.random() * 350;
  }

  function updateUI() {
    scoreDisplay.innerText = `Skor: ${score} | Level: ${level}`;
  }

  function gameOver() {
    isPlaying = false;
    cancelAnimationFrame(animationID);
    uiLayer.style.display = "flex";
    document.getElementById("title").innerText = "GAME OVER!";
    startBtn.innerText = "COBA LAGI";
  }
};
