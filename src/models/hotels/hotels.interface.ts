import { EmailValidator } from "@angular/forms";

export interface Hotel
{
  hotelName: string;
  hotelCategory: string;
  hotelPrice: string;
  hotelOverview: string;
  hotelMail:EmailValidator;
  hotelContactNo:number;
  hotelLocationLat:any;
  hotelLocationLng:any;
  hotelAmenities:string;
}