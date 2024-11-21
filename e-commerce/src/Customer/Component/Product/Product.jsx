import React, { useState } from 'react';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
} from '@headlessui/react';
import { XMarkIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { boysuniformsData } from '../../../Data/Boys/Boysuniform'; // Import boys data
import { girlsuniformData } from '../../../Data/Girls/Girlsuniform'; // Import girls data
import ProductCard from './ProductCard';

const sortOptions = [
  { name: 'Price: Low to High', value: 'low-to-high' },
  { name: 'Price: High to Low', value: 'high-to-low' },
];
const institutionTypes = [
  { name: 'All', value: 'all' },
  { name: 'School', value: 'school' },
  { name: 'College', value: 'college' },
];
const genderTypes = [
  { name: 'Boys', value: 'boys' },
  { name: 'Girls', value: 'girls' },
  { name: 'All', value: 'all' },
];

const uniformsPerPage = 6; // Number of uniforms to display per page

export default function Product() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedInstitutionType, setSelectedInstitutionType] = useState('all');
  const [selectedSortOption, setSelectedSortOption] = useState('low-to-high');
  const [selectedGender, setSelectedGender] = useState('all');
  const [currentPage, setCurrentPage] = useState(1); // State to track current page

  // Combine boys and girls data if 'all' is selected, otherwise filter by gender
  const filteredData =
    selectedGender === 'boys'
      ? boysuniformsData
      : selectedGender === 'girls'
      ? girlsuniformData
      : [...boysuniformsData[0].institutions, ...girlsuniformData]; //added new code

      console.log(filteredData)
      console.log(boysuniformsData)
      console.log(girlsuniformData)


      //old code
  // Filter uniforms based on institution type
  // const filteredInstitutions = filteredData
  //   .flatMap((data) =>
  //     data.institutions && Array.isArray(data.institutions)
  //       ? data.institutions.filter((institution) =>
  //           selectedInstitutionType === 'all'
  //             ? true
  //             : institution.institutionType.toLowerCase() === selectedInstitutionType
  //         )
  //       : []
  //   );

  //new code
  let filteredInstitutions;
  if(selectedInstitutionType==="all"){
    filteredInstitutions= filteredData 
  }
  else{

    filteredInstitutions = filteredData.filter((ele)=>ele.institutionType.toLowerCase()===selectedInstitutionType.toLowerCase())
  }
   
        
    

    console.log(filteredInstitutions)
  // Create a Set to keep track of unique uniforms based on name and price
  const uniqueUniforms = new Set()

  // Flatten and sort the uniforms by price
  //code if you wanted uniuqe uniforms because many schools have same uniform the try this code
  // const sortedUniforms = filteredInstitutions
  //   .flatMap((institution) =>
  //     institution.uniforms
  //       .sort((a, b) =>
  //         selectedSortOption === 'low-to-high' ? a.price - b.price : b.price - a.price
  //       )
  //       .filter((uniform) => {
  //         const uniformKey = ${uniform.name}-${uniform.price}; // Unique key based on name and price
  //         if (uniqueUniforms.has(uniformKey)) {
  //           return false; // Skip if the uniform is already in the Set
  //         }
  //         uniqueUniforms.add(uniformKey); // Add the uniform to the Set
  //         return true; // Include it in the rendered list
  //       })
  //       .map((uniform) => ({ ...uniform, institution })) // Attach institution to the uniform
  //   );

  //new code for all institue uniform it will include all institute unform that may have same dress
  const sortedUniforms = filteredInstitutions
    .flatMap((institution) =>
      institution.uniforms
        .sort((a, b) =>
          selectedSortOption === 'low-to-high' ? a.price - b.price : b.price - a.price
        )
        .map((uniform) => ({ ...uniform, institution })) // Attach institution to the uniform
    );

    console.log(sortedUniforms)
  // Pagination logic: slice the data based on current page and items per page
  const startIndex = (currentPage - 1) * uniformsPerPage;
  const paginatedUniforms = sortedUniforms.slice(startIndex, startIndex + uniformsPerPage);

  // Calculate total pages
  const totalPages = Math.ceil(sortedUniforms.length / uniformsPerPage);

  // Change page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
 console.log(paginatedUniforms)
console.log(sortedUniforms)
  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
          <DialogBackdrop className="fixed inset-0 bg-black bg-opacity-25 transition-opacity" />
          <div className="fixed inset-0 z-40 flex">
            <DialogPanel className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition ease-in-out">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Gender Filter */}
              <div className="px-4 py-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900">Gender</h3>
                <div className="mt-4 space-y-4">
                  {genderTypes.map((type) => (
                    <div key={type.value} className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value={type.value}
                        checked={selectedGender === type.value}
                        onChange={() => setSelectedGender(type.value)}
                        className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                      />
                      <label className="ml-3 text-sm text-gray-600">{type.name}</label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Institution Type Filter */}
              <div className="px-4 py-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900">Institution Type</h3>
                <div className="mt-4 space-y-4">
                  {institutionTypes.map((type) => (
                    <div key={type.value} className="flex items-center">
                      <input
                        type="radio"
                        name="institution-type"
                        value={type.value}
                        checked={selectedInstitutionType === type.value}
                        onChange={() => setSelectedInstitutionType(type.value)}
                        className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                      />
                      <label className="ml-3 text-sm text-gray-600">{type.name}</label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sort by Price */}
              <div className="px-4 py-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900">Sort by</h3>
                <div className="mt-2">
                  <select
                    value={selectedSortOption}
                    onChange={(e) => setSelectedSortOption(e.target.value)}
                    className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Main content */}
        <main className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Uniforms</h1>
            <div className="flex items-center ">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 p-2 text-gray-400 hover:text-gray-500 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Product grid */}
          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">Products</h2>
            <div className="grid grid-cols-1 gap-x-1000 gap-y-10 lg:grid-cols-4">
              {/* Desktop Filters */}
              <form className="hidden lg:block">
                <div className="space-y-6">
                  {/* Gender Filter */}
                  <div className="space-y-6 border-b border-gray-200 pb-6">
                    <h3 className="text-sm font-medium text-gray-900">Gender</h3>
                    {genderTypes.map((type) => (
                      <div key={type.value} className="flex items-center">
                        <input
                          type="radio"
                          name="gender"
                          value={type.value}
                          checked={selectedGender === type.value}
                          onChange={() => setSelectedGender(type.value)}
                          className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        />
                        <label className="ml-3 text-sm text-gray-600">{type.name}</label>
                      </div>
                    ))}
                  </div>

                  {/* Institution Type Filter */}
                  <div className="space-y-6 border-b border-gray-200 pb-6">
                    <h3 className="text-sm font-medium text-gray-900">Institution Type</h3>
                    {institutionTypes.map((type) => (
                      <div key={type.value} className="flex items-center">
                        <input
                          type="radio"
                          name="institution-type"
                          value={type.value}
                          checked={selectedInstitutionType === type.value}
                          onChange={() => setSelectedInstitutionType(type.value)}
                          className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        />
                        <label className="ml-3 text-sm text-gray-600">{type.name}</label>
                      </div>
                    ))}
                  </div>

                  {/* Sort by Price */}
                  <div className="space-y-6">
                    <h3 className="text-sm font-medium text-gray-900">Sort by</h3>
                    <select
                      value={selectedSortOption}
                      onChange={(e) => setSelectedSortOption(e.target.value)}
                      className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </form>

              {/* Display Products */}
              <div className="lg:col-span-3 w-full">
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
                  {paginatedUniforms.map((uniform, index) => (
                    <ProductCard
                      key={`${uniform.institution.name}-${uniform.type}-${index}`}
                      uniform={uniform}
                      institution={uniform.institution}
                    
                    />
                  ))}
                </div>
              </div>

              {/* Pagination */}

            </div>
              <div className="flex  justify-end items-center mt-6 mx-[25rem] space-x-3">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-6 py-3 mx-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-lg font-medium text-gray-800">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-6 py-3 mx-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}