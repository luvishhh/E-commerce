import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { boysuniformsData } from '../../Data/Boys/Boysuniform';
import { girlsuniformData } from '../../Data/Girls/Girlsuniform';

// Combine both boys and girls uniforms
const ProductAdminPage = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(5); // 5 products per page

    const navigate = useNavigate();

    // Function to handle navigating to edit or view page
    const handleProductClick = (id) => {
        navigate(`/admin/product/${id}`);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
        }
    };

    // Combine both boys and girls uniforms data into one array
    const combineUniformData = () => {
        const combinedData = [];
    
        // Iterate over boys' uniform data
        boysuniformsData.forEach((institution) => {
            if (institution.uniforms && Array.isArray(institution.uniforms)) {
                institution.uniforms.forEach((uniform) => {
                    combinedData.push(uniform);
                });
            }
        });
    
        // Iterate over girls' uniform data
        girlsuniformData.forEach((institution) => {
            if (institution.uniforms && Array.isArray(institution.uniforms)) {
                institution.uniforms.forEach((uniform) => {
                    combinedData.push(uniform);
                });
            }
        });
        return combinedData;
    };

    // Set products on initial load
    useEffect(() => {
        const combinedProducts = combineUniformData();
        setProducts(combinedProducts);
    }, []);

    // Calculate the products to show for the current page
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Handle page change
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Total pages
    const totalPages = Math.ceil(products.length / productsPerPage);

    return (
        <div className="p-5 ">
            <h2 className="text-3xl font-bold mb-5">Product Management</h2>
            <div className="flex justify-between mb-5">
                <button
                    onClick={() => navigate('/admin/product/CreateProduct')}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                >
                    Add New Product
                </button>
            </div>

            {/* Horizontal Product List */}
            <div className="flex overflow-x-auto space-x-4 pb-5">
                {currentProducts.map((product) => (
                    <div key={product.id} className="flex-shrink-0 w-60 border border-gray-300 rounded-lg shadow-md overflow-hidden">
                        <div onClick={() => handleProductClick(product.id)} className="cursor-pointer">
                            {/* Product Image */}
                            {product.image ? (
                                <img src={product.image} alt={product.type} className="w-full h-48 object-cover" />
                            ) : (
                                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">No Image</div>
                            )}
                            {/* Product Info */}
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">{product.type} - {product.color}</h3>
                                <p className="text-sm text-gray-500">{product.description}</p>
                                <p className="text-lg font-semibold text-green-600 mt-2">Rs. {product.price}</p>
                                <p className="text-sm text-gray-500">Sizes: {product.sizes.join(', ')}</p>
                                <div className="text-sm text-gray-500 mt-2">
                                    <strong>Highlights:</strong>
                                    <ul className="list-disc ml-5">
                                        {/* Ensure highlights is always an array */}
                                        {(product.highlights || []).map((highlight, index) => (
                                            <li key={index}>{highlight}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* Edit & Delete buttons */}
                        <div className="flex justify-between p-4">
                            <button
                                onClick={() => handleProductClick(product.id)}
                                className="px-3 py-2 bg-yellow-400 text-white rounded-md hover:bg-yellow-600"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(product.id)}
                                className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-5">
               

                <div className="flex items-center space-x-2">
                    {/* Create page numbers */}
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => paginate(index + 1)}
                            className={`px-4 py-2 rounded-md ${
                                currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
                            }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>

               
            </div>
        </div>
    );
};

export default ProductAdminPage;
