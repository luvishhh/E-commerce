import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { boysuniformsData } from '../../Data/Boys/Boysuniform';  // Your boys uniform data
import { girlsuniformData } from '../../Data/Girls/Girlsuniform';  // Your girls uniform data

const AddNewProductPage = () => {
    const [product, setProduct] = useState({
        type: '',
        color: '',
        price: '',
        sizes: [],
        description: '',
        image: '',
        highlights: [],
    });
    const [category, setCategory] = useState('boys'); // Default category to 'boys'

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value,
        });
    };

    const handleSizeChange = (e) => {
        const { value } = e.target;
        setProduct({
            ...product,
            sizes: value.split(',').map((size) => size.trim()), // Allow input sizes as comma separated
        });
    };

    const handleHighlightsChange = (e) => {
        const { value } = e.target;
        setProduct({
            ...product,
            highlights: value.split(',').map((highlight) => highlight.trim()),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add product to the appropriate data (boys or girls)
        if (category === 'boys') {
            boysuniformsData.push({ uniforms: [product] });  // You may need to adjust how your data is structured
        } else {
            girlsuniformData.push({ uniforms: [product] });
        }

        // Redirect to the product management page
        navigate('/admin/products');
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-50 shadow-lg rounded-lg w-[60rem] h-[40rem] ">
            <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">Add New Product</h2>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Category Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                        <option value="boys">Boys</option>
                        <option value="girls">Girls</option>
                    </select>
                </div>

                {/* Product Type */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Product Type</label>
                    <input
                        type="text"
                        name="type"
                        value={product.type}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        required
                    />
                </div>

                {/* Product Color */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Product Color</label>
                    <input
                        type="text"
                        name="color"
                        value={product.color}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        required
                    />
                </div>

                {/* Product Price */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Product Price</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        required
                    />
                </div>

                {/* Product Sizes */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Product Sizes (comma separated)</label>
                    <input
                        type="text"
                        value={product.sizes.join(', ')}
                        onChange={handleSizeChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        required
                    />
                </div>

                {/* Product Description */}
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Product Description</label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        rows="3"
                        required
                    />
                </div>

                {/* Product Image URL */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Product Image URL</label>
                    <input
                        type="text"
                        name="image"
                        value={product.image}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                </div>

                {/* Product Highlights */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Product Highlights (comma separated)</label>
                    <input
                        type="text"
                        value={product.highlights.join(', ')}
                        onChange={handleHighlightsChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center col-span-2">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                        Add Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddNewProductPage;
