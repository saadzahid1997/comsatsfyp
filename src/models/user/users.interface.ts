import { EmailValidator } from "@angular/forms";

export interface User
    {
        userAddress:string;
        userFName:string;
        userLName:string;
        userMail:EmailValidator;
        userPass:string;

    }