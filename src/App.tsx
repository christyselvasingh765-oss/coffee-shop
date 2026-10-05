/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { BeansShowcase } from './components/BeansShowcase';
import { TasteQuiz } from './components/TasteQuiz';
import { BrewGuide } from './components/BrewGuide';
import { CafeStory } from './components/CafeStory';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ItemCustomizeModal } from './components/ItemCustomizeModal';
import { ReservationModal } from './components/ReservationModal';
import { CartItem, CoffeeItem } from './types';
import { Check } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [customizingItem, setCustomizingItem] = useState<CoffeeItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  const handleAddToCart = (newItem: CartItem) => {
    setCartItems((prev) => {
      // Check if item with same configuration already exists
      const existingIndex = prev.findIndex(
        (i) =>
          i.item.id === newItem.item.id &&
          i.size === newItem.size &&
          i.milk === newItem.milk &&
          i.grind === newItem.grind &&
          i.isSubscription === newItem.isSubscription
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += newItem.quantity;
        return updated;
      }
      return [...prev, newItem];
    });

    showToast(`Added ${newItem.item.name} to bag`);
  };

  const handleQuickAdd = (item: CoffeeItem) => {
    const isBean = item.category === 'beans';
    const quickItem: CartItem = {
      cartId: `${item.id}-${Date.now()}`,
      item,
      quantity: 1,
      size: isBean ? '250g' : (item.availableSizes?.[0] || '12oz'),
      milk: item.milkOptions ? item.milkOptions[0] : undefined,
      grind: isBean ? 'Whole Bean' : undefined,
      unitPrice: item.price
    };
    handleAddToCart(quickItem);
  };

  const handleUpdateQuantity = (cartId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.cartId === cartId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((i): i is CartItem => i !== null)
    );
  };

  const handleRemoveItem = (cartId: string) => {
    setCartItems((prev) => prev.filter((i) => i.cartId !== cartId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#241F1C] flex flex-col font-sans selection:bg-[#78350F]/20 selection:text-[#78350F]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#241F1C] text-white px-4 py-3 rounded-lg shadow-xl border border-[#3E362F] flex items-center gap-2.5 text-xs animate-in slide-in-from-bottom-3 duration-200">
          <div className="w-5 h-5 rounded-full bg-[#78350F] flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-medium">{toastMessage}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="ml-2 underline font-semibold text-[#D4A373] hover:text-white transition-colors"
          >
            View Bag
          </button>
        </div>
      )}

      {/* Top Bar Navigation */}
      <Navbar
        cartCount={totalItemCount}
        cartTotal={cartSubtotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => setIsReservationOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          onExploreMenu={() => scrollToSection('menu')}
          onExploreBeans={() => scrollToSection('beans')}
        />

        <MenuSection
          onSelectItem={(item) => setCustomizingItem(item)}
          onQuickAdd={handleQuickAdd}
        />

        <BeansShowcase
          onAddToCart={handleAddToCart}
          onOpenCustomizer={(item) => setCustomizingItem(item)}
        />

        <TasteQuiz onAddToCart={handleAddToCart} />

        <BrewGuide />

        <CafeStory onOpenReservation={() => setIsReservationOpen(true)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Item Customization Modal */}
      <ItemCustomizeModal
        item={customizingItem}
        onClose={() => setCustomizingItem(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Table & Pickup Scheduling Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />

    </div>
  );
}
