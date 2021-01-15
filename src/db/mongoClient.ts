import { MongoClient } from 'mongodb';

let mongo = new MongoClient(
  'mongodb+srv://Nikita:pajkop-guCgyq-2difzu@configurationmodule-yufbf.mongodb.net/test?retryWrites=true&w=majority'
);

mongo.connect((err, client) => {
  if (err) return console.log(err);

  mongo = client;
});

export const mongoClient = mongo;
