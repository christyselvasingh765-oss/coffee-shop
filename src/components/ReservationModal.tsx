import React, { useState } from 'react';
import { X, Check, Calendar, Users, Clock, MapPin } from 'lucide-react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [guests, setGuests] = useState('2');
  const [area, setArea] = useState('Roastery Bar (Main Room)');
  const [time, setTime] = useState('10:00 AM');
  const [date, setDate] = useState('Today, Oct 5');
  const [notes, setNotes] = useState('');
  const [confirmationCode, setConfirmationCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `TBL-${Math.floor(100 + Math.random() * 900)}`;
    setConfirmationCode(code);
  };

  const handleReset = () => {
    setConfirmationCode(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div 
        className="bg-[#FAF8F5] border border-[#DDD5CA] rounded-xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close reservation modal"
          className="absolute top-5 right-5 p-1.5 text-[#574D45] hover:text-[#241F1C] hover:bg-[#EAE4DC] rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmationCode ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#78350F] text-white flex items-center justify-center">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#241F1C]">
              Table Reserved!
            </h3>
            <p className="text-xs text-[#574D45]">
              We have set aside a welcoming spot for you at Equinox Coffee.
            </p>
            <div className="p-4 bg-white rounded-lg border border-[#DDD5CA] text-left text-xs space-y-2">
              <div className="flex justify-between font-mono font-bold text-[#78350F]">
                <span>Reservation Ref</span>
                <span>{confirmationCode}</span>
              </div>
              <div className="text-[#574D45]">
                <strong>Guest:</strong> {name} ({guests} guests)
              </div>
              <div className="text-[#574D45]">
                <strong>Time:</strong> {date} at {time}
              </div>
              <div className="text-[#574D45]">
                <strong>Seating Area:</strong> {area}
              </div>
            </div>
            <button
              onClick={handleReset}
              className="w-full py-3 bg-[#241F1C] text-white text-xs font-semibold uppercase tracking-wider rounded-md"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-[#78350F] font-semibold mb-1">
                Cafe Table Reservation
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#241F1C]">
                Save Your Seat at Equinox
              </h3>
              <p className="text-xs text-[#574D45] mt-1">
                Whether meeting a friend, hosting a quiet coffee tasting, or focusing on work, we’ll reserve your space.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-[11px] uppercase font-semibold text-[#6B5E55] mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Julian Hayes"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-white border border-[#DDD5CA] rounded-md focus:border-[#241F1C]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-semibold text-[#6B5E55] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="julian@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-white border border-[#DDD5CA] rounded-md focus:border-[#241F1C]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] uppercase font-semibold text-[#6B5E55] mb-1">
                  Party Size
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-white border border-[#DDD5CA] rounded-md focus:border-[#241F1C]"
                >
                  <option value="1">1 Person (Quiet Spot)</option>
                  <option value="2">2 People</option>
                  <option value="3">3 People</option>
                  <option value="4">4 People</option>
                  <option value="5+">5+ Group Table</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase font-semibold text-[#6B5E55] mb-1">
                  Seating Area
                </label>
                <select
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-white border border-[#DDD5CA] rounded-md focus:border-[#241F1C]"
                >
                  <option value="Roastery Bar (Main Room)">Roastery Bar (Main Room)</option>
                  <option value="Sunlit Courtyard Patio">Sunlit Courtyard Patio</option>
                  <option value="Quiet Library Nook">Quiet Library Nook</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] uppercase font-semibold text-[#6B5E55] mb-1">
                  Day
                </label>
                <select
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-white border border-[#DDD5CA] rounded-md focus:border-[#241F1C]"
                >
                  <option value="Today, Oct 5">Today, Oct 5</option>
                  <option value="Tomorrow, Oct 6">Tomorrow, Oct 6</option>
                  <option value="Wednesday, Oct 7">Wednesday, Oct 7</option>
                  <option value="Thursday, Oct 8">Thursday, Oct 8</option>
                  <option value="Friday, Oct 9">Friday, Oct 9</option>
                  <option value="Saturday, Oct 10">Saturday, Oct 10</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase font-semibold text-[#6B5E55] mb-1">
                  Time
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-white border border-[#DDD5CA] rounded-md focus:border-[#241F1C]"
                >
                  <option value="8:30 AM">8:30 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:30 AM">11:30 AM</option>
                  <option value="1:00 PM">1:00 PM</option>
                  <option value="2:30 PM">2:30 PM</option>
                  <option value="4:00 PM">4:00 PM</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase font-semibold text-[#6B5E55] mb-1">
                Special Requests or Dietary Notes (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. High chair needed, dog accompanying, power outlet..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-white border border-[#DDD5CA] rounded-md focus:border-[#241F1C]"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-[#241F1C] hover:bg-[#3D332D] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors"
              >
                Confirm Table Reservation
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
