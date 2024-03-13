import AsyncStorage from "@react-native-async-storage/async-storage";

interface AsyncDataProps {
  key: string;
  data?: any;
}

const saveDataAsync = async ({ key, data }: AsyncDataProps): Promise<void> => {
  try {
    const jsonData = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonData);
  } catch (error) {
    console.log(`Error saving asnyc data with key '${key}' : `, error);
    throw error;
  }
};

const getDataAsync = async ({ key }: AsyncDataProps) => {
  try {
    const value = await AsyncStorage.getItem(key);

    if (value != null) {
      const data = JSON.parse(value);
      return data;
    } else {
      console.log("No such data with key:", key);
      return null;
    }
  } catch (error) {
    console.log(`Error geting async data with key '${key}' : `, error);
    throw error;
  }
};

const deleteDataAsync = async ({ key }: AsyncDataProps): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(`Error deleting async data with key '${key}' : `, error);
  }
};

export { saveDataAsync, getDataAsync, deleteDataAsync };
