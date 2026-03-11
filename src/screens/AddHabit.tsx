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
import { theme } from "../theme";

const { colors, spacing, typography } = theme;

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
            min={new Date().toISOString().split("T")[0]}
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
            style={styles.input}
            onPress={() => {
              setShowTimePicker(false);
              setShowDatePicker(true);
            }}
          >
            <Text>{date.toDateString()}</Text>
          </Pressable>

          <Pressable
            style={styles.input}
            onPress={() => {
              setShowDatePicker(false);
              setShowTimePicker(true);
            }}
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
        <DateTimePicker
          value={date}
          minimumDate={new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onDateChange}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={date}
          minimumDate={new Date()}
          mode="time"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onTimeChange}
        />
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
    padding: spacing.lg,
    backgroundColor: colors.background,
  },

  label: {
    ...typography.label,
    marginBottom: spacing.sm,
    color: colors.textPrimary,
  },

  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: spacing.md,
    marginBottom: spacing.lg,
    backgroundColor: colors.surface,
  },

  row: {
    flexDirection: "row",
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },

  button: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonText: {
    ...typography.button,
    color: colors.surface,
  },
});
