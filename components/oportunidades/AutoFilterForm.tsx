"use client";

import { useEffect, useRef, useTransition } from "react";
import type { FormEvent, ReactNode } from "react";
import { useRouter } from "next/navigation";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function AutoFilterForm({
  children,
  className,
}: Props) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [pending, startTransition] = useTransition();

  function cancelTimer() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  function applyFilters() {
    cancelTimer();

    const form = formRef.current;
    if (!form) return;

    const params = new URLSearchParams();

    new FormData(form).forEach((value, key) => {
      if (typeof value !== "string") return;

      const text = value.trim();

      if (!text || key === "pagina") return;
      if (key === "localizacao" && text === "Todas") return;
      if (key === "ordenar" && text === "catalogo") return;

      params.append(key, text);
    });

    const query = params.toString();
    const destination = `/oportunidades${query ? `?${query}` : ""}`;

    startTransition(() => {
      router.replace(destination, { scroll: false });
    });
  }

  function handleChange(event: FormEvent<HTMLFormElement>) {
    const target = event.target;

    cancelTimer();

    if (
      target instanceof HTMLInputElement &&
      target.type === "search"
    ) {
      timerRef.current = setTimeout(applyFilters, 350);
      return;
    }

    applyFilters();
  }

  function clearFilters() {
    const form = formRef.current;
    if (!form) return;

    form.querySelectorAll<HTMLInputElement>("input").forEach((input) => {
      if (input.type === "checkbox") input.checked = false;
      if (input.type === "search") input.value = "";
    });

    form.querySelectorAll<HTMLSelectElement>("select").forEach((select) => {
      select.value = select.name === "ordenar" ? "catalogo" : "Todas";
    });

    applyFilters();
  }

  useEffect(() => {
    // Sincroniza os campos quando o utilizador usa Voltar/Avançar.
    function restoreFromUrl() {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      const form = formRef.current;
      if (!form) return;

      const params = new URLSearchParams(window.location.search);

      form.querySelectorAll<HTMLInputElement>("input").forEach((input) => {
        if (input.type === "checkbox") {
          input.checked = params.getAll(input.name).includes(input.value);
        } else if (input.type === "search") {
          input.value = params.get(input.name) ?? "";
        }
      });

      form.querySelectorAll<HTMLSelectElement>("select").forEach((select) => {
        select.value =
          params.get(select.name) ??
          (select.name === "ordenar" ? "catalogo" : "Todas");
      });
    }

    window.addEventListener("popstate", restoreFromUrl);

    return () => {
      window.removeEventListener("popstate", restoreFromUrl);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <form
      ref={formRef}
      action="/oportunidades"
      method="GET"
      className={className}
      aria-busy={pending}
      onChange={handleChange}
      onSubmit={(event) => {
        event.preventDefault();
        applyFilters();
      }}
      onClick={(event) => {
        const target = event.target;

        if (
          target instanceof Element &&
          target.closest("[data-clear-filters]")
        ) {
          event.preventDefault();
          clearFilters();
        }
      }}
    >
      <div
        role="status"
        aria-live="polite"
        style={{
          gridColumn: "1 / -1",
          minHeight: 20,
          marginBottom: -14,
          color: "#166b45",
          fontSize: 12,
        }}
      >
        {pending ? "A actualizar oportunidades…" : ""}
      </div>

      {children}
    </form>
  );
}