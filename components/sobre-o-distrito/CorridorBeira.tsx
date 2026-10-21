import Image from "next/image";
import Link from "next/link";
import { IconArrowRight } from "@/components/ui/Icons";

export default function CorridorBeira() {
  return (
    <section className="py-14 lg:py-20 bg-[#F7F9F8]">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">

          {/* IMAGEM */}
          <div className="relative min-h-[330px] lg:min-h-[440px] rounded-2xl overflow-hidden">
            <Image
              src="/images/corredor-beira.png"
              alt="Corredor de Desenvolvimento da Beira"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-xs uppercase tracking-wider font-semibold">
                Localização estratégica
              </p>

              <p className="mt-1 text-xl font-bold">
                Corredor de Desenvolvimento da Beira
              </p>
            </div>
          </div>

          {/* TEXTO */}
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-[#1F6F4A]">
              Conectividade
            </p>

            <h2 className="mt-2 text-2xl lg:text-4xl font-bold text-[#0F172A] leading-tight">
              Nhamatanda no coração do Corredor da Beira
            </h2>

            <p className="mt-5 text-sm lg:text-base text-[#64748B] leading-7">
              O Corredor de Desenvolvimento da Beira estabelece uma ligação
              estratégica entre o Porto da Beira e os mercados do interior
              da região, incluindo o Zimbabwe.
            </p>

            <p className="mt-4 text-sm lg:text-base text-[#64748B] leading-7">
              Esta posição reforça o papel de Nhamatanda como território
              potencial para produção, comércio, distribuição, serviços e
              novas actividades económicas.
            </p>

            <div className="mt-7 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white border border-[#E2E8F0] p-4">
                <p className="text-sm font-bold text-[#0F172A]">
                  Porto da Beira
                </p>
                <p className="mt-1 text-xs text-[#64748B]">
                  Ligação aos mercados regionais
                </p>
              </div>

              <div className="rounded-xl bg-white border border-[#E2E8F0] p-4">
                <p className="text-sm font-bold text-[#0F172A]">
                  Zimbabwe
                </p>
                <p className="mt-1 text-xs text-[#64748B]">
                  Acesso ao interior da região
                </p>
              </div>
            </div>

            <Link
              href="/investir"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#1F6F4A]"
            >
              Descobrir oportunidades
              <IconArrowRight size={15} />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}