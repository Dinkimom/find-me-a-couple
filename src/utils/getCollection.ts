import { mongoClient } from '@db/mongoClient';
import { EntityEnum } from '../enums/EntityEnum';

export const getCollection = (collection: EntityEnum) => {
  const db = mongoClient.db('ConfigurationModule');

  return db.collection(collection);
};
