import { MMKV } from 'react-native-mmkv'
import { StateStorage } from 'zustand/middleware';

export const storage = new MMKV()
export const zustandStorage:StateStorage = {
  setItem: (key: string, value: string) => {
    storage.set(key, value);
  },
  getItem: (key: string) => {
    const value = storage.getString(key);
    return value ?? null;
  },
  removeItem: (key: string) => {
    storage.delete(key);
  },
};
