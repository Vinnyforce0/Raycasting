// =======================
// FPS MANAGER OTIMIZADO
// =======================

const FPS = {
  target: 30, // limite de FPS desejado
  lastTime: performance.now(),
  fps: 0,

  update: function(updateGameCallback) {
    const now = performance.now();
    const delta = now - this.lastTime;
    const targetFrameDuration = 1000 / this.target;

    // Só atualiza o jogo se passou tempo suficiente (limite de FPS)
    if (delta >= targetFrameDuration) {
      this.lastTime = now - (delta % targetFrameDuration);

      // Chama callback do jogo (lógica e desenho)
      updateGameCallback();

      // Calcula FPS real baseado no tempo do frame
      this.fps = 1000 / delta;
    }

    // Desenha FPS real no canto superior esquerdo
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("FPS: " + this.fps.toFixed(0), 10, 30);

    // Próximo frame
    requestAnimationFrame(() => this.update(updateGameCallback));
  }
};
