"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from 'next-intl';
import { LiquidMetalButton } from '@/components/ui/liquid-metal-button';

export default function Hero() {
  const t = useTranslations('hero');
  const common = useTranslations('common');
  
  return (
    <section className="container py-16 md:py-24">
      <div className="max-w-[70ch] overflow-hidden">
        <motion.h1
          className="display font-serif"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t('title')}
        </motion.h1>
        <motion.p
          className="sub mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          {t('subtitle')}
        </motion.p>
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <LiquidMetalButton
            label={common('todaysBakes')}
            onClick={() => window.location.href = '/en/menu'}
            viewMode="text"
          />
        </motion.div>
      </div>
    </section>
  );
}
