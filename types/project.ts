export type Projeto = {
  slug: string;
  titulo: string;
  categoria: "Investimento Privado" | "PPP";
  setor: string;
  fase: string;
  localizacao: string;
  imagem: string;
  resumo: string;
  potencial: string;
  vantagensDoDistrito: string;
  criteriosDeAvaliacao: string[];
  comoSubmeter: string;
  tipoPPP?: string; // "Concessão", "Parceria", "Outros" — pode reaproveitar tipoInvestimento
  duracaoContrato?: string;
  dataPrevistaLancamento?: string;
  progresso?: number; // 0-100
  etapasProgresso?: EtapaProgresso[];
  beneficios?: Beneficio[];
  parceiros?: Parceiro[];
  descricaoCompleta?: string[]; // parágrafos extra, atrás do "Ver mais"
  coordenadas?: { lat: number; lng: number };
  contacto: {
    nome: string;
    email: string;
    telefone: string;


  };
  // Campos novos, para a página de detalhe — opcionais, com fallback no componente
  publicadoEm?: string;
  promotor?: string;
  tipoInvestimento?: string;
  estado?: string;
  areaTerreno?: string;
  investimentoEstimado?: string;
  modeloInvestimento?: string;
  prazoEstimado?: string;
  empregosDiretos?: number;
  empregosIndiretos?: number;
  galeria?: string[];

  descricaoDetalhada?: string[]; // parágrafos de "Sobre o Projeto"
  alinhamentoEstrategico?: string;
  porQueInvestir?: string[];
  detalhesProjeto?: DetalheProjeto[];
  documentos?: DocumentoProjeto[];
};


export type DetalheProjeto = {
  titulo: string;
  descricao: string;
  icone: "infraestruturaPrevista" | "servicosPrevistos" | "infraestruturaExistente" | "estagioAtual" | "documentos";
};
export type DocumentoProjeto = {
  nome: string;
  tipo: string; // ex: "PDF"
  tamanho: string; // ex: "1.2 MB"
  url: string;
};
export type EtapaProgresso = {
  nome: string;
  estado: "concluido" | "em-andamento" | "pendente";
};

export type Parceiro = {
  nome: string;
  papel: string;
  estado?: string; // ex: "Em negociação"
};

export type Beneficio = {
  titulo: string;
  descricao: string;
  icone: "trendingUp" | "briefcase" | "shield" | "home";
};




