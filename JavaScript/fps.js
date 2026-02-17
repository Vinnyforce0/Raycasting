// =======================
// FPS MANAGER
// =======================

const FPS = {
  target: 60,                  // limite de FPS
  frameCount: 0,
  fps: 0,
  lastTime: performance.now(),
  lastFpsUpdate: performance.now(),

  update: function(updateGameCallback) {
    const now = performance.now();
    const delta = now - this.lastTime;
    const targetFrameDuration = 1000 / this.target;

    // Atualiza lógica/desenho apenas se passou tempo suficiente
    if (delta >= targetFrameDuration) {
      this.lastTime = now - (delta % targetFrameDuration);

      // Chama o callback do jogo (desenho e lógica)
      updateGameCallback();

      this.frameCount++;
    }

    // Atualiza contador de FPS a cada 1 segundo
    if (now - this.lastFpsUpdate >= 1000) {
      this.fps = this.frameCount;
      this.frameCount = 0;
      this.lastFpsUpdate = now;
    }

    // Desenha FPS no canto superior esquerdo
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("FPS: " + this.fps, 10, 30);

    requestAnimationFrame(() => this.update(updateGameCallback));
  }
};
