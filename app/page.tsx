import TrendingSection from '@/components/TrendingSection';
import FilterBar from '@/components/FilterBar';
import NewlyUpdatedSection from '@/components/NewlyUpdatedSection';

export default function Home() {
  return (
    <div className="container mx-auto max-w-container px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      {/* Trending Section */}
      <TrendingSection />

      {/* Filter Bar */}
      <FilterBar />

      {/* Newly Updated Section */}
      <NewlyUpdatedSection />
    </div>
  );
}

