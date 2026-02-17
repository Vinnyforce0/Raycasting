window.canvas = document.getElementById("game");
window.ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

// =======================
// INICIA O JOGO
// =======================
window.onload = () => {
  // Passa o callback do jogo para o FPS manager
  FPS.update((deltaTime) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (gameSettings.floor && typeof drawFloor === "function") drawFloor();
    if (gameSettings.sky && typeof drawSky === "function") drawSky();
    if (typeof movePlayer === "function") movePlayer(deltaTime);
    if (typeof castRays === "function") castRays(gameSettings.usetextures);
    if (typeof drawJoystick === "function") drawJoystick();

  });
};
