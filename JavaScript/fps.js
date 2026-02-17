// =======================
// FPS MANAGER REAL
// =======================

const FPS = {
  target: 60,                  // limite de FPS desejado
  lastTime: performance.now(),
  fps: 0,

  update: function(updateGameCallback) {
    const now = performance.now();
    const delta = now - this.lastTime;

    // Atualiza o jogo apenas se passou tempo suficiente (limite de FPS)
    const targetFrameDuration = 1000 / this.target;
    if (delta >= targetFrameDuration) {
      this.lastTime = now - (delta % targetFrameDuration);

      // Chama callback do jogo
      updateGameCallback();

      // Calcula FPS real do frame
      this.fps = 1000 / delta;
    }

    // Desenha FPS no canto superior esquerdo
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("FPS: " + this.fps.toFixed(0), 10, 30);

    requestAnimationFrame(() => this.update(updateGameCallback));
  }
};
