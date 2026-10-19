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

const MOBILE_PREMIUM_CSS = `/* Mobile/tablet: use exatamente a arte hero aprovada do desktop. */
@media (max-width:1020px) {
  .hero {
    display: block !important;
    position: relative !important;
    width: 100% !important;
    height: auto !important;
    overflow: hidden !important;
    line-height: 0 !important;
    background: #02040a !important;
  }
  .mobile-home-hero {
    display: none !important;
  }
  .mobile-nav {
    display: none !important;
  }
  .hero-img {
    display: block !important;
    width: 100% !important;
    height: auto !important;
    aspect-ratio: 1672 / 941 !important;
    object-fit: contain !important;
    object-position: center !important;
  }
  .hero-caption {
    display: none !important;
  }
  .hero .hotspot {
    display: block !important;
    position: absolute !important;
    z-index: 3 !important;
    min-width: 20px;
    min-height: 24px;
    background: transparent !important;
    border-radius: 5px !important;
  }
  .hero .hotspot.home-nav { left: 28%; top: 2%; width: 4.2%; height: 5.3%; }
  .hero .hotspot.experience-nav { left: 33%; top: 2%; width: 7.4%; height: 5.3%; }
  .hero .hotspot.devices-nav { left: 41%; top: 2%; width: 7.3%; height: 5.3%; }
  .hero .hotspot.plans-nav { left: 48.9%; top: 2%; width: 5.2%; height: 5.3%; }
  .hero .hotspot.reseller-nav { left: 55.3%; top: 2%; width: 6.5%; height: 5.3%; }
  .hero .hotspot.doubts-nav { left: 62.8%; top: 2%; width: 5.9%; height: 5.3%; }
  .hero .hotspot.trial-top { left: 77.3%; top: 1.5%; width: 16.2%; height: 6.8%; min-width: 44px; min-height: 28px; }
  .hero .hotspot.trial-main { left: 5.1%; top: 65%; width: 18.7%; height: 6.3%; min-height: 30px; }
  .hero .hotspot.plans-main { left: 24.7%; top: 65%; width: 10.2%; height: 6.3%; min-width: 38px; min-height: 30px; }
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

  if (asset === "index.html" && !html.includes("wrbtv-mobile-premium-v1")) {
    const styleClose = html.toLowerCase().indexOf("</style>");
    if (styleClose >= 0) {
      const mobileStyles = NL + "/* wrbtv-mobile-premium-v1 */" + NL + MOBILE_PREMIUM_CSS + NL;
      html = html.slice(0, styleClose) + mobileStyles + html.slice(styleClose);
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