import { client } from "./indexOne.js";
import bcrypt from "bcrypt";

async function createClients(data) {
    return client
      .db("test")
      .collection("crm")
      .insertOne(data);
  }

  async function getUserByEmail(email) {
    return await client
    .db("test")
    .collection("crm")
    .findOne({email : email});
  }

  async function genPassword(password) {
    const salt = await bcrypt.genSalt(10);
    console.log(salt);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword);
    return hashedPassword;
  }

  export {createClients, getUserByEmail, genPassword}