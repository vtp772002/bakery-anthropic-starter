import Image from "next/image";
import Link from "next/link";
import { tiles } from "@/lib/data";

export default function TileGrid() {
  return (
    <section className="container py-10 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {tiles.map((t) => (
        <Link key={t.title} href={t.href} className="tile group">
          <div className="text-xs uppercase tracking-wider text-neutral-500">
            {t.eyebrow}
          </div>
          <h3 className="mt-2 text-xl font-medium">{t.title}</h3>
          <p className="mt-2 text-neutral-600 text-sm">{t.body}</p>
          <div className="mt-4 rounded-xl overflow-hidden border border-neutral-200 aspect-[4/3] relative">
            <Image
              src={t.image}
              alt=""
              fill
              className="object-cover transition-transform group-hover:scale-[1.02]"
            />
          </div>
          <span className="mt-3 inline-flex items-center gap-1 text-sm underline underline-offset-4">
            Learn more
          </span>
        </Link>
      ))}
    </section>
  );
}
