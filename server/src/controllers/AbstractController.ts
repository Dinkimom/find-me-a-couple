import { server } from '../../src/start';

export class AbstractController {
  private collectionName: string;

  constructor(collection: string) {
    this.collectionName = collection;
  }

  protected getCollection() {
    const db = server.mongoClient.db('ConfigurationModule');
    return db.collection(this.collectionName);
  }
}
