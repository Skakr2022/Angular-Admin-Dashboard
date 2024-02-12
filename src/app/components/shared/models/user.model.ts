import { role } from "./role.model";

export interface user { 
    id?:number;
    firstName?:string;
    lastName?:string;
    username?:string;
    email?:string;
    role?:role;
    password?:string;
    imageUrl:string;
}