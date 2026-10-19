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

const MOBILE_PREMIUM_CSS = `@media (max-width:1020px) {
  html { min-height:100%; background:#030713 !important; scroll-padding-top:82px; }
  body { min-height:100vh; padding-top:76px !important; position:relative; isolation:isolate; background:transparent !important; overflow-x:clip !important; }
  body::before {
    content:""; position:fixed; inset:0; z-index:-1; pointer-events:none;
    background-image:linear-gradient(180deg,rgba(2,7,19,.60) 0%,rgba(2,7,19,.66) 36%,rgba(2,7,19,.76) 72%,rgba(2,7,19,.86) 100%),url("/assets/home-reference.png");
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
  .mobile-nav { display:grid !important; position:fixed !important; inset:0 0 auto 0 !important; z-index:1000 !important; grid-template-columns:repeat(3,minmax(0,1fr)) !important; gap:5px !important; width:100% !important; padding:calc(5px + env(safe-area-inset-top)) 9px 7px !important; margin:0 !important; overflow:visible !important; background:rgba(2,8,19,.94) !important; border:0 !important; border-bottom:1px solid rgba(0,198,255,.24) !important; box-shadow:0 8px 22px rgba(0,0,0,.24); backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px); scrollbar-width:none !important; }
  .mobile-nav::-webkit-scrollbar { display:none !important; }
  .mobile-nav a { display:flex !important; align-items:center; justify-content:center; min-width:0; min-height:28px; padding:6px 4px !important; border:1px solid rgba(66,106,153,.48) !important; border-radius:9px !important; background:rgba(10,25,46,.88) !important; color:#f5f9ff !important; font-size:clamp(.68rem,2.8vw,.78rem) !important; font-weight:750; line-height:1.15; text-align:center; white-space:normal !important; overflow-wrap:anywhere; }
  .mobile-nav a:active,.mobile-nav a:focus-visible { outline:none; border-color:#00d9ff !important; background:linear-gradient(110deg,#00bde8,#075bff) !important; }
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
  .mobile-nav { grid-template-columns:repeat(6,minmax(0,1fr)) !important; gap:6px !important; padding:calc(6px + env(safe-area-inset-top)) 12px 7px !important; }
  .mobile-nav a { min-height:31px; font-size:.78rem !important; }
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
      '<meta property="og:image" content="https://wrbtv.com.br/assets/home-reference.png">',
      '<meta property="og:image:secure_url" content="https://wrbtv.com.br/assets/home-reference.png">',
      '<meta property="og:image:type" content="image/png">',
      '<meta property="og:image:width" content="1672">',
      '<meta property="og:image:height" content="941">',
      '<meta name="twitter:card" content="summary_large_image">',
      '<meta name="twitter:title" content="' + title + '">',
      '<meta name="twitter:description" content="' + description + '">',
      '<meta name="twitter:image" content="https://wrbtv.com.br/assets/home-reference.png">'
    ].join(NL);
    const headClose = html.toLowerCase().lastIndexOf("</head>");
    if (headClose >= 0) html = html.slice(0, headClose) + metadata + NL + html.slice(headClose);
  }

  if (asset === "index.html" && !html.includes("wrbtv-mobile-premium-v2")) {
    const mobileStyleBlock = '<style id="wrbtv-mobile-premium-v2">' + NL + MOBILE_PREMIUM_CSS + NL + '</style>';
    const headClose = html.toLowerCase().lastIndexOf("</head>");
    if (headClose >= 0) {
      html = html.slice(0, headClose) + mobileStyleBlock + NL + html.slice(headClose);
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