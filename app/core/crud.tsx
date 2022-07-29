import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';

export async function Get<T>(table: keyof Tables, noCache = false): Promise<T[]> {
  return new Promise(async (resolve, reject) => {
    try {
      const collection = firestore().collection(table);
      const snapshots = await collection.get({
        source: noCache ? 'server' : 'default',
      });
      const data: T[] = snapshots.docs.map(item => ({
        id: item.id,
        ...(item.data() as T),
      }));
      resolve(data);
    } catch (error: any) {
      let message = error.message;
      if (error.code === 'firestore/unavailable') message = 'Error getting data. Please try again';
      Alert.alert(message);
      reject(message);
    }
  });
}

export async function Add<T>(table: keyof Tables, props: Partial<T>): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const collection = firestore().collection(table);
      const ref = await collection.add(props);
      resolve(ref.id);
    } catch (error: any) {
      let message = error.message;
      if (error.code === 'firestore/unavailable') message = 'Error getting data. Please try again';
      Alert.alert(message);
      reject(message);
    }
  });
}

export async function Update<T>(table: keyof Tables, props: Partial<T>) {
  return new Promise(async (resolve, reject) => {
    try {
      const id = props['id'];
      delete props['id'];
      const collection = firestore().collection(table);
      const ref = await collection.doc(id).update(props);
      resolve(ref);
    } catch (error: any) {
      let message = error.message;
      if (error.code === 'firestore/unavailable') message = 'Error getting data. Please try again';
      Alert.alert(message);
      reject(message);
    }
  });
}

export async function Delete(table: keyof Tables, id: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const collection = firestore().collection(table);
      const ref = await collection.doc(id).delete();
      resolve(ref);
    } catch (error: any) {
      let message = error.message;
      if (error.code === 'firestore/unavailable') message = 'Error getting data. Please try again';
      Alert.alert(message);
      reject(message);
    }
  });
}

interface Tables {
  Products: string;
}
