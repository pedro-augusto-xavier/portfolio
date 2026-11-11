import type { IconName } from './Icon'
import seo from './seo.json'

const pt = {
  meta: seo.pt,
  a11y: {
    skip: 'Pular para o conteúdo',
    nav: 'Seções',
    language: 'Idioma',
    toDark: 'Usar tema escuro',
    toLight: 'Usar tema claro',
    newTab: '(abre em nova aba)',
    top: 'Voltar ao topo',
    home: 'Início',
    zoom: 'Ampliar imagem',
    resume: 'Baixar currículo',
    photo: 'Foto de Pedro Xavier',
    close: 'Fechar',
  },
  nav: { about: 'Sobre', skills: 'Tecnologias', work: 'Projetos', services: 'Serviços', contact: 'Contato' },
  hero: {
    greeting: 'whoami',
    title: 'Pedro Xavier',
    roles: ['desenvolvedor full stack', 'estudante de Sistemas de Informação', 'estagiário de TI', 'desenvolvedor freelancer'],
    lead: 'Sites, sistemas e suporte de TI em Nova Friburgo e região.',
    primary: 'Ver projetos',
    secondary: 'Entrar em contato',
    email: 'E-mail',
  },
  whatsappMessage: 'Oi, Pedro! Vi seu site e queria conversar.',
  emailSubject: 'Contato pelo site',
  about: {
    heading: 'Sobre mim',
    intro: ['Olá, eu sou o ', 'Pedro', ' — crio soluções para a web e garanto que todos possam utilizá-las.'],
    paragraphs: [
      'Atualmente sou estagiário de TI na Styllus Semijoias. Sou do suporte de TI e também trabalho no site e nos sistemas internos. Crio scripts escaláveis com Python, JavaScript e PHP. Meu foco está em backend, com Python, FastAPI e PostgreSQL. Fora do estágio, faço freelas de desenvolvimento para empresas e instituições, principalmente com Python, TypeScript, React, FastAPI, Fastify e PostgreSQL.',
      'Eu faço graduação em Sistemas de Informação no CEFET/RJ. Aprendi por conta própria Python, PostgreSQL e HTML — desenvolvendo projetos para empresas. Gosto de fazer sistemas que se encaixam no jeito que as pessoas já trabalham.',
    ],
    quote: '✨ Mais do que código que funciona, quero criar coisas que as pessoas gostem de usar.',
    code: [
      { key: 'cidade', value: ['Nova Friburgo, RJ'] },
      { key: 'trabalho', value: ['Estagiário de TI na Styllus Semijoias'] },
      { key: 'estudo', value: ['Sistemas de Informação, CEFET/RJ'] },
      { key: 'idiomas', value: ['português', 'inglês avançado'] },
      { key: 'aberto', value: ['vagas remotas', 'projetos freelance'] },
    ],
    cards: [
      { icon: 'study', title: 'Sistemas de Informação', place: 'CEFET/RJ', detail: 'Desde 2026' },
      {
        icon: 'work',
        title: 'Estagiário de TI',
        place: 'Styllus Semijoias',
        detail: 'Desde maio de 2026. Suporte e desenvolvimento do site e dos sistemas internos.',
      },
      {
        icon: 'work',
        title: 'Desenvolvedor freelancer',
        place: 'Empresas e instituições',
        detail: 'Sites e sistemas sob medida.',
      },
      {
        icon: 'wrench',
        title: 'Suporte de TI e manutenção',
        place: 'Nova Friburgo e região',
        detail: 'Conserto e manutenção de computador, rede, impressora e suporte no dia a dia.',
      },
      { icon: 'language', title: 'Idiomas', place: 'Português e inglês', detail: 'Português nativo, inglês avançado.' },
    ] satisfies { icon: IconName; title: string; place: string; detail: string }[],
  },
  education: {
    heading: 'Formação',
    lead: 'Onde estudei e os cursos que fiz por fora.',
    done: 'Concluído',
    current: 'Em andamento',
    items: [
      { year: '2023', title: 'Ensino médio', place: 'Colégio Anchieta, Nova Friburgo', done: true },
      { year: '2023', title: 'Inglês (Standard English)', place: 'Cultura Inglesa', done: true },
      { year: '2025', title: 'Introduction to Programming Using Python', place: 'Senac RJ', done: true },
      { year: '2025', title: 'Introduction to Programming Using Python', place: 'Firjan SENAI', done: true },
      { year: '2026 – atual', title: 'Bacharelado em Sistemas de Informação', place: 'CEFET/RJ', done: false },
    ],
  },
  skills: {
    heading: 'Tecnologias',
    lead: 'Um conjunto de ferramentas que eu uso para a criação de aplicações web modernas, acessíveis e escaláveis.',
    groups: [
      { name: 'Frontend', items: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS', 'Vite'] },
      { name: 'Backend', items: ['Python', 'FastAPI', 'Node.js', 'Fastify', 'PHP'] },
      { name: 'Banco de dados', items: ['PostgreSQL', 'SQL', 'SQLAlchemy', 'Drizzle ORM'] },
      { name: 'Ferramentas', items: ['Git', 'GitHub', 'Docker', 'Vercel'] },
      { name: 'Testes e CI', items: ['pytest', 'Vitest', 'Testing Library', 'GitHub Actions'] },
    ],
  },
  work: {
    heading: 'Projetos',
    lead: 'Uma seleção de projetos que mostram minhas habilidades em desenvolvimento full stack e resolução de problemas.',
    code: 'Código',
    site: 'Ver site',
    emporio: {
      title: 'Empório Gigi Prado',
      kind: 'Site e sistema de reservas para um restaurante em Mury, Nova Friburgo.',
      body: 'Fiz o site e a API por trás dele. O cliente escolhe o dia e o número de pessoas, vê só os horários com lugar e recebe o código da reserva na hora. A dona cozinha e não tem tempo de ficar olhando um painel, então a reserva se confirma sozinha e chega no WhatsApp dela. O cardápio segue a ordem do impresso e tem busca que ignora acentos.',
      alt: 'Página inicial do site do Empório Gigi Prado',
    },
    casa: {
      title: 'Sistema para casa espírita',
      kind: 'Sistema web de gestão com login e controle de acesso.',
      body: 'Troca as fichas de papel de uma casa espírita por um histórico digital e pesquisável: pessoas, atendimentos, tratamentos, grupos e agenda. O operador faz os cadastros. O administrador também gerencia usuários, consulta a auditoria de quem alterou o quê e atende pedidos da LGPD, como exportar ou anonimizar os dados de alguém. Está em uso no dia a dia da casa.',
      note: 'Tela com dados fictícios.',
      alt: 'Lista de pessoas cadastradas no sistema, com busca e filtro por papel',
    },
  },
  services: {
    heading: 'Serviços em Nova Friburgo',
    lead: 'Atendo empresas e pessoas da cidade e da região.',
    groups: [
      {
        name: 'Sites',
        items: [
          { name: 'Site para empresa', desc: 'Quem você é, o que faz e como falar com você.' },
          { name: 'Manutenção de site', desc: 'Ajustes, correções e páginas novas em sites que já existem.' },
        ],
      },
      {
        name: 'Sistemas',
        items: [
          { name: 'Sistema sob medida', desc: 'Feito para a rotina do seu negócio.' },
          { name: 'Sistemas internos', desc: 'Melhorias e correções em sistemas que a empresa já usa.' },
        ],
      },
      {
        name: 'Computadores e TI',
        items: [
          {
            name: 'Manutenção de computador',
            desc: 'Formatação, limpeza, troca de peças, upgrade de SSD e memória.',
          },
          { name: 'Suporte de TI', desc: 'Rede e Wi-Fi, impressora, instalação de programas, backup.' },
        ],
      },
    ],
  },
  contact: {
    heading: 'Contato',
    lead: 'Tem um projeto, uma vaga ou um computador dando problema? Me chama.',
    whatsapp: 'Enviar pelo WhatsApp',
    email: 'Enviar por e-mail',
    name: 'Nome',
    namePlaceholder: 'Seu nome',
    message: 'Mensagem',
    messagePlaceholder: 'Sua mensagem...',
    from: 'Mensagem de',
    emailField: 'E-mail',
    emailPlaceholder: 'seu.email@exemplo.com',
  },
  bot: {
    open: 'Abrir o robô de respostas',
    hintTitle: 'Dúvidas sobre o Pedro?',
    hintText: 'Clique aqui para conversar 💬',
    close: 'Fechar',
    title: 'Assistente do Pedro',
    subtitle: 'Online · respostas prontas',
    hello: 'Oi! Sou o assistente do Pedro. Pergunte sobre as habilidades, a experiência ou os projetos dele!',
    placeholder: 'Pergunte algo sobre o Pedro...',
    tryAsking: 'Tente perguntar:',
    reset: 'Recomeçar a conversa',
    send: 'Enviar',
    fallback:
      'Essa eu não sei responder. Só conheço o que está neste site. Tente uma das perguntas abaixo ou fale direto com o Pedro.',
    whatsapp: 'Chamar no WhatsApp',
    email: 'Mandar e-mail',
    topics: [
      {
        q: 'Quem é o Pedro?',
        keywords: ['quem'],
        a: 'Pedro Augusto Xavier é desenvolvedor full stack em Nova Friburgo, RJ. É estagiário de TI na Styllus Semijoias desde maio de 2026, faz freelas de desenvolvimento e estuda Sistemas de Informação no CEFET/RJ.',
        action: '',
      },
      {
        q: 'Quais tecnologias ele usa?',
        keywords: ['tecnologia', 'stack', 'linguagem', 'python', 'react', 'typescript', 'php', 'sql', 'usa', 'ferramenta', 'sabe'],
        a: 'Python, PHP, SQL, TypeScript, JavaScript, React, FastAPI, Fastify, PostgreSQL, Git, HTML e CSS.',
        action: '',
      },
      {
        q: 'Que projetos ele fez?',
        keywords: ['projeto', 'portfolio', 'trabalhos', 'emporio', 'restaurante', 'casa', 'espirita', 'fez'],
        a: 'Dois estão neste site. O Empório Gigi Prado é o site e o sistema de reservas de um restaurante em Mury. O outro é um sistema de gestão para uma casa espírita, com login e controle de acesso, em uso no dia a dia.',
        action: '',
      },
      {
        q: 'Ele faz site para empresa?',
        keywords: ['site', 'sistema', 'empresa', 'orcamento', 'preco', 'quanto', 'custa', 'cobra', 'valor', 'contrat', 'freela'],
        a: 'Faz sites e sistemas sob medida. O valor depende do projeto, então o melhor é contar o que você precisa e pedir um orçamento.',
        action: 'whatsapp',
      },
      {
        q: 'Ele conserta computador?',
        keywords: ['computador', 'conserto', 'conserta', 'manutencao', 'formatar', 'formatacao', 'suporte', 'impressora', 'wifi', 'rede', 'notebook', 'pc'],
        a: 'Sim, em Nova Friburgo e região: formatação, limpeza, troca de peças, upgrade de SSD e memória, rede e Wi-Fi, impressora, instalação de programas e backup.',
        action: 'whatsapp',
      },
      {
        q: 'Está aberto a vagas?',
        keywords: ['vaga', 'emprego', 'contratando', 'remoto', 'remota', 'exterior', 'fora', 'recrutador', 'ingles', 'idioma'],
        a: 'Sim. Ele tem interesse em vagas remotas e em projetos freelance. Fala português nativo e inglês avançado.',
        action: 'email',
      },
      {
        q: 'Como falo com ele?',
        keywords: ['contato', 'falar', 'falo', 'whatsapp', 'email', 'telefone', 'linkedin', 'github', 'onde', 'mora'],
        a: 'Pelo WhatsApp ou por e-mail. Ele mora em Nova Friburgo, RJ, e os links do LinkedIn e do GitHub estão na seção Contato.',
        action: 'whatsapp',
      },
    ],
  },
  footer: {
    name: 'Pedro vem de pedra. Xavier vem do basco etxeberri, casa nova.',
    legal: '© 2026 Pedro Augusto Xavier',
    built: 'Feito com',
  },
}

export type Dict = typeof pt

const en: Dict = {
  meta: seo.en,
  a11y: {
    skip: 'Skip to content',
    nav: 'Sections',
    language: 'Language',
    toDark: 'Use dark theme',
    toLight: 'Use light theme',
    newTab: '(opens in a new tab)',
    top: 'Back to top',
    home: 'Home',
    zoom: 'Enlarge image',
    resume: 'Download résumé',
    photo: 'Photo of Pedro Xavier',
    close: 'Close',
  },
  nav: { about: 'About', skills: 'Skills', work: 'Projects', services: 'Services', contact: 'Contact' },
  hero: {
    greeting: 'whoami',
    title: 'Pedro Xavier',
    roles: ['full stack developer', 'Information Systems student', 'IT intern', 'freelance developer'],
    lead: 'Websites, systems and IT support in and around Nova Friburgo, Brazil.',
    primary: 'See my work',
    secondary: 'Get in touch',
    email: 'Email',
  },
  whatsappMessage: 'Hi Pedro! I saw your website and would like to talk.',
  emailSubject: 'Contact from your website',
  about: {
    heading: 'About me',
    intro: ["Hi, I'm ", 'Pedro', ' — I build solutions for the web and make sure everyone can use them.'],
    paragraphs: [
      "I'm currently an IT intern at Styllus Semijoias. I'm part of IT support and I also work on the website and the internal systems. I write scalable scripts in Python, JavaScript and PHP. My focus is on backend, with Python, FastAPI and PostgreSQL. Outside the internship I take freelance development work for companies and institutions, mostly with Python, TypeScript, React, FastAPI, Fastify and PostgreSQL.",
      "I'm doing a degree in Information Systems at CEFET/RJ. I taught myself Python, PostgreSQL and HTML — building projects for companies. I like building systems that fit the way people already work.",
    ],
    quote: '✨ I want more than code that works: I want to build things people enjoy using.',
    code: [
      { key: 'city', value: ['Nova Friburgo, Brazil'] },
      { key: 'work', value: ['IT intern at Styllus Semijoias'] },
      { key: 'studies', value: ['Information Systems, CEFET/RJ'] },
      { key: 'languages', value: ['Portuguese', 'advanced English'] },
      { key: 'openTo', value: ['remote roles', 'freelance projects'] },
    ],
    cards: [
      { icon: 'study', title: 'Information Systems', place: 'CEFET/RJ', detail: 'Since 2026' },
      {
        icon: 'work',
        title: 'IT intern',
        place: 'Styllus Semijoias',
        detail: 'Since May 2026. Support and development of the website and internal systems.',
      },
      {
        icon: 'work',
        title: 'Freelance developer',
        place: 'Companies and institutions',
        detail: 'Websites and custom systems.',
      },
      {
        icon: 'wrench',
        title: 'IT support and repair',
        place: 'Nova Friburgo area',
        detail: 'Computer repair and maintenance, networks, printers and day-to-day support.',
      },
      {
        icon: 'language',
        title: 'Languages',
        place: 'Portuguese and English',
        detail: 'Native Portuguese, advanced English.',
      },
    ],
  },
  education: {
    heading: 'Education',
    lead: 'Where I studied and the courses I took on the side.',
    done: 'Completed',
    current: 'In progress',
    items: [
      { year: '2023', title: 'High school', place: 'Colégio Anchieta, Nova Friburgo', done: true },
      { year: '2023', title: 'English (Standard English)', place: 'Cultura Inglesa', done: true },
      { year: '2025', title: 'Introduction to Programming Using Python', place: 'Senac RJ', done: true },
      { year: '2025', title: 'Introduction to Programming Using Python', place: 'Firjan SENAI', done: true },
      { year: '2026 – present', title: "Bachelor's in Information Systems", place: 'CEFET/RJ', done: false },
    ],
  },
  skills: {
    heading: 'Skills',
    lead: 'A set of tools I use to build modern, accessible and scalable web applications.',
    groups: [
      { name: 'Frontend', items: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS', 'Vite'] },
      { name: 'Backend', items: ['Python', 'FastAPI', 'Node.js', 'Fastify', 'PHP'] },
      { name: 'Database', items: ['PostgreSQL', 'SQL', 'SQLAlchemy', 'Drizzle ORM'] },
      { name: 'Tools & platforms', items: ['Git', 'GitHub', 'Docker', 'Vercel'] },
      { name: 'Testing & CI', items: ['pytest', 'Vitest', 'Testing Library', 'GitHub Actions'] },
    ],
  },
  work: {
    heading: 'Projects',
    lead: 'A selection of projects that show my skills in full stack development and problem solving.',
    code: 'Code',
    site: 'Visit site',
    emporio: {
      title: 'Empório Gigi Prado',
      kind: 'Website and booking system for a restaurant in Mury, Nova Friburgo.',
      body: 'I built the site and the API behind it. Guests pick a day and party size, see only the times that still have a table, and get a booking code right away. The owner is the cook and has no time to watch a dashboard, so bookings confirm themselves and land on her WhatsApp. The menu follows the printed one and has a search that ignores accents.',
      alt: 'Home page of the Empório Gigi Prado website',
    },
    casa: {
      title: 'System for a spiritist center',
      kind: 'Web management system with login and access control.',
      body: "Replaces a spiritist center's paper records with a searchable digital history: people, visits, treatments, groups and a calendar. Operators handle the records. Admins also manage users, check the audit log of who changed what, and handle data requests under Brazil's privacy law (LGPD), such as exporting or anonymizing someone's data. It's in daily use at the center.",
      note: 'Screen shows fictional data.',
      alt: 'List of people registered in the system, with search and a role filter',
    },
  },
  services: {
    heading: 'Services in Nova Friburgo',
    lead: 'I work with businesses and people in the city and nearby.',
    groups: [
      {
        name: 'Websites',
        items: [
          { name: 'Business website', desc: 'Who you are, what you do and how to reach you.' },
          { name: 'Website maintenance', desc: 'Tweaks, fixes and new pages for sites that already exist.' },
        ],
      },
      {
        name: 'Systems',
        items: [
          { name: 'Custom system', desc: 'Built around how your business runs.' },
          { name: 'Internal systems', desc: 'Improvements and fixes to systems the company already uses.' },
        ],
      },
      {
        name: 'Computers and IT',
        items: [
          {
            name: 'Computer repair',
            desc: 'Clean installs, cleaning, part replacement, SSD and memory upgrades.',
          },
          { name: 'IT support', desc: 'Network and Wi-Fi, printers, software installation, backups.' },
        ],
      },
    ],
  },
  contact: {
    heading: 'Get in touch',
    lead: 'Hiring, or have a project in mind? Write to me.',
    whatsapp: 'Send on WhatsApp',
    email: 'Send by email',
    name: 'Name',
    namePlaceholder: 'Your name',
    message: 'Message',
    messagePlaceholder: 'Your message...',
    from: 'Message from',
    emailField: 'Email',
    emailPlaceholder: 'your.email@example.com',
  },
  bot: {
    open: 'Open the answers bot',
    hintTitle: 'Questions about Pedro?',
    hintText: 'Click here to chat 💬',
    close: 'Close',
    title: "Pedro's Assistant",
    subtitle: 'Online · canned answers',
    hello: "Hi! I'm Pedro's assistant. Ask me about his skills, experience or projects!",
    placeholder: 'Ask me anything about Pedro...',
    tryAsking: 'Try asking:',
    reset: 'Restart the conversation',
    send: 'Send',
    fallback:
      "I can't answer that one. I only know what's on this site. Try one of the questions below or talk to Pedro directly.",
    whatsapp: 'Message on WhatsApp',
    email: 'Send an email',
    topics: [
      {
        q: 'Who is Pedro?',
        keywords: ['who'],
        a: 'Pedro Augusto Xavier is a full stack developer in Nova Friburgo, Brazil. He has been an IT intern at Styllus Semijoias since May 2026, takes freelance development work and studies Information Systems at CEFET/RJ.',
        action: '',
      },
      {
        q: 'What does he work with?',
        keywords: ['tech', 'stack', 'language', 'python', 'react', 'typescript', 'php', 'sql', 'skill', 'tool', 'work with'],
        a: 'Python, PHP, SQL, TypeScript, JavaScript, React, FastAPI, Fastify, PostgreSQL, Git, HTML and CSS.',
        action: '',
      },
      {
        q: 'What has he built?',
        keywords: ['project', 'portfolio', 'built', 'emporio', 'restaurant', 'spiritist', 'made'],
        a: 'Two projects are on this site. Empório Gigi Prado is the website and booking system of a restaurant in Mury. The other is a management system for a spiritist center, with login and access control, in daily use.',
        action: '',
      },
      {
        q: 'Does he build business websites?',
        keywords: ['website', 'site', 'system', 'business', 'quote', 'price', 'cost', 'charge', 'much', 'hire', 'freelance'],
        a: 'He builds websites and custom systems. The price depends on the project, so the best way is to describe what you need and ask for a quote.',
        action: 'whatsapp',
      },
      {
        q: 'Does he repair computers?',
        keywords: ['computer', 'repair', 'fix', 'support', 'printer', 'wifi', 'network', 'laptop', 'pc'],
        a: 'Yes, in and around Nova Friburgo: clean installs, cleaning, part replacement, SSD and memory upgrades, network and Wi-Fi, printers, software installation and backups.',
        action: 'whatsapp',
      },
      {
        q: 'Is he open to job offers?',
        keywords: ['job', 'role', 'hiring', 'remote', 'abroad', 'relocate', 'recruiter', 'english', 'position', 'open'],
        a: 'Yes. He is interested in remote roles and in freelance projects. He speaks native Portuguese and advanced English.',
        action: 'email',
      },
      {
        q: 'How do I reach him?',
        keywords: ['contact', 'reach', 'talk', 'whatsapp', 'email', 'phone', 'linkedin', 'github', 'where', 'live'],
        a: 'By email or WhatsApp. He lives in Nova Friburgo, Brazil, and the LinkedIn and GitHub links are in the Contact section.',
        action: 'email',
      },
    ],
  },
  footer: {
    name: 'Pedro comes from the word for stone. Xavier comes from the Basque etxeberri, new house.',
    legal: '© 2026 Pedro Augusto Xavier',
    built: 'Built with',
  },
}

export const dictionaries = { pt, en }
export type Lang = keyof typeof dictionaries

export const langPath: Record<Lang, string> = { pt: seo.pt.path, en: seo.en.path }
export const htmlLang: Record<Lang, string> = { pt: seo.pt.lang, en: seo.en.lang }

export function langFromPath(pathname: string): Lang {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'pt'
}
