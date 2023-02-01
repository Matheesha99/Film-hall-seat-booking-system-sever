import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "../database";


export const timeslotRouter = express.Router();
timeslotRouter.use(express.json());

timeslotRouter.get("/:date", async (req, res) => {
    try {
        //const date = new Date(req.params.date);
        const query = { date: { $eq: req.params.date } };
        const shedule = await collections.timeslots.find(query).toArray();
        res.status(200).send(shedule);
    } catch (error) {
        res.status(500).send(error.message);
   }
});
//timeing