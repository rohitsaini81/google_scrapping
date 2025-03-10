import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const schemas = new mongoose.Schema({
  name: { type: String },
  today: { type: String },
  yesterday: { type: String },
  date: { type: String },
});
const collectionname = process.env.COLLECTION_NAME;
// console.log("coll name "+collectionname)
const project_1 = mongoose.model(collectionname, schemas);

export default project_1;
