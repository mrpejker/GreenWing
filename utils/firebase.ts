import { initializeApp } from 'firebase/app';
import { getPerformance } from 'firebase/performance';
import { getStorage } from 'firebase/storage';
import { addDoc, doc, collection, getFirestore, query, where, getDocs, setDoc, getDoc } from 'firebase/firestore';
import { getAnalytics, isSupported, setUserProperties, logEvent } from 'firebase/analytics';
import { ref, uploadBytesResumable, getDownloadURL, listAll } from 'firebase/storage';
import { sha3_256 } from 'js-sha3';

// Set the configuration for your app
// TODO: Replace with your app's config object
const firebaseConfig = {
  apiKey: String(process.env.FIREBASE_API_KEY),
  authDomain: String(process.env.FIREBASE_AUTH_DOMAIN),
  databaseURL: String(process.env.FIREBASE_DATABASE_URL),
  projectId: String(process.env.FIREBASE_PROJECT_ID),
  storageBucket: String(process.env.FIREBASE_STORAGE_BUCKET),
  messagingSenderId: String(process.env.FIREBASE_MESSAGING_SENDER_ID),
  appId: String(process.env.FIREBASE_APP_ID),
  measurementId: String(process.env.FIREBASE_MEASUREMENT_ID),
};

export const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);

// Analytics Section
export const analytics = isSupported().then((result) => {
  return result ? getAnalytics(firebaseApp) : null;
});
export const setAnalyticsUserProperties = async (property: object) => {
  const a = await analytics;
  if (a) {
    setUserProperties(a, { ...property });
  }
};
export const logFirebaseEvent = async (eventName: string, event: object) => {
  const a = await analytics;
  if (a) {
    logEvent(a, eventName, {
      ...event,
    });
  }
};

// Initialize Performance Monitoring and get a reference to the service
let perf = null;
if (typeof window !== 'undefined') {
  perf = getPerformance(firebaseApp);
}

export const uploadImageToFirebase = async (file: File): Promise<unknown> => {
  const arrayBuffer = await file.arrayBuffer();
  const hash = sha3_256(arrayBuffer);
  const fileExt = file.name.split('.').pop();
  const storageRef = ref(storage, `images/${hash}.${fileExt}`);
  const uploadTask = uploadBytesResumable(storageRef, file);
  return uploadTask.then(() => {
    return getDownloadURL(uploadTask.snapshot.ref);
  });
};

export const renderFirebaseImage = async (hash: string): Promise<string> => {
  const listRef = ref(storage, 'images/');
  let url;
  // const result = await storageRef.listAll();
  const result = await listAll(listRef);
  const getImageUrl = async (ref: any) => {
    url = await getDownloadURL(ref);
  };
  result.items.forEach((itemRef) => {
    // All the items under listRef.
    getImageUrl(itemRef);
  });
  return '/0.png';
};

export const addDocToFirestore = async (collectionName: string, data: object) =>
  await addDoc(collection(db, collectionName), data);

export const addDocToFirestoreWithName = async (collectionName: string, docName: string, data: object) =>
  await setDoc(doc(db, collectionName, docName), data);

export const getDocFromFirebase = async (collectionName: string, docName: string) => {
  try {
    const docRef = doc(db, collectionName, docName);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // doc.data() will be undefined in this case
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};
export const isRewardAddedToFirestore = async (wallet: string) => {
  const particpantsCollection = collection(db, 'participants');
  const q = query(particpantsCollection, where('wallet', '==', wallet));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    return true;
  } else {
    return false;
  }
};
