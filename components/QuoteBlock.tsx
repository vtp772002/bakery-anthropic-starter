export default function QuoteBlock() {
  return (
    <section className="container py-16">
      <figure className="rounded-2xl bg-neutral-50 border border-neutral-200 p-8 md:p-12">
        <blockquote className="font-serif text-2xl md:text-3xl leading-snug">
          “Elegant pastries, made patiently.”
        </blockquote>
        <figcaption className="mt-4 text-sm text-neutral-600">— A neighbor</figcaption>
      </figure>
    </section>
  );
}
