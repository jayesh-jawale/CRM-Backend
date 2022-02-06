// const express = require('express')   //commonjs
// const {MongoClient} = require("mongodb")   //commonjs

import express from "express";  //type: "module"
import {MongoClient} from "mongodb";  //type: "module"
import dotenv from "dotenv";

import { crmRouter } from "./crm.js";

dotenv.config(); // getting all env keys

const app = express();    // Alternative to express  - hapi

//  app.use -> Intercept every request
 app.use(express.json()); // Every request in body is parsed as JSON
//  express.json(); Inbuilt Middleware

// Create a connection
// const MONGO_URL = "mongodb://localhost" //mongodb:localhost:27017

const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
  const client = new MongoClient(MONGO_URL)
  await client.connect(); //promise
  console.log("Mongo DB Connected");
  return client;
}
export const client = await createConnection();

// const PORT = 9000
const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.send("Hi there! My name is Jayesh");
});

app.use("/crm", crmRouter);

app.listen(PORT, () => console.log('Started'))