// =======================
// CONFIGURAÇÕES DO JOGO
// =======================

window.gameSettings = {
  sky: true,
  floor: true,
  usetextures: true,
  fps: 30,
  fov: 60,      // em graus (60°)
  rays: 200,    // número de raios (resolução)
  version: APP_VERSION
};

// =======================
// CRIAR BOTÃO
// =======================

function createSettingsButton() {
  const btn = document.createElement("button");
  btn.innerHTML = "⚙";
  btn.style.position = "fixed";
  btn.style.top = "10px";
  btn.style.right = "10px";
  btn.style.zIndex = "999";
  btn.style.fontSize = "30px";
  btn.style.padding = "5px 10px";
  btn.style.cursor = "pointer";
  btn.style.borderRadius = "10px"
  btn.onclick = toggleSettingsMenu;
  document.body.appendChild(btn);
}

// =======================
// MENU
// =======================

function toggleSettingsMenu() {
  let menu = document.getElementById("settingsMenu");

  if (menu) {
    menu.remove();
    return;
  }

  menu = document.createElement("div");
  menu.id = "settingsMenu";
  menu.style.position = "fixed";
  menu.style.top = "50px";
  menu.style.right = "10px";
  menu.style.background = "#111";
  menu.style.color = "white";
  menu.style.padding = "15px";
  menu.style.marginTop = "20px";
  menu.style.borderRadius = "10px";
  menu.style.zIndex = "999";
  menu.style.width = "200px";

  menu.innerHTML = `
    <h3>Configurações</h3><br>

    <label>
      <input type="checkbox" id="skyToggle" ${gameSettings.sky ? "checked" : ""}>
      Céu
    </label><br><br>

    <label>
      <input type="checkbox" id="floorToggle" ${gameSettings.floor ? "checked" : ""}>
      Chão
    </label><br><br>
    
    <label>
      <input type="checkbox" id="textureToggle" ${gameSettings.usetextures ? "checked" : ""}>
      Paredes
    </label><br><br>

    <label>
      FPS:
      <input type="range" id="fpsSlider" min="15" max="60" step="15" value="${gameSettings.fps}">
      <span id="fpsValue">${gameSettings.fps}</span>
    </label><br><br>

    <label>
      FOV: <span id="fovValue">${gameSettings.fov}°</span><br>
      <input type="range" id="fovSlider" min="30" max="120" value="${gameSettings.fov}">
    </label><br><br>

    <label>
      Raios: <span id="raysValue">${gameSettings.rays}</span><br>
      <input type="range" id="raysSlider" min="50" max="300" step="10" value="${gameSettings.rays}">
    </label>
  `;

  document.body.appendChild(menu);

  // Eventos
  document.getElementById("skyToggle").onchange = (e) => {
    gameSettings.sky = e.target.checked;
  };

  document.getElementById("floorToggle").onchange = (e) => {
    gameSettings.floor = e.target.checked;
  };
  
  document.getElementById("textureToggle").onchange = (e) => {
    gameSettings.usetextures = e.target.checked;
  };

  const fpsSlider = document.getElementById("fpsSlider");
  const fpsValue = document.getElementById("fpsValue");
  const fovSlider = document.getElementById("fovSlider");
  const fovValue = document.getElementById("fovValue");
  const raysSlider = document.getElementById("raysSlider");
  const raysValue = document.getElementById("raysValue");

  fpsSlider.oninput = (e) => {
    gameSettings.fps = parseInt(e.target.value);
    fpsValue.textContent = gameSettings.fps;

    if (typeof FPS !== "undefined") {
      FPS.target = gameSettings.fps;
    }
  };

  fovSlider.oninput = (e) => {
    gameSettings.fov = parseInt(e.target.value);
    fovValue.textContent = gameSettings.fov + "°";
  };

  raysSlider.oninput = (e) => {
    gameSettings.rays = parseInt(e.target.value);
    raysValue.textContent = gameSettings.rays;
  };
}

// =======================
// INICIALIZA
// =======================

window.addEventListener("load", () => {
  createSettingsButton();
});
