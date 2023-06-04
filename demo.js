'use strict';

class FirebaseClient {
  constructor(dbName) {
    this.dbName = dbName;
  }
}

const firebaseClient = new FirebaseClient();

console.log({ firebaseClient });