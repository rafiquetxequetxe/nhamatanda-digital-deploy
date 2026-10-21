# nhamatanda-digital
Portal digital do Distrito de Nhamatanda - site institucional, banco de oportunidades de investimento, catálogo PPP e observatório económico. MVP em Next.js.
Documento derivado do Relatório Estratégico "Nhamatanda Digital 2027 - Estratégia Integrada de Transformação Digital, Governação Aberta e Atração de Investimento" (Julho de 2026).

## O que é

Um único portal web com quatro secções, para provar valor rapidamente antes de investir em sistemas mais complexos:

Portal Institucional - página inicial, sobre a Administração Distrital, notícias/agenda, contactos.

Portal do Investidor - banco de oportunidades de investimento com fichas técnicas padronizadas e formulário de contacto.

Observatório Económico - indicadores socioeconómicos (agricultura, população, comércio) em gráficos simples.

Catálogo de Projetos PPP - reaproveita o mesmo componente de ficha técnica do Portal do Investidor, filtrando por categoria PPP.

## Stack tecnológica
## Camada	- Ferramenta
Framework	- Next.js (React), App Router, TypeScript

Estilo	- Tailwind CSS

Conteúdo	- Ficheiros JSON/MD em content/ — sem base de dados no MVP

Formulários	- Formspree

Hospedagem	- Hostinger (domínio e SSL já contratados)

## Estrutura do Projeto
```
nhamatanda-digital/
│
├── app/
│   ├── layout.tsx                 → Layout principal
│   ├── page.tsx                   → Página Inicial
│   ├── globals.css
│   │
│   ├── sobre/
│   │   └── page.tsx               → Administração e Organograma
│   │
│   ├── noticias/
│   │   ├── page.tsx               → Lista de notícias
│   │   └── [slug]/
│   │       └── page.tsx           → Notícia individual
│   │
│   ├── contactos/
│   │   └── page.tsx
│   │
│   ├── investidor/
│   │   ├── page.tsx               → Banco de Projetos
│   │   └── [slug]/
│   │       └── page.tsx           → Projeto individual
│   │
│   ├── ppp/
│   │   └── page.tsx               → Parcerias Público-Privadas
│   │
│   ├── observatorio/
│   │   └── page.tsx               → Dashboard económico
│   │
│   └── api/
│       └── contact/
│           └── route.ts           → API (caso deixe de usar Formspree)
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   └── MobileMenu.tsx
│   │
│   ├── projects/
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectGrid.tsx
│   │   ├── ProjectFilters.tsx
│   │   └── ProjectDetails.tsx
│   │
│   ├── observatorio/
│   │   ├── IndicatorChart.tsx
│   │   ├── KPI.tsx
│   │   └── Dashboard.tsx
│   │
│   ├── noticias/
│   │   ├── NewsCard.tsx
│   │   └── NewsList.tsx
│   │
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Badge.tsx
│       ├── Modal.tsx
│       └── Loading.tsx
│
├── content/
│   ├── projetos.json
│   ├── indicadores.json
│   ├── noticias.json
│   ├── organograma.json
│   └── configuracoes.json
│
├── lib/
│   ├── projects.ts                → Funções de leitura/filtragem de content/projetos.json
│   ├── noticias.ts
│   ├── indicadores.ts
│   └── utils.ts
│
├── hooks/
│   └── useFilters.ts
│
├── public/
│   ├── images/
│   │   ├── banners/
│   │   ├── projetos/
│   │   ├── noticias/
│   │   └── logos/
│   │
│   ├── favicon.ico
│   └── manifest.json
│
├── styles/
│   └── animations.css
│
├── types/
│   ├── project.ts
│   ├── noticia.ts
│   └── indicador.ts
│
├── tailwind.config.ts
├── next.config.ts
├── package.json
└── README.md
```

## Explicação das pastas

Aqui está o papel de cada pasta, com exemplos concretos do que vai lá dentro.

### `app/`

O "esqueleto" do site - cada pasta dentro de `app/` é uma rota (página) do site, por convenção do Next.js App Router. Cada pasta contém um `page.tsx` que é o que aparece nessa URL.

- **`layout.tsx`** - o "molde" que envolve todas as páginas (normalmente inclui o `Header` e `Footer`, para não repetir em cada página).
- **`page.tsx`** (na raiz) - a página inicial, `nhamatanda-digital.com/`.
- **`globals.css`** - estilos globais que se aplicam a todo o site (fontes base, resets).
- **`sobre/page.tsx`, `contactos/page.tsx`** - páginas simples, uma rota cada.
- **`noticias/page.tsx`** - lista todas as notícias; **`noticias/[slug]/page.tsx`** - página de uma notícia específica (o `[slug]` é uma "rota dinâmica": o Next.js gera automaticamente uma página por cada notícia com base no `content/noticias.json`, sem escrever uma página por notícia à mão).
- **`investidor/page.tsx`** e **`investidor/[slug]/page.tsx`** - mesmo padrão: listagem + ficha individual de projeto.
- **`ppp/page.tsx`, `observatorio/page.tsx`** - páginas normais, sem rota dinâmica.
- **`api/contact/route.ts`** - não é uma página, é um endpoint de backend (uma função que corre no servidor). Só é necessário se decidirmos deixar de usar o Formspree e processar o formulário de contacto nós próprios.

### `components/`

Pedaços de interface reutilizáveis - ficheiros `.tsx` que não são páginas, são peças que as páginas montam. Organizados por domínio para não ficar tudo misturado numa pasta só:

- **`layout/`** — peças que aparecem em várias/todas as páginas: `Header.tsx`, `Footer.tsx`, `Navbar.tsx` (menu principal), `MobileMenu.tsx` (menu no telemóvel).
- **`projects/`** - tudo relacionado com fichas de projeto, usado tanto no Investidor como no PPP: `ProjectCard.tsx` (o "cartão" resumido de um projeto), `ProjectGrid.tsx` (a grelha que organiza vários cartões), `ProjectFilters.tsx` (filtros por categoria/setor), `ProjectDetails.tsx` (o conteúdo completo da página individual).
- **`observatorio/`** - `IndicatorChart.tsx` (um gráfico), `KPI.tsx` (um número/indicador isolado, ex.: "23% de acesso à internet"), `Dashboard.tsx` (agrupa vários KPIs/gráficos).
- **`noticias/`** - `NewsCard.tsx` (resumo de uma notícia na listagem), `NewsList.tsx` (a lista completa).
- **`ui/`** - peças genéricas, sem lógica de negócio, reutilizáveis em qualquer parte do site: `Button.tsx`, `Card.tsx`, `Badge.tsx` (etiquetas tipo "PPP"), `Modal.tsx` (janela sobreposta), `Loading.tsx` (indicador de carregamento).

### `content/`

Os dados do site - ficheiros `.json`, editáveis sem tocar em código. É a pasta que usaremos para atualizar informação:

- **`projetos.json`** - todas as fichas técnicas (Investidor + PPP, filtradas pelo campo `categoria`).
- **`indicadores.json`** - os números do Observatório Económico.
- **`noticias.json`** - as notícias/agenda.
- **`organograma.json`** - estrutura da Administração Distrital (para a página Sobre).
- **`configuracoes.json`** - definições gerais do site (ex.: contactos institucionais, redes sociais, textos que aparecem em vários sítios) - evita repetir a mesma informação em várias páginas.

### `lib/`

Funções em TypeScript (`.ts`, sem interface visual) que leem e processam os ficheiros de `content/`. É a camada entre os dados brutos e as páginas:

- **`projects.ts`** - função tipo `getAllProjects()`, `getProjectBySlug(slug)`, `filterByCategory("PPP")`. Sem isto, cada página teria de repetir a lógica de ler o JSON e filtrar.
- **`noticias.ts`, `indicadores.ts`** - o mesmo padrão para os outros conteúdos.
- **`utils.ts`** - funções auxiliares genéricas usadas em vários sítios (ex.: formatar datas, formatar valores monetários).

### `hooks/`

Lógica reutilizável de interface que envolve estado do lado do cliente (algo que muda enquanto o utilizador interage, sem recarregar a página):

- **`useFilters.ts`** - guarda e atualiza o filtro que o utilizador escolheu (ex.: "mostrar só PPP") no Portal do Investidor, sem precisar de recarregar a página inteira.

### `public/`

Ficheiros estáticos servidos diretamente, sem passar por processamento do Next.js - o que está aqui é acessível diretamente por URL (ex.: `/images/logos/brasao.png`):

- **`images/banners/`** - imagens grandes de topo de página.
- **`images/projetos/`** - fotos ligadas às fichas técnicas.
- **`images/noticias/`** - fotos das notícias.
- **`images/logos/`** - brasão do distrito, logótipos de parceiros.
- **`favicon.ico`** - o ícone pequeno que aparece no separador do navegador.
- **`manifest.json`** - configuração para o site poder ser "instalado" como app no telemóvel (PWA).

### `styles/`

- **`animations.css`** - animações CSS personalizadas que não fazem sentido dentro das classes utilitárias do Tailwind (ex.: uma transição mais elaborada num gráfico do Observatório).

### `types/`

Definições de TypeScript - não são código que corre, são a "forma" que os dados devem ter, para o editor avisar de erros antes de correr o site (ex.: se esquecerem um campo obrigatório num JSON):

- **`project.ts`** - define os campos que uma ficha de projeto deve ter (`slug`, `titulo`, `categoria`, etc.).
- **`noticia.ts`, `indicador.ts`** - o mesmo para os outros tipos de conteúdo.

### Ficheiros na raiz

- **`tailwind.config.ts`** - configuração de cores da marca (verde, branco, preto, cores da bandeira), tipografia, espaçamentos.
- **`next.config.ts`** - configurações gerais do Next.js (ex.: domínios permitidos para imagens externas).
- **`package.json`** - lista de dependências do projeto (Next.js, Tailwind, Recharts, etc.) e comandos (`npm run dev`, `npm run build`).
- **`README.md`** - o ficheiro que já têm, com a documentação do projeto.

> **Regra prática para o estagiário:** se está a escrever HTML/JSX visual → vai para `components/`. Se está a buscar ou filtrar dados → vai para `lib/`. Se é só dados em si → vai para `content/`. Essa é a pergunta a fazer antes de criar qualquer ficheiro novo.


## Como correr localmente
bash

git clone https://github.com/rafiquetxequetxe/nhamatanda-digital.git

cd nhamatanda-digital

npm install

npm run dev

Abrir http://localhost:3000.


## Fluxo de trabalho
main é sempre a versão estável/publicada.
Trabalho novo faz-se numa branch própria (ex.: feature/portal-investidor) e entra em main via Pull Request, revisto pelo Tech Lead.
Commits diários - o histórico do Git serve como backup do trabalho.


## Roadmap
Ver ISSUES-BACKLOG.md para a lista de tarefas organizada pelo roadmap de 10 dias, pronta a criar como Issues no GitHub.


## Créditos

Documento técnico elaborado a partir do Relatório Estratégico "Nhamatanda Digital 2027" (Julho de 2026), preparado para a Administração Distrital de Nhamatanda, o Governo Provincial de Sofala e parceiros de desenvolvimento. Uso interno da equipa de desenvolvimento - Agosto de 2026.






















