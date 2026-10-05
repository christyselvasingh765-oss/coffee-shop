import React, { useState } from 'react';
import { Sparkles, ArrowRight, RotateCcw, Check, ShoppingBag } from 'lucide-react';
import { COFFEE_ITEMS } from '../data/coffeeData';
import { CoffeeItem, CartItem } from '../types';

interface TasteQuizProps {
  onAddToCart: (cartItem: CartItem) => void;
}

export const TasteQuiz: React.FC<TasteQuizProps> = ({ onAddToCart }) => {
  const [step, setStep] = useState<number>(0);
  const [answers, setAnswers] = useState<{
    method?: string;
    flavor?: string;
    roast?: string;
  }>({});

  const handleSelectOption = (field: 'method' | 'flavor' | 'roast', value: string) => {
    const updated = { ...answers, [field]: value };
    setAnswers(updated);
    setStep((prev) => prev + 1);
  };

  const handleReset = () => {
    setAnswers({});
    setStep(0);
  };

  // Determine recommendation based on choices
  const getRecommendation = (): CoffeeItem => {
    const beans = COFFEE_ITEMS.filter((i) => i.category === 'beans');
    if (answers.flavor === 'floral') {
      return beans.find((b) => b.id === 'bean-chelchele') || beans[0];
    }
    if (answers.flavor === 'fruity') {
      return beans.find((b) => b.id === 'bean-pink-bourbon') || beans[1];
    }
    if (answers.method === 'espresso' || answers.flavor === 'chocolate') {
      return beans.find((b) => b.id === 'bean-equinox-blend') || beans[2];
    }
    return beans.find((b) => b.id === 'bean-guatemala-antigua') || beans[3];
  };

  const recommendedCoffee = getRecommendation();

  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-[#EAE4DC]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-xs uppercase tracking-wider text-[#78350F] font-semibold mb-2 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Taste Profiler</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#241F1C] tracking-tight">
            Find Your Ideal Roast Match
          </h2>
          <p className="text-xs sm:text-sm text-[#574D45] mt-2 max-w-lg mx-auto">
            Answer 3 quick questions about your morning routine and taste preference to discover your bespoke single origin lot.
          </p>
        </div>

        {/* Quiz Steps Container */}
        <div className="bg-white border border-[#EAE4DC] rounded-xl p-6 sm:p-10 shadow-xs">
          
          {step === 0 && (
            <div className="space-y-6">
              <div className="text-xs text-[#8C7E72] uppercase font-semibold">Question 1 of 3</div>
              <h3 className="text-xl font-serif font-bold text-[#241F1C]">
                How do you brew coffee at home?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {[
                  { id: 'filter', title: 'Pour Over / Chemex', desc: 'Light, tea-like clarity & aromatics' },
                  { id: 'espresso', title: 'Espresso / Moka', desc: 'Thick crema & concentrated body' },
                  { id: 'immersion', title: 'French Press / Cold Brew', desc: 'Rich sweetness & heavy mouthfeel' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption('method', opt.id)}
                    className="p-5 text-left border border-[#DDD5CA] rounded-lg hover:border-[#241F1C] hover:bg-[#FAF8F5] transition-all group"
                  >
                    <div className="text-sm font-semibold text-[#241F1C] group-hover:text-[#78350F]">
                      {opt.title}
                    </div>
                    <div className="text-xs text-[#6B5E55] mt-1">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <div className="text-xs text-[#8C7E72] uppercase font-semibold">Question 2 of 3</div>
              <h3 className="text-xl font-serif font-bold text-[#241F1C]">
                What flavor notes excite your palate?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {[
                  { id: 'floral', title: 'Floral & Delicate Citrus', desc: 'Jasmine blossom, bergamot, lemon zest' },
                  { id: 'fruity', title: 'Exotic Tropical Fruits', desc: 'Pink guava, blood orange, wild honey' },
                  { id: 'chocolate', title: 'Deep Chocolate & Nuts', desc: 'Dark cocoa, toasted hazelnut, caramel' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption('flavor', opt.id)}
                    className="p-5 text-left border border-[#DDD5CA] rounded-lg hover:border-[#241F1C] hover:bg-[#FAF8F5] transition-all group"
                  >
                    <div className="text-sm font-semibold text-[#241F1C] group-hover:text-[#78350F]">
                      {opt.title}
                    </div>
                    <div className="text-xs text-[#6B5E55] mt-1">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-xs text-[#8C7E72] uppercase font-semibold">Question 3 of 3</div>
              <h3 className="text-xl font-serif font-bold text-[#241F1C]">
                What roast level suits your mood?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {[
                  { id: 'light', title: 'Nordic Light Roast', desc: 'Bright, vibrant acidity highlighting pure soil & altitude terroir' },
                  { id: 'medium', title: 'Balanced Medium Roast', desc: 'Smooth, caramel-forward with low acidity, fantastic black or with milk' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption('roast', opt.id)}
                    className="p-5 text-left border border-[#DDD5CA] rounded-lg hover:border-[#241F1C] hover:bg-[#FAF8F5] transition-all group"
                  >
                    <div className="text-sm font-semibold text-[#241F1C] group-hover:text-[#78350F]">
                      {opt.title}
                    </div>
                    <div className="text-xs text-[#6B5E55] mt-1">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quiz Result View */}
          {step >= 3 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-[#78350F] font-semibold">
                  Your Bespoke Recommendation
                </span>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 text-xs text-[#8C7E72] hover:text-[#241F1C]"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Quiz</span>
                </button>
              </div>

              <div className="p-6 bg-[#FAF8F5] rounded-xl border border-[#EAE4DC] flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <div className="text-xs text-[#78350F] font-semibold uppercase tracking-wider">
                    {recommendedCoffee.origin} · {recommendedCoffee.roastLevel} Roast
                  </div>
                  <h4 className="text-2xl font-serif font-bold text-[#241F1C] mt-1">
                    {recommendedCoffee.name}
                  </h4>
                  <p className="text-xs text-[#574D45] mt-2 max-w-lg leading-relaxed">
                    {recommendedCoffee.description}
                  </p>
                  
                  {recommendedCoffee.tastingNotes && (
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-[#6B5E55]">
                      <span className="font-semibold text-[#241F1C]">Tasting notes:</span>
                      <span>{recommendedCoffee.tastingNotes.join(' · ')}</span>
                    </div>
                  )}
                </div>

                <div className="text-right sm:border-l sm:border-[#DDD5CA] sm:pl-6 shrink-0 w-full sm:w-auto">
                  <div className="font-mono text-2xl font-bold text-[#241F1C] mb-2">
                    ${recommendedCoffee.price.toFixed(2)}
                  </div>
                  <button
                    onClick={() => {
                      onAddToCart({
                        cartId: `${recommendedCoffee.id}-${Date.now()}`,
                        item: recommendedCoffee,
                        quantity: 1,
                        size: '250g',
                        grind: answers.method === 'espresso' ? 'Espresso (Fine)' : 'Pour Over / Aeropress (Medium)',
                        unitPrice: recommendedCoffee.price
                      });
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 bg-[#241F1C] hover:bg-[#3D332D] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add 250g Bag</span>
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
