
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
// My web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhs9dQX6ze3VVbB9Eir7D8oVHhW80_1qw",
  authDomain: "userauth-4384f.firebaseapp.com",
  projectId: "userauth-4384f",
  storageBucket: "userauth-4384f.appspot.com",
  messagingSenderId: "653459940232",
  appId: "1:653459940232:web:fd300752ee29be6b20903d"
};

// Initialize Firebases

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider()
