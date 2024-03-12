export class RestaurantOwner {

    ownerId:number;
    name:string;
    restaurantId:number;
    userName:string;


    constructor(ownerId:number,
        name:string,
        restaurantId:number,
        userName:string
    ){
        this.ownerId=ownerId;
        this.name=name;
        this.restaurantId=restaurantId;
        this.userName=userName;
    }
}
