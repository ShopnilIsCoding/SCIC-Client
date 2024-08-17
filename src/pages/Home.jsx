// Commit message: "Add search functionality to filter products by name"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch products with search term
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products', {
                    params: { page, limit: 10, search: searchTerm }
                });
                setProducts(response.data.products);
                setTotalPages(response.data.pages);
            } catch (error) {
                console.error('Failed to fetch products', error);
            }
        };
        fetchProducts();
    }, [page, searchTerm]);

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-4xl font-bold text-center mb-8">Product Store</h1>
            {/* Search Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search products..."
                    className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            {/* Product List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product._id} className="bg-white shadow-md rounded-lg p-4">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-48 object-cover rounded-md mb-4"
                            />
                            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                            <p className="text-gray-600 mb-2">{product.description}</p>
                            <p className="font-bold text-lg mb-2">${product.price}</p>
                            <p className="text-sm text-gray-500 mb-2">Rating: {product.rating} ⭐</p>
                            <p className="text-sm text-gray-500">Added on: {new Date(product.createdAt).toLocaleDateString()}</p>
                        </div>
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500">No products found</p>
                )}
            </div>
        </div>
    );
}

export default Home;
