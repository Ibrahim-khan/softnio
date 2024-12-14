"use client";
import { faHeart, faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons"; // Regular star for empty state
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from 'next/image';
import { useState } from "react";

export default function Home() {
  const [imageSrc, setImageSrc] = useState("/watch/purple.png"); // Default image
  const [count, setCount] = useState(1); // Counter Value
  const [selectedColor, setSelectedColor] = useState("purple"); // Track band color
  const [selectedSize, setSelectedSize] = useState(null); // Track wrist size
  const [cartCount, setCartCount] = useState(0); // Track number of items in cart
  const [orderMessageModal, setorderMessageModal] = useState(false); // Show custom modal
  const [showModal, setShowModal] = useState(false); // Show custom modal
  const [tempCartData, setTempCartData] = useState(null); // Temporary cart data
  const [cartItems, setCartItems] = useState([]); // Store cart items

    // Map colors to their corresponding images
    const colorImages = {
      purple: "/watch/purple.png",
      cyan: "/watch/cyan.png",
      blue: "/watch/blue.png",
      black: "/watch/black.png",
    };

  // Increase The Count
  const handleIncrement = () => {
    setCount(count + 1);
  };

  // Decrease the Count
  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  // Add to Cart
  const handleAddToCart = () => {
    if (selectedColor && selectedSize) {
      const basePrice = 69;  // Base price for the item
      const sizePrice = ['S', 'M', 'L', 'XL'].indexOf(selectedSize) * 10; // Size-based price increase
      const price = basePrice + sizePrice; // Total price for the selected size
      
      const newItem = {
        item: "Classy Modern Smart Watch",
        color: selectedColor,
        size: selectedSize,
        quantity: count,
        price: price, // Store price as a number (not a string with '$')
        image: colorImages[selectedColor]
      };

      setTempCartData(newItem); // Temporary modal data
      setorderMessageModal(true); // Open the custom modal
    } else {
      alert("Please select band color and wrist size before adding to cart.");
    }
  };




  // Handle Checkout Button
  const handleCheckout = () => {
    if (selectedColor && selectedSize) {
      const basePrice = 69;  // Base price for the item
      const sizePrice = ['S', 'M', 'L', 'XL'].indexOf(selectedSize) * 10; // Size-based price increase
      const price = basePrice + sizePrice; // Calculate the total price
      
      setTempCartData({
        item: "Classy Modern Smart Watch",
        color: selectedColor,
        size: selectedSize,
        quantity: count,
        price: price // Store price as a number
      });
      setShowModal(true); // Show the add-to-cart confirmation modal
    } else {
      alert("Your cart is empty.");
    }
  };

   // Confirm Add to Cart
    const confirmAddToCart = () => {
      setCartItems([...cartItems, tempCartData]); // Add the item to cart
      setCartCount(cartCount + tempCartData.quantity); // Increment cart count
      setTempCartData(null); // Reset temp cart data
      setShowModal(false); // Close modal
    };

    // Cancel Add to Cart
    const cancelAddToCart = () => {
      setTempCartData(null); // Reset temporary cart data
      setShowModal(false); // Close modal
    };

  

  return (
    <div className=" items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className='grid grid-cols-1 lg:grid-cols-2'>
          {/* Image */}
          <div>
            <Image
              src={colorImages[selectedColor]} // Dynamically switch image based on selectedColor
              alt={`${selectedColor} Watch`}
              width={400}
              height={400}
              priority
            />
          </div>

          {/* Product Info */}
          <div className='pt-10 lg:pt-0 lg:pl-5'>
            <h2 className='text-[#364A63] text-3xl font-semibold'>Classy Modern Smart Watch</h2>

            {/* Star Rating and Reviews */}
            <div className="flex items-center gap-2 mt-4">
              {/* Stars */}
              <div className="flex text-yellow-500">
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStarHalfAlt} />
                <FontAwesomeIcon icon={faStarRegular} /> {/* Empty star */}
              </div>

              {/* Review Count */}
              <div className="text-gray-400 text-sm">
                <span>(2 Reviews)</span>
              </div>
            </div>

            {/* Price Information */}
            <div className="my-2">
              <span className="text-[#8091A7] line-through mr-2">$99.00</span>
              <span className="text-[#6576FF] font-bold">$79.00</span>
            </div>

            {/* Band Color Start */}
            <div className="mt-4">
            <p className="font-medium mb-2">Band Color</p>
            <div className="flex gap-4">
              {["purple", "cyan", "blue", "black"].map((color, i) => (
                <div
                  key={i}
                  className={`w-6 h-6 rounded-full cursor-pointer ${
                    selectedColor === color ? "ring-4 ring-[#6576FF]" : ""
                  }`}
                  style={{
                    backgroundColor:
                      color === "purple"
                        ? "#816BFF"
                        : color === "cyan"
                        ? "#1FCEC9"
                        : color === "blue"
                        ? "#4B97D3"
                        : "#3B4747",
                  }}
                  onClick={() => setSelectedColor(color)} // Update selected color
                ></div>
              ))}
            </div>
          </div>
            {/* Band Color End */}

            {/* Wrist Size Start */}
            <div className="my-4">
              <h4>Wrist Size</h4>
              <div className="my-2 space-x-5">
                {['S', 'M', 'L', 'XL'].map((size) => (
                  <button 
                    key={size}
                    className={`font-semibold border border-slate-300 px-3 py-1 hover:border-slate-950 ring-1 ${selectedSize === size ? 'ring-[#263df0]' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size} <span className="text-gray-400 pl-2">${69 + (['S', 'M', 'L', 'XL'].indexOf(size) * 10)}</span> {/* Display price */}
                  </button>
                ))}
              </div>
            </div>
            {/* Wrist Size End */}

            {/* Counter and Add to Cart */}
            <div className="flex items-center gap-6 mt-6">
              <div className="flex items-center border border-slate-300 rounded-md">
                <button className="px-3 py-1 text-lg font-bold hover:bg-slate-200" onClick={handleDecrement}>-</button>
                <span className="px-4 py-1 text-lg border-l border-r border-slate-300">{count}</span>
                <button className="px-3 py-1 text-lg font-bold hover:bg-slate-200" onClick={handleIncrement}>+</button>
              </div>

              {/* Add to Cart */}
              <button 
                className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>

               {/* Heart Icon */}
              <button 
                className="text-gray-500 hover:text-red-500 text-2xl"
                onClick={() => console.log('Wishlist clicked')}
              >
                <FontAwesomeIcon icon={faHeart} />
              </button>
            </div>
          </div>
        </div>

        {/* Checkout Button */}
        <div className="mx-auto mt-6 bg-[#FFBB5A] rounded-3xl p-3">
          <button 
            className="text-black font-semibold"
            onClick={handleCheckout}
          >
            Checkout
            <span className="bg-white text-black rounded px-2 ml-2">{cartCount}</span>
          </button>
        </div>




      {/* Custom Modal Add to Cart Button */}
      {orderMessageModal && tempCartData && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold">Confirm Add to Cart</h3>
            <p>
              Color: {tempCartData.color}, Size: {tempCartData.size}, Quantity: {tempCartData.quantity}
            </p>
            <div className="flex justify-end gap-4 mt-4">
              <button 
                onClick={cancelAddToCart} 
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button 
                onClick={confirmAddToCart} 
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Custom Modal Add to Cart Button */}

       {/* Modal For checkOut Button */}
       {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-3xl">
            <h3 className="text-lg font-bold mb-4">Your Cart</h3>
            {/* Table */}
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-slate-500 border-b border-slate-200">
                  <th className="p-2">Item</th>
                  <th className="p-2">Color</th>
                  <th className="p-2">Size</th>
                  <th className="p-2">Qnt</th>
                  <th className="p-2">Price</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, i) => (
                  <tr key={i} className="text-center text-slate-700 border-b border-slate-200">
                    {/* Image and Item Name */}
                    <td className="p-2">
                      <div className="flex items-center gap-2 justify-center">
                        <img 
                          src={item.image} 
                          alt={item.item} 
                          className="w-12 h-12 object-cover rounded" 
                        />
                        <span className="text-sm font-medium">{item.item}</span>
                      </div>
                    </td>
                    {/* Other Columns */}
                    <td className="p-2 capitalize">{item.color}</td>
                    <td className="p-2">{item.size}</td>
                    <td className="p-2">{item.quantity}</td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td> {/* Show price with quantity */}
                  </tr>                  
                ))}
              </tbody>

              {/* Total Row */}
              <tfoot>
              <tr className="text-center text-slate-700 border-t border-slate-200 font-semibold">
                <td className="p-2">Total</td>
                <td className="p-2">{null}</td>
                <td className="p-2">{null}</td>
                <td className="p-2">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)} {/* Total Quantity */}
                </td>
                <td className="p-2">
                  ${cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)} {/* Total Price */}
                </td>
              </tr>
            </tfoot>
            </table>
            {/* Button */}
            <div className=" space-x-8 float-end">
              <button 
                onClick={() => cancelAddToCart()} 
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Continue Shopping
              </button>
              <button 
                onClick={() => cancelAddToCart()} 
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
      </main>
    </div>
  );
}
