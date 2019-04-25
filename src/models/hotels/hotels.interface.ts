import { EmailValidator } from "@angular/forms";

export interface Hotel
{
  hotelName: string;
  hotelCategory: string;
  hotelPrice: string;
  hotelDescription: string;
  hotelReview:any[];
  hotelMail:EmailValidator;
  hotelContactNo:number;
  hotelLocationLat:any;
  hotelLocationLng:any;
  hotelAmenities:string;
  hotelRoomRef:string;
  hotelLocation:string;
  roomId:string;
  fileURL:string;
}