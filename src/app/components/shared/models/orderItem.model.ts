import { Product } from './Product.model';
import { Order } from './order.model';

export interface OrderItem {
    orderItemId: number;
    orderId: number;
    productId: number;
    quantity: number;
    subtotal: number;
}
