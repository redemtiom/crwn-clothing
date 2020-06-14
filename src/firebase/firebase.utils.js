import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore'

const config = {
    apiKey: "AIzaSyBF5Ukm_06ybZyJVlBm0IKAc3IkDZ0_jAU",
    authDomain: "crwn-db-4d41e.firebaseapp.com",
    databaseURL: "https://crwn-db-4d41e.firebaseio.com",
    projectId: "crwn-db-4d41e",
    storageBucket: "crwn-db-4d41e.appspot.com",
    messagingSenderId: "181330207010",
    appId: "1:181330207010:web:ef1cf72e0f857d9687c57b",
    measurementId: "G-HB70WTENZE"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return
    
    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get()

    if (!snapShot.exists) {
        const {displayName, email} = userAuth
        const createdAt = new Date()

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch(error){
            console.log('error creating user', error.message)
        }
    }

    return userRef
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({prompt: 'select_account'})
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase