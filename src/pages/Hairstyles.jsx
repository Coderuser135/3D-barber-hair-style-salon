import { useState, useMemo, Fragment } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, GitCompare, Check } from 'lucide-react';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import PageTransition from '@/components/common/PageTransition';
import HairstyleCard from '@/components/hairstyle/HairstyleCard';
import CategoryChips from '@/components/hairstyle/CategoryChips';
import FilterSheet from '@/components/hairstyle/FilterSheet';
import CompareBar from '@/components/hairstyle/CompareBar';
import { hairstyles, categories, sortOptions } from '@/data/hairstyles';
import { getHairstyleById } from '@/data/hairstyles';
import { useCompare } from '@/context/CompareContext';

export default function Hairstyles() {
  useDocumentTitle('Hairstyles');
  const [searchParams] = useSearchParams();
  const showCompare = searchParams.get('compare') === '1';

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Popular');
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({});

  const { compareIds, toggleCompare, isInCompare, canAddMore } = useCompare();

  const filtered = useMemo(() => {
    let result = [...hairstyles];

    if (category !== 'All') {
      result = result.filter((h) => h.category === category);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (h) =>
          h.name.toLowerCase().includes(q) ||
          h.description.toLowerCase().includes(q) ||
          h.category.toLowerCase().includes(q)
      );
    }

    if (filters.hairType?.length) {
      result = result.filter((h) => h.hairType.some((t) => filters.hairType.includes(t)));
    }
    if (filters.fadeType?.length) {
      result = result.filter((h) => filters.fadeType.includes(h.fadeType));
    }
    if (filters.maintenance?.length) {
      result = result.filter((h) => filters.maintenance.includes(h.maintenance));
    }

    switch (sortBy) {
      case 'A–Z':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Z–A':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'Low Maintenance':
        result.sort((a, b) => maintenanceRank(a.maintenance) - maintenanceRank(b.maintenance));
        break;
      case 'High Maintenance':
        result.sort((a, b) => maintenanceRank(b.maintenance) - maintenanceRank(a.maintenance));
        break;
      default:
        result.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
    }

    return result;
  }, [search, category, sortBy, filters]);

  const clearFilters = () => {
    setFilters({});
    setCategory('All');
    setSearch('');
  };

  const activeFilterCount =
    (filters.hairType?.length || 0) + (filters.fadeType?.length || 0) + (filters.maintenance?.length || 0);

  return (
    <PageTransition>
      <div className="px-5 lg:px-12 lg:max-w-7xl lg:mx-auto pt-6 pb-10">
        <h1 className="font-display text-3xl font-bold text-gray-50 mb-1">Hairstyles</h1>
        <p className="text-sm text-gray-500 mb-5">Explore {hairstyles.length} HD hairstyle references and find your match</p>

      {showCompare && compareIds.length >= 2 ? (
        <CompareView />
      ) : (
        <>
          {/* Search + Sort */}
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search hairstyles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field pl-11"
                aria-label="Search hairstyles"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                  aria-label="Clear search"
                >
                  <X size={18} />
                </button>
              )}
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-ink-700 border border-white/10 rounded-2xl px-3 text-sm text-gray-200 focus:outline-none focus:border-gold-400/50"
              aria-label="Sort by"
            >
              {sortOptions.map((opt) => (
                <option key={opt} value={opt} className="bg-ink-800">{opt}</option>
              ))}
            </select>
            <button
              onClick={() => setFilterOpen(true)}
              className="lg:hidden w-12 h-12 rounded-2xl bg-ink-700 border border-white/10 flex items-center justify-center text-gray-300 relative"
              aria-label="Open filters"
            >
              <SlidersHorizontal size={18} />
              {activeFilterCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gold-400 text-ink-950 text-xs font-bold flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Category chips */}
          <div className="mb-5">
            <CategoryChips categories={categories} active={category} onSelect={setCategory} />
          </div>

          {/* Desktop filters */}
          <div className="hidden lg:flex gap-2 mb-5 flex-wrap">
            <DesktopFilter label="Hair Type" options={filters.hairType} />
            <DesktopFilter label="Fade Type" options={filters.fadeType} />
            <DesktopFilter label="Maintenance" options={filters.maintenance} />
            {activeFilterCount > 0 && (
              <button onClick={clearFilters} className="text-sm text-gray-400 hover:text-gold-300 transition-colors">
                Clear all
              </button>
            )}
          </div>

          {/* Results */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 mb-2">No hairstyles match your filters.</p>
              <button onClick={clearFilters} className="btn-outline px-5 py-2.5 text-sm">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-5">
              {filtered.map((h, i) => (
                <div key={h.id} className="relative">
                  <HairstyleCard hairstyle={h} index={i} />
                  <CompareToggle
                    hairstyle={h}
                    isInCompare={isInCompare(h.id)}
                    canAddMore={canAddMore}
                    onToggle={() => toggleCompare(h.id)}
                  />
                </div>
              ))}
            </div>
          )}
        </>
      )}

      <FilterSheet
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        filters={filters}
        onApply={setFilters}
        onClear={clearFilters}
      />
      <CompareBar />
      </div>
    </PageTransition>
  );
}

function maintenanceRank(m) {
  const order = { 'Very Low': 0, Low: 1, Medium: 2, High: 3 };
  return order[m] ?? 2;
}

function DesktopFilter({ label, options }) {
  if (!options?.length) return null;
  return (
    <span className="px-3 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/30 text-sm text-gold-300">
      {label}: {options.join(', ')}
    </span>
  );
}

function CompareToggle({ hairstyle, isInCompare, canAddMore, onToggle }) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isInCompare && !canAddMore) return;
        onToggle();
      }}
      className={`absolute bottom-20 right-3 w-9 h-9 rounded-full glass flex items-center justify-center transition-colors z-10 ${
        isInCompare ? 'bg-gold-400 text-ink-950' : 'text-gray-300 hover:text-gold-300'
      } ${!isInCompare && !canAddMore ? 'opacity-30 cursor-not-allowed' : ''}`}
      aria-label={isInCompare ? 'Remove from compare' : 'Add to compare'}
      title={isInCompare ? 'In compare' : canAddMore ? 'Add to compare' : 'Compare is full (max 3)'}
    >
      {isInCompare ? <Check size={16} /> : <GitCompare size={16} />}
    </button>
  );
}

function CompareView() {
  const { compareIds, clearCompare } = useCompare();
  const items = compareIds.map((id) => getHairstyleById(id)).filter(Boolean);

  const rows = [
    { label: 'Category', key: 'category' },
    { label: 'Fade Type', key: 'fadeType' },
    { label: 'Top Length', key: 'topLength' },
    { label: 'Side Length', key: 'sideLength' },
    { label: 'Back Length', key: 'backLength' },
    { label: 'Texture', key: 'texture' },
    { label: 'Maintenance', key: 'maintenance' },
    { label: 'Styling Time', key: 'stylingTime' },
    { label: 'Hair Type', key: 'hairType' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-display text-xl font-semibold text-gray-50">Comparing {items.length} Styles</h2>
        <button onClick={clearCompare} className="text-sm text-gray-400 hover:text-gold-300 transition-colors">
          Clear
        </button>
      </div>

      <div className="overflow-x-auto no-scrollbar">
        <div className="min-w-full" style={{ minWidth: items.length > 2 ? 720 : '100%' }}>
          <div className="grid gap-3" style={{ gridTemplateColumns: `140px repeat(${items.length}, 1fr)` }}>
            {/* Header row */}
            <div />
            {items.map((h) => (
              <div key={h.id} className="card-surface overflow-hidden">
                <img src={h.image} alt={h.name} className="w-full aspect-[4/5] object-cover" />
                <div className="p-3">
                  <h3 className="font-semibold text-sm text-gray-50">{h.name}</h3>
                </div>
              </div>
            ))}

            {rows.map((row) => (
              <Fragment key={row.label}>
                <div className="flex items-center text-sm font-medium text-gray-400 py-2 px-1">
                  {row.label}
                </div>
                {items.map((h) => (
                  <div key={`${h.id}-${row.key}`} className="card-surface p-3 text-sm text-gray-200">
                    {Array.isArray(h[row.key]) ? h[row.key].join(', ') : h[row.key]}
                  </div>
                ))}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
