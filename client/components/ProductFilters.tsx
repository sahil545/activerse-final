import { useEffect, useState, useRef } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Product, Vendor, SubCategory } from "@/lib/api";
import { X, ChevronDown } from "lucide-react";

export interface FilterState {
  searchTerm: string;
  priceRange: [number, number];
  vendors: number[];
  categories: number[];
  ratings: number[];
}

interface ProductFiltersProps {
  products: Product[];
  vendors: Vendor[];
  subCategories: SubCategory[];
  onApplyFilters: (filters: FilterState) => void;
  onReset: () => void;
  maxPrice: number;
}

export default function ProductFilters({
  products,
  vendors,
  subCategories,
  onApplyFilters,
  onReset,
  maxPrice,
}: ProductFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);
  const [selectedVendors, setSelectedVendors] = useState<number[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const priceDebounceTimer = useRef<NodeJS.Timeout | null>(null);
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    search: true,
    price: true,
    vendors: true,
    categories: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Debounce price filter changes for smooth filtering
  const handlePriceChange = (value: [number, number]) => {
    setPriceRange(value);

    if (priceDebounceTimer.current) {
      clearTimeout(priceDebounceTimer.current);
    }

    priceDebounceTimer.current = setTimeout(() => {
      onApplyFilters({
        searchTerm,
        priceRange: value,
        vendors: selectedVendors,
        categories: selectedCategories,
        ratings: [],
      });
    }, 300); // Wait 300ms before applying the filter
  };

  // Get all sub-categories (show all available categories)
  const availableCategories = subCategories;

  const vendorList = vendors.filter((v) =>
    products.some((p) => p.vendor_id === v.vendor_id),
  );

  const handleReset = () => {
    setSearchTerm("");
    setPriceRange([0, maxPrice]);
    setSelectedVendors([]);
    setSelectedCategories([]);
    onReset();
  };

  const isFiltersActive =
    searchTerm ||
    priceRange[0] > 0 ||
    priceRange[1] < maxPrice ||
    selectedVendors.length > 0 ||
    selectedCategories.length > 0;

  return (
    <div className="w-full lg:w-72 bg-white rounded-2xl border border-slate-200 p-6 h-fit  top-4 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-almarai font-bold text-slate-900">Filters</h2>
        {isFiltersActive && (
          <button
            onClick={handleReset}
            className="text-sm text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-1 bg-orange-50 px-3 py-1.5 rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
            Clear
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Search by Name */}
        <div className="pb-4 border-b border-slate-200">
          <button
            onClick={() => toggleSection("search")}
            className="w-full flex items-center justify-between mb-3 group"
          >
            <label className="text-sm font-semibold text-slate-900 cursor-pointer">
              Search Product
            </label>
            <ChevronDown
              className={`w-4 h-4 text-slate-500 transition-transform ${
                expandedSections.search ? "rotate-180" : ""
              }`}
            />
          </button>
          {expandedSections.search && (
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                // Apply search in real-time
                onApplyFilters({
                  searchTerm: e.target.value,
                  priceRange,
                  vendors: selectedVendors,
                  categories: selectedCategories,
                  ratings: [],
                });
              }}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          )}
        </div>

        {/* Price Range */}
        <div className="pb-4 border-b border-slate-200">
          <button
            onClick={() => toggleSection("price")}
            className="w-full flex items-center justify-between mb-3 group"
          >
            <label className="text-sm font-semibold text-slate-900 cursor-pointer">
              Price Range
            </label>
            <ChevronDown
              className={`w-4 h-4 text-slate-500 transition-transform ${
                expandedSections.price ? "rotate-180" : ""
              }`}
            />
          </button>
          {expandedSections.price && (
            <div className="space-y-3">
              <Slider
                value={priceRange}
                onValueChange={handlePriceChange}
                min={0}
                max={maxPrice}
                step={100}
                className="w-full"
              />
              <div className="flex justify-between text-sm font-semibold text-slate-700 bg-slate-50 p-3 rounded-lg">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          )}
        </div>

        {/* Vendors */}
        <div className="pb-4 border-b border-slate-200">
          <button
            onClick={() => toggleSection("vendors")}
            className="w-full flex items-center justify-between mb-3 group"
          >
            <label className="text-sm font-semibold text-slate-900 cursor-pointer">
              Vendors {selectedVendors.length > 0 && `(${selectedVendors.length})`}
            </label>
            <ChevronDown
              className={`w-4 h-4 text-slate-500 transition-transform ${
                expandedSections.vendors ? "rotate-180" : ""
              }`}
            />
          </button>
          {expandedSections.vendors && (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {vendorList.map((vendor) => (
                <div
                  key={vendor.id}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <Checkbox
                    id={`vendor-${vendor.id}`}
                    checked={selectedVendors.includes(vendor.vendor_id)}
                    onCheckedChange={(checked) => {
                      const newVendors = checked
                        ? [...selectedVendors, vendor.vendor_id]
                        : selectedVendors.filter((v) => v !== vendor.vendor_id);
                      setSelectedVendors(newVendors);
                      // Apply vendor filter in real-time
                      onApplyFilters({
                        searchTerm,
                        priceRange,
                        vendors: newVendors,
                        categories: selectedCategories,
                        ratings: [],
                      });
                    }}
                  />
                  <label
                    htmlFor={`vendor-${vendor.id}`}
                    className="text-sm text-slate-700 cursor-pointer flex-1"
                  >
                    {vendor.shop_name || vendor.name}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Categories */}
        <div className="pb-4 border-b border-slate-200">
          <button
            onClick={() => toggleSection("categories")}
            className="w-full flex items-center justify-between mb-3 group"
          >
            <label className="text-sm font-semibold text-slate-900 cursor-pointer">
              Categories {selectedCategories.length > 0 && `(${selectedCategories.length})`}
            </label>
            <ChevronDown
              className={`w-4 h-4 text-slate-500 transition-transform ${
                expandedSections.categories ? "rotate-180" : ""
              }`}
            />
          </button>
          {expandedSections.categories && (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {availableCategories.length > 0 ? (
                availableCategories.map((subCategory) => (
                  <div
                    key={subCategory.sub_category_id}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <Checkbox
                      id={`category-${subCategory.sub_category_id}`}
                      checked={selectedCategories.includes(subCategory.sub_category_id)}
                      onCheckedChange={(checked) => {
                        const newCategories = checked
                          ? [...selectedCategories, subCategory.sub_category_id]
                          : selectedCategories.filter((c) => c !== subCategory.sub_category_id);
                        setSelectedCategories(newCategories);
                        // Apply category filter in real-time
                        onApplyFilters({
                          searchTerm,
                          priceRange,
                          vendors: selectedVendors,
                          categories: newCategories,
                          ratings: [],
                        });
                      }}
                    />
                    <label
                      htmlFor={`category-${subCategory.sub_category_id}`}
                      className="text-sm text-slate-700 cursor-pointer flex-1"
                    >
                      {subCategory.sub_category_name}
                    </label>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">No categories available</p>
              )}
            </div>
          )}
        </div>


        {/* Info Message */}
        <div className="pt-4 text-xs text-slate-500 text-center font-medium">
          Filters apply automatically as you select
        </div>
      </div>
    </div>
  );
}
