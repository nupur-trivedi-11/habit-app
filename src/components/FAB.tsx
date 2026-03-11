import { Pressable, StyleSheet } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { colors } from "../theme/colors";

export default function FAB({ onPress }: { onPress: () => void }) {
  return (
    <Pressable style={styles.fab} onPress={onPress}>
      <MaterialCommunityIcons name="plus" size={28} color="white" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: colors.accent,
    padding: 16,
    borderRadius: 30,
  },
});
