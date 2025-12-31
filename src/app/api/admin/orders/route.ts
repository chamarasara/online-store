import { NextResponse } from 'next/server';
import { Order } from '../../../../models/Order';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get('page') || 1);
    const pageSize = Number(searchParams.get('pageSize') || 10);
    const offset = (page - 1) * pageSize;

    const { rows, count } = await Order.findAndCountAll({
      order: [['createdAt', 'DESC']],
      limit: pageSize,
      offset,
    });

    return NextResponse.json({
      orders: rows.map(o => ({
        id: o.id,
        totalAmount: o.totalAmount,
        createdAt: o.createdAt,
      })),
      pagination: {
        page,
        pageSize,
        totalPages: Math.ceil(count / pageSize),
        totalRecords: count,
      },
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
