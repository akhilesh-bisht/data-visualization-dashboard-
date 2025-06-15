import React from 'react';

const Sidebar = ({ data, filters, onFilterChange }) => {
  // Extract unique values for dropdowns
  const getUniqueValues = (key) => {
    const values = data
      .map(item => item[key])
      .filter(Boolean);
    return [...new Set(values)];
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  const handleMultiSelectChange = (name, selectedValues) => {
    onFilterChange({ ...filters, [name]: selectedValues });
  };

  const toggleSelection = (name, value) => {
    const current = filters[name] || [];
    const updated = current.includes(value)
      ? current.filter(item => item !== value)
      : [...current, value];
    handleMultiSelectChange(name, updated);
  };

  const renderMultiSelectList = (name, options) => (
    <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
      {options.map((opt) => (
        <label key={opt} className="flex items-center space-x-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={filters[name]?.includes(opt)}
            onChange={() => toggleSelection(name, opt)}
            className="text-blue-500 focus:ring-blue-400 rounded"
          />
          <span>{opt}</span>
        </label>
      ))}
    </div>
  );

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b sticky top-0 bg-white z-10">
        <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
      </div>

      {/* Scrollable filter content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 text-sm text-gray-700">

        {/* End Year */}
        <div>
          <label className="block font-medium mb-1">End Year</label>
          <select
            name="endYear"
            value={filters.endYear}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-1"
          >
            <option value="">All</option>
            {getUniqueValues('end_year').map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        {/* Topics */}
        <div>
          <label className="block font-medium mb-1">Topics</label>
          {renderMultiSelectList('topics', getUniqueValues('topic'))}
        </div>

        {/* Sectors */}
        <div>
          <label className="block font-medium mb-1">Sectors</label>
          {renderMultiSelectList('sectors', getUniqueValues('sector'))}
        </div>

        {/* Region */}
        <div>
          <label className="block font-medium mb-1">Region</label>
          <select
            name="region"
            value={filters.region}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-1"
          >
            <option value="">All</option>
            {getUniqueValues('region').map((region) => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>

        {/* PEST */}
        <div>
          <label className="block font-medium mb-1">PEST</label>
          <select
            name="pest"
            value={filters.pest}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-1"
          >
            <option value="">All</option>
            {getUniqueValues('pestle').map((pest) => (
              <option key={pest} value={pest}>{pest}</option>
            ))}
          </select>
        </div>

        {/* SWOT */}
        <div>
          <label className="block font-medium mb-1">SWOT</label>
          <select
            name="swot"
            value={filters.swot}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-1"
          >
            <option value="">All</option>
            {getUniqueValues('swot').map((swot) => (
              <option key={swot} value={swot}>{swot}</option>
            ))}
          </select>
        </div>

        {/* Source */}
        <div>
          <label className="block font-medium mb-1">Source</label>
          <select
            name="source"
            value={filters.source}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-1"
          >
            <option value="">All</option>
            {getUniqueValues('source').map((source) => (
              <option key={source} value={source}>{source}</option>
            ))}
          </select>
        </div>

        {/* Country */}
        <div>
          <label className="block font-medium mb-1">Country</label>
          <select
            name="country"
            value={filters.country}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-1"
          >
            <option value="">All</option>
            {getUniqueValues('country').map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>

        {/* City */}
        <div>
          <label className="block font-medium mb-1">City</label>
          <select
            name="city"
            value={filters.city}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-1"
          >
            <option value="">All</option>
            {getUniqueValues('city').map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

      </div>
    </div>
  );
};

export default Sidebar;

