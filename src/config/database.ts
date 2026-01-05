export const dynamic = "force-dynamic"; 
export const runtime = "nodejs"; 
import {getSequelize} from '../lib/sequelize';

export const connectDB = async () => {
  const sequelize = getSequelize();
  try {
    await sequelize.authenticate();

    console.log('Database connected and tables synced');
  } catch (error) {
    console.error('DB connection failed', error);
    throw error;
  }
};
