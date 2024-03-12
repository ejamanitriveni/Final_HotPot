export class NutritionalInfo {

    nutritionId:number;
    calories:number;
    fats:number;
    proteins:number;
    carbohydrates:number;


    constructor(nutritionId:number,
        calories:number,
        fats:number,
        proteins:number,
        carbohydrates:number){
            this.nutritionId=nutritionId;
            this.calories=calories;
            this.fats=fats;
            this.proteins=proteins;
            this.carbohydrates=carbohydrates
        }
}
