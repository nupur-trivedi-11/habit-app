import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Profile() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={[styles.container, { paddingTop: 10}]}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* PROFILE HEADER */}
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://i.pravatar.cc/150?img=12",
          }}
          style={styles.avatar}
        />

        <Text style={styles.name}>Dhruv</Text>
        <Text style={styles.email}>dhruv@example.com</Text>
      </View>

      {/* STATS */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Habits</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>48</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>7</Text>
          <Text style={styles.statLabel}>Streak</Text>
        </View>
      </View>

     
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 16,
  },

  header: {
    alignItems: "center",
    marginBottom: 30,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 12,
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },

  email: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },

  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginHorizontal: 4,
    elevation: 2,
  },

  statNumber: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
  },

  statLabel: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
  },

  section: {
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 10,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    paddingHorizontal: 16,
  },

  item: {
    paddingVertical: 14,
    paddingHorizontal: 16,
  },

  itemText: {
    fontSize: 15,
    color: "#111827",
  },
});