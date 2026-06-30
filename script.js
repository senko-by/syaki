const menuButton = document.querySelector(".menu-button");
const siteNav = document.querySelector(".site-nav");
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const orderButtons = Array.from(document.querySelectorAll(".order-service"));
const serviceSelect = document.querySelector("#service-select");
const orderForm = document.querySelector("#order-form");
const formMessage = document.querySelector("#form-message");
const dropZone = document.querySelector("#drop-zone");
const fileInput = document.querySelector("#asset-upload");
const fileList = document.querySelector("#file-list");

menuButton.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  document.body.classList.toggle("menu-open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

orderButtons.forEach((button) => {
  button.addEventListener("click", () => {
    serviceSelect.value = button.dataset.service;
    document.querySelector("#pesan").scrollIntoView({ behavior: "smooth" });
    serviceSelect.focus({ preventScroll: true });
  });
});

function renderFiles(files) {
  fileList.innerHTML = "";
  Array.from(files).forEach((file) => {
    const item = document.createElement("li");
    item.textContent = `${file.name} | ${Math.max(1, Math.ceil(file.size / 1024))} KB`;
    fileList.appendChild(item);
  });
}

fileInput.addEventListener("change", () => {
  renderFiles(fileInput.files);
});

["dragenter", "dragover"].forEach((eventName) => {
  dropZone.addEventListener(eventName, (event) => {
    event.preventDefault();
    dropZone.classList.add("dragging");
  });
});

["dragleave", "drop"].forEach((eventName) => {
  dropZone.addEventListener(eventName, (event) => {
    event.preventDefault();
    dropZone.classList.remove("dragging");
  });
});

dropZone.addEventListener("drop", (event) => {
  if (!event.dataTransfer.files.length) return;
  fileInput.files = event.dataTransfer.files;
  renderFiles(fileInput.files);
});

orderForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!orderForm.checkValidity()) {
    orderForm.reportValidity();
    return;
  }

  const service = serviceSelect.value || "layanan cetak";
  formMessage.textContent = `Brief ${service} sudah siap ditinjau tim Syakira Printing.`;
  orderForm.reset();
  fileList.innerHTML = "";
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const activeLink = document.querySelector(`.site-nav a[href="#${entry.target.id}"]`);
      if (!activeLink) return;
      navLinks.forEach((link) => link.classList.remove("active"));
      activeLink.classList.add("active");
    });
  },
  { rootMargin: "-45% 0px -45% 0px" }
);

document.querySelectorAll("main section[id]").forEach((section) => sectionObserver.observe(section));
