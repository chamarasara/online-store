export const dynamic = "force-dynamic"; 
export const runtime = "nodejs"; 
import { NextResponse } from 'next/server';
import {getSequelize} from '../../../../lib/sequelize';
import { Order } from '../../../../models/Order';
import { OrderItem } from '../../../../models/OrderItem';
import { Product } from '../../../../models/Product';


export async function GET(req: Request, { params }: any) {
  const unwrappedParams = await params; // unwrap the promise
  const id = unwrappedParams.id;
  const sequelize = getSequelize();
  await sequelize.authenticate(); 
  
  if (!id) {
    return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
  }

  try {
    const order = await Order.findByPk(Number(id), {
      include: [
        {
          model: OrderItem,
          include: [Product],
        },
      ],
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const response = {
      id: order.id,
      totalAmount: order.totalAmount,
      createdAt: order.createdAt,
      items: order.items.map((item: any) => ({
        productId: item.productId,
        name: item.product.name,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    return NextResponse.json(response);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
