import { EntityEnum } from 'src/enums/EntityEnum';
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
