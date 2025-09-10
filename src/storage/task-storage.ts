// Function to save, load and clear task
import { Task } from '@/types/task';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'TODOS';


export async function saveTask(task:Task[]):Promise<void>{
  try {
    await AsyncStorage.setItem(STORAGE_KEY,JSON.stringify(task))
  } catch (error) {
     console.error('Error saving todos:', error);
  }
}


export async function loadTask():Promise<Task[]>{
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Error loading todos:', error);
    return [];
  }
}
export async function clearTask():Promise<void>{
  try {
    await AsyncStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Error loading todos:', error);
  }
}

