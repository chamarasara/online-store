'use client';

import Link from 'next/link';
import { useAppSelector } from '../redux/hooks';

export default function CartSummary() {
  const items = useAppSelector(state => state.cart.items);

  const totalItems = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (totalItems === 0) return null;

  return (
    <div className="flex items-center gap-4">
      <div className="text-sm">
        <span className="font-semibold">
          🛒 {totalItems} item{totalItems > 1 ? 's' : ''}
        </span>
        <span className="ml-2 text-gray-600">
          (${totalPrice})
        </span>
      </div>

      <Link
        href="/checkout"
        className="bg-black text-white px-3 py-1.5 rounded text-sm"
      >
        Go to Checkout
      </Link>
    </div>
  );
}
