import { EntityEnum } from '../enums/EntityEnum';
import { server } from '../start';

export const getCollection = (collection: EntityEnum) => {
  const db = server.mongoClient.db('ConfigurationModule');

  return db.collection(collection);
};
