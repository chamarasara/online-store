export const dynamic = "force-dynamic"; 
export const runtime = "nodejs"; 
import { NextResponse } from 'next/server';
import {getSequelize} from '../../../../lib/sequelize';
import { Order } from '../../../../models/Order';
import { OrderItem } from '../../../../models/OrderItem';
import { Product } from '../../../../models/Product';
import { Op, fn, col, literal } from 'sequelize';

export async function GET() {
  const sequelize = getSequelize();
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - 7);

    // Total orders today
    const totalOrdersToday = await Order.count({
      where: {
        createdAt: { [Op.gte]: today },
      },
    });

    // Total revenue this week
    const revenueResult: any = await Order.findOne({
      attributes: [[fn('SUM', col('totalAmount')), 'total']],
      where: {
        createdAt: { [Op.gte]: weekStart },
      },
      raw: true,
    });

    const totalRevenueWeek = revenueResult?.total || 0;

    // Top 3 selling products
    const topProducts = await OrderItem.findAll({
      attributes: [
        'productId',
        [fn('SUM', col('quantity')), 'sold'],
      ],
      include: [
        {
          model: Product,
          attributes: ['name'],
        },
      ],
      group: ['productId', 'product.id'],
      order: [[literal('sold'), 'DESC']],
      limit: 3,
    });

    return NextResponse.json({
      totalOrdersToday,
      totalRevenueWeek,
      topProducts: topProducts.map((p: any) => ({
        name: p.product.name,
        sold: p.getDataValue('sold'),
      })),
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
