export class Restaurant{
    restaurantId:number;
    restaurantName:string;
    phone:string|null;
    email:string|null;
    cityId:number;
    restaurantImage:string|null;

    constructor(
    restaurantId:number,
    restaurantName:string,
    phone:string|null,
    email:string|null,
    cityId:number,
    restaurantImage:string|null
        ){
    this.restaurantId=restaurantId;
    this.restaurantName=restaurantName;
    this.phone=phone;
    this.email=email;
    this.cityId=cityId;
    this.restaurantImage=restaurantImage;
        }

}