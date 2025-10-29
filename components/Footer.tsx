import Link from "next/link";
import { locations } from "@/lib/data";
import { Instagram, Facebook, Youtube, Mail } from "lucide-react";
import { FaPinterestP, FaTiktok } from "react-icons/fa6";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  const mainLocation = locations.find((loc) => loc.isMainLocation);

  return (
    <footer className="border-t border-neutral-200 bg-white">
      {/* Newsletter / Social motif */}
      <section className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5">
            <h3 className="font-serif text-2xl md:text-3xl text-neutral-900">
              Sign Up for Our Newsletter
            </h3>
            <p className="mt-3 text-neutral-600">
              Be the first to know about new and limited edition cakes and
              bon bons.
            </p>
          </div>
          <div className="md:col-span-7">
            <NewsletterForm />
            <div className="flex items-center gap-4 mt-5">
              <a
                href="https://www.instagram.com/7_july.__/"
                aria-label="Instagram"
                className="size-9 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-50 transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.pinterest.com/phamvantoan7july/"
                aria-label="Pinterest"
                className="size-9 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-50 transition-colors"
              >
                <FaPinterestP size={16} />
              </a>
              <a
                href="https://www.tiktok.com/@7_july.__?is_from_webapp=1&sender_device=pc"
                aria-label="TikTok"
                className="size-9 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-50 transition-colors"
              >
                <FaTiktok size={16} />
              </a>
              <a
                href="https://www.facebook.com/phamtoan7702"
                aria-label="Facebook"
                className="size-9 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-50 transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="mailto:phamvantoan7july@gmail.com"
                aria-label="Email"
                className="size-9 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-50 transition-colors"
              >
                <Mail size={18} />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="size-9 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-50 transition-colors"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Link columns - symmetrical grid */}
      <section className="border-t border-neutral-200">
        <div className="container py-12 grid grid-cols-2 md:grid-cols-4 gap-10 text-sm">
          <div>
            <div className="text-xs tracking-wider uppercase text-neutral-500">{mainLocation?.name}</div>
            <ul className="mt-3 space-y-2 text-neutral-700">
              <li>{mainLocation?.address}</li>
              <li>
                {mainLocation?.city}
                {mainLocation?.country ? `, ${mainLocation.country}` : ""}
              </li>
              <li>Open daily 7:00–21:00</li>
              <li>{mainLocation?.phone}</li>
            </ul>
          </div>
          <div>
            <div className="text-xs tracking-wider uppercase text-neutral-500">Support</div>
            <ul className="mt-3 space-y-2 text-neutral-700">
              <li>
                <Link href="#">FAQ</Link>
              </li>
              <li>
                <Link href="#">Contact Us</Link>
              </li>
              <li>
                <Link href="/locations">Boutiques</Link>
              </li>
              <li>
                <Link href="#">Accessibility</Link>
              </li>
              <li>
                <Link href="#">Sitemap</Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-xs tracking-wider uppercase text-neutral-500">About</div>
            <ul className="mt-3 space-y-2 text-neutral-700">
              <li>
                <Link href="#">Licensing</Link>
              </li>
              <li>
                <Link href="#">Terms & Conditions</Link>
              </li>
              <li>
                <Link href="#">Privacy Policy</Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-xs tracking-wider uppercase text-neutral-500">Company</div>
            <ul className="mt-3 space-y-2 text-neutral-700">
              <li>
                <Link href="#">Careers</Link>
              </li>
              <li>
                <Link href="#">Donations</Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Legal row */}
      <div className="border-t border-neutral-200">
        <div className="container py-6 text-xs text-neutral-600 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} Bakery Co. All Rights Reserved.</div>
          <div className="flex items-center gap-4">
            <Link href="#">Privacy</Link>
            <span className="text-neutral-300">/</span>
            <Link href="#">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
