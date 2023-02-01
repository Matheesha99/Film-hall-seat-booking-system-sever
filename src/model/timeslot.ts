import * as mongodb from "mongodb";

export interface Timeslot {
    movieID: string;
    moviename:string;
    date: string;
    time: string; 
    _id?: mongodb.ObjectId;
 }