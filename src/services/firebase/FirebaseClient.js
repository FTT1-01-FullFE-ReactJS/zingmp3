import {addDoc, collection, serverTimestamp} from 'firebase/firestore';
import {database} from './index';
import { v4 as uuidv4 } from 'uuid';
import {catchException, showNotification} from '../../admins/scripts/common/common';
import {BUSINESS_LOGIC_ERROR, CREATE_ALBUM} from '../../admins/scripts/common/constants';

class FireBaseClient {
  constructor(dbName) {
    this.dbName = dbName;
    this.database = database;
    this.storeSuccessMessage = '';
    this.storeFailMessage = '';
  }

  setStoreFailMessage(message) {
    this.storeFailMessage = message;

    return this;
  }

  setStoreSuccessMessage(message) {
    this.storeSuccessMessage = message;

    return this;
  }

  async store(resource) {
    try {
      const _collection = this.#makeCollection();
      const _document = addDoc(_collection, this.#getStoreResource(resource));
      const _data = await _document;

      showNotification(CREATE_ALBUM).success(this.storeSuccessMessage);

      return _data?.id;
    } catch (error) {
      showNotification(CREATE_ALBUM).error(this.storeFailMessage);
      catchException(BUSINESS_LOGIC_ERROR, {
        custom_error: `Can't store data into firebase server, please try again.`,
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

export default FireBaseClient;
