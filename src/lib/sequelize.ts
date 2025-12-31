import "reflect-metadata";
import { Sequelize } from "sequelize-typescript";

import { Product } from "../models/Product";
import { Order } from "../models/Order";
import { OrderItem } from "../models/OrderItem";

let sequelize: Sequelize | null = null;

export function getSequelize() {
  if (!sequelize) {
    sequelize = new Sequelize({
      dialect: "postgres",
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT || 5432),
      database: process.env.DB_NAME || "online_store",
      username: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD || "casper@buster",
      models: [Product, Order, OrderItem], 
      logging: false,
    });
  }

  return sequelize;
}
