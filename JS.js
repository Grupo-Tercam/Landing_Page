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
const zoomIn = document.getElementById("zoomIn");
const zoomOut = document.getElementById("zoomOut");

let mapScale = 1;

function updateMapZoom() {
  if (coverageMap) {
    coverageMap.style.transform = `scale(${mapScale})`;
  }
}

if (coverageMap && zoomIn && zoomOut) {
  zoomIn.addEventListener("click", () => {
    mapScale = Math.min(mapScale + 0.2, 3);
    updateMapZoom();
  });

  zoomOut.addEventListener("click", () => {
    mapScale = Math.max(mapScale - 0.2, 1);
    updateMapZoom();
  });
}
