export const dynamic = "force-dynamic"; 
export const runtime = "nodejs"; 
import {getSequelize} from '../lib/sequelize';
import { Product } from '../models/Product';
import { Order } from '../models/Order';
import { OrderItem } from '../models/OrderItem';
import { Transaction } from 'sequelize';

type CheckoutItem = {
  productId: number;
  quantity: number;
};

export const placeOrder = async (items: CheckoutItem[]) => {
  const sequelize = getSequelize();
  return sequelize.transaction(
    { isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE },
    async (transaction) => {
      let totalAmount = 0;

      const productIds = items.map(i => i.productId);

      const products = await Product.findAll({
        where: { id: productIds },
        lock: transaction.LOCK.UPDATE,
        transaction,
      });

      // Validate inventory
      for (const item of items) {
        const product = products.find(p => p.id === item.productId);

        if (!product) throw new Error('Product not found');

        if (product.inventory < item.quantity) {
          throw new Error(`Insufficient inventory for ${product.name}`);
        }

        totalAmount += product.price * item.quantity;
      }

      // Reduce inventory
      for (const item of items) {
        const product = products.find(p => p.id === item.productId)!;
        product.inventory -= item.quantity;
        await product.save({ transaction });
      }

      // Create order
      const order = await Order.create(
        { totalAmount },
        { transaction }
      );

      // Create order items
      for (const item of items) {
        const product = products.find(p => p.id === item.productId)!;

        await OrderItem.create(
          {
            orderId: order.id,
            productId: product.id,
            quantity: item.quantity,
            price: product.price,
          },
          { transaction }
        );
      }

      return order;
    }
  );
};
