import { siteConfig } from "@/data/site";

// Numéro WhatsApp au format international sans signes (wa.me)
const WHATSAPP_NUMBER = "2250720161466";
const DEFAULT_MESSAGE =
  "Bonjour, je souhaite avoir plus d'informations sur la solution SISBM CORE (gestion et supervision de flotte).";

export default function WhatsAppButton() {
  const encoded = encodeURIComponent(DEFAULT_MESSAGE);
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Discuter avec ${siteConfig.company} sur WhatsApp`}
      title="Discuter sur WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-emerald-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/40"
    >
      <svg
        aria-hidden
        viewBox="0 0 32 32"
        fill="currentColor"
        className="h-7 w-7"
      >
        <path d="M16.04 2C8.3 2 2 8.29 2 16.01c0 2.47.65 4.89 1.9 7.02L2 30l7.19-1.86a14.02 14.02 0 0 0 6.85 1.75h.01C23.79 29.89 30 23.6 30 15.89c0-3.83-1.5-7.44-4.22-10.15A14.3 14.3 0 0 0 16.04 2Zm0 2.34c3.17 0 6.15 1.24 8.39 3.47a11.93 11.93 0 0 1 3.48 8.49c0 6.42-5.23 11.63-11.87 11.63-2.13 0-4.21-.57-6.03-1.64l-.43-.26-4.27 1.1 1.14-4.16-.28-.44A11.9 11.9 0 0 1 3.66 16c0-6.41 5.23-11.63 11.87-11.63h.51ZM11.4 8.97c-.24 0-.62.09-.88.42-.27.34-1.03 1-1.03 2.45s1.06 2.85 1.2 3.05c.15.2 2.08 3.18 5.04 4.46.71.31 1.26.49 1.69.62.71.23 1.35.2 1.86.12.57-.09 1.75-.71 2-1.4.25-.69.25-1.28.17-1.4-.07-.12-.27-.19-.57-.33-.3-.14-1.75-.86-2.02-.96-.27-.1-.47-.15-.66.15-.2.3-.76.96-.94 1.15-.17.2-.35.22-.65.07-.3-.14-1.26-.46-2.4-1.48-.89-.79-1.48-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.14-.14.3-.35.46-.53.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.14-.63-1.52-.87-2.08-.26-.6-.5-.57-.7-.58l-.56-.01Z" />
      </svg>
    </a>
  );
}