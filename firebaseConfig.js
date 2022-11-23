import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { addDoc, collection, deleteDoc, getDocs, getFirestore, query, doc, updateDoc } from "firebase/firestore";
import {API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, SENDER_ID, APP_ID, MEASUREMENT_ID} from '@env';

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const getRooms = () => {
  const q = query(collection(db,'rooms'));
  return getDocs(q)
  .then(result => result.docs)
  .then(docs => docs.map(doc => ({
    id: doc.id,
    name: doc.data().name,
    automation: doc.data().automation,
    humanPresence: doc.data().humanPresence,
    devices: doc.data().devices
  })))
}

export const addRoom = async (roomName) => {
  await addDoc(collection(db,'rooms'),{
    name: roomName,
    automation: true,
    humanPresence: false,
    devices: false,
  });
}

export const deleteRoom = async (roomID) => {
  await deleteDoc(doc(db,'rooms',roomID));
}

export const toggleDevices = async ({roomID,devicesState}) => {
  const docRef = doc(db,'rooms',roomID);
  await updateDoc(docRef, {
    automation: false,
    devices: !devicesState
  });
}

export default db;