export class OrderItem {

    quantity:number;
    subTotalPrice:number;
    orderId:number;
    menuId:number;

    constructor(quantity:number,
        subTotalPrice:number,
        orderId:number,
        menuId:number){
            this.quantity=quantity;
            this.subTotalPrice=subTotalPrice;
            this.orderId=orderId;
            this.menuId=menuId;
        }
}
