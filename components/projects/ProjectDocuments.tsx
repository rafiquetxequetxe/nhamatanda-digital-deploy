import Link from "next/link";
import { IconFilePdf, IconDownload, IconArrowRight } from "@/components/ui/Icons";
import { DocumentoProjeto } from "@/types/project";

type ProjectDocumentsProps = {
  documentos: DocumentoProjeto[];
};

export default function ProjectDocuments({ documentos }: ProjectDocumentsProps) {
  if (!documentos || documentos.length === 0) return null;

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-gray-900"><strong> Documentos</strong></h2>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {documentos.map((doc) => (
          <a
            key={doc.nome}
            href={doc.url}
            download
            className="flex items-center gap-3 border border-gray-100 rounded-xl p-4 hover:shadow-md hover:border-[#1F6F4A]/30 transition-all duration-200"
          >
            <IconFilePdf size={26} className="shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-md font-semibold text-gray-900 truncate">{doc.nome}</p>
              <p className="text-sm text-gray-400">{doc.tipo} · {doc.tamanho}</p>
            </div>
            <span className="w-8 h-8 rounded-full bg-[#1F6F4A]/10 flex items-center justify-center text-[#1F6F4A] shrink-0">
              <IconDownload size={14} />
            </span>
          </a>
        ))}
                <Link
          href="#"
          className="text-sm font-semibold text-[#1F6F4A] inline-flex items-right gap-1 hover:gap-2 transition-all duration-200"
        >
          Ver todos os documentos <IconArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}