# WRB-TV Premium

Site comercial estático da WRB-TV, com identidade visual escura, detalhes em azul elétrico e vermelho, composição cinematográfica em 3D e layout responsivo para desktop, tablet e celular.

## O site inclui

- Hero cinematográfico com efeitos de profundidade e uso do logo oficial da WRB-TV.
- Seções de canais ao vivo, filmes, séries, manifesto de marca e dispositivos compatíveis.
- Planos mensais e formulário de solicitação via WhatsApp.
- Formulário de teste gratuito com nome, WhatsApp, origem do contato, tipo de aparelho, marca e modelo.
- Área de revenda com calculadora de créditos e três faixas de preço: Bronze R$ 9,00 (10–49 créditos), Prata R$ 7,50 (50–99) e Ouro R$ 6,00 (100+).
- FAQ, navegação móvel e formulário modal com validação, controle por teclado e opção de fechar com Esc.
- Encaminhamento de solicitações para WhatsApp **+55 88 99648-4494**. O site não coleta pagamentos nem armazena dados enviados pelos formulários.

## Valores comerciais apresentados

- Plano mensal sem conteúdo adulto: **R$ 30,00/mês**.
- Plano mensal com conteúdo adulto 18+: **R$ 35,00/mês**.
- Ambos os planos informam **2 telas simultâneas**.

## Publicação

O repositório mantém a arquitetura Cloudflare Workers Static Assets. O Worker serve diretamente os arquivos do diretório public usando src/index.js e wrangler.toml, sem etapa de compilação nem dependência de React/Vite.

Para publicar manualmente com Wrangler:

1. Autentique o Wrangler na conta Cloudflare que contém o Worker wrbtv-site-premium.
2. Execute npx wrangler deploy na raiz do repositório.
3. Confirme a URL de produção e teste os formulários e links de WhatsApp.

Se o Worker estiver conectado ao GitHub para implantação contínua, os commits em main devem iniciar uma nova implantação. Confirme o resultado na aba Deployments do Worker; o sucesso do teste de CI do GitHub não substitui a confirmação do deploy em produção.

## Testes automatizados

O workflow .github/workflows/validate.yml verifica a sintaxe do JavaScript e a presença da configuração, ativos e seções principais do site.
