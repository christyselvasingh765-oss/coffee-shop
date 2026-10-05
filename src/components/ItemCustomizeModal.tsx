import React, { useState } from 'react';
import { X, Plus, Minus, Check } from 'lucide-react';
import { CoffeeItem, CartItem } from '../types';

interface ItemCustomizeModalProps {
  item: CoffeeItem | null;
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
}

export const ItemCustomizeModal: React.FC<ItemCustomizeModalProps> = ({
  item,
  onClose,
  onAddToCart
}) => {
  if (!item) return null;

  const defaultSize = item.availableSizes?.[0] || '12oz';
  const [selectedSize, setSelectedSize] = useState<string>(defaultSize);
  const [selectedMilk, setSelectedMilk] = useState<string>(item.milkOptions?.[0] || 'Whole Organic Milk');
  const [selectedGrind, setSelectedGrind] = useState<string>(item.grindOptions?.[0] || 'Whole Bean');
  const [extraShot, setExtraShot] = useState<boolean>(false);
  const [isDecaf, setIsDecaf] = useState<boolean>(false);
  const [isSubscription, setIsSubscription] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [notes, setNotes] = useState<string>('');

  // Calculate price dynamically
  let unitPrice = item.price;
  if (selectedSize === '16oz') unitPrice += 0.80;
  if (selectedSize === '1kg') unitPrice = item.price * 3.4; // 1kg bag bulk discount
  if (extraShot) unitPrice += 1.00;
  if (selectedMilk === 'Oatly Barista Edition') unitPrice += 0.75;
  if (isSubscription) unitPrice = unitPrice * 0.85; // 15% subscriber savings

  const handleAdd = () => {
    const cartItem: CartItem = {
      cartId: `${item.id}-${Date.now()}`,
      item,
      quantity,
      size: selectedSize,
      milk: item.milkOptions ? selectedMilk : undefined,
      grind: item.grindOptions ? selectedGrind : undefined,
      isSubscription: isSubscription,
      notes: notes.trim() || (isDecaf ? 'Decaf Swiss Water Process' : undefined),
      unitPrice
    };
    onAddToCart(cartItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div 
        className="bg-[#FAF8F5] border border-[#DDD5CA] rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close customization modal"
          className="absolute top-5 right-5 p-1.5 text-[#574D45] hover:text-[#241F1C] hover:bg-[#EAE4DC] rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="pr-8 mb-4">
          <div className="text-xs uppercase tracking-wider text-[#78350F] font-semibold mb-1">
            {item.category === 'beans' ? 'Whole Bean Selection' : 'Custom Order'}
          </div>
          <h3 className="text-2xl font-serif font-bold text-[#241F1C]">{item.name}</h3>
          <p className="text-sm text-[#574D45] mt-1">{item.description}</p>
        </div>

        {/* Form Options */}
        <div className="space-y-5 pt-2 border-t border-[#EAE4DC]">
          
          {/* Size Selection */}
          {item.availableSizes && item.availableSizes.length > 1 && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#574D45] mb-2">
                Choose Size
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {item.availableSizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-3 text-xs font-medium rounded-md border text-center transition-all ${
                      selectedSize === size
                        ? 'border-[#241F1C] bg-[#241F1C] text-white shadow-xs'
                        : 'border-[#DDD5CA] bg-white text-[#574D45] hover:border-[#8C7E72]'
                    }`}
                  >
                    <span>{size}</span>
                    {size === '16oz' && <span className="block text-[10px] opacity-80">(+$0.80)</span>}
                    {size === '1kg' && <span className="block text-[10px] opacity-80">Roaster Pack</span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Milk Options for Coffee/Espresso */}
          {item.milkOptions && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#574D45] mb-2">
                Milk Choice
              </label>
              <div className="space-y-1.5">
                {item.milkOptions.map((milk) => (
                  <label
                    key={milk}
                    className={`flex items-center justify-between p-2.5 rounded-md border text-xs cursor-pointer transition-colors ${
                      selectedMilk === milk 
                        ? 'border-[#241F1C] bg-white font-semibold text-[#241F1C]' 
                        : 'border-[#EAE4DC] hover:bg-[#F2ECE3] text-[#574D45]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="milk"
                        value={milk}
                        checked={selectedMilk === milk}
                        onChange={() => setSelectedMilk(milk)}
                        className="text-[#78350F] focus:ring-[#78350F]"
                      />
                      <span>{milk}</span>
                    </div>
                    {milk.includes('Oatly') && (
                      <span className="font-mono text-[#78350F] text-[11px]">+ $0.75</span>
                    )}
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Grind Options for Beans */}
          {item.grindOptions && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#574D45] mb-2">
                Grind Selection (Ground Fresh Upon Order)
              </label>
              <div className="space-y-1.5">
                {item.grindOptions.map((grind) => (
                  <label
                    key={grind}
                    className={`flex items-center justify-between p-2.5 rounded-md border text-xs cursor-pointer transition-colors ${
                      selectedGrind === grind 
                        ? 'border-[#241F1C] bg-white font-semibold text-[#241F1C]' 
                        : 'border-[#EAE4DC] hover:bg-[#F2ECE3] text-[#574D45]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="grind"
                        value={grind}
                        checked={selectedGrind === grind}
                        onChange={() => setSelectedGrind(grind)}
                        className="text-[#78350F] focus:ring-[#78350F]"
                      />
                      <span>{grind}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Add-ons for Espresso */}
          {item.category === 'espresso' && (
            <div className="pt-2 border-t border-[#EAE4DC] space-y-2">
              <label className="flex items-center justify-between p-2.5 rounded-md border border-[#EAE4DC] bg-white text-xs cursor-pointer hover:bg-[#FAF8F5]">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={extraShot}
                    onChange={(e) => setExtraShot(e.target.checked)}
                    className="rounded text-[#78350F] focus:ring-[#78350F]"
                  />
                  <span>Add Extra Espresso Double Shot</span>
                </div>
                <span className="font-mono text-[#78350F] text-[11px]">+$1.00</span>
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-md border border-[#EAE4DC] bg-white text-xs cursor-pointer hover:bg-[#FAF8F5]">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isDecaf}
                    onChange={(e) => setIsDecaf(e.target.checked)}
                    className="rounded text-[#78350F] focus:ring-[#78350F]"
                  />
                  <span>Swiss Water Process Decaf</span>
                </div>
                <span className="text-[11px] text-[#6B5E55]">Free</span>
              </label>
            </div>
          )}

          {/* Subscription Toggle for Beans */}
          {item.category === 'beans' && (
            <div className="pt-2 border-t border-[#EAE4DC]">
              <label className="flex items-start gap-3 p-3 rounded-lg border border-[#78350F]/30 bg-[#78350F]/5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isSubscription}
                  onChange={(e) => setIsSubscription(e.target.checked)}
                  className="mt-0.5 rounded text-[#78350F] focus:ring-[#78350F]"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#241F1C]">Subscribe & Save 15%</span>
                    <span className="text-[10px] uppercase font-mono bg-[#78350F] text-white px-1.5 py-0.5 rounded">
                      Dispatched Bi-Weekly
                    </span>
                  </div>
                  <p className="text-[11px] text-[#574D45] mt-0.5">
                    Freshly roasted the morning of dispatch. Pause, reschedule, or cancel anytime.
                  </p>
                </div>
              </label>
            </div>
          )}

          {/* Special Preparation Instructions */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#574D45] mb-1">
              Barista Notes / Dietary Requests
            </label>
            <input
              type="text"
              placeholder="e.g. Extra hot, lightly sweetened, cinnamon sprinkle..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-[#DDD5CA] rounded-md bg-white focus:outline-hidden focus:border-[#78350F]"
            />
          </div>

          {/* Quantity & Add Action */}
          <div className="pt-4 border-t border-[#EAE4DC] flex items-center justify-between gap-4">
            <div className="flex items-center border border-[#DDD5CA] bg-white rounded-md">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Decrease quantity"
                className="p-2 text-[#574D45] hover:text-[#241F1C] hover:bg-[#F2ECE3] transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono tabular-nums text-xs px-3 font-semibold text-[#241F1C]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                aria-label="Increase quantity"
                className="p-2 text-[#574D45] hover:text-[#241F1C] hover:bg-[#F2ECE3] transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className="flex-1 py-3 px-4 bg-[#241F1C] hover:bg-[#3D332D] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-all flex items-center justify-between shadow-xs active:scale-[0.98]"
            >
              <span>Add to Bag</span>
              <span className="font-mono tabular-nums">
                ${(unitPrice * quantity).toFixed(2)}
              </span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
