/**
 * Pesquisa documental online: 18 de Setembro de 2026.
 * Versão editorial para revisão pela Administração do Distrito.
 * Compatível com DistrictTimeline.tsx e LeadershipSection.tsx já entregues.
 *
 * Fontes e limitações:
 * - História: perfil distrital, secção 2.1, em cópia pública no Scribd.
 *   O original do Portal do Governo não ficou acessível nesta pesquisa.
 * - Reconstrução: relatos das próprias organizações executoras.
 * - Liderança: publicações indexadas do Governo distrital e do Conselho
 *   Executivo Provincial de Sofala, cruzadas com imprensa local de 2026.
 *   O Facebook não permitiu leitura integral; os excertos indexados
 *   identificam o nome e o cargo. Não equivalem a um despacho de nomeação.
 * - Não se confundem o administrador distrital e o presidente municipal.
 * - Não foram acrescentados nomes de directores sem confirmação recente.
 */

export type HistoricalMilestone = {
  id: string;
  date: string;
  title: string;
  description: string;
  source: string;
  sourceUrl?: string;
};

export type DistrictLeader = {
  id: string;
  name: string;
  role: string;
  description?: string;
  photo?: string;
  source: string;
  sourceUrl?: string;
};

export const historicalMilestones: HistoricalMilestone[] = [
  {
    id: 'vila-machado',
    date: 'Período colonial',
    title: 'Ferrovia e formação da povoação',
    description:
      'A construção ferroviária trouxe trabalhadores de diferentes regiões e contribuiu para a formação da povoação. O perfil distrital regista as antigas designações Bambo Krick e Vila Machado.',
    source: 'Perfil do Distrito de Nhamatanda, secção 2.1 — cópia documental',
    sourceUrl: 'https://pt.scribd.com/document/793690203/Nhamatanda',
  },
  {
    id: 'criacao-distrito-1980',
    date: '1980',
    title: 'Elevação à categoria de distrito',
    description:
      'A reorganização administrativa da província de Sofala elevou o então posto administrativo à categoria de distrito, segundo o perfil distrital. Este marco refere-se ao distrito, e não à criação da vila ou do município.',
    source: 'Perfil do Distrito de Nhamatanda, secção 2.1 — cópia documental',
    sourceUrl: 'https://pt.scribd.com/document/793690203/Nhamatanda',
  },
  {
    id: 'idai-2019',
    date: '2019',
    title: 'Idai e reassentamento das comunidades',
    description:
      'O ciclone Idai atingiu Nhamatanda e outras zonas de Sofala. Entre as comunidades afectadas estavam famílias de Nhafimbe, posteriormente reassentadas em Muda, onde foram construídas novas infraestruturas escolares.',
    source: 'ActionAid Moçambique — publicação de 2 de Junho de 2023',
    sourceUrl: 'https://mozambique.actionaid.org/pt-pt/news/2023/governo-de-nhamatanda-inaugura-salas-de-aula-e-casas-de-professores-construidas-pela',
  },
  {
    id: 'casas-ndeja-2022',
    date: '7 de Dezembro de 2022',
    title: 'Primeiras casas entregues em Ndeja',
    description:
      'A Fundação Tzu Chi entregou as primeiras 12 casas da Aldeia do Grande Amor de Ndeja, no distrito de Nhamatanda, no âmbito da recuperação das famílias afectadas pelo Idai.',
    source: 'Fundação Tzu Chi — relato da entrega de habitações em Ndeja',
    sourceUrl: 'https://global.tzuchi.org/tzu-chi-delivers-12-first-houses-at-great-love-village-mozambique',
  },
  {
    id: 'escola-muda-2023',
    date: '1 de Junho de 2023',
    title: 'Reforço das condições de ensino em Muda',
    description:
      'Foram inauguradas três salas de aula, duas casas para professores, dois balneários e um bloco administrativo na Escola Básica Antigos Combatentes, com apoio da ActionAid.',
    source: 'ActionAid Moçambique — publicação de 2 de Junho de 2023',
    sourceUrl: 'https://mozambique.actionaid.org/pt-pt/news/2023/governo-de-nhamatanda-inaugura-salas-de-aula-e-casas-de-professores-construidas-pela',
  },
  {
    id: 'apresentacao-administrador-2025',
    date: '26 de Junho de 2025',
    title: 'Apresentação do novo administrador',
    description:
      'Manuel Moreno Teixeira Jardim foi apresentado publicamente como novo administrador de Nhamatanda. A comunicação provincial destacou o fortalecimento do sector agrícola entre as prioridades transmitidas.',
    source: 'Conselho Executivo Provincial de Sofala — publicação de 26 de Junho de 2025',
    sourceUrl: 'https://www.facebook.com/CEPSOFALA/posts/1139835018185208/',
  },
];

export const districtLeaders: DistrictLeader[] = [
  {
    id: 'manuel-moreno-teixeira-jardim',
    name: 'Manuel Moreno Teixeira Jardim',
    role: 'Administrador do Distrito de Nhamatanda',
    description:
      'Apresentado publicamente como administrador em Junho de 2025 e identificado no exercício do cargo em publicações de 2026. Informação recolhida em fontes públicas, pendente de confirmação institucional.',
    source: 'Governo do Distrito de Nhamatanda — publicação pública indexada em 2026',
    sourceUrl: 'https://www.facebook.com/61557454743845/photos/122280874826248491/',
    // Acrescente apenas quando tiver a fotografia correcta e autorizada:
     photo: '/images/Adm.jpg',
  },
];

// Deixar vazio até confirmação directa: o componente apresenta
// "Informação confirmada em ...", o que não deve significar apenas pesquisa web.
export const leadershipVerifiedAt = '';

// Metadados para revisão editorial; não são mostrados pelos componentes actuais.
export const institutionalResearch = {
  reviewedAt: '2026-09-18',
  status: 'Pesquisa online — aguarda validação institucional',
  leadershipCorroboration: [
    {
      source: 'Conselho Executivo Provincial de Sofala',
      date: '2025-06-26',
      url: 'https://www.facebook.com/CEPSOFALA/posts/1139835018185208/',
      note: 'Excerto indexado identifica a apresentação pública; não foi lido despacho de nomeação.',
    },
    {
      source: 'Jornal Profundus',
      date: '2026-07-17',
      url: 'https://profundusmz.com/jardim-na-lama-quando-deixamos-gabinete-para-o-terreno/',
      note: 'Artigo de opinião lido integralmente: corrobora nome e exercício do cargo. Elogios, vida pessoal e afirmações promocionais não foram transpostos. A referência temporal à posse é ambígua; não foi usada para datar a nomeação.',
    },
    {
      source: 'Jornal Profundus',
      date: '2025-06-26',
      url: 'https://profundusmz.com/acidente-de-viacao-mata-3-e-fere-outros-17-passageiros-em-nhamatanda/',
      note: 'Excerto indexado menciona apresentação pública de Manuel Moreno Teixeira Jardim; a página integral não ficou acessível.',
    },
  ],
  pendingConfirmation: [
    'Nome completo, grafia oficial, manutenção no cargo e fotografia oficial do administrador.',
    'Data e despacho de nomeação/posse. A apresentação pública em 26/06/2025 não prova a data da posse.',
    'Composição actual dos serviços distritais e respectivos responsáveis. Há notícia indexada de posse de quadros em 08/05/2026; não reutilizar automaticamente nomes de 2023.',
    'Documento original que fundamenta a elevação a distrito em 1980.',
    'Data de criação/elevação da vila e evolução dos topónimos. Não foi assumido 1898, 1938 ou 1975 como data administrativa exacta sem documento suficiente.',
    'Selecção institucional dos marcos: a cronologia é uma proposta editorial, não uma história exaustiva.',
  ],
};
