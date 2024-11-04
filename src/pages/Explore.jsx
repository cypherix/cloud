import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../components/Card';

const Explore = () => {
  const dispatch = useDispatch();
  const { sneakers, status, error } = useSelector((state) => state.sneakers.sneakers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All'); // Default filter is "All"
  const [currentPage, setCurrentPage] = useState(1);
  const sneakersPerPage = 8;

  // Handle search input change
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset page to 1 when search term changes
  };

  // Handle filter button clicks
  const handleFilter = (category) => {
    setFilterCategory(category);
    setCurrentPage(1); // Reset page to 1 when filter changes
  };

  // Filter sneakers based on search term and selected category
  const filteredItems = sneakers.filter((s) => {
    // Check if sneaker meets basic conditions
    if (s.retail_price_cents === null || s.story_html === null) {
      return false;
    }

    // Check if category matches filter or filter is "All"
    if (
      filterCategory !== 'All' &&
      !s.category.includes(filterCategory.toLowerCase())
    ) {
      return false;
    }

    // Check if sneaker name or designer matches search term
    const nameMatches = s.name.toLowerCase().includes(searchTerm.toLowerCase());
    const designerMatches = s.designer.toLowerCase().includes(searchTerm.toLowerCase());

    return nameMatches || designerMatches;
  });

  // Pagination logic
  const indexOfLastSneaker = currentPage * sneakersPerPage;
  const indexOfFirstSneaker = indexOfLastSneaker - sneakersPerPage;
  const currentSneakers = filteredItems.slice(indexOfFirstSneaker, indexOfLastSneaker);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle loading and error states
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="explore pb-10">
      <div className="search-button p-4 w-1/2 mx-auto">
        <div className="flex items-center mb-4 bg-gray-100 rounded-lg p-2 backdrop-filter backdrop-blur-lg">
          <input
            type="text"
            placeholder="Search for sneakers..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-bar w-full p-2 rounded-lg bg-transparent border-none focus:outline-none"
          />
          <button
            onClick={() => handleFilter('lifestyle')}
            className={`ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition duration-300 ${
              filterCategory === 'lifestyle' ? 'bg-gray-400' : ''
            }`}
          >
            Lifestyle
          </button>

          <button
            onClick={() => handleFilter('Running')}
            className={`ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition duration-300 ${
              filterCategory === 'Running' ? 'bg-gray-400' : ''
            }`}
          >
            Running
          </button>
        </div>
      </div>
      <div className="w-full min-h-fit p-10 md:p-20 grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-6 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4 xl:gap-10 mx-auto">
        {currentSneakers.map((shoe) => (
          <Card key={shoe.id} shoe={shoe} />
        ))}
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(filteredItems.length / sneakersPerPage) }, (_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded-full ${
              currentPage === index + 1 ? 'bg-gray-400 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Explore;
