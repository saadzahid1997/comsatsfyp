import { EmailValidator } from "@angular/forms";

export interface User
    {
        userAddress:any;
        userFName:string;
        userLName:string;
        userMail:EmailValidator;
        userPass:string;

    }