const express = require("express");
const app = express();
const ObjectId = require("mongodb").ObjectId;
const { MongoClient } = require("mongodb");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const port = process.env.PORT || 5000;
require("dotenv").config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.z45ex.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri);
async function run() {
  try {
    const database = client.db("signUpData");
    const users = database.collection("users");
    console.log("database connected");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
