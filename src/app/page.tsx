'use client';

import { useEffect, useState } from 'react';
import { addToCart } from '../redux/slices/cartSlice';
import { useAppDispatch } from '../redux/hooks';
import CartSummary from '../components/CartSummary';

type Product = {
  id: number;
  name: string;
  price: number;
  inventory: number;
};

export default function Home() {
  const dispatch = useAppDispatch();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(setProducts)
      .catch(err => console.error('Failed to fetch products:', err));
  }, []);

  const handleAddToCart = (product: Product) => {
    dispatch(
      addToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      })
    );
  };

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">Products</h1>
        <CartSummary /> {/* Top-right cart summary */}
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-3 gap-x-12 gap-y-8">
        {products.length > 0 ? (
          products.map(product => (
            <div
              key={product.id}
              className="border rounded-lg p-6 flex flex-col shadow hover:shadow-lg transition-shadow duration-200"
            >
              <h2 className="font-semibold text-lg mb-3">{product.name}</h2>
              <p className="text-gray-700 font-medium mb-2">${product.price}</p>
              <p className="text-sm text-gray-500 mb-4">
                In stock: {product.inventory}
              </p>

              <button
                onClick={() => handleAddToCart(product)}
                disabled={product.inventory === 0}
                className={`mt-auto w-full px-4 py-2 rounded text-white font-semibold transition-colors duration-200
                  ${product.inventory === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800'}
                `}
              >
                {product.inventory === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full">No products available.</p>
        )}
      </div>
    </div>
  );
}
