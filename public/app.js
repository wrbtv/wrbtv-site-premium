(() => {
  'use strict';

  const WHATSAPP_NUMBER = '5588996484494';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const money = value => Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  // WhatsApp hand-off: the form data remains in the visitor's browser only.
  function openWhatsApp(message) {
    const url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
    const opened = window.open(url, '_blank');
    if (opened) opened.opener = null;
    else window.location.href = url;
  }

  // Header and responsive menu.
  const menuToggle = $('#menuToggle');
  const navLinks = $('#navLinks');
  function closeMenu() {
    navLinks?.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Abrir menu');
  }
  menuToggle?.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  });
  $$('#navLinks a').forEach(link => link.addEventListener('click', closeMenu));

  // Ambient cinematic background carousel.
  const bgSlides = $$('.hero-backdrop-slide');
  const bgSources = ['/assets/hero-world.webp', '/assets/hero-films.webp', '/assets/hero-sports.webp'];
  let sceneIndex = 0;
  let sceneTimer = 0;
  let scenePaused = false;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  bgSlides.forEach((slide, index) => {
    if (bgSources[index]) slide.style.backgroundImage = 'url("' + bgSources[index] + '")';
  });
  function renderScene(index) {
    sceneIndex = (index + bgSlides.length) % bgSlides.length;
    bgSlides.forEach((slide, i) => slide.classList.toggle('is-active', i === sceneIndex));
  }
  function stopSceneCarousel() {
    if (sceneTimer) window.clearInterval(sceneTimer);
    sceneTimer = 0;
  }
  function startSceneCarousel() {
    stopSceneCarousel();
    if (!reduceMotion && !scenePaused && !document.hidden) {
      sceneTimer = window.setInterval(() => renderScene(sceneIndex + 1), 7200);
    }
  }
  renderScene(0);
  startSceneCarousel();

  // Real horizontal content carousel under the streaming-brand row.
  const posterViewport = $('#posterCarousel');
  const posterTrack = $('#posterTrack');
  const posterPrev = $('#shelfPrev');
  const posterNext = $('#shelfNext');
  const progressBar = $('#shelfProgress');
  let posterTimer = 0;
  let posterPaused = false;
  let movingPoster = false;
  const posterDelay = 5200;

  function posterStep() {
    if (!posterTrack) return 0;
    const first = posterTrack.firstElementChild;
    if (!first) return 0;
    const styles = window.getComputedStyle(posterTrack);
    return first.getBoundingClientRect().width + (Number.parseFloat(styles.columnGap || styles.gap) || 0);
  }
  function resetProgress() {
    if (!progressBar) return;
    progressBar.style.transition = 'none';
    progressBar.style.width = '0%';
    void progressBar.offsetWidth;
    if (!reduceMotion && !posterPaused && !document.hidden) {
      progressBar.style.transition = 'width ' + posterDelay + 'ms linear';
      progressBar.style.width = '100%';
    }
  }
  function movePoster(direction = 1) {
    if (!posterTrack || movingPoster || posterTrack.children.length < 2) return;
    movingPoster = true;
    const step = posterStep();
    posterTrack.style.transition = reduceMotion ? 'none' : 'transform 420ms cubic-bezier(.22,.68,0,1)';
    if (direction > 0) {
      posterTrack.style.transform = 'translate3d(' + (-step) + 'px,0,0)';
      const finish = () => {
        posterTrack.removeEventListener('transitionend', finish);
        posterTrack.appendChild(posterTrack.firstElementChild);
        posterTrack.style.transition = 'none';
        posterTrack.style.transform = 'translate3d(0,0,0)';
        void posterTrack.offsetWidth;
        movingPoster = false;
        resetProgress();
      };
      if (reduceMotion) finish();
      else posterTrack.addEventListener('transitionend', finish, { once: true });
    } else {
      posterTrack.style.transition = 'none';
      posterTrack.insertBefore(posterTrack.lastElementChild, posterTrack.firstElementChild);
      posterTrack.style.transform = 'translate3d(' + (-step) + 'px,0,0)';
      void posterTrack.offsetWidth;
      posterTrack.style.transition = reduceMotion ? 'none' : 'transform 420ms cubic-bezier(.22,.68,0,1)';
      posterTrack.style.transform = 'translate3d(0,0,0)';
      const finish = () => {
        posterTrack.removeEventListener('transitionend', finish);
        movingPoster = false;
        resetProgress();
      };
      if (reduceMotion) finish();
      else posterTrack.addEventListener('transitionend', finish, { once: true });
    }
  }
  function stopPosterCarousel() {
    if (posterTimer) window.clearInterval(posterTimer);
    posterTimer = 0;
    if (progressBar) {
      progressBar.style.transition = 'none';
      progressBar.style.width = '0%';
    }
  }
  function startPosterCarousel() {
    stopPosterCarousel();
    if (!reduceMotion && !posterPaused && !document.hidden) {
      resetProgress();
      posterTimer = window.setInterval(() => movePoster(1), posterDelay);
    }
  }
  posterPrev?.addEventListener('click', () => { movePoster(-1); startPosterCarousel(); });
  posterNext?.addEventListener('click', () => { movePoster(1); startPosterCarousel(); });
  posterViewport?.addEventListener('mouseenter', () => { posterPaused = true; stopPosterCarousel(); });
  posterViewport?.addEventListener('mouseleave', () => { posterPaused = false; startPosterCarousel(); });
  posterViewport?.addEventListener('focusin', () => { posterPaused = true; stopPosterCarousel(); });
  posterViewport?.addEventListener('focusout', event => {
    if (!posterViewport.contains(event.relatedTarget)) {
      posterPaused = false;
      startPosterCarousel();
    }
  });
  document.addEventListener('visibilitychange', () => {
    startSceneCarousel();
    startPosterCarousel();
  });
  startPosterCarousel();

  // Reusable accessible modal management for trial/subscription and reseller.
  const requestModal = $('#requestModal');
  const resellerModal = $('#resellerModal');
  const requestForm = $('#requestForm');
  const submitRequest = $('#submitRequest');
  const selectedPlan = $('#selectedPlan');
  let requestMode = 'trial';
  let planName = '';
  let planPrice = 0;
  let previousFocus = null;
  let activeModal = null;

  function openDialog(dialog, focusSelector) {
    if (!dialog) return;
    previousFocus = document.activeElement;
    if (activeModal && activeModal !== dialog) activeModal.hidden = true;
    activeModal = dialog;
    dialog.hidden = false;
    document.body.classList.add('modal-open');
    window.setTimeout(() => $(focusSelector, dialog)?.focus(), 40);
  }
  function closeDialog(dialog) {
    if (!dialog || dialog.hidden) return;
    dialog.hidden = true;
    if (activeModal === dialog) activeModal = null;
    if (!activeModal) document.body.classList.remove('modal-open');
    if (previousFocus && typeof previousFocus.focus === 'function') previousFocus.focus();
  }

  function openRequestModal(mode, button) {
    requestMode = mode === 'subscription' ? 'subscription' : 'trial';
    planName = button?.dataset.plan || '';
    planPrice = Number(button?.dataset.price || 0);
    $('#modalTitle').textContent = requestMode === 'subscription' ? 'Vamos com o seu plano.' : 'Solicite seu teste gratuito.';
    $('#modalLead').textContent = requestMode === 'subscription'
      ? 'Confira seus dados para solicitar a assinatura. Nossa equipe confirma as condições pelo WhatsApp.'
      : 'Preencha seus dados para solicitar seu teste gratuito. Nossa equipe dará continuidade pelo WhatsApp.';
    $('#modalKicker').textContent = requestMode === 'subscription' ? 'WRB-TV · ASSINATURA' : 'WRB-TV · TESTE GRATUITO';
    submitRequest.innerHTML = requestMode === 'subscription'
      ? 'Solicitar assinatura <span aria-hidden="true">↗</span>'
      : 'Solicitar teste gratuito <span aria-hidden="true">↗</span>';
    selectedPlan.hidden = requestMode !== 'subscription';
    if (requestMode === 'subscription') {
      $('#selectedPlanName').textContent = planName;
      $('#selectedPlanPrice').textContent = money(planPrice) + '/mês';
    }
    openDialog(requestModal, '#fullName');
  }

  $$('[data-open-modal]').forEach(button => {
    button.addEventListener('click', () => {
      const mode = button.dataset.openModal;
      if (mode === 'reseller') {
        openDialog(resellerModal, '#resellerName');
      } else {
        openRequestModal(mode, button);
      }
      closeMenu();
    });
  });
  $('#modalClose')?.addEventListener('click', () => {
    closeDialog(requestModal);
    requestForm?.reset();
    $('#sourceOtherWrap').hidden = true;
    $('#customBrandWrap').hidden = true;
    $('#customBrand').required = false;
  });
  $('#resellerModalClose')?.addEventListener('click', () => closeDialog(resellerModal));
  [requestModal, resellerModal].forEach(dialog => {
    dialog?.addEventListener('click', event => {
      if (event.target === dialog) closeDialog(dialog);
    });
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && activeModal) {
      const toClose = activeModal;
      closeDialog(toClose);
    }
    if (event.key === 'Tab' && activeModal) {
      const focusable = $$('button:not([disabled]),input:not([disabled]),select:not([disabled]),a[href]', activeModal)
        .filter(element => element.offsetParent !== null);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  // Input masks.
  function maskPhone(value) {
    const digits = String(value || '').replace(/\D/g, '').slice(0, 11);
    if (!digits) return '';
    if (digits.length < 3) return '(' + digits;
    if (digits.length < 7) return '(' + digits.slice(0, 2) + ') ' + digits.slice(2);
    if (digits.length < 11) return '(' + digits.slice(0, 2) + ') ' + digits.slice(2, 6) + '-' + digits.slice(6);
    return '(' + digits.slice(0, 2) + ') ' + digits.slice(2, 7) + '-' + digits.slice(7);
  }
  ['#phone', '#resellerPhone'].forEach(selector => {
    const input = $(selector);
    input?.addEventListener('input', () => {
      input.value = maskPhone(input.value);
      try { input.setSelectionRange(input.value.length, input.value.length); } catch (_) {}
    });
  });
  $('#source')?.addEventListener('change', event => {
    $('#sourceOtherWrap').hidden = event.target.value !== 'Outro';
  });
  $('#deviceBrand')?.addEventListener('change', event => {
    const isOther = event.target.value === 'Outra';
    $('#customBrandWrap').hidden = !isOther;
    $('#customBrand').required = isOther;
    if (!isOther) $('#customBrand').value = '';
  });

  requestForm?.addEventListener('submit', event => {
    event.preventDefault();
    if (!requestForm.reportValidity()) return;
    const name = $('#fullName').value.trim();
    const phone = $('#phone').value.trim();
    const source = $('#source').value || 'Não informado';
    const sourceOther = $('#sourceOther').value.trim();
    const device = $('#deviceType').value;
    const brand = $('#deviceBrand').value === 'Outra' ? $('#customBrand').value.trim() : $('#deviceBrand').value;
    const model = $('#deviceModel').value.trim() || 'Não informado';
    let message = requestMode === 'subscription'
      ? '🚀 SOLICITAÇÃO DE ASSINATURA WRB-TV\n\n📦 Plano escolhido:\n' + planName + ' — ' + money(planPrice) + '/mês\n\n'
      : '🚀 SOLICITAÇÃO DE TESTE GRATUITO WRB-TV\n\n';
    message += '👤 Nome:\n' + name + '\n\n📱 WhatsApp:\n' + phone + '\n\n📢 Como conheceu a WRB-TV:\n' + source + '\n';
    if (source === 'Outro' && sourceOther) message += '📝 Origem:\n' + sourceOther + '\n';
    message += '\n📺 Tipo de dispositivo:\n' + device + '\n\n🏷 Marca:\n' + brand + '\n\n📦 Modelo:\n' + model + '\n\n';
    message += requestMode === 'subscription'
      ? 'Gostaria de prosseguir com a assinatura. Aguardo a confirmação das condições e as instruções para contratação.'
      : 'Gostaria de receber meu acesso de teste gratuito. Aguardo as orientações da equipe.';
    closeDialog(requestModal);
    openWhatsApp(message);
  });

  // Reseller form exists only inside the dedicated reseller modal.
  const resellerForm = $('#resellerForm');
  const creditsInput = $('#credits');
  const tierButtons = $$('.modal-tier[data-tier]');
  let selectedTier = { name: 'Bronze', rate: 9, min: 10, max: 49 };

  function updateEstimate() {
    const raw = Number.parseInt(creditsInput.value, 10);
    const quantity = Number.isFinite(raw) && raw > 0 ? raw : 0;
    $('#estimate').textContent = money(quantity * selectedTier.rate);
    return quantity;
  }
  function selectTier(button) {
    selectedTier = {
      name: button.dataset.tier,
      rate: Number(button.dataset.rate),
      min: Number(button.dataset.min),
      max: button.dataset.max ? Number(button.dataset.max) : null
    };
    tierButtons.forEach(tier => {
      const active = tier === button;
      tier.classList.toggle('is-active', active);
      tier.setAttribute('aria-pressed', String(active));
    });
    creditsInput.min = String(selectedTier.min);
    if (selectedTier.max) creditsInput.max = String(selectedTier.max);
    else creditsInput.removeAttribute('max');
    const existing = Number.parseInt(creditsInput.value, 10);
    if (!Number.isFinite(existing) || existing < selectedTier.min || (selectedTier.max && existing > selectedTier.max)) {
      creditsInput.value = String(selectedTier.min);
    }
    $('#resellerTierHint').textContent = selectedTier.max
      ? 'Faixa ' + selectedTier.name + ': de ' + selectedTier.min + ' a ' + selectedTier.max + ' créditos.'
      : 'Faixa ' + selectedTier.name + ': a partir de ' + selectedTier.min + ' créditos.';
    updateEstimate();
  }
  tierButtons.forEach(button => button.addEventListener('click', () => selectTier(button)));
  creditsInput?.addEventListener('input', updateEstimate);

  resellerForm?.addEventListener('submit', event => {
    event.preventDefault();
    if (!resellerForm.reportValidity()) return;
    const quantity = updateEstimate();
    if (quantity < selectedTier.min || (selectedTier.max && quantity > selectedTier.max)) {
      creditsInput.setCustomValidity('Informe uma quantidade dentro da faixa ' + selectedTier.name + '.');
      creditsInput.reportValidity();
      creditsInput.setCustomValidity('');
      return;
    }
    const name = $('#resellerName').value.trim();
    const phone = $('#resellerPhone').value.trim();
    const message = '🤝 INTERESSE EM REVENDA WRB-TV\n\n' +
      '👤 Nome: ' + name + '\n' +
      '📱 WhatsApp: ' + phone + '\n' +
      '🏷 Faixa: ' + selectedTier.name + '\n' +
      '📦 Quantidade: ' + quantity + ' créditos\n' +
      '💰 Estimativa: ' + money(quantity * selectedTier.rate) + '\n\n' +
      'Gostaria de conversar sobre as condições do programa de revenda. Aguardo o retorno da equipe.';
    closeDialog(resellerModal);
    resellerForm.reset();
    creditsInput.value = String(selectedTier.min);
    updateEstimate();
    openWhatsApp(message);
  });

  // FAQ accordion.
  $$('.faq-list details').forEach(details => {
    details.addEventListener('toggle', () => {
      if (!details.open) return;
      $$('.faq-list details').forEach(other => {
        if (other !== details) other.open = false;
      });
    });
  });

  // Subtle entrance effects, with a no-motion fallback for accessibility.
  $('#year').textContent = String(new Date().getFullYear());
  document.body.classList.add('js-ready');
  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach(element => observer.observe(element));
  } else {
    reveals.forEach(element => element.classList.add('is-visible'));
  }
  $$('.hero .reveal').forEach(element => element.classList.add('is-visible'));
  updateEstimate();
})();