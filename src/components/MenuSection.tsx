import React, { useState, useMemo } from 'react';
import { Search, Plus, SlidersHorizontal } from 'lucide-react';
import { COFFEE_ITEMS } from '../data/coffeeData';
import { CoffeeItem, CategoryType } from '../types';

interface MenuSectionProps {
  onSelectItem: (item: CoffeeItem) => void;
  onQuickAdd: (item: CoffeeItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onSelectItem, onQuickAdd }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories: { id: CategoryType; label: string }[] = [
    { id: 'all', label: 'Complete Menu' },
    { id: 'espresso', label: 'Handcrafted Espresso' },
    { id: 'filter', label: 'Pour Over & Filter' },
    { id: 'cold', label: 'Cold Brew & Tonics' },
    { id: 'beans', label: 'Roastery Beans' },
    { id: 'bakery', label: 'Artisan Bakery' },
  ];

  const filteredItems = useMemo(() => {
    return COFFEE_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.tastingNotes && item.tastingNotes.some(n => n.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="menu" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-[#EAE4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#EAE4DC]">
          <div>
            <div className="text-xs uppercase tracking-wider text-[#78350F] font-semibold mb-2">
              Cafe & Roastery Offerings
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#241F1C] tracking-tight">
              Artisan Drinks & Hearth Bakery
            </h2>
            <p className="text-sm text-[#574D45] mt-1 max-w-xl">
              Prepared to order with milk from local organic pastures, triple-filtered water, and freshly roasted single-lot coffees.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative min-w-[240px] sm:w-72">
            <Search className="w-4 h-4 text-[#8C7E72] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search drinks, beans, pastry..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-[#DDD5CA] rounded-md text-[#241F1C] placeholder:text-[#8C7E72] focus:outline-hidden focus:border-[#241F1C] transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#8C7E72] hover:text-[#241F1C]"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Functional Segmented Filter Buttons */}
        <div className="flex items-center gap-1.5 py-6 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#241F1C] text-white shadow-xs'
                  : 'bg-[#F2ECE3] text-[#574D45] hover:bg-[#EAE4DC] hover:text-[#241F1C]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center text-[#6B5E55]">
            <p className="text-base font-serif">No items found matching "{searchQuery}"</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              className="mt-3 text-xs uppercase tracking-wider text-[#78350F] font-semibold underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group flex flex-col justify-between bg-white border border-[#EAE4DC] rounded-xl overflow-hidden shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div>
                  {/* Optional Image Preview */}
                  {item.image ? (
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#EFE9DF]">
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      {item.popular && (
                        <div className="absolute top-3 left-3 bg-[#241F1C]/90 backdrop-blur-xs text-white text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded">
                          Cafe Favorite
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="h-2 bg-transparent" />
                  )}

                  {/* Content Container */}
                  <div className="p-5 sm:p-6">
                    {/* Clean unboxed metadata */}
                    <div className="flex items-center gap-1.5 text-xs text-[#78350F] font-medium mb-1">
                      <span>{item.subtitle}</span>
                      {item.origin && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-[#6B5E55]">{item.origin}</span>
                        </>
                      )}
                    </div>

                    <h3 className="text-lg font-serif font-bold text-[#241F1C] group-hover:text-[#78350F] transition-colors">
                      {item.name}
                    </h3>

                    <p className="text-xs text-[#574D45] mt-2 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Tasting notes as quiet text separators */}
                    {item.tastingNotes && item.tastingNotes.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-[#F2ECE3] flex items-center gap-1.5 text-[11px] text-[#6B5E55]">
                        <span className="font-semibold text-[#241F1C]">Notes:</span>
                        {item.tastingNotes.map((note, idx) => (
                          <React.Fragment key={note}>
                            {idx > 0 && <span aria-hidden="true">·</span>}
                            <span>{note}</span>
                          </React.Fragment>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Bar: Price & Action */}
                <div className="px-5 sm:px-6 py-4 bg-[#FAF8F5] border-t border-[#EAE4DC] flex items-center justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs text-[#6B5E55]">from</span>
                    <span className="font-mono tabular-nums text-base font-semibold text-[#241F1C]">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectItem(item)}
                      className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#574D45] hover:text-[#241F1C] border border-[#DDD5CA] hover:border-[#241F1C] rounded-md transition-colors flex items-center gap-1.5"
                    >
                      <SlidersHorizontal className="w-3 h-3" />
                      <span>Customize</span>
                    </button>
                    
                    <button
                      onClick={() => onQuickAdd(item)}
                      aria-label={`Quick add ${item.name} to bag`}
                      className="p-1.5 bg-[#241F1C] hover:bg-[#3D332D] text-white rounded-md transition-colors"
                      title="Quick Add to Bag"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
