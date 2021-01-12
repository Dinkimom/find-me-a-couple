import { EntityEnum } from '../enums/EntityEnum';
import { getCollection } from '../utils/getCollection';

export class AbstractController {
  private collectionName: EntityEnum;

  constructor(collection: EntityEnum) {
    this.collectionName = collection;
  }

  protected getCollection() {
    return getCollection(this.collectionName);
  }
}
