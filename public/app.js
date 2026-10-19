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

  // Three-panel automatic carousel. It changes the background scene and the
  // artwork inside the device interface, rather than merely animating captions.
  const carouselData = [
    {
      src: '/assets/hero-world.webp',
      alt: 'Uma experiência cinematográfica com mundos fantásticos e entretenimento visual',
      kicker: 'SEU UNIVERSO DE ENTRETENIMENTO',
      title: 'Muitas histórias.<br>Um só lugar.',
      copy: 'Filmes, séries e descobertas para cada momento.'
    },
    {
      src: '/assets/hero-films.webp',
      alt: 'Uma sala de cinema futurista com uma paisagem cinematográfica de fantasia',
      kicker: 'FILMES E SÉRIES',
      title: 'Sua próxima<br>maratona começa aqui.',
      copy: 'Escolha seu próximo filme ou encontre uma nova série.'
    },
    {
      src: '/assets/hero-sports.webp',
      alt: 'Estádio de futebol iluminado em uma noite de jogo',
      kicker: 'ESPORTE E EMOÇÃO AO VIVO',
      title: 'A emoção do jogo<br>em outro nível.',
      copy: 'Descubra opções de entretenimento esportivo em um só lugar.'
    }
  ];
  const bgSlides = $$('.hero-backdrop-slide');
  const featured = $('#featuredContent');
  const featuredImage = $('#featuredImage');
  const featuredKicker = $('#featuredKicker');
  const featuredTitle = $('#featuredTitle');
  const featuredCopy = $('#featuredCopy');
  const slideCount = $('#slideCount');
  const dotButtons = $$('#carouselDots button');
  let slideIndex = 0;
  let carouselTimer = 0;
  let carouselPaused = false;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  bgSlides.forEach((slide, index) => {
    const item = carouselData[index];
    if (item) slide.style.backgroundImage = 'url("' + item.src + '")';
  });

  function stopCarousel() {
    if (carouselTimer) window.clearInterval(carouselTimer);
    carouselTimer = 0;
  }
  function startCarousel() {
    stopCarousel();
    if (!reduceMotion && !carouselPaused && !document.hidden) {
      carouselTimer = window.setInterval(() => renderSlide(slideIndex + 1), 6500);
    }
  }
  function renderSlide(nextIndex, restartTimer = true) {
    slideIndex = (nextIndex + carouselData.length) % carouselData.length;
    const item = carouselData[slideIndex];
    bgSlides.forEach((slide, index) => slide.classList.toggle('is-active', index === slideIndex));
    if (featured && featuredImage) {
      featured.classList.add('is-changing');
      featuredImage.alt = item.alt;
      featuredImage.src = item.src;
      featuredImage.onload = () => featured.classList.remove('is-changing');
    }
    if (featuredKicker) featuredKicker.textContent = item.kicker;
    if (featuredTitle) featuredTitle.innerHTML = item.title;
    if (featuredCopy) featuredCopy.textContent = item.copy;
    if (slideCount) slideCount.textContent = String(slideIndex + 1).padStart(2, '0');
    dotButtons.forEach((button, index) => {
      const active = index === slideIndex;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    if (restartTimer) startCarousel();
  }
  $('#slidePrev')?.addEventListener('click', () => renderSlide(slideIndex - 1));
  $('#slideNext')?.addEventListener('click', () => renderSlide(slideIndex + 1));
  dotButtons.forEach(button => button.addEventListener('click', () => renderSlide(Number(button.dataset.slide))));
  const showcase = $('.hero-showcase');
  showcase?.addEventListener('mouseenter', () => { carouselPaused = true; stopCarousel(); });
  showcase?.addEventListener('mouseleave', () => { carouselPaused = false; startCarousel(); });
  showcase?.addEventListener('focusin', () => { carouselPaused = true; stopCarousel(); });
  showcase?.addEventListener('focusout', event => {
    if (!showcase.contains(event.relatedTarget)) {
      carouselPaused = false;
      startCarousel();
    }
  });
  document.addEventListener('visibilitychange', startCarousel);
  renderSlide(0, false);
  startCarousel();

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