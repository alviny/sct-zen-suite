import { Customer } from './customer';
import { CustomerOrderItem } from './customer_order_item';
export class CustomerOrder {
    public orderId:number;   
    public customer: Customer;   
    public customerOrderItems: CustomerOrderItem[]; 
    public firstName:string = '';
    public lastName:string = '';
}  
