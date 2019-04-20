import { EmailValidator } from "@angular/forms";

export interface Resturant
{
  resturantName: string;
  resturantLocation: any;
  resturantMeals: string;
  resturantMail:EmailValidator;
  resturantContact:number;
  resturantDescription:string;
  resturantCuisines:string;
}