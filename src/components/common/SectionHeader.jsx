import { Link } from 'react-router-dom';

export default function SectionHeader({ title, subtitle, to, toLabel }) {
  return (
    <div className="flex items-end justify-between mb-4">
      <div>
        <h2 className="section-title">{title}</h2>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
      {to && (
        <Link
          to={to}
          className="text-sm font-medium text-gold-300 hover:text-gold-200 transition-colors flex items-center gap-1"
        >
          {toLabel || 'View all'}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      )}
    </div>
  );
}
