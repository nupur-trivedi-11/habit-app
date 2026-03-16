import React, { useCallback, useMemo, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Habit } from "../types/types";
import HabitItem from "../components/HabitItem";
import FAB from "../components/FAB";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { deleteHabit, getHabits } from "../storage/habitStorage";

const Dashboard: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  const [habits, setHabits] = useState<Habit[]>([]);

  useFocusEffect(
    useCallback(() => {
      const fetchHabits = async () => {
        const data = await getHabits();
        setHabits(data || []);
      };

      fetchHabits();
    }, []),
  );

  const completedCount = useMemo(() => {
    return habits.filter((h) => h.completed).length;
  }, [habits]);

  const remainingCount = habits.length - completedCount;

  const toggleHabit = (id: string) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, completed: !h.completed } : h)),
    );
  };

  const handleDeleteHabit = async (id: string) => {
    const updatedHabits = await deleteHabit(id);
    setHabits(updatedHabits);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Hi Dhruv,</Text>
        <Text style={styles.subTitle}>Grow with small step</Text>
      </View>

      {/* SUMMARY */}
      <View style={styles.summaryRow}>
        <View style={[styles.card, styles.doneCard]}>
          <Text style={styles.cardCount}>{completedCount}</Text>
          <Text style={styles.cardLabel}>Done</Text>
        </View>

        <View style={[styles.card, styles.remainingCard]}>
          <Text style={styles.cardCount}>{remainingCount}</Text>
          <Text style={styles.cardLabel}>Remaining</Text>
        </View>
      </View>

      {/* LIST HEADER */}
      <Text style={styles.sectionTitle}>All Habits</Text>

      {/* HABIT LIST */}
      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HabitItem
            item={item}
            onToggle={toggleHabit}
            onDelete={handleDeleteHabit}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />

      <FAB onPress={() => navigation.navigate("AddHabit")} />
    </View>
  );
};

export default Dashboard;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FA",
    paddingHorizontal: 16,
  },

  /* HEADER */
  header: {
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1C1C1E",
  },
  subTitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },

  /* SUMMARY */
  summaryRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  card: {
    flex: 1,
    borderRadius: 18,
    padding: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  doneCard: {
    backgroundColor: "#E8F5E9",
  },
  remainingCard: {
    backgroundColor: "#FFF3E0",
  },
  cardCount: {
    fontSize: 32,
    fontWeight: "800",
    color: "#111",
  },
  cardLabel: {
    fontSize: 14,
    marginTop: 6,
    color: "#555",
    fontWeight: "500",
  },

  /* LIST */
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#1F2937",
  },
  listContent: {
    paddingBottom: 24,
  },
});
