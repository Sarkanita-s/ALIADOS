/**
 * ===================================================================
 * ALIADOS - CONTROLADOR INTERACTIVO DEL PROTOTIPO MVP
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // Inicialización del estado
  let state = {
    role: ALIADOS_DATA.currentRole,
    kid: ALIADOS_DATA.currentKid,
    activeView: 'home',
    activeManualTab: 'habits',
    data: JSON.parse(JSON.stringify(ALIADOS_DATA))
  };

  // Referencias a elementos del DOM
  const dom = {
    // Reloj de barra de estado
    statusClock: document.getElementById('status-time-display'),
    
    // Controles externos
    themeSelect: document.getElementById('theme-switcher-select'),
    kidHeaderSelector: document.getElementById('kid-header-btn'),
    roleHeaderBadge: document.getElementById('role-header-badge'),
    roleHeaderLabel: document.getElementById('role-header-label'),
    roleButtons: document.querySelectorAll('.role-btn'),
    
    // Contenedores de vistas
    views: document.querySelectorAll('.view-section'),
    navItems: document.querySelectorAll('.nav-item'),
    
    // Sub-tabs de manual
    manualTabs: document.querySelectorAll('.manual-tab-btn'),
    manualPanels: document.querySelectorAll('.manual-panel'),
    
    // Header interno
    headerKidAvatar: document.getElementById('header-kid-avatar'),
    headerKidName: document.getElementById('header-kid-name'),
    headerKidAge: document.getElementById('header-kid-age'),
    
    // Modales
    modalBackdrop: document.getElementById('modal-backdrop'),
    modalTitle: document.getElementById('modal-title'),
    modalBody: document.getElementById('modal-body'),
    modalCloseBtn: document.getElementById('modal-close-btn'),
    modalConfirmBtn: document.getElementById('modal-confirm-btn'),
    
    // Botones de salud y SOS
    btnExportHealth: document.getElementById('btn-export-health'),
    btnSosAlert: document.getElementById('btn-sos-alert'),
    btnQuickSos: document.getElementById('quick-sos-btn'),
    
    // Toast
    toast: document.getElementById('app-toast'),
    toastText: document.getElementById('toast-text')
  };

  /* ===================================================================
   * RELOJ EN VIVO
   * =================================================================== */
  function updateLiveClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    if (dom.statusClock) {
      dom.statusClock.textContent = `${hours}:${minutes}`;
    }
  }
  updateLiveClock();
  setInterval(updateLiveClock, 10000);

  /* ===================================================================
   * SISTEMA DE NOTIFICACIONES TOAST EN PANTALLA
   * =================================================================== */
  let toastTimer = null;
  function showToast(message, icon = '✨') {
    if (!dom.toast) return;
    clearTimeout(toastTimer);
    dom.toastText.textContent = `${icon} ${message}`;
    dom.toast.classList.add('show');
    toastTimer = setTimeout(() => {
      dom.toast.classList.remove('show');
    }, 2800);
  }

  /* ===================================================================
   * CAMBIO DE TEMAS (SISTEMA DE COLORES FÁCIL)
   * =================================================================== */
  if (dom.themeSelect) {
    dom.themeSelect.addEventListener('change', (e) => {
      const selectedTheme = e.target.value;
      if (selectedTheme === 'default') {
        document.body.removeAttribute('data-theme');
        showToast('Tema cambiado a: Cálido Crianza 🧡');
      } else {
        document.body.setAttribute('data-theme', selectedTheme);
        const themeNames = {
          sereno: 'Azul Sereno & Esmeralda 🌊',
          lavanda: 'Lavanda & Afecto 🌸',
          solar: 'Solar & Terracota ☀️'
        };
        showToast(`Tema cambiado a: ${themeNames[selectedTheme] || selectedTheme}`);
      }
    });
  }

  /* ===================================================================
   * CAMBIO DE ROLES (MAMÁ / PAPÁ / ABUELA)
   * =================================================================== */
  function setRole(roleId) {
    if (!state.data.roles[roleId]) return;
    state.role = roleId;
    const roleConfig = state.data.roles[roleId];

    // Actualizar botones de la barra lateral
    dom.roleButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.role === roleId);
    });

    // Actualizar badge en la app
    if (dom.roleHeaderLabel && dom.roleHeaderBadge) {
      dom.roleHeaderLabel.textContent = roleConfig.badgeTag;
      dom.roleHeaderBadge.className = `role-badge-pill ${roleConfig.isAdmin ? 'role-badge-admin' : 'role-badge-guest'}`;
    }

    // Adaptar la interfaz a los permisos del rol
    updateRoleSpecificUI();

    showToast(`Perfil activo: ${roleConfig.name} (${roleConfig.badgeTag})`, roleConfig.avatar);
  }

  function updateRoleSpecificUI() {
    const isAbuela = state.role === 'abuela';
    
    // Indicador o restricciones en la vista médica
    const editTallaBtns = document.querySelectorAll('.btn-edit-talla');
    editTallaBtns.forEach(btn => {
      btn.style.display = isAbuela ? 'none' : 'inline-block';
    });

    const addEventBtn = document.getElementById('btn-add-event');
    if (addEventBtn) {
      addEventBtn.style.display = isAbuela ? 'none' : 'flex';
    }

    // Re-renderizar listas dependientes del rol
    renderEvents();
  }

  // Event Listeners para cambio de rol
  dom.roleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      setRole(btn.dataset.role);
    });
  });

  /* ===================================================================
   * CAMBIO DE MENOR ACTIVO (MATEO / SOFÍA)
   * =================================================================== */
  function setKid(kidId) {
    if (!state.data.children[kidId]) return;
    state.kid = kidId;
    renderCurrentKid();
    showToast(`Mostrando información de: ${state.data.children[kidId].name}`, state.data.children[kidId].avatarEmoji);
  }

  if (dom.kidHeaderSelector) {
    dom.kidHeaderSelector.addEventListener('click', () => {
      const nextKid = state.kid === 'mateo' ? 'sofia' : 'mateo';
      setKid(nextKid);
    });
  }

  /* ===================================================================
   * NAVEGACIÓN ENTRE PANTALLAS (BOTTOM NAV)
   * =================================================================== */
  function switchView(viewId) {
    state.activeView = viewId;

    // Actualizar pestañas activas
    dom.navItems.forEach(item => {
      const isActive = item.dataset.target === viewId;
      item.classList.toggle('active', isActive);
    });

    // Cambiar la vista visible
    dom.views.forEach(view => {
      const isTarget = view.id === `view-${viewId}`;
      view.classList.toggle('active', isTarget);
      if (isTarget) {
        view.classList.remove('anim-fade-in');
        void view.offsetWidth; // Forzar reflow para re-ejecutar animación
        view.classList.add('anim-fade-in');
      }
    });

    // Resetear scroll arriba
    const content = document.querySelector('.app-content');
    if (content) content.scrollTop = 0;
  }

  dom.navItems.forEach(item => {
    item.addEventListener('click', () => {
      switchView(item.dataset.target);
    });
  });

  /* ===================================================================
   * SUB-PESTAÑAS DEL MANUAL DEL NIÑO
   * =================================================================== */
  dom.manualTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.dataset.tab;
      dom.manualTabs.forEach(t => t.classList.toggle('active', t === tab));
      dom.manualPanels.forEach(panel => {
        panel.classList.toggle('active', panel.id === `manual-panel-${targetTab}`);
      });
    });
  });

  /* ===================================================================
   * RENDERIZADO GENERAL DEL MENOR
   * =================================================================== */
  function renderCurrentKid() {
    const kid = state.data.children[state.kid];
    if (!kid) return;

    // Header interno
    if (dom.headerKidAvatar) dom.headerKidAvatar.textContent = kid.avatarEmoji;
    if (dom.headerKidName) dom.headerKidName.innerHTML = `${kid.name} <span style="font-size: 0.65rem; opacity: 0.7;">▼</span>`;
    if (dom.headerKidAge) dom.headerKidAge.textContent = `${kid.age} años`;

    // 1. INICIO
    const custodyTitle = document.getElementById('custody-title-display');
    const custodyDetails = document.getElementById('custody-details-display');
    const noteText = document.getElementById('parenting-note-text');
    const noteAuthor = document.getElementById('parenting-note-author');

    if (custodyTitle) custodyTitle.textContent = kid.custodyCurrent;
    if (custodyDetails) custodyDetails.textContent = kid.custodyDetails;
    if (noteText) noteText.textContent = kid.parentingNote;
    if (noteAuthor) noteAuthor.textContent = kid.parentingAuthor;

    // Medicamentos en Inicio
    renderHomeMedAlert(kid);

    // 2. MANUAL DEL NIÑO
    renderManualSection(kid);

    // 3. SALUD & SOS
    renderHealthSection(kid);

    // 4. AGENDA
    renderEvents();

    // 5. WISHLIST
    renderWishlist();
  }

  /* ===================================================================
   * RENDERIZADO: MEDICAMENTO EN INICIO
   * =================================================================== */
  function renderHomeMedAlert(kid) {
    const medContainer = document.getElementById('home-med-card-container');
    if (!medContainer) return;

    const activeMed = kid.health.medications.find(m => m.checkedToday !== undefined);
    if (!activeMed) {
      medContainer.innerHTML = `
        <div class="card" style="margin-bottom: 14px; text-align: center; padding: 12px; color: var(--text-muted); font-size: 0.8rem;">
          ✅ Sin medicamentos programados para hoy
        </div>
      `;
      return;
    }

    medContainer.innerHTML = `
      <div class="med-alert-card anim-scale-up">
        <div class="med-alert-info">
          <div class="med-icon-pill">💊</div>
          <div>
            <div class="med-name-text">${activeMed.name}</div>
            <div class="med-time-text">Dosis: ${activeMed.dose} • Próx: ${activeMed.alarmTime}</div>
          </div>
        </div>
        <button class="btn-check-med ${activeMed.checkedToday ? 'checked' : ''}" id="btn-toggle-med">
          ${activeMed.checkedToday ? 'Tomado ✔️' : 'Marcar ⏰'}
        </button>
      </div>
    `;

    const btnToggle = document.getElementById('btn-toggle-med');
    if (btnToggle) {
      btnToggle.addEventListener('click', () => {
        activeMed.checkedToday = !activeMed.checkedToday;
        renderHomeMedAlert(kid);
        showToast(
          activeMed.checkedToday ? 'Dosis registrada con éxito para ambos padres 👏' : 'Dosis desmarcada',
          '💊'
        );
      });
    }
  }

  /* ===================================================================
   * RENDERIZADO: MANUAL DEL NIÑO
   * =================================================================== */
  function renderManualSection(kid) {
    // Comidas que ama
    const favFoodsList = document.getElementById('fav-foods-list');
    if (favFoodsList) {
      favFoodsList.innerHTML = kid.habits.favoriteFoods.map(f => `<li>• ${f}</li>`).join('');
    }

    // Comidas que no
    const disFoodsList = document.getElementById('dislike-foods-list');
    if (disFoodsList) {
      disFoodsList.innerHTML = kid.habits.dislikedFoods.map(f => `<li>• ${f}</li>`).join('');
    }

    // Ritual dormir
    const sleepRitual = document.getElementById('bedtime-ritual-desc');
    if (sleepRitual) sleepRitual.textContent = kid.habits.bedtimeRitual;

    // Música favorita
    const musicDesc = document.getElementById('music-ritual-desc');
    if (musicDesc) musicDesc.textContent = kid.habits.favoriteMusic;

    // Fobias y miedos
    const fearsContainer = document.getElementById('fears-list-container');
    if (fearsContainer) {
      fearsContainer.innerHTML = kid.fears.map(fear => `
        <div class="habit-item">
          <div class="habit-icon">🛡️</div>
          <div class="habit-content">
            <h4>${fear.title}</h4>
            <p>${fear.description}</p>
            <div class="how-to-soothe">
              💡 <strong>Cómo calmarlo:</strong> ${fear.sootheAdvice}
            </div>
          </div>
        </div>
      `).join('');
    }

    // Hobbies
    const hobbiesContainer = document.getElementById('hobbies-list-container');
    if (hobbiesContainer) {
      hobbiesContainer.innerHTML = kid.hobbies.map(hobby => `
        <div class="habit-item">
          <div class="habit-icon">${hobby.icon}</div>
          <div class="habit-content">
            <h4>${hobby.title}</h4>
            <p>${hobby.desc}</p>
          </div>
        </div>
      `).join('');
    }

    // Tallas
    const shoeVal = document.getElementById('size-shoe-val');
    const shoeUpd = document.getElementById('size-shoe-upd');
    const shirtVal = document.getElementById('size-shirt-val');
    const shirtUpd = document.getElementById('size-shirt-upd');
    const pantsVal = document.getElementById('size-pants-val');
    const pantsUpd = document.getElementById('size-pants-upd');

    if (shoeVal && kid.sizes.shoes) shoeVal.textContent = kid.sizes.shoes.val;
    if (shoeUpd && kid.sizes.shoes) shoeUpd.textContent = kid.sizes.shoes.updated;
    if (shirtVal && kid.sizes.shirt) shirtVal.textContent = kid.sizes.shirt.val;
    if (shirtUpd && kid.sizes.shirt) shirtUpd.textContent = kid.sizes.shirt.updated;
    if (pantsVal && kid.sizes.pants) pantsVal.textContent = kid.sizes.pants.val;
    if (pantsUpd && kid.sizes.pants) pantsUpd.textContent = kid.sizes.pants.updated;
  }

  /* ===================================================================
   * RENDERIZADO: SALUD & SOS
   * =================================================================== */
  function renderHealthSection(kid) {
    const bloodVal = document.getElementById('blood-val-display');
    const insuranceVal = document.getElementById('insurance-val-display');
    const allergiesContainer = document.getElementById('allergies-container');
    const medListContainer = document.getElementById('health-meds-list');
    const docName = document.getElementById('doctor-name-display');
    const docClinic = document.getElementById('doctor-clinic-display');

    if (bloodVal) bloodVal.textContent = kid.health.bloodType;
    if (insuranceVal) insuranceVal.textContent = kid.health.insurance;

    if (allergiesContainer) {
      allergiesContainer.innerHTML = kid.health.allergies.map(a => `
        <span class="allergy-pill">
          ⚠️ ${a.name} <span style="font-size: 0.65rem; opacity: 0.85;">(${a.severity})</span>
        </span>
      `).join('');
    }

    if (medListContainer) {
      if (kid.health.medications.length === 0) {
        medListContainer.innerHTML = `<div style="font-size: 0.78rem; color: var(--text-muted);">No tiene medicamentos activos.</div>`;
      } else {
        medListContainer.innerHTML = kid.health.medications.map(med => `
          <div class="habit-item">
            <div class="habit-icon">💊</div>
            <div class="habit-content">
              <h4>${med.name}</h4>
              <p><strong>Dosis:</strong> ${med.dose}</p>
              <p style="font-size: 0.72rem; color: var(--text-muted); margin-top: 2px;">
                Horarios: ${med.times} • Término: ${med.finishDate}
              </p>
            </div>
          </div>
        `).join('');
      }
    }

    if (docName && kid.health.doctor) docName.textContent = kid.health.doctor.name;
    if (docClinic && kid.health.doctor) docClinic.textContent = `${kid.health.doctor.role} • ${kid.health.doctor.clinic}`;
  }

  /* ===================================================================
   * RENDERIZADO: AGENDA COMPARTIDA (RSVP PARA ABUELOS)
   * =================================================================== */
  function renderEvents() {
    const container = document.getElementById('events-list-container');
    if (!container) return;

    const events = state.data.events.filter(e => e.kidId === state.kid);
    if (events.length === 0) {
      container.innerHTML = `<div class="card" style="text-align: center; color: var(--text-muted); font-size: 0.82rem;">No hay eventos agendados para este menor.</div>`;
      return;
    }

    const isAbuela = state.role === 'abuela';

    container.innerHTML = events.map(ev => {
      const attendeesList = [...ev.attendees];
      if (ev.abuelaConfirmed && !attendeesList.includes('Abuela Marta')) {
        attendeesList.push('Abuela Marta');
      }

      return `
        <div class="event-card">
          <div class="event-top-bar">
            <span class="event-category-pill cat-${ev.category}">${ev.catLabel}</span>
            <span class="event-datetime">📅 ${ev.date}</span>
          </div>
          <div class="event-title">${ev.title}</div>
          <div class="event-location">📍 ${ev.location}</div>
          <p style="font-size: 0.76rem; color: var(--text-secondary); margin-bottom: 10px;">${ev.description}</p>
          
          <div class="rsvp-section">
            <div style="display: flex; align-items: center;">
              <div class="attendees-avatars">
                ${attendeesList.map(a => `<div class="attendee-pill" title="${a}">${a.includes('Mamá') ? '👩' : (a.includes('Papá') ? '👨' : (a.includes('Abuela') ? '👵' : '👤'))}</div>`).join('')}
              </div>
              <span class="attendee-count-text">${attendeesList.length} confirmados</span>
            </div>
            
            ${isAbuela ? `
              <button class="btn-rsvp-action ${ev.abuelaConfirmed ? 'confirmed' : ''}" data-event-id="${ev.id}">
                ${ev.abuelaConfirmed ? '¡Iré! ❤️' : 'Asistiré 👏'}
              </button>
            ` : `
              <span style="font-size: 0.72rem; color: var(--color-health); font-weight: 700;">
                ✓ Coordinado
              </span>
            `}
          </div>
        </div>
      `;
    }).join('');

    // Handlers de botones RSVP
    container.querySelectorAll('.btn-rsvp-action').forEach(btn => {
      btn.addEventListener('click', () => {
        const evId = btn.dataset.eventId;
        const targetEv = state.data.events.find(e => e.id === evId);
        if (targetEv) {
          targetEv.abuelaConfirmed = !targetEv.abuelaConfirmed;
          renderEvents();
          showToast(
            targetEv.abuelaConfirmed 
              ? '¡Hermoso! Los padres recibieron tu confirmación de que irás ❤️' 
              : 'Se canceló tu confirmación de asistencia',
            '👵'
          );
        }
      });
    });
  }

  /* ===================================================================
   * RENDERIZADO: WISHLIST / REGALOS
   * =================================================================== */
  function renderWishlist() {
    const container = document.getElementById('wishlist-items-container');
    if (!container) return;

    const items = state.data.wishlist.filter(w => w.kidId === state.kid);
    if (items.length === 0) {
      container.innerHTML = `<div class="card" style="text-align: center; color: var(--text-muted); font-size: 0.82rem;">Lista vacía.</div>`;
      return;
    }

    container.innerHTML = items.map(w => `
      <div class="wish-item-card">
        <div class="wish-item-left">
          <div class="wish-item-icon">${w.icon}</div>
          <div>
            <div class="wish-item-title">${w.title}</div>
            <div class="wish-item-sub">${w.category} • Ref: ${w.priceApprox}</div>
            <span class="wish-status-badge ${w.status === 'reserved' ? 'status-reserved' : 'status-available'}">
              ${w.status === 'reserved' ? `🔒 ${w.reservedBy}` : '✨ Disponible para regalar'}
            </span>
          </div>
        </div>
        
        <div>
          ${w.status === 'available' ? `
            <button class="btn-claim-gift" data-wish-id="${w.id}">
              Apartar 🎁
            </button>
          ` : `
            <span style="font-size: 0.7rem; color: var(--text-muted); font-weight: 600;">Apartado</span>
          `}
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.btn-claim-gift').forEach(btn => {
      btn.addEventListener('click', () => {
        const wishId = btn.dataset.wishId;
        const targetWish = state.data.wishlist.find(w => w.id === wishId);
        if (targetWish) {
          const roleConfig = state.data.roles[state.role];
          targetWish.status = 'reserved';
          targetWish.reservedBy = `${roleConfig.title} 🎁`;
          renderWishlist();
          showToast(`¡Regalo reservado para ${targetWish.title}! La familia ya no lo duplicará`, '🎁');
        }
      });
    });
  }

  /* ===================================================================
   * MODALES: FICHA DE URGENCIAS Y ALERTA SOS
   * =================================================================== */
  function openModal(title, contentHtml, confirmText = 'Aceptar', onConfirm = null) {
    dom.modalTitle.textContent = title;
    dom.modalBody.innerHTML = contentHtml;
    dom.modalConfirmBtn.textContent = confirmText;
    dom.modalBackdrop.classList.add('active');

    dom.modalConfirmBtn.onclick = () => {
      if (onConfirm) onConfirm();
      closeModal();
    };
  }

  function closeModal() {
    dom.modalBackdrop.classList.remove('active');
  }

  dom.modalCloseBtn.addEventListener('click', closeModal);
  dom.modalBackdrop.addEventListener('click', (e) => {
    if (e.target === dom.modalBackdrop) closeModal();
  });

  // Modal Ficha de Urgencias Exportable
  if (dom.btnExportHealth) {
    dom.btnExportHealth.addEventListener('click', () => {
      const kid = state.data.children[state.kid];
      const html = `
        <div style="background: #F8FAFC; border: 1px solid #CBD5E1; border-radius: 8px; padding: 12px; margin-bottom: 12px;">
          <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #E2E8F0; padding-bottom: 6px; margin-bottom: 8px;">
            <strong style="color: #0F172A; font-size: 0.95rem;">${kid.fullName}</strong>
            <span style="color: #DC2626; font-weight: 800;">GRUPO ${kid.health.bloodType}</span>
          </div>
          <div style="margin-bottom: 6px; font-size: 0.78rem;">
            <strong>Previsión:</strong> ${kid.health.insurance}
          </div>
          <div style="margin-bottom: 6px; font-size: 0.78rem; color: #DC2626;">
            <strong>ALERGIAS SEVERAS:</strong> ${kid.health.allergies.map(a => `${a.name} (${a.severity})`).join(', ')}
          </div>
          <div style="margin-bottom: 6px; font-size: 0.78rem;">
            <strong>Medicamentos Activos:</strong> ${kid.health.medications.length > 0 ? kid.health.medications.map(m => `${m.name} - ${m.dose}`).join('; ') : 'Ninguno'}
          </div>
          <div style="font-size: 0.78rem; border-top: 1px dashed #CBD5E1; padding-top: 6px; margin-top: 6px;">
            <strong>Contactos de Urgencia:</strong><br>
            ${kid.health.emergencyContacts.map(c => `• ${c.name}: ${c.phone}`).join('<br>')}
          </div>
        </div>
        <p style="font-size: 0.74rem; color: #64748B;">
          Documento digital generado para atención en Box de Urgencias o Clínicas de San Miguel bajo convenio CAJ.
        </p>
      `;
      openModal('📋 Ficha Médica de Urgencia', html, 'Imprimir / Guardar PDF', () => {
        showToast('Generando archivo PDF para médico de turno...', '🖨️');
      });
    });
  }

  // Modal Alerta SOS Pánico
  function triggerSosModal() {
    const kid = state.data.children[state.kid];
    const html = `
      <div style="text-align: center; padding: 8px 0;">
        <div style="font-size: 3rem; margin-bottom: 8px;">🚨</div>
        <h3 style="color: #DC2626; font-family: var(--font-heading); margin-bottom: 6px;">
          ¿Emitir Alarma de Emergencia?
        </h3>
        <p style="font-size: 0.8rem; color: #475569; margin-bottom: 12px;">
          Esta acción enviará una notificación prioritaria con sonido estridente a <strong>ambos padres (${kid.health.emergencyContacts.map(c => c.name).join(' y ')})</strong> con la ubicación GPS del menor.
        </p>
        <div style="background: #FEF2F2; border: 1px solid #FECACA; padding: 10px; border-radius: 8px; font-size: 0.75rem; color: #991B1B;">
          <strong>Teléfonos de Emergencia Directos:</strong><br>
          🚑 Ambulancia SAMU: 131 &nbsp;|&nbsp; 🚓 Carabineros: 133
        </div>
      </div>
    `;
    openModal('🚨 ALERTA SOS', html, 'ACTIVAR ALARMA SOS', () => {
      showToast('¡Alerta de emergencia emitida a ambos padres y SAMU 131!', '🚨');
    });
  }

  if (dom.btnSosAlert) dom.btnSosAlert.addEventListener('click', triggerSosModal);
  if (dom.btnQuickSos) dom.btnQuickSos.addEventListener('click', triggerSosModal);

  // Modal para Agregar Evento (Rol Padres / Admin)
  const addEventBtn = document.getElementById('btn-add-event');
  if (addEventBtn) {
    addEventBtn.addEventListener('click', () => {
      const html = `
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <div>
            <label style="font-size: 0.75rem; font-weight: 700; color: #475569;">Título del Evento:</label>
            <input type="text" id="input-new-event-title" value="Reunión de Apoderados 📚" style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid #CBD5E1; font-size: 0.8rem; margin-top: 4px;" />
          </div>
          <div>
            <label style="font-size: 0.75rem; font-weight: 700; color: #475569;">Fecha y Hora:</label>
            <input type="text" id="input-new-event-date" value="Viernes 26 Sept • 19:00 hrs" style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid #CBD5E1; font-size: 0.8rem; margin-top: 4px;" />
          </div>
          <div>
            <label style="font-size: 0.75rem; font-weight: 700; color: #475569;">Lugar:</label>
            <input type="text" id="input-new-event-loc" value="Sala 2B • Colegio San Bernardo" style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid #CBD5E1; font-size: 0.8rem; margin-top: 4px;" />
          </div>
          <p style="font-size: 0.72rem; color: #64748B; margin: 0;">
            Se notificará automáticamente al otro padre y a los abuelos para que confirmen asistencia.
          </p>
        </div>
      `;
      openModal('📅 Nuevo Evento Compartido', html, 'Guardar Evento', () => {
        const titleInput = document.getElementById('input-new-event-title');
        const dateInput = document.getElementById('input-new-event-date');
        const locInput = document.getElementById('input-new-event-loc');
        
        const newEv = {
          id: `ev-${Date.now()}`,
          kidId: state.kid,
          title: titleInput ? titleInput.value : 'Nuevo Evento',
          category: 'school',
          catLabel: 'Escuela',
          date: dateInput ? dateInput.value : 'Próximamente',
          location: locInput ? locInput.value : 'Por definir',
          description: 'Evento coordinado por los padres.',
          attendees: [state.data.roles[state.role].name],
          abuelaConfirmed: false
        };

        state.data.events.unshift(newEv);
        renderEvents();
        showToast('¡Evento agregado y sincronizado con la familia!', '📅');
      });
    });
  }

  // Modal para Actualizar Tallas (Rol Padres)
  const editTallaBtns = document.querySelectorAll('.btn-edit-talla');
  editTallaBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const kid = state.data.children[state.kid];
      const html = `
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <div>
            <label style="font-size: 0.75rem; font-weight: 700; color: #475569;">Talla Calzado (Zapatillas):</label>
            <input type="text" id="input-edit-shoe" value="${kid.sizes.shoes.val}" style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid #CBD5E1; font-size: 0.8rem; margin-top: 4px;" />
          </div>
          <div>
            <label style="font-size: 0.75rem; font-weight: 700; color: #475569;">Talla Ropa Superior (Polera/Buzo):</label>
            <input type="text" id="input-edit-shirt" value="${kid.sizes.shirt.val}" style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid #CBD5E1; font-size: 0.8rem; margin-top: 4px;" />
          </div>
          <p style="font-size: 0.72rem; color: #64748B; margin: 0;">
            Al guardar, los abuelos y tíos verán la talla actualizada cuando vayan a comprar ropa o calzado.
          </p>
        </div>
      `;
      openModal('📏 Actualizar Tallas de Ropa', html, 'Actualizar Tallas', () => {
        const shoeInp = document.getElementById('input-edit-shoe');
        const shirtInp = document.getElementById('input-edit-shirt');
        if (shoeInp) {
          kid.sizes.shoes.val = shoeInp.value;
          kid.sizes.shoes.updated = 'Actualizado hoy';
        }
        if (shirtInp) {
          kid.sizes.shirt.val = shirtInp.value;
          kid.sizes.shirt.updated = 'Actualizado hoy';
        }
        renderManualSection(kid);
        showToast('¡Tallas actualizadas y notificadas a la familia!', '👟');
      });
    });
  });

  // Inicializar render
  renderCurrentKid();
  updateRoleSpecificUI();
});
