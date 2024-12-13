"use client";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons"; // Regular star for empty state
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from 'next/image';
import { useState } from "react";

export default function Home() {
  const [imageSrc, setImageSrc] = useState("/watch/purple.png"); // Default image
  const [count, setCount] = useState(1); // Counter Value
  const [selectedColor, setSelectedColor] = useState(null); // Track band color
  const [selectedSize, setSelectedSize] = useState(null); // Track wrist size
  const [cartCount, setCartCount] = useState(0); // Track number of items in cart
  const [showModal, setShowModal] = useState(false); // Show custom modal
  const [tempCartData, setTempCartData] = useState(null); // Temporary cart data

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
      setTempCartData({ color: selectedColor, size: selectedSize, quantity: count });
      setShowModal(true); // Open the custom modal
    } else {
      alert("Please select band color and wrist size before adding to cart.");
    }
  };

   // Confirm Add to Cart
   const confirmAddToCart = () => {
    setCartCount(cartCount + 1); // Increment cart count
    setShowModal(false); // Close modal
  };

  // Cancel Add to Cart
  const cancelAddToCart = () => {
    setTempCartData(null); // Reset temporary cart data
    setShowModal(false); // Close modal
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className='grid grid-cols-1 lg:grid-cols-2'>
          {/* Image */}
          <Image 
            src={imageSrc} 
            alt="Smart Watch"       
            width={400}              
            height={400}            
            priority    
          />

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
              <p className="text-[#364A63] font-medium mb-2">Band Color</p>
              <div className="flex gap-4">
                {/* Circle 1 */}
                <div 
                  className={`w-6 h-6 rounded-full cursor-pointer ${selectedColor === 'purple' ? 'ring-4 ring-[#6576FF]' : ''}`}
                  style={{ backgroundColor: "#816BFF" }}
                  onClick={() => { setImageSrc("/watch/purple.png"); setSelectedColor('purple'); }}
                ></div>

                {/* Circle 2 */}
                <div 
                  className={`w-6 h-6 rounded-full cursor-pointer ${selectedColor === 'cyan' ? 'ring-4 ring-[#6576FF]' : ''}`}
                  style={{ backgroundColor: "#1FCEC9" }}
                  onClick={() => { setImageSrc("/watch/cyan.png"); setSelectedColor('cyan'); }}
                ></div>

                {/* Circle 3 */}
                <div 
                  className={`w-6 h-6 rounded-full cursor-pointer ${selectedColor === 'blue' ? 'ring-4 ring-[#6576FF]' : ''}`}
                  style={{ backgroundColor: "#4B97D3" }}
                  onClick={() => { setImageSrc("/watch/blue.png"); setSelectedColor('blue'); }}
                ></div>

                {/* Circle 4 */}
                <div 
                  className={`w-6 h-6 rounded-full cursor-pointer ${selectedColor === 'black' ? 'ring-4 ring-[#6576FF]' : ''}`}
                  style={{ backgroundColor: "#3B4747" }}
                  onClick={() => { setImageSrc("/watch/black.png"); setSelectedColor('black'); }}
                ></div>
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
                    className={`font-semibold border border-slate-300 p-3 hover:border-slate-950 focus:ring-4 ${selectedSize === size ? 'ring-[#6576FF]' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size} <span className="text-gray-400 pl-2">${69 + (['S', 'M', 'L', 'XL'].indexOf(size) * 10)}</span>
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
            </div>
          </div>
        </div>

        {/* Checkout Button */}
        <div className="mx-auto mt-6 bg-[#FFBB5A] rounded-3xl p-3">
          <button className="text-white font-semibold">
            Checkout {cartCount}
          </button>
        </div>




        {/* Custom Modal */}
      {showModal && (
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
      </main>
    </div>
  );
}
