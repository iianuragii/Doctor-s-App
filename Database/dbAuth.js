require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.SECRET_KEY;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

    // Ping the admin database to verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // Access the signup database and Signupcollection
    const database = client.db("patientSignUp");
    const collection = database.collection("patientSignUpCollection");

    const documents = await collection.find({}).toArray();
    // console.log("Documents in Signupcollection:", documents);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);


module.exports = client;