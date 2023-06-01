import { addDoc, collection, serverTimestamp, query, onSnapshot, deleteDoc } from 'firebase/firestore';
import { database } from './index';
import { v4 as uuidv4 } from 'uuid';
import { catchException, showNotification } from '../../admins/scripts/common/helpers';
import { BUSINESS_LOGIC_ERROR } from '../../admins/scripts/common/constants';
const CREATE_RESOURCE = 'Create resource';

class RenderDoms {
  static showList(collectionRef, renderDom) {
    const querySnapshot = query(collection(database, collectionRef));
    onSnapshot(querySnapshot, snapshot => {
      const collection = [];
      snapshot.forEach(doc => {
        collection.push({ ...doc.data(), id: doc.id });
      });
      renderDom(collection);
    });
  }
}

class FireBaseClient {
  constructor(dbName) {
    this.dbName = dbName;
    this.database = database;
    this.storeSuccessMessage = '';
    this.storeFailMessage = '';
    // this.update = '';
  }

  setStoreFailMessage(message) {
    this.storeFailMessage = message;
    return this;
  }

  setStoreSuccessMessage(message) {
    this.storeSuccessMessage = message;
    return this;
  }
//   setUpdate(message) {
//     this.update = message;
//     return this;
//   }
  async store(resource) {
    try {
      const _collection = this.#makeCollection();
      const _document = await addDoc(_collection, this.#getStoreResource(resource));
      const _data = _document;

      showNotification(CREATE_RESOURCE).success(this.storeSuccessMessage);

      return _data?.id;
    } catch (error) {
      showNotification(CREATE_RESOURCE).error(this.storeFailMessage);
      catchException(BUSINESS_LOGIC_ERROR, {
        custom_error: `Can't store data into the Firebase server, please try again.`,
        catch_error: error,
      });
    }
  }

  #getStoreResource(resource) {
    return {
      id: uuidv4(),
      ...resource,
      created_at: serverTimestamp(),
    };
  }

  #makeCollection() {
    return collection(this.database, this.dbName);
  }
}

export default {RenderDoms,FireBaseClient }
