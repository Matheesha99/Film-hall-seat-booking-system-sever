import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "../database";


export const userRouter = express.Router();
userRouter.use(express.json());

userRouter.get("/", async (_req, res) => {
    try {
        const employees = await collections.users.find({}).toArray();
        res.status(200).send(employees);
    } catch (error) {
        res.status(500).send(error.message);
    }
 });