import AsyncStorage from '@react-native-async-storage/async-storage';

const storeKey = '@ScrapBookApp';

export const storeData = async (key: string, value: Object) => {
  try {
    await AsyncStorage.setItem(`${storeKey}:${key}`, JSON.stringify(value));
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const retrieveData = async <T>(key: string): Promise<T | null> => {
  try {
    const value = await AsyncStorage.getItem(`${storeKey}:${key}`);
    if (value !== null) {
      return JSON.parse(value) as T;
    }
  } catch (error) {}
  return null;
};
