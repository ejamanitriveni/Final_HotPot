export class User {

    userName:string;
    password:string;
    role:string;
    key?:string|"null";

    constructor(userName:string,
        password:string,
        role:string,
        key:string){
            this.userName=userName;
            this.password=password;
            this.role=role;
            this.key=key;
        }
}
