window.canvas = document.getElementById("game");
window.ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

function loop() {
  FPS.update(() => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (typeof drawSky === "function") drawSky();       // desenha o céu
  //if (typeof drawFloor === "function") drawFloor();   // desenha o chão
  if (typeof movePlayer === "function") movePlayer();
  if (typeof castRays === "function") castRays();
  if (typeof drawJoystick === "function") drawJoystick();
  });
  requestAnimationFrame(loop);

}

// Espera tudo carregar
window.onload = () => {
  loop();
};
