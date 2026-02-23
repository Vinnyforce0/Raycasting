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
  menu.style.borderRadius = "10px";
  menu.style.zIndex = "999";
  menu.style.maxWidth = "400px";
  menu.style.minWidth = "300px";
  menu.style.maxHeight = "80vh";
  menu.style.overflowY = "auto";
  menu.style.display = "flex";
  menu.style.flexDirection = "column";

  menu.innerHTML = `
    <h3 style="margin: 0 0 15px 0;">Configurações</h3>
    
    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px;">
      <!-- Céu -->
      <div style="padding: 10px; background: #222; border-radius: 5px;">
        <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
          <input type="checkbox" id="skyToggle" ${gameSettings.sky ? "checked" : ""}>
          Céu
        </label>
      </div>

      <!-- Chão -->
      <div style="padding: 10px; background: #222; border-radius: 5px;">
        <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
          <input type="checkbox" id="floorToggle" ${gameSettings.floor ? "checked" : ""}>
          Chão
        </label>
      </div>
      
      <!-- Paredes -->
      <div style="padding: 10px; background: #222; border-radius: 5px;">
        <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
          <input type="checkbox" id="textureToggle" ${gameSettings.usetextures ? "checked" : ""}>
          Paredes
        </label>
      </div>

      <!-- FPS -->
      <div style="padding: 10px; background: #222; border-radius: 5px;">
        <label style="display: block; font-size: 12px; margin-bottom: 5px;">
          FPS: <span id="fpsValue">${gameSettings.fps}</span>
        </label>
        <input type="range" id="fpsSlider" min="15" max="90" step="15" value="${gameSettings.fps}" style="width: 100%;">
      </div>

      <!-- FOV -->
      <div style="padding: 10px; background: #222; border-radius: 5px;">
        <label style="display: block; font-size: 12px; margin-bottom: 5px;">
          FOV: <span id="fovValue">${gameSettings.fov}°</span>
        </label>
        <input type="range" id="fovSlider" min="30" max="120" step="10" value="${gameSettings.fov}" style="width: 100%;">
      </div>

      <!-- Resolução -->
      <div style="padding: 10px; background: #222; border-radius: 5px;">
        <label style="display: block; font-size: 12px; margin-bottom: 5px;">
          Resolução: <span id="raysValue">${gameSettings.rays}</span>
        </label>
        <input type="range" id="raysSlider" min="60" max="400" step="20" value="${gameSettings.rays}" style="width: 100%;">
      </div>
    </div>
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
