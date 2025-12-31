import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import type { Product } from './Product';
import type { Order } from './Order';

@Table({ tableName: 'order_items' })
export class OrderItem extends Model {
  @ForeignKey(() => require('./Product').Product)
  @Column(DataType.INTEGER)
  declare productId: number;

  @ForeignKey(() => require('./Order').Order)
  @Column(DataType.INTEGER)
  declare orderId: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare quantity: number;

  @Column({ type: DataType.FLOAT, allowNull: false })
  declare price: number;

  @BelongsTo(() => require('./Product').Product)
  declare product: Product;

  @BelongsTo(() => require('./Order').Order)
  declare order: Order;
}
