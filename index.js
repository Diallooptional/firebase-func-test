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

//Geofirestore SDK 
const geofirestore = require('geofirestore');

admin.initializeApp();
// [END import]

//Firestore Ref
const firestore = admin.firestore();

//Create Geofirestore Ref
const Geofirestore = geofirestore.initializeApp(firestore);

//The Geolocation ref for available drivers to query against
const geocollection = Geofirestore.collection('delivery_drivers_online');

//Create geocollection document


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


        



        //ALT: user Geofirestore: https://github.com/MichaelSolati/geofirestore-js


        //Store a Geo query readab;le by client, like in : https://firebase.google.com/docs/firestore/solutions/geoqueries#java
      });

// [END deliveryRequest]
// [END all]
