import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
} else console.log("MONGODB_URI: ", process.env.MONGODB_URI);

const uri = process.env.MONGODB_URI;
const options = {};

let clientPromise;

// In production mode, it's best to not use a global variable.
const client = new MongoClient(uri, options);
clientPromise = client.connect();

export default clientPromise;
