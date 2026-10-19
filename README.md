# WRB-TV Site Premium

Nova versão independente do site comercial WRB-TV, iniciada com o código exportado da Lovable e reformulada com foco em conversão, navegação responsiva e apresentação premium.

## O que contém

- Carrossel cinematográfico de três destaques com avanço automático, controles acessíveis e pausa ao interagir.
- Identidade visual WRB-TV em SVG local, paleta azul/ciano/vermelho e profundidade 3D discreta.
- Vitrine visual, apresentação de dispositivos, planos mensais, revenda com calculadora de créditos e FAQ.
- Formulário de teste grátis e solicitação de assinatura com encaminhamento ao WhatsApp **+55 88 99648-4494**.
- Solicitação de revenda com estimativa: Bronze R$ 9,00 (10–49), Prata R$ 7,50 (50–99) e Ouro R$ 6,00 (100+).
- Planos preservados: R$ 30,00/mês sem conteúdo adulto e R$ 35,00/mês com conteúdo 18+, ambos com 2 telas.
- Site estático no diretório `public/`, sem runtime de servidor nem integração de pagamento.
- Imagens cinematográficas carregadas do Unsplash e fontes do Google Fonts; a publicação não depende da Lovable.

## Publicação de teste na Cloudflare Pages

1. Acesse Cloudflare → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
2. Selecione exclusivamente **`wrbtv/wrbtv-site-premium`**.
3. Configure a branch de produção como **`main`**.
4. Deixe o campo de comando de build vazio, se a interface permitir; caso exija um comando, use **`exit 0`**.
5. Defina o diretório de saída como **`public`**.
6. Conclua a implantação. A Cloudflare fornecerá um endereço de teste `*.pages.dev` e publicará novos commits automaticamente.

**Importante:** não conecte o domínio próprio durante a fase de validação. Mantenha o site atual no ar e não altere Workers, Pages, DNS nem repositórios de outros projetos. Os apps WRB-TV Windows, Android, Linux, macOS, iPhone e Smart TV não fazem parte deste repositório.

## Fluxos comerciais

O site não processa pagamento, não armazena os dados do formulário e não promete ativação automática. Ao enviar um formulário, o navegador monta uma mensagem e abre o WhatsApp para o cliente revisar e enviar. A equipe confirma condições e instruções de contratação no atendimento.

## Validação

Antes de conectar qualquer domínio, teste a navegação no celular e desktop, carrossel, abertura/fechamento do modal, validação de telefone, encaminhamento de teste/assinatura ao WhatsApp, faixas da calculadora de revenda e as rotas com fallback configurado em `public/_redirects`.
