/*
  Scrape product images from Bread Factory menu and output a JSON mapping:
  {
    items: Array<{ name: string; image: string; category: string }>
  }
*/

import fs from "node:fs";
import path from "node:path";
import * as cheerio from "cheerio";

const SOURCE_URL = "https://breadfactory.com.vn/menu_";

function absoluteUrl(u: string): string {
  if (!u) return u;
  if (u.startsWith("http")) return u;
  if (u.startsWith("//")) return `https:${u}`;
  try {
    return new URL(u, SOURCE_URL).toString();
  } catch {
    return u;
  }
}

async function fetchHtml(url: string): Promise<string> {
  const res = await fetch(url, { headers: { "user-agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return await res.text();
}

type Item = { name: string; image: string; category: string };

async function main() {
  const html = await fetchHtml(SOURCE_URL);
  const $ = cheerio.load(html);

  const items: Item[] = [];

  const wanted = new Set(["BREAD", "BRUNCH", "CAKE", "COOKIES", "DESSERT", "MACAROON"]);
  let currentCategory = "";

  const nodes = $("h2 strong, ._item.item_gallary").toArray();
  for (const node of nodes) {
    const $node = $(node);
    if ($node.is("strong")) {
      const txt = $node.text().trim().toUpperCase();
      if (wanted.has(txt)) currentCategory = txt;
      continue;
    }

    if ($node.is("._item.item_gallary")) {
      if (!currentCategory) continue;
      const $item = $node;
      const titleEl = $item.find(".text_wrap .title").first();
      let name = titleEl.contents().filter((_, n) => n.type === "text").text().trim();
      if (!name) {
        const capH4 = $item.find("[id^=caption_] h4").first().text().trim();
        if (capH4) name = capH4;
      }
      if (!name) continue;

      const imgWrap = $item.find(".img_wrap._img_wrap").first();
      let image = imgWrap.attr("data-src") || "";
      if (!image) {
        const bg = imgWrap.attr("style") || "";
        let m = bg.match(/background-image:\s*url\(([^)]+)\)/i);
        if (m && m[1]) image = m[1].replace(/"/g, "").trim();
      }
      if (!image) {
        const dataBg = imgWrap.attr("data-bg") || "";
        const m2 = dataBg.match(/url\(([^)]+)\)/i);
        if (m2 && m2[1]) image = m2[1].replace(/"/g, "").trim();
      }
      image = absoluteUrl(image);

      if (!items.some((it) => it.name === name)) {
        items.push({ name, image, category: currentCategory });
      }
    }
  }

  const out = { items };
  const outPath = path.join(process.cwd(), "data", "breadfactory-images.json");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2), "utf-8");
  console.log(`Wrote ${items.length} items to ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});


