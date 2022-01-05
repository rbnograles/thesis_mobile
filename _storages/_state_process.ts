import AsyncStorage from '@react-native-async-storage/async-storage';

export const _setThisPageToCompleted = async (accessKey: string, value: any) => {
  // this will save the information in the phones local storage
  try {
    await AsyncStorage.setItem(accessKey, value);
  } catch (error) {
    console.log(error);
  }
};
