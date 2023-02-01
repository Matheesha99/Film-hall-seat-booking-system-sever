import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "../database";


export const movieRouter = express.Router();
movieRouter.use(express.json());

movieRouter.get("/", async (_req, res) => {
    try {
        const movies = await collections.movies.find({}).toArray();
        res.status(200).send(movies);
    } catch (error) {
        res.status(500).send(error.message);
    }
 });
 //movie routes
 //kk