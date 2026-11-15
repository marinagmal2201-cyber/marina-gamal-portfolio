(() => {
  "use strict";

  const projects = Array.isArray(window.PORTFOLIO_PROJECTS) ? window.PORTFOLIO_PROJECTS : [];
  const certifications = Array.isArray(window.PORTFOLIO_CERTIFICATIONS) ? window.PORTFOLIO_CERTIFICATIONS : [];

  const grid = document.getElementById("project-grid");
  const projectsToggle = document.getElementById("projects-toggle");
  const certificationGrid = document.getElementById("certification-grid");
  const modal = document.getElementById("project-modal");
  const modalClose = modal ? modal.querySelector(".modal-close") : null;
  const modalImage = document.getElementById("modal-image");
  const modalPrev = document.getElementById("modal-prev");
  const modalNext = document.getElementById("modal-next");
  const modalImageCounter = document.getElementById("modal-image-counter");
  const modalThumbnails = document.getElementById("modal-thumbnails");
  const certificateModal = document.getElementById("certificate-modal");
  const certificateModalClose = certificateModal ? certificateModal.querySelector(".certificate-modal-close") : null;
  const filterButtons = Array.from(document.querySelectorAll(".filter-button"));
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.getElementById("primary-nav");
  const header = document.querySelector(".site-header");
  const navLinks = Array.from(document.querySelectorAll(".primary-nav a"));
  const sections = Array.from(document.querySelectorAll("main section[id]"));
  const contactForm = document.getElementById("contact-form");

  const PROJECTS_INITIAL_LIMIT = 8;
  let currentFilter = "all";
  let showAllProjects = false;
  let currentImages = [];
  let currentImageIndex = 0;
  let lastTrigger = null;

  const escapeHtml = (value) => String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

  // ---------- Reveal on scroll ----------
  function observeReveals(root) {
    const items = Array.from((root || document).querySelectorAll(".reveal:not(.visible)"));
    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("visible"));
      return;
    }
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach((item) => observer.observe(item));
  }

  // ---------- Projects ----------
  function getProjectImages(project) {
    const list = Array.isArray(project.images) ? project.images : [];
    return list
      .map((item, index) => (typeof item === "string"
        ? { src: item, alt: `${project.title} - image ${index + 1}` }
        : { src: (item && item.src) || "", alt: (item && item.alt) || `${project.title} - image ${index + 1}` }))
      .filter((item) => item.src);
  }

  function matchesFilter(project, filter) {
    if (filter === "all") return true;
    const cats = Array.isArray(project.categories) && project.categories.length ? project.categories : [project.category];
    return cats.indexOf(filter) !== -1;
  }

  function statusBadge(status) {
    if (status === "completed") return '<span class="project-status project-status-completed">Completed</span>';
    if (status === "in-progress") return '<span class="project-status project-status-progress">In Progress</span>';
    return "";
  }

  function projectCard(project) {
    const images = getProjectImages(project);
    const cover = images[0];
    const tags = (project.systems || []).slice(0, 4);
    return `
      <article class="project-card reveal">
        <div class="project-image">
          ${statusBadge(project.status)}
          ${cover ? `<img src="${escapeHtml(cover.src)}" alt="${escapeHtml(cover.alt)}" loading="lazy" width="600" height="400">` : ""}
        </div>
        <div class="project-body">
          <span class="project-role">${escapeHtml(project.subtitle || "")}</span>
          <h3>${escapeHtml(project.title)}</h3>
          ${project.location ? `<p class="project-location">${escapeHtml(project.location)}</p>` : ""}
          <div class="project-tags">
            ${tags.map((tag) => `<span class="project-tag">${escapeHtml(tag)}</span>`).join("")}
          </div>
          <button class="project-open" type="button" data-project-id="${escapeHtml(project.id)}">
            View project <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </article>
    `;
  }

  function renderProjects(filter) {
    if (!grid) return;
    currentFilter = filter || currentFilter;
    const filtered = projects.filter((project) => matchesFilter(project, currentFilter));
    const visible = showAllProjects ? filtered : filtered.slice(0, PROJECTS_INITIAL_LIMIT);
    grid.innerHTML = visible.map(projectCard).join("");

    if (projectsToggle) {
      const hasMore = filtered.length > PROJECTS_INITIAL_LIMIT;
      projectsToggle.hidden = !hasMore;
      projectsToggle.textContent = showAllProjects
        ? "Show Fewer Projects"
        : `View All Projects (${filtered.length})`;
    }

    grid.querySelectorAll(".project-open").forEach((button) => {
      button.addEventListener("click", () => openProject(button.dataset.projectId, button));
    });
    observeReveals(grid);
  }

  // ---------- Project modal + gallery ----------
  function updateGallery() {
    if (!modalImage || !currentImages.length) return;
    const count = currentImages.length;
    currentImageIndex = (currentImageIndex + count) % count;

    const selected = currentImages[currentImageIndex];
    modalImage.src = selected.src;
    modalImage.alt = selected.alt;

    const multiple = count > 1;
    if (modalPrev) modalPrev.hidden = !multiple;
    if (modalNext) modalNext.hidden = !multiple;
    if (modalImageCounter) {
      modalImageCounter.hidden = !multiple;
      modalImageCounter.textContent = `${currentImageIndex + 1} / ${count}`;
    }

    if (modalThumbnails) {
      modalThumbnails.querySelectorAll(".modal-thumbnail").forEach((thumb, index) => {
        const active = index === currentImageIndex;
        thumb.classList.toggle("active", active);
        thumb.setAttribute("aria-current", String(active));
      });
    }
  }

  function renderThumbnails() {
    if (!modalThumbnails) return;
    if (currentImages.length <= 1) {
      modalThumbnails.innerHTML = "";
      modalThumbnails.hidden = true;
      return;
    }
    modalThumbnails.hidden = false;
    modalThumbnails.innerHTML = currentImages.map((image, index) => `
      <button class="modal-thumbnail${index === 0 ? " active" : ""}" type="button" data-image-index="${index}" aria-label="View project image ${index + 1}">
        <img src="${escapeHtml(image.src)}" alt="" loading="lazy">
      </button>
    `).join("");
    modalThumbnails.querySelectorAll(".modal-thumbnail").forEach((thumb) => {
      thumb.addEventListener("click", () => {
        currentImageIndex = Number(thumb.dataset.imageIndex);
        updateGallery();
      });
    });
  }

  function openProject(id, trigger) {
    if (!modal) return;
    const project = projects.find((item) => item.id === id);
    if (!project) return;
    lastTrigger = trigger || null;

    currentImages = getProjectImages(project);
    currentImageIndex = 0;
    renderThumbnails();
    updateGallery();

    document.getElementById("modal-role").textContent = [project.role, project.subtitle].filter(Boolean).join(" | ");
    document.getElementById("modal-title").textContent = project.title;
    document.getElementById("modal-location").textContent = project.location || "";
    document.getElementById("modal-tags").innerHTML = (project.systems || [])
      .map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");
    document.getElementById("modal-scope").textContent = project.scope || "";
    document.getElementById("modal-responsibilities").innerHTML = (project.responsibilities || [])
      .map((item) => `<li>${escapeHtml(item)}</li>`).join("");

    modal.showModal();
    document.body.classList.add("modal-open");
    if (modalClose) modalClose.focus();
  }

  function closeProject() {
    if (!modal || !modal.open) return;
    modal.close();
  }

  // ---------- Certifications ----------
  function certificationCard(cert) {
    const inner = `
      ${cert.logo
        ? `<span class="cert-logo-wrap"><img src="${escapeHtml(cert.logo)}" alt="${escapeHtml(cert.issuer)} logo" loading="lazy" width="180" height="70"></span>`
        : `<span class="cert-badge" aria-hidden="true">${escapeHtml(cert.badge || "")}</span>`}
      <h3>${escapeHtml(cert.title)}</h3>
      <p>${escapeHtml(cert.issuer)}</p>
      ${cert.year ? `<time datetime="${escapeHtml(cert.year)}">${escapeHtml(cert.year)}</time>` : ""}
      ${cert.image ? '<span class="cert-card-hint">View certificate</span>' : ""}
    `;
    if (cert.image) {
      return `<button class="cert-card" type="button" data-certificate-id="${escapeHtml(cert.id)}" aria-label="View ${escapeHtml(cert.fullTitle)} certificate">${inner}</button>`;
    }
    return `<article class="cert-card">${inner}</article>`;
  }

  function renderCertifications() {
    if (!certificationGrid) return;
    certificationGrid.innerHTML = certifications.map(certificationCard).join("");
    certificationGrid.querySelectorAll("button.cert-card").forEach((button) => {
      button.addEventListener("click", () => openCertificate(button.dataset.certificateId));
    });
  }

  function openCertificate(id) {
    if (!certificateModal) return;
    const cert = certifications.find((item) => item.id === id);
    if (!cert || !cert.image) return;

    document.getElementById("certificate-modal-issuer").textContent = cert.issuer;
    document.getElementById("certificate-modal-title").textContent = cert.fullTitle;
    document.getElementById("certificate-modal-year").textContent = cert.year || "";
    const image = document.getElementById("certificate-modal-image");
    image.src = cert.image;
    image.alt = `${cert.fullTitle} certificate`;

    certificateModal.showModal();
    document.body.classList.add("modal-open");
    if (certificateModalClose) certificateModalClose.focus();
  }

  function closeCertificate() {
    if (!certificateModal || !certificateModal.open) return;
    certificateModal.close();
  }

  [modal, certificateModal].forEach((dialog) => {
    if (!dialog) return;
    dialog.addEventListener("close", () => {
      if (!document.querySelector("dialog[open]")) document.body.classList.remove("modal-open");
      if (dialog === modal && lastTrigger) lastTrigger.focus();
    });
  });

  // ---------- Events ----------
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-selected", String(active));
      });
      showAllProjects = false;
      renderProjects(button.dataset.filter || "all");
    });
  });

  if (projectsToggle) {
    projectsToggle.addEventListener("click", () => {
      showAllProjects = !showAllProjects;
      renderProjects(currentFilter);
      if (!showAllProjects) {
        const section = document.getElementById("projects");
        if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  if (modalPrev) modalPrev.addEventListener("click", () => { currentImageIndex -= 1; updateGallery(); });
  if (modalNext) modalNext.addEventListener("click", () => { currentImageIndex += 1; updateGallery(); });
  if (modalClose) modalClose.addEventListener("click", closeProject);
  if (modal) modal.addEventListener("click", (event) => { if (event.target === modal) closeProject(); });
  if (certificateModalClose) certificateModalClose.addEventListener("click", closeCertificate);
  if (certificateModal) certificateModal.addEventListener("click", (event) => { if (event.target === certificateModal) closeCertificate(); });

  document.addEventListener("keydown", (event) => {
    if (!modal || !modal.open || currentImages.length <= 1) return;
    if (event.key === "ArrowLeft") { event.preventDefault(); currentImageIndex -= 1; updateGallery(); }
    if (event.key === "ArrowRight") { event.preventDefault(); currentImageIndex += 1; updateGallery(); }
  });

  // ---------- Navigation ----------
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const expanded = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("open", !expanded);
    });
  }
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (nav) nav.classList.remove("open");
      if (menuButton) menuButton.setAttribute("aria-expanded", "false");
    });
  });

  function updateHeader() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 14);
  }

  function updateActiveNav() {
    const offset = window.scrollY + 130;
    let current = "";
    sections.forEach((section) => { if (section.offsetTop <= offset) current = section.id; });
    navLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${current}`));
  }

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      updateHeader();
      updateActiveNav();
      ticking = false;
    });
  }, { passive: true });

  // ---------- Contact form: opens the visitor's email app ----------
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(contactForm);
      const name = String(data.get("name") || "").trim();
      const email = String(data.get("email") || "").trim();
      const subject = String(data.get("subject") || "Portfolio inquiry").trim();
      const message = String(data.get("message") || "").trim();
      const body = [`Name: ${name}`, `Email: ${email}`, "", message].join("\n");
      window.location.href = `mailto:marinagmal2201@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  const year = document.getElementById("current-year");
  if (year) year.textContent = String(new Date().getFullYear());

  renderProjects("all");
  renderCertifications();
  observeReveals(document);
  updateHeader();
  updateActiveNav();
})();

// Hero NET background (Vanta). Skipped on mobile, with reduced motion, or if the CDN scripts did not load.
(() => {
  const hero = document.querySelector(".hero");
  const background = document.getElementById("hero-net");
  const mobile = window.matchMedia("(max-width: 900px)").matches;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!hero || !background || mobile || reducedMotion || !window.VANTA || !window.VANTA.NET || !window.THREE) return;

  try {
    window.heroNetEffect = window.VANTA.NET({
      el: background,
      THREE: window.THREE,
      mouseControls: true,
      touchControls: false,
      gyroControls: false,
      minHeight: 200,
      minWidth: 200,
      scale: 1,
      scaleMobile: 1,
      color: 0xe5484d,
      backgroundColor: 0x0b1118,
      points: 6,
      maxDistance: 18,
      spacing: 22,
      showDots: true
    });
    hero.classList.add("net-ready");
  } catch (error) {
    console.warn("NET background could not start.", error);
  }
})();
