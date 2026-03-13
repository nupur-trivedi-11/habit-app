import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Habit } from "../types/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  item: Habit;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const HabitItem: React.FC<Props> = ({ item, onToggle, onDelete }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.leftSection}
        onPress={() => onToggle(item.id)}
      >
        <View style={[styles.checkbox, item.completed && styles.checked]} />
        <Text style={[styles.text, item.completed && styles.completedText]}>
          {item.name}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => onDelete(item.id)}
      >
       <MaterialCommunityIcons name="trash-can" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default HabitItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#555",
    marginRight: 12,
  },
  checked: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  deleteBtn: {
    padding: 6,
  },
  deleteText: {
    fontSize: 18,
  },
});