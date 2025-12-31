import { Product } from '../models/Product';

export const getAllProducts = async () => {
  return Product.findAll({
    order: [['createdAt', 'DESC']],
  });
};

// export const seedProducts = async () => {
//   const count = await Product.count();
//   if (count > 0) return;

//   await Product.bulkCreate([
//     { name: 'Laptop', price: 1200, inventory: 5 },
//     { name: 'Headphones', price: 200, inventory: 10 },
//     { name: 'Keyboard', price: 150, inventory: 7 },
//     { name: 'Mouse', price: 80, inventory: 12 },
//   ]);
// };
