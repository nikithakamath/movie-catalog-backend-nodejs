'use strict';

let config = require('./config');

class FirebaseAuth {
  constructor() {
    this.admin = config.firebaseApp;
  }
  verifyUserAuth(headers) {
    return new Promise((resolve, reject) => {
      let accessToken = headers.authorization.replace('Bearer ', '');
      // Verify it with Firebase
      this.admin.auth().verifyIdToken(accessToken)
        .then((decodedToken) => {
          resolve(decodedToken.uid);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

let firebaseAuthObj = new FirebaseAuth();

module.exports = firebaseAuthObj;
