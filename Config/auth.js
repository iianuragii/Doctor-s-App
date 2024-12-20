require('dotenv').config();
const client = require('./conn');

async function run() {
  try {
    await client.connect();

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const database = client.db("patientSignUp");
    const collection = database.collection("patientSignUpCollection");

    const documents = await collection.find({}).toArray();

  } finally {
    await client.close();
  }
}

run().catch(console.dir);

module.exports = client;