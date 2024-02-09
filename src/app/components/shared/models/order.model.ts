import { List } from 'echarts';
import { user } from './user.model';
import { OrderItem } from './orderItem.model';

export interface Order {
    orderId: number;
    user: user;
    orderDate: Date;
    status: OrderStatus;
    orderItems: OrderItem[];
}

export enum OrderStatus {
    PENDING = 'PENDING',
    CANCELED = 'CANCELED',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
}
