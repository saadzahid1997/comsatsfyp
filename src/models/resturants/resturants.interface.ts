import { EmailValidator } from "@angular/forms";

export interface Resturant
{
  resturantName: string;
  resturantLocation: string;
  resturantMeals: string;
  resturantMail:EmailValidator;
  resturantContact:number;
  resturantDescription:string;
  resturantCuisines:string;
}