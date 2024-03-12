export class Cart {
    id:number;
    customerId:number;
    restaurantId:number;
    menuItemId:number;
    quantity:number;
    status:string;


    constructor(id:number,
        customerId:number,
        restaurantId:number,
        menuItemId:number,
        quantity:number,
        status:string){
            this.id=id;
            this.customerId=customerId;
            this.restaurantId=restaurantId;
            this.menuItemId=menuItemId;
            this.quantity=quantity;
            this.status=status
        }
}
