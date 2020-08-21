import firebase from "firebase/app";
import 'firebase/app'
import "firebase/auth";
import 'firebase/database'
import 'firebase/storage'
import 'firebase/analytics'

const firebaseConfig = {
    apiKey: "AIzaSyCLr3-zyN3FwL4k3X3A6SV4NwMh-WDCtAw",
    authDomain: "the-team-project.firebaseapp.com",
    databaseURL: "https://the-team-project.firebaseio.com",
    projectId: "the-team-project",
    storageBucket: "the-team-project.appspot.com",
    messagingSenderId: "83510726542",
    appId: "1:83510726542:web:04023fd15399e960c01edf",
    measurementId: "G-FKSPWK9R5M"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const firebaseDB = firebase.database()
const firebaseMatches = firebaseDB.ref('matches')
const firebasePlayers = firebaseDB.ref('players')
const firebaseTeams = firebaseDB.ref('teams')
const firebasePromotions = firebaseDB.ref('promotions')

// firebasePromotions.once('value').then(snapshot => {
//     console.log(snapshot.val())
// })

/**
 * Parses fetched data from Firebase. By default 'Snapshots' don't come in a straight object key pair format (i.e. { key: value } ) so we have to extract the data.
 * @param {Object} snapshot - Firebase document
 * @returns {Array[{Object}]} [ {Document}, ... ]
 */
const firebaseLooper = (snapshot) =>{
    const data = [];
    snapshot.forEach((childSnapshot)=>{
        data.push({
            ...childSnapshot.val(),
            id: childSnapshot.key
        })
    })

    return data;
}

export {
    firebase,
    firebaseDB,
    firebaseLooper,
    firebaseMatches,
    firebasePromotions,
    firebaseTeams,
    firebasePlayers
}