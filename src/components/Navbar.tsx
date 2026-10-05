import React, { useState } from 'react';
import { ShoppingBag, Calendar, Menu as MenuIcon, X } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenReservation
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EAE4DC] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark (Display face, no extra subtitle chips) */}
        <a 
          href="#" 
          className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-[#241F1C] hover:text-[#78350F] transition-colors"
        >
          Equinox Coffee
        </a>

        {/* Zone 2: 4-5 clean text navigation links with subtle hover underlines */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#574D45]">
          <a href="#menu" className="hover:text-[#241F1C] hover:underline underline-offset-8 transition-colors">
            Menu & Drinks
          </a>
          <a href="#beans" className="hover:text-[#241F1C] hover:underline underline-offset-8 transition-colors">
            Single Origins
          </a>
          <a href="#story" className="hover:text-[#241F1C] hover:underline underline-offset-8 transition-colors">
            Roastery Story
          </a>
          <a href="#brew-guide" className="hover:text-[#241F1C] hover:underline underline-offset-8 transition-colors">
            Brew Guide
          </a>
          <a href="#cafe" className="hover:text-[#241F1C] hover:underline underline-offset-8 transition-colors">
            Cafe & Hours
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenReservation}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-[#574D45] hover:text-[#241F1C] border border-[#DDD5CA] rounded-md hover:border-[#241F1C] transition-colors"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Table & Pickup</span>
          </button>

          <button
            onClick={onOpenCart}
            aria-label="View shopping bag"
            className="inline-flex items-center gap-2.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#241F1C] hover:bg-[#3D332D] rounded-md transition-colors shadow-xs active:scale-[0.98]"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Bag</span>
            {cartCount > 0 && (
              <span className="font-mono tabular-nums bg-[#78350F] text-[#FAF8F5] px-1.5 py-0.5 rounded text-[11px]">
                {cartCount}
              </span>
            )}
            {cartCount > 0 && (
              <span className="hidden lg:inline font-mono tabular-nums text-[#DDD5CA]">
                ${cartTotal.toFixed(2)}
              </span>
            )}
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#574D45] hover:text-[#241F1C] rounded-md focus:outline-hidden"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#EAE4DC] bg-[#FAF8F5] px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3 text-base font-medium text-[#241F1C]">
            <a 
              href="#menu" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#78350F]"
            >
              Menu & Drinks
            </a>
            <a 
              href="#beans" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#78350F]"
            >
              Single Origins
            </a>
            <a 
              href="#story" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#78350F]"
            >
              Roastery Story
            </a>
            <a 
              href="#brew-guide" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#78350F]"
            >
              Brew Guide
            </a>
            <a 
              href="#cafe" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#78350F]"
            >
              Cafe & Hours
            </a>
          </nav>
          <div className="pt-4 border-t border-[#EAE4DC] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="w-full py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-[#241F1C] border border-[#DDD5CA] rounded-md"
            >
              Reserve Table / Pickup
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
