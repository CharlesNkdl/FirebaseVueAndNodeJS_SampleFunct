/* The basic for a Firebase App
Initializing the configuration and put all config file !
Only the public one, when using firebase-admin with NodeJS
Put the secret key in another file, and don't forget to put it in the .git ignore */




// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
	//THE CONFIGURATION FOR FIREBASE YOU GET AT THE OPENING
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
import { getStorage } from "firebase/storage";

const storage = getStorage(app);
export { storage };
