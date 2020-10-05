import express, {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
// Routers
import users from './mongo/users';
import languages from './mongo/languages'

// @ MIDDLEWARE: AUTHENTICATION
const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1]; // undefined, or actual token

  // Handle when token not given.
  if(token == null) return res.status(401).send({
    status: 401,
    message: 'NOT AUTHORIZED: ACCESS TOKEN NOT PROVIDED'
  })
  jwt.verify(token!, process.env.LOGIN_ACCESS_TOKEN_SECRET!, (err: any, user: any) => {
    if (err) 
      return res.status(403).send({
        status: 403,
        message: 'FORBIDDEN: TOKEN EXPIRED OR INVALID'
      });
    req.body.user = user;

    // For readability
    console.log(`He / She is now accessing to MongoDB indirectly.`)
    next();
  });
};

// @ MIDDLEWARE: CONNECT TO DB
const connectToMongoDB = (_req: Request, _res: Response, next: NextFunction) => {
  const MONGO_OWNER_NAME = process.env.MONGO_OWNER_NAME;
  const MONGO_CLUSTER_PASSWORD = process.env.MONGO_CLUSTER_PASSWORD;
  const MONGO_DATABASE_NAME = process.env.MONGO_DATABASE_NAME;
  const url = `mongodb+srv://${MONGO_OWNER_NAME}:${MONGO_CLUSTER_PASSWORD}@${MONGO_DATABASE_NAME}`;
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  next();
};

const mongo = express.Router();
dotenv.config(); // bring dotenv callable
mongo.use(authenticateUser); // Authenticate
mongo.use(connectToMongoDB); // Connect to DB
mongo.use("/users", users);
mongo.use("/languages", languages);

export default mongo;