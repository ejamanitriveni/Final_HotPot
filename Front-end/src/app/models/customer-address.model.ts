export class CustomerAddress {
    addressId:number;
    customerId:number;
    houseNumber:string;
    buildingName:string;
    locality:string;
    cityId:number;
    landMark:string;


    constructor(addressId:number,
        customerId:number,
        houseNumber:string,
        buildingName:string,
        locality:string,
        cityId:number,
        landMark:string,
    )
    {
        this.addressId=addressId;
        this.customerId=customerId;
        this.houseNumber=houseNumber;
        this.buildingName=buildingName;
        this.locality=locality;
        this.cityId=cityId;
        this.landMark=landMark;

    
    }
}
