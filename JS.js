

/* --- MAPA INTERACTIVO (ZOOM & DRAG con soporte Móvil) --- */
const imgMap = document.getElementById("coverageMap");
const mapContainer = document.getElementById("mapZoom");
const btnIn = document.getElementById("zoomIn");
const btnOut = document.getElementById("zoomOut");

let state = {
  scale: 1,
  x: 0,
  y: 0,
  active: false,
  startX: 0,
  startY: 0
};

const renderMap = () => {
  if (imgMap) {
    imgMap.style.transform = `translate(${state.x}px, ${state.y}px) scale(${state.scale})`;
  }
};

if (imgMap && mapContainer) {
  btnIn?.addEventListener("click", () => {
    state.scale = Math.min(state.scale + 0.5, 5);
    renderMap();
  });

  btnOut?.addEventListener("click", () => {
    state.scale = Math.max(state.scale - 0.5, 1);
    if (state.scale === 1) { state.x = 0; state.y = 0; }
    renderMap();
  });

  // Funciones genéricas para inicio y movimiento del arrastre
  const startDrag = (clientX, clientY) => {
    if (state.scale <= 1) return;
    state.active = true;
    state.startX = clientX - state.x;
    state.startY = clientY - state.y;
  };

  const moveDrag = (clientX, clientY) => {
    if (!state.active) return;
    state.x = clientX - state.startX;
    state.y = clientY - state.startY;
    renderMap();
  };

  // Eventos de Mouse (Escritorio)
  mapContainer.addEventListener("mousedown", (e) => startDrag(e.clientX, e.clientY));
  window.addEventListener("mousemove", (e) => moveDrag(e.clientX, e.clientY));
  window.addEventListener("mouseup", () => state.active = false);

  // CORREGIDO: Eventos Touch (Móviles)
  mapContainer.addEventListener("touchstart", (e) => {
    if (e.touches.length === 1) startDrag(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });

  window.addEventListener("touchmove", (e) => {
    if (e.touches.length === 1) moveDrag(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });

  window.addEventListener("touchend", () => state.active = false);

  // Zoom con la rueda del ratón
  mapContainer.addEventListener("wheel", (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.2 : 0.2;
    state.scale = Math.min(Math.max(state.scale + delta, 1), 5);
    if (state.scale === 1) { state.x = 0; state.y = 0; }
    renderMap();
  }, { passive: false });
}


/* --- GALERÍA DE VEHÍCULOS --- */
const vehicleItems = Array.from(document.querySelectorAll(".vehicle-item"));
const vehiclePrev = document.getElementById("vehiclePrev");
const vehicleNext = document.getElementById("vehicleNext");
const vehicleTitle = document.getElementById("vehicleTitle");
const vehicleDescription = document.getElementById("vehicleDescription");

let activeVehicle = 0;

function renderVehicles() {
  const total = vehicleItems.length;
  const prevIndex = activeVehicle === 0 ? total - 1 : activeVehicle - 1;
  const nextIndex = activeVehicle === total - 1 ? 0 : activeVehicle + 1;

  vehicleItems.forEach((item, index) => {
    item.classList.remove("is-active", "is-prev", "is-next");
    if (index === activeVehicle) {
      item.classList.add("is-active");
    } else if (index === prevIndex) {
      item.classList.add("is-prev");
    } else if (index === nextIndex) {
      item.classList.add("is-next");
    }
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


/* --- MENÚ DEL HEADER --- */
const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    siteNav.classList.toggle("is-open");
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
    });
  });

  document.addEventListener("click", (e) => {
    if (!menuToggle.contains(e.target) && !siteNav.contains(e.target)) {
      siteNav.classList.remove("is-open");
    }
  });
}


/* --- MARCAS --- */
const brandBubbles = document.querySelectorAll(".brand-bubble");

brandBubbles.forEach((bubble) => {
  bubble.addEventListener("click", () => {
    brandBubbles.forEach((item) => item.classList.remove("is-selected"));
    bubble.classList.add("is-selected");
  });
});

const contactForm = document.querySelector(".contact-form");
const formStatus = document.getElementById("formMessage");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Evita que la página se recargue o se vaya a Formspree

    // Validaciones básicas
    const nombre = document.getElementById("nombre").value.trim();
    const telefono = document.getElementById("telefono").value.trim();

    if (nombre.length < 5) {
      formStatus.textContent = "El nombre es demasiado corto.";
      formStatus.style.color = "var(--color1)";
      return;
    }

    // Preparar los datos para enviar
    const data = new FormData(contactForm);
    
    formStatus.textContent = "Enviando mensaje...";
    formStatus.style.color = "var(--white)";

    // Enviar a Formspree mediante AJAX
    const response = await fetch(contactForm.action, {
      method: contactForm.method,
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      // ÉXITO
      formStatus.textContent = "¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.";
      formStatus.style.color = "#4CAF50"; // Un verde para el éxito
      contactForm.reset(); // Limpia el formulario
    } else {
      // ERROR
      formStatus.textContent = "Hubo un error al enviar. Por favor, intenta de nuevo.";
      formStatus.style.color = "var(--color3)";
    }
  });
}