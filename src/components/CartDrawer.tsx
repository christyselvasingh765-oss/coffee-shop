import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Check, ArrowRight, Clock, Coffee, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [orderType, setOrderType] = useState<'pickup' | 'dinein' | 'delivery'>('pickup');
  const [tipPercent, setTipPercent] = useState<number>(15);
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [pickupTime, setPickupTime] = useState<string>('As soon as ready (~12 mins)');
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [confirmedOrder, setConfirmedOrder] = useState<{
    id: string;
    items: CartItem[];
    total: number;
    pickupTime: string;
    name: string;
  } | null>(null);

  if (!isOpen) return null;

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const tax = subtotal * 0.0825; // 8.25% sales tax
  const tipAmount = (subtotal * tipPercent) / 100;
  const grandTotal = subtotal + tax + tipAmount;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    const orderId = `EQ-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmedOrder({
      id: orderId,
      items: [...items],
      total: grandTotal,
      pickupTime,
      name: customerName || 'Valued Guest'
    });
    onClearCart();
    setIsCheckingOut(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] border-l border-[#DDD5CA] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-[#EAE4DC] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-serif font-bold text-[#241F1C]">Your Coffee Bag</span>
              <span className="font-mono text-xs text-[#78350F] font-semibold bg-[#F2ECE3] px-2 py-0.5 rounded">
                {items.reduce((acc, i) => acc + i.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label="Close cart"
              className="p-1.5 text-[#6B5E55] hover:text-[#241F1C] hover:bg-[#EAE4DC] rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* If order just completed */}
            {confirmedOrder ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#78350F] text-white flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#241F1C]">
                  Order Confirmed!
                </h3>
                <div className="p-4 bg-white rounded-lg border border-[#DDD5CA] text-left text-xs space-y-2">
                  <div className="flex justify-between font-mono text-[#78350F] font-bold">
                    <span>Order #{confirmedOrder.id}</span>
                    <span>${confirmedOrder.total.toFixed(2)}</span>
                  </div>
                  <div className="text-[#574D45]">
                    <strong>Guest:</strong> {confirmedOrder.name}
                  </div>
                  <div className="text-[#574D45]">
                    <strong>Ready:</strong> {confirmedOrder.pickupTime}
                  </div>
                  <div className="pt-2 border-t border-[#EAE4DC] text-[11px] text-[#8C7E72]">
                    Our baristas are preparing your freshly extracted order at 244 High Street counter. Show this ticket upon arrival.
                  </div>
                </div>

                <button
                  onClick={() => {
                    setConfirmedOrder(null);
                    onClose();
                  }}
                  className="w-full py-3 bg-[#241F1C] text-white text-xs font-semibold uppercase tracking-wider rounded-md"
                >
                  Done
                </button>
              </div>
            ) : items.length === 0 ? (
              <div className="py-16 text-center text-[#8C7E72] space-y-3">
                <Coffee className="w-10 h-10 mx-auto opacity-40 text-[#574D45]" />
                <p className="text-sm font-serif text-[#241F1C]">Your bag is currently empty.</p>
                <p className="text-xs text-[#574D45] max-w-xs mx-auto">
                  Explore our handcrafted espresso bar, single-origin bean roasts, or fresh oven bakery.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-4 py-2 bg-[#241F1C] text-white text-xs font-semibold uppercase tracking-wider rounded-md"
                >
                  Browse Menu
                </button>
              </div>
            ) : isCheckingOut ? (
              /* Checkout Form */
              <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
                <div className="text-xs uppercase font-semibold text-[#78350F]">
                  Counter Pickup Details
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#6B5E55] mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Eleanor Vance"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-white border border-[#DDD5CA] rounded-md focus:border-[#241F1C]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#6B5E55] mb-1">
                    Mobile Phone (For Order SMS Alert)
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(555) 000-0000"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-white border border-[#DDD5CA] rounded-md focus:border-[#241F1C]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#6B5E55] mb-1">
                    Pickup Time
                  </label>
                  <select
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-white border border-[#DDD5CA] rounded-md focus:border-[#241F1C]"
                  >
                    <option value="As soon as ready (~12 mins)">As soon as ready (~12 mins)</option>
                    <option value="In 20 minutes">In 20 minutes</option>
                    <option value="In 30 minutes">In 30 minutes</option>
                    <option value="In 45 minutes">In 45 minutes</option>
                  </select>
                </div>

                <div className="pt-2 flex items-center gap-2 text-[11px] text-[#6B5E55]">
                  <ShieldCheck className="w-4 h-4 text-[#78350F]" />
                  <span>Instant contactless counter pickup with warm packaging</span>
                </div>
              </form>
            ) : (
              /* Itemized Cart List */
              <div className="space-y-4">
                
                {/* Fulfillment Mode Switcher */}
                <div className="grid grid-cols-3 gap-1 p-1 bg-[#EFE9DF] rounded-md border border-[#DDD5CA] text-center text-xs">
                  <button
                    type="button"
                    onClick={() => setOrderType('pickup')}
                    className={`py-1.5 rounded transition-all font-medium ${
                      orderType === 'pickup' ? 'bg-white text-[#241F1C] shadow-xs' : 'text-[#574D45]'
                    }`}
                  >
                    Pickup
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('dinein')}
                    className={`py-1.5 rounded transition-all font-medium ${
                      orderType === 'dinein' ? 'bg-white text-[#241F1C] shadow-xs' : 'text-[#574D45]'
                    }`}
                  >
                    Dine-In
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`py-1.5 rounded transition-all font-medium ${
                      orderType === 'delivery' ? 'bg-white text-[#241F1C] shadow-xs' : 'text-[#574D45]'
                    }`}
                  >
                    Ship Beans
                  </button>
                </div>

                {/* Items */}
                <div className="space-y-3">
                  {items.map((cartItem) => (
                    <div
                      key={cartItem.cartId}
                      className="p-3.5 bg-white border border-[#EAE4DC] rounded-lg shadow-2xs flex flex-col justify-between"
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h4 className="text-sm font-semibold text-[#241F1C]">
                            {cartItem.item.name}
                          </h4>
                          <div className="text-[11px] text-[#78350F] font-mono mt-0.5">
                            {cartItem.size}
                            {cartItem.milk && ` · ${cartItem.milk.split(' ')[0]}`}
                            {cartItem.grind && ` · ${cartItem.grind}`}
                            {cartItem.isSubscription && ` · Subscribed (-15%)`}
                          </div>
                          {cartItem.notes && (
                            <p className="text-[10px] text-[#8C7E72] mt-0.5 italic">
                              "{cartItem.notes}"
                            </p>
                          )}
                        </div>

                        <button
                          onClick={() => onRemoveItem(cartItem.cartId)}
                          aria-label="Remove item"
                          className="text-[#8C7E72] hover:text-[#78350F] p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="mt-3 pt-2 border-t border-[#F2ECE3] flex items-center justify-between">
                        <div className="flex items-center border border-[#DDD5CA] rounded bg-[#FAF8F5]">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(cartItem.cartId, -1)}
                            className="p-1 hover:text-[#78350F]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono text-xs px-2 tabular-nums font-semibold">
                            {cartItem.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(cartItem.cartId, 1)}
                            className="p-1 hover:text-[#78350F]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="font-mono text-sm font-bold text-[#241F1C] tabular-nums">
                          ${(cartItem.unitPrice * cartItem.quantity).toFixed(2)}
                        </div>
                      </div>

                    </div>
                  ))}
                </div>

                {/* Barista Tip Selector */}
                <div className="p-3.5 bg-white border border-[#EAE4DC] rounded-lg">
                  <div className="text-xs font-semibold text-[#241F1C] mb-2 flex justify-between">
                    <span>Barista Team Gratuity</span>
                    <span className="font-mono text-[#78350F]">${tipAmount.toFixed(2)}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5 text-xs font-mono">
                    {[10, 15, 20, 0].map((pct) => (
                      <button
                        key={pct}
                        type="button"
                        onClick={() => setTipPercent(pct)}
                        className={`py-1 rounded border text-center transition-all ${
                          tipPercent === pct
                            ? 'bg-[#241F1C] text-white border-[#241F1C]'
                            : 'bg-[#FAF8F5] text-[#574D45] border-[#DDD5CA]'
                        }`}
                      >
                        {pct === 0 ? 'None' : `${pct}%`}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            )}

          </div>

          {/* Footer Totals & Action */}
          {items.length > 0 && !confirmedOrder && (
            <div className="p-6 border-t border-[#EAE4DC] bg-white space-y-3">
              <div className="space-y-1.5 text-xs text-[#574D45]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax</span>
                  <span className="font-mono tabular-nums">${tax.toFixed(2)}</span>
                </div>
                {tipAmount > 0 && (
                  <div className="flex justify-between">
                    <span>Barista Tip ({tipPercent}%)</span>
                    <span className="font-mono tabular-nums">${tipAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-[#EAE4DC] flex justify-between text-base font-bold text-[#241F1C]">
                  <span>Total</span>
                  <span className="font-mono tabular-nums">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {isCheckingOut ? (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="px-4 py-3 bg-[#FAF8F5] hover:bg-[#F2ECE3] text-[#574D45] border border-[#DDD5CA] rounded-md text-xs font-semibold uppercase"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    form="checkout-form"
                    className="flex-1 py-3 bg-[#78350F] hover:bg-[#5C290B] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors shadow-xs"
                  >
                    Confirm & Send Order
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsCheckingOut(true)}
                  className="w-full py-3.5 bg-[#241F1C] hover:bg-[#3D332D] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-2 shadow-xs active:scale-[0.98]"
                >
                  <span>Proceed to Pickup Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
