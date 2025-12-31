'use client';

import Link from 'next/link';
import { removeFromCart } from '../../redux/slices/cartSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

export default function CartPage() {
  const items = useAppSelector(state => state.cart.items);
  const dispatch = useAppDispatch();

  const total = items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Cart</h1>

      {items.map(item => (
        <div
          key={item.productId}
          className="flex justify-between mb-2"
        >
          <span>
            {item.name} x {item.quantity}
          </span>
          <button
            onClick={() => dispatch(removeFromCart(item.productId))}
            className="text-red-500"
          >
            Remove
          </button>
        </div>
      ))}

      <p className="mt-4 font-semibold">Total: ${total}</p>

      <Link
        href="/checkout"
        className="inline-block mt-4 bg-black text-white px-4 py-2 rounded"
      >
        Checkout
      </Link>
    </div>
  );
}
