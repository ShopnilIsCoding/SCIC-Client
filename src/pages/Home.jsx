// Commit message: "Add price filtering functionality"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

function Home() {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        brands: [],
        categories: [],
        priceMin: '',
        priceMax: '',
    });
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);

    // Fetch available brands and categories for filtering
    useEffect(() => {
        const fetchBrandsAndCategories = async () => {
            try {
                const brandResponse = await axios.get('http://localhost:5000/api/brands');
                const categoryResponse = await axios.get('http://localhost:5000/api/categories');
                setBrands(brandResponse.data.map(brand => ({ label: brand, value: brand })));
                setCategories(categoryResponse.data.map(category => ({ label: category, value: category })));
            } catch (error) {
                console.error('Failed to fetch brands and categories', error);
            }
        };
        fetchBrandsAndCategories();
    }, []);

    // Fetch products with pagination, search, and filters
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const selectedBrands = filters.brands.map(b => b.value).join(',');
                const selectedCategories = filters.categories.map(c => c.value).join(',');

                const response = await axios.get('http://localhost:5000/api/products', {
                    params: {
                        page,
                        limit: 10,
                        search: searchTerm,
                        brand: selectedBrands,
                        category: selectedCategories,
                        priceMin: filters.priceMin,
                        priceMax: filters.priceMax,
                    }
                });
                setProducts(response.data.products);
                setTotalPages(response.data.pages);
            } catch (error) {
                console.error('Failed to fetch products', error);
            }
        };
        fetchProducts();
    }, [page, searchTerm, filters]);

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
            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Select
                    value={filters.brands}
                    onChange={(selectedOptions) => setFilters({ ...filters, brands: selectedOptions || [] })}
                    options={brands}
                    placeholder="Filter by Brand"
                    isClearable
                    isMulti
                    className="w-full"
                />
                <Select
                    value={filters.categories}
                    onChange={(selectedOptions) => setFilters({ ...filters, categories: selectedOptions || [] })}
                    options={categories}
                    placeholder="Filter by Category"
                    isClearable
                    isMulti
                    className="w-full"
                />
                <div className="flex space-x-2">
                    <input
                        type="number"
                        value={filters.priceMin}
                        onChange={(e) => setFilters({ ...filters, priceMin: e.target.value })}
                        placeholder="Min Price"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="number"
                        value={filters.priceMax}
                        onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })}
                        placeholder="Max Price"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
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
