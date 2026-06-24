'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { ProCard } from '@/components/blocks/ProCard';
import { CategoryGrid } from '@/components/blocks/CategoryGrid';
import { Button } from '@/components/ui/Button';
import { useApp } from '@/lib/context';
import { useTranslation } from '@/lib/i18n';
import { CATEGORIES, PROS } from '@/lib/mock-data';
import { ProProfile } from '@/types';
import { cn } from '@/lib/utils';

const CITIES = ['tunis', 'sfax', 'sousse', 'monastir', 'bizerte'];
const RATINGS = [4, 3, 2];

function SearchContent() {
  const { lang } = useApp();
  const { t } = useTranslation(lang);
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [city, setCity] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);
  const [results, setResults] = useState<ProProfile[]>(PROS);

  useEffect(() => {
    let filtered = [...PROS];

    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter(p =>
        p.user?.full_name.toLowerCase().includes(q) ||
        p.bio_fr?.toLowerCase().includes(q) ||
        p.bio_dr?.includes(q)
      );
    }

    if (category) {
      const cat = CATEGORIES.find(c => c.slug === category);
      if (cat) {
        filtered = filtered.filter(p =>
          p.services?.some(s => s.category_id === cat.id)
        );
      }
    }

    if (city) {
      filtered = filtered.filter(p =>
        p.user?.city?.toLowerCase() === city.toLowerCase()
      );
    }

    if (minRating > 0) {
      filtered = filtered.filter(p => p.rating_avg >= minRating);
    }

    if (sortBy === 'rating') filtered.sort((a, b) => b.rating_avg - a.rating_avg);
    else if (sortBy === 'price') filtered.sort((a, b) => (a.services?.[0]?.price_from ?? 999) - (b.services?.[0]?.price_from ?? 999));

    setResults(filtered);
  }, [query, category, city, minRating, sortBy]);

  const activeFiltersCount = [category, city, minRating > 0].filter(Boolean).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Search Bar */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9C9189]" size={18} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search_placeholder')}
            className={`w-full bg-white border border-[#E0DDD8] rounded-[12px] pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A623] ${lang === 'dr' ? 'text-right font-arabic' : ''}`}
          />
        </div>
        <Button
          variant={showFilters ? 'secondary' : 'ghost'}
          size="md"
          onClick={() => setShowFilters(!showFilters)}
          className="flex-shrink-0 relative"
        >
          <SlidersHorizontal size={18} />
          {!showFilters && <span className="hidden sm:inline">{lang === 'dr' ? 'فلاتر' : 'Filtres'}</span>}
          {activeFiltersCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#E8472A] text-white text-[10px] rounded-full flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white rounded-[16px] border border-[#E0DDD8] p-5 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* City */}
            <div>
              <label className={`text-sm font-semibold text-[#1A1614] mb-2 block ${lang === 'dr' ? 'font-arabic' : ''}`}>
                {t('filter_city')}
              </label>
              <select
                value={city}
                onChange={e => setCity(e.target.value)}
                className="w-full bg-[#F7F5F2] border border-[#E0DDD8] rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
              >
                <option value="">{t('all_cities')}</option>
                {CITIES.map(c => <option key={c} value={c}>{t(c as 'tunis')}</option>)}
              </select>
            </div>

            {/* Min Rating */}
            <div>
              <label className={`text-sm font-semibold text-[#1A1614] mb-2 block ${lang === 'dr' ? 'font-arabic' : ''}`}>
                {t('filter_rating')}
              </label>
              <div className="flex gap-2">
                {RATINGS.map(r => (
                  <button
                    key={r}
                    onClick={() => setMinRating(minRating === r ? 0 : r)}
                    className={cn(
                      'px-3 py-1.5 rounded-full text-sm font-medium border transition-colors',
                      minRating === r
                        ? 'bg-[#1A1614] text-white border-[#1A1614]'
                        : 'bg-white text-[#9C9189] border-[#E0DDD8] hover:border-[#1A1614]'
                    )}
                  >
                    {r}+ ★
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div>
              <label className={`text-sm font-semibold text-[#1A1614] mb-2 block ${lang === 'dr' ? 'font-arabic' : ''}`}>
                {t('sort_by')}
              </label>
              <div className="flex gap-2 flex-wrap">
                {[
                  { key: 'rating', label: t('sort_rating') },
                  { key: 'price', label: t('sort_price') },
                ].map(s => (
                  <button
                    key={s.key}
                    onClick={() => setSortBy(s.key)}
                    className={cn(
                      'px-3 py-1.5 rounded-full text-sm font-medium border transition-colors',
                      sortBy === s.key
                        ? 'bg-[#1A1614] text-white border-[#1A1614]'
                        : 'bg-white text-[#9C9189] border-[#E0DDD8] hover:border-[#1A1614]'
                    )}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {activeFiltersCount > 0 && (
            <button
              onClick={() => { setCity(''); setMinRating(0); setCategory(''); }}
              className="flex items-center gap-1 text-sm text-[#E8472A] mt-4"
            >
              <X size={14} /> Réinitialiser les filtres
            </button>
          )}
        </div>
      )}

      {/* Category chips */}
      <div className="mb-6">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          <button
            onClick={() => setCategory('')}
            className={cn(
              'flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-colors',
              !category
                ? 'bg-[#1A1614] text-white border-[#1A1614]'
                : 'bg-white text-[#9C9189] border-[#E0DDD8] hover:border-[#1A1614]'
            )}
          >
            {lang === 'dr' ? 'الكل' : 'Tous'}
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.slug}
              onClick={() => setCategory(category === cat.slug ? '' : cat.slug)}
              className={cn(
                'flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-colors',
                category === cat.slug
                  ? 'bg-[#1A1614] text-white border-[#1A1614]'
                  : 'bg-white text-[#9C9189] border-[#E0DDD8] hover:border-[#1A1614]'
              )}
            >
              <span>{cat.icon}</span>
              <span className={lang === 'dr' ? 'font-arabic' : ''}>
                {lang === 'dr' ? cat.name_dr : cat.name_fr}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="flex items-center justify-between mb-4">
        <p className={`text-sm text-[#9C9189] ${lang === 'dr' ? 'font-arabic' : ''}`}>
          <span className="font-semibold text-[#1A1614]">{results.length}</span> {t('results_found')}
        </p>
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map(pro => (
            <ProCard key={pro.id} pro={pro} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">🔍</p>
          <p className={`text-[#9C9189] ${lang === 'dr' ? 'font-arabic' : ''}`}>{t('no_pros_found')}</p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchContent />
    </Suspense>
  );
}
