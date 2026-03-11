import AsyncStorage from "@react-native-async-storage/async-storage";
import { Habit } from "../types/types";

const KEY = "habits";

export const addHabit = async (habit: Habit) => {
  const habits = await getHabits();

  const updated = [...habits, habit];
  await AsyncStorage.setItem(KEY, JSON.stringify(updated));

  return updated;
};

export const saveHabits = async (habits: Habit[]) => {
  await AsyncStorage.setItem(KEY, JSON.stringify(habits));
};

export const getHabits = async (): Promise<Habit[]> => {
  const data = await AsyncStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
};

export const deleteHabit = async (habitId: string): Promise<Habit[]> => {
  try {
    const updatedHabits = (await getHabits()).filter(
      ({ id }) => id !== habitId,
    );

    await saveHabits(updatedHabits);

    return updatedHabits;
  } catch (error) {
    console.error("Failed to delete habit", error);
    return [];
  }
};
