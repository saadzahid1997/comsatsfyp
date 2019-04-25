import { EmailValidator } from "@angular/forms";

export interface User
    {
        userAddress:any;
        userLocationLat:any;
        userLocationLng:any;
        userFName:string;
        userLName:string;
        userMail:EmailValidator;
        userPass:string;

    }