/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 */
'use strict';

// [START all]
// [START import]
// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');

//Geofire SDK 
const geofire = require('geofire');


admin.initializeApp();
// [END import]

// [START makeUppercase]
// Listens for new messages added to /messages/:pushId/original and creates an
// uppercase version of the message to /messages/:pushId/uppercase
exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
    .onCreate((snapshot, context) => {
      // Grab the current value of what was written to the Realtime Database.
      const original = snapshot.val();
      console.log('Uppercasing', context.params.pushId, original);
      const uppercase = original.toUpperCase();
      // You must return a Promise when performing asynchronous tasks inside a Functions such as
      // writing to the Firebase Realtime Database.
      // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
      return snapshot.ref.parent.child('uppercase').set(uppercase);
    });
// [END makeUppercase]


// [START deliveryRequest]

exports.deliveryRequest = functions.firestore
      .collection("delivery/{docId}")
      .onWrite((snap, context) => {

        const data = snap.data();
        
        const doc_id = data.doc_id;
        const created_at = data.created_at;
        const puckup_name = data.pickup_name;
        const dropoff_name = data.drop_off_name;
        const pickup_location  = data.pickup_location;
        const dropoff_location = data.drop_off_location;


        //TODO: GeoFire
        //send data to all in keyEntered

        //Store a Geo query readab;le by client, like in : https://firebase.google.com/docs/firestore/solutions/geoqueries#java
      });

// [END deliveryRequest]
// [END all]
