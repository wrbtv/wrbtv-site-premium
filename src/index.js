const RELEASE_BASE = "https://github.com/wrbtv/wrbtv-site-premium/releases/download/wrbtv-site-premium/";
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

const MOBILE_PREMIUM_CSS = `
@media (max-width:760px) {
  .hero {
    overflow: hidden !important;
    background: radial-gradient(ellipse at 12% 0%, #0b2d50 0%, #030713 68%) !important;
    border-bottom: 1px solid #123254;
  }
  .mobile-home-hero {
    position: relative;
    isolation: isolate;
    padding: 24px max(18px,5vw) 22px !important;
    background: radial-gradient(ellipse at 82% 8%, #075bff20 0%, transparent 48%), radial-gradient(ellipse at 18% 0%, #00d9ff18 0%, transparent 44%);
  }
  .mobile-brand img {
    width: min(146px,40vw) !important;
    max-height: 124px !important;
    filter: drop-shadow(0 8px 22px #007dff4a) !important;
  }
  .mobile-brand .eyebrow {
    display: inline-block;
    margin-top: 4px !important;
    padding: 7px 12px;
    border: 1px solid #174d75;
    border-radius: 999px;
    background: linear-gradient(120deg, #06172b, #0a1b36);
    color: #43e7ff;
    font-size: .64rem !important;
    letter-spacing: .15em !important;
    line-height: 1.45;
  }
  .mobile-catalog {
    margin: 17px 0 16px !important;
    padding: 10px 12px !important;
    border: 1px solid #23496f !important;
    border-radius: 13px !important;
    background: linear-gradient(120deg, #0a1b31, #071225 72%) !important;
    box-shadow: inset 0 1px 0 #ffffff08, 0 8px 24px #0002;
    font-size: .68rem !important;
    letter-spacing: .055em !important;
  }
  .mobile-home-hero h1 {
    max-width: 15ch;
    margin: 16px 0 12px !important;
    font-size: clamp(2rem, 7.5vw, 2.65rem) !important;
    line-height: 1.04 !important;
    letter-spacing: -.047em !important;
    text-wrap: balance;
  }
  .mobile-home-copy {
    font-size: 1rem !important;
    line-height: 1.6 !important;
    max-width: 42rem;
  }
  .mobile-home-copy::after {
    content: "";
    display: block;
    width: 100%;
    aspect-ratio: 1.86;
    margin-top: 18px;
    border: 1px solid #1c5581;
    border-radius: 16px;
    background: url("/assets/home-reference.png") center 48% / cover no-repeat;
    box-shadow: 0 14px 36px #0008, 0 0 0 1px #00d9ff0d, inset 0 1px 0 #ffffff10;
    overflow: hidden;
  }
  .mobile-hero-actions {
    grid-template-columns: minmax(0,1.2fr) minmax(0,.8fr) !important;
    gap: 10px !important;
    margin-top: 19px !important;
  }
  .mobile-hero-actions .btn {
    min-height: 52px;
    padding: 13px 12px !important;
    border-radius: 14px !important;
    line-height: 1.25 !important;
    font-size: .9rem;
    box-shadow: 0 8px 24px #005bff30;
  }
  .mobile-hero-actions .btn.secondary {
    background: linear-gradient(145deg, #111f35, #091327) !important;
    border-color: #273e5f !important;
    box-shadow: inset 0 1px 0 #ffffff09 !important;
  }
  .mobile-perks {
    gap: 8px !important;
    margin-top: 17px !important;
  }
  .mobile-perks span {
    display: inline-flex;
    align-items: center;
    padding: 7px 10px;
    border: 1px solid #1d3857;
    border-radius: 999px;
    background: #081528d9;
    color: #c8dcf4;
    font-size: .72rem;
  }
  .mobile-nav {
    display: flex;
    gap: 8px !important;
    padding: 11px 14px !important;
    background: #030916f2 !important;
    border-bottom: 1px solid #18304d !important;
    box-shadow: 0 10px 24px #0003;
    backdrop-filter: blur(16px);
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .mobile-nav::-webkit-scrollbar { display: none; }
  .mobile-nav a {
    flex: 0 0 auto;
    padding: 10px 15px !important;
    border: 1px solid #1b385a;
    border-radius: 999px;
    background: linear-gradient(180deg, #0d1d34, #081326);
    color: #e5f1ff;
    font-size: .85rem !important;
    font-weight: 800;
    white-space: nowrap;
  }
  .mobile-nav a:first-child {
    border-color: #047dff;
    background: linear-gradient(105deg, #00c8ef, #075bff);
    box-shadow: 0 5px 18px #005bff30;
  }
}
@media (max-width:540px) {
  .mobile-home-hero { padding: 20px 18px 20px !important; }
  .mobile-brand img { width: min(138px,38vw) !important; max-height: 116px !important; }
  .mobile-catalog { font-size: .64rem !important; }
  .mobile-home-hero h1 { font-size: clamp(2rem, 8.2vw, 2.35rem) !important; }
  .mobile-home-copy::after { aspect-ratio: 1.9; background-position: center 44%; margin-top: 15px; }
  .mobile-hero-actions { grid-template-columns: 1fr !important; }
  .mobile-hero-actions .btn { min-height: 52px; font-size: .96rem; }
  .mobile-perks span { font-size: .7rem; padding: 7px 9px; }
}
`;

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
    if (!name || name.includes("/") || name.includes("\\\\") || name === "." || name === "..") {
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
    ].join("\\n");
    html = html.replace(/<\\/head>/i, metadata + "\\n</head>");
  }

  if (asset === "index.html" && !html.includes("wrbtv-mobile-premium-v1")) {
    html = html.replace(/<\\/style>/i, "\\n/* wrbtv-mobile-premium-v1 */\\n" + MOBILE_PREMIUM_CSS + "\\n</style>");
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