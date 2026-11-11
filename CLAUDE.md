# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## O que é

Portfólio pessoal de Pedro Augusto Xavier (Nova Friburgo, RJ), desenvolvedor full stack. Site estático (Vite + React + TypeScript, sem backend), hospedado com domínio próprio, código público em `github.com/pedro-augusto-xavier`.

## Comandos

- `npm run dev`: servidor de desenvolvimento
- `npm run build`: checagem de tipos (`tsc -b`) e build de produção
- `npm run lint`: oxlint
- `npm run preview`: serve o build

Não há testes automatizados.

## Arquitetura

- `src/i18n.ts`: todos os textos, em PT e EN. O tipo `Dict` é derivado do dicionário PT e o EN é anotado com ele, então chave faltando ou sobrando quebra o build. Sem biblioteca de i18n. O idioma vem do caminho da URL (`/` = PT, `/en/` = EN) e a troca usa `history.pushState`.
- `src/config.ts`: contatos, links de projeto e o PDF do currículo de cada idioma (`public/curriculo-pedro-xavier.pdf` e `public/resume-pedro-xavier.pdf`).
- `src/App.tsx`: a página inteira (barra, início, sobre, tecnologias, projetos, serviços, contato, rodapé).
- HTML pronto no build: o plugin `seo-pages` usa `src/entry-server.tsx` para gerar o conteúdo de `dist/index.html` e `dist/en/index.html`, e o `main.tsx` usa `hydrateRoot` em cima dele (em `npm run dev` a página nasce vazia e usa `createRoot`). O que depende do navegador (tema, `localStorage`, `window`) só pode ser lido em efeitos ou com `getServerSnapshot`, senão o HTML do build e o do navegador divergem. O tema sai do build sempre como escuro.
- `src/Bot.tsx`: robô de respostas prontas, sem IA e sem backend. Casa palavras-chave da pergunta com os tópicos de `bot.topics` no dicionário; só responde com fatos do site. Um chat com IA de verdade exigiria um servidor para guardar a chave.
- `src/Icon.tsx`: ícones SVG inline (sem biblioteca).
- `src/styles.css`: tokens de cor nos dois temas em `:root` e `:root[data-theme='light']`. O tema é aplicado por um script inline no `index.html` antes da primeira pintura (escuro, a não ser que o sistema do visitante peça tema claro; a escolha manual fica salva em `localStorage`).
- Animações (texto digitado, entradas ao rolar, hover) ficam dentro de `prefers-reduced-motion: no-preference`. As entradas só escondem conteúdo quando a classe `js` está no `<html>`.

## Direção visual

A estrutura se inspira em `heymufi.com` (tudo centralizado, cartões com borda, texto digitado no início, robô no canto), mas o site foi diferenciado de propósito para não parecer cópia: destaque verde-esmeralda (a serra de Nova Friburgo) em vez de roxo, título com o nome ("Pedro Xavier") sob um prompt `$ whoami`, e títulos de cartão como comentário de código (`// Frontend`). O código é próprio; não copiar código, textos nem imagens do site de referência. Uma primeira direção (nome gigante nos cantos, paleta pedra e azul) foi descartada pelo Pedro.

## Público e posicionamento

Dois públicos com o mesmo peso: cliente local de Nova Friburgo e região, e recrutador de vaga remota/internacional. A versão PT também atende recrutador. O foco principal é "desenvolvedor"; os serviços locais ficam em seção própria.

## Regras de conteúdo

- Não inventar números, clientes, resultados, depoimentos ou datas. Só entra o que o Pedro informou ou o que está nos READMEs dos repositórios dele.
- Não citar Portugal nem "trabalhar fora do Brasil": o site fala em vagas remotas e projetos freelance.
- Ficam de fora a nota do Tripadvisor do restaurante e contagens que mudam com o tempo.
- Todo texto visível existe em PT e EN, em `src/i18n.ts`.
- WhatsApp é o contato principal do público local e aparece no formulário de Contato e nas respostas do robô. O Pedro pediu para tirar o botão de orçamento da seção de Serviços.
- O significado do nome (pedra + casa nova) aparece só no rodapé.
- O sistema da casa espírita está em produção e em uso diário. O site não cita o nome da casa.

## Capturas de tela dos projetos

- Rodar os projetos localmente só com dados fictícios. Nunca conectar em banco de produção.
- No sistema da casa espírita, nenhum nome, telefone ou dado real de membro pode aparecer. Seeds usam nomes claramente fictícios ("Ana Exemplo da Silva", telefone `(00) 00000-0001`). A captura atual corta o cabeçalho com o nome da casa.
- A captura do Empório vem de `docs/screenshots/` do próprio repositório dele.

## SEO

- `src/seo.json` guarda título, descrição e dados de cada idioma; `src/i18n.ts` e o plugin `seo-pages` em `vite.config.ts` leem dali.
- O `index.html` tem marcas `{{...}}` preenchidas pelo plugin. No build ele também gera `dist/en/index.html`, `sitemap.xml` e `robots.txt`.
- `VITE_SITE_URL` no `.env` é o endereço público (sem barra no final). `public/og.png` é a imagem de prévia de link (1200x630), com a foto do Pedro.
- No build, o plugin também injeta o script do Vercel Web Analytics (`/_vercel/insights/script.js`); ele só funciona com o Analytics ligado no painel da Vercel.

## Publicação

- Repositório: `github.com/pedro-augusto-xavier/portfolio`. Cada `push` na `main` republica o site.
- Vercel: projeto `pedro-xavier`, no ar em `https://pedro-xavier.vercel.app`. A variável `VITE_SITE_URL` está definida lá para produção e preview.
- Se o Pedro registrar um domínio próprio: adicionar em Settings > Domains na Vercel e trocar `VITE_SITE_URL` (na Vercel e no `.env`).

## Pendências (em 2026-11-11)

- **Domínio do portfólio:** `pedroxavier.com.br` estava livre e foi a escolha sugerida. O Pedro vai registrar no registro.br. Depois: adicionar o domínio ao projeto `pedro-xavier` na Vercel, passar a ele os registros DNS para colar em "Editar zona" no registro.br, trocar `VITE_SITE_URL` (na Vercel e no `.env`) e republicar.
- **Google Search Console:** fazer depois do domínio, para o site aparecer na busca pelo nome.
- **Link do site** no LinkedIn, na bio do GitHub e nos dois currículos em PDF: tarefa do Pedro.
- **Domínio do Empório Gigi Prado:** sugerido registrar no nome do restaurante (CNPJ ou CPF da dona), não no do Pedro. Estavam livres `emporiogigiprado.com.br`, `gigiprado.com.br` e `emporiogigi.com.br`. Quando sair, ligar ao projeto `emporio-gigi-prado` na Vercel e trocar `projectLinks.emporioSite` em `src/config.ts`.
- **Vercel Analytics:** já ligado e funcionando no site publicado.

## Ambiente

Windows 11, Node 26, npm 11. Não instalar skills novas.
