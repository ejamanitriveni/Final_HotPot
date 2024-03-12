export class Order {
    orderId:number;
    orderDate:Date;
    amount:number;
    status:string;
    customerId:number;
    restaurantId:number;
    partnerId:number;


    constructor(orderId:number,
        orderDate:Date,
        amount:number,
        status:string,
        customerId:number,
        restaurantId:number,
        partnerId:number){

            this.orderId=orderId;
            this.orderDate=orderDate;
            this.amount=amount;
            this.status=status;
            this.customerId=customerId;
            this.restaurantId=restaurantId;
            this.partnerId=partnerId;

        }
    
}
