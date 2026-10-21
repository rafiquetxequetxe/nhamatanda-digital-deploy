import { IconArrowRight } from "@/components/ui/Icons";
import Button from "../ui/Button";
import ZoomableImage from "../ui/ZoomableImage";

export default function AboutDistrict() {
  return (
    <section className="bg-white pt-12 pb-12 lg:pt-14 lg:pb-14">

      <div className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-16">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">


          {/* IMAGEM */}
  <div className="relative w-full h-[280px] lg:h-full rounded-2xl overflow-hidden">
    <ZoomableImage
      src="/images/aboutdistrict/home_governacao.png"
      alt="Vista aérea de Nhamatanda"
      sizes="(max-width: 1024px) 100vw, 50vw"
    />
  </div>

  {/* CONTEÚDO */}
  <div>

    <p className="text-sm font-bold text-[#1F6F4A] tracking-wide mb-2">
  SOBRE O DISTRITO
</p>

<h2 className="text-3xl lg:text-[34px] font-bold text-gray-900 mb-4">
  Nhamatanda: território, pessoas e potencial
</h2>

<p className="text-lg text-gray-600 leading-relaxed mb-3">
  No coração da Província de Sofala, Nhamatanda ocupa uma posição
  estratégica no Corredor da Beira, ligando a cidade da Beira ao
  interior da África Austral e aproximando produtores, mercados e
  oportunidades.
</p>

<p className="text-lg text-gray-600 leading-relaxed mb-6">
  Com 3.973 km² de território e uma população projectada em cerca de
  362.887 habitantes para 2026, o distrito combina uma forte base
  populacional com terras agrícolas, recursos hídricos e potencial
  para agricultura, agro-processamento, logística e outras actividades
  produtivas.
</p>

    <Button
      href="/sobre-o-distrito"
      variant="primary"
      className="text-md"
    >
      Saiba mais sobre o distrito
      <IconArrowRight size={16} />
    </Button>

  </div>

          

        </div>

      </div>

    </section>
  );
}