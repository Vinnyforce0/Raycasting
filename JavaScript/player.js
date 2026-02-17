const player = {
  x: 150,
  y: 150,
  angle: 0,
  speed: 1
};

function movePlayer(deltaTime) {

  if (!joystick.active) return;

  const dx = joystick.stickX - joystick.baseX;
  const dy = joystick.stickY - joystick.baseY;

  const magnitude = Math.sqrt(dx * dx + dy * dy);
  if (magnitude < 5) return;

  const speed = 1.5 * player.speed * (deltaTime * 1.2);

  // Normaliza
  const nx = dx / joystick.maxRadius;
  const ny = dy / joystick.maxRadius;

  // Frente e trás (vertical do joystick)
  player.x += Math.cos(player.angle) * (-ny) * speed * magnitude;
  player.y += Math.sin(player.angle) * (-ny) * speed * magnitude;

  // Strafe lateral (horizontal do joystick)
  player.x += Math.cos(player.angle + Math.PI / 2) * nx * speed * magnitude;
  player.y += Math.sin(player.angle + Math.PI / 2) * nx * speed * magnitude;
}