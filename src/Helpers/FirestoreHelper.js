import { db, storageBucket } from '../Configs/firebaseConfig';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const getFileURL = async (file, folder) => {
  if (!file) return;
  try {
    const uniqueID = Date.now() + Math.floor(Math.random()).toString();
    const fileRef = ref(storageBucket, `/${folder}/${uniqueID}${file.name}`);
    await uploadBytes(fileRef, file);
    return await getDownloadURL(fileRef);
  } catch (err) {
    return `Failed to Generate URL and ${err}`;
  }
};

export const getData = async (table, q, isAvailable) => {
  const dataRef = collection(db, table);
  try {
    if (q) {
      const qq = query(dataRef, ...q);
      const data = await getDocs(qq);
      if (isAvailable && data.empty) {
        return false;
      } else {
        return data.docs.map((doc) => ({ ...doc.data(), uid: doc.id }));
      }
    } else {
      const data = await getDocs(dataRef);
      return data.docs.map((doc) => ({ ...doc.data(), uid: doc.id }));
    }
  } catch (err) {
    return `Failed to Get Data from ${table} and ${err}`;
  }
};

export const addData = async (table, data) => {
  const dataRef = collection(db, table);
  try {
    await addDoc(dataRef, data);
  } catch (err) {
    return `Failed to Add Data to ${table} and ${err}`;
  }
};

export const updateData = async (table, uid, data) => {
  const dataDocRef = doc(db, table, uid);
  try {
    await updateDoc(dataDocRef, data);
  } catch (err) {
    return `Failed to Update Data and ${err}`;
  }
};

export const deleteData = async (table, uid) => {
  const dataDocRef = doc(db, table, uid);
  try {
    await deleteDoc(dataDocRef);
  } catch (err) {
    return `Failed to Delete Data and ${err}`;
  }
};
