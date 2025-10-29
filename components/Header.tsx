"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { nav } from "@/lib/data";
import AnimatedLogo from "./AnimatedLogo";
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
const CartDrawer = dynamic(() => import('./CartDrawer'), { ssr: false });

export default function Header() {
  const t = useTranslations('cta');
  const common = useTranslations('common');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpenItems, setMobileOpenItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Use a fixed overlay for the mobile menu instead of body locking to avoid scroll jumps

  const handleMouseEnter = (itemName: string) => {
    setActiveDropdown(itemName);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const toggleMobileItem = (itemName: string) => {
    const newOpenItems = new Set(mobileOpenItems);
    if (newOpenItems.has(itemName)) {
      newOpenItems.delete(itemName);
    } else {
      newOpenItems.add(itemName);
    }
    setMobileOpenItems(newOpenItems);
  };

  return (
    <header
      data-scrolled={scrolled}
      className="sticky top-0 z-40 bg-white border-b border-neutral-200
                 shadow-none data-[scrolled=true]:shadow-sm transition-shadow"
      onClickCapture={(e) => {
        const target = e.target as Element;
        const anchor = target.closest('a[href="#"]');
        if (anchor) {
          e.preventDefault();
        }
      }}
    >
      <div className="container flex items-center justify-between h-16">
        <AnimatedLogo 
          href="/" 
          collapseThreshold={999999}
          mode="clip"
        />
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {nav.map((item) => (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => item.submenu && handleMouseEnter(item.name)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href={item.href}
                className="flex items-center gap-1 hover:text-neutral-700 transition-colors py-2"
                onClick={(e) => {
                  if (item.href === '#') {
                    e.preventDefault();
                  }
                }}
              >
                {item.name}
                {item.submenu && (
                  <ChevronDown 
                    size={14} 
                    className={`transition-transform duration-200 ${
                      activeDropdown === item.name ? 'rotate-180' : ''
                    }`}
                  />
                )}
              </Link>
              
              {/* Dropdown Menu */}
              {item.submenu && (
                <div
                  className={`absolute top-full left-0 mt-2 w-80 bg-white border border-neutral-200 rounded-xl shadow-lg 
                    transition-all duration-300 ease-out transform-gpu
                    ${activeDropdown === item.name 
                      ? 'opacity-100 translate-y-0 visible' 
                      : 'opacity-0 -translate-y-2 invisible'
                    }`}
                >
                  <div className="p-4 space-y-3">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block p-3 rounded-lg hover:bg-neutral-50 transition-colors group"
                        onClick={(e) => {
                          if (subItem.href === '#') {
                            e.preventDefault();
                          }
                        }}
                      >
                        <div className="font-medium text-neutral-900 group-hover:text-neutral-700">
                          {subItem.name}
                        </div>
                        {subItem.description && (
                          <div className="text-sm text-neutral-600 mt-1">
                            {subItem.description}
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-3">
          {/* Temporarily disabled upgrade button */}
          {false && (
            <Link href="/upgrade" className="btn btn-secondary rounded-2xl">
              {common('upgradeShort')}
            </Link>
          )}
          <CartDrawer />
        </div>
        <button
          type="button"
          className="md:hidden p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          aria-label="Toggle menu"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setOpen((v) => {
              if (v) {
                // Reset all mobile menu states when closing
                setMobileOpenItems(new Set());
              }
              return !v;
            });
          }}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {/* Mobile Menu (fixed overlay below header) */}
      <div 
        data-mobile-menu
        className={`md:hidden fixed left-0 right-0 top-16 bottom-0 bg-white border-t border-neutral-200 transition-opacity duration-300 ease-out ${
          open ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        style={{ touchAction: open ? 'pan-y' : 'none' }}
      >
        <div className="container py-4 space-y-2 h-full overflow-y-auto">
          {nav.map((item) => (
            <div key={item.name} className="space-y-2">
              {item.submenu ? (
                /* Menu item with submenu - clickable to expand */
                <>
                  <button
                    className="flex items-center justify-between w-full py-3 px-2 font-medium text-left rounded-lg hover:bg-neutral-50 transition-colors"
                    onClick={() => toggleMobileItem(item.name)}
                  >
                    {item.name}
                    <ChevronDown 
                      size={16} 
                      className={`transition-transform duration-200 ${
                        mobileOpenItems.has(item.name) ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  {/* Mobile Submenu - only show if expanded */}
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-out ${
                      mobileOpenItems.has(item.name) 
                        ? 'max-h-96 opacity-100' 
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="pl-4 space-y-3 border-l-2 border-neutral-100 pt-2 pb-2">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block py-2 px-2 rounded-lg hover:bg-neutral-50 transition-colors"
                          onClick={(e) => {
                            if (subItem.href === '#') {
                              e.preventDefault();
                            } else {
                              setOpen(false);
                            }
                          }}
                        >
                          <div className="font-medium text-neutral-900">
                            {subItem.name}
                          </div>
                          {subItem.description && (
                            <div className="text-sm text-neutral-600 mt-1">
                              {subItem.description}
                            </div>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                /* Simple menu item without submenu */
                <Link
                  href={item.href}
                  className="block py-3 px-2 font-medium rounded-lg hover:bg-neutral-50 transition-colors"
                  onClick={(e) => {
                    if (item.href === '#') {
                      e.preventDefault();
                    } else {
                      setOpen(false);
                    }
                  }}
                >
                  {item.name}
                </Link>
              )}

            </div>
          ))}
          
          {/* Mobile CTA buttons (Cart hidden; floating cart is shown near chatbot) */}
          <div className="pt-4 space-y-3 border-t border-neutral-200">
            {/* Temporarily disabled upgrade button */}
            {false && (
              <Link
                href="/upgrade"
                className="block w-full py-3 px-4 text-center bg-neutral-100 text-neutral-800 rounded-lg font-medium hover:bg-neutral-200 transition-colors"
                onClick={() => setOpen(false)}
              >
                {t('upgrade')}
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
