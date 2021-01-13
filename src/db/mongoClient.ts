import { MongoClient } from 'mongodb';

let mongo = new MongoClient(process.env.CONNECTION_STRING || '');

mongo.connect((err, client) => {
  if (err) return console.log(err);

  mongo = client;
});

export const mongoClient = mongo;
