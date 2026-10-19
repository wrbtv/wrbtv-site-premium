(() => {
  'use strict';

  const WHATSAPP_NUMBER = '5588996484494';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const money = value => Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const modal = $('#requestModal');
  const requestForm = $('#requestForm');
  const submitRequest = $('#submitRequest');
  const selectedPlan = $('#selectedPlan');
  let requestMode = 'trial';
  let planName = '';
  let planPrice = 0;
  let previousFocus = null;

  function maskPhone(value) {
    const digits = String(value || '').replace(/\D/g, '').slice(0, 11);
    if (digits.length === 0) return '';
    if (digits.length < 3) return '(' + digits;
    if (digits.length < 7) return '(' + digits.slice(0, 2) + ') ' + digits.slice(2);
    if (digits.length < 11) return '(' + digits.slice(0, 2) + ') ' + digits.slice(2, 6) + '-' + digits.slice(6);
    return '(' + digits.slice(0, 2) + ') ' + digits.slice(2, 7) + '-' + digits.slice(7);
  }

  function openWhatsApp(message) {
    const url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
    const opened = window.open(url, '_blank', 'noopener,noreferrer');
    if (!opened) window.location.href = url;
  }

  function openModal(mode, button) {
    requestMode = mode === 'subscription' ? 'subscription' : 'trial';
    planName = button?.dataset.plan || '';
    planPrice = Number(button?.dataset.price || 0);
    previousFocus = document.activeElement;
    $('#modalTitle').textContent = requestMode === 'subscription' ? 'Vamos com o seu plano.' : 'Vamos começar?';
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
    modal.hidden = false;
    document.body.classList.add('modal-open');
    window.setTimeout(() => $('#fullName').focus(), 50);
  }

  function closeModal() {
    if (modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    requestForm.reset();
    $('#sourceOtherWrap').hidden = true;
    $('#customBrandWrap').hidden = true;
    $('#customBrand').required = false;
    if (previousFocus && typeof previousFocus.focus === 'function') previousFocus.focus();
  }

  $$('[data-open-modal]').forEach(button => {
    button.addEventListener('click', () => openModal(button.dataset.openModal, button));
  });
  $('#modalClose').addEventListener('click', closeModal);
  modal.addEventListener('click', event => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !modal.hidden) closeModal();
    if (event.key === 'Tab' && !modal.hidden) {
      const focusable = $$('button:not([disabled]),input:not([disabled]),select:not([disabled]),a[href]', modal)
        .filter(el => el.offsetParent !== null);
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

  const phoneInput = $('#phone');
  const resellerPhoneInput = $('#resellerPhone');
  [phoneInput, resellerPhoneInput].forEach(input => {
    input.addEventListener('input', () => {
      const start = input.selectionStart;
      input.value = maskPhone(input.value);
      try { input.setSelectionRange(input.value.length, input.value.length); } catch (_) {}
    });
  });

  $('#source').addEventListener('change', event => {
    $('#sourceOtherWrap').hidden = event.target.value !== 'Outro';
  });
  $('#deviceBrand').addEventListener('change', event => {
    const isOther = event.target.value === 'Outra';
    $('#customBrandWrap').hidden = !isOther;
    $('#customBrand').required = isOther;
    if (!isOther) $('#customBrand').value = '';
  });

  requestForm.addEventListener('submit', event => {
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
    closeModal();
    openWhatsApp(message);
  });

  const tierButtons = $$('.tier[data-tier]');
  const creditsInput = $('#credits');
  let selectedTier = { name: 'Bronze', rate: 9, min: 10, max: 49 };

  function updateEstimate() {
    const credits = Number.parseInt(creditsInput.value, 10);
    const safeCredits = Number.isFinite(credits) && credits > 0 ? credits : 0;
    $('#estimate').textContent = money(safeCredits * selectedTier.rate);
    return safeCredits;
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
      tier.classList.toggle('active', active);
      tier.setAttribute('aria-pressed', String(active));
    });
    creditsInput.min = String(selectedTier.min);
    if (selectedTier.max) creditsInput.max = String(selectedTier.max);
    else creditsInput.removeAttribute('max');
    const current = Number.parseInt(creditsInput.value, 10);
    if (!Number.isFinite(current) || current < selectedTier.min || (selectedTier.max && current > selectedTier.max)) {
      creditsInput.value = String(selectedTier.min);
    }
    $('#tierHint').textContent = selectedTier.max
      ? 'Faixa ' + selectedTier.name + ': de ' + selectedTier.min + ' a ' + selectedTier.max + ' créditos.'
      : 'Faixa ' + selectedTier.name + ': a partir de ' + selectedTier.min + ' créditos.';
    updateEstimate();
  }

  tierButtons.forEach(button => button.addEventListener('click', () => selectTier(button)));
  creditsInput.addEventListener('input', updateEstimate);
  $('#resellerForm').addEventListener('submit', event => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    const credits = updateEstimate();
    const name = $('#resellerName').value.trim();
    const phone = $('#resellerPhone').value.trim();
    const message = '🤝 INTERESSE EM REVENDA WRB-TV\n\n' +
      '👤 Nome: ' + name + '\n' +
      '📱 WhatsApp: ' + phone + '\n' +
      '🏷 Faixa: ' + selectedTier.name + '\n' +
      '📦 Quantidade: ' + credits + ' créditos\n' +
      '💰 Estimativa: ' + money(credits * selectedTier.rate) + '\n\n' +
      'Gostaria de conversar sobre as condições do programa de revenda. Aguardo o retorno da equipe.';
    openWhatsApp(message);
  });

  const menuToggle = $('#menuToggle');
  const navLinks = $('#navLinks');
  function closeMenu() {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menu');
  }
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  });
  $$('#navLinks a').forEach(link => link.addEventListener('click', closeMenu));
  $$('#navLinks .button').forEach(button => button.addEventListener('click', closeMenu));

  $$('.faq-list details').forEach(details => {
    details.addEventListener('toggle', () => {
      if (!details.open) return;
      $$('.faq-list details').forEach(other => {
        if (other !== details) other.open = false;
      });
    });
  });

  $('#year').textContent = String(new Date().getFullYear());
  document.body.classList.add('js-ready');
  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(element => observer.observe(element));
  } else {
    reveals.forEach(element => element.classList.add('is-visible'));
  }
  const firstHeroItems = $$('.hero .reveal');
  firstHeroItems.forEach(element => element.classList.add('is-visible'));
  updateEstimate();
})();