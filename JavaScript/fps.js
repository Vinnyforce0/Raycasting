const FPS = {
  target: 30,
  lastTime: performance.now(),
  fps: 0,
  frameCount: 0,
  lastSecond: performance.now(),

  update: function(updateGameCallback) {
    const now = performance.now();
    const delta = now - this.lastTime;

    const targetFrameDuration = 1000 / this.target;

    if (delta >= targetFrameDuration) {

      // delta em SEGUNDOS (muito importante)
      const deltaTime = delta / 1000;

      this.lastTime = now - (delta % targetFrameDuration);

      // Passa deltaTime para o jogo
      updateGameCallback(deltaTime);

      this.frameCount++;
    }

    // Atualiza FPS a cada 1 segundo
    if (now - this.lastSecond >= 1000) {
      this.fps = this.frameCount;
      this.frameCount = 0;
      this.lastSecond = now;
    }

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("FPS: " + this.fps, 10, 30);

    requestAnimationFrame(() => this.update(updateGameCallback));
  }
};
