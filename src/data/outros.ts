// Projetos de nuvem e DevOps, sites para clientes e trajetória.
// Tudo aqui foi conferido nos READMEs dos repositórios ou no perfil do LinkedIn.

const GITHUB = 'https://github.com/marcusvilanova'

export interface ProjetoNuvem {
  nome: string
  contexto: string
  resumo: string
  /** Caminho da requisição até o dado, na ordem em que acontece. */
  topologia: string[]
  stack: string[]
  repositorio: string
}

export const PROJETOS_NUVEM: ProjetoNuvem[] = [
  {
    nome: 'Zelo',
    contexto: 'Challenge FIAP 2026 · com a CLYVO VET · equipe de 5',
    resumo:
      'Cuidado contínuo para pets: triagem que combina PLN, para interpretar o relato do tutor, com regras que decidem quando o caso vai para um veterinário. A IA não diagnostica nem prescreve.',
    topologia: ['App React Native', 'APIs Java/Spring e .NET', 'Triagem: PLN + regras', 'Oracle'],
    stack: ['Java', 'Spring Boot', 'ASP.NET Core', 'React Native', 'Oracle PL/SQL', 'Docker', 'Azure ACR + ACI'],
    repositorio: `${GITHUB}/ZeloPet_challenge_2026`,
  },
  {
    nome: 'O.D.I.N.',
    contexto: 'Global Solution FIAP 2026/1',
    resumo: 'API de missões orbitais e alertas de risco de colisão com detritos espaciais, publicada numa VM Linux no Azure.',
    topologia: ['IP público', 'VM Ubuntu no Azure', 'Docker Compose', 'API Spring Boot', 'MySQL'],
    stack: ['Java', 'Spring Boot', 'MySQL', 'Docker Compose', 'Azure VM'],
    repositorio: `${GITHUB}/O.D.I.N-DEVOPS`,
  },
  {
    nome: 'DimDim · App Service',
    contexto: 'Checkpoint 5 · DevOps Tools & Cloud Computing',
    resumo: 'Cadastro de clientes e atendimentos implantado no Azure App Service, com Azure SQL e telemetria no Application Insights. Build com 28 testes.',
    topologia: ['Azure App Service', 'Java web', 'Azure SQL', 'Application Insights'],
    stack: ['Java', 'Spring Boot', 'Azure App Service', 'Azure SQL', 'Application Insights', 'Maven'],
    repositorio: `${GITHUB}/checkPoint_05_Devops`,
  },
  {
    nome: 'DimDim · contêineres',
    contexto: 'Checkpoint 4 · DevOps Tools & Cloud Computing',
    resumo: 'API e banco em contêineres no Azure, criados por Azure CLI, com usuário não-root e dados persistidos no Azure Storage.',
    topologia: ['Azure Container Registry', 'Azure Container Instances', 'API Spring Boot', 'MySQL + Azure Storage'],
    stack: ['Java', 'Docker', 'Azure CLI', 'ACR', 'ACI', 'MySQL'],
    repositorio: `${GITHUB}/CP_04_Devops`,
  },
]

export interface SiteCliente {
  nome: string
  para: string
  resumo: string
  stack: string[]
  noAr: string
  repositorio: string
}

export const SITES_CLIENTES: SiteCliente[] = [
  {
    nome: 'Bia Gremion',
    para: 'Modelo plus size, maquiadora e influenciadora',
    resumo: 'Página única com 14 seções, rolagem suave, animações por rolagem e carregamento sob demanda das seções abaixo da dobra.',
    stack: ['React', 'TypeScript', 'Vite', 'GSAP', 'Lenis', 'Sass'],
    noAr: 'https://portifolio-bia-gremion.vercel.app',
    repositorio: `${GITHUB}/portfolio-bia-gremion`,
  },
  {
    nome: 'Kaique Fontiny',
    para: 'Social media, direção criativa e audiovisual',
    resumo: 'Site estático sem build: preloader, revelações por rolagem, contadores, parallax e contato por WhatsApp.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Vercel'],
    noAr: 'https://site-kaique-fontiny.vercel.app',
    repositorio: `${GITHUB}/site_kaique_fontiny`,
  },
]

export interface MarcoDaTrajetoria {
  periodo: string
  onde: string
  oQue: string
}

export const TRAJETORIA: MarcoDaTrajetoria[] = [
  {
    periodo: '2020 – 2022',
    onde: 'Hospital Municipal Dr. Moysés Deutsch · parceria Einstein',
    oQue: 'Ouvidoria: reclamações e denúncias, mediação de conflitos e indicadores de produção no BI para a gerência.',
  },
  {
    periodo: '2022 – 2024',
    onde: 'Fábricas de Cultura',
    oQue: 'Recepção, monitoria e pedagógico: inscrições, cancelamentos e listas de espera, com liderança de equipe.',
  },
  {
    periodo: '2025',
    onde: 'Desenvolvimento e Inovação em Tecnologia',
    oQue: 'Entrada na equipe de tecnologia da sede.',
  },
  {
    periodo: 'mai. 2025 – hoje',
    onde: 'Analista de Desenvolvimento de Sistemas',
    oQue: 'Aplicações com IA generativa para compras, TI, pessoas e programas culturais.',
  },
]

export const FORMACAO = [
  'Análise e Desenvolvimento de Sistemas · FIAP',
  'Técnico em Administração · Etec Jardim Ângela',
  'Agentes Autônomos (Agentic AI) · FIAP',
  'AI Fluency: Framework and Foundations · Anthropic',
  'Business Management & IT Services · FIAP',
]

export const CONTATO = {
  linkedin: 'https://www.linkedin.com/in/marcus-vin%C3%ADcius-vila-nova/',
  github: GITHUB,
}

/** Currículo em PDF, servido de public/. */
export const CURRICULO = '/curriculo-marcus-vinicius-vila-nova.pdf'

// Resumo profissional da seção "Sobre", no texto do Marcus, sem o nome da organização em que trabalha.
export const RESUMO = {
  trajetoria: [
    'Comecei a carreira na ouvidoria de um hospital público municipal, em parceria com o Einstein. Atendia reclamações e denúncias, mediava situações de conflito e preparava os indicadores de produção que a gerência acompanhava no BI.',
    'Em 2022 fui para as Fábricas de Cultura, programa cultural nos bairros periféricos de São Paulo, Diadema, Osasco e Iguape. Em dois anos e meio passei pela recepção, pela monitoria e pelo administrativo da unidade do Capão Redondo, cuidei de inscrições, cancelamentos e listas de espera e assumi posições de liderança nas equipes de recepção e monitoria.',
    'Em 2025, fui convidado pela diretoria da organização que gere o programa para a equipe de desenvolvimento tecnológico. Hoje sou Analista de Desenvolvimento de Sistemas Pleno.',
  ],
  construido: [
    'Agente conversacional que ajuda a criar e acompanhar Termos de Referência de compras, com function calling, 11 ferramentas de consulta e proteção contra prompt injection.',
    'Assistente de indicadores em Python (FastAPI): o modelo interpreta a pergunta e uma camada semântica gera o SQL. O LLM não escreve consulta nem calcula valores.',
    'Camada de IA multi-provedor (Anthropic, Gemini e OpenAI), com escolha de modelo por tarefa e registro de cada chamada, e automações em n8n integradas por API.',
  ],
  comoTrabalho:
    'Uso IA no desenvolvimento (Claude Code com agentes, skills e servidores MCP) e dentro dos sistemas, com o mesmo princípio nos dois casos: o modelo interpreta e redige; as regras do sistema validam, calculam e decidem. Vejo a IA como parceira de pensamento, com o julgamento humano no centro.',
  tecnologias: [
    'Python',
    'FastAPI',
    'TypeScript',
    'Next.js',
    'React',
    'SQL',
    'PostgreSQL',
    'pgvector',
    'Redis',
    'APIs REST',
    'n8n',
    'Claude',
    'Gemini',
    'Llama',
    'GitHub Actions',
    'Playwright',
  ],
  formacao: [
    'Análise e Desenvolvimento de Sistemas · FIAP',
    'Técnico em Administração · Etec Jardim Ângela',
    'Agentes Autônomos (Agentic AI) · FIAP',
    'AI Fluency · Anthropic',
  ],
}
