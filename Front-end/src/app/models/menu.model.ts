import { NumberValueAccessor } from "@angular/forms";

export class Menu {

    menuId:number;
    name:string;
    type:string;
    price:string;
    description:string;
    cuisine:string;
    cookingtime:string;
    tasteInfo:string;
    menuImage:string;
    nutritionId:number;
    restaurantId:number;


    constructor(menuId:number,
        name:string,
        type:string,
        price:string,
        description:string,
        cuisine:string,
        cookingtime:string,
        tasteInfo:string,
        menuImage:string,
        nutritionId:number,
        restaurantId:number){

            this.menuId=menuId;
            this.name=name;
            this.type=type;
            this.price=price;
            this.description=description;
            this.cuisine=cuisine;
            this.cookingtime=cookingtime;
            this.tasteInfo=tasteInfo;
            this.menuImage=menuImage;
            this.nutritionId=nutritionId;
            this.restaurantId=restaurantId;



        }
    }
