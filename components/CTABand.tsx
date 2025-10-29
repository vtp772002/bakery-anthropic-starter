import Link from "next/link";

export default function CTABand() {
  return (
    <section className="py-10 border-t border-neutral-200 bg-white">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-lg">Fresh daily at 6:30 AM · Preorder by 9 PM</p>
        <Link href="/order" className="btn btn-accent rounded-2xl">Preorder</Link>
      </div>
    </section>
  );
}
