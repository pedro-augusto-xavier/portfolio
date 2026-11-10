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
- `src/config.ts`: contatos e links de projeto.
- `src/App.tsx`: a página inteira (barra, início, sobre, tecnologias, projetos, serviços, contato, rodapé).
- `src/Bot.tsx`: robô de respostas prontas, sem IA e sem backend. Casa palavras-chave da pergunta com os tópicos de `bot.topics` no dicionário; só responde com fatos do site. Um chat com IA de verdade exigiria um servidor para guardar a chave.
- `src/Icon.tsx`: ícones SVG inline (sem biblioteca).
- `src/styles.css`: tokens de cor nos dois temas em `:root` e `:root[data-theme='light']`. O tema é aplicado por um script inline no `index.html` antes da primeira pintura (escuro, a não ser que o sistema do visitante peça tema claro; a escolha manual fica salva em `localStorage`).
- Animações (texto digitado, entradas ao rolar, hover) ficam dentro de `prefers-reduced-motion: no-preference`. As entradas só escondem conteúdo quando a classe `js` está no `<html>`.

## Direção visual

O Pedro pediu que o site siga o estilo e a estrutura de `heymufi.com`: fundo escuro azulado, destaque roxo, tudo centralizado, cartões com borda, títulos de cartão em fonte monoespaçada entre chaves, texto digitado no início. O código é próprio; não copiar código, textos nem imagens do site de referência. Uma primeira direção (nome gigante nos cantos, paleta pedra e azul) foi descartada por ele.

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
- `VITE_SITE_URL` no `.env` é o endereço público (sem barra no final). `public/og.png` é a imagem de prévia de link (1200x630).

## Pendências

Falta trocar `VITE_SITE_URL` no `.env` pelo domínio real; o build avisa enquanto estiver com o valor provisório.

## Ambiente

Windows 11, Node 26, npm 11. Repositório git local, ainda sem remoto. Não instalar skills novas.
