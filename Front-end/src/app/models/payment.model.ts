export class Payment {

    paymentId:number;
    paymentMode:string;
    amount:number;
    status:string;
    date:Date;
    orderId:number;


    constructor(paymentId:number,
        paymentMode:string,
        amount:number,
        status:string,
        date:Date,
        orderId:number,
    ){
        this.paymentId=paymentId;
        this.paymentMode=paymentMode;
        this.amount=amount;
        this.status=status;
        this.date=date;
        this.orderId=orderId;
    }
}
