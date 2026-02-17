const FPS = {
  target: 30,
  lastTime: performance.now(),
  fps: 0,

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

      this.fps = 1000 / delta;
    }

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("FPS: " + this.fps.toFixed(0), 10, 30);

    requestAnimationFrame(() => this.update(updateGameCallback));
  }
};
