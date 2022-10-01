const express = require("express");
const app = express();

const ObjectId = require("mongodb").ObjectId;
app.use(express.json());
const cors = require("cors");
app.use(cors());
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 5000;
app.use(cors());
require("dotenv").config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.z45ex.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("signUpUser");
    const user = database.collection("user");
    console.log("database connect");

    // save users
    app.post("/saveUsers", async (req, res) => {
      let query = req.body;
      const result = await user.insertOne(query);
      res.json(result);
    });
  } finally {
    // await  client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log("Connected with database", port);
});
