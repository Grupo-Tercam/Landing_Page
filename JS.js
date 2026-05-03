
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formMessage");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
      nombre: document.getElementById("nombre").value.trim(),
      correo: document.getElementById("correo").value.trim(),
      tel: document.getElementById("telefono").value.trim()
    };

    // 
    if (Object.values(data).some(val => !val)) {
      formStatus.textContent = "Por favor, completa todos los campos.";
      return;
    }

    if (data.nombre.length < 5) {
      formStatus.textContent = "El nombre es demasiado corto.";
      return;
    }

    if (!/^\d+$/.test(data.tel)) {
      formStatus.textContent = "El teléfono solo debe contener números.";
      return;
    }

    // 
    formStatus.style.color = "var(--color4)";
    formStatus.textContent = "¡Mensaje enviado con éxito!";
    contactForm.reset();
    
    setTimeout(() => { formStatus.textContent = ""; }, 4000);
  });
}


const imgMap = document.getElementById("coverageMap");
const mapContainer = document.getElementById("mapZoom");
const btnIn = document.getElementById("zoomIn");
const btnOut = document.getElementById("zoomOut");

let state = { scale: 1, x: 0, y: 0, active: false, startX: 0, startY: 0 };

const renderMap = () => {
  if (imgMap) {
    imgMap.style.transform = `translate(${state.x}px, ${state.y}px) scale(${state.scale})`;
  }
};

if (imgMap && mapContainer) {
  // 
  btnIn?.addEventListener("click", () => {
    state.scale = Math.min(state.scale + 0.5, 5);
    renderMap();
  });

  btnOut?.addEventListener("click", () => {
    state.scale = Math.max(state.scale - 0.5, 1);
    if (state.scale === 1) { state.x = 0; state.y = 0; }
    renderMap();
  });

  // 
  mapContainer.addEventListener("mousedown", (e) => {
    if (state.scale <= 1) return;
    state.active = true;
    state.startX = e.clientX - state.x;
    state.startY = e.clientY - state.y;
  });

  window.addEventListener("mousemove", (e) => {
    if (!state.active) return;
    state.x = e.clientX - state.startX;
    state.y = e.clientY - state.startY;
    renderMap();
  });

  window.addEventListener("mouseup", () => { state.active = false; });

  // 
  mapContainer.addEventListener("wheel", (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.2 : 0.2;
    state.scale = Math.min(Math.max(state.scale + delta, 1), 5);
    if (state.scale === 1) { state.x = 0; state.y = 0; }
    renderMap();
  }, { passive: false });
}

const vehicleItems = Array.from(document.querySelectorAll(".vehicle-item"));
const vehiclePrev = document.getElementById("vehiclePrev");
const vehicleNext = document.getElementById("vehicleNext");
const vehicleTitle = document.getElementById("vehicleTitle");
const vehicleDescription = document.getElementById("vehicleDescription");

let activeVehicle = 0;

function renderVehicles() {
  vehicleItems.forEach((item, index) => {
    item.classList.toggle("is-active", index === activeVehicle);
  });

  const current = vehicleItems[activeVehicle];

  if (current && vehicleTitle && vehicleDescription) {
    vehicleTitle.textContent = current.dataset.title;
    vehicleDescription.textContent = current.dataset.text;
  }
}

if (vehicleItems.length && vehiclePrev && vehicleNext) {
  vehiclePrev.addEventListener("click", () => {
    activeVehicle = activeVehicle === 0 ? vehicleItems.length - 1 : activeVehicle - 1;
    renderVehicles();
  });

  vehicleNext.addEventListener("click", () => {
    activeVehicle = activeVehicle === vehicleItems.length - 1 ? 0 : activeVehicle + 1;
    renderVehicles();
  });

  vehicleItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      activeVehicle = index;
      renderVehicles();
    });
  });

  renderVehicles();
}
