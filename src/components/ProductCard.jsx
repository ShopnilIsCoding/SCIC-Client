import React from 'react';
import { FaStar, FaCartPlus } from 'react-icons/fa';
import { MdOutlineCategory } from 'react-icons/md';
import { AiFillTag } from 'react-icons/ai';
import { toast } from 'react-toastify';

function ProductCard({ product }) {
    const addToCart = () => {
        // Get existing cart data from local storage
        const existingCart = JSON.parse(localStorage.getItem('cart')) || [];

        // Add new product to the cart
        const newCart = [...existingCart, {
            name: product.name,
            price: product.price,
            category: product.category
        }];

        // Store updated cart data in local storage
        localStorage.setItem('cart', JSON.stringify(newCart));

        // Optionally, display a confirmation message
        toast.success(`${product.name} has been added to your cart!`);
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 transform transition-transform duration-300 hover:scale-105">
            <div className="relative">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                />
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {product.category}
                </div>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{product.name}</h3>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <div className="flex items-center justify-between">
                <p className="font-bold text-lg text-blue-500">${product.price}</p>
                <button
                    onClick={addToCart}
                    className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors duration-300"
                >
                    <FaCartPlus />
                </button>
            </div>
            <div className="flex items-center justify-between mt-2">
                <p className="text-sm text-gray-500 flex items-center">
                    <AiFillTag className="mr-1" /> Brand: <span className="ml-1 text-gray-700">{product.brand}</span>
                </p>
                <p className="text-sm text-gray-500 flex items-center">
                    <MdOutlineCategory className="mr-1" /> Category: <span className="ml-1 text-gray-700">{product.category}</span>
                </p>
            </div>
            <div className="flex items-center mt-2">
                <p className="text-yellow-500 flex items-center">
                    {Array(Math.floor(product.rating)).fill().map((_, i) => (
                        <FaStar key={i} />
                    ))}
                    {product.rating % 1 !== 0 && <FaStar className="half-star" />}
                </p>
                <p className="text-sm text-gray-500 ml-2">({product.rating})</p>
            </div>
            <p className="text-sm text-gray-500 mt-2">Added on: {new Date(product.createdAt).toLocaleDateString()}</p>
        </div>
    );
}

export default ProductCard;
