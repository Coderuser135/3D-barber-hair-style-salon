import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check, ChevronLeft, ChevronRight, Calendar, Clock, User, Scissors, Sparkles, CheckCircle2, X,
} from 'lucide-react';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import PageTransition from '@/components/common/PageTransition';
import { useBooking } from '@/context/BookingContext';
import { services } from '@/data/services';
import { hairstyles } from '@/data/hairstyles';
import { barbers } from '@/data/barbers';

const steps = [
  { label: 'Service', icon: Sparkles },
  { label: 'Hairstyle', icon: Scissors },
  { label: 'Barber', icon: User },
  { label: 'Date', icon: Calendar },
  { label: 'Time', icon: Clock },
  { label: 'Details', icon: User },
  { label: 'Confirm', icon: Check },
];

export default function Book() {
  useDocumentTitle('Book Appointment');
  const navigate = useNavigate();
  const { booking, updateBooking, resetBooking, confirmBooking, confirmed } = useBooking();
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});

  const canProceed = () => {
    switch (step) {
      case 0: return !!booking.serviceId;
      case 1: return !!booking.hairstyleId;
      case 2: return !!booking.barberId;
      case 3: return !!booking.date;
      case 4: return !!booking.time;
      case 5:
        return !!booking.name && !!booking.phone;
      default: return true;
    }
  };

  const next = () => {
    if (!canProceed()) {
      const err = {};
      if (step === 5) {
        if (!booking.name) err.name = 'Name is required';
        if (!booking.phone) err.phone = 'Phone is required';
      }
      setErrors(err);
      return;
    }
    setErrors({});
    if (step < steps.length - 1) setStep(step + 1);
  };

  const prev = () => {
    setErrors({});
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = () => {
    confirmBooking();
    setStep(steps.length);
  };

  // Confirmation screen
  if (confirmed) {
    const service = services.find((s) => s.id === booking.serviceId);
    const hairstyle = hairstyles.find((h) => h.id === booking.hairstyleId);
    const barber = barbers.find((b) => b.id === booking.barberId);

    return (
      <PageTransition>
        <div className="px-5 lg:px-12 lg:max-w-2xl lg:mx-auto pt-10 pb-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card-surface p-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
              className="w-20 h-20 rounded-full bg-gold-400/15 flex items-center justify-center mx-auto mb-5"
            >
              <CheckCircle2 size={40} className="text-gold-400" />
            </motion.div>
            <h1 className="font-display text-2xl font-bold text-gray-50 mb-2">Appointment Request Created</h1>
            <p className="text-sm text-gray-400 mb-1">This is a frontend demo confirmation.</p>
            <p className="text-sm text-gray-400 mb-6">No appointment was stored on a server.</p>

            <div className="card-surface p-5 text-left mb-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Reference</span>
                <span className="font-mono text-gold-300">{confirmed.ref}</span>
              </div>
              {service && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Service</span>
                  <span className="text-gray-200">{service.name}</span>
                </div>
              )}
              {hairstyle && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Hairstyle</span>
                  <span className="text-gray-200">{hairstyle.name}</span>
                </div>
              )}
              {barber && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Barber</span>
                  <span className="text-gray-200">{barber.name}</span>
                </div>
              )}
              {booking.date && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Date</span>
                  <span className="text-gray-200">{booking.date}</span>
                </div>
              )}
              {booking.time && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Time</span>
                  <span className="text-gray-200">{booking.time}</span>
                </div>
              )}
              {booking.name && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Name</span>
                  <span className="text-gray-200">{booking.name}</span>
                </div>
              )}
              {booking.phone && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Phone</span>
                  <span className="text-gray-200">{booking.phone}</span>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => { resetBooking(); setStep(0); navigate('/'); }}
                className="btn-outline flex-1 py-3 text-sm"
              >
                Done
              </button>
              <button
                onClick={() => { resetBooking(); setStep(0); }}
                className="btn-gold flex-1 py-3 text-sm"
              >
                New Booking
              </button>
            </div>
          </motion.div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="px-5 lg:px-12 lg:max-w-3xl lg:mx-auto pt-6 pb-10">
        <h1 className="font-display text-3xl font-bold text-gray-50 mb-1">Book Appointment</h1>
        <p className="text-sm text-gray-500 mb-6">Frontend demo — no data is sent or stored</p>

        {/* Progress indicator */}
        <div className="flex items-center justify-between mb-8 px-2">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const done = i < step;
            const current = i === step;
            return (
              <div key={s.label} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                      done
                        ? 'bg-gold-400 text-ink-950'
                        : current
                        ? 'bg-gold-400/20 border border-gold-400 text-gold-300'
                        : 'bg-ink-700 text-gray-500'
                    }`}
                  >
                    {done ? <Check size={16} /> : <Icon size={14} />}
                  </div>
                  <span className={`text-[10px] hidden sm:block ${current ? 'text-gold-300' : 'text-gray-600'}`}>
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-1 ${i < step ? 'bg-gold-400' : 'bg-ink-700'}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {step === 0 && <StepService selected={booking.serviceId} onSelect={(id) => updateBooking({ serviceId: id })} />}
            {step === 1 && <StepHairstyle selected={booking.hairstyleId} onSelect={(id) => updateBooking({ hairstyleId: id })} />}
            {step === 2 && <StepBarber selected={booking.barberId} onSelect={(id) => updateBooking({ barberId: id })} />}
            {step === 3 && <StepDate selected={booking.date} onSelect={(date) => updateBooking({ date })} />}
            {step === 4 && <StepTime selected={booking.time} onSelect={(time) => updateBooking({ time })} />}
            {step === 5 && <StepDetails booking={booking} updateBooking={updateBooking} errors={errors} />}
            {step === 6 && <StepConfirm booking={booking} />}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex gap-3 mt-8">
          {step > 0 && (
            <button onClick={prev} className="btn-outline px-5 py-3 text-sm flex items-center gap-2">
              <ChevronLeft size={16} />
              Back
            </button>
          )}
          {step < steps.length - 1 ? (
            <button
              onClick={next}
              disabled={!canProceed()}
              className="btn-gold flex-1 py-3 text-sm flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continue
              <ChevronRight size={16} />
            </button>
          ) : (
            <button onClick={handleSubmit} className="btn-gold flex-1 py-3 text-sm flex items-center justify-center gap-2">
              <Check size={16} />
              Confirm Booking
            </button>
          )}
        </div>

        {!canProceed() && step < 5 && (
          <p className="text-xs text-gray-600 text-center mt-3">Select an option to continue</p>
        )}
      </div>
    </PageTransition>
  );
}

// ── Step components ──────────────────────────────────────────────

function StepService({ selected, onSelect }) {
  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-gray-50 mb-4">Select a Service</h2>
      <div className="space-y-2">
        {services.map((s) => (
          <button
            key={s.id}
            onClick={() => onSelect(s.id)}
            className={`w-full card-surface p-4 flex items-center justify-between text-left transition-colors ${
              selected === s.id ? 'border-gold-400/40 bg-gold-400/5' : ''
            }`}
          >
            <div>
              <h3 className="font-semibold text-gray-50">{s.name}</h3>
              <p className="text-sm text-gray-400">{s.duration} · ${s.price}</p>
            </div>
            {selected === s.id && <Check size={20} className="text-gold-400" />}
          </button>
        ))}
      </div>
    </div>
  );
}

function StepHairstyle({ selected, onSelect }) {
  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-gray-50 mb-4">Select a Hairstyle</h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {hairstyles.map((h) => (
          <button
            key={h.id}
            onClick={() => onSelect(h.id)}
            className={`card-surface overflow-hidden text-left transition-colors ${
              selected === h.id ? 'border-gold-400/40' : ''
            }`}
          >
            <div className="relative aspect-square">
              <img src={h.image} alt={h.name} loading="lazy" className="w-full h-full object-cover" />
              {selected === h.id && (
                <div className="absolute inset-0 bg-gold-400/20 flex items-center justify-center">
                  <Check size={28} className="text-gold-400" />
                </div>
              )}
            </div>
            <p className="p-2 text-xs font-medium text-gray-200 truncate">{h.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

function StepBarber({ selected, onSelect }) {
  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-gray-50 mb-4">Select a Barber</h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {barbers.map((b) => (
          <button
            key={b.id}
            onClick={() => onSelect(b.id)}
            className={`card-surface overflow-hidden text-left transition-colors ${
              selected === b.id ? 'border-gold-400/40' : ''
            }`}
          >
            <div className="relative aspect-square">
              <img src={b.image} alt={b.name} loading="lazy" className="w-full h-full object-cover" />
              {selected === b.id && (
                <div className="absolute inset-0 bg-gold-400/20 flex items-center justify-center">
                  <Check size={28} className="text-gold-400" />
                </div>
              )}
            </div>
            <div className="p-3">
              <p className="font-semibold text-sm text-gray-50">{b.name}</p>
              <p className="text-xs text-gray-500">{b.specialization}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function StepDate({ selected, onSelect }) {
  const days = [];
  const today = new Date();
  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    days.push({
      value: d.toISOString().split('T')[0],
      day: d.toLocaleDateString('en-US', { weekday: 'short' }),
      date: d.getDate(),
      month: d.toLocaleDateString('en-US', { month: 'short' }),
    });
  }

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-gray-50 mb-4">Select a Date</h2>
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
        {days.map((d) => (
          <button
            key={d.value}
            onClick={() => onSelect(d.value)}
            className={`flex-shrink-0 w-16 py-3 rounded-2xl flex flex-col items-center gap-1 transition-colors ${
              selected === d.value
                ? 'bg-gold-400 text-ink-950'
                : 'bg-ink-700 text-gray-300 border border-white/5'
            }`}
          >
            <span className="text-xs font-medium">{d.day}</span>
            <span className="text-lg font-bold">{d.date}</span>
            <span className="text-xs">{d.month}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function StepTime({ selected, onSelect }) {
  const times = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'];

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-gray-50 mb-4">Select a Time</h2>
      <div className="grid grid-cols-3 lg:grid-cols-5 gap-2">
        {times.map((t) => (
          <button
            key={t}
            onClick={() => onSelect(t)}
            className={`py-3 rounded-2xl text-sm font-medium transition-colors ${
              selected === t
                ? 'bg-gold-400 text-ink-950'
                : 'bg-ink-700 text-gray-300 border border-white/5'
            }`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}

function StepDetails({ booking, updateBooking, errors }) {
  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-gray-50 mb-4">Your Details</h2>
      <div className="space-y-3">
        <div>
          <label className="text-sm text-gray-400 mb-1 block">Full Name *</label>
          <input
            type="text"
            value={booking.name}
            onChange={(e) => updateBooking({ name: e.target.value })}
            placeholder="John Smith"
            className="input-field"
          />
          {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="text-sm text-gray-400 mb-1 block">Phone Number *</label>
          <input
            type="tel"
            value={booking.phone}
            onChange={(e) => updateBooking({ phone: e.target.value })}
            placeholder="+1 (555) 000-0000"
            className="input-field"
          />
          {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
        </div>
        <div>
          <label className="text-sm text-gray-400 mb-1 block">Email (optional)</label>
          <input
            type="email"
            value={booking.email}
            onChange={(e) => updateBooking({ email: e.target.value })}
            placeholder="john@example.com"
            className="input-field"
          />
        </div>
        <div>
          <label className="text-sm text-gray-400 mb-1 block">Notes (optional)</label>
          <textarea
            value={booking.notes}
            onChange={(e) => updateBooking({ notes: e.target.value })}
            placeholder="Any special requests..."
            rows={3}
            className="input-field resize-none"
          />
        </div>
      </div>
    </div>
  );
}

function StepConfirm({ booking }) {
  const service = services.find((s) => s.id === booking.serviceId);
  const hairstyle = hairstyles.find((h) => h.id === booking.hairstyleId);
  const barber = barbers.find((b) => b.id === booking.barberId);

  const rows = [
    { label: 'Service', value: service?.name },
    { label: 'Hairstyle', value: hairstyle?.name },
    { label: 'Barber', value: barber?.name },
    { label: 'Date', value: booking.date },
    { label: 'Time', value: booking.time },
    { label: 'Name', value: booking.name },
    { label: 'Phone', value: booking.phone },
    { label: 'Email', value: booking.email || '—' },
    { label: 'Notes', value: booking.notes || '—' },
  ];

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-gray-50 mb-4">Review & Confirm</h2>
      <div className="card-surface p-5 space-y-3">
        {rows.map((r) => (
          <div key={r.label} className="flex justify-between text-sm border-b border-white/5 last:border-0 pb-2 last:pb-0">
            <span className="text-gray-500">{r.label}</span>
            <span className="text-gray-200 font-medium text-right">{r.value || '—'}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-600 mt-4 text-center">
        This is a frontend demo. No booking will be stored or sent.
      </p>
    </div>
  );
}
