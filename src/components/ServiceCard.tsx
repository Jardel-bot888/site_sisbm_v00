import Link from "next/link";
import type { Service } from "@/data/site";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <span className="text-4xl" aria-hidden>
        {service.icon}
      </span>
      <h3 className="mt-4 text-lg font-semibold text-slate-900 group-hover:text-blue-900">
        {service.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
        {service.shortDescription}
      </p>
      <Link
        href={`/services/${service.slug}`}
        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-900 hover:text-blue-700"
      >
        En savoir plus
        <span aria-hidden>→</span>
      </Link>
    </article>
  );
}
