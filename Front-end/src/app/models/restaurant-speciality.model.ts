export class RestaurantSpeciality {

    categoryId:number;
    categoryName:string;
    restaurantId:number;


    constructor(categoryId:number,
        categoryName:string,
        restaurantId:number
    ){
        this.categoryId=categoryId;
        this.categoryName=categoryName;
        this.restaurantId=restaurantId;
    }
}
