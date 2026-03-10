import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { addHabit } from "../storage/habitStorage";
import { useNavigation } from "@react-navigation/native";
import { Habit } from "../types/types";

export default function AddHabit() {
  const navigation = useNavigation<any>();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleAddHabit = async () => {
    if (!title.trim()) {
      Alert.alert("Validation", "Habit title is required");
      return;
    }

    const newHabit: Habit = {
      id: Date.now().toString(),
      name: title,
      reminderAt: date,
      createdAt: new Date(),
      completed: false,
    };

    await addHabit(newHabit);

    navigation.goBack();
  };

  const onDateChange = (_: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const onTimeChange = (_: any, selectedDate?: Date) => {
    setShowTimePicker(false);

    if (selectedDate) {
      const updated = new Date(date);
      updated.setHours(selectedDate.getHours());
      updated.setMinutes(selectedDate.getMinutes());
      setDate(updated);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Habit Name</Text>

      <TextInput
        placeholder="e.g. Drink Water"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <Text style={styles.label}>Reminder</Text>

      {/* WEB PICKERS */}

      {Platform.OS === "web" ? (
        <View style={styles.row}>
          <input
            type="date"
            onChange={(e) => {
              const newDate = new Date(date);
              const value = new Date(e.target.value);
              newDate.setFullYear(value.getFullYear());
              newDate.setMonth(value.getMonth());
              newDate.setDate(value.getDate());
              setDate(newDate);
            }}
          />

          <input
            type="time"
            onChange={(e) => {
              const [hours, minutes] = e.target.value.split(":");
              const newDate = new Date(date);
              newDate.setHours(Number(hours));
              newDate.setMinutes(Number(minutes));
              setDate(newDate);
            }}
          />
        </View>
      ) : (
        <View style={styles.row}>
          <Pressable
            style={styles.pickerButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text>{date.toDateString()}</Text>
          </Pressable>

          <Pressable
            style={styles.pickerButton}
            onPress={() => setShowTimePicker(true)}
          >
            <Text>
              {date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </Pressable>
        </View>
      )}

      {showDatePicker && (
        <DateTimePicker value={date} mode="date" onChange={onDateChange} />
      )}

      {showTimePicker && (
        <DateTimePicker value={date} mode="time" onChange={onTimeChange} />
      )}

      <Pressable style={styles.button} onPress={handleAddHabit}>
        <Text style={styles.buttonText}>Save Habit</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  label: {
    fontSize: 16,
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },

  row: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 30,
  },

  pickerButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  button: {
    backgroundColor: "#6200ee",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "600",
  },
});
