import { breadFactoryMenuCategories } from "@/lib/menu";
import Link from "next/link";
import MenuCategoryClient from "@/components/MenuCategoryClient";

export default async function MenuCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;

  const currentCategory = breadFactoryMenuCategories.find((cat) => cat.slug === category);
  const allCategories = breadFactoryMenuCategories;

  if (!currentCategory) {
    return (
      <div className="container py-8 md:py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Danh mục không tồn tại</h1>
          <p className="text-neutral-600 mb-6">Vui lòng chọn một danh mục bên dưới.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {allCategories.map((c) => (
              <Link key={c.slug} className="btn btn-accent rounded-xl" href={`/menu/${c.slug}`}>
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          {currentCategory.name}
        </h1>

        <div className="mb-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-2 max-w-3xl mx-auto">
          {allCategories.map((c) => (
            <Link
              key={c.slug}
              href={`/menu/${c.slug}`}
              className={`w-full text-center px-4 py-2 rounded-full border truncate ${
                c.slug === currentCategory.slug ? "bg-black text-white" : "bg-white"
              }`}
            >
              {c.name}
            </Link>
          ))}
          <Link
            href="/menu/beverages"
            className={`w-full text-center px-4 py-2 rounded-full border bg-white truncate`}
          >
            BEVERAGES
          </Link>
        </div>

        <MenuCategoryClient categorySlug={currentCategory.slug} items={currentCategory.items} />
      </div>
    </div>
  );
}


