import { Suspense } from 'react';
import OrderConfirmationClient from './OrderConfirmationClient';

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading order details...</div>}>
      <OrderConfirmationClient />
    </Suspense>
  );
}
