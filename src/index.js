const RELEASE_BASE = "https://github.com/wrbtv/wrbtv-site-premium/releases/download/wrbtv-site-premium/";
const NL = String.fromCharCode(10);
const ALLOWED_FILES = new Set([
  "index.html",
  "revendedor.html",
  "home-reference.png",
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
  .mobile-home-hero h1 { max-width:17ch; margin:12px 0 14px !important; text-align:left; font-size:clamp(2.1rem,7.8vw,3.1rem) !important; line-height:1.04 !important; letter-spacing:-.045em !important; text-wrap:balance; text-shadow:0 2px 18px rgba(0,0,0,.22); }
  .mobile-home-copy { max-width:42rem; margin:0 !important; color:#d1dced !important; font-size:clamp(1rem,3.8vw,1.18rem) !important; line-height:1.62 !important; text-shadow:0 2px 12px rgba(0,0,0,.55); }
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
  .section-head { padding-inline:2px; margin-bottom:26px !important; text-shadow:0 2px 16px rgba(0,0,0,.42); }
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
}`;

const MOBILE_MENU_SCRIPT = "(function () {\n  function initWrbtvMobileMenu() {\n    var menu = document.querySelector('.mobile-nav');\n    if (!menu || document.getElementById('wrbtv-mobile-menu-toggle')) return;\n    if (!menu.id) menu.id = 'wrbtv-mobile-menu';\n    var button = document.createElement('button');\n    button.id = 'wrbtv-mobile-menu-toggle';\n    button.className = 'mobile-menu-toggle';\n    button.type = 'button';\n    button.setAttribute('aria-label', 'Abrir menu');\n    button.setAttribute('aria-controls', menu.id);\n    button.setAttribute('aria-expanded', 'false');\n    button.innerHTML = '<span></span><span></span><span></span>';\n    document.body.appendChild(button);\n    function closeMenu() {\n      menu.classList.remove('mobile-nav-open');\n      button.setAttribute('aria-expanded', 'false');\n      button.setAttribute('aria-label', 'Abrir menu');\n    }\n    button.addEventListener('click', function (event) {\n      event.stopPropagation();\n      var isOpen = button.getAttribute('aria-expanded') === 'true';\n      if (isOpen) closeMenu();\n      else {\n        menu.classList.add('mobile-nav-open');\n        button.setAttribute('aria-expanded', 'true');\n        button.setAttribute('aria-label', 'Fechar menu');\n      }\n    });\n    menu.addEventListener('click', function (event) {\n      if (event.target && event.target.closest && event.target.closest('a')) closeMenu();\n    });\n    document.addEventListener('click', function (event) {\n      if (!menu.contains(event.target) && !button.contains(event.target)) closeMenu();\n    });\n    document.addEventListener('keydown', function (event) {\n      if (event.key === 'Escape') { closeMenu(); button.focus(); }\n    });\n    window.addEventListener('resize', function () {\n      if (window.innerWidth > 1020) closeMenu();\n    });\n  }\n  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initWrbtvMobileMenu, { once: true });\n  else initWrbtvMobileMenu();\n})();";

function resolveAsset(pathname) {
  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return null;
  }

  if (decoded === "/" || decoded === "/index.html") return "index.html";
  if (decoded === "/revendedor.html") return "revendedor.html";

  if (decoded.startsWith("/assets/")) {
    const name = decoded.slice("/assets/".length);
    if (!name || name.includes("/") || name.includes(String.fromCharCode(92)) || name === "." || name === "..") {
      return null;
    }
    if (name === "wrbtv-share.png") return "home-reference.png";
    return ALLOWED_FILES.has(name) && name.endsWith(".png") ? name : null;
  }

  return null;
}

function enhanceHtml(html, asset) {
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

  if (!html.includes('property="og:image"')) {
    const metadata = [
      '<link rel="canonical" href="' + canonical + '">',
      '<link rel="icon" type="image/png" href="https://wrbtv.com.br/assets/wrbtv-logo.png">',
      '<link rel="apple-touch-icon" href="https://wrbtv.com.br/assets/wrbtv-logo.png">',
      '<meta property="og:type" content="website">',
      '<meta property="og:site_name" content="WRB-TV">',
      '<meta property="og:url" content="' + canonical + '">',
      '<meta property="og:title" content="' + title + '">',
      '<meta property="og:description" content="' + description + '">',
      '<meta property="og:image" content="https://wrbtv.com.br/assets/wrbtv-share.png?rev=20261019b">',
      '<meta property="og:image:secure_url" content="https://wrbtv.com.br/assets/wrbtv-share.png?rev=20261019b">',
      '<meta property="og:image:type" content="image/png">',
      '<meta property="og:image:width" content="1672">',
      '<meta property="og:image:height" content="941">',
      '<meta name="twitter:card" content="summary_large_image">',
      '<meta name="twitter:title" content="' + title + '">',
      '<meta name="twitter:description" content="' + description + '">',
      '<meta name="twitter:image" content="https://wrbtv.com.br/assets/wrbtv-share.png?rev=20261019b">'
    ].join(NL);
    const headClose = html.toLowerCase().lastIndexOf("</head>");
    if (headClose >= 0) html = html.slice(0, headClose) + metadata + NL + html.slice(headClose);
  }

  if (asset === "index.html" && !html.includes("wrbtv-mobile-premium-v3")) {
    const mobileStyleBlock = '<style id="wrbtv-mobile-premium-v3">' + NL + MOBILE_PREMIUM_CSS + NL + '</style>';
    const headClose = html.toLowerCase().lastIndexOf("</head>");
    if (headClose >= 0) {
      html = html.slice(0, headClose) + mobileStyleBlock + NL + html.slice(headClose);
    }
  }
  if (asset === "index.html" && !html.includes("wrbtv-mobile-menu-script-v1")) {
    const menuScriptBlock = '<script id="wrbtv-mobile-menu-script-v1">' + MOBILE_MENU_SCRIPT + '</script>';
    const bodyClose = html.toLowerCase().lastIndexOf("</body>");
    if (bodyClose >= 0) {
      html = html.slice(0, bodyClose) + menuScriptBlock + NL + html.slice(bodyClose);
    }
  }
  return html;
}

function contentType(name) {
  if (name.endsWith(".html")) return "text/html; charset=utf-8";
  if (name.endsWith(".png")) return "image/png";
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
      const upstream = await fetch(RELEASE_BASE + encodeURIComponent(asset), {
        method: request.method,
        redirect: "follow",
        cf: { cacheEverything: true, cacheTtl: asset.endsWith(".html") ? 120 : 86400 }
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
        responseBody = enhanceHtml(await upstream.text(), asset);
      }

      const headers = new Headers({
        "Content-Type": contentType(asset),
        "X-Content-Type-Options": "nosniff",
        "Referrer-Policy": "strict-origin-when-cross-origin",
        "Cache-Control": asset.endsWith(".html")
          ? "public, max-age=0, s-maxage=120, must-revalidate"
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