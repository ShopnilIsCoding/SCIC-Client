import React, { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const MyCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Retrieve cart items from local storage on component mount
  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cartData);
    calculateTotal(cartData);
  }, []);

  // Calculate total price of cart items
  const calculateTotal = (items) => {
    const total = items.reduce((acc, item) => acc + item.price, 0);
    setTotalPrice(total.toFixed(2));
  };

  // Handle item deletion
  const handleDelete = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    calculateTotal(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-gray-100 mb-8">My Cart</h1>

      {/* Total Price */}
      <div className="text-right text-gray-200 text-2xl font-semibold mb-4">
        Total Price: ${totalPrice}
      </div>

      {/* Cart Items Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-gray-200 bg-gray-800 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-700 text-gray-300">
              <th className="p-4 text-left">Product Name</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td className="p-4">{item.name}</td>
                  <td className="p-4">{item.category}</td>
                  <td className="p-4">${item.price.toFixed(2)}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-500 hover:text-red-700 transition-colors duration-300"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  Your cart is empty.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyCart;
