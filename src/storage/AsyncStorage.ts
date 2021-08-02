import { AsyncStorage } from "react-native";

const storeKey = '@ScrapBookApp';

export const storeData = async (key: string, value: Object) => {
  try {
    console.log(JSON.stringify(value));
    await AsyncStorage.setItem(`${storeKey}:${key}`, JSON.stringify(value));
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const retrieveData = async <T>(key: string): Promise<T | null> => {
  try {
    const value = await AsyncStorage.getItem(`${storeKey}:${key}`);
    console.log('value', value);
    if (value !== null) {
      return JSON.parse(value) as T;
    }
  } catch (error) {}
  return null;
};
