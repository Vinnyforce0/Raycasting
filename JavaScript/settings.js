// =======================
// CONFIGURAÇÕES DO JOGO
// =======================

window.gameSettings = {
  sky: true,
  floor: true,
  fps: 30
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
  menu.style.width = "200px";

  menu.innerHTML = `
    <h3>Configurações</h3>

    <label>
      <input type="checkbox" id="skyToggle" ${gameSettings.sky ? "checked" : ""}>
      Céu
    </label><br><br>

    <label>
      <input type="checkbox" id="floorToggle" ${gameSettings.floor ? "checked" : ""}>
      Chão
    </label><br><br>

    <label>
      FPS:
      <input type="range" id="fpsSlider" min="15" max="60" value="${gameSettings.fps}">
      <span id="fpsValue">${gameSettings.fps}</span>
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

  const slider = document.getElementById("fpsSlider");
  const fpsValue = document.getElementById("fpsValue");

  slider.oninput = (e) => {
    gameSettings.fps = parseInt(e.target.value);
    fpsValue.textContent = gameSettings.fps;

    if (typeof FPS !== "undefined") {
      FPS.target = gameSettings.fps;
    }
  };
}

// =======================
// INICIALIZA
// =======================

window.addEventListener("load", () => {
  createSettingsButton();
});
