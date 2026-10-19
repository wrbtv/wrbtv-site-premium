(() => {
  'use strict';
  const WHATSAPP_NUMBER = '5588996484494';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mobile navigation.
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

  // Cinematic carousel: manual controls, timed rotation and pause on hover/focus.
  const slides = $$('.slide');
  const dotButtons = $$('#dots button');
  const heroKicker = $('#heroKicker');
  const heroTitle = $('#heroTitle');
  const heroHighlight = $('#heroHighlight');
  const heroCopy = $('#heroCopy');
  const posterTitle = $('#posterTitle');
  const poster = $('.screen-poster');
  let slideIndex = 0;
  let carouselTimer = 0;
  let carouselPaused = false;
  const slideCaptions = ['Canais ao vivo', 'Filmes para cada momento', 'Sua próxima série'];
  function stopCarousel() { window.clearInterval(carouselTimer); carouselTimer = 0; }
  function startCarousel() {
    stopCarousel();
    if (!reducedMotion && !carouselPaused && !document.hidden) {
      carouselTimer = window.setInterval(() => renderSlide((slideIndex + 1) % slides.length), 6500);
    }
  }
  function renderSlide(index) {
    slideIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('active', i === slideIndex));
    dotButtons.forEach((dot, i) => {
      dot.classList.toggle('active', i === slideIndex);
      dot.setAttribute('aria-pressed', String(i === slideIndex));
    });
    const slide = slides[slideIndex];
    heroKicker.textContent = slide.dataset.kicker || '';
    heroTitle.textContent = slide.dataset.title || '';
    heroHighlight.textContent = slide.dataset.highlight || '';
    heroCopy.textContent = slide.dataset.copy || '';
    posterTitle.textContent = slideCaptions[slideIndex] || 'Sua experiência';
    const background = getComputedStyle(slide).backgroundImage;
    if (poster && background && background !== 'none') poster.style.backgroundImage = background;
    startCarousel();
  }
  $('#prev')?.addEventListener('click', () => renderSlide(slideIndex - 1));
  $('#next')?.addEventListener('click', () => renderSlide(slideIndex + 1));
  dotButtons.forEach((dot, i) => dot.addEventListener('click', () => renderSlide(i)));
  $('.hero')?.addEventListener('mouseenter', () => { carouselPaused = true; stopCarousel(); });
  $('.hero')?.addEventListener('mouseleave', () => { carouselPaused = false; startCarousel(); });
  $('.hero')?.addEventListener('focusin', () => { carouselPaused = true; stopCarousel(); });
  $('.hero')?.addEventListener('focusout', event => {
    if (!event.currentTarget.contains(event.relatedTarget)) { carouselPaused = false; startCarousel(); }
  });
  document.addEventListener('visibilitychange', startCarousel);
  renderSlide(0);

  // Restrained 3D tilt on large screens only; disabled for reduced-motion users.
  if (!reducedMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    $$('.tilt').forEach(card => {
      card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        card.style.transform = `perspective(900px) rotateY(${x * 4}deg) rotateX(${y * -3}deg) translateY(-3px)`;
      });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    });
  }

  // Request modal and WhatsApp handoff. No payments are processed on the site.
  const modal = $('#requestModal');
  const requestForm = $('#requestForm');
  const deviceBrand = $('#deviceBrand');
  const customBrandWrap = $('#customBrandWrap');
  const customBrand = $('#customBrand');
  let previouslyFocused = null;
  function openModal(mode = 'trial', plan = '', price = '') {
    if (!modal) return;
    previouslyFocused = document.activeElement;
    $('#requestMode').value = mode;
    $('#requestPlan').value = plan;
    $('#requestPrice').value = price;
    const subscription = mode === 'subscription';
    $('#modalKicker').textContent = subscription ? 'WRB-TV · SOLICITAÇÃO DE ASSINATURA' : 'WRB-TV · PRIMEIRO PLAY';
    $('#modalTitle').textContent = subscription ? 'Solicite sua assinatura' : 'Solicite seu teste grátis';
    $('#modalLead').textContent = subscription
      ? `Plano escolhido: ${plan} — ${price}. Preencha seus dados para seguir ao WhatsApp e receber as orientações de contratação.`
      : 'Preencha seus dados. Em seguida, você seguirá para o WhatsApp para receber orientação sobre o teste gratuito de até 4 horas.';
    $('#submitRequest').innerHTML = subscription ? 'Continuar com a assinatura ↗' : 'Solicitar teste grátis ↗';
    modal.hidden = false;
    document.body.classList.add('modal-open');
    window.setTimeout(() => $('#fullName')?.focus(), 60);
  }
  function closeModal() {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    requestForm?.reset();
    customBrandWrap.hidden = true;
    customBrand.required = false;
    if (previouslyFocused && typeof previouslyFocused.focus === 'function') previouslyFocused.focus();
  }
  $$('[data-modal]').forEach(button => button.addEventListener('click', () => {
    openModal(button.dataset.modal, button.dataset.plan || '', button.dataset.price || '');
    closeMenu();
  }));
  $('#modalClose')?.addEventListener('click', closeModal);
  modal?.addEventListener('click', event => { if (event.target === modal) closeModal(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') { closeModal(); closeMenu(); }
  });
  deviceBrand?.addEventListener('change', () => {
    const isOther = deviceBrand.value === 'Outra';
    customBrandWrap.hidden = !isOther;
    customBrand.required = isOther;
    if (!isOther) customBrand.value = '';
  });

  function formatPhone(value) {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 2) return digits ? `(${digits}` : '';
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }
  function money(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
  function openWhatsApp(message) {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }
  ['#phone', '#resellerPhone'].forEach(selector => {
    $(selector)?.addEventListener('input', event => { event.target.value = formatPhone(event.target.value); });
  });
  requestForm?.addEventListener('submit', event => {
    event.preventDefault();
    if (!requestForm.reportValidity()) return;
    const phone = $('#phone').value.trim();
    if (phone.replace(/\D/g, '').length < 10) {
      $('#phone').setCustomValidity('Informe um WhatsApp válido com DDD.');
      $('#phone').reportValidity();
      $('#phone').setCustomValidity('');
      return;
    }
    const subscription = $('#requestMode').value === 'subscription';
    const brand = deviceBrand.value === 'Outra' ? customBrand.value.trim() : deviceBrand.value;
    const plan = $('#requestPlan').value;
    const price = $('#requestPrice').value;
    const message = [
      subscription ? '🚀 SOLICITAÇÃO DE ASSINATURA WRB-TV' : '🚀 SOLICITAÇÃO DE TESTE GRATUITO WRB-TV',
      '',
      ...(subscription ? [`📦 Plano escolhido: ${plan} — ${price}`, ''] : []),
      `👤 Nome: ${$('#fullName').value.trim()}`,
      `📱 WhatsApp: ${phone}`,
      `📺 Dispositivo: ${$('#deviceType').value}`,
      `🏷 Marca: ${brand}`,
      `📦 Modelo: ${$('#deviceModel').value.trim() || 'Não informado'}`,
      `📢 Como conheceu a WRB-TV: ${$('#source').value || 'Não informado'}`,
      '',
      subscription
        ? 'Gostaria de prosseguir com a assinatura. Aguardo orientações para contratação e pagamento.'
        : 'Gostaria de receber orientações para meu teste gratuito por até 4 horas.'
    ].join('\n');
    openWhatsApp(message);
    closeModal();
  });

  // Reseller estimator preserves the current exported price tiers.
  const tiers = $$('.tier');
  const creditsInput = $('#credits');
  const estimate = $('#estimate');
  const tierHint = $('#tierHint');
  let selectedTier = tiers[0];
  function updateEstimate() {
    if (!selectedTier || !creditsInput || !estimate) return;
    const rate = Number(selectedTier.dataset.rate || 0);
    const min = Number(selectedTier.dataset.min || 1);
    const max = selectedTier.dataset.max ? Number(selectedTier.dataset.max) : null;
    let quantity = Math.max(0, Number.parseInt(creditsInput.value, 10) || 0);
    quantity = Math.min(quantity, 99999);
    estimate.textContent = money(quantity * rate);
    creditsInput.min = String(min);
    creditsInput.max = max ? String(max) : '99999';
    tierHint.textContent = quantity > 0 && quantity < min
      ? `A faixa ${selectedTier.dataset.tier} começa em ${min} créditos.`
      : max && quantity > max
        ? `A faixa ${selectedTier.dataset.tier} vai até ${max} créditos.`
        : max
          ? `Faixa ${selectedTier.dataset.tier}: de ${min} a ${max} créditos.`
          : `Faixa ${selectedTier.dataset.tier}: ${min} créditos ou mais.`;
  }
  tiers.forEach(tier => tier.addEventListener('click', () => {
    tiers.forEach(item => item.classList.toggle('selected', item === tier));
    selectedTier = tier;
    creditsInput.value = tier.dataset.min;
    updateEstimate();
  }));
  creditsInput?.addEventListener('input', updateEstimate);
  $('#resellerForm')?.addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const phone = $('#resellerPhone').value.trim();
    if (phone.replace(/\D/g, '').length < 10) {
      $('#resellerPhone').setCustomValidity('Informe um WhatsApp válido com DDD.');
      $('#resellerPhone').reportValidity();
      $('#resellerPhone').setCustomValidity('');
      return;
    }
    const quantity = Number.parseInt(creditsInput.value, 10) || 0;
    const rate = Number(selectedTier.dataset.rate);
    const min = Number(selectedTier.dataset.min);
    const max = selectedTier.dataset.max ? Number(selectedTier.dataset.max) : null;
    if (quantity < min || (max && quantity > max)) {
      creditsInput.setCustomValidity(`Quantidade fora da faixa selecionada (${min}${max ? ` a ${max}` : ' ou mais'}).`);
      creditsInput.reportValidity();
      creditsInput.setCustomValidity('');
      return;
    }
    openWhatsApp([
      '🚀 INTERESSE EM SER REVENDEDOR WRB-TV', '',
      `Nome: ${$('#resellerName').value.trim()}`,
      `WhatsApp: ${phone}`,
      `Plano escolhido: ${selectedTier.dataset.tier}`,
      `Quantidade de créditos: ${quantity}`,
      `Preço por crédito: ${money(rate)}`,
      `Valor estimado: ${money(quantity * rate)}`, '',
      'Tenho interesse em me tornar revendedor WRB-TV e gostaria de receber orientações para prosseguir.'
    ].join('\n'));
  });
  updateEstimate();
  $('#year').textContent = String(new Date().getFullYear());
})();