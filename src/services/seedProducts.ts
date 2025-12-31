import {getSequelize} from '../lib/sequelize.js';
import { Product } from '../models/Product.js';

export async function seedProducts() {
  const products = [
    { name: 'Laptop', price: 1000, inventory: 5 },
    { name: 'Mouse', price: 50, inventory: 10 },
    { name: 'Keyboard', price: 80, inventory: 8 },
  ];

  for (const p of products) {
    await Product.create(p);
  }
}
