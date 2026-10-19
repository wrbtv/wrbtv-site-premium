# WRB-TV Site Premium

Nova versão independente do site comercial WRB-TV, reformulada a partir da exportação da Lovable com foco em conversão, navegação responsiva e apresentação premium.

## O que contém

- Carrossel cinematográfico de três destaques, controles manuais e avanço automático.
- Identidade visual WRB-TV em SVG local, paleta azul/ciano/vermelho e profundidade 3D discreta.
- Vitrine visual, compatibilidade de dispositivos, planos, revenda com calculadora de créditos e FAQ.
- Formulários de teste grátis e assinatura que encaminham uma mensagem preparada ao WhatsApp **+55 88 99648-4494**.
- Planos mensais: R$ 30,00 sem conteúdo adulto e R$ 35,00 com conteúdo 18+, ambos com 2 telas.
- Revenda: Bronze R$ 9,00 (10–49 créditos), Prata R$ 7,50 (50–99) e Ouro R$ 6,00 (100+).
- Site estático em `public/`, servido pelo recurso Cloudflare Workers Static Assets através de `wrangler.toml`.

## Publicação de teste na interface Cloudflare que já está aberta

A interface mostrada pelo painel oferece um projeto **Worker** com Git integrado. Para aproveitar essa tela, o repositório já contém `wrangler.toml` e `src/index.js` configurados para servir os arquivos estáticos do diretório `public/`.

Use estes valores na tela **Set up your application**:

- **Repository:** `wrbtv/wrbtv-site-premium`
- **Project name:** `wrbtv-site-premium`
- **Build command:** deixe vazio
- **Deploy command:** `npx wrangler deploy`
- **Preview command:** deixe o padrão `npx wrangler preview`
- **Enable Preview builds:** pode permanecer ligado
- **Protect with Cloudflare Access:** deixe desligado, para a prévia poder ser aberta sem login

Depois clique **Deploy**. O resultado esperado é um endereço temporário em `workers.dev`. O Git integrado pode publicar commits posteriores automaticamente; confirme a configuração de builds do repositório após a primeira implantação.

## Limites de segurança da migração

- Este é um projeto Cloudflare novo e independente.
- Não conecte o domínio próprio na fase de teste.
- Não altere Workers, Pages, DNS ou repositórios de outros projetos.
- Não altere os aplicativos WRB-TV Windows, Android, Linux, macOS, iPhone ou Smart TV.

## Fluxos comerciais

O site não processa pagamentos e não armazena os formulários. Ao enviar um formulário, o navegador monta uma mensagem e abre o WhatsApp para o cliente revisar e enviar. A equipe deve confirmar condições, disponibilidade e instruções de contratação durante o atendimento.
