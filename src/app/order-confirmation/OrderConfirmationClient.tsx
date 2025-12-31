'use client';

import { useSearchParams } from 'next/navigation';

export default function OrderConfirmationClient() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Order Confirmed 🎉</h1>
      <p>Your order ID is:</p>
      <p className="font-mono mt-2">{orderId}</p>
    </div>
  );
}
