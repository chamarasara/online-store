import 'reflect-metadata';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {

    if (typeof require !== 'undefined') {
      require('reflect-metadata');
    }
    
    const { connectDB } = await import('../../../config/database');
    const { getAllProducts } = await import('../../../services/product.service');
    
    await connectDB();
    // await seedProducts();

    const products = await getAllProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
