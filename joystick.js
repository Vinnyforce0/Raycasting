// =====================
// JOYSTICK CONFIG
// =====================

const joystick = {
  active: false,
  baseX: 0,
  baseY: 0,
  stickX: 0,
  stickY: 0,
  maxRadius: 60
};

let joystickTouchId = null;
let cameraTouchId = null;
let lastLookX = 0;

// =====================
// TOUCH EVENTS
// =====================

canvas.addEventListener("touchstart", (e) => {
  for (let touch of e.changedTouches) {

    // Lado esquerdo = joystick
    if (touch.clientX < canvas.width / 2 && joystickTouchId === null) {
      joystickTouchId = touch.identifier;
      joystick.active = true;
      joystick.baseX = touch.clientX;
      joystick.baseY = touch.clientY;
      joystick.stickX = touch.clientX;
      joystick.stickY = touch.clientY;
    }

    // Lado direito = câmera
    else if (touch.clientX >= canvas.width / 2 && cameraTouchId === null) {
      cameraTouchId = touch.identifier;
      lastLookX = touch.clientX;
    }
  }
});

canvas.addEventListener("touchmove", (e) => {
  for (let touch of e.changedTouches) {

    // Movimento do joystick
    if (touch.identifier === joystickTouchId) {
      let dx = touch.clientX - joystick.baseX;
      let dy = touch.clientY - joystick.baseY;

      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > joystick.maxRadius) {
        const angle = Math.atan2(dy, dx);
        dx = Math.cos(angle) * joystick.maxRadius;
        dy = Math.sin(angle) * joystick.maxRadius;
      }

      joystick.stickX = joystick.baseX + dx;
      joystick.stickY = joystick.baseY + dy;
    }

    // Rotação da câmera
    if (touch.identifier === cameraTouchId) {
      const delta = touch.clientX - lastLookX;
      player.angle += delta * 0.005; // sensibilidade
      lastLookX = touch.clientX;
    }
  }
});

canvas.addEventListener("touchend", (e) => {
  for (let touch of e.changedTouches) {
    if (touch.identifier === joystickTouchId) {
      joystick.active = false;
      joystickTouchId = null;
    }
    if (touch.identifier === cameraTouchId) {
      cameraTouchId = null;
    }
  }
});

// =====================
// MOUSE (PC)
// =====================

canvas.addEventListener("mousedown", (e) => {
  if (e.clientX < canvas.width / 2) {
    joystick.active = true;
    joystick.baseX = e.clientX;
    joystick.baseY = e.clientY;
    joystick.stickX = e.clientX;
    joystick.stickY = e.clientY;
  } else {
    lastLookX = e.clientX;
    isLooking = true;
  }
});

canvas.addEventListener("mousemove", (e) => {
  if (joystick.active) {
    let dx = e.clientX - joystick.baseX;
    let dy = e.clientY - joystick.baseY;

    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance > joystick.maxRadius) {
      const angle = Math.atan2(dy, dx);
      dx = Math.cos(angle) * joystick.maxRadius;
      dy = Math.sin(angle) * joystick.maxRadius;
    }

    joystick.stickX = joystick.baseX + dx;
    joystick.stickY = joystick.baseY + dy;
  }

  if (isLooking) {
    const delta = e.clientX - lastLookX;
    player.angle += delta * 0.005;
    lastLookX = e.clientX;
  }
});

canvas.addEventListener("mouseup", () => {
  joystick.active = false;
  isLooking = false;
});

// =====================
// DESENHAR JOYSTICK
// =====================

function drawJoystick() {
  if (!joystick.active) return;

  // Base
  ctx.beginPath();
  ctx.arc(
    joystick.baseX,
    joystick.baseY,
    joystick.maxRadius,
    0,
    Math.PI * 2
  );
  ctx.fillStyle = "rgba(255,255,255,0.2)";
  ctx.fill();

  // Stick
  ctx.beginPath();
  ctx.arc(
    joystick.stickX,
    joystick.stickY,
    25,
    0,
    Math.PI * 2
  );
  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.fill();
}
