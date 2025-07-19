'use client';

export interface ProductFiltersProps {
  categories: string[];
  bodyBenefits: string[];
  searchQuery: string;
  selectedCategories: string[];
  selectedBenefits: string[];
  onSearchChange: (query: string) => void;
  onCategoryChange: (categories: string[]) => void;
  onBenefitsChange: (benefits: string[]) => void;
}

export default function ProductFilters({ 
  categories, 
  bodyBenefits, 
  searchQuery, 
  selectedCategories, 
  selectedBenefits, 
  onSearchChange, 
  onCategoryChange, 
  onBenefitsChange 
}: ProductFiltersProps) {

  const handleCategoryChange = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    onCategoryChange(newCategories);
  };

  const handleBenefitChange = (benefit: string) => {
    const newBenefits = selectedBenefits.includes(benefit)
      ? selectedBenefits.filter(b => b !== benefit)
      : [...selectedBenefits, benefit];
    onBenefitsChange(newBenefits);
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary-500"
        />
      </div>

      {/* Category Filter */}
      <div>
        <h3 className="font-semibold mb-2">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="mr-2 rounded border-gray-300 text-primary-600 focus:ring-0"
              />
              <span className="text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Body Benefits Filter */}
      <div>
        <h3 className="font-semibold mb-2">Body Benefits</h3>
        <div className="space-y-2">
          {bodyBenefits.map((benefit) => (
            <label key={benefit} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedBenefits.includes(benefit)}
                onChange={() => handleBenefitChange(benefit)}
                className="mr-2 rounded border-gray-300 text-primary-600 focus:ring-0"
              />
              <span className="text-gray-700">{benefit}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters Button */}
      {(selectedCategories.length > 0 || selectedBenefits.length > 0 || searchQuery) && (
        <div>
          <button
            onClick={() => {
              onSearchChange('');
              onCategoryChange([]);
              onBenefitsChange([]);
            }}
            className="w-full px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
} 