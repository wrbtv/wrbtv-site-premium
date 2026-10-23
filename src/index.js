const RELEASE_BASE = "https://github.com/wrbtv/wrbtv-site-premium/releases/download/wrbtv-site-premium/";
const NL = String.fromCharCode(10);
const ALLOWED_FILES = new Set([
  "index.html",
  "revendedor.html",
  "home-reference.png",
  "wrbtv-social-preview.jpg",
  "wrbtv-logo.png",
  "wrbtv-logo-official.png",
  "app-abe-player-tv.png",
  "app-all-player.png",
  "app-ibo-player-pro.png",
  "app-iptv-4k.png",
  "app-iptv-ott-player.png",
  "app-vizzion-play.png",
  "app-vu-player-pro.png"
]);

const MOBILE_PREMIUM_CSS = `.mobile-menu-toggle { display:none !important; }\n@media (max-width:1020px) {
  html { min-height:100%; background:#030713 !important; scroll-padding-top:82px; }
  body { min-height:100vh; padding-top:76px !important; position:relative; isolation:isolate; background:transparent !important; overflow-x:clip !important; }
  body::before {
    content:""; position:fixed; inset:0; z-index:-1; pointer-events:none;
    background-image:linear-gradient(180deg,rgba(2,7,19,.98) 0px,rgba(2,7,19,.98) 38px,rgba(2,7,19,.76) 60px,rgba(2,7,19,.48) 90px,rgba(2,7,19,.24) 142px,rgba(2,7,19,.20) 36%,rgba(2,7,19,.28) 72%,rgba(2,7,19,.42) 100%),url("/assets/home-reference.png");
    background-size:cover,auto 100vh; background-position:center,66% center; background-repeat:no-repeat,no-repeat; background-attachment:fixed,fixed; background-color:#030713;
  }
  .hero { display:block !important; width:100% !important; height:auto !important; overflow:visible !important; line-height:normal !important; background:transparent !important; }
  .hero-img,.hero-caption,.hero .hotspot { display:none !important; }
  .mobile-home-hero { display:block !important; padding:20px max(18px,5vw) 28px !important; text-align:left !important; background:transparent !important; }
  .mobile-brand { display:flex !important; align-items:center !important; justify-content:center !important; text-align:center !important; margin-bottom:12px; }
  .mobile-brand img { display:block; width:clamp(104px,30vw,150px) !important; height:auto !important; max-height:118px !important; object-fit:contain; filter:drop-shadow(0 8px 20px rgba(0,166,255,.24)); }
  .mobile-brand .eyebrow { display:inline-flex; justify-content:center; margin-top:7px; color:#32e4ff; text-align:center; letter-spacing:.16em; font-size:clamp(.64rem,2.5vw,.8rem); line-height:1.4; }
  .mobile-catalog { margin:12px 0 20px !important; padding:11px 13px !important; text-align:center; line-height:1.45; font-size:clamp(.65rem,2.6vw,.82rem); color:#e1edff; background:rgba(5,16,34,.58) !important; border:1px solid rgba(70,147,208,.42) !important; border-radius:999px !important; backdrop-filter:blur(4px); }
  .mobile-home-hero h1 { max-width:17ch; margin:12px 0 14px !important; padding:0 !important; text-align:left; font-size:clamp(2.1rem,7.8vw,3.1rem) !important; line-height:1.04 !important; letter-spacing:-.045em !important; text-wrap:balance; color:#fff !important; text-shadow:0 1px 3px rgba(0,0,0,.78),0 0 10px rgba(0,0,0,.38); -webkit-text-stroke:.15px rgba(0,0,0,.12); background:transparent !important; border:0 !important; border-radius:0 !important; box-shadow:none !important; backdrop-filter:none !important; -webkit-backdrop-filter:none !important; }\n  .mobile-home-hero h1 .gradient,.section-head .gradient { text-shadow:none !important; -webkit-text-stroke:0 transparent !important; filter:brightness(1.22) saturate(1.12); }
  .mobile-home-copy { max-width:42rem; margin:0 !important; padding:0 !important; color:#f4f7ff !important; font-size:clamp(1rem,3.8vw,1.18rem) !important; line-height:1.62 !important; text-shadow:0 2px 4px rgba(0,0,0,.98),0 0 14px rgba(0,0,0,.8); background:transparent !important; border:0 !important; border-radius:0 !important; box-shadow:none !important; backdrop-filter:none !important; -webkit-backdrop-filter:none !important; }
  .mobile-home-copy::after { content:none !important; display:none !important; }
  .mobile-hero-actions { display:grid !important; grid-template-columns:minmax(0,1.25fr) minmax(0,.75fr) !important; gap:10px !important; margin-top:22px !important; }
  .mobile-hero-actions .btn { min-width:0; min-height:50px; padding:12px 10px !important; border-radius:14px !important; font-size:clamp(.82rem,3vw,.98rem); line-height:1.25; white-space:normal; text-align:center; box-shadow:0 8px 22px rgba(0,50,170,.24); }
  .mobile-hero-actions .btn.secondary { color:#f5f8ff; background:rgba(10,22,42,.82) !important; border:1px solid rgba(102,143,194,.45) !important; box-shadow:none !important; }
  .mobile-perks { display:flex !important; flex-wrap:wrap; gap:8px !important; margin-top:17px !important; color:#d0def3 !important; font-size:.77rem !important; line-height:1.4; }
  .mobile-perks span { padding:6px 9px; border:1px solid rgba(102,143,194,.30); border-radius:999px; background:rgba(3,12,27,.54); white-space:normal !important; }
  .mobile-menu-toggle {
    display:flex !important; position:fixed !important;
    top:calc(10px + env(safe-area-inset-top)) !important; right:14px !important;
    z-index:1003 !important; width:46px; height:46px; padding:0;
    flex-direction:column; align-items:center; justify-content:center; gap:5px;
    border:1px solid rgba(64,154,224,.55); border-radius:14px;
    background:linear-gradient(145deg,rgba(13,33,58,.98),rgba(4,13,28,.98));
    box-shadow:0 7px 24px rgba(0,0,0,.34),inset 0 1px 0 rgba(255,255,255,.06);
    color:#f5f9ff; cursor:pointer; -webkit-tap-highlight-color:transparent;
  }
  .mobile-menu-toggle span {
    display:block; width:20px; height:2px; flex:0 0 2px;
    border-radius:2px; background:#ecf8ff;
    transition:transform .18s ease,opacity .18s ease;
  }
  .mobile-menu-toggle[aria-expanded="true"] span:first-child { transform:translateY(7px) rotate(45deg); }
  .mobile-menu-toggle[aria-expanded="true"] span:nth-child(2) { opacity:0; }
  .mobile-menu-toggle[aria-expanded="true"] span:nth-child(3) { transform:translateY(-7px) rotate(-45deg); }
  .mobile-menu-toggle:focus-visible { outline:2px solid #13d7ff; outline-offset:3px; }
  .mobile-nav {
    display:none !important; position:fixed !important;
    top:calc(64px + env(safe-area-inset-top)) !important; right:14px !important; left:auto !important;
    z-index:1002 !important; grid-template-columns:minmax(0,1fr) !important;
    gap:7px !important; width:min(290px,calc(100vw - 28px)) !important;
    max-height:calc(100dvh - 92px) !important; overflow:auto !important;
    padding:12px !important; margin:0 !important;
    border:1px solid rgba(65,148,221,.4) !important; border-radius:18px !important;
    background:linear-gradient(155deg,rgba(5,17,36,.985),rgba(2,8,20,.985)) !important;
    box-shadow:0 22px 55px rgba(0,0,0,.58),inset 0 1px 0 rgba(255,255,255,.055);
    backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px);
    scrollbar-width:thin;
  }
  .mobile-nav.mobile-nav-open { display:grid !important; }
  .mobile-nav::-webkit-scrollbar { width:5px; }
  .mobile-nav::-webkit-scrollbar-thumb { background:rgba(66,139,201,.48); border-radius:6px; }
  .mobile-nav a {
    display:flex !important; align-items:center; justify-content:flex-start;
    min-width:0; min-height:44px; padding:12px 14px !important;
    border:1px solid rgba(66,106,153,.4) !important; border-radius:11px !important;
    background:linear-gradient(115deg,rgba(13,31,55,.96),rgba(6,17,35,.96)) !important;
    color:#f5f9ff !important; font-size:.92rem !important; font-weight:750;
    line-height:1.25; text-align:left; white-space:normal !important;
    overflow-wrap:anywhere; transition:border-color .15s ease,background .15s ease;
  }
  .mobile-nav a:active,.mobile-nav a:focus-visible {
    outline:none; border-color:#00d9ff !important;
    background:linear-gradient(110deg,rgba(0,189,232,.28),rgba(7,91,255,.34)) !important;
  }
  main,main>section,.section { background:transparent !important; }
  .section { position:relative; padding:48px 0 !important; scroll-margin-top:84px !important; }
  .section-head { padding:0 !important; margin-bottom:26px !important; text-shadow:0 2px 5px rgba(0,0,0,.98),0 0 16px rgba(0,0,0,.72); background:transparent !important; border:0 !important; border-radius:0 !important; box-shadow:none !important; backdrop-filter:none !important; -webkit-backdrop-filter:none !important; }
  .section-head .lead { color:#d0daec !important; }
  .feature-grid { grid-template-columns:repeat(2,minmax(0,1fr)) !important; gap:11px !important; }
  .feature { background:rgba(5,15,33,.76) !important; border-color:rgba(83,128,177,.36) !important; backdrop-filter:blur(7px); }
  #experiencia,#dispositivos,#planos,#duvidas { scroll-margin-top:84px !important; }
  .footer,footer { background:rgba(2,7,18,.78) !important; }
}
@media (min-width:640px) and (max-width:1020px) {
  body { padding-top:49px !important; }
  .mobile-home-hero { padding:28px max(24px,5vw) 35px !important; }
  .mobile-home-hero h1 { max-width:20ch; font-size:clamp(2.5rem,5.2vw,3.5rem) !important; }
  .mobile-hero-actions { grid-template-columns:minmax(0,310px) minmax(0,180px) !important; }
}
@media (max-width:380px) {
  body { padding-top:73px !important; }
  .mobile-home-hero { padding-inline:16px !important; }
  .mobile-catalog { letter-spacing:-.01em; }
  .mobile-hero-actions { grid-template-columns:1fr !important; }
  .mobile-hero-actions .btn { min-height:48px; }

/* Premium fumê: texto sobre imagens continua legível sem cobrir a arte. */
@media (max-width:1020px) {
  .mobile-brand .eyebrow {
    padding:7px 13px !important;
    border:1px solid rgba(78,188,255,.20);
    border-radius:999px;
    background:rgba(3,12,27,.34) !important;
    box-shadow:0 5px 18px rgba(0,0,0,.10);
    backdrop-filter:blur(5px);
    -webkit-backdrop-filter:blur(5px);
  }
  .mobile-home-hero h1 {
    padding:14px 16px !important;
    border:1px solid rgba(91,165,229,.20) !important;
    border-radius:18px !important;
    background:linear-gradient(135deg,rgba(3,12,27,.43),rgba(4,16,33,.29)) !important;
    box-shadow:0 10px 26px rgba(0,0,0,.14),inset 0 1px 0 rgba(255,255,255,.045) !important;
    backdrop-filter:blur(5px) !important;
    -webkit-backdrop-filter:blur(5px) !important;
  }
  .mobile-home-copy {
    padding:12px 15px !important;
    border:1px solid rgba(91,165,229,.17) !important;
    border-radius:15px !important;
    background:linear-gradient(135deg,rgba(3,12,27,.38),rgba(4,16,33,.25)) !important;
    box-shadow:0 8px 22px rgba(0,0,0,.12),inset 0 1px 0 rgba(255,255,255,.035) !important;
    backdrop-filter:blur(5px) !important;
    -webkit-backdrop-filter:blur(5px) !important;
  }
  .section-head {
    padding:13px 15px !important;
    border:1px solid rgba(91,165,229,.18) !important;
    border-radius:16px !important;
    background:linear-gradient(135deg,rgba(3,12,27,.36),rgba(4,16,33,.24)) !important;
    box-shadow:0 8px 22px rgba(0,0,0,.11),inset 0 1px 0 rgba(255,255,255,.035) !important;
    backdrop-filter:blur(5px) !important;
    -webkit-backdrop-filter:blur(5px) !important;
  }
  .feature {
    background:rgba(5,15,33,.59) !important;
    border-color:rgba(83,151,210,.34) !important;
    box-shadow:0 10px 26px rgba(0,0,0,.12),inset 0 1px 0 rgba(255,255,255,.035);
    backdrop-filter:blur(6px) !important;
    -webkit-backdrop-filter:blur(6px) !important;
  }
  .mobile-perks span {
    background:rgba(3,12,27,.42) !important;
    border-color:rgba(102,164,214,.26) !important;
    backdrop-filter:blur(4px);
    -webkit-backdrop-filter:blur(4px);
  }
}}`;

const MOBILE_MENU_SCRIPT = "(function () {\n  function initWrbtvMobileMenu() {\n    var menu = document.querySelector('.mobile-nav');\n    if (!menu || document.getElementById('wrbtv-mobile-menu-toggle')) return;\n    if (!menu.id) menu.id = 'wrbtv-mobile-menu';\n    var button = document.createElement('button');\n    button.id = 'wrbtv-mobile-menu-toggle';\n    button.className = 'mobile-menu-toggle';\n    button.type = 'button';\n    button.setAttribute('aria-label', 'Abrir menu');\n    button.setAttribute('aria-controls', menu.id);\n    button.setAttribute('aria-expanded', 'false');\n    button.innerHTML = '<span></span><span></span><span></span>';\n    document.body.appendChild(button);\n    function closeMenu() {\n      menu.classList.remove('mobile-nav-open');\n      button.setAttribute('aria-expanded', 'false');\n      button.setAttribute('aria-label', 'Abrir menu');\n    }\n    button.addEventListener('click', function (event) {\n      event.stopPropagation();\n      var isOpen = button.getAttribute('aria-expanded') === 'true';\n      if (isOpen) closeMenu();\n      else {\n        menu.classList.add('mobile-nav-open');\n        button.setAttribute('aria-expanded', 'true');\n        button.setAttribute('aria-label', 'Fechar menu');\n      }\n    });\n    menu.addEventListener('click', function (event) {\n      if (event.target && event.target.closest && event.target.closest('a')) closeMenu();\n    });\n    document.addEventListener('click', function (event) {\n      if (!menu.contains(event.target) && !button.contains(event.target)) closeMenu();\n    });\n    document.addEventListener('keydown', function (event) {\n      if (event.key === 'Escape') { closeMenu(); button.focus(); }\n    });\n    window.addEventListener('resize', function () {\n      if (window.innerWidth > 1020) closeMenu();\n    });\n  }\n  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initWrbtvMobileMenu, { once: true });\n  else initWrbtvMobileMenu();\n})();";

const RESELLER_CREDIT_SCRIPT = "(function () {\n  function initCreditQuantity() {\n    if (document.getElementById('wrbtv-credit-quantity-input-v10')) return;\n    var labels = Array.prototype.slice.call(document.querySelectorAll('label'));\n    var creditLabel = labels.find(function (node) { return /quantidade de cr[eé]ditos/i.test(node.textContent || ''); });\n    if (!creditLabel) return;\n    var original = creditLabel.control || (creditLabel.htmlFor ? document.getElementById(creditLabel.htmlFor) : null);\n    if (!original || original.tagName !== 'INPUT') {\n      var parent = creditLabel.parentElement;\n      for (var depth = 0; parent && depth < 6 && !original; depth++, parent = parent.parentElement) original = parent.querySelector('input[type=\"range\"],input[type=\"number\"],input[type=\"text\"]');\n    }\n    if (!original || original.tagName !== 'INPUT') return;\n    var tierSelect = Array.prototype.slice.call(document.querySelectorAll('select')).find(function (select) {\n      return /bronze|prata|ouro/i.test(Array.prototype.map.call(select.options || [], function (o) { return (o.textContent || '') + ' ' + (o.value || ''); }).join(' '));\n    });\n    var plans = {\n      bronze: { key: 'bronze', label: 'Bronze', min: 10, max: 49, price: 9.00, range: 'de 10 a 49 créditos' },\n      prata: { key: 'prata', label: 'Prata', min: 50, max: 99, price: 7.50, range: 'de 50 a 99 créditos' },\n      ouro: { key: 'ouro', label: 'Ouro', min: 100, max: Infinity, price: 6.00, range: 'de 100 ou mais créditos' }\n    };\n    function keyFrom(text) { var m = String(text || '').match(/bronze|prata|ouro/i); return m ? m[0].toLowerCase() : null; }\n    function optionKey(option) { return option ? keyFrom((option.textContent || '') + ' ' + (option.value || '')) : null; }\n    function optionFor(key) { return tierSelect && key ? Array.prototype.find.call(tierSelect.options || [], function (o) { return optionKey(o) === key; }) || null : null; }\n    function queryPlan() {\n      try { var p = new URLSearchParams(window.location.search || ''); var keys = ['plano','plan','tier','pacote','planId','planoSelecionado']; for (var i=0;i<keys.length;i++) { var key=keyFrom(p.get(keys[i])); if (key && plans[key]) return key; } } catch (_) {}\n      return null;\n    }\n        function sessionPlan() { try { var value = window.sessionStorage.getItem('wrbtv_reseller_plan_v1'); window.sessionStorage.removeItem('wrbtv_reseller_plan_v1'); var key = planKey(value); return key; } catch (_) { return null; } }\n        var savedPlan = sessionPlan();\n        var requestedPlan = queryPlan() || savedPlan;\n    var initialTierOption = tierSelect && tierSelect.options[tierSelect.selectedIndex]; var fixedPlanKey = requestedPlan && optionFor(requestedPlan) ? requestedPlan : (optionKey(initialTierOption) || 'bronze');\n    var form = original.form;\n    var originalId = original.id;\n    var manual = document.createElement('input');\n    manual.type='number'; manual.id='wrbtv-credit-quantity-input-v10'; manual.inputMode='numeric'; manual.autocomplete='off'; manual.spellcheck=false; manual.step='1'; manual.value=''; manual.required=false;\n    manual.setAttribute('aria-label','Quantidade de créditos'); manual.setAttribute('aria-describedby','wrbtv-credit-quantity-message-v10'); manual.setAttribute('placeholder','Digite a quantidade de créditos');\n    manual.style.cssText='display:block;width:100%;box-sizing:border-box;min-height:56px;padding:14px 16px;border-radius:16px;border:1px solid rgba(0,217,255,.7);background:#030b1a;color:#f6f9ff;font:inherit;font-size:1.1rem;appearance:textfield;-webkit-appearance:none;outline-offset:3px;';\n    var message=document.createElement('p'); message.id='wrbtv-credit-quantity-message-v10'; message.setAttribute('role','alert'); message.setAttribute('aria-live','polite');\n    message.style.cssText='display:none;margin:8px 0 0;color:#ff8b96;font-size:.88rem;line-height:1.45;font-weight:600;';\n    original.insertAdjacentElement('afterend',manual); manual.insertAdjacentElement('afterend',message);\n    original.style.setProperty('display','none','important'); original.setAttribute('aria-hidden','true'); original.setAttribute('tabindex','-1'); original.required=false; original.removeAttribute('min'); original.max='1000000000'; original.step='1';\n    if (originalId && creditLabel.htmlFor===originalId) creditLabel.htmlFor=manual.id;\n    var lockedVisual=null; var lockedTextNode=null; var lockedValue=null;\n    function selectedKey() {\n      if (fixedPlanKey) return fixedPlanKey;\n      var option=tierSelect && tierSelect.options[tierSelect.selectedIndex];\n      return optionKey(option) || 'bronze';\n    }\n    function currentPlan() { return plans[selectedKey()] || plans.bronze; }\n    function formatMoney(value) { return new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(value); }\n    function leafNodes(root) { return Array.prototype.filter.call(root.querySelectorAll('*'),function(n){return n.children.length===0 && (n.textContent||'').trim();}); }\n    function findSummaryCard(labelPattern) {\n      var leaves = leafNodes(document.body);\n      var label = leaves.find(function (n) { return labelPattern.test((n.textContent || '').trim()); });\n      if (!label) return null;\n      var parent = label;\n      for (var depth = 0; parent && depth < 6; depth++, parent = parent.parentElement) {\n        var values = leafNodes(parent).filter(function (n) { return /^R\\$\\s*[\\d.,]+$/.test((n.textContent || '').trim()); });\n        if (values.length === 1) return parent;\n      }\n      return label.parentElement || label;\n    }\n    function setTotalVisibility(visible) {\n      var card = findSummaryCard(/^Investimento total$/i);\n      if (!card) return;\n      if (visible) {\n        if (card.getAttribute('data-wrbtv-total-hidden') === 'true') {\n          var previousDisplay = card.getAttribute('data-wrbtv-total-display') || '';\n          if (previousDisplay) card.style.setProperty('display', previousDisplay);\n          else card.style.removeProperty('display');\n          card.removeAttribute('data-wrbtv-total-hidden');\n          card.removeAttribute('data-wrbtv-total-display');\n        }\n      } else if (card.getAttribute('data-wrbtv-total-hidden') !== 'true') {\n        card.setAttribute('data-wrbtv-total-display', card.style.display || '');\n        card.setAttribute('data-wrbtv-total-hidden', 'true');\n        card.style.setProperty('display', 'none', 'important');\n      }\n    }\n    function updateSummary(plan, quantity, hasQuantity) {\n      var unitText = formatMoney(plan.price);\n      var totalText = formatMoney(Math.max(0, quantity || 0) * plan.price);\n      function setValue(labelPattern, value) {\n        var leaves = leafNodes(document.body);\n        var label = leaves.find(function (n) { return labelPattern.test((n.textContent || '').trim()); });\n        if (!label) return;\n        var parent = label;\n        for (var depth = 0; parent && depth < 6; depth++, parent = parent.parentElement) {\n          var values = leafNodes(parent).filter(function (n) { return /^R\\$\\s*[\\d.,]+$/.test((n.textContent || '').trim()); });\n          if (values.length === 1) { values[0].textContent = value; return; }\n        }\n      }\n      setValue(/^Valor por cr[eé]dito$/i, unitText);\n      setValue(/^Investimento total$/i, totalText);\n      setTotalVisibility(!!hasQuantity);\n      var planNote = leafNodes(document.body).find(function (n) { return /^Plano\\s+(Bronze|Prata|Ouro)\\s*:/i.test((n.textContent || '').trim()); });\n      if (planNote) planNote.textContent = 'Plano ' + plan.label + ': ' + plan.range + '.';\n    }\n    function show(text) { message.textContent=text||''; message.style.display=text?'block':'none'; manual.setAttribute('aria-invalid',text?'true':'false'); }\n    function syncCalculator(quantity,plan) {\n      original.value=String(quantity);\n      original.dispatchEvent(new Event('input',{bubbles:true}));\n      if (tierSelect && fixedPlanKey) { var target=optionFor(fixedPlanKey); if(target && tierSelect.value!==target.value) tierSelect.value=target.value; tierSelect.dispatchEvent(new Event('change',{bubbles:true})); }\n      else original.dispatchEvent(new Event('change',{bubbles:true}));\n      updateSummary(plan,quantity,true);\n    }\n    function setLockedPlan() {\n      if (!tierSelect) return;\n      var activeKey = fixedPlanKey || selectedKey();\n      var option = optionFor(activeKey);\n      if (!option) return;\n      fixedPlanKey = activeKey;\n      lockedValue = option.value;\n      tierSelect.value = lockedValue;\n      tierSelect.dispatchEvent(new Event('change', { bubbles: true }));\n      var label = (option.textContent || plans[activeKey].label).trim();\n      var computed = window.getComputedStyle ? window.getComputedStyle(tierSelect) : null;\n      if (!lockedVisual) {\n        lockedVisual = document.createElement('div');\n        lockedVisual.id = 'wrbtv-locked-reseller-plan-v10';\n        lockedVisual.setAttribute('role', 'status');\n        lockedVisual.style.cssText = 'display:flex;align-items:center;justify-content:space-between;gap:12px;box-sizing:border-box;width:100%;min-width:0;min-height:' + (computed && computed.height !== 'auto' ? computed.height : '56px') + ';padding:' + (computed ? computed.padding : '14px 16px') + ';border:' + (computed ? computed.border : '1px solid rgba(0,217,255,.6)') + ';border-radius:' + (computed ? computed.borderRadius : '16px') + ';background:' + (computed ? computed.backgroundColor : '#030b1a') + ';color:' + (computed ? computed.color : '#f6f9ff') + ';font:' + (computed ? computed.font : 'inherit') + ';font-size:inherit;line-height:1.35;';\n        if (computed && computed.backgroundImage && computed.backgroundImage !== 'none') lockedVisual.style.backgroundImage = computed.backgroundImage;\n        lockedTextNode = document.createElement('span');\n        lockedTextNode.style.cssText = 'display:block;min-width:0;flex:1;white-space:normal;';\n        var icon = document.createElement('span');\n        icon.setAttribute('aria-hidden', 'true');\n        icon.innerHTML = '<svg viewBox=\"0 0 24 24\" width=\"19\" height=\"19\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"4\" y=\"10\" width=\"16\" height=\"11\" rx=\"2\"/><path d=\"M8 10V7a4 4 0 0 1 8 0v3\"/></svg>';\n        icon.style.cssText = 'display:flex;flex:0 0 auto;align-items:center;opacity:.78;color:#58ddff;';\n        lockedVisual.appendChild(lockedTextNode); lockedVisual.appendChild(icon);\n        tierSelect.insertAdjacentElement('beforebegin', lockedVisual);\n      }\n      lockedTextNode.textContent = label;\n      lockedVisual.setAttribute('aria-label', 'Plano fixo: ' + label);\n      tierSelect.style.setProperty('display', 'none', 'important');\n      tierSelect.setAttribute('aria-hidden', 'true');\n      tierSelect.tabIndex = -1;\n      if (tierSelect.getAttribute('data-wrbtv-lock-listener') !== 'true') {\n        tierSelect.setAttribute('data-wrbtv-lock-listener', 'true');\n        tierSelect.addEventListener('change', function () {\n          if (lockedValue !== null && tierSelect.value !== lockedValue) {\n            tierSelect.value = lockedValue;\n            tierSelect.dispatchEvent(new Event('change', { bubbles: true }));\n          }\n        }, true);\n        tierSelect.addEventListener('keydown', function (event) { event.preventDefault(); }, true);\n        tierSelect.addEventListener('pointerdown', function (event) { event.preventDefault(); }, true);\n        tierSelect.addEventListener('touchstart', function (event) { event.preventDefault(); }, { capture: true, passive: false });\n      }\n    }\n    function applyPlanFromCard(key) {\n      if (!plans[key]) return false;\n      var plan = plans[key];\n      var option = optionFor(key);\n      if (!option && tierSelect) return false;\n      fixedPlanKey = key;\n      if (option && tierSelect) {\n        lockedValue = option.value;\n        tierSelect.value = lockedValue;\n        tierSelect.dispatchEvent(new Event('change', { bubbles: true }));\n        if (lockedTextNode) lockedTextNode.textContent = (option.textContent || plan.label).trim();\n        if (lockedVisual) lockedVisual.setAttribute('aria-label', 'Plano fixo: ' + (option.textContent || plan.label).trim());\n      }\n      var raw = String(manual.value == null ? '' : manual.value).trim();\n      if (raw === '') { show(''); updateSummary(plan, 0, false); }\n      else validateAndSync(false);\n      return true;\n    }\n    function bindPlanCardButtons() {\n      document.addEventListener('click', function (event) {\n        var action = event.target && event.target.closest ? event.target.closest('button, a, [role=\"button\"], input[type=\"button\"], input[type=\"submit\"]') : null;\n        if (!action) return;\n        var label = String(action.innerText || action.value || action.getAttribute('aria-label') || '').replace(/\\s+/g, ' ').trim();\n        var match = label.match(/(?:selecionar|escolher|contratar|assinar)\\s+(bronze|prata|ouro)\\b/i);\n        if (!match) return;\n        applyPlanFromCard(match[1].toLowerCase());\n      }, true);\n    }\n    function validateAndSync(showEmpty) {\n      var raw=String(manual.value==null?'':manual.value).trim(); var plan=currentPlan();\n      if(raw===''){ show(showEmpty?'Informe a quantidade de créditos. Mínimo do plano '+plan.label+': '+plan.min+'.':''); updateSummary(plan,0,false); return false; }\n      var quantity=Number(raw);\n      if(!Number.isFinite(quantity)||!Number.isInteger(quantity)||quantity<1){show('Digite uma quantidade inteira de créditos.');updateSummary(plan,0,false);return false;}\n      updateSummary(plan,quantity);\n      if(quantity<plan.min){show('Quantidade mínima de créditos para o plano '+plan.label+': '+plan.min+'.');syncCalculator(quantity,plan);return false;}\n      if(quantity>plan.max){show('O plano '+plan.label+' aceita '+plan.range+'. A quantidade informada não pertence a este plano.');syncCalculator(quantity,plan);return false;}\n      show(''); syncCalculator(quantity,plan); return true;\n    }\n    if (tierSelect && fixedPlanKey) setLockedPlan();\n    bindPlanCardButtons();\n    // Clear the hidden initial quantity so old defaults cannot leave a stale price or total.\n    original.value=''; original.dispatchEvent(new Event('input',{bubbles:true}));\n    if (fixedPlanKey && tierSelect) { var fixedOption=optionFor(fixedPlanKey); if(fixedOption){tierSelect.value=fixedOption.value;tierSelect.dispatchEvent(new Event('change',{bubbles:true}));} }\n    updateSummary(currentPlan(),0,false);\n    manual.addEventListener('input',function(){validateAndSync(false);}); manual.addEventListener('change',function(){validateAndSync(false);});\n    if(form) form.addEventListener('submit',function(event){if(!validateAndSync(true)){event.preventDefault();event.stopPropagation();if(event.stopImmediatePropagation)event.stopImmediatePropagation();manual.focus();}},true);\n    function isOrderAction(el){var t=((el.innerText||el.value||el.getAttribute('aria-label')||'')+' '+(el.getAttribute('href')||'')).toLowerCase();return t.indexOf('whatsapp')>=0||t.indexOf('enviar pedido')>=0||t.indexOf('wa.me/')>=0||t.indexOf('api.whatsapp.com')>=0;}\n    document.addEventListener('click',function(event){var action=event.target&&event.target.closest?event.target.closest('a,button,input[type=\"submit\"],input[type=\"button\"]'):null;if(!action||!isOrderAction(action)||validateAndSync(true))return;event.preventDefault();event.stopPropagation();if(event.stopImmediatePropagation)event.stopImmediatePropagation();manual.focus();},true);\n  }\n  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',initCreditQuantity,{once:true}); else initCreditQuantity();\n})();";

const RESELLER_PLAN_LINK_SCRIPT = "(function(){\n  function gtag_report_conversion(url) {\n    var navigated = false;\n    var callback = function () {\n      if (navigated) return;\n      navigated = true;\n      if (typeof url !== 'undefined' && url) window.location = url;\n    };\n    if (typeof window.gtag !== 'function') {\n      callback();\n      return false;\n    }\n    window.gtag('event', 'conversion', {\n      'send_to': 'AW-18385692852/WkVSCKKsvqMdELTR_b5E',\n      'value': 1.0,\n      'currency': 'BRL',\n      'event_callback': callback\n    });\n    if (typeof url !== 'undefined' && url) window.setTimeout(callback, 1200);\n    return false;\n  }\n  function trackLeadClick(event) {\n    var el = event.target && event.target.closest\n      ? event.target.closest('a[href],button,[role=\"button\"],input[type=\"button\"],input[type=\"submit\"]')\n      : null;\n    if (!el) return;\n    if (typeof planFromCard === 'function' && planFromCard(el)) return;\n    var href = el.getAttribute('href') || el.href || '';\n    var label = String(\n      el.innerText || el.textContent || el.value || el.getAttribute('aria-label') || ''\n    ).replace(/\\s+/g, ' ').trim().toLowerCase();\n    var leadAction = /solicitar\\s+(?:seu\\s+)?teste|solicite\\s+(?:seu\\s+)?teste|teste\\s+(?:gr[aá]tis|gratuito)|quero\\s+(?:testar|assinar|contratar)|começar\\s+agora|comecar\\s+agora|testar\\s+agora|assinar|assine|contratar|contrate|comprar|checkout|finalizar\\s+pedido|ativar\\s+plano|garantir\\s+acesso/i.test(label);\n    var whatsappSales = /wa\\.me\\/|api\\.whatsapp\\.com/i.test(href)\n      && /teste|assin|contrat|plano|acesso|compr|solicit|quero/i.test(label);\n    if (!leadAction && !whatsappSales) return;\n\n    // Keep native behavior for buttons and new-tab links while sending the conversion.\n    if (el.tagName !== 'A' || !href || String(el.target || '').toLowerCase() === '_blank') {\n      gtag_report_conversion();\n      return;\n    }\n    event.preventDefault();\n    event.stopPropagation();\n    if (event.stopImmediatePropagation) event.stopImmediatePropagation();\n    gtag_report_conversion(href);\n  }\n  function planKey(text){var m=String(text||'').match(/bronze|prata|ouro/i);return m?m[0].toLowerCase():null;}\n  function queryPlan(href){try{var u=new URL(href||window.location.href,window.location.href);var key=planKey(u.searchParams.get('plano')||u.searchParams.get('plan')||u.searchParams.get('tier'));if(key)return key;}catch(_){}return null;}\n  function uniquePlan(text){var list=String(text||'').match(/bronze|prata|ouro/ig)||[];var uniq=[];list.forEach(function(x){x=x.toLowerCase();if(uniq.indexOf(x)<0)uniq.push(x);});return uniq.length===1?uniq[0]:null;}\n  function planFromCard(el){\n    var explicit=el&&el.getAttribute&&(planKey(el.getAttribute('data-wrbtv-reseller-plan')||el.getAttribute('data-plan')||el.getAttribute('data-tier')||el.getAttribute('data-plano')||el.getAttribute('data-package')));if(explicit)return explicit;\n    var anchor=el&&el.closest?el.closest('a[href]'):null;var urlPlan=queryPlan(anchor?anchor.href:(el&&el.href));if(urlPlan)return urlPlan;\n    for(var p=el,depth=0;p&&depth<10;p=p.parentElement,depth++){\n      var attr=p.getAttribute&&((p.getAttribute('data-plan')||p.getAttribute('data-tier')||p.getAttribute('data-plano')||p.getAttribute('data-package'))||'');\n      var attrKey=planKey(attr);if(attrKey)return attrKey;\n      var text=(p.innerText||p.textContent||'').replace(/\\s+/g,' ').trim();\n      var key=uniquePlan(text);\n      if(key&&/R\\$\\s*(?:9[,.]00|7[,.]50|6[,.]00)/i.test(text)&&/cr[eé]dit/i.test(text))return key;\n    }\n    return null;\n  }\n  function storePlan(key){try{window.sessionStorage.setItem('wrbtv_reseller_plan_v1',key);}catch(_){} }\n  function routeToPlan(key){storePlan(key);var u=new URL('/revendedor.html',window.location.origin);u.searchParams.set('plano',key);gtag_report_conversion(u.toString());}\n  function hrefIsReseller(href){return /\\/revendedor(?:\\.html)?\\/?(?:[?#]|$)/i.test(String(href||''))||/#(?:revenda|revendedor|reseller)\\b/i.test(String(href||''));}\n  function textIsResellerCTA(el){var text=((el.innerText||el.value||el.getAttribute('aria-label')||'')+'').toLowerCase();return /revend|revenda|cr[eé]dit|comprar|contratar|solicitar|quero|escolh|selecion|assinar|adquirir|continuar|ativar|garantir|fazer pedido|pedir plano/.test(text);}\n  function decorate(a){var key=planFromCard(a);if(!key)return;var href=a.getAttribute('href')||a.href||'';if(!hrefIsReseller(href)&&!textIsResellerCTA(a))return;var u;try{u=new URL(href,a.baseURI||window.location.href);}catch(_){u=new URL('/revendedor.html',window.location.origin);}u.pathname='/revendedor.html';u.searchParams.set('plano',key);a.href=u.toString();a.setAttribute('data-wrbtv-reseller-plan',key);}\n  function decorateAll(){Array.prototype.forEach.call(document.querySelectorAll('a[href]'),decorate);}\n  function clickedAction(event){\n    var el=event.target&&event.target.closest?event.target.closest('a[href],button,[role=\"button\"],input[type=\"button\"],input[type=\"submit\"]'):null;if(!el)return;\n    var href=el.getAttribute('href')||el.href||'';\n    var key=planFromCard(el);if(!key)return;\n    var reseller=hrefIsReseller(href)||textIsResellerCTA(el);if(!reseller)return;\n    if(el.tagName==='A'&&hrefIsReseller(href)){decorate(el);storePlan(key);return;}\n    event.preventDefault();event.stopPropagation();if(event.stopImmediatePropagation)event.stopImmediatePropagation();routeToPlan(key);\n  }\n  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',decorateAll,{once:true});else decorateAll();\n  document.addEventListener('click',trackLeadClick,true);\n  document.addEventListener('click',clickedAction,true);\n})();";

const MOBILE_CATEGORY_ICONS_CSS = "@media (max-width:1020px) {\n  .mobile-category-icons {\n    display:grid; grid-template-columns:repeat(5,minmax(0,1fr)); gap:4px;\n    width:100%; margin:18px 0 20px; padding:0; align-items:start;\n  }\n  .mobile-category-icons .mobile-category-item {\n    display:flex; min-width:0; flex-direction:column; align-items:center;\n    justify-content:flex-start; gap:7px; text-align:center;\n  }\n  .mobile-category-icons .mobile-category-icon {\n    display:grid; place-items:center; width:clamp(36px,10.5vw,47px);\n    height:clamp(36px,10.5vw,47px); border:1.8px solid currentColor;\n    border-radius:50%; box-sizing:border-box; background:rgba(2,8,20,.26);\n  }\n  .mobile-category-icons svg {\n    display:block; width:63%; height:63%; fill:none; stroke:currentColor;\n    stroke-width:2.4; stroke-linecap:round; stroke-linejoin:round;\n  }\n  .mobile-category-icons .tone-red { color:#ff3158; box-shadow:0 0 13px rgba(255,49,88,.13); }\n  .mobile-category-icons .tone-blue { color:#314dff; box-shadow:0 0 13px rgba(49,77,255,.15); }\n  .mobile-category-icons .tone-green { color:#05d784; box-shadow:0 0 13px rgba(5,215,132,.13); }\n  .mobile-category-icons .tone-yellow { color:#ffb000; box-shadow:0 0 13px rgba(255,176,0,.13); }\n  .mobile-category-icons .tone-purple { color:#c52eff; box-shadow:0 0 13px rgba(197,46,255,.13); }\n  .mobile-category-icons .mobile-category-label {\n    max-width:100%; min-height:2.3em; color:#f1f5ff; font-size:clamp(.61rem,2.65vw,.76rem);\n    line-height:1.18; font-weight:650; letter-spacing:-.01em; overflow-wrap:anywhere;\n    text-shadow:0 1px 5px rgba(0,0,0,.86);\n  }\n}\n@media (max-width:350px) {\n  .mobile-category-icons { gap:2px; }\n  .mobile-category-icons .mobile-category-label { font-size:.59rem; }\n}";

const MOBILE_CATEGORY_ICONS_SCRIPT = "(function () {\n  function addMobileCategoryIcons() {\n    if (!window.matchMedia || !window.matchMedia('(max-width:1020px)').matches) return;\n    if (document.querySelector('.mobile-category-icons')) return;\n    var hero = document.querySelector('.mobile-home-hero');\n    var copy = hero && hero.querySelector('.mobile-home-copy');\n    if (!hero || !copy) return;\n    var row = document.createElement('div');\n    row.className = 'mobile-category-icons';\n    row.setAttribute('role', 'list');\n    row.setAttribute('aria-label', 'Categorias de entretenimento');\n    row.innerHTML = `\n      <div class=\"mobile-category-item\" role=\"listitem\"><span class=\"mobile-category-icon tone-red\"><svg viewBox=\"0 0 48 48\" aria-hidden=\"true\"><rect x=\"8\" y=\"14\" width=\"32\" height=\"25\" rx=\"4\"/><path d=\"M15 8l5 5M33 8l-5 5M17 39v3M31 39v3\"/><path d=\"M17 21h14v10H17z\"/><path d=\"M21 25l5 4\"/></svg></span><span class=\"mobile-category-label\">Canais<br>ao vivo</span></div>\n      <div class=\"mobile-category-item\" role=\"listitem\"><span class=\"mobile-category-icon tone-blue\"><svg viewBox=\"0 0 48 48\" aria-hidden=\"true\"><circle cx=\"24\" cy=\"24\" r=\"17\"/><circle cx=\"24\" cy=\"24\" r=\"5\"/><circle cx=\"15\" cy=\"16\" r=\"2.5\"/><circle cx=\"32\" cy=\"16\" r=\"2.5\"/><circle cx=\"15\" cy=\"32\" r=\"2.5\"/><circle cx=\"32\" cy=\"32\" r=\"2.5\"/></svg></span><span class=\"mobile-category-label\">Filmes e<br>séries</span></div>\n      <div class=\"mobile-category-item\" role=\"listitem\"><span class=\"mobile-category-icon tone-green\"><svg viewBox=\"0 0 48 48\" aria-hidden=\"true\"><circle cx=\"24\" cy=\"24\" r=\"18\"/><path d=\"M19 17l5-4 7 3 2 7-5 5-8-2-3-6zM19 17l-7-2M28 28l1 9M33 23l8-3M20 26l-4 8M24 13l-1-7\"/><path d=\"M12 15l4-5 6 2M31 16l5-3 3 5M16 34l5 6 7-1M29 37l6-4 1-5\"/></svg></span><span class=\"mobile-category-label\">Esportes<br>ao vivo</span></div>\n      <div class=\"mobile-category-item\" role=\"listitem\"><span class=\"mobile-category-icon tone-yellow\"><svg viewBox=\"0 0 48 48\" aria-hidden=\"true\"><circle cx=\"24\" cy=\"24\" r=\"18\"/><circle cx=\"18\" cy=\"20\" r=\"1.7\"/><circle cx=\"30\" cy=\"20\" r=\"1.7\"/><path d=\"M15 27c2.5 5 6 7 9 7s6.5-2 9-7\"/></svg></span><span class=\"mobile-category-label\">Infantil<br>completo</span></div>\n      <div class=\"mobile-category-item\" role=\"listitem\"><span class=\"mobile-category-icon tone-purple\"><svg viewBox=\"0 0 48 48\" aria-hidden=\"true\"><rect x=\"10\" y=\"21\" width=\"28\" height=\"21\" rx=\"4\"/><path d=\"M16 21v-7a8 8 0 0 1 16 0v7\"/><circle cx=\"24\" cy=\"30\" r=\"2\"/><path d=\"M24 32v4\"/></svg></span><span class=\"mobile-category-label\">Conteúdo<br>Adulto 18+</span></div>\n    `;\n    var actions = hero.querySelector('.mobile-hero-actions');\n    if (actions && actions.parentNode === copy.parentNode) copy.parentNode.insertBefore(row, actions);\n    else if (copy.parentNode) copy.parentNode.insertBefore(row, copy.nextSibling);\n    else hero.appendChild(row);\n  }\n  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addMobileCategoryIcons, { once: true });\n  else addMobileCategoryIcons();\n  window.addEventListener('resize', function () {\n    if (window.matchMedia && window.matchMedia('(max-width:1020px)').matches) addMobileCategoryIcons();\n  });\n})();";

const WRBTV_PLAN_PRICES_SCRIPT = "(function () {\n  var observer = null;\n  function normalize(value) {\n    return String(value || '').normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').toLowerCase().replace(/\\s+/g, ' ').trim();\n  }\n  function textOf(element) {\n    return String(element && (element.innerText || element.textContent) || '');\n  }\n  function priceExists(value) {\n    return /r\\s*\\$\\s*\\d{1,3}(?:\\.\\d{3})*(?:,\\d{2}|\\.\\d{2})?/i.test(value);\n  }\n  function changePrice(card, target) {\n    var raw = String(card.textContent || '');\n    var match = /r\\s*\\$\\s*(\\d{1,3}(?:\\.\\d{3})*(?:,\\d{2}|\\.\\d{2})?)/i.exec(raw);\n    if (!match) return false;\n    var amount = match[1];\n    var start = match.index + match[0].lastIndexOf(amount);\n    var end = start + amount.length;\n    var walker = document.createTreeWalker(card, NodeFilter.SHOW_TEXT);\n    var nodes = [], node;\n    while ((node = walker.nextNode())) nodes.push(node);\n    var pos = 0, changed = false;\n    nodes.forEach(function (n) {\n      var value = n.nodeValue || '';\n      var lo = Math.max(start, pos), hi = Math.min(end, pos + value.length);\n      if (lo < hi) {\n        var from = lo - pos, to = hi - pos;\n        var replacement = amount.length === target.length ? target.slice(lo - start, hi - start) : (lo === start ? target : '');\n        n.nodeValue = value.slice(0, from) + replacement + value.slice(to);\n        changed = true;\n      }\n      pos += value.length;\n    });\n    return changed;\n  }\n  function findTitle(root, title) {\n    var want = normalize(title);\n    var all = Array.prototype.slice.call(root.querySelectorAll('*'));\n    var candidates = all.filter(function (el) {\n      return normalize(textOf(el)) === want;\n    });\n    candidates.sort(function (a, b) { return textOf(a).length - textOf(b).length; });\n    return candidates[0] || null;\n  }\n  function findCard(root, title) {\n    var titleNode = findTitle(root, title);\n    if (!titleNode) return null;\n    var node = titleNode;\n    while (node && node !== root.parentElement) {\n      var value = normalize(textOf(node));\n      if (priceExists(value) && /quero esse plano/.test(value)) return node;\n      if (node === root) break;\n      node = node.parentElement;\n    }\n    return null;\n  }\n  function removeIds(element) {\n    element.removeAttribute('id');\n    Array.prototype.forEach.call(element.querySelectorAll('[id]'), function (child) { child.removeAttribute('id'); });\n  }\n  function setBadge(card, text) {\n    var nodes = [card].concat(Array.prototype.slice.call(card.querySelectorAll('*')));\n    var badge = nodes.filter(function (el) {\n      var value = normalize(textOf(el));\n      return value.length < 60 && (/mais acessivel/.test(value) || /plano adulto/.test(value));\n    }).sort(function (a, b) { return textOf(a).length - textOf(b).length; })[0];\n    if (badge) badge.textContent = text;\n  }\n  function setDescription(card, description) {\n    var ps = Array.prototype.slice.call(card.querySelectorAll('p')).filter(function (p) {\n      return normalize(textOf(p)).length && !priceExists(textOf(p));\n    });\n    if (ps.length) ps[0].textContent = description;\n  }\n  function branchUnder(root, card) {\n    var node = card;\n    while (node && node.parentElement !== root) node = node.parentElement;\n    return node && node.parentElement === root ? node : null;\n  }\n  function pathFrom(root, node) {\n    var path = [];\n    while (node && node !== root) {\n      if (!node.parentElement) return null;\n      path.unshift(Array.prototype.indexOf.call(node.parentElement.children, node));\n      node = node.parentElement;\n    }\n    return node === root ? path : null;\n  }\n  function followPath(root, path) {\n    var node = root;\n    for (var i = 0; i < path.length; i++) node = node && node.children[path[i]];\n    return node || null;\n  }\n  function apply() {\n    if (document.querySelector('[data-wrbtv-price-fix-v4=\"done\"]')) return true;\n    // Não depende de #planos: identifica a seção pelos títulos que aparecem na tela.\n    var root = document.querySelector('#planos');\n    var semTitle = 'Mensal sem conteúdo adulto';\n    var comTitle = 'Mensal com conteúdo adulto';\n    var semCard = root ? findCard(root, semTitle) : null;\n    var comCard = root ? findCard(root, comTitle) : null;\n    if (!semCard || !comCard) {\n      root = document.body;\n      semCard = findCard(root, semTitle);\n      comCard = findCard(root, comTitle);\n    }\n    if (!semCard || !comCard || semCard === comCard) return false;\n\n    // Separa os cartões existentes do ancestral comum, inclusive se houver wrappers extras.\n    var common = semCard.parentElement;\n    while (common && !common.contains(comCard)) common = common.parentElement;\n    if (!common || common === semCard || common === comCard) return false;\n    var semBranch = branchUnder(common, semCard);\n    var comBranch = branchUnder(common, comCard);\n    if (!semBranch || !comBranch || semBranch === comBranch) return false;\n    var semPath = pathFrom(semBranch, semCard);\n    var comPath = pathFrom(comBranch, comCard);\n    if (!semPath || !comPath) return false;\n\n    var fastSemBranch = semBranch.cloneNode(true);\n    var fastComBranch = comBranch.cloneNode(true);\n    removeIds(fastSemBranch);\n    removeIds(fastComBranch);\n    var fastSem = followPath(fastSemBranch, semPath);\n    var fastCom = followPath(fastComBranch, comPath);\n    if (!fastSem || !fastCom) return false;\n\n    setBadge(semCard, 'Genial');\n    setBadge(comCard, 'Genial');\n    changePrice(semCard, '30,00');\n    changePrice(comCard, '35,00');\n    setDescription(semCard, 'Entretenimento para curtir com tranquilidade. Até 2 telas.');\n    setDescription(comCard, 'Conteúdo adulto restrito a maiores de 18 anos. Até 2 telas.');\n\n    setBadge(fastSem, 'Fast');\n    setBadge(fastCom, 'Fast');\n    changePrice(fastSem, '35,00');\n    changePrice(fastCom, '40,00');\n    setDescription(fastSem, 'Muito mais conteúdo e atualizações mais frequentes. Até 2 telas.');\n    setDescription(fastCom, 'Muito mais conteúdo e atualizações mais frequentes. Conteúdo adulto restrito a maiores de 18 anos. Até 2 telas.');\n    fastSemBranch.setAttribute('data-wrbtv-fast-plan', 'sem-adulto');\n    fastComBranch.setAttribute('data-wrbtv-fast-plan', 'com-adulto');\n\n    // Layout em duas colunas no desktop e uma no celular.\n    var grid = document.getElementById('wrbtv-price-grid-v4');\n    if (!grid) {\n      grid = document.createElement('style');\n      grid.id = 'wrbtv-price-grid-v4';\n      grid.textContent = '.wrbtv-price-grid-v4{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:18px!important}.wrbtv-price-grid-v4>*{min-width:0}@media(max-width:760px){.wrbtv-price-grid-v4{grid-template-columns:1fr!important;gap:14px!important}}';\n      (document.head || document.documentElement).appendChild(grid);\n    }\n    common.classList.add('wrbtv-price-grid-v4');\n    comBranch.insertAdjacentElement('afterend', fastSemBranch);\n    fastSemBranch.insertAdjacentElement('afterend', fastComBranch);\n    common.setAttribute('data-wrbtv-price-fix-v4', 'done');\n    if (observer) observer.disconnect();\n    return true;\n  }\n  function run() {\n    if (!apply() && !observer && document.documentElement && window.MutationObserver) {\n      observer = new MutationObserver(function () { apply(); });\n      observer.observe(document.documentElement, { childList: true, subtree: true });\n    }\n  }\n  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run, { once: true });\n  else run();\n  window.addEventListener('load', run, { once: true });\n})();";

function resolveAsset(pathname) {
  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return null;
  }

  if (decoded === "/" || decoded === "/index.html") return "index.html";
  if (decoded === "/revendedor.html") return "revendedor.html";
  if (decoded === "/og-preview-v3.jpg") return "wrbtv-og-preview-v3.jpg";

  if (decoded.startsWith("/assets/")) {
    const name = decoded.slice("/assets/".length);
    if (!name || name.includes("/") || name.includes(String.fromCharCode(92)) || name === "." || name === "..") {
      return null;
    }
    if (name === "wrbtv-share.png") return "home-reference.png";
    return ALLOWED_FILES.has(name) && (name.endsWith(".png") || name.endsWith(".jpg")) ? name : null;
  }

  return null;
}

function enhanceHtml(html, asset, requestUrl) {
  const isReseller = asset === "revendedor.html";
  const canonical = isReseller
    ? "https://wrbtv.com.br/revendedor.html"
    : "https://wrbtv.com.br/";
  const title = isReseller
    ? "WRB-TV | Programa de Revendedores"
    : "WRB-TV | Entretenimento sem limites";
  const description = isReseller
    ? "Conheça o programa de revendedores WRB-TV e saiba como fazer parte."
    : "Canais ao vivo, filmes, séries, esportes e entretenimento em vários dispositivos. Acesse a WRB-TV e solicite seu teste gratuito.";
  const shareImage = "https://wrbtv.com.br/assets/wrbtv-social-preview.jpg?rev=20261019e";
  const requestHost = requestUrl && new URL(requestUrl).hostname === "www.wrbtv.com.br" ? "www.wrbtv.com.br" : "wrbtv.com.br";
  const shareUrl = "https://" + requestHost + (isReseller ? "/revendedor.html" : "/");

  // Remove stale Open Graph/Twitter tags from bundled HTML so the intended image is authoritative.
  html = html.replace(/<meta\b[^>]*>/gi, function (tag) {
    const lower = tag.toLowerCase();
    const isOg = lower.includes('property="og:') || lower.includes("property='og:");
    const isTwitter = lower.includes('name="twitter:') || lower.includes("name='twitter:");
    return isOg || isTwitter ? "" : tag;
  });

  const metadata = [
    '<link rel="canonical" href="' + canonical + '">',
    '<link rel="icon" type="image/png" href="https://wrbtv.com.br/assets/wrbtv-logo.png">',
    '<link rel="apple-touch-icon" href="https://wrbtv.com.br/assets/wrbtv-logo.png">',
    '<meta property="og:locale" content="pt_BR">',
    '<meta property="og:type" content="website">',
    '<meta property="og:site_name" content="WRB-TV">',
    '<meta property="og:url" content="' + canonical + '">',
    '<meta property="og:title" content="' + title + '">',
    '<meta property="og:description" content="' + description + '">',
    '<meta property="og:image" content="' + shareImage + '">',
    '<meta property="og:image:url" content="' + shareImage + '">',
    '<meta property="og:image:secure_url" content="' + shareImage + '">',
    '<meta property="og:image:alt" content="WRB-TV: entretenimento premium, canais ao vivo, filmes e séries">',
    '<meta property="og:image:type" content="image/jpeg">',
    '<meta property="og:image:width" content="1200">',
    '<meta property="og:image:height" content="630">',
    '<meta name="twitter:card" content="summary_large_image">',
    '<meta name="twitter:title" content="' + title + '">',
    '<meta name="twitter:description" content="' + description + '">',
    '<meta name="twitter:image" content="' + shareImage + '">',
    '<meta name="twitter:image:alt" content="WRB-TV: entretenimento premium, canais ao vivo, filmes, séries e esportes">'
  ].join(NL);

  const headClose = html.toLowerCase().lastIndexOf("</head>");
  if (headClose >= 0) {
    html = html.slice(0, headClose) + metadata + NL + html.slice(headClose);
  }

  // Google Ads tag: aplicada a todas as páginas HTML servidas pelo Worker.
  // Desktop e mobile usam o mesmo HTML responsivo. A checagem evita duplicação.
  if (!html.includes("AW-18385692852")) {
    const googleAdsTag = [
      '<!-- Google tag (gtag.js) -->',
      '<script async src="https://www.googletagmanager.com/gtag/js?id=AW-18385692852"></script>',
      '<script>',
      '  window.dataLayer = window.dataLayer || [];',
      '  function gtag(){dataLayer.push(arguments);}',
      "  gtag('js', new Date());",
      "  gtag('config', 'AW-18385692852');",
      '</script>'
    ].join(NL);
    const googleTagHeadClose = html.toLowerCase().lastIndexOf("</head>");
    if (googleTagHeadClose >= 0) {
      html = html.slice(0, googleTagHeadClose) + googleAdsTag + NL + html.slice(googleTagHeadClose);
    }
  }

  if (asset === "index.html" && !html.includes("wrbtv-mobile-premium-v7")) {
    const mobileStyleBlock = '<style id="wrbtv-mobile-premium-v7">' + NL + MOBILE_PREMIUM_CSS + NL + '</style>';
    const mobileHeadClose = html.toLowerCase().lastIndexOf("</head>");
    if (mobileHeadClose >= 0) {
      html = html.slice(0, mobileHeadClose) + mobileStyleBlock + NL + html.slice(mobileHeadClose);
    }
  }
  if (asset === "index.html" && !html.includes("wrbtv-mobile-menu-script-v1")) {
    const menuScriptBlock = '<script id="wrbtv-mobile-menu-script-v1">' + MOBILE_MENU_SCRIPT + '</script>';
    const bodyClose = html.toLowerCase().lastIndexOf("</body>");
    if (bodyClose >= 0) {
      html = html.slice(0, bodyClose) + menuScriptBlock + NL + html.slice(bodyClose);
    }
  }
  if (asset === "revendedor.html" && !html.includes("wrbtv-credit-quantity-script-v10")) {
    const creditScriptBlock = '<script id="wrbtv-credit-quantity-script-v10">' + RESELLER_CREDIT_SCRIPT + '</script>';
    const resellerBodyClose = html.toLowerCase().lastIndexOf("</body>");
    if (resellerBodyClose >= 0) {
      html = html.slice(0, resellerBodyClose) + creditScriptBlock + NL + html.slice(resellerBodyClose);
    }
  }
  if (asset === "index.html" && !html.includes("wrbtv-mobile-category-icons-style-v1")) {
    const iconStyleBlock = '<style id="wrbtv-mobile-category-icons-style-v1">' + MOBILE_CATEGORY_ICONS_CSS + '</style>';
    const iconHeadClose = html.toLowerCase().lastIndexOf("</head>");
    if (iconHeadClose >= 0) {
      html = html.slice(0, iconHeadClose) + iconStyleBlock + NL + html.slice(iconHeadClose);
    }
  }
  if (asset === "index.html" && !html.includes("wrbtv-mobile-category-icons-script-v1")) {
    const iconScriptBlock = '<script id="wrbtv-mobile-category-icons-script-v1">' + MOBILE_CATEGORY_ICONS_SCRIPT + '</script>';
    const iconBodyClose = html.toLowerCase().lastIndexOf("</body>");
    if (iconBodyClose >= 0) {
      html = html.slice(0, iconBodyClose) + iconScriptBlock + NL + html.slice(iconBodyClose);
    }
  }
  if (asset === "index.html" && !html.includes("wrbtv-reseller-plan-link-script-v3")) {
    const planLinkBlock = '<script id="wrbtv-reseller-plan-link-script-v3">' + RESELLER_PLAN_LINK_SCRIPT + '</script>';
    const planLinkBodyClose = html.toLowerCase().lastIndexOf("</body>");
    if (planLinkBodyClose >= 0) { html = html.slice(0, planLinkBodyClose) + planLinkBlock + NL + html.slice(planLinkBodyClose); }
  }
  if (asset === "index.html" && !html.includes("wrbtv-plan-prices-v4")) {
    const pricesScriptBlock = '<script id="wrbtv-plan-prices-v4">' + WRBTV_PLAN_PRICES_SCRIPT + '</script>';
    const pricesBodyClose = html.toLowerCase().lastIndexOf("</body>");
    if (pricesBodyClose >= 0) {
      html = html.slice(0, pricesBodyClose) + pricesScriptBlock + NL + html.slice(pricesBodyClose);
    }
  }
  return html;
}

function contentType(name) {
  if (name.endsWith(".html")) return "text/html; charset=utf-8";
  if (name.endsWith(".png")) return "image/png";
  if (name.endsWith(".jpg") || name.endsWith(".jpeg")) return "image/jpeg";
  return "application/octet-stream";
}

export default {
  async fetch(request) {
    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method Not Allowed", {
        status: 405,
        headers: { "Allow": "GET, HEAD", "Content-Type": "text/plain; charset=utf-8" }
      });
    }

    const url = new URL(request.url);
    if (url.hostname === "www.wrbtv.com.br") {
      const canonicalUrl = new URL(url.toString());
      canonicalUrl.hostname = "wrbtv.com.br";
      return Response.redirect(canonicalUrl.toString(), 301);
    }
    const asset = resolveAsset(url.pathname);
    if (!asset) {
      return new Response("Página não encontrada", {
        status: 404,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "X-Content-Type-Options": "nosniff",
          "Cache-Control": "no-store"
        }
      });
    }

    try {
      const isSocialPreview = asset === "wrbtv-social-preview.jpg" || asset === "wrbtv-og-preview-v3.jpg";
      const upstreamAsset = isSocialPreview ? "home-reference.png" : asset;
      const upstreamUrl = RELEASE_BASE + encodeURIComponent(upstreamAsset);
      const upstream = await fetch(upstreamUrl, {
        method: request.method,
        redirect: "follow",
        cf: {
          cacheEverything: true,
          cacheTtl: asset.endsWith(".html") ? 120 : 86400,
          ...(isSocialPreview ? {
            image: {
              width: 1200,
              height: 630,
              fit: "cover",
              format: "jpeg",
              quality: 70
            }
          } : {})
        }
      });

      if (!upstream.ok) {
        return new Response("Não foi possível carregar um arquivo do site WRB-TV.", {
          status: 502,
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "no-store",
            "X-Content-Type-Options": "nosniff"
          }
        });
      }

      let responseBody = request.method === "HEAD" ? null : upstream.body;
      if (request.method === "GET" && asset.endsWith(".html")) {
        responseBody = enhanceHtml(await upstream.text(), asset, url.toString());
      }

      const headers = new Headers({
        "Content-Type": contentType(asset),
        "X-Content-Type-Options": "nosniff",
        "Referrer-Policy": "strict-origin-when-cross-origin",
        "Cache-Control": asset.endsWith(".html")
          ? "public, max-age=0, s-maxage=0, must-revalidate"
          : "public, max-age=86400, s-maxage=86400"
      });
      return new Response(responseBody, { status: 200, headers });
    } catch {
      return new Response("O site WRB-TV está temporariamente indisponível. Tente novamente em instantes.", {
        status: 502,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-store",
          "X-Content-Type-Options": "nosniff"
        }
      });
    }
  }
};