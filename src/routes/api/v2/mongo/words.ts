import express, {Request, Response} from 'express';
import wordSchema from '../../../../models/Words';
import {getDate} from '../../../../utils';
import moment from 'moment';

const words = express.Router();

// @ CREATE
words.post("/default", async (req: Request, res: Response) => {
  // Add the words into the database
  const now = getDate();
  const newWord = await new wordSchema({...req.body.payload,
    dateAdded: now.now,
    year: now.year,
    sem: now.sem
  }).save();

  res.status(200).send({
    status: 200,
    message: '[OK] Word added',
    payload: newWord
  })
});

// @ CREATE
words.post("/extra", async (req: Request, res: Response) => {
  // Add the words into the database
  const now = moment();
  const newWord = await new wordSchema({...req.body.payload,
    dateAdded: now,
    year: req.body.extra.extraYear,
    sem: req.body.extra.extraSem
  }).save();

  res.status(200).send({
    status: 200,
    message: '[OK] Word added',
    payload: newWord
  })
});

// @ READ
words.get("/:ownerID", async (req: Request, res: Response) => {
  const ownerID = req.params.ownerID ? req.params.ownerID : null;
  const data = await wordSchema.find({ownerID});

  // Respond accordingly
  if (data.length === 0) res.status(204).send({ // NOT UNDEFINED.
    status: 204,
    message: "[EMPTY ARRAY] The words data not found",
    payload: data
  });
  else res.status(200).send({
    status: 200,
    message: "[SUCCESS] The words has been found",
    payload: data
  });

});

// @ UPDATE
words.put("", async (_req: Request, _res: Response) => {

});

// @ UPDATE
words.put("/tag", async (_req: Request, _res: Response) => {

});

// @ DELETE
words.delete("", (_req: Request, _res: Response) => {

});

export default words;