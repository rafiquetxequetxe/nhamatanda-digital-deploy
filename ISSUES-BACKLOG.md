# Backlog de Issues - Nhamatanda Digital 2027

Cada bloco abaixo é uma Issue pronta a criar no GitHub (Issues → New issue). As labels a serem criadas : `dia-N`, `Rafique`, `Leonel`, `bloqueante`.

**Nota sobre os prazos:** as labels `dia-N` são **prazos-limite**, não uma obrigação de só começar essa tarefa nesse dia. Trabalhando full day, se uma tarefa terminar antes do previsto, avancemos imediatamente para a tarefa seguinte. As tarefas não devem esperar pelo "seu dia" para que sejam feitas.

**Nota sobre responsáveis:** cada tarefa tem `(Rafique)` ou `(Leonel)` no fim da linha, indicando quem a executa. As labels de nome ao nível da Issue (`Rafique`, `Leonel`) indicam quem está envolvido nessa Issue no geral.

---

### Dia 1 - Fundação
**Título:** Setup do ambiente e deploy inicial
**Labels:** `dia-1`, `Rafique`
**Descrição:**
- [ ] Instalar Node.js, Git, VS Code, extensões (secção 6.1 do documento técnico) — (Rafique)
- [ ] Criar repositório GitHub e conta Hostinger ligada — (Rafique)
- [ ] `npx create-next-app@latest` com TypeScript, Tailwind, App Router — (Rafique)
- [ ] Primeiro commit + push — (Rafique)
- [ ] Validar deploy inicial na Hostinger (endereço público visível, mesmo que só com a página de exemplo) — (Rafique)
- [ ] Definir identidade visual base (cores/tipografia) no `tailwind.config.ts` — (Rafique)

---

### Dia 2 - Design system
**Título:** Biblioteca de componentes base (Header, Footer, botões, cartões)
**Labels:** `dia-2`, `Leonel`, `Rafique`
**Descrição:**
- [ ] Wireframes das páginas principais (papel ou Figma) — (Rafique)
- [ ] Construir `Header.tsx`, `Footer.tsx` — (Leonel)
- [ ] Construir botões e cartões base em React/Tailwind (apoio de v0.dev/IA) — (Leonel)
- [ ] Rever e ajustar componentes gerados — (Rafique)

---

### Dia 3 - Portal Institucional I
**Título:** Páginas Home, Sobre e Contactos
**Labels:** `dia-3`, `Leonel`, `Rafique`
**Descrição:**
- [ ] Redigir/organizar conteúdo textual real (Administração, missão do distrito) — (Rafique)
- [ ] Construir página `Home` — (Leonel)
- [ ] Construir página `Sobre` — (Leonel)
- [ ] Construir página `Contactos` — (Leonel)
- [ ] Rever acessibilidade — (Rafique)

---

### Dia 4 - Portal Institucional II
**Título:** Página de Notícias/Agenda + content/noticias.json
**Labels:** `dia-4`, `Leonel`, `Rafique`
**Descrição:**
- [ ] Validar conteúdo com stakeholders (se possível) — (Rafique)
- [ ] Ajustar identidade de marca — (Rafique)
- [ ] Construir página de Notícias/Agenda — (Leonel)
- [ ] Ligar dados a `content/noticias.json` — (Leonel)

---

### Dia 5 - Ponto de controlo + Investidor I
**Título:** Decisão de âmbito + content/projetos.json + listagem /investir
**Labels:** `dia-5`, `bloqueante`, `Rafique`, `Leonel`
**Descrição:**
- [ ] Rever progresso vs. plano - decidir se corta âmbito (ver ordem de corte na secção 3.3 do documento técnico) — (Rafique)
- [ ] Estruturar `content/projetos.json` com as primeiras fichas — (Rafique)
- [ ] Construir componente `ProjectCard` — (Leonel)
- [ ] Construir página de listagem `/investir` — (Leonel)

---

### Dia 6 - Investidor II
**Título:** Fichas técnicas, página de detalhe e formulário de contacto
**Labels:** `dia-6`, `Rafique`, `Leonel`
**Descrição:**
- [ ] Redigir 5 a 10 fichas técnicas reais/exemplo (modelo: potencial, vantagens do distrito, critérios de avaliação - não investimento fixo) — (Rafique)
- [ ] Configurar o Formspree ou outra forma de contacto por email que preferir— (Leonel)
- [ ] Construir página de detalhe `/investir/[slug]` — (Leonel)
- [ ] Construir o formulário de contacto — (Leonel)

---

### Dia 7 - Observatório Económico
**Título:** IndicatorChart + página /observatorio
**Labels:** `dia-7`, `Leonel`, `Rafique`
**Descrição:**
- [ ] Reunir/validar 3 a 5 indicadores a mostrar — (Rafique)
- [ ] Marcar claramente como "dados preliminares" se aplicável — (Rafique)
- [ ] Construir `IndicatorChart` com Recharts — (Leonel)
- [ ] Construir página `/observatorio` — (Leonel)

---

### Dia 8 - Catálogo PPP
**Título:** Página /ppp reutilizando ProjectCard com filtro
**Labels:** `dia-8`, `Rafique`, `Leonel`
**Descrição:**
- [ ] Rever critério de filtragem `categoria = PPP` — (Rafique)
- [ ] Redigir texto introdutório da página — (Rafique)
- [ ] Construir a página `/ppp` (mesmo componente do Investidor, filtrado) — (Leonel)

---

### Dia 9 - Qualidade
**Título:** Testes, responsividade e revisão de conteúdo
**Labels:** `dia-9`, `Leonel`, `Rafique`
**Descrição:**
- [ ] Rever todo o conteúdo em português — (Rafique)
- [ ] Testar em telemóvel real — (Leonel)
- [ ] Verificar links e contactos — (Leonel)
- [ ] Corrigir responsividade mobile — (Leonel)
- [ ] Otimizar imagens — (Leonel)
- [ ] Testar formulário ponta a ponta — (Leonel, Rafique)

---

### Dia 10 - Lançamento
**Título:** Ajustes finais, domínio/HTTPS e demonstração
**Labels:** `dia-10`, `Rafique`, `Leonel`
**Descrição:**
- [ ] Últimos ajustes visuais — (Leonel)
- [ ] Garantir domínio/HTTPS ativo na Hostinger — (Rafique)
- [ ] Preparar demonstração para a Administração — (Rafique)
- [ ] Documentar guia curto (1 página) de como editar conteúdo — (Rafique)

---

## Checklist final de entrega (Issue única, para fechar no fim)

**Título:** Checklist de entrega do MVP
**Labels:** `bloqueante`, `Rafique`
- [ ] Portal Institucional com Home, Sobre, Notícias e Contactos publicado e navegável
- [ ] Portal do Investidor com pelo menos 5 fichas técnicas e formulário a funcionar (testado com envio real)
- [ ] Observatório Económico com pelo menos 3 indicadores em gráfico, com fonte dos dados identificada
- [ ] Catálogo PPP a mostrar corretamente os projetos marcados como categoria PPP
- [ ] Site testado num telemóvel real
- [ ] Identidade visual (verde/branco/preto/cores da bandeira) aplicada de forma consistente
- [ ] Site publicado num endereço público, acessível fora da rede da equipa
- [ ] Repositório GitHub organizado, com histórico de commits legível
- [ ] Guia curto (1 página) a explicar como editar conteúdo sem o estagiário
