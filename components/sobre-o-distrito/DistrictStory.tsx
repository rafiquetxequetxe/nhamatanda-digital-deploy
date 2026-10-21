import Link from 'next/link';
import { Heading } from './DistrictUI';
import s from './district.module.css';

export default function DistrictStory() {
  return (
    <section id="historia" className={`${s.section} ${s.sage}`}>
      <div className={`${s.container} ${s.story}`}>
        <Heading eyebrow="História e identidade" title="Um distrito com história e futuro.">
            O nome &quot;Nhamatanda&quot; deriva do rio Nhamatanda, que significa &quot;grandes
            troncos&quot; em Chisena, uma língua local, devido à capacidade do rio de
            transportar grandes troncos de árvores antes da construção de barragens.
            Fontes históricas referem que a área que hoje constitui o território do
            distrito de Nhamatanda foi habitada por povos indígenas antes da
            colonização portuguesa. <br />
            A vila de Nhamatanda foi fundada em 1898 pelos portugueses, que a
            chamaram de Nova Fontes Vila, em homenagem ao marquês português Fontes
            Pereira de Melo. Mais tarde, em 1920, a vila foi renomeada para Vila
            Machado, em homenagem ao engenheiro português responsável pela
            construção da ferrovia Beira-Harare. <br />
            No lumiar da independência nacional, e no quadro da restruturação da
            toponímia de Moçambique, o Governo de transição decretou a mudança da
            designação de Vila Machado para Nhamatanda, em homenagem a uma lagoa
            que passa pela Vila Sede (Nhama – peixe e Iacutanda – tipo pesca por
            rede, isto é, as pessoas apanhavam peixe através de redes naquela
            lagoa).
        </Heading>

        <div className={s.accordions}>
          <details>
            <summary>História e memória local <span aria-hidden="true">+</span></summary>
            <div>
             <p>O Distrito de Nhamatanda guarda marcas profundas do conflito armado: 
acolheu grande parte dos deslocados de guerra vindos dos distritos 
nortenhos de Sofala, factor que explica o crescimento acelerado da 
Vila-Sede e a expansão de assentamentos à sua volta.
</p>
<p>A vida cultural do distrito mantém-se viva através de danças 
tradicionais praticadas em cerimónias e tempos livres — Utsé, 
Massesseto, Marimba, Ntanda, Mapaza, Mucapa e Chitonga — e de uma 
gastronomia própria, com destaque para a massa de farinha de milho 
pilada ou de mapira, acompanhada de peixe de água doce (Ntxomba), 
folhas de mandioca (Ntsocobwe) e variedades locais de feijão.
   </p>           
            </div>
          </details>
          <details>
            <summary>Organização administrativa <span aria-hidden="true">+</span></summary>
            <div>
              <p>Consulte o mapa para explorar o distrito e os postos administrativos. Para informação sobre localidades e serviços de atendimento, utilize os canais de contacto do portal.</p>
              <a href="#territorio">Consultar o território →</a>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}