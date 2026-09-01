import Reveal from "@/components/Reveal";
import { comparisonRows, offers } from "@/data/site";

const columns = [
  { key: "standard" as const, offer: offers[0] },
  { key: "gold" as const, offer: offers[1] },
  { key: "premium" as const, offer: offers[2] },
];

function CellValue({ value }: { value: string }) {
  if (value === "●") {
    return (
      <span className="font-bold text-emerald-600 dark:text-emerald-400" aria-label="Inclus">
        ●
      </span>
    );
  }
  if (value === "—") {
    return (
      <span className="text-slate-400 dark:text-slate-300" aria-label="Non inclus">
        —
      </span>
    );
  }
  return <span className="text-slate-600 dark:text-slate-300">{value}</span>;
}

export default function ComparisonTable() {
  return (
    <Reveal>
      {/* Tableau (desktop) */}
      <div className="hidden overflow-hidden rounded-2xl border border-slate-200 shadow-sm dark:border-white/10 md:block">
        <table className="w-full text-sm">
          <caption className="sr-only">
            Comparatif des offres STANDARD, GOLD et PREMIUM
          </caption>
          <thead>
            <tr className="bg-slate-900 text-white">
              <th scope="col" className="px-6 py-4 text-left font-semibold">
                Critères
              </th>
              {columns.map(({ offer }) => (
                <th
                  key={offer.slug}
                  scope="col"
                  className={`px-4 py-4 text-center ${offer.theme.accentText.replace(/text-\w+-\d+/, "text-white")} ${offer.theme.solid} font-extrabold tracking-wide`}
                >
                  {offer.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white dark:divide-white/10 dark:bg-slate-900/60">
            {comparisonRows.map((row, index) => (
              <tr key={row.label} className={index % 2 === 1 ? "bg-slate-50 dark:bg-white/5" : ""}>
                <th
                  scope="row"
                  className="px-6 py-3.5 text-left font-medium text-slate-700 dark:text-slate-200"
                >
                  {row.label}
                </th>
                {columns.map(({ key }) => (
                  <td key={key} className="px-4 py-3.5 text-center">
                    <CellValue value={row[key]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cartes empilées (mobile) */}
      <div className="space-y-4 md:hidden">
        {columns.map(({ key, offer }) => (
          <div
            key={key}
            className={`overflow-hidden rounded-2xl border border-slate-200 ring-2 dark:border-white/10 ${offer.theme.ring}`}
          >
            <div
              className={`${offer.theme.solid} px-4 py-3 text-center font-extrabold tracking-wide text-white`}
            >
              {offer.title}
            </div>
            <dl className="divide-y divide-slate-200 dark:divide-white/10">
              {comparisonRows.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between gap-4 px-4 py-2.5"
                >
                  <dt className="text-xs text-slate-500 dark:text-slate-400">{row.label}</dt>
                  <dd className="text-right text-sm font-medium">
                    <CellValue value={row[key]} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>

      {/* Légende */}
      <p className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">
        ● inclus · — non inclus. Les conditions détaillées (garantie, SMS,
        maintenance) sont précisées lors de l&apos;établissement de votre devis.
      </p>
    </Reveal>
  );
}
