function FilterSidebar({
  type,
  setType,
  transmission,
  setTransmission,
  sort,
  setSort,
}) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold mb-6">Filters</h2>

      <div className="mb-6">
        <label className="font-semibold">Type</label>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full mt-2 p-2 border rounded"
        >
          <option value="">All</option>

          <option value="sedan">Sedan</option>

          <option value="suv">SUV</option>

          <option value="hatchback">Hatchback</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="font-semibold">Transmission</label>

        <select
          value={transmission}
          onChange={(e) => setTransmission(e.target.value)}
          className="w-full mt-2 p-2 border rounded"
        >
          <option value="">All</option>

          <option value="automatic">Automatic</option>

          <option value="manual">Manual</option>
        </select>
      </div>

      <div>
        <label className="font-semibold">Sort By</label>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full mt-2 p-2 border rounded"
        >
          <option value="">Default</option>

          <option value="priceLow">Price Low</option>

          <option value="priceHigh">Price High</option>
        </select>
      </div>
    </div>
  );
}

export default FilterSidebar;
