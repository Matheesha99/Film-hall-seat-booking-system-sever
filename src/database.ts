import * as mongodb from "mongodb";
import { Employee } from "./employee";
import {User} from "./model/user";
import { Movie } from "./model/movie";
import { Timeslot } from "./model/timeslot";

 
export const collections: {
   employees?: mongodb.Collection<Employee>;
   users?: mongodb.Collection<User>;
   movies?: mongodb.Collection<Movie>;
   timeslots?: mongodb.Collection<Timeslot>;

} = {};
 
export async function connectToDatabase(uri: string) {
   const client = new mongodb.MongoClient(uri);
   await client.connect();
 
   const db = client.db("PVRCinemaDB");
   await applySchemaValidation(db);
 
   const employeesCollection = db.collection<Employee>("employees");
   const usersCollection = db.collection<User>("users");
   const moviesCollection = db.collection<Movie>("movies");
   const timeslotsCollection = db.collection<Timeslot>("timeslot");

   collections.employees = employeesCollection;
   collections.users = usersCollection;
   collections.movies = moviesCollection;
   collections.timeslots = timeslotsCollection;

}
 
// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our Employee model, even if added elsewhere.
// For more information about schema validation, see this blog series: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
async function applySchemaValidation(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "username", "email" , "password"],
            additionalProperties: false,
            properties: {
                _id: {},
                name: {
                    bsonType: "string",
                    description: "'name' is required and is a string",
                },
                username: {
                    bsonType: "string",
                    description: "'username' is required and is a string",                   
                },
                email: {
                    bsonType: "string",
                    description: "'email' is required and is ",
                    
                },
                password: {
                    bsonType: "string",
                    description: "'password' is required and is ",
                    
                },
            },
        },
    };

       // Try applying the modification to the collection, if the collection doesn't exist, create it
  await db.command({
    collMod: "users",
    validator: jsonSchema
   }).catch(async (error: mongodb.MongoServerError) => {
    if (error.codeName === 'NamespaceNotFound') {
        await db.createCollection("users", {validator: jsonSchema});
}
});

};