// Commit message: "Add pagination functionality with next/previous buttons"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import ProductCard from '../components/ProductCard';

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
        sortBy: ''
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

    // Fetch products with pagination, search, filters, and sorting
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
                        sortBy: filters.sortBy,
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
                <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Sort By</option>
                    <option value="priceAsc">Price: Low to High</option>
                    <option value="priceDesc">Price: High to Low</option>
                    <option value="dateAdded">Newest First</option>
                </select>
            </div>
            {/* Product List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.length > 0 ? (
                    products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500">No products found</p>
                )}
            </div>
            {/* Pagination */}
            <div className="flex justify-center items-center mt-8 space-x-4">
                <button
                    disabled={page <= 1}
                    onClick={() => setPage(page - 1)}
                    className="bg-gray-200 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-300 disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-gray-700">
                    Page {page} of {totalPages}
                </span>
                <button
                    disabled={page >= totalPages}
                    onClick={() => setPage(page + 1)}
                    className="bg-gray-200 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-300 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Home;
