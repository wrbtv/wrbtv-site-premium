# WRB-TV Premium Site

Deploy do site aprovado para o Cloudflare Worker `wrbtv-site-premium`.

- Entrada HTTP: `/` e `/index.html`
- Página de revenda: `/revendedor.html`
- O Worker serve a versão homologada da release pública `wrbtv-site-premium` e resolve os arquivos de imagem usados pelo HTML.
- O Worker limita caminhos públicos aos arquivos do site e aplica cache para HTML e imagens.
- O conteúdo de origem aprovado está preservado nos assets da release: https://github.com/wrbtv/wrbtv-site-premium/releases/tag/wrbtv-site-premium
