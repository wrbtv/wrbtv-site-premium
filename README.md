# WRB-TV Site Premium

Rebuild independente do site comercial WRB-TV a partir do projeto exportado da Lovable. O site fica em `public/` e usa arquivos estáticos, sem dependência de runtime da Lovable.

## Publicação de teste na Cloudflare Pages
1. No painel Cloudflare: Workers & Pages → Create application → Pages → Connect to Git.
2. Selecione somente `wrbtv/wrbtv-site-premium`.
3. Production branch: `main`.
4. Build command: `exit 0`.
5. Build output directory: `public`.
6. Conclua a implantação. A Cloudflare fornecerá um endereço de teste `*.pages.dev` e publicará automaticamente os próximos commits deste repositório.

Não conecte o domínio próprio nem altere outros projetos até validar a prévia. Os pedidos de teste e assinatura são encaminhados ao WhatsApp para que a pessoa revise e envie a mensagem; o site não processa pagamentos.
