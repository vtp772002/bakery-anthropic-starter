"use client";

import { useState } from "react";
import AnimatedLogo from "@/components/AnimatedLogo";

export default function LogoDemo() {
  const [mode, setMode] = useState<"dash" | "clip">("clip");

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Header with animated logo */}
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-orange-200">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
          <AnimatedLogo mode={mode} collapseThreshold={8} />
          <div className="flex items-center gap-4 text-sm">
            <label className="font-medium text-gray-700">Animation mode:</label>
            <select 
              className="border border-gray-300 rounded-lg px-3 py-1 bg-white text-gray-900 focus:ring-2 focus:ring-orange-300 focus:border-orange-400" 
              value={mode} 
              onChange={(e) => setMode(e.target.value as any)}
            >
              <option value="clip">ClipPath Sweep (I mảnh → hình fill)</option>
              <option value="dash">Stroke Dash (I mảnh → I dày)</option>
            </select>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            JT Bakery Animated Logo
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Scroll down to see the magic! The logo transforms from showing the full "JT BAKERY" 
            wordmark with a thin "I" stroke to just the iconic thick "I" shape when you scroll.
          </p>
          <div className="bg-white rounded-lg p-6 border border-orange-200 inline-block">
            <p className="text-sm text-gray-600 mb-4">
              <strong>Before scroll:</strong> Full wordmark + thin I stroke
              <br />
              <strong>After scroll:</strong> Wordmark collapses + thick I shape appears
            </p>
            <div className="bg-gradient-to-r from-orange-100 to-amber-100 p-4 rounded-lg">
              <AnimatedLogo mode={mode} collapseThreshold={100} />
            </div>
          </div>
        </div>

        {/* Feature sections to enable scrolling */}
        <div className="space-y-16">
          <section className="bg-white rounded-xl p-8 shadow-sm border border-orange-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Fresh Daily Bakes</h2>
            <p className="text-gray-700 leading-relaxed">
              Our master bakers start before dawn to create the finest artisanal breads, 
              pastries, and seasonal treats. From classic sourdough to innovative flavors, 
              every item is crafted with care using traditional techniques and premium ingredients.
            </p>
          </section>

          <section className="bg-white rounded-xl p-8 shadow-sm border border-orange-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Seasonal Specialties</h2>
            <p className="text-gray-700 leading-relaxed">
              Experience the flavors of each season with our rotating menu of specialty items. 
              From summer fruit galettes to autumn spice breads, winter warming pastries to 
              spring celebration cakes - we capture the essence of each season in every bite.
            </p>
          </section>

          <section className="bg-white rounded-xl p-8 shadow-sm border border-orange-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Artisan Classes</h2>
            <p className="text-gray-700 leading-relaxed">
              Learn the art of baking from our expert instructors. Whether you're a beginner 
              looking to master the basics or an experienced baker wanting to refine your 
              technique, our hands-on classes provide the perfect environment to grow your skills.
            </p>
          </section>

          <section className="bg-white rounded-xl p-8 shadow-sm border border-orange-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Bread CSA Program</h2>
            <p className="text-gray-700 leading-relaxed">
              Join our Community Supported Agriculture program for fresh bread delivered weekly. 
              Enjoy our signature country loaf plus a rotating selection of seasonal pastries. 
              Support local artisans while enjoying the convenience of regular deliveries.
            </p>
          </section>

          <section className="bg-white rounded-xl p-8 shadow-sm border border-orange-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Catering Services</h2>
            <p className="text-gray-700 leading-relaxed">
              Make your special events even more memorable with our catering services. 
              From intimate gatherings to large celebrations, we offer custom cakes, 
              sandwich platters, pastry assortments, and specialized dietary options.
            </p>
          </section>

          <section className="bg-white rounded-xl p-8 shadow-sm border border-orange-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-700 leading-relaxed">
              Founded with a passion for traditional baking methods and community connection, 
              JT Bakery has been serving quality baked goods for years. We believe in the 
              power of handcrafted food to bring people together and create lasting memories.
            </p>
          </section>
        </div>

        {/* Footer spacer */}
        <div className="h-32"></div>
      </main>
    </div>
  );
}
