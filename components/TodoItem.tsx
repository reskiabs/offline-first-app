import { StyleSheet, Text, View } from "react-native";

export default function TodoItem({ item }: any) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text
        style={[
          styles.status,
          item.status === "synced" ? styles.synced : styles.pending,
        ]}
      >
        {item.status}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  status: {
    marginTop: 6,
    fontSize: 12,
  },
  synced: {
    color: "green",
  },
  pending: {
    color: "orange",
  },
});
