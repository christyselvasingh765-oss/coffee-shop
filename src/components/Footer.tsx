import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#1C1815] text-[#D1C7BD] pt-16 pb-12 border-t border-[#2E2823]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#2E2823]">
          
          {/* Column 1: Brand Wordmark & Ethos */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-2xl font-serif font-bold tracking-tight text-white block">
              Equinox Coffee
            </span>
            <p className="text-xs text-[#A89F95] leading-relaxed max-w-sm">
              Artisan specialty roastery and neighborhood espresso bar in the historic district. Sourcing clean micro-lots, roasting with care, and celebrating honest coffee culture.
            </p>
            <div className="text-xs font-mono text-[#D4A373]">
              244 High Street · Historic Quarter
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-white">
              Explore
            </div>
            <ul className="space-y-2 text-xs text-[#A89F95]">
              <li><a href="#menu" className="hover:text-white transition-colors">Cafe Drinks & Food</a></li>
              <li><a href="#beans" className="hover:text-white transition-colors">Single Origin Beans</a></li>
              <li><a href="#brew-guide" className="hover:text-white transition-colors">Brewing Calculator</a></li>
              <li><a href="#cafe" className="hover:text-white transition-colors">Hours & Seating</a></li>
            </ul>
          </div>

          {/* Column 3: Hours & Contact */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-white">
              Roastery & Cafe
            </div>
            <div className="space-y-1.5 text-xs text-[#A89F95]">
              <div className="flex justify-between">
                <span>Mon – Fri</span>
                <span className="font-mono text-white">7:00 AM – 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sat – Sun</span>
                <span className="font-mono text-white">8:00 AM – 6:00 PM</span>
              </div>
              <div className="pt-2 text-[11px] text-[#8C7E72]">
                Kitchen & bakery service until 3:00 PM daily. Espresso bar open until close.
              </div>
            </div>
          </div>

          {/* Column 4: Roaster Dispatch Letter */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-white">
              The Harvest Dispatch
            </div>
            <p className="text-xs text-[#A89F95]">
              Receive first notices of limited micro-lot arrivals, cupping sessions, and home brewing workshops.
            </p>

            {subscribed ? (
              <div className="p-2.5 bg-[#2E2823] rounded-md text-xs text-[#D4A373] flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Thank you. You're on the harvest list.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-1.5">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-[#28221D] border border-[#3E362F] rounded-md text-white placeholder:text-[#8C7E72] focus:outline-hidden focus:border-[#D4A373]"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="px-3 bg-[#D4A373] hover:bg-[#B88756] text-[#1C1815] rounded-md transition-colors flex items-center justify-center shrink-0"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar: Quiet Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C7E72]">
          <div>
            © {new Date().getFullYear()} Equinox Coffee Roasters Co. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Direct Trade Specialty Grade</span>
            <span>·</span>
            <span>Small Batch Cast Iron Roasted</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
