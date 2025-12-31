import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import type { OrderItem } from './OrderItem'; // only for TS type

@Table({ tableName: 'products' })
export class Product extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.FLOAT, allowNull: false })
  declare price: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare inventory: number;

  // Use lazy function without importing the class
  @HasMany(() => require('./OrderItem').OrderItem)
  declare orderItems: OrderItem[];
}
