import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import type { OrderItem } from './OrderItem';

@Table({ tableName: 'orders' })
export class Order extends Model {
  @Column({ type: DataType.FLOAT, allowNull: false })
  declare totalAmount: number;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  declare createdAt: Date;

  @HasMany(() => require('./OrderItem').OrderItem)
  declare items: OrderItem[];
}
