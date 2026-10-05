import React, { useState } from 'react';
import { Sparkles, Check, ShoppingBag } from 'lucide-react';
import { COFFEE_ITEMS, BEANS_IMAGE } from '../data/coffeeData';
import { CoffeeItem, CartItem } from '../types';

interface BeansShowcaseProps {
  onAddToCart: (cartItem: CartItem) => void;
  onOpenCustomizer: (item: CoffeeItem) => void;
}

export const BeansShowcase: React.FC<BeansShowcaseProps> = ({
  onAddToCart,
  onOpenCustomizer
}) => {
  const beanItems = COFFEE_ITEMS.filter((i) => i.category === 'beans');
  const [selectedGrinds, setSelectedGrinds] = useState<Record<string, string>>({
    'bean-chelchele': 'Whole Bean',
    'bean-pink-bourbon': 'Whole Bean',
    'bean-equinox-blend': 'Whole Bean',
    'bean-guatemala-antigua': 'Whole Bean',
  });

  const handleGrindChange = (itemId: string, grind: string) => {
    setSelectedGrinds((prev) => ({ ...prev, [itemId]: grind }));
  };

  const handleDirectAdd = (item: CoffeeItem, isSubscription = false) => {
    const grind = selectedGrinds[item.id] || 'Whole Bean';
    const unitPrice = isSubscription ? item.price * 0.85 : item.price;
    const cartItem: CartItem = {
      cartId: `${item.id}-${Date.now()}`,
      item,
      quantity: 1,
      size: '250g',
      grind,
      isSubscription,
      unitPrice
    };
    onAddToCart(cartItem);
  };

  return (
    <section id="beans" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-[#EAE4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs uppercase tracking-wider text-[#78350F] font-semibold mb-2">
            The Micro-Lot Roastery
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#241F1C] tracking-tight">
            Single Origins & Seasonal Harvests
          </h2>
          <p className="text-base text-[#574D45] mt-3 leading-relaxed">
            Every bag is roasted to order on our 15kg Giesen roaster in small batches. We transparently source from producers who earn 2.5× Fair Trade minimums, celebrating pristine cup profiles with zero artificial processing.
          </p>
        </div>

        {/* 2-Column High-End Product Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          {beanItems.map((bean) => (
            <div
              key={bean.id}
              className="bg-white border border-[#EAE4DC] rounded-xl p-6 sm:p-8 flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow"
            >
              <div>
                {/* Top Badge & SCA Score */}
                <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#F2ECE3]">
                  <div className="text-xs text-[#78350F] font-semibold uppercase tracking-wider">
                    {bean.origin}
                  </div>
                  {bean.scaScore && (
                    <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-[#241F1C] bg-[#F2ECE3] px-2.5 py-1 rounded">
                      <Sparkles className="w-3.5 h-3.5 text-[#78350F]" />
                      <span>SCA {bean.scaScore.toFixed(1)} PTS</span>
                    </div>
                  )}
                </div>

                {/* Title & Description */}
                <div className="mt-4">
                  <h3 className="text-2xl font-serif font-bold text-[#241F1C]">
                    {bean.name}
                  </h3>
                  <p className="text-xs text-[#574D45] mt-2 leading-relaxed">
                    {bean.description}
                  </p>
                </div>

                {/* Micro-lot specifications table */}
                <div className="mt-5 grid grid-cols-3 gap-3 py-3 px-4 bg-[#FAF8F5] rounded-lg border border-[#EAE4DC] text-xs">
                  <div>
                    <span className="block text-[10px] uppercase font-semibold text-[#8C7E72]">Process</span>
                    <span className="font-medium text-[#241F1C] mt-0.5 block truncate">{bean.process}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-semibold text-[#8C7E72]">Altitude</span>
                    <span className="font-medium text-[#241F1C] mt-0.5 block truncate">{bean.altitude}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-semibold text-[#8C7E72]">Roast</span>
                    <span className="font-medium text-[#241F1C] mt-0.5 block truncate">{bean.roastLevel}</span>
                  </div>
                </div>

                {/* Tasting Notes */}
                {bean.tastingNotes && (
                  <div className="mt-4 flex items-center gap-2 text-xs">
                    <span className="font-semibold text-[#241F1C]">Cup Profile:</span>
                    <div className="flex items-center gap-1.5 text-[#78350F]">
                      {bean.tastingNotes.map((note, i) => (
                        <React.Fragment key={note}>
                          {i > 0 && <span aria-hidden="true" className="text-[#DDD5CA]">·</span>}
                          <span>{note}</span>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                )}

                {/* Grind Selector */}
                <div className="mt-5">
                  <label className="block text-[11px] uppercase font-semibold tracking-wider text-[#6B5E55] mb-1.5">
                    Select Grind
                  </label>
                  <select
                    value={selectedGrinds[bean.id] || 'Whole Bean'}
                    onChange={(e) => handleGrindChange(bean.id, e.target.value)}
                    className="w-full text-xs py-2 px-3 bg-white border border-[#DDD5CA] rounded-md text-[#241F1C] focus:outline-hidden focus:border-[#241F1C]"
                  >
                    {bean.grindOptions?.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Purchase Options */}
              <div className="mt-8 pt-5 border-t border-[#EAE4DC] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-mono text-xl font-bold text-[#241F1C] tabular-nums">
                      ${bean.price.toFixed(2)}
                    </span>
                    <span className="text-xs text-[#6B5E55]">/ 250g bag</span>
                  </div>
                  <div className="text-[11px] text-[#78350F] flex items-center gap-1 mt-0.5">
                    <Check className="w-3 h-3" />
                    <span>Free shipping on 2+ bags</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDirectAdd(bean, false)}
                    className="flex-1 sm:flex-none px-4 py-2.5 bg-[#241F1C] hover:bg-[#3D332D] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-2 active:scale-[0.98]"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add Bag</span>
                  </button>

                  <button
                    onClick={() => onOpenCustomizer(bean)}
                    className="px-3 py-2.5 bg-transparent hover:bg-[#F2ECE3] text-[#241F1C] border border-[#DDD5CA] text-xs font-semibold uppercase tracking-wider rounded-md transition-colors"
                  >
                    Options
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Subscription Banner */}
        <div className="mt-12 bg-[#241F1C] text-[#FAF8F5] rounded-xl p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs uppercase tracking-wider text-[#D4A373] font-semibold">
              Roaster's Choice Dispatch
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Never run out of freshly roasted beans.
            </h3>
            <p className="text-xs sm:text-sm text-[#D1C7BD] leading-relaxed">
              Save 15% on every shipment. Choose your preferred frequency (weekly, bi-weekly, or monthly) with full flexibility to pause or swap origins at any moment.
            </p>
          </div>
          <button
            onClick={() => handleDirectAdd(beanItems[0], true)}
            className="px-6 py-3.5 bg-[#D4A373] hover:bg-[#B88756] text-[#241F1C] text-xs font-bold uppercase tracking-wider rounded-md transition-colors shrink-0 shadow-sm"
          >
            Start Subscription · Save 15%
          </button>
        </div>

      </div>
    </section>
  );
};
