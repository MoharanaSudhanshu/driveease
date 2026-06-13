function SearchBar({ search, setSearch, status, setStatus, sort, setSort }) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mt-8 mb-6">
      <input
        type="text"
        placeholder="Search by make or model..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-3 rounded-xl flex-1"
      />

      {setStatus && (
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-3 rounded-xl"
        >
          <option value="all">All Cars</option>
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>
      )}

      {setSort && (
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border p-3 rounded-xl"
        >
          <option value="">Sort By</option>
          <option value="priceLow">Price Low to High</option>
          <option value="priceHigh">Price High to Low</option>
          <option value="rating">Highest Rating</option>
        </select>
      )}
    </div>
  );
}

export default SearchBar;
