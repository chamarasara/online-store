import { connectDB } from '../config/database.js';
import { seedProducts } from '../services/seedProducts.js';

async function main() {
  try {
    await connectDB();
    await seedProducts();
    console.log('Seeding completed!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();
