export const dynamic = "force-dynamic"; 
export const runtime = "nodejs"; 
import { NextResponse } from 'next/server';
import {getSequelize} from '../../../lib/sequelize';
import { Product } from '../../../models/Product';
import { Order } from '../../../models/Order';
import { OrderItem } from '../../../models/OrderItem';

export async function POST(req: Request) {
  const { items } = await req.json(); // [{ productId, quantity }]
  const sequelize = getSequelize();
  const t = await sequelize.transaction();

  try {
    let totalAmount = 0;

    // Validate stock & calculate total
    for (const i of items) {
      const product = await Product.findByPk(i.productId, { lock: true, transaction: t });
      if (!product) throw new Error(`Product ${i.productId} not found`);
      if (product.inventory < i.quantity) throw new Error(`Not enough inventory for ${product.name}`);
      totalAmount += Number(product.price) * i.quantity;
    }

    // Create order
    const order = await Order.create({ totalAmount }, { transaction: t });

    // Create order items & update stock
    for (const i of items) {
      const product = await Product.findByPk(i.productId, { lock: true, transaction: t });
      if (!product) throw new Error(`Product ${i.productId} not found`);

      await OrderItem.create(
        { orderId: order.id, productId: product.id, quantity: i.quantity, price: Number(product.price) },
        { transaction: t }
      );

      product.inventory -= i.quantity;
      await product.save({ transaction: t });
    }

    await t.commit();
    return NextResponse.json({ orderId: order.id });
  } catch (err: any) {
    await t.rollback();
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
