import Image from "next/image";

type LogoProps = {
  variant?: "light" | "dark";
  showText?: boolean;
};

export default function Logo({ variant = "dark", showText = true }: LogoProps) {
  const corTexto = variant === "dark" ? "text-[#000000]" : "text-white";
  const corTagline = variant === "dark" ? "text-gray-500" : "text-gray-300";

  return (
    <div className="flex items-center gap-4 shrink-0">
       <div className="relative w-12 h-12 shrink-0">
        <Image
          src="/images/logo2.png"
          alt="Logótipo Nhamatanda Digital 2027"
          fill
          className="object-contain"
          sizes="48px"
        />
      </div>
      {showText && (
        <div className="leading-tight hidden xl:block">
          <strong><p className={`font-bold ${corTexto} text-xl tracking-tight`}>
            DISTRITO DE NHAMATANDA
          </p></strong>
          <p className={`text-sm ${corTagline}`}>
            Desenvolvimento, Transparência e Oportunidades
          </p>
        </div>
      )}
    </div>
  );
}