import React from 'react';
import { ArrowRight, Clock, MapPin, Sparkles } from 'lucide-react';
import { HERO_IMAGE } from '../data/coffeeData';

interface HeroProps {
  onExploreMenu: () => void;
  onExploreBeans: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onExploreBeans }) => {
  return (
    <section className="relative overflow-hidden bg-[#FAF8F5] border-b border-[#EAE4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Clean unboxed metadata kicker */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#78350F] font-semibold">
              <span>Specialty Roastery</span>
              <span aria-hidden="true">·</span>
              <span>Direct Trade</span>
              <span aria-hidden="true">·</span>
              <span>Historic Quarter</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#241F1C] tracking-tight leading-[1.08] text-balance">
              Coffee roasted with patience, extracted with quiet precision.
            </h1>

            <p className="text-base sm:text-lg text-[#574D45] max-w-2xl leading-relaxed">
              We source seasonal micro-lots from high-altitude smallholder farms, roasting small batches in our antique cast-iron roaster to elevate terroir, florals, and vibrant natural sweetness.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreMenu}
                className="px-6 py-3.5 bg-[#241F1C] hover:bg-[#3D332D] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-all shadow-sm flex items-center gap-2 active:scale-[0.98]"
              >
                <span>View Cafe Menu</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={onExploreBeans}
                className="px-6 py-3.5 bg-transparent hover:bg-[#F2ECE3] text-[#241F1C] border border-[#DDD5CA] text-xs font-semibold uppercase tracking-wider rounded-md transition-all flex items-center gap-2"
              >
                <span>Shop Fresh Beans</span>
              </button>
            </div>

            {/* Status & Hours Bar */}
            <div className="pt-6 border-t border-[#EAE4DC] flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-[#6B5E55]">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#78350F]" />
                <span>Open today 7:00 AM – 6:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#78350F]" />
                <span>244 High Street (Historic District)</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#78350F]" />
                <span>Today's Batch: Ethiopia Chelchele G1</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-xl overflow-hidden aspect-[4/3] lg:aspect-[3/4] shadow-md border border-[#E5DDD2] bg-[#EFE9DF]">
              <img
                src={HERO_IMAGE}
                alt="Artisan pour over coffee brewing with copper kettle and ceramic V60 dripper"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              
              {/* Image caption badge card */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-white/95 backdrop-blur-sm rounded-lg border border-[#EAE4DC] text-[#241F1C]">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#78350F]">Ceramic V60 Slow Pour</span>
                  <span className="text-xs font-mono tabular-nums text-[#6B5E55]">93°C · 3:00 min</span>
                </div>
                <p className="text-xs text-[#574D45] mt-1 line-clamp-1">
                  Single origin beans freshly ground per order for exquisite nuance.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
