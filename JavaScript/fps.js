const FPS = {
  target: 30,
  lastTime: performance.now(),
  fps: 0,
  rafCount: 0,      // Conta requestAnimationFrame calls (FPS do navegador)
  gameFrameCount: 0, // Conta game updates (FPS do jogo)
  lastSecond: performance.now(),

  update: function(updateGameCallback) {
    const now = performance.now();
    const delta = now - this.lastTime;

    const targetFrameDuration = 1000 / this.target;

    this.rafCount++; // Incrementa a cada RAF call

    if (delta >= targetFrameDuration) {

      // delta em SEGUNDOS (muito importante)
      const deltaTime = delta / 1000;

      this.lastTime = now - (delta % targetFrameDuration);

      // Passa deltaTime para o jogo
      updateGameCallback(deltaTime);

      this.gameFrameCount++;
    }

    // Atualiza FPS a cada terço de segundo (~333ms)
    if (now - this.lastSecond >= 1000 / 3) {
      this.fps = this.gameFrameCount; // Mostra game updates (FPS do jogo)
      // console.log("RAF FPS:", this.rafCount, "Game FPS:", this.gameFrameCount);
      this.rafCount = 0;
      this.gameFrameCount = 0;
      this.lastSecond = now;
    }

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("FPS: " + this.fps, 10, 30);

    requestAnimationFrame(() => this.update(updateGameCallback));
  }
};
