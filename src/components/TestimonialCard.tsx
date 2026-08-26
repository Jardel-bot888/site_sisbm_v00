type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex flex-col rounded-2xl bg-slate-50 p-6">
      <div className="text-yellow-400" aria-hidden>
        ★★★★★
      </div>
      <blockquote className="mt-3 flex-1 text-sm leading-6 text-slate-700">
        «&nbsp;{testimonial.quote}&nbsp;»
      </blockquote>
      <figcaption className="mt-4 text-sm">
        <span className="font-semibold text-slate-900">
          {testimonial.author}
        </span>
        <span className="text-slate-500"> — {testimonial.role}</span>
      </figcaption>
    </figure>
  );
}
