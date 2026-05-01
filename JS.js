const f = document.getElementById("contactForm");
const msg = document.getElementById("formMessage");

if (f && msg) {
  f.addEventListener("submit", (e) => {
    e.preventDefault();

    const n = document.getElementById("nombre").value.trim();
    const c = document.getElementById("correo").value.trim();
    const t = document.getElementById("telefono").value.trim();

    if (!n || !c || !t) {
      msg.textContent = "Por favor completa todos los campos.";
      return;
    }

    if (n.length < 5) {
      msg.textContent = "El nombre debe tener minimo 5 caracteres.";
      return;
    }

    if (!/^\d+$/.test(t)) {
      msg.textContent = "El numero telefonico solo debe contener numeros.";
      return;
    }

    msg.textContent = "Mensaje enviado correctamente.";
    f.reset();
  });
}
const coverageMap = document.getElementById("coverageMap");
const mapZoom = document.getElementById("mapZoom");
const zoomIn = document.getElementById("zoomIn");
const zoomOut = document.getElementById("zoomOut");

let mapScale = 1;
let mapX = 0;
let mapY = 0;
let isDragging = false;
let startX = 0;
let startY = 0;

function updateMapZoom() {
  if (coverageMap) {
    coverageMap.style.transform = `translate(${mapX}px, ${mapY}px) scale(${mapScale})`;
  }
}

if (coverageMap && mapZoom && zoomIn && zoomOut) {
  zoomIn.addEventListener("click", () => {
    mapScale = Math.min(mapScale + 0.4, 6);
    updateMapZoom();
  });

  zoomOut.addEventListener("click", () => {
    mapScale = Math.max(mapScale - 0.4, 1);

    if (mapScale === 1) {
      mapX = 0;
      mapY = 0;
    }

    updateMapZoom();
  });

  mapZoom.addEventListener("mousedown", (e) => {
    if (mapScale <= 1) return;

    isDragging = true;
    startX = e.clientX - mapX;
    startY = e.clientY - mapY;
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    mapX = e.clientX - startX;
    mapY = e.clientY - startY;
    updateMapZoom();
  });

  window.addEventListener("mouseup", () => {
    isDragging = false;
  });
}
