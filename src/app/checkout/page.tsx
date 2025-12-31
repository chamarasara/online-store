'use client';

import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { useRouter } from 'next/navigation';
import { clearCart } from '../../redux/slices/cartSlice';
import { useState } from 'react';

export default function CheckoutPage() {
  const cartItems = useAppSelector(state => state.cart.items);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

 const handlePlaceOrder = async () => {
    if (cartItems.length === 0) return alert('Cart is empty!');

    setLoading(true);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cartItems }),
      });

      const data = await res.json();

      if (res.ok && data.orderId) {
        dispatch(clearCart()); // empty cart after successful order
        router.push(`/order-confirmation?orderId=${data.orderId}`);
      } else {
        alert(data.error || 'Failed to place order');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while placing the order');
    } finally {
      setLoading(false);
    }
  };
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Checkout</h1>

    <div className="mb-4">
      {cartItems.map(item => (
        <div key={item.productId} className="flex justify-between mb-2">
          <span>{item.name} x {item.quantity}</span>
          <span>${item.price * item.quantity}</span>
        </div>
      ))}
      <p className="mt-2 font-semibold">Total: ${total}</p>
    </div>

    <button
      onClick={handlePlaceOrder}
      disabled={loading}
      className="bg-black text-white px-4 py-2 rounded"
    >
      {loading ? 'Placing Order...' : 'Place Order'}
    </button>
  </div>
  );
}
